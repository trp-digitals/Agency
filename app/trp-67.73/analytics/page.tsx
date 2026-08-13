"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  RotateCw, 
  Eye, 
  Users, 
  Globe,
  TrendingUp
} from "lucide-react";
import AdminChart from "@/components/AdminChart";
import { ChartPoint } from "../types";
import { cn } from "@/lib/utils";

type Timeframe = "daily" | "weekly" | "monthly";

interface PopularPageRow {
  path: string;
  views: number;
  unique: number;
  ratio: number;
}

interface AnalyticsApiResponse {
  timeframe: Timeframe;
  totalViews: number;
  uniqueViews: number;
  conversionLeads: number;
  views: ChartPoint[];
  popularPages: PopularPageRow[];
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("daily");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsApiResponse | null>(null);

  const fetchAnalyticsData = useCallback(async (tf: Timeframe) => {
    try {
      const res = await fetch(`/api/admin/analytics?timeframe=${tf}`);
      if (res.ok) {
        const data: AnalyticsApiResponse = await res.json();
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error("Failed to load analytics data:", err);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData(timeframe);
  }, [timeframe, fetchAnalyticsData]);

  // Subscribe to real-time updates via SSE
  useEffect(() => {
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource("/api/admin/realtime");
      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (
            payload.type === "NEW_UNIQUE_VISITOR" ||
            payload.type === "NEW_UNIQUE_PAGE_VIEW" ||
            payload.type === "NEW_CONTACT_SUBMISSION"
          ) {
            fetchAnalyticsData(timeframe);
          }
        } catch {
          // Ignore JSON parse errors for heartbeats
        }
      };
    } catch (err) {
      console.error("Failed to connect to realtime analytics SSE:", err);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [timeframe, fetchAnalyticsData]);

  // Manual refresh action
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAnalyticsData(timeframe);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const chartData = analyticsData?.views || [];
  const popularPages = analyticsData?.popularPages || [];

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3 h-3" />
            <span>Telemetry Insights</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Privacy Analytics</h1>
          <p className="text-white/60 text-sm mt-1">
            First-party, essential visitor de-duplication & page view telemetry
          </p>
        </div>

        {/* Timeframe Controls & Refresh */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Refresh Action */}
          <button
            aria-label="Refresh telemetry data"
            onClick={handleRefresh}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all text-white/80 active:scale-95 shrink-0 cursor-pointer"
          >
            <RotateCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          </button>

          {/* Timeframe Tabs */}
          <div className="flex rounded-xl bg-white/5 border border-white/10 p-1">
            {(["daily", "weekly", "monthly"] as Timeframe[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer",
                  timeframe === t
                    ? "bg-primary text-white shadow-lg"
                    : "text-white/50 hover:text-white"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 - Total Unique Website Visitors */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 relative group">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-1">
                Total Unique Website Visitors
              </p>
              <h2 className="text-3xl font-extrabold text-white mb-1">
                {analyticsData ? analyticsData.totalViews.toLocaleString() : "..."}
              </h2>
              <p className="text-xs text-white/50">Deduplicated unique visitor devices</p>
            </div>
          </div>
        </div>

        {/* Metric 2 - Unique Page Views */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 relative group">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-1">
                Unique Page Views
              </p>
              <h2 className="text-3xl font-extrabold text-white mb-1">
                {analyticsData ? analyticsData.uniqueViews.toLocaleString() : "..."}
              </h2>
              <p className="text-xs text-white/50">Deduplicated visitor-page views</p>
            </div>
          </div>
        </div>

        {/* Metric 3 - Inquiries & Leads */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 relative group">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-1">
                Inquiries & Leads
              </p>
              <h2 className="text-3xl font-extrabold text-white mb-1">
                {analyticsData ? analyticsData.conversionLeads.toLocaleString() : "..."}
              </h2>
              <p className="text-xs text-white/50">Contact form submissions</p>
            </div>
          </div>
        </div>

      </div>

      {/* Main Chart Area */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            Traffic Overview ({timeframe})
          </h2>
          {/* Chart Legends */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <span className="w-3 h-3 rounded-sm bg-primary" />
              <span>Page Views</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <span className="w-3 h-3 rounded-sm bg-secondary" />
              <span>Unique Visitors</span>
            </div>
          </div>
        </div>

        {/* SVG Line Graph */}
        <div className="h-64 sm:h-72 w-full flex items-center justify-center">
          {chartData.length > 0 ? (
            <AdminChart data={chartData} />
          ) : (
            <div className="text-white/40 text-sm">No telemetry data recorded for this period</div>
          )}
        </div>
      </div>

      {/* Popular Pages Table */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">Popular Pages Breakdown</h2>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-black text-white/40 uppercase tracking-widest bg-white/[0.01]">
                <th className="py-4 px-6">PAGE PATH</th>
                <th className="py-4 px-6 text-right">TOTAL PAGE VIEWS</th>
                <th className="py-4 px-6 text-right">UNIQUE VISITORS</th>
                <th className="py-4 px-6 text-right">VIEWS / VISITOR RATIO</th>
              </tr>
            </thead>
            <tbody>
              {popularPages.length > 0 ? (
                popularPages.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] text-sm text-white/80 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-primary">{row.path}</td>
                    <td className="py-4 px-6 text-right font-mono">{row.views.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right font-mono">{row.unique.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right font-mono text-white/60">{row.ratio.toFixed(2)}x</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-white/40 text-sm">
                    No page view data recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
