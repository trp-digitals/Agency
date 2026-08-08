interface DeviceBreakdownProps {
  data: {
    devices: { type: string; count: number; percent: number }[];
    browsers: { name: string; count: number }[];
    os: { name: string; count: number }[];
  };
}

const deviceIcons: Record<string, string> = {
  desktop: "🖥️", mobile: "📱", tablet: "📟", unknown: "❓",
};

const deviceColors: Record<string, string> = {
  desktop: "#c084fc", mobile: "#60a5fa", tablet: "#f472b6", unknown: "rgba(255,255,255,0.3)",
};

function BarRow({ label, count, percent }: { label: string; count: number; percent: number; color?: string }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.5rem 0.65rem", marginBottom: "0.5rem", borderRadius: "0.375rem",
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)"
    }}>
      <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontVariantNumeric: "tabular-nums" }}>
        {count.toLocaleString()} <span style={{ color: "#c084fc", fontWeight: 700, fontSize: "0.72rem", marginLeft: "0.3rem" }}>({percent}%)</span>
      </span>
    </div>
  );
}

export default function DeviceBreakdown({ data }: DeviceBreakdownProps) {
  const totalBrowserViews = data.browsers.reduce((s, b) => s + b.count, 0) || 1;
  const totalOsViews = data.os.reduce((s, o) => s + o.count, 0) || 1;

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem",
    }}>
      <h3 style={{ margin: "0 0 1.25rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
        Devices
      </h3>

      {/* Device type */}
      <div style={{ marginBottom: "1.5rem" }}>
        {data.devices.length === 0
          ? <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", margin: 0 }}>No data yet</p>
          : data.devices.map((d) => (
            <BarRow
              key={d.type}
              label={`${deviceIcons[d.type.toLowerCase()] ?? "❓"} ${d.type.charAt(0).toUpperCase() + d.type.slice(1)}`}
              count={d.count} percent={d.percent}
              color={deviceColors[d.type.toLowerCase()] ?? "rgba(255,255,255,0.3)"}
            />
          ))
        }
      </div>

      {/* Browser / OS split */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            Browser
          </h4>
          {data.browsers.map((b) => (
            <div key={b.name} style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>{b.name}</span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>
                {Math.round((b.count / totalBrowserViews) * 100)}%
              </span>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            OS
          </h4>
          {data.os.map((o) => (
            <div key={o.name} style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.65)" }}>{o.name}</span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", fontVariantNumeric: "tabular-nums" }}>
                {Math.round((o.count / totalOsViews) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
