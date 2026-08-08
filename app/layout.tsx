import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { defaultMetadata, defaultViewport, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Suspense } from "react";
// Client wrapper handles dynamic(ssr:false) — cannot use ssr:false in Server Components
import AnalyticsTrackerWrapper from "@/components/analytics/AnalyticsTrackerWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
        {/* Analytics tracker — zero SSR, fire-and-forget, never blocks page */}
        <Suspense fallback={null}>
          <AnalyticsTrackerWrapper />
        </Suspense>
      </body>
    </html>
  );
}
