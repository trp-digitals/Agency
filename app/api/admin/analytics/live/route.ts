import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import {
  getSummaryStats,
  getActiveNow,
  getViewsHistory,
  getTopPages,
  getTrafficSources,
  getDeviceBreakdown,
  getLocationSummaryStats,
  getLocationBreakdown,
} from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") ?? "30d") as "1d" | "7d" | "30d" | "90d" | "all";
    const locRange = (searchParams.get("locRange") ?? "all") as "1d" | "7d" | "30d" | "90d" | "all";
    const locLevel = (searchParams.get("locLevel") ?? "country") as "country" | "region" | "city";

    const [
      summary,
      activeCount,
      history,
      pages,
      sources,
      devices,
      locSummary,
      locList,
    ] = await Promise.allSettled([
      getSummaryStats(),
      getActiveNow(),
      getViewsHistory(range),
      getTopPages(10),
      getTrafficSources(),
      getDeviceBreakdown(),
      getLocationSummaryStats(locRange),
      getLocationBreakdown(locRange, locLevel),
    ]);

    return NextResponse.json({
      summary: summary.status === "fulfilled" ? summary.value : null,
      activeCount: activeCount.status === "fulfilled" ? activeCount.value : 0,
      history: history.status === "fulfilled" ? history.value : [],
      pages: pages.status === "fulfilled" ? pages.value : [],
      sources: sources.status === "fulfilled" ? sources.value : [],
      devices: devices.status === "fulfilled" ? devices.value : { devices: [], browsers: [], os: [] },
      locSummary: locSummary.status === "fulfilled" ? locSummary.value : undefined,
      locList: locList.status === "fulfilled" ? locList.value : [],
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error("[admin/analytics/live]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
