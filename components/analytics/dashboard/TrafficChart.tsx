"use client";
import { useState } from "react";

interface DataPoint { date: string; pageViews: number; visitors: number; }
type Range = "1d" | "7d" | "30d" | "90d";
type Metric = "visitors" | "pageViews";

interface TrafficChartProps {
  initialData: DataPoint[];
  initialRange: Range;
}

const RANGES: { label: string; value: Range }[] = [
  { label: "Today", value: "1d" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
];

function formatDate(dateStr: string, range: Range): string {
  const d = new Date(dateStr + "T00:00:00");
  if (range === "1d") return "Today";
  if (range === "7d") return d.toLocaleDateString("en-US", { weekday: "short" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TrafficChart({ initialData, initialRange }: TrafficChartProps) {
  const [data, setData] = useState<DataPoint[]>(initialData);
  const [range, setRange] = useState<Range>(initialRange);
  const [metric, setMetric] = useState<Metric>("visitors");
  const [loading, setLoading] = useState(false);

  async function changeRange(r: Range) {
    if (r === range) return;
    setLoading(true);
    setRange(r);
    try {
      const res = await fetch(`/api/admin/analytics/traffic?range=${r}`);
      if (res.ok) setData(await res.json());
    } catch {}
    setLoading(false);
  }

  const values = data.map((d) => d[metric]);
  const maxVal = Math.max(...values, 1);
  const W = 100, H = 60;
  const pad = { left: 0, right: 0, top: 4, bottom: 0 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  // Build SVG path
  let path = "";
  let fillPath = "";
  if (data.length > 1) {
    const points = values.map((v, i) => ({
      x: pad.left + (i / (values.length - 1)) * chartW,
      y: pad.top + chartH - (v / maxVal) * chartH,
    }));
    path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    fillPath = `${path} L ${points[points.length - 1].x} ${pad.top + chartH} L ${points[0].x} ${pad.top + chartH} Z`;
  }

  const totalValue = values.reduce((a, b) => a + b, 0);

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(192,132,252,0.2)", borderRadius: "1rem", padding: "1.5rem",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Traffic Overview</h3>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem", fontVariantNumeric: "tabular-nums" }}>
            {totalValue.toLocaleString()} <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>{metric === "visitors" ? "visitors" : "page views"}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {/* Metric toggle */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "0.2rem", gap: "0.2rem" }}>
            {(["visitors", "pageViews"] as Metric[]).map((m) => (
              <button key={m} onClick={() => setMetric(m)} style={{
                fontSize: "0.72rem", fontWeight: 600, padding: "0.3rem 0.7rem", borderRadius: "0.35rem",
                background: metric === m ? "rgba(192,132,252,0.25)" : "transparent",
                color: metric === m ? "#c084fc" : "rgba(255,255,255,0.45)",
                border: "none", cursor: "pointer", transition: "all 0.2s",
              }}>
                {m === "visitors" ? "Visitors" : "Page Views"}
              </button>
            ))}
          </div>

          {/* Range selector */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem", padding: "0.2rem", gap: "0.2rem" }}>
            {RANGES.map((r) => (
              <button key={r.value} onClick={() => changeRange(r.value)} style={{
                fontSize: "0.72rem", fontWeight: 600, padding: "0.3rem 0.7rem", borderRadius: "0.35rem",
                background: range === r.value ? "rgba(59,130,246,0.25)" : "transparent",
                color: range === r.value ? "#60a5fa" : "rgba(255,255,255,0.45)",
                border: "none", cursor: "pointer", transition: "all 0.2s",
              }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div style={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.3s" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line key={f} x1={pad.left} y1={pad.top + chartH * (1 - f)} x2={W - pad.right} y2={pad.top + chartH * (1 - f)}
              stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          ))}
          {/* Fill area */}
          {fillPath && <path d={fillPath} fill="url(#chartFill)" />}
          {/* Line */}
          {path && <path d={path} fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
          {/* Data points */}
          {data.length > 0 && values.map((v, i) => {
            const x = pad.left + (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2);
            const y = pad.top + chartH - (v / maxVal) * chartH;
            return <circle key={i} cx={x} cy={y} r="1.2" fill="#c084fc" />;
          })}
        </svg>

        {/* X-axis labels */}
        {data.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
            {(data.length <= 10 ? data : data.filter((_, i) => i % Math.ceil(data.length / 7) === 0)).map((d) => (
              <span key={d.date} style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
                {formatDate(d.date, range)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
