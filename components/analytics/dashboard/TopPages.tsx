interface TopPagesProps {
  data: { pathname: string; views: number }[];
}

export default function TopPages({ data }: TopPagesProps) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem",
    }}>
      <h3 style={{ margin: "0 0 1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        Top Pages
      </h3>

      {data.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", margin: 0 }}>No data yet</p>
      ) : (
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {data.map((page, i) => (
            <li key={page.pathname} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.5rem 0.6rem", borderRadius: "0.375rem",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, color: i === 0 ? "#c084fc" : "rgba(255,255,255,0.3)",
                  minWidth: "1.25rem", textAlign: "right",
                }}>{i + 1}</span>
                <span style={{
                  fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", fontWeight: 500,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  fontFamily: "ui-monospace, monospace",
                }}>
                  {page.pathname}
                </span>
              </div>
              <span style={{
                fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.6)",
                marginLeft: "0.75rem", flexShrink: 0, fontVariantNumeric: "tabular-nums",
              }}>
                {page.views.toLocaleString()}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
