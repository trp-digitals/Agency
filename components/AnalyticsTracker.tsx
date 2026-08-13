"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "trp_visitor_id";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/trp-67.73")) return;

    // Normalize path to ignore trailing slashes and query params
    let normalizedPath = pathname.toLowerCase().split("?")[0].split("#")[0];
    if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    // Ref-guard to avoid duplicate tracking in React Strict Mode for the exact same path load
    const trackingKey = `${normalizedPath}`;
    if (lastTrackedKeyRef.current === trackingKey) {
      return;
    }
    lastTrackedKeyRef.current = trackingKey;

    // Read cached visitorId from localStorage if cookie was cleared
    let storedVisitorId: string | null = null;
    try {
      storedVisitorId = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Ignore localStorage access errors (e.g., restricted iframe/incognito)
    }

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: normalizedPath,
        visitorId: storedVisitorId || undefined,
      }),
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.visitorId) {
          try {
            localStorage.setItem(STORAGE_KEY, data.visitorId);
          } catch {
            // Ignore localStorage errors
          }
        }
      })
      .catch((err) => {
        console.error("Analytics tracking error:", err);
      });
  }, [pathname]);

  return null;
}
