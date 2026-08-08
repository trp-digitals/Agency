// ─────────────────────────────────────────────────────────────────────────────
// Analytics Dashboard DB Queries — Validated Website Views Engine
//
// All queries filter out internal /admin paths, flagged bots (isBot = true),
// and non-pageview events to expose accurate, deduplicated statistics.
// ─────────────────────────────────────────────────────────────────────────────
import { Prisma } from "@prisma/client";
import prisma from "./db";

// Base filter for public, non-bot, validated page views
const validatedViewWhere: Prisma.AnalyticsEventWhereInput = {
  NOT: { pathname: { startsWith: "/admin" } },
  isBot: false,
  eventType: "PAGE_VIEW",
};

// ── Date Helpers ─────────────────────────────────────────────────────────────

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getRangeDate(range: "1d" | "7d" | "30d" | "90d" | "all"): Date | null {
  if (range === "1d") return startOfDay(new Date());
  if (range === "7d") return daysAgo(7);
  if (range === "30d") return daysAgo(30);
  if (range === "90d") return daysAgo(90);
  return null;
}

// ── Summary Stats ────────────────────────────────────────────────────────────

export async function getSummaryStats() {
  const todayStart = startOfDay(new Date());
  const last7Start = daysAgo(7);
  const last30Start = daysAgo(30);
  const last90Start = daysAgo(90);

  const [
    totalPageViews,
    todayPageViews,
    last7PageViews,
    last30PageViews,
    last90PageViews,
    totalUniqueVisitors,
    todayUniqueVisitors,
    last7UniqueVisitors,
    last30UniqueVisitors,
    totalSessions,
    todaySessions,
    last7Sessions,
    last30Sessions,
  ] = await Promise.all([
    // Total Validated Page Views
    prisma.analyticsEvent.count({ where: validatedViewWhere }),
    // Today's Validated Page Views
    prisma.analyticsEvent.count({
      where: { AND: [validatedViewWhere, { timestamp: { gte: todayStart } }] },
    }),
    // Last 7 days Validated Page Views
    prisma.analyticsEvent.count({
      where: { AND: [validatedViewWhere, { timestamp: { gte: last7Start } }] },
    }),
    // Last 30 days Validated Page Views
    prisma.analyticsEvent.count({
      where: { AND: [validatedViewWhere, { timestamp: { gte: last30Start } }] },
    }),
    // Last 90 days Validated Page Views
    prisma.analyticsEvent.count({
      where: { AND: [validatedViewWhere, { timestamp: { gte: last90Start } }] },
    }),

    // Unique Visitors
    prisma.analyticsEvent
      .findMany({
        where: validatedViewWhere,
        select: { visitorId: true },
        distinct: ["visitorId"],
      })
      .then((r) => r.length),
    prisma.analyticsEvent
      .findMany({
        where: { AND: [validatedViewWhere, { timestamp: { gte: todayStart } }] },
        select: { visitorId: true },
        distinct: ["visitorId"],
      })
      .then((r) => r.length),
    prisma.analyticsEvent
      .findMany({
        where: { AND: [validatedViewWhere, { timestamp: { gte: last7Start } }] },
        select: { visitorId: true },
        distinct: ["visitorId"],
      })
      .then((r) => r.length),
    prisma.analyticsEvent
      .findMany({
        where: { AND: [validatedViewWhere, { timestamp: { gte: last30Start } }] },
        select: { visitorId: true },
        distinct: ["visitorId"],
      })
      .then((r) => r.length),

    // Sessions
    prisma.analyticsEvent
      .findMany({
        where: validatedViewWhere,
        select: { sessionId: true },
        distinct: ["sessionId"],
      })
      .then((r) => r.length),
    prisma.analyticsEvent
      .findMany({
        where: { AND: [validatedViewWhere, { timestamp: { gte: todayStart } }] },
        select: { sessionId: true },
        distinct: ["sessionId"],
      })
      .then((r) => r.length),
    prisma.analyticsEvent
      .findMany({
        where: { AND: [validatedViewWhere, { timestamp: { gte: last7Start } }] },
        select: { sessionId: true },
        distinct: ["sessionId"],
      })
      .then((r) => r.length),
    prisma.analyticsEvent
      .findMany({
        where: { AND: [validatedViewWhere, { timestamp: { gte: last30Start } }] },
        select: { sessionId: true },
        distinct: ["sessionId"],
      })
      .then((r) => r.length),
  ]);

  return {
    totalPageViews,
    todayPageViews,
    last7PageViews,
    last30PageViews,
    last90PageViews,
    totalUniqueVisitors,
    todayUniqueVisitors,
    last7UniqueVisitors,
    last30UniqueVisitors,
    totalSessions,
    todaySessions,
    last7Sessions,
    last30Sessions,
  };
}

// ── Traffic & View History Data ──────────────────────────────────────────────

