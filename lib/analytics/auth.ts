// ─────────────────────────────────────────────────────────────────────────────
// Admin JWT Auth Helpers — uses jose (Edge-compatible, no Node crypto needed)
// ─────────────────────────────────────────────────────────────────────────────
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "trp_admin_token";
const TOKEN_EXPIRY = "7d";

function getSecret() {
  const secret = process.env.ANALYTICS_JWT_SECRET?.trim();
  if (!secret) throw new Error("ANALYTICS_JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

/** Sign a new admin JWT and return it as a string. */
export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getSecret());
}

/** Verify an admin JWT. Returns true if valid. */
export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

/** Read the admin token from the request cookies (for API routes). */
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? match[1] : null;
}

/** Check if the current server-side request is an authenticated admin. */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}

/** Check if an API request is an authenticated admin (from Request object). */
export async function isAuthenticatedRequest(request: Request): Promise<boolean> {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
