import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * Auto-generated sitemap.xml
 * Next.js serves this at /sitemap.xml
 *
 * Rules:
 * - Auth pages (e.g. /login, /dashboard) are excluded
 * - Legal pages have low priority + yearly changefreq
 * - Core marketing pages have high priority + weekly/daily changefreq
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Homepage ────────────────────────────────────────────────────────────────
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // ── Core Marketing Pages ─────────────────────────────────────────────────────
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Legal Pages ──────────────────────────────────────────────────────────────
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // ── NOTE: The following paths are intentionally excluded ─────────────────────
    // /api/*        — API routes (not pages)
    // /dashboard/*  — Private/authenticated pages (add noindex + exclude here)
    // /login        — Auth pages
    // /admin/*      — Admin areas
  ];
}
