import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

/**
 * Web App Manifest
 * Next.js serves this at /manifest.webmanifest
 * Enables PWA installation and proper app metadata on mobile.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    lang: "en-IN",
    scope: "/",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [],
    shortcuts: [
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Get in touch with TRP Digitals",
        url: "/contact",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Our Services",
        short_name: "Services",
        description: "Explore our digital services",
        url: "/services",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
