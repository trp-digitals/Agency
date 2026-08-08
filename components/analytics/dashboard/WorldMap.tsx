"use client";

import { useState } from "react";
import { getCountryFlag } from "@/lib/analytics/geo";

interface WorldMapProps {
  data: { name: string; count: number; percent: number }[];
  onSelectCountry?: (countryName: string) => void;
  selectedCountry?: string | null;
}

// Major country SVG path approximations for key world regions
const COUNTRY_PATHS: { id: string; name: string; d: string }[] = [
  {
    id: "IN",
    name: "India",
    d: "M 670 170 L 690 160 L 710 175 L 725 210 L 715 250 L 690 270 L 670 240 L 660 200 Z",
  },
  {
    id: "US",
    name: "United States",
    d: "M 160 110 L 290 110 L 300 170 L 280 200 L 220 210 L 160 180 Z",
  },
  {
    id: "GB",
    name: "United Kingdom",
    d: "M 465 100 L 480 95 L 485 115 L 470 125 Z",
  },
  {
    id: "AE",
    name: "UAE",
    d: "M 605 185 L 618 185 L 620 195 L 610 198 Z",
  },
  {
    id: "CA",
    name: "Canada",
    d: "M 140 40 L 310 40 L 310 100 L 140 100 Z",
  },
  {
    id: "AU",
    name: "Australia",
    d: "M 760 270 L 860 270 L 870 340 L 770 350 Z",
  },
  {
    id: "DE",
    name: "Germany",
    d: "M 505 110 L 525 110 L 525 130 L 505 130 Z",
  },
  {
    id: "FR",
    name: "France",
    d: "M 485 125 L 505 125 L 505 150 L 485 150 Z",
  },
  {
    id: "SG",
    name: "Singapore",
    d: "M 735 240 L 742 240 L 742 247 L 735 247 Z",
  },
  {
    id: "SA",
    name: "Saudi Arabia",
    d: "M 575 175 L 615 175 L 610 220 L 570 210 Z",
  },
  {
    id: "BR",
    name: "Brazil",
    d: "M 320 220 L 400 230 L 380 320 L 310 280 Z",
  },
  {
    id: "ZA",
    name: "South Africa",
    d: "M 520 300 L 570 300 L 565 350 L 520 340 Z",
  },
];

export default function WorldMap({ data, onSelectCountry, selectedCountry }: WorldMapProps) {
  const [hovered, setHovered] = useState<{ name: string; count: number; percent: number; x: number; y: number } | null>(null);

  // Map country name -> item data
  const dataMap = new Map<string, { count: number; percent: number }>();
  let maxCount = 1;
  data.forEach((d) => {
    dataMap.set(d.name.toLowerCase(), d);
    if (d.count > maxCount) maxCount = d.count;
  });

  const getOpacity = (countryName: string) => {
    const item = dataMap.get(countryName.toLowerCase());
    if (!item || item.count === 0) return 0.15;
    const ratio = item.count / maxCount;
    return Math.max(0.35, Math.min(0.95, 0.35 + ratio * 0.6));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "260px", background: "rgba(0,0,0,0.25)", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        viewBox="0 0 960 400"
        style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 10px rgba(192,132,252,0.1))" }}
      >
        {/* Background Grid Lines */}
        <defs>
          <linearGradient id="worldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="960" height="400" fill="url(#grid)" />

        {/* Outer map frame styling */}
        <ellipse cx="480" cy="200" rx="460" ry="190" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

        {/* Render Countries */}
        {COUNTRY_PATHS.map((country) => {
          const item = dataMap.get(country.name.toLowerCase()) || { count: 0, percent: 0 };
          const isSelected = selectedCountry?.toLowerCase() === country.name.toLowerCase();
          const opacity = getOpacity(country.name);
          const hasTraffic = item.count > 0;

          return (
            <g key={country.id}>
              <path
                d={country.d}
                fill={hasTraffic ? "url(#worldGrad)" : "rgba(255,255,255,0.08)"}
                fillOpacity={opacity}
                stroke={isSelected ? "#c084fc" : hasTraffic ? "#60a5fa" : "rgba(255,255,255,0.15)"}
                strokeWidth={isSelected ? 2.5 : hasTraffic ? 1.5 : 1}
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  filter: isSelected || hasTraffic ? "drop-shadow(0 0 6px rgba(192,132,252,0.4))" : "none",
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHovered({
                    name: country.name,
                    count: item.count,
                    percent: item.percent,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                  });
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectCountry?.(country.name)}
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
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>{getCountryFlag(hovered.name)}</span>
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>{hovered.name}</div>
            <div style={{ fontSize: "0.72rem", color: "#60a5fa" }}>
              {hovered.count.toLocaleString()} visitors <span style={{ color: "rgba(255,255,255,0.4)" }}>({hovered.percent}%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
