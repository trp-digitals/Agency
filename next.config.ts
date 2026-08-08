import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Package Optimization ────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },

  // ── Compression ───────────────────────────────────────────────────────────────
  // Enable gzip/brotli compression for all responses
  compress: true,

  // ── Security ─────────────────────────────────────────────────────────────────
  // Remove the X-Powered-By header to avoid fingerprinting
  poweredByHeader: false,

  // ── Image Optimization ────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Serve modern image formats — significant Core Web Vitals improvement
    formats: ["image/avif", "image/webp"],
    // Allow SVG images (used in icons)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Reasonable device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── HTTP Headers ─────────────────────────────────────────────────────────────
  async headers() {
    return [
      // ── Security headers on all routes ──────────────────────────────────────
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Deny iframe embedding (clickjacking protection)
          { key: "X-Frame-Options", value: "DENY" },
          // Enable XSS filter in older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Referrer policy — share origin on same-site, strip on cross-site
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unnecessary browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },

      // ── Long-term cache for static assets (fonts, images, etc.) ─────────────
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2|woff)$)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ── Sitemap and robots — short cache so changes propagate quickly ────────
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect trailing slashes to canonical non-trailing-slash URLs
      // (Next.js handles most of this automatically, but explicit for /index.html)
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
