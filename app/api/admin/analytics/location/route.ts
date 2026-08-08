import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import {
  getLocationSummaryStats,
  getLocationBreakdown,
  getLocationPageBreakdown,
} from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") || "all") as "1d" | "7d" | "30d" | "90d" | "all";
    const level = (searchParams.get("level") || "country") as "country" | "region" | "city";
    const location = searchParams.get("location");

    const [summary, list] = await Promise.all([
      getLocationSummaryStats(range),
      getLocationBreakdown(range, level),
    ]);

    let details = null;
    if (location) {
      details = await getLocationPageBreakdown(location, level, range);
    }

    return NextResponse.json({ summary, list, details });
  } catch (err) {
    console.error("[admin/analytics/location]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
