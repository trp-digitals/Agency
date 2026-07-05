"use client";

import Link from "next/link";

/**
 * Global error boundary — catches unhandled errors (equivalent to 500).
 * Must be a Client Component per Next.js requirements.
 * noindex is handled via the generateMetadata convention; since this is a
 * client component, we use a meta tag directly.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Something went wrong | TRP Digitals</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#0a0a0a",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "560px" }}>
            {/* Error Code */}
            <p
              style={{
                color: "#c084fc",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              500 · Server Error
            </p>

            {/* Heading */}
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Something went wrong
            </h1>

            {/* Description */}
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "18px",
                lineHeight: 1.6,
                marginBottom: "12px",
              }}
            >
              An unexpected error occurred. Our team has been notified. Please
              try again or return home.
            </p>

            {/* Digest for debugging */}
            {error.digest && (
              <p
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  marginBottom: "40px",
                }}
              >
                Error ID: {error.digest}
              </p>
            )}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: "14px 32px",
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <Link
                href="/"
                style={{
                  padding: "14px 32px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
