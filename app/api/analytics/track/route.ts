// ─────────────────────────────────────────────────────────────────────────────
// POST /api/analytics/track
// Validated Website Views tracking endpoint.
// Performs rate-limiting, bot filtering, idempotency check, and server-side deduplication.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import prisma from "@/lib/analytics/db";
import { parseUserAgent, sanitizeReferrer, isValidPathname } from "@/lib/analytics/ua-parser";
import { normalizeCountry, normalizeRegion, normalizeCity } from "@/lib/analytics/geo";
import { isBotUserAgent, isSuspiciousActivity } from "@/lib/analytics/bot-detector";
import { isExistingEvent, isDuplicatePageView } from "@/lib/analytics/deduplication";

// In-memory rate limiter per visitorId / IP fallback
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;       // max 30 events per window
const RATE_WINDOW = 60_000;  // 1-minute window

function isRateLimited(visitorId: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(visitorId);
  if (!entry || now > entry.resetAt) {
    rateMap.set(visitorId, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, visitorId, sessionId, pathname, referrer, eventType = "PAGE_VIEW" } = body;

    // ── Validate inputs ──────────────────────────────────────────────────────
    if (
      !visitorId || typeof visitorId !== "string" || visitorId.length > 64 ||
      !sessionId || typeof sessionId !== "string" || sessionId.length > 64 ||
      !isValidPathname(pathname)
    ) {
      return NextResponse.json({ ok: false, error: "Invalid payload parameters" }, { status: 400 });
    }

    // Do not track admin routes
    if (pathname.startsWith("/admin")) {
      return NextResponse.json({ ok: true, tracked: false }, { status: 200 });
    }

    // ── Rate limiting ────────────────────────────────────────────────────────
    if (isRateLimited(visitorId)) {
      return NextResponse.json({ ok: false, error: "Rate limit exceeded" }, { status: 429 });
    }

    // ── Idempotency Check ────────────────────────────────────────────────────
    if (eventId && typeof eventId === "string") {
      const alreadyExists = await isExistingEvent(eventId);
      if (alreadyExists) {
        return NextResponse.json({ ok: true, counted: false, duplicate: true }, { status: 200 });
      }
    }

    // ── Bot / Crawler Detection ──────────────────────────────────────────────
    const ua = request.headers.get("user-agent") || "";
    const isBotUA = isBotUserAgent(ua);
    const isSuspicious = isSuspiciousActivity(visitorId);
    const isBot = isBotUA || isSuspicious;

    // If bot detected, record as bot event or ignore from view count
    if (isBot) {
      // Store event flagged as bot (so it does NOT increment validated view counters)
      await prisma.analyticsEvent.create({
        data: {
          eventId: eventId && typeof eventId === "string" ? eventId : null,
          visitorId,
          sessionId,
          eventType: typeof eventType === "string" ? eventType : "PAGE_VIEW",
          pathname,
          referrer: sanitizeReferrer(referrer ?? null),
          deviceType: "desktop",
          browser: "Bot",
          os: "Bot",
          isBot: true,
        },
      });
      return NextResponse.json({ ok: true, counted: false, bot: true }, { status: 200 });
    }

    // ── Server-Side Deduplication Check for PAGE_VIEW ─────────────────────────
    if (eventType === "PAGE_VIEW") {
      const isDuplicate = await isDuplicatePageView(visitorId, pathname);
      if (isDuplicate) {
        // Visitor already viewed this page within the 30-min window -> ignore duplicate view
        return NextResponse.json({ ok: true, counted: false, deduplicated: true }, { status: 200 });
      }
    }

    // ── Parse User-Agent & Geography ────────────────────────────────────────
    const { deviceType, browser, os } = parseUserAgent(ua);

    const rawCountry = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? request.headers.get("x-country");
    const rawRegion = request.headers.get("x-vercel-ip-country-region") ?? request.headers.get("x-vercel-ip-region") ?? request.headers.get("x-region");
    const rawCity = request.headers.get("x-vercel-ip-city") ?? request.headers.get("x-city");

    const country = normalizeCountry(rawCountry);
    const region = normalizeRegion(rawRegion, country);
    const city = normalizeCity(rawCity);

    const cleanReferrer = sanitizeReferrer(referrer ?? null);

    // ── Store Validated Analytics Event ──────────────────────────────────────
    await prisma.analyticsEvent.create({
      data: {
        eventId: eventId && typeof eventId === "string" ? eventId : null,
        visitorId,
        sessionId,
        eventType: typeof eventType === "string" ? eventType : "PAGE_VIEW",
        pathname,
        referrer: cleanReferrer,
        deviceType,
        browser,
        os,
        country,
        region,
        city,
        isBot: false,
      },
    });

    return NextResponse.json({ ok: true, counted: true }, { status: 200 });
  } catch (err) {
    // Fail-safe — analytics errors must never break public site
    console.error("[analytics/track]", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

// Reject non-POST requests
export async function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
