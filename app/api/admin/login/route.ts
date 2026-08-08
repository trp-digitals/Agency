// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/login
// Verifies the admin password hash and sets a secure HttpOnly JWT cookie.
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, COOKIE_NAME } from "@/lib/analytics/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const hash = process.env.ANALYTICS_ADMIN_PASSWORD_HASH?.trim();
    if (!hash) {
      console.error("ANALYTICS_ADMIN_PASSWORD_HASH is not configured");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const valid = await bcrypt.compare(password.trim(), hash);
    if (!valid) {
      // Consistent timing — don't reveal whether password or hash was the issue
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signAdminToken();

    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
