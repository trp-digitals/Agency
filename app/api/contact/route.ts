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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json(
        { error: "Web3Forms Access Key is missing in environment variables" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        phone: phone || "N/A",
        subject: `New Inquiry from ${name} - ${projectType}`,
        project_type: projectType,
        message: message,
        from_name: "TRP Digitals Contact Form",
      }),
    });

    const data = await response.json();

    if (!data.success) {
      console.error("Web3Forms API Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email via Web3Forms" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

