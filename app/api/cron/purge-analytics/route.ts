// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cron/purge-analytics
// Daily cron job — purges raw events older than 90 days after aggregating
// them into the analytics_daily table.
//
// Scheduled in vercel.json to run at 02:00 UTC daily.
// Protected by CRON_SECRET (Vercel automatically injects this for cron jobs).
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import prisma from "@/lib/analytics/db";

const RETENTION_DAYS = 90;

export async function GET(request: Request) {
  // Verify this is called by Vercel Cron (or with the cron secret)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

    // Aggregate events per day BEFORE deleting them (for days not yet aggregated)
    const oldEvents = await prisma.analyticsEvent.findMany({
      where: { timestamp: { lt: cutoff } },
      select: { timestamp: true, visitorId: true },
    });

    // Group by date
    const byDate = new Map<string, { visitors: Set<string>; pageViews: number }>();
    for (const e of oldEvents) {
      const key = e.timestamp.toISOString().slice(0, 10);
      if (!byDate.has(key)) byDate.set(key, { visitors: new Set(), pageViews: 0 });
      const d = byDate.get(key)!;
      d.visitors.add(e.visitorId);
      d.pageViews++;
    }

    // Upsert daily aggregates
    for (const [dateStr, data] of byDate.entries()) {
      const date = new Date(dateStr + "T00:00:00.000Z");
      await prisma.analyticsDaily.upsert({
        where: { date },
        update: {
          uniqueVisitors: { increment: data.visitors.size },
          pageViews: { increment: data.pageViews },
        },
        create: {
          date,
          uniqueVisitors: data.visitors.size,
          pageViews: data.pageViews,
        },
      });
    }

    // Delete old raw events
    const { count } = await prisma.analyticsEvent.deleteMany({
      where: { timestamp: { lt: cutoff } },
    });

    console.log(`[cron/purge-analytics] Purged ${count} events older than ${RETENTION_DAYS} days`);
    return NextResponse.json({ ok: true, purged: count });
  } catch (err) {
    console.error("[cron/purge-analytics]", err);
    return NextResponse.json({ error: "Purge failed" }, { status: 500 });
  }
}
