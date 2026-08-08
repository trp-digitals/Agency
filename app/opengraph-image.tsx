import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image generated via next/og
 * Served at /opengraph-image
 * 1200 × 630px — optimal for all social platforms
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px 80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Purple radial glow — top right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(192,132,252,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Purple radial glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#c084fc",
            }}
          />
          <span
            style={{
              color: "#c084fc",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Premium Digital Agency
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "88px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            TRP
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "88px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-3px",
            }}
          >
            Digitals
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: "620px",
            margin: "0",
          }}
        >
          We craft high-performance websites, mobile apps, and full-stack
          software solutions from Hyderabad, India.
        </p>

        {/* Bottom Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background:
              "linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)",
          }}
        />

        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "80px",
            color: "rgba(255,255,255,0.25)",
            fontSize: "16px",
            fontWeight: 600,
            letterSpacing: "2px",
          }}
        >
          trp-digitals.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
