"use client";

import { getCountryFlag } from "@/lib/analytics/geo";

interface LocationListProps {
  data: { name: string; count: number; percent: number }[];
  level: "country" | "region" | "city";
  selectedLocation?: string | null;
  onSelectLocation?: (name: string) => void;
}

export default function LocationList({
  data,
  level,
  selectedLocation,
  onSelectLocation,
}: LocationListProps) {
  if (data.length === 0) {
    return (
      <div style={{ padding: "2rem 1rem", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
        No geographic data available for this selection.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: "340px", overflowY: "auto", paddingRight: "0.25rem" }}>
      {data.map((item) => {
        const isSelected = selectedLocation?.toLowerCase() === item.name.toLowerCase();

        return (
          <div
            key={item.name}
            onClick={() => onSelectLocation?.(item.name)}
            style={{
              padding: "0.6rem 0.85rem",
              borderRadius: "0.6rem",
              background: isSelected
                ? "rgba(192, 132, 252, 0.12)"
                : "rgba(255, 255, 255, 0.02)",
              border: isSelected
                ? "1px solid rgba(192, 132, 252, 0.35)"
                : "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {level === "country" ? (
                  <span style={{ fontSize: "1.1rem" }}>{getCountryFlag(item.name)}</span>
                ) : (
                  <span style={{ fontSize: "0.9rem", opacity: 0.6 }}>📍</span>
                )}
                <span style={{ fontSize: "0.85rem", fontWeight: isSelected ? 700 : 500, color: isSelected ? "#fff" : "rgba(255,255,255,0.85)" }}>
                  {item.name}
                </span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontVariantNumeric: "tabular-nums" }}>
                <span style={{ fontWeight: 600, color: "#fff" }}>{item.count.toLocaleString()}</span>{" "}
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginLeft: "0.25rem" }}>({item.percent}%)</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  borderRadius: "2px",
                  width: `${Math.max(item.percent, 2)}%`,
                  background: isSelected
                    ? "linear-gradient(90deg, #c084fc 0%, #60a5fa 100%)"
                    : "linear-gradient(90deg, rgba(192,132,252,0.7) 0%, rgba(96,165,250,0.7) 100%)",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
