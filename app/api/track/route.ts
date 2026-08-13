import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { realtimeEmitter } from "@/lib/realtime";
import crypto from "crypto";

const COOKIE_NAME = "trp_visitor_id";
// 100 years in seconds
const ONE_HUNDRED_YEARS_SEC = Math.floor(100 * 365.25 * 24 * 60 * 60);

export async function POST(req: NextRequest) {
  try {
    let body: { path?: string; visitorId?: string } = {};
    try {
      body = await req.json();
    } catch {
      // Body might be empty or invalid JSON
    }

    // 1. Read visitor ID from cookie or request body
    const cookieVisitorId = req.cookies.get(COOKIE_NAME)?.value;
    let visitorId = cookieVisitorId || body.visitorId;

    // Validate visitor ID format (UUID format or alphanumeric string between 10 and 100 chars)
    const isValidVisitorId =
      typeof visitorId === "string" &&
      visitorId.trim().length >= 10 &&
      visitorId.trim().length <= 100 &&
      /^[a-zA-Z0-9\-_]+$/.test(visitorId.trim());

    if (!isValidVisitorId) {
      visitorId = crypto.randomUUID();
    } else {
      visitorId = visitorId!.trim();
    }

    // 2. Normalize raw path
    let rawPath = body.path || "/";
    let normalizedPath = rawPath.toLowerCase().split("?")[0].split("#")[0].trim();
    if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    if (!normalizedPath) {
      normalizedPath = "/";
    }

    // Do not track admin side pages
    if (normalizedPath.startsWith("/trp-67.73")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    let isNewVisitor = false;
    let isNewPageView = false;

    // 3. Upsert / Find Visitor in DB
    try {
      let existingVisitor = await db.analyticsVisitor.findUnique({
        where: { visitorId },
      });

      if (!existingVisitor) {
        try {
          existingVisitor = await db.analyticsVisitor.create({
            data: { visitorId },
          });
          isNewVisitor = true;
        } catch (err: any) {
          // If created concurrently by another request
          if (err.code === "P2002") {
            existingVisitor = await db.analyticsVisitor.findUnique({
              where: { visitorId },
            });
          } else {
            throw err;
          }
        }
      } else {
        // Update lastSeenAt timestamp asynchronously
        db.analyticsVisitor
          .update({
            where: { visitorId },
            data: { lastSeenAt: new Date() },
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error("Error creating/finding AnalyticsVisitor:", err);
    }

    // 4. Try creating AnalyticsPageView record (enforced by @@unique([visitorId, path]))
    try {
      await db.analyticsPageView.create({
        data: {
          visitorId,
          path: normalizedPath,
        },
      });
      isNewPageView = true;
    } catch (err: any) {
      // P2002 is Prisma's unique constraint violation code (visitor already visited this page)
      if (err.code !== "P2002") {
        console.error("Error creating AnalyticsPageView:", err);
      }
    }

    // 5. Emit realtime SSE updates if new visitor or new page view recorded
    if (isNewVisitor) {
      realtimeEmitter.emit("update", {
        type: "NEW_UNIQUE_VISITOR",
        visitorId,
        path: normalizedPath,
      });
    }

    if (isNewPageView) {
      realtimeEmitter.emit("update", {
        type: "NEW_UNIQUE_PAGE_VIEW",
        visitorId,
        path: normalizedPath,
      });
    }

    // 6. Return response with long-lived 100-year cookie
    const response = NextResponse.json({
      success: true,
      visitorId,
    });

    const expiresDate = new Date();
    expiresDate.setFullYear(expiresDate.getFullYear() + 100);

    response.cookies.set(COOKIE_NAME, visitorId, {
      path: "/",
      maxAge: ONE_HUNDRED_YEARS_SEC,
      expires: expiresDate,
      httpOnly: false, // Must be false so client script can read & backup to localStorage
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Unhandled error in /api/track:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
