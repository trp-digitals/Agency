"use client";
import { useState, useEffect } from "react";

interface ViewHistoryItem {
  date: string;
  pageViews: number;
  visitors: number;
  sessions: number;
}

interface ViewsHistoryProps {
  initialData: ViewHistoryItem[];
}

export default function ViewsHistory({ initialData }: ViewsHistoryProps) {
  const [data, setData] = useState<ViewHistoryItem[]>(initialData);
  const [range, setRange] = useState<"1d" | "7d" | "30d" | "90d" | "all">("30d");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && range === "30d") {
      setData(initialData);
    }
  }, [initialData, range]);

  const handleRangeChange = async (newRange: "1d" | "7d" | "30d" | "90d" | "all") => {
    setRange(newRange);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics/history?range=${newRange}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // Swallowed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "1rem",
      padding: "1.5rem",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem"
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
            Validated Views History
          </h3>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            Daily breakdown of validated views, unique visitors, and sessions
          </p>
        </div>

        {/* Range Buttons */}
        <div style={{ display: "flex", gap: "0.35rem", background: "rgba(255,255,255,0.03)", padding: "3px", borderRadius: "0.5rem" }}>
          {(["1d", "7d", "30d", "90d", "all"] as const).map((r) => (
            <button
              key={r}
              onClick={() => handleRangeChange(r)}
              style={{
                background: range === r ? "rgba(192,132,252,0.2)" : "transparent",
                color: range === r ? "#c084fc" : "rgba(255,255,255,0.5)",
                border: range === r ? "1px solid rgba(192,132,252,0.3)" : "1px solid transparent",
                borderRadius: "0.375rem",
                padding: "0.25rem 0.6rem",
                fontSize: "0.7rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {r === "1d" ? "Today" : r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : r === "90d" ? "90 Days" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
          Loading view history...
        </div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
          No view history available for selected period
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600 }}>DATE</th>
                <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600, textAlign: "right" }}>VALIDATED VIEWS</th>
                <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600, textAlign: "right" }}>UNIQUE VISITORS</th>
                <th style={{ padding: "0.6rem 0.5rem", fontWeight: 600, textAlign: "right" }}>SESSIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 15).map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.8)" }}>
                  <td style={{ padding: "0.6rem 0.5rem", fontFamily: "ui-monospace, monospace", color: "rgba(255,255,255,0.9)" }}>
                    {row.date}
                  </td>
                  <td style={{ padding: "0.6rem 0.5rem", textAlign: "right", fontWeight: 700, color: "#c084fc", fontVariantNumeric: "tabular-nums" }}>
                    {row.pageViews.toLocaleString()}
                  </td>
                  <td style={{ padding: "0.6rem 0.5rem", textAlign: "right", fontWeight: 600, color: "#60a5fa", fontVariantNumeric: "tabular-nums" }}>
                    {row.visitors.toLocaleString()}
                  </td>
                  <td style={{ padding: "0.6rem 0.5rem", textAlign: "right", fontWeight: 600, color: "#34d399", fontVariantNumeric: "tabular-nums" }}>
                    {row.sessions.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
