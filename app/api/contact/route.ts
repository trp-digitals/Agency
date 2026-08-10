import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Contact Form Submission:", { name, email, phone, projectType, message });

    return NextResponse.json({ success: true, message: "Submission received successfully" });
  } catch (err: any) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

