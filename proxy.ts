import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession } from "./lib/crypto";

const SESSION_COOKIE = "admin_session";
const DEFAULT_SESSION_SECRET = "trp_session_default_secret_key_2026_xyz";
const DEFAULT_ADMIN_USERNAME = "trpdigitals.dev@gmail.com";

const getSessionSecret = () => process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET;
const getAdminUsername = () => process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/trp-67.73/login";
  const isAuthApi = pathname === "/api/admin/auth";

  const isMatchingAdminPage = pathname.startsWith("/trp-67.73") && !isLoginPage;
  const isMatchingAdminApi = pathname.startsWith("/api/admin") && !isAuthApi;

  if (isMatchingAdminPage || isMatchingAdminApi) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE);
    let authenticated = false;

    if (sessionCookie && sessionCookie.value) {
      const payload = await decryptSession(sessionCookie.value, getSessionSecret());
      if (payload) {
        const expectedUsername = getAdminUsername().toLowerCase().trim();
        const sessionUsername = payload.username?.toLowerCase().trim();
        const isUsernameValid = sessionUsername === expectedUsername;
        const isNotExpired = payload.expiresAt && Date.now() < payload.expiresAt;
        
        if (isUsernameValid && isNotExpired) {
          authenticated = true;
        }
      }
    }

    if (!authenticated) {
      // Hide the admin dashboard by returning a generic 404 page
      if (isMatchingAdminPage) {
        return NextResponse.rewrite(new URL("/404", request.url));
      }
      
      // Hide admin APIs by returning 404 Not Found error
      if (isMatchingAdminApi) {
        return new NextResponse(
          JSON.stringify({ error: "Not Found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/trp-67.73/:path*",
    "/api/admin/:path*",
  ],
};
