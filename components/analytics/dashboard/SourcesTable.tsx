interface SourcesTableProps {
  data: { source: string; count: number; percent: number }[];
}

const sourceIcons: Record<string, string> = {
  "Google": "🔍", "Instagram": "📸", "LinkedIn": "💼",
  "Facebook": "📘", "Twitter / X": "🐦", "WhatsApp": "💬",
  "YouTube": "▶️", "Direct": "🔗", "Other": "🌐",
};

export default function SourcesTable({ data }: SourcesTableProps) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem",
    }}>
      <h3 style={{ margin: "0 0 1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        Traffic Sources
      </h3>

      {data.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", margin: 0 }}>No referrer data yet</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {data.map((s) => (
            <div key={s.source} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.625rem 0.75rem", borderRadius: "0.5rem",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
            }}>
              <span style={{ fontSize: "1rem" }}>{sourceIcons[s.source] ?? "🌐"}</span>
              <span style={{ flex: 1, fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                {s.source}
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>
                {s.count.toLocaleString()}
              </span>
              <span style={{
                fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.5rem",
                borderRadius: "0.3rem", background: "rgba(192,132,252,0.15)", color: "#c084fc",
              }}>
                {s.percent}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
