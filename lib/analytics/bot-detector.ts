// ─────────────────────────────────────────────────────────────────────────────
// Bot & Crawler Detection Engine for TRP Digitals Analytics
//
// Filters out search engine bots, social media link previewers, SEO scrapers,
// monitoring services, and automated headless scripts from view counting.
// ─────────────────────────────────────────────────────────────────────────────

// Common bot & crawler keywords in lower-case
const BOT_PATTERNS = [
  // Search engines
  "googlebot",
  "bingbot",
  "yandexbot",
  "baiduspider",
  "duckduckbot",
  "slurp",
  "sogou",
  "exabot",

  // Social media preview crawlers
  "twitterbot",
  "facebookexternalhit",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "pinterest",
  "slackbot",
  "discordbot",
  "embedly",
  "quora link preview",

  // SEO & Marketing crawlers
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "petalbot",
  "rogerbot",
  "screaming frog",
  "serpstatbot",
  "dataforseo",

  // Uptime & Monitoring services
  "uptimerobot",
  "pingdom",
  "statuscake",
  "datadog",
  "site24x7",
  "uptimemonitor",
  "betteruptime",
  "hetrixtools",

  // Headless browsers & Automation engines
  "puppeteer",
  "playwright",
  "selenium",
  "phantomjs",
  "headlesschrome",
  "cypress",
  "k6",
  "postmanruntime",
  "curl",
  "wget",
  "python-requests",
  "python-urllib",
  "go-http-client",
  "apache-httpclient",
  "axios/",
  "node-fetch",
  "got/",
  "java/",
  "libwww-perl",
  "scrapy",
];

// In-memory sliding window tracker for server-side anomaly detection
// Tracks request timestamps per visitorId to flag rapid automated requests
const visitorWindowMap = new Map<string, number[]>();

// Clean up sliding window map periodically (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  const cutoff = now - 60_000; // Keep 1 minute history
  for (const [vid, timestamps] of visitorWindowMap.entries()) {
    const valid = timestamps.filter((t) => t > cutoff);
    if (valid.length === 0) {
      visitorWindowMap.delete(vid);
    } else {
      visitorWindowMap.set(vid, valid);
    }
  }
}, 10 * 60 * 1000);

/**
 * Checks if a request comes from an obvious bot or automated crawler.
 */
export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent || typeof userAgent !== "string" || userAgent.trim() === "") {
    return true; // Missing or empty User-Agent is flagged
  }

  const ua = userAgent.toLowerCase();

  // Explicit keyword search
  for (const pattern of BOT_PATTERNS) {
    if (ua.includes(pattern)) {
      return true;
    }
  }

  // Regex check for bot/crawler/spider flags
  if (/bot|crawler|spider|scraper|headless|checker|archiver/i.test(ua)) {
    return true;
  }

  return false;
}

/**
 * Server-side anomaly detection for rapid automated request patterns.
 * Flag if visitor makes > 15 analytics requests within 10 seconds.
 */
export function isSuspiciousActivity(visitorId: string): boolean {
  if (!visitorId) return true;

  const now = Date.now();
  const windowMs = 10_000; // 10 seconds
  const maxAllowedInWindow = 15;

  let timestamps = visitorWindowMap.get(visitorId);
  if (!timestamps) {
    timestamps = [];
    visitorWindowMap.set(visitorId, timestamps);
  }

  // Filter timestamps within window
  const recent = timestamps.filter((t) => now - t < windowMs);
  recent.push(now);
  visitorWindowMap.set(visitorId, recent);

  if (recent.length > maxAllowedInWindow) {
    return true; // Suspicious rapid automated pattern
  }

  return false;
}
