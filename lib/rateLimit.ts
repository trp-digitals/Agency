interface RateLimitBucket {
  attempts: number;
  resetTime: number;
}

const store = new Map<string, RateLimitBucket>();

const LIMIT = 5; // Max 5 failed attempts
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window

/**
 * Check if the given IP address is rate-limited.
 */
export function isRateLimited(ip: string): { limited: boolean; timeLeftSeconds: number } {
  const now = Date.now();
  const bucket = store.get(ip);
  
  if (!bucket) {
    return { limited: false, timeLeftSeconds: 0 };
  }

  // If window has passed, reset the bucket
  if (now > bucket.resetTime) {
    store.delete(ip);
    return { limited: false, timeLeftSeconds: 0 };
  }

  if (bucket.attempts >= LIMIT) {
    const timeLeftSeconds = Math.ceil((bucket.resetTime - now) / 1000);
    return { limited: true, timeLeftSeconds };
  }

  return { limited: false, timeLeftSeconds: 0 };
}

/**
 * Increment the failed login attempt counter for the given IP.
 */
export function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const bucket = store.get(ip);

  if (!bucket) {
    store.set(ip, {
      attempts: 1,
      resetTime: now + WINDOW_MS,
    });
  } else {
    if (now > bucket.resetTime) {
      store.set(ip, {
        attempts: 1,
        resetTime: now + WINDOW_MS,
      });
    } else {
      bucket.attempts += 1;
    }
  }
}

/**
 * Reset the failed login attempts bucket for the given IP upon successful login.
 */
export function resetRateLimit(ip: string) {
  store.delete(ip);
}