export async function getTrafficData(range: "1d" | "7d" | "30d" | "90d" | "all" = "7d") {
  const days = range === "1d" ? 1 : range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 365;
  const since = daysAgo(days);

  const events = await prisma.analyticsEvent.findMany({
    where: { AND: [validatedViewWhere, { timestamp: { gte: since } }] },
    select: { timestamp: true, visitorId: true, sessionId: true },
    orderBy: { timestamp: "asc" },
  });

  const byDate = new Map<string, { pageViews: number; visitors: Set<string>; sessions: Set<string> }>();
  for (const e of events) {
    const key = e.timestamp.toISOString().slice(0, 10);
    if (!byDate.has(key)) {
      byDate.set(key, { pageViews: 0, visitors: new Set(), sessions: new Set() });
    }
    const day = byDate.get(key)!;
    day.pageViews++;
    day.visitors.add(e.visitorId);
    day.sessions.add(e.sessionId);
  }

  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const day = byDate.get(key);
    result.push({
      date: key,
      pageViews: day?.pageViews ?? 0,
      visitors: day?.visitors.size ?? 0,
      sessions: day?.sessions.size ?? 0,
    });
  }

  return result;
}

export async function getViewsHistory(range: "1d" | "7d" | "30d" | "90d" | "all" = "30d") {
  const since = getRangeDate(range);
  const where: Prisma.AnalyticsEventWhereInput = since
    ? { AND: [validatedViewWhere, { timestamp: { gte: since } }] }
    : validatedViewWhere;

  const events = await prisma.analyticsEvent.findMany({
    where,
    select: { timestamp: true, visitorId: true, sessionId: true },
    orderBy: { timestamp: "desc" },
  });

  const byDate = new Map<string, { pageViews: number; visitors: Set<string>; sessions: Set<string> }>();
  for (const e of events) {
    const dateStr = e.timestamp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (!byDate.has(dateStr)) {
      byDate.set(dateStr, { pageViews: 0, visitors: new Set(), sessions: new Set() });
    }
    const day = byDate.get(dateStr)!;
    day.pageViews++;
    day.visitors.add(e.visitorId);
    day.sessions.add(e.sessionId);
  }

  return Array.from(byDate.entries()).map(([date, data]) => ({
    date,
    pageViews: data.pageViews,
    visitors: data.visitors.size,
    sessions: data.sessions.size,
  }));
}

// ── Top Pages ────────────────────────────────────────────────────────────────

export async function getTopPages(limit = 10) {
  const result = await prisma.analyticsEvent.groupBy({
    where: validatedViewWhere,
    by: ["pathname"],
    _count: { pathname: true },
    orderBy: { _count: { pathname: "desc" } },
    take: limit,
  });

  return result.map((r) => ({
    pathname: r.pathname,
    views: r._count.pathname,
  }));
}

// ── Traffic Sources ──────────────────────────────────────────────────────────

export async function getTrafficSources() {
  const events = await prisma.analyticsEvent.findMany({
    where: validatedViewWhere,
    select: { referrer: true },
  });

  const counts: Record<string, number> = {};
  for (const e of events) {
    const source = classifyReferrer(e.referrer);
    counts[source] = (counts[source] ?? 0) + 1;
  }

  const total = events.length || 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({
      source,
      count,
      percent: Math.round((count / total) * 100),
    }));
}

function classifyReferrer(referrer: string | null): string {
  if (!referrer) return "Direct";
  const r = referrer.toLowerCase();
  if (r.includes("google")) return "Google";
  if (r.includes("instagram")) return "Instagram";
  if (r.includes("linkedin")) return "LinkedIn";
  if (r.includes("facebook")) return "Facebook";
  if (r.includes("twitter") || r.includes("x.com")) return "Twitter / X";
  if (r.includes("whatsapp")) return "WhatsApp";
  if (r.includes("youtube")) return "YouTube";
  return "Other";
}

// ── Devices Breakdown ─────────────────────────────────────────────────────────

export async function getDeviceBreakdown() {
  const [deviceResult, browserResult, osResult] = await Promise.all([
    prisma.analyticsEvent.groupBy({
      where: validatedViewWhere,
      by: ["deviceType"],
      _count: { deviceType: true },
      orderBy: { _count: { deviceType: "desc" } },
    }),
    prisma.analyticsEvent.groupBy({
      where: validatedViewWhere,
      by: ["browser"],
      _count: { browser: true },
      orderBy: { _count: { browser: "desc" } },
      take: 6,
    }),
    prisma.analyticsEvent.groupBy({
      where: validatedViewWhere,
      by: ["os"],
      _count: { os: true },
      orderBy: { _count: { os: "desc" } },
      take: 6,
    }),
  ]);

  const total = deviceResult.reduce((s, r) => s + r._count.deviceType, 0) || 1;

  return {
    devices: deviceResult.map((r) => ({
      type: r.deviceType ?? "Unknown",
      count: r._count.deviceType,
      percent: Math.round((r._count.deviceType / total) * 100),
    })),
    browsers: browserResult.map((r) => ({
      name: r.browser ?? "Unknown",
      count: r._count.browser,
    })),
    os: osResult.map((r) => ({
      name: r.os ?? "Unknown",
      count: r._count.os,
    })),
  };
}

// ── Geography Breakdown & Location + View Count ──────────────────────────────

