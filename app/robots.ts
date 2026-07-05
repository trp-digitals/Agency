import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * Production-ready robots.txt
 * Next.js serves this at /robots.txt
 * Follows Google's recommendations.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all search engine crawlers
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",       // API routes — not meaningful pages
          "/_next/",     // Next.js internal static files
          "/admin/",     // Future admin area
          "/dashboard/", // Future authenticated dashboard
          "/login",      // Future auth pages
          "/register",
          "/404",        // Error pages should not be indexed
          "/500",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
