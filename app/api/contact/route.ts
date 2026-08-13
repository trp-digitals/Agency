import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { realtimeEmitter } from "@/lib/realtime";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phoneNumber, servicesNeeded, projectDetails, bot_trap } = body;

    // Honeypot spam check - silently succeed if bot filled the hidden field
    if (bot_trap) {
      console.warn("Spam submission detected and blocked by honeypot.");
      return NextResponse.json({ success: true, message: "Submission received" });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Your name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    if (!servicesNeeded || !Array.isArray(servicesNeeded) || servicesNeeded.length === 0) {
      return NextResponse.json({ error: "Please select at least one service needed" }, { status: 400 });
    }

    if (!projectDetails || typeof projectDetails !== "string" || !projectDetails.trim()) {
      return NextResponse.json({ error: "Project details are required" }, { status: 400 });
    }

    // Save to NeonDB via Prisma
    const newSubmission = await db.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber?.trim() || null,
        servicesNeeded: servicesNeeded,
        projectDetails: projectDetails.trim(),
        status: "NEW",
      },
    });

    // Broadcast the event to all SSE clients
    realtimeEmitter.emit("update", {
      type: "NEW_CONTACT_SUBMISSION",
      data: newSubmission,
    });

    // Trigger EmailJS REST API server-to-server call (preserving existing functionality)
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        const formattedServices = servicesNeeded.join(", ");
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
              phone: phoneNumber || "Not provided",
              project_type: formattedServices,
              projectType: formattedServices,
              message: projectDetails,
            },
          }),
        });

        if (!emailJsRes.ok) {
          const errorText = await emailJsRes.text();
          console.error("EmailJS API Error:", emailJsRes.status, errorText);
        }
      } catch (emailJsErr) {
        console.error("Failed to send email via EmailJS:", emailJsErr);
      }
    } else {
      console.warn("EmailJS credentials missing. Saved to DB, but email dispatch skipped.");
    }

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      submission: newSubmission,
    });
  } catch (err: any) {
    console.error("Contact API Exception:", err);
    return NextResponse.json(
      { error: "Unable to submit your request right now. Please try again." },
      { status: 500 }
    );
  }
}