export async function getGeoBreakdown() {
  const result = await prisma.analyticsEvent.groupBy({
    where: validatedViewWhere,
    by: ["country"],
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: 10,
  });

  const total = result.reduce((s, r) => s + r._count.country, 0) || 1;

  return result.map((r) => ({
    country: r.country ?? "Unknown",
    count: r._count.country,
    percent: Math.round((r._count.country / total) * 100),
  }));
}

export async function getLocationSummaryStats(
  range: "1d" | "7d" | "30d" | "90d" | "all" = "all"
) {
  const since = getRangeDate(range);
  const where: Prisma.AnalyticsEventWhereInput = since
    ? { AND: [validatedViewWhere, { timestamp: { gte: since } }] }
    : validatedViewWhere;

  const events = await prisma.analyticsEvent.findMany({
    where,
    select: { visitorId: true, country: true, region: true, city: true },
  });

  const countryVisitors = new Map<string, Set<string>>();
  const regionVisitors = new Map<string, Set<string>>();
  const cityVisitors = new Map<string, Set<string>>();

  for (const e of events) {
    const country = e.country || "Unknown";
    const region = e.region || "Unknown";
    const city = e.city || "Unknown";

    if (country !== "Unknown") {
      if (!countryVisitors.has(country)) countryVisitors.set(country, new Set());
      countryVisitors.get(country)!.add(e.visitorId);
    }

    if (region !== "Unknown") {
      if (!regionVisitors.has(region)) regionVisitors.set(region, new Set());
      regionVisitors.get(region)!.add(e.visitorId);
    }

    if (city !== "Unknown") {
      const cityKey = country !== "Unknown" ? `${city}, ${country}` : city;
      if (!cityVisitors.has(cityKey)) cityVisitors.set(cityKey, new Set());
      cityVisitors.get(cityKey)!.add(e.visitorId);
    }
  }

  const getTop = (map: Map<string, Set<string>>) => {
    let topName = "—";
    let maxCount = 0;
    for (const [name, set] of map.entries()) {
      if (set.size > maxCount) {
        maxCount = set.size;
        topName = name;
      }
    }
    return { name: topName, count: maxCount };
  };

  return {
    topLocation: getTop(cityVisitors),
    topCountry: getTop(countryVisitors),
    topRegion: getTop(regionVisitors),
  };
}

export async function getLocationBreakdown(
  range: "1d" | "7d" | "30d" | "90d" | "all" = "all",
  level: "country" | "region" | "city" = "country"
) {
  const since = getRangeDate(range);
  const where: Prisma.AnalyticsEventWhereInput = since
    ? { AND: [validatedViewWhere, { timestamp: { gte: since } }] }
    : validatedViewWhere;

  const events = await prisma.analyticsEvent.findMany({
    where,
    select: { visitorId: true, country: true, region: true, city: true },
  });

  const visitorSets = new Map<string, Set<string>>();
  const allVisitors = new Set<string>();

  for (const e of events) {
    allVisitors.add(e.visitorId);
    const val = (level === "country" ? e.country : level === "region" ? e.region : e.city) || "Unknown";
    if (!visitorSets.has(val)) visitorSets.set(val, new Set());
    visitorSets.get(val)!.add(e.visitorId);
  }

  const denominator = allVisitors.size || 1;

  const sorted = Array.from(visitorSets.entries())
    .map(([name, set]) => ({
      name,
      count: set.size,
      percent: Math.round((set.size / denominator) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return sorted;
}

export async function getLocationPageBreakdown(
  locationName: string,
  level: "country" | "region" | "city",
  range: "1d" | "7d" | "30d" | "90d" | "all" = "all"
) {
  const since = getRangeDate(range);
  const cleanLoc = locationName.split(",")[0].trim();

  const locFilter: Prisma.AnalyticsEventWhereInput =
    level === "country"
      ? { country: cleanLoc }
      : level === "region"
      ? { region: cleanLoc }
      : { city: cleanLoc };

  const where: Prisma.AnalyticsEventWhereInput = since
    ? { AND: [validatedViewWhere, locFilter, { timestamp: { gte: since } }] }
    : { AND: [validatedViewWhere, locFilter] };

  const events = await prisma.analyticsEvent.findMany({
    where,
    select: { pathname: true, visitorId: true },
  });

  const uniqueVisitors = new Set(events.map((e) => e.visitorId)).size;

  const pageCounts: Record<string, number> = {};
  for (const e of events) {
    pageCounts[e.pathname] = (pageCounts[e.pathname] || 0) + 1;
  }

  const pageViews = Object.entries(pageCounts)
    .map(([pathname, views]) => ({ pathname, views }))
    .sort((a, b) => b.views - a.views);

  return {
    location: locationName,
    visitorCount: uniqueVisitors,
    totalViews: events.length,
    pageViews,
  };
}

// ── Active Now (visitors active in last 5 minutes) ────────────────────────────

export async function getActiveNow() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const result = await prisma.analyticsEvent.findMany({
    where: { AND: [validatedViewWhere, { timestamp: { gte: fiveMinutesAgo } }] },
    select: { visitorId: true },
    distinct: ["visitorId"],
  });
  return result.length;
}
