"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Mail, Eye, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Application, Contact } from "./types";

export default function AdminOverview() {
  const [totalApps, setTotalApps] = useState(0);
  const [newApps, setNewApps] = useState(0);
  const [totalCons, setTotalCons] = useState(0);
  const [newCons, setNewCons] = useState(0);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [analyticsViews, setAnalyticsViews] = useState<number | null>(null);
  const [analyticsUnique, setAnalyticsUnique] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [reconnecting, setReconnecting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper to fetch the latest overview metrics
  const fetchOverviewData = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const overviewRes = await fetch("/api/admin/overview");

      if (overviewRes.ok) {
        const data = await overviewRes.json();
        setTotalApps(data.totalApplications);
        setNewApps(data.newApplications);
        setTotalCons(data.totalContacts);
        setNewCons(data.newContacts);
        setRecentApps(data.recentApplications);
        setRecentContacts(data.recentContacts);
        setAnalyticsViews(data.totalViews ?? null);
        setAnalyticsUnique(data.uniqueViews ?? null);
      }
    } catch (err) {
      console.error("Failed to fetch admin overview:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 1. Initial Data Fetch
  useEffect(() => {
    fetchOverviewData(true);
  }, []);

  // 2. Realtime Updates via EventSource (SSE)
  useEffect(() => {
    let sse: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectSSE = () => {
      sse = new EventSource("/api/admin/realtime");

      sse.onopen = () => {
        console.log("SSE Connection established");
        setReconnecting(false);
        // Sync latest database data in case we missed events while disconnected
        fetchOverviewData(false);
      };

      sse.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          
          if (payload.type === "CONNECTED" || payload.type === "HEARTBEAT") {
            return;
          }

          if (payload.type === "NEW_CAREER_APPLICATION") {
            const newApp: Application = {
              id: payload.data.id,
              name: payload.data.fullName,
              email: payload.data.email,
              phone: payload.data.phoneNumber || "Not provided",
              portfolio: payload.data.portfolioLink,
              domains: payload.data.domainsOfInterest,
              why: payload.data.whyTRPDigitals,
              date: new Date(payload.data.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
              status: "New",
            };

            setTotalApps((prev) => prev + 1);
            setNewApps((prev) => prev + 1);
            setRecentApps((prev) => {
              const updated = [newApp, ...prev];
              return updated.slice(0, 3);
            });

            triggerToast(`New Career Application: ${newApp.name} just submitted a career application.`);
          }

          if (payload.type === "NEW_CONTACT_SUBMISSION") {
            const newCon: Contact = {
              id: payload.data.id,
              name: payload.data.name,
              email: payload.data.email,
              phone: payload.data.phoneNumber || "Not provided",
              projectType: payload.data.servicesNeeded.join(", ") || "General Inquiry",
              message: payload.data.projectDetails,
              date: new Date(payload.data.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
              status: "New",
            };

            setTotalCons((prev) => prev + 1);
            setNewCons((prev) => prev + 1);
            setRecentContacts((prev) => {
              const updated = [newCon, ...prev];
              return updated.slice(0, 3);
            });

            triggerToast(`New Contact Submission: ${newCon.name} just sent a new inquiry.`);
          }

          if (payload.type === "UPDATE_CAREER_APPLICATION_STATUS") {
            const updatedApp = payload.data;
            
            // Re-fetch to get accurate counts and sync lists
            fetchOverviewData(false);
            
            triggerToast(`Career Application status for ${updatedApp.name} updated to ${updatedApp.status}.`);
          }

          if (payload.type === "UPDATE_CONTACT_SUBMISSION_STATUS") {
            const updatedCon = payload.data;

            // Re-fetch overview statistics
            fetchOverviewData(false);

            triggerToast(`Contact Submission status for ${updatedCon.name} updated to ${updatedCon.status}.`);
          }
        } catch (err) {
          console.error("Failed to parse SSE message:", err);
        }
      };

      sse.onerror = (err) => {
        console.error("SSE connection error, attempting reconnect...", err);
        setReconnecting(true);
        sse?.close();
        
        // Attempt reconnection after 5 seconds
        reconnectTimeout = setTimeout(() => {
          connectSSE();
        }, 5000);
      };
    };

    connectSSE();

    return () => {
      sse?.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  // Status badge styling helper
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Reviewing":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "Shortlisted":
        return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      case "Accepted":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "Rejected":
        return "bg-red-500/10 border-red-500/20 text-red-400";
      case "Read":
        return "bg-zinc-500/10 border-zinc-500/20 text-zinc-400";
      case "In Progress":
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
      case "Replied":
        return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
      case "Closed":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      default:
        return "bg-zinc-500/10 border-zinc-500/20 text-zinc-400";
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-zinc-900 border border-white/10 text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Console Overview</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>Dashboard Overview</span>
            {reconnecting && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                Reconnecting...
              </span>
            )}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            System performance metrics and recent candidate/contact activity
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <>
          {/* Metric Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 - Applications */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">
                    APPLICATIONS
                  </p>
                  <h2 className="text-4xl font-extrabold text-white mb-2">{totalApps}</h2>
                  <p className="text-xs text-blue-400 font-semibold">{newApps} new application(s)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Card 2 - Contact Messages */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">
                    CONTACT MESSAGES
                  </p>
                  <h2 className="text-4xl font-extrabold text-white mb-2">{totalCons}</h2>
                  <p className="text-xs text-emerald-400 font-semibold">{newCons} unread message(s)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Card 3 - Total Website Views (live from analytics API) */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-white/40 uppercase mb-2">
                    TOTAL WEBSITE VIEWS
                  </p>
                  <h2 className="text-4xl font-extrabold text-white mb-2">
                    {analyticsViews !== null ? analyticsViews.toLocaleString() : "—"}
                  </h2>
                  <p className="text-xs text-amber-400 font-semibold">
                    {analyticsUnique !== null ? `↗ ${analyticsUnique.toLocaleString()} unique views counted` : "No data recorded yet"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>

          </div>

          {/* Lower Details Section Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Recent Applications */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-6">
                  <h3 className="text-lg font-bold text-white">Recent Applications</h3>
                  <Link 
                    href="/trp-67.73/applications" 
                    className="text-xs font-bold text-primary hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {recentApps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm text-white/40 font-medium">No applications received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentApps.map((app) => (
                      <Link 
                        key={app.id} 
                        href={`/trp-67.73/applications?id=${app.id}`}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-300 group"
                      >
                        <div className="min-w-0 pr-4">
                          <p className="text-sm font-bold text-white truncate">{app.name}</p>
                          <p className="text-xs text-white/55 truncate mt-0.5">{app.email}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase tracking-wider", getStatusBadgeClass(app.status))}>
                            {app.status}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Recent Contacts */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/5 mb-6">
                  <h3 className="text-lg font-bold text-white">Recent Contacts</h3>
                  <Link 
                    href="/trp-67.73/contacts" 
                    className="text-xs font-bold text-primary hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {recentContacts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm text-white/40 font-medium">No contact messages received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentContacts.map((con) => (
                      <Link 
                        key={con.id} 
                        href={`/trp-67.73/contacts?id=${con.id}`}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-300 group"
                      >
                        <div className="min-w-0 pr-4">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-white truncate">{con.name}</p>
                            {con.status === "New" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/55 truncate mt-0.5">{con.projectType}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase tracking-wider", getStatusBadgeClass(con.status))}>
                            {con.status}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
