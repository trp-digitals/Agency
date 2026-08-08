"use client";

import { useEffect, useState, useRef } from "react";
import StatCard from "./StatCard";
import ViewsHistory from "./ViewsHistory";
import TopPages from "./TopPages";
import SourcesTable from "./SourcesTable";
import DeviceBreakdown from "./DeviceBreakdown";
import VisitorsByLocation from "./VisitorsByLocation";
import ActiveNowBadge from "./ActiveNowBadge";
import LogoutButton from "./LogoutButton";

export interface SummaryStats {
  totalPageViews: number;
  todayPageViews: number;
  last7PageViews: number;
  last30PageViews: number;
  last90PageViews: number;
  totalUniqueVisitors: number;
  todayUniqueVisitors: number;
  last7UniqueVisitors: number;
  last30UniqueVisitors: number;
  totalSessions: number;
  todaySessions: number;
  last7Sessions: number;
  last30Sessions: number;
}

export interface ViewHistoryItem {
  date: string;
  pageViews: number;
  visitors: number;
  sessions: number;
}

export interface LocationSummaryData {
  topLocation: { name: string; count: number };
  topCountry: { name: string; count: number };
  topRegion: { name: string; count: number };
}

export interface AnalyticsDashboardClientProps {
  initialSummary: SummaryStats | null;
  initialHistory: ViewHistoryItem[];
  initialPages: { pathname: string; views: number }[];
  initialSources: { source: string; count: number; percent: number }[];
  initialDevices: {
    devices: { type: string; count: number; percent: number }[];
    browsers: { name: string; count: number }[];
    os: { name: string; count: number }[];
  };
  initialLocSummary?: LocationSummaryData;
  initialLocList: { name: string; count: number; percent: number }[];
}

