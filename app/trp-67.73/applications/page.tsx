"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Users, 
  Search, 
  ChevronDown, 
  Eye, 
  X, 
  ExternalLink,
  CheckCircle2,
  Calendar,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { Application } from "../types";
import { cn } from "@/lib/utils";

function ApplicationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appIdParam = searchParams.get("id");

  // State
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [reconnecting, setReconnecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Application Statuses");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch all applications
  const fetchApplications = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      if (res.ok) {
        const data = await res.json();
        setApps(data);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 1. Initial Load
  useEffect(() => {
    fetchApplications(true);
  }, []);

  // Set selected application based on URL search query (e.g. from Dashboard click)
  useEffect(() => {
    if (appIdParam && apps.length > 0) {
      const match = apps.find(a => a.id === appIdParam);
      if (match) {
        setSelectedApp(match);
      }
    }
  }, [appIdParam, apps]);

  // 2. Realtime Updates (SSE)
  useEffect(() => {
    let sse: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectSSE = () => {
      sse = new EventSource("/api/admin/realtime");

      sse.onopen = () => {
        console.log("SSE connected on Applications page");
        setReconnecting(false);
        fetchApplications(false); // Sync in case we missed events
      };

      sse.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);

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

            setApps((prev) => {
              // Avoid duplicates
              if (prev.some(a => a.id === newApp.id)) return prev;
              return [newApp, ...prev];
            });

            triggerToast(`New Career Application: ${newApp.name} just applied.`);
          }

          if (payload.type === "UPDATE_CAREER_APPLICATION_STATUS") {
            const updated: Application = payload.data;
            
            setApps((prev) => prev.map(a => (a.id === updated.id ? updated : a)));

            // If the updated application is currently selected, update the modal as well
            setSelectedApp((prev) => {
              if (prev && prev.id === updated.id) {
                return updated;
              }
              return prev;
            });
          }
        } catch (err) {
          console.error("Failed to parse SSE message:", err);
        }
      };

      sse.onerror = () => {
        setReconnecting(true);
        sse?.close();
        reconnectTimeout = setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => {
      sse?.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  // Status style helper
  const getStatusClasses = (status: string) => {
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
      default:
        return "bg-zinc-500/10 border-zinc-500/20 text-zinc-400";
    }
  };

  // Update application status
  const handleUpdateStatus = async (appId: string, newStatus: Application["status"]) => {
    // 1. Optimistic UI update
    setApps(prev => prev.map(a => {
      if (a.id === appId) {
        const updated = { ...a, status: newStatus };
        if (selectedApp && selectedApp.id === appId) {
          setSelectedApp(updated);
        }
        return updated;
      }
      return a;
    }));

    try {
      const res = await fetch(`/api/admin/applications/${appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status on server.");
      }

      triggerToast(`Application status updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update status on server, rolling back:", err);
      triggerToast("Failed to save changes to database. Rolling back.");
      // Rollback: re-fetch from database
      fetchApplications(false);
    }
  };

  // Close Detail Modal & clear URL param
  const handleCloseDetail = () => {
    setSelectedApp(null);
    router.push("/trp-67.73/applications");
  };

  // Filter application rows
  const filteredApps = apps.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All Application Statuses" || 
      a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-zinc-900 border border-white/10 text-white rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
          <Users className="w-3 h-3" />
          <span>Talent Pipeline</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <span>Career Applications</span>
          {reconnecting && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              Reconnecting...
            </span>
          )}
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Review candidates who applied through the Careers page
        </p>
      </div>

      {/* Filter Area */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name or email..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm transition-colors"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full sm:w-64">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:outline-none text-sm transition-colors appearance-none cursor-pointer font-semibold"
          >
            <option className="bg-[#09090b] text-white" value="All Application Statuses">All Application Statuses</option>
            <option className="bg-[#09090b] text-white" value="New">New</option>
            <option className="bg-[#09090b] text-white" value="Reviewing">Reviewing</option>
            <option className="bg-[#09090b] text-white" value="Shortlisted">Shortlisted</option>
            <option className="bg-[#09090b] text-white" value="Accepted">Accepted</option>
            <option className="bg-[#09090b] text-white" value="Rejected">Rejected</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-black text-white/40 uppercase tracking-widest bg-white/[0.01]">
                <th className="py-4 px-6">CANDIDATE</th>
                <th className="py-4 px-6">EXPERTISE / SKILLS</th>
                <th className="py-4 px-6">SUBMITTED DATE</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-white/40 text-sm font-semibold">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    Loading applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <AlertCircle className="w-8 h-8 text-white/20" />
                      <p className="text-sm text-white/40 font-medium">No applications match the selected criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr 
                    key={app.id} 
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] text-sm text-white/80 transition-colors"
                  >
                    {/* Candidate */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-white">{app.name}</p>
                        <p className="text-xs text-white/40 font-semibold mt-0.5">{app.email}</p>
                      </div>
                    </td>
                    
                    {/* Expertise domains */}
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-sm">
                        {app.domains.map((dom, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-white/70">
                            {dom}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 font-mono text-xs text-white/60">{app.date}</td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase tracking-wider", getStatusClasses(app.status))}>
                        {app.status}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-white/70 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold ml-auto cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Detail</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Detail Modal Overlay */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={handleCloseDetail}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-2xl bg-[#0d0d12] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-zoom-in max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <span className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase tracking-wider", getStatusClasses(selectedApp.status))}>
                  {selectedApp.status}
                </span>
                <span className="text-white/30 text-xs">Submitted on {selectedApp.date}</span>
              </div>
              <button
                onClick={handleCloseDetail}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable details content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar" data-lenis-prevent>
              
              {/* Profile Block Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">FULL NAME</p>
                  <p className="text-base font-bold text-white mt-1.5">{selectedApp.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">EMAIL ADDRESS</p>
                  <p className="text-sm font-bold text-white/90 mt-1.5 break-all">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">PHONE NUMBER</p>
                  <p className="text-sm font-bold text-white/90 mt-1.5">{selectedApp.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">SUBMITTED DATE</p>
                  <p className="text-sm font-bold text-white/90 mt-1.5 font-mono">{selectedApp.date}</p>
                </div>
              </div>

              {/* Portfolio Link */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="min-w-0 pr-4">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">PORTFOLIO / WORK LINK</p>
                  <p className="text-sm font-semibold text-white/80 truncate mt-1">{selectedApp.portfolio}</p>
                </div>
                <a 
                  href={selectedApp.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Open URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Selected Domains */}
              <div>
                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">DOMAINS OF INTEREST</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.domains.map((dom, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-white/95 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary" />
                      <span>{dom}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Why statement */}
              <div>
                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">WHY TRP DIGITALS?</h4>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-white/70 leading-relaxed whitespace-pre-line font-medium">
                  {selectedApp.why}
                </div>
              </div>

            </div>

            {/* Footer status buttons */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex flex-col gap-3">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Update Pipeline Status</span>
              <div className="flex flex-wrap gap-2">
                {(["New", "Reviewing", "Shortlisted", "Accepted", "Rejected"] as Application["status"][]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(selectedApp.id, status)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer",
                      selectedApp.status === status
                        ? "bg-primary text-white border border-primary/20 shadow-md"
                        : "bg-white/5 border border-white/10 text-white/75 hover:bg-white/10"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div className="text-white/60 text-sm font-medium">Loading applications...</div>}>
      <ApplicationsContent />
    </Suspense>
  );
}
