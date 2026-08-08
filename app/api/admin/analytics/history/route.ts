import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import { getViewsHistory } from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") ?? "30d") as "1d" | "7d" | "30d" | "90d" | "all";
    const history = await getViewsHistory(range);
    return NextResponse.json(history);
  } catch (err) {
    console.error("[admin/analytics/history]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
