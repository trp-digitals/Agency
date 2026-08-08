interface GeoTableProps {
  data: { country: string; count: number; percent: number }[];
}

// Country code to flag emoji
function countryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const codePoints = [...countryCode.toUpperCase()].map(
    (c) => 0x1f1e6 + c.charCodeAt(0) - 65
  );
  return String.fromCodePoint(...codePoints);
}

export default function GeoTable({ data }: GeoTableProps) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem",
    }}>
      <h3 style={{ margin: "0 0 1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        Geography
      </h3>

      {data.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", margin: 0 }}>
          Geographic data will appear once visitors arrive via Vercel.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {data.map((g) => (
            <div key={g.country}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{countryFlag(g.country)}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{g.country}</span>
                </div>
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>
                  {g.count.toLocaleString()} <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>({g.percent}%)</span>
                </span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                <div style={{
                  height: "100%", borderRadius: "2px", width: `${g.percent}%`,
                  background: "linear-gradient(90deg, #c084fc, #60a5fa)",
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
