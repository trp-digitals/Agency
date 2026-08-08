"use client";

import { useState } from "react";

interface IndiaMapProps {
  data: { name: string; count: number; percent: number }[];
  onSelectState?: (stateName: string) => void;
  selectedState?: string | null;
}

const STATE_PATHS: { id: string; name: string; d: string }[] = [
  {
    id: "TG",
    name: "Telangana",
    d: "M 220 230 L 260 220 L 275 255 L 245 285 L 210 260 Z",
  },
  {
    id: "MH",
    name: "Maharashtra",
    d: "M 150 200 L 220 200 L 220 240 L 170 260 L 130 220 Z",
  },
  {
    id: "KA",
    name: "Karnataka",
    d: "M 170 265 L 215 250 L 225 310 L 190 330 Z",
  },
  {
    id: "DL",
    name: "Delhi",
    d: "M 195 130 L 210 130 L 210 142 L 195 142 Z",
  },
  {
    id: "TN",
    name: "Tamil Nadu",
    d: "M 205 325 L 240 310 L 245 370 L 215 365 Z",
  },
  {
    id: "AP",
    name: "Andhra Pradesh",
    d: "M 235 260 L 280 250 L 270 315 L 230 300 Z",
  },
  {
    id: "GJ",
    name: "Gujarat",
    d: "M 90 170 L 155 170 L 145 220 L 80 210 Z",
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    d: "M 205 135 L 290 120 L 280 170 L 215 175 Z",
  },
  {
    id: "WB",
    name: "West Bengal",
    d: "M 320 180 L 350 170 L 340 230 L 315 220 Z",
  },
  {
    id: "KL",
    name: "Kerala",
    d: "M 190 335 L 210 330 L 210 380 L 195 375 Z",
  },
];

export default function IndiaMap({ data, onSelectState, selectedState }: IndiaMapProps) {
  const [hovered, setHovered] = useState<{ name: string; count: number; percent: number; x: number; y: number } | null>(null);

  const dataMap = new Map<string, { count: number; percent: number }>();
  let maxCount = 1;
  data.forEach((d) => {
    dataMap.set(d.name.toLowerCase(), d);
    if (d.count > maxCount) maxCount = d.count;
  });

  const getOpacity = (stateName: string) => {
    const item = dataMap.get(stateName.toLowerCase());
    if (!item || item.count === 0) return 0.2;
    const ratio = item.count / maxCount;
    return Math.max(0.4, Math.min(0.95, 0.4 + ratio * 0.55));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "260px", background: "rgba(0,0,0,0.25)", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        viewBox="0 0 450 420"
        style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 12px rgba(192,132,252,0.15))" }}
      >
        <defs>
          <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* Outer outline glow for India map boundary */}
        <path
          d="M 180 50 L 250 80 L 320 120 L 370 170 L 350 240 L 260 380 L 190 380 L 110 240 L 80 180 L 140 100 Z"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Render States */}
        {STATE_PATHS.map((st) => {
          const item = dataMap.get(st.name.toLowerCase()) || { count: 0, percent: 0 };
          const isSelected = selectedState?.toLowerCase() === st.name.toLowerCase();
          const opacity = getOpacity(st.name);
          const hasTraffic = item.count > 0;

          return (
            <g key={st.id}>
              <path
                d={st.d}
                fill={hasTraffic ? "url(#indiaGrad)" : "rgba(255,255,255,0.08)"}
                fillOpacity={opacity}
                stroke={isSelected ? "#c084fc" : hasTraffic ? "#60a5fa" : "rgba(255,255,255,0.18)"}
                strokeWidth={isSelected ? 2.5 : hasTraffic ? 1.5 : 1}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  filter: isSelected || hasTraffic ? "drop-shadow(0 0 8px rgba(192,132,252,0.4))" : "none",
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHovered({
                    name: st.name,
                    count: item.count,
                    percent: item.percent,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                  });
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectState?.(st.name)}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hovered && (
        <div
          style={{
            position: "fixed",
            left: `${hovered.x}px`,
            top: `${hovered.y}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 100,
            background: "rgba(15, 15, 25, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(192, 132, 252, 0.3)",
            borderRadius: "0.5rem",
            padding: "0.5rem 0.75rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(192,132,252,0.2)",
          }}
        >
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>{hovered.name}</div>
          <div style={{ fontSize: "0.72rem", color: "#60a5fa" }}>
            {hovered.count.toLocaleString()} visitors <span style={{ color: "rgba(255,255,255,0.4)" }}>({hovered.percent}%)</span>
          </div>
        </div>
      )}
    </div>
  );
}
