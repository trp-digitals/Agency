import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipientEmail = "trpdigitals.dev@gmail.com";

    const { data, error } = await resend.emails.send({
      from: "TRP Digitals Contact Form <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `New Inquiry from ${name} - ${projectType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 20px; color: #333; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
              .header { background: linear-gradient(135deg, #09090b 0%, #18181b 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
              .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
              .header p { margin: 6px 0 0 0; color: #a1a1aa; font-size: 14px; }
              .body { padding: 32px 24px; }
              .info-group { margin-bottom: 24px; }
              .label { font-size: 11px; text-transform: uppercase; font-weight: 700; color: #71717a; letter-spacing: 1px; margin-bottom: 6px; }
              .value { font-size: 16px; color: #09090b; font-weight: 500; }
              .badge { display: inline-block; background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; padding: 6px 14px; font-size: 14px; font-weight: 600; color: #18181b; }
              .message-box { background: #fafafa; border-left: 4px solid #c084fc; padding: 18px; border-radius: 8px; margin-top: 8px; line-height: 1.6; white-space: pre-wrap; font-size: 15px; color: #27272a; }
              .footer { background: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⚡ New Website Lead</h1>
                <p>TRP Digitals Contact Form</p>
              </div>
              <div class="body">
                <div class="info-group">
                  <div class="label">Client Name</div>
                  <div class="value"><strong>${name}</strong></div>
                </div>
                <div class="info-group">
                  <div class="label">Client Email</div>
                  <div class="value"><a href="mailto:${email}" style="color: #9333ea; text-decoration: none; font-weight: 600;">${email}</a></div>
                </div>
                <div class="info-group">
                  <div class="label">Project Interest</div>
                  <div class="value"><span class="badge">${projectType}</span></div>
                </div>
                <div class="info-group">
                  <div class="label">Project Details & Message</div>
                  <div class="message-box">${message}</div>
                </div>
              </div>
              <div class="footer">
                Sent from TRP Digitals Website • Reply directly to this email to respond to ${name}.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
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
