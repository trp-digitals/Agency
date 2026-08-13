import { cookies } from "next/headers";
import { encryptSession, decryptSession } from "./crypto";

const SESSION_COOKIE = "admin_session";
const DEFAULT_SESSION_SECRET = "trp_session_default_secret_key_2026_xyz";
const DEFAULT_ADMIN_USERNAME = "trpdigitals.dev@gmail.com";

const getSessionSecret = () => process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET;
const getAdminUsername = () => process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;

export async function isAuthenticatedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);
    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    const payload = await decryptSession(sessionCookie.value, getSessionSecret());
    if (!payload) {
      return false;
    }

    // Verify username matches and session hasn't expired
    const expectedUsername = getAdminUsername().toLowerCase().trim();
    const sessionUsername = payload.username?.toLowerCase().trim();
    const isUsernameValid = sessionUsername === expectedUsername;
    const isNotExpired = payload.expiresAt && Date.now() < payload.expiresAt;

    return !!(isUsernameValid && isNotExpired);
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

export async function setAdminSession() {
  try {
    const cookieStore = await cookies();
    const payload = {
      username: getAdminUsername(),
      expiresAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
    };

    const token = await encryptSession(payload, getSessionSecret());

    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });
  } catch (error) {
    console.error("Failed to set admin session:", error);
  }
}

export async function clearAdminSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
  } catch (error) {
    console.error("Failed to clear admin session:", error);
  }
}
