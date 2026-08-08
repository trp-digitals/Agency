// ─────────────────────────────────────────────────────────────────────────────
// Server-Side Deduplication & Idempotency Engine
//
// YouTube-style deduplication rules:
//   - Same Visitor + Same Pathname within window (default 30 minutes) -> Duplicate
//   - Same eventId re-transmitted -> Idempotent Duplicate
// ─────────────────────────────────────────────────────────────────────────────
import prisma from "./db";

// Configurable deduplication window (default: 30 minutes)
export const DEDUPLICATION_WINDOW_MINUTES = parseInt(
  process.env.VIEW_DEDUPLICATION_WINDOW_MINUTES ?? "30",
  10
);

/**
 * Check if a request payload with this eventId was already recorded.
 * Guarantees strict idempotency for network retries and duplicate transmissions.
 */
export async function isExistingEvent(eventId: string): Promise<boolean> {
  if (!eventId) return false;
  try {
    const existing = await prisma.analyticsEvent.findFirst({
      where: { eventId },
      select: { id: true },
    });
    return !!existing;
  } catch {
    return false;
  }
}

/**
 * Server-side deduplication check:
 * Returns true if this visitor has already visited this specific pathname
 * within the configured deduplication window (e.g. 30 minutes).
 */
export async function isDuplicatePageView(
  visitorId: string,
  pathname: string,
  windowMinutes: number = DEDUPLICATION_WINDOW_MINUTES
): Promise<boolean> {
  if (!visitorId || !pathname) return false;

  const windowMs = windowMinutes * 60 * 1000;
  const cutoff = new Date(Date.now() - windowMs);

  try {
    const previousView = await prisma.analyticsEvent.findFirst({
      where: {
        visitorId,
        pathname,
        eventType: "PAGE_VIEW",
        isBot: false,
        timestamp: { gte: cutoff },
      },
      select: { id: true },
    });

    return !!previousView;
  } catch (err) {
    console.error("[analytics/deduplication] Query error:", err);
    return false;
  }
}
