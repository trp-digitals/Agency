"use client";
import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ── Inner form — uses useSearchParams, must be inside Suspense ────────────────
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin/analytics";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = from;
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      width: "100%", maxWidth: "380px",
      background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: "1px solid rgba(192,132,252,0.2)", borderRadius: "1.25rem",
      padding: "2.5rem 2rem", boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
    }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: "52px", height: "52px", borderRadius: "0.875rem",
          background: "linear-gradient(135deg, rgba(192,132,252,0.2), rgba(59,130,246,0.2))",
          border: "1px solid rgba(192,132,252,0.3)", marginBottom: "0.875rem",
          fontSize: "1.5rem",
        }}>
          📊
        </div>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.35rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
          TRP Analytics
        </h1>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
          Admin access only
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.5rem" }}>
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoComplete="current-password"
            style={{
              width: "100%", padding: "0.75rem 1rem", borderRadius: "0.625rem",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff", fontSize: "0.9rem", outline: "none",
              transition: "border-color 0.2s", boxSizing: "border-box",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(192,132,252,0.5)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
          />
        </div>

        {error && (
          <div style={{
            padding: "0.625rem 0.875rem", borderRadius: "0.5rem",
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            color: "#fca5a5", fontSize: "0.8rem", marginBottom: "1rem",
          }}>
            {error}
          </div>
        )}

        <button
          id="admin-login-btn"
          type="submit"
          disabled={loading || !password}
          style={{
            width: "100%", padding: "0.8rem 1rem",
            background: "linear-gradient(135deg, #c084fc 0%, #3b82f6 100%)",
            color: "#fff", fontWeight: 700, fontSize: "0.9rem",
            border: "none", borderRadius: "0.625rem", cursor: loading ? "wait" : "pointer",
            opacity: loading || !password ? 0.6 : 1,
            transition: "opacity 0.2s, box-shadow 0.2s", boxShadow: "none",
          }}
          onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(192,132,252,0.35)"; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.boxShadow = "none"; }}
        >
          {loading ? "Verifying…" : "Access Dashboard →"}
        </button>
      </form>
    </div>
  );
}

// ── Page shell — wraps LoginForm in Suspense (required for useSearchParams) ───
export default function AdminLoginPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "1rem",
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(192,132,252,0.06) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%),
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "auto, auto, 40px 40px, 40px 40px",
    }}>
      <Suspense fallback={
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>Loading…</div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
