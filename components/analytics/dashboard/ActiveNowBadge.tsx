"use client";
import { useEffect, useState } from "react";

interface ActiveNowBadgeProps {
  count?: number | null;
}

export default function ActiveNowBadge({ count: externalCount }: ActiveNowBadgeProps = {}) {
  const [internalCount, setInternalCount] = useState<number | null>(null);

  const count = externalCount !== undefined ? externalCount : internalCount;

  async function fetchActive() {
    if (externalCount !== undefined) return;
    try {
      const res = await fetch("/api/admin/analytics/active", { cache: "no-store" });
      if (res.ok) {
        const { count } = await res.json();
        setInternalCount(count);
      }
    } catch {
      // Silently ignore — non-critical
    }
  }

  useEffect(() => {
    if (externalCount !== undefined) return;
    fetchActive();
    // Poll every 3 seconds for live accuracy
    const interval = setInterval(fetchActive, 3_000);
    return () => clearInterval(interval);
  }, [externalCount]);

  if (count === null) return null;

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      padding: "0.4rem 0.875rem", borderRadius: "999px",
      background: count > 0 ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)",
      border: `1px solid ${count > 0 ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
    }}>
      {/* Pulsing dot */}
      <span style={{ position: "relative", display: "inline-flex" }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: count > 0 ? "#34d399" : "rgba(255,255,255,0.3)",
          animation: count > 0 ? "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" : "none",
          opacity: 0.6,
        }} />
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%", display: "block",
          background: count > 0 ? "#34d399" : "rgba(255,255,255,0.3)",
          position: "relative",
        }} />
      </span>
      <span style={{
        fontSize: "0.8rem", fontWeight: 700,
        color: count > 0 ? "#34d399" : "rgba(255,255,255,0.4)",
        fontVariantNumeric: "tabular-nums",
      }}>
        {count} active now
      </span>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
