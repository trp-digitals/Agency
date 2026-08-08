// ─────────────────────────────────────────────────────────────────────────────
// Next.js Proxy (formerly "middleware") — Admin Route Protection
// Runs on Edge runtime — uses jose for JWT verification (no Node.js crypto).
// Next.js 16+ uses "proxy.ts" instead of "middleware.ts"
//
// Rules:
//   /admin/login       → always accessible
//   /admin/*           → redirect to /admin/login if no valid JWT
//   /api/admin/*       → return 401 JSON if no valid JWT
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "trp_admin_token";

function getSecret() {
  const secret = process.env.ANALYTICS_JWT_SECRET?.trim();
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    const secret = getSecret();
    if (!secret) return false;
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and login API endpoint through — no auth check
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/login/" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/login/"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = token ? await isValidToken(token) : false;

  // ── Protect /admin pages ────────────────────────────────────────────────────
  if (pathname === "/admin" || pathname === "/admin/" || pathname.startsWith("/admin/")) {
    if (!authenticated) {
      const target = (pathname === "/admin" || pathname === "/admin/") ? "/admin/analytics" : pathname;
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", target);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ── Protect /api/admin/* routes ────────────────────────────────────────────
  if (pathname.startsWith("/api/admin")) {
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
