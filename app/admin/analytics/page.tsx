import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/analytics/auth";
import {
  getSummaryStats,
  getViewsHistory,
  getTopPages,
  getTrafficSources,
  getDeviceBreakdown,
  getLocationSummaryStats,
  getLocationBreakdown,
} from "@/lib/analytics/queries";
import AnalyticsDashboardClient from "@/components/analytics/dashboard/AnalyticsDashboardClient";

// Force dynamic rendering — no caching of analytics data
export const dynamic = "force-dynamic";

export default async function AnalyticsDashboard() {
  // Server-side auth check
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) redirect("/admin/login");

  // Fetch all data server-side in parallel
  const [summary, history, pages, sources, devices, locSummary, locList] = await Promise.allSettled([
    getSummaryStats(),
    getViewsHistory("30d"),
    getTopPages(10),
    getTrafficSources(),
    getDeviceBreakdown(),
    getLocationSummaryStats("all"),
    getLocationBreakdown("all", "country"),
  ]);

  const s = summary.status === "fulfilled" ? summary.value : null;
  const h = history.status === "fulfilled" ? history.value : [];
  const p = pages.status === "fulfilled" ? pages.value : [];
  const src = sources.status === "fulfilled" ? sources.value : [];
  const dev = devices.status === "fulfilled" ? devices.value : { devices: [], browsers: [], os: [] };
  const ls = locSummary.status === "fulfilled" ? locSummary.value : undefined;
  const ll = locList.status === "fulfilled" ? locList.value : [];

  return (
    <AnalyticsDashboardClient
      initialSummary={s}
      initialHistory={h}
      initialPages={p}
      initialSources={src}
      initialDevices={dev}
      initialLocSummary={ls}
      initialLocList={ll}
    />
  );
}
