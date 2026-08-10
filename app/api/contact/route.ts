import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, message, bot_trap } = body;

    // Honeypot spam check - silently succeed if bot filled the hidden field
    if (bot_trap) {
      console.warn("Spam submission detected and blocked by honeypot.");
      return NextResponse.json({ success: true, message: "Submission received" });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration missing on server.");
      return NextResponse.json(
        { error: "Email service configuration is incomplete on server." },
        { status: 500 }
      );
    }

    // Call EmailJS REST API server-to-server
    const emailJsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: {
          from_name: name,
          name: name,
          from_email: email,
          email: email,
          phone: phone || "Not provided",
          project_type: projectType || "General Inquiry",
          projectType: projectType || "General Inquiry",
          message: message,
        },
      }),
    });

    if (!emailJsRes.ok) {
      const errorText = await emailJsRes.text();
      console.error("EmailJS API Error:", emailJsRes.status, errorText);
      return NextResponse.json(
        { error: `Failed to send email (${errorText || emailJsRes.statusText})` },
        { status: emailJsRes.status }
      );
    }

    return NextResponse.json({ success: true, message: "Submission received successfully" });
  } catch (err: any) {
    console.error("Contact API Exception:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}


