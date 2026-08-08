import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import { getTopPages } from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await getTopPages(10);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[admin/analytics/pages]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
