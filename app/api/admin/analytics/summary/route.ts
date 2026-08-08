import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import { getSummaryStats } from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const stats = await getSummaryStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("[admin/analytics/summary]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
