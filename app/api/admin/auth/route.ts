import { NextResponse } from "next/server";
import { setAdminSession, clearAdminSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/crypto";
import { isRateLimited, recordFailedAttempt, resetRateLimit } from "@/lib/rateLimit";

const DEFAULT_ADMIN_EMAIL = "trpdigitals.dev@gmail.com";
const DEFAULT_ADMIN_PASSWORD_HASH = "223dcca0e3084a16dc97992bfeddba9e:74b3afa96022885e13d3bba877a38c680cbe0637a596c592e32c24e24ef93035b8ff2c6e208de8f6cf15d7c2523059862c185a96801b248704ef02147db92777";

export async function POST(req: Request) {
  // Get IP address for rate-limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
             req.headers.get("x-real-ip")?.trim() || 
             "127.0.0.1";

  // Check rate limit status
  const limitStatus = isRateLimited(ip);
  if (limitStatus.limited) {
    return NextResponse.json(
      { error: `Too many failed attempts. Please try again in ${limitStatus.timeLeftSeconds} seconds.` },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await req.json();

    const expectedUsername = process.env.ADMIN_USERNAME || DEFAULT_ADMIN_EMAIL;
    const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;

    const isUsernameValid = email?.toLowerCase().trim() === expectedUsername.toLowerCase().trim();
    const isPasswordValid = await verifyPassword(password || "", expectedPasswordHash);

    if (isUsernameValid && isPasswordValid) {
      // Clear rate limit bucket on successful authentication
      resetRateLimit(ip);
      await setAdminSession();
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    // Record failed attempt and reject
    recordFailedAttempt(ip);
    
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  } catch (err: any) {
    console.error("Auth login error:", err);
    return NextResponse.json(
      { error: "An error occurred during authentication." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (err: any) {
    console.error("Auth logout error:", err);
    return NextResponse.json(
      { error: "An error occurred during logout." },
      { status: 500 }
    );
  }
}
