"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      id="admin-logout-btn"
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: "0.4rem 0.875rem", borderRadius: "0.5rem", fontSize: "0.78rem",
        fontWeight: 600, cursor: loading ? "wait" : "pointer",
        background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "#fca5a5"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