export default function AnalyticsDashboardClient({
  initialSummary,
  initialHistory,
  initialPages,
  initialSources,
  initialDevices,
  initialLocSummary,
  initialLocList,
}: AnalyticsDashboardClientProps) {
  const [summary, setSummary] = useState<SummaryStats | null>(initialSummary);
  const [history, setHistory] = useState<ViewHistoryItem[]>(initialHistory);
  const [pages, setPages] = useState<{ pathname: string; views: number }[]>(initialPages);
  const [sources, setSources] = useState<{ source: string; count: number; percent: number }[]>(initialSources);
  const [devices, setDevices] = useState(initialDevices);
  const [locSummary, setLocSummary] = useState<LocationSummaryData | undefined>(initialLocSummary);
  const [locList, setLocList] = useState<{ name: string; count: number; percent: number }[]>(initialLocList);
  const [activeCount, setActiveCount] = useState<number | null>(null);

  const [lastSyncTime, setLastSyncTime] = useState<string>("Just now");
  const [isLiveSyncing, setIsLiveSyncing] = useState<boolean>(false);
  const [newViewNotification, setNewViewNotification] = useState<string | null>(null);

  const prevTotalViewsRef = useRef<number | null>(initialSummary?.totalPageViews ?? null);

  // Live polling logic (every 3 seconds when tab is visible)
  useEffect(() => {
    let isCancelled = false;

    async function fetchLiveAnalytics() {
      if (document.visibilityState !== "visible") return;

      setIsLiveSyncing(true);
      try {
        const res = await fetch("/api/admin/analytics/live", { cache: "no-store" });
        if (res.ok && !isCancelled) {
          const data = await res.json();
          if (data.summary) {
            // Check if views increased to show live notification toast
            if (
              prevTotalViewsRef.current !== null &&
              data.summary.totalPageViews > prevTotalViewsRef.current
            ) {
              const diff = data.summary.totalPageViews - prevTotalViewsRef.current;
              setNewViewNotification(`⚡ ${diff} new view${diff > 1 ? "s" : ""} recorded live!`);
              setTimeout(() => setNewViewNotification(null), 4000);
            }
            prevTotalViewsRef.current = data.summary.totalPageViews;
            setSummary(data.summary);
          }

          if (typeof data.activeCount === "number") setActiveCount(data.activeCount);
          if (data.history) setHistory(data.history);
          if (data.pages) setPages(data.pages);
          if (data.sources) setSources(data.sources);
          if (data.devices) setDevices(data.devices);
          if (data.locSummary) setLocSummary(data.locSummary);
          if (data.locList) setLocList(data.locList);

          const now = new Date();
          setLastSyncTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        }
      } catch {
        // Silently swallow network errors during poll
      } finally {
        if (!isCancelled) setIsLiveSyncing(false);
      }
    }

    // Initial check & interval
    fetchLiveAnalytics();
    const interval = setInterval(fetchLiveAnalytics, 3000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchLiveAnalytics();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isCancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const containerStyle = { maxWidth: "1400px", margin: "0 auto", padding: "2rem 1.5rem" };
  const sectionGap = { marginBottom: "1.5rem" };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(192,132,252,0.05) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(59,130,246,0.05) 0%, transparent 40%),
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 40px 40px, 40px 40px",
      }}
    >
      <div style={containerStyle}>
        {/* ── Live Toast Notification Banner ──────────────────────────────── Standard */}
        {newViewNotification && (
          <div
            style={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              zIndex: 9999,
              background: "linear-gradient(135deg, rgba(52,211,153,0.95), rgba(16,185,129,0.95))",
              color: "#000",
              fontWeight: 800,
              fontSize: "0.85rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "0.75rem",
              boxShadow: "0 10px 25px rgba(52,211,153,0.4)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {newViewNotification}
          </div>
        )}

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "1.5rem" }}>📊</span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #c084fc 0%, #60a5fa 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TRP Digitals Analytics
              </h1>

              {/* Live Sync Status Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#34d399",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#34d399",
                    boxShadow: "0 0 8px #34d399",
                    opacity: isLiveSyncing ? 0.4 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                />
                <span>LIVE FEED</span>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  ({lastSyncTime})
                </span>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
              Private Admin Dashboard • Validated Live Real-Time Analytics Engine
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <ActiveNowBadge count={activeCount} />
            <LogoutButton />
          </div>
        </div>

        {/* ── Methodology Information Banner ──────────────────────────────── Standard */}
        <div
          style={{
            background: "rgba(192,132,252,0.04)",
            border: "1px solid rgba(192,132,252,0.15)",
            borderRadius: "0.75rem",
            padding: "0.85rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>🛡️</span>
          <div>
            <strong style={{ color: "#c084fc", fontWeight: 700 }}>Live Validated Views System:</strong> Analytics
            update automatically in real-time. Views are deduplicated server-side within a 30-minute window per page per
            visitor. Bot crawlers, asset requests, hydrations, and rapid request spams are automatically excluded.
          </div>
        </div>

        {/* ── Stat Cards ────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            ...sectionGap,
          }}
        >
          <StatCard
            label="TOTAL VIEWS"
            value={summary?.totalPageViews ?? 0}
            subtitle="All-time validated views"
            icon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
            accent="purple"
          />
          <StatCard
            label="TODAY'S VIEWS"
            value={summary?.todayPageViews ?? 0}
            subtitle="Validated views today"
            icon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            accent="pink"
          />
          <StatCard
            label="LAST 7 DAYS VIEWS"
            value={summary?.last7PageViews ?? 0}
            subtitle="Validated views in 7 days"
            icon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
            accent="blue"
          />
          <StatCard
            label="LAST 30 DAYS VIEWS"
            value={summary?.last30PageViews ?? 0}
            subtitle="Validated views in 30 days"
            icon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 2 2h12a2 2 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            }
            accent="green"
          />
          <StatCard
            label="UNIQUE VISITORS"
            value={summary?.todayUniqueVisitors ?? 0}
            subtitle={`Today • ${summary?.totalUniqueVisitors ?? 0} all-time`}
            icon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            accent="purple"
          />
          <StatCard
            label="SESSIONS"
            value={summary?.todaySessions ?? 0}
            subtitle={`Today • ${summary?.totalSessions ?? 0} all-time`}
            icon={
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            accent="blue"
          />
        </div>

        {/* ── Views History Breakdown Table ───────────────────────────────── */}
        <div style={sectionGap}>
          <ViewsHistory initialData={history} />
        </div>

        {/* ── Location Analytics Section ───────────────────────────────────── */}
        <div style={sectionGap}>
          <VisitorsByLocation initialSummary={locSummary} initialList={locList} />
        </div>

        {/* ── Bottom Grid: Top Pages + Sources ─────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
            ...sectionGap,
          }}
        >
          <TopPages data={pages} />
          <SourcesTable data={sources} />
        </div>

        {/* ── Devices Breakdown ────────────────────────────────────────────── */}
        <div style={sectionGap}>
          <DeviceBreakdown data={devices} />
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div
          style={{
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            textAlign: "center",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          TRP Digitals Analytics • Private Admin Dashboard • Validated Live Views Engine
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
