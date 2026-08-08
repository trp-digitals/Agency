"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Client wrapper for AnalyticsTracker
// next/dynamic with ssr:false must live in a Client Component — not layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
import dynamic from "next/dynamic";

const AnalyticsTracker = dynamic(
  () => import("@/components/analytics/AnalyticsTracker"),
  { ssr: false }
);

export default function AnalyticsTrackerWrapper() {
  return <AnalyticsTracker />;
}
