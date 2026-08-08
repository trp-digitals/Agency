import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import { getGeoBreakdown } from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await getGeoBreakdown();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[admin/analytics/geo]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
