"use client";

import { useState, useEffect } from "react";
import LocationList from "./LocationList";
import LocationTrafficDetails from "./LocationTrafficDetails";

interface VisitorsByLocationProps {
  initialSummary?: {
    topLocation: { name: string; count: number };
    topCountry: { name: string; count: number };
    topRegion: { name: string; count: number };
  };
  initialList?: { name: string; count: number; percent: number }[];
}

export default function VisitorsByLocation({
  initialSummary,
  initialList = [],
}: VisitorsByLocationProps) {
  const [range, setRange] = useState<"1d" | "7d" | "30d" | "90d" | "all">("all");
  const [level, setLevel] = useState<"country" | "region" | "city">("country");

  const [summary, setSummary] = useState(
    initialSummary || {
      topLocation: { name: "—", count: 0 },
      topCountry: { name: "—", count: 0 },
      topRegion: { name: "—", count: 0 },
    }
  );

  const [list, setList] = useState<{ name: string; count: number; percent: number }[]>(initialList);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [details, setDetails] = useState<{
    location: string;
    visitorCount: number;
    totalViews: number;
    pageViews: { pathname: string; views: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialSummary) setSummary(initialSummary);
  }, [initialSummary]);

  useEffect(() => {
    if (initialList && range === "all" && level === "country" && !selectedLocation) {
      setList(initialList);
    }
  }, [initialList, range, level, selectedLocation]);

  // Fetch updated data when filters change
  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      setLoading(true);
      try {
        const query = new URLSearchParams({ range, level });
        if (selectedLocation) query.set("location", selectedLocation);

        const res = await fetch(`/api/admin/analytics/location?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled) {
            if (data.summary) setSummary(data.summary);
            if (data.list) setList(data.list);
            if (data.details) setDetails(data.details);
            else if (!selectedLocation) setDetails(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch location data", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [range, level, selectedLocation]);

  const handleSelectLocation = async (name: string) => {
    if (selectedLocation === name) {
      setSelectedLocation(null);
      setDetails(null);
      return;
    }
    setSelectedLocation(name);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {/* ── Section Title & Header ───────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
          paddingBottom: "0.85rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>📍</span> Visitors by Location
          </h3>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
            Aggregated geographic analytics without tracking PII or IP addresses
          </p>
        </div>
      </div>

      {/* ── Summary Cards: Top Location, Top Country, Top Region ────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "0.6rem",
            padding: "0.85rem",
          }}
        >
          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(192,132,252,0.8)" }}>
            TOP LOCATION
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginTop: "0.2rem" }}>
            {summary.topLocation.name}
          </div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
            {summary.topLocation.count.toLocaleString()} visitors
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "0.6rem",
            padding: "0.85rem",
          }}
        >
          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(96,165,250,0.8)" }}>
            TOP COUNTRY
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginTop: "0.2rem" }}>
            {summary.topCountry.name}
          </div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
            {summary.topCountry.count.toLocaleString()} visitors
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "0.6rem",
            padding: "0.85rem",
          }}
        >
          <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(244,114,182,0.8)" }}>
            TOP REGION
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginTop: "0.2rem" }}>
            {summary.topRegion.name}
          </div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
            {summary.topRegion.count.toLocaleString()} visitors
          </div>
        </div>
      </div>

      {/* ── Filters Bar: Time Range & Geographic Level ───────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          background: "rgba(0,0,0,0.2)",
          padding: "0.6rem 0.85rem",
          borderRadius: "0.6rem",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Time Filter Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginRight: "0.25rem", fontWeight: 600 }}>
            TIME:
          </span>
          {(["1d", "7d", "30d", "90d", "all"] as const).map((r) => {
            const label = r === "1d" ? "Today" : r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : r === "90d" ? "90 Days" : "All Time";
            const isActive = range === r;

            return (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.7rem",
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: "0.3rem",
                  border: "none",
                  background: isActive ? "linear-gradient(135deg, #c084fc 0%, #60a5fa 100%)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Level Filter Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginRight: "0.25rem", fontWeight: 600 }}>
            LEVEL:
          </span>
          {(["country", "region", "city"] as const).map((l) => {
            const label = l === "country" ? "Country" : l === "region" ? "State / Region" : "City";
            const isActive = level === l;

            return (
              <button
                key={l}
                onClick={() => setLevel(l)}
                style={{
                  padding: "0.2rem 0.55rem",
                  fontSize: "0.7rem",
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: "0.3rem",
                  border: isActive ? "1px solid rgba(192, 132, 252, 0.5)" : "1px solid transparent",
                  background: isActive ? "rgba(192, 132, 252, 0.15)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#c084fc" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main View Section: Ranked List ───────────── */}
      {loading ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
          Loading location statistics...
        </div>
      ) : (
        <div>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem", fontWeight: 600 }}>
            RANKED BREAKDOWN BY {level.toUpperCase()}
          </div>
          <LocationList
            data={list}
            level={level}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      )}

      {/* ── Location Traffic Drilldown Details Panel ─────────────────────── */}
      {details && (
        <LocationTrafficDetails
          location={details.location}
          visitorCount={details.visitorCount}
          totalViews={details.totalViews}
          pageViews={details.pageViews}
          onClose={() => {
            setSelectedLocation(null);
            setDetails(null);
          }}
        />
      )}
    </div>
  );
}
