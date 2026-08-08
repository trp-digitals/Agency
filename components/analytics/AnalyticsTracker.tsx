"use client";
// ─────────────────────────────────────────────────────────────────────────────
// AnalyticsTracker — Lightweight first-party page-view tracker
//
// Performance & Privacy rules:
//   - Client-side only (ssr: false) inside a Suspense boundary
//   - Fire-and-forget fetch calls (never awaited / non-blocking)
//   - All errors are swallowed — analytics failure never breaks the site
//   - StrictMode double-fire protection via useRef
//   - visitorId: stored in a 1-year cookie (trp_vid) — anonymous UUID
//   - sessionId: stored in a 30-min sessionStorage key (trp_sid) — anonymous UUID
//   - eventId: unique UUID generated per event payload for idempotency
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const VID_COOKIE = "trp_vid";
const SID_KEY = "trp_sid";
const VID_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const SESSION_TIMEOUT = 30 * 60 * 1000;  // 30 minutes

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "evt_" + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function getOrCreateVisitorId(): string {
  let vid = getCookie(VID_COOKIE);
  if (!vid) {
    vid = generateId();
    setCookie(VID_COOKIE, vid, VID_MAX_AGE);
  }
  return vid;
}

function getOrCreateSessionId(): string {
  try {
    if (typeof sessionStorage === "undefined") return generateId();
    const stored = sessionStorage.getItem(SID_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    const now = Date.now();

    if (parsed && now - parsed.lastSeen < SESSION_TIMEOUT) {
      // Refresh session activity timestamp
      sessionStorage.setItem(SID_KEY, JSON.stringify({ id: parsed.id, lastSeen: now }));
      return parsed.id;
    }

    // New session initialized
    const id = generateId();
    sessionStorage.setItem(SID_KEY, JSON.stringify({ id, lastSeen: now }));
    return id;
  } catch {
    return generateId();
  }
}

function sendPageView(pathname: string): void {
  try {
    const eventId = generateId();
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const referrer = typeof document !== "undefined" ? document.referrer || null : null;

    // Fire and forget — never await, never block UI
    void fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        visitorId,
        sessionId,
        eventType: "PAGE_VIEW",
        pathname,
        referrer,
      }),
      keepalive: true, // ensures payload sends even on rapid page navigation
    }).catch(() => {
      // Swallow errors silently
    });
  } catch {
    // Never throw — analytics must never break public site
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Ignore admin pages from public view counts
    if (!pathname || pathname.startsWith("/admin")) return;

    // Skip if path already tracked on this client navigation tick
    if (lastTrackedPath.current === pathname) return;

    lastTrackedPath.current = pathname;
    sendPageView(pathname);
  }, [pathname]);

  return null;
}
