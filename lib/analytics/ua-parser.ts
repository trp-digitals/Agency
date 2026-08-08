// ─────────────────────────────────────────────────────────────────────────────
// Lightweight User-Agent Parser — no external library needed
// ─────────────────────────────────────────────────────────────────────────────

export function parseUserAgent(ua: string): {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
} {
  const s = ua.toLowerCase();

  // Device type
  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  if (/tablet|ipad|playbook|silk|(android(?!.*mobile))/i.test(ua)) {
    deviceType = "tablet";
  } else if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry|opera mini/i.test(ua)) {
    deviceType = "mobile";
  }

  // Browser
  let browser = "Other";
  if (s.includes("edg/") || s.includes("edge/")) browser = "Edge";
  else if (s.includes("opr/") || s.includes("opera")) browser = "Opera";
  else if (s.includes("chrome") && !s.includes("chromium")) browser = "Chrome";
  else if (s.includes("firefox")) browser = "Firefox";
  else if (s.includes("safari") && !s.includes("chrome")) browser = "Safari";
  else if (s.includes("msie") || s.includes("trident")) browser = "IE";

  // OS
  let os = "Other";
  if (s.includes("windows nt")) os = "Windows";
  else if (s.includes("mac os x") && !s.includes("iphone") && !s.includes("ipad")) os = "macOS";
  else if (s.includes("iphone") || s.includes("ipad") || s.includes("ipod")) os = "iOS";
  else if (s.includes("android")) os = "Android";
  else if (s.includes("linux")) os = "Linux";

  return { deviceType, browser, os };
}

/** Strip a referrer URL to just its origin (e.g. "https://google.com"). */
export function sanitizeReferrer(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    // Only keep origin, discard path/query/hash
    return url.origin;
  } catch {
    return null;
  }
}

/** Validate that a pathname is a safe internal path. */
export function isValidPathname(pathname: string): boolean {
  if (!pathname || typeof pathname !== "string") return false;
  if (pathname.length > 512) return false;
  // Must start with /
  if (!pathname.startsWith("/")) return false;
  // No null bytes or obvious injection attempts
  if (/[\x00<>]/.test(pathname)) return false;
  return true;
}
