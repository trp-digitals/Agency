import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { realtimeEmitter } from "@/lib/realtime";

export async function POST(req: Request) {
  return NextResponse.json({ error: "Not Found" }, { status: 404 });
  /*
  try {
    const body = await req.json();
    ...
  } catch (err: any) {
    ...
  }
  */
}
