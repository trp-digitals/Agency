"use client";

interface LocationTrafficDetailsProps {
  location: string;
  visitorCount: number;
  totalViews: number;
  pageViews: { pathname: string; views: number }[];
  onClose: () => void;
}

export default function LocationTrafficDetails({
  location,
  visitorCount,
  totalViews,
  pageViews,
  onClose,
}: LocationTrafficDetailsProps) {
  return (
    <div
      style={{
        marginTop: "1.25rem",
        padding: "1.25rem",
        borderRadius: "0.85rem",
        background: "linear-gradient(135deg, rgba(192,132,252,0.08) 0%, rgba(59,130,246,0.04) 100%)",
        border: "1px solid rgba(192, 132, 252, 0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.1rem" }}>📍</span>
            <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
              {location}
            </h4>
          </div>
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
            {visitorCount.toLocaleString()} visitors • {totalViews.toLocaleString()} page views
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
            padding: "0.3rem 0.6rem",
            borderRadius: "0.4rem",
            fontSize: "0.75rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Close Drilldown ✕
        </button>
      </div>

      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
        Page Traffic Breakdown
      </div>

      {pageViews.length === 0 ? (
        <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          No specific page views recorded for this location.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "200px", overflowY: "auto" }}>
          {pageViews.map((pv) => (
            <div
              key={pv.pathname}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.45rem 0.65rem",
                borderRadius: "0.4rem",
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#60a5fa", fontFamily: "monospace" }}>
                → {pv.views.toLocaleString()} {pv.views === 1 ? "page view" : "page views"} of <span style={{ color: "#fff" }}>{pv.pathname}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
