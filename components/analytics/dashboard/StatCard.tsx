"use client";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  accent?: "purple" | "blue" | "pink" | "green";
}

const accentMap = {
  purple: { glow: "rgba(192,132,252,0.15)", border: "rgba(192,132,252,0.3)", text: "#c084fc" },
  blue:   { glow: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.3)",  text: "#60a5fa" },
  pink:   { glow: "rgba(244,114,182,0.15)", border: "rgba(244,114,182,0.3)", text: "#f472b6" },
  green:  { glow: "rgba(52,211,153,0.15)",  border: "rgba(52,211,153,0.3)",  text: "#34d399" },
};

function useCountUp(target: number, duration = 900) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return count;
}

export default function StatCard({ label, value, subtitle, icon, accent = "purple" }: StatCardProps) {
  const displayValue = useCountUp(value);
  const colors = accentMap[accent];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${colors.border}`,
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: `0 8px 32px ${colors.glow}`,
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "1rem",
        background: `radial-gradient(circle at top right, ${colors.glow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <span style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
          }}>
            {label}
          </span>
          <span style={{ color: colors.text, opacity: 0.8 }}>{icon}</span>
        </div>

        <div style={{
          fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.03em",
          color: "#ffffff", lineHeight: 1, marginBottom: "0.375rem",
          fontVariantNumeric: "tabular-nums",
        }}>
          {displayValue.toLocaleString()}
        </div>

        <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
