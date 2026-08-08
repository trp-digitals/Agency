import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import { getActiveNow } from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const count = await getActiveNow();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[admin/analytics/active]", err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
