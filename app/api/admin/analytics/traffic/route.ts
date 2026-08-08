import { NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/analytics/auth";
import { getTrafficData } from "@/lib/analytics/queries";

export async function GET(request: Request) {
  if (!(await isAuthenticatedRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") as "1d" | "7d" | "30d" | "90d" | null;
    const validRange = ["1d", "7d", "30d", "90d"].includes(range ?? "") ? range! : "7d";
    const data = await getTrafficData(validRange);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[admin/analytics/traffic]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
