"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Mail, 
  Search, 
  ChevronDown, 
  Eye, 
  X, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  AlertCircle,
  Check
} from "lucide-react";
import { Contact } from "../types";
import { cn } from "@/lib/utils";

function ContactsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conIdParam = searchParams.get("id");

  // State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [reconnecting, setReconnecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Message Statuses");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch all contacts
  const fetchContacts = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
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
    fetchContacts(true);
  }, []);

  // Set selected contact based on URL search query (e.g. from Dashboard click)
  useEffect(() => {
    if (conIdParam && contacts.length > 0) {
      const match = contacts.find(c => c.id === conIdParam);
      if (match) {
        setSelectedContact(match);
      }
    }
  }, [conIdParam, contacts]);

  // 2. Realtime SSE Connection
  useEffect(() => {
    let sse: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectSSE = () => {
      sse = new EventSource("/api/admin/realtime");

      sse.onopen = () => {
        console.log("SSE connected on Contacts page");
        setReconnecting(false);
        fetchContacts(false); // Sync in case we missed events
      };

      sse.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);

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

            setContacts((prev) => {
              if (prev.some(c => c.id === newCon.id)) return prev;
              return [newCon, ...prev];
            });

            triggerToast(`New Contact Submission: ${newCon.name} just sent a new inquiry.`);
          }

          if (payload.type === "UPDATE_CONTACT_SUBMISSION_STATUS") {
            const updated: Contact = payload.data;

            setContacts((prev) => prev.map(c => (c.id === updated.id ? updated : c)));

            setSelectedContact((prev) => {
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

  // Update contact status
  const handleUpdateStatus = async (conId: string, newStatus: Contact["status"]) => {
    // 1. Optimistic UI update
    setContacts(prev => prev.map(c => {
      if (c.id === conId) {
        const updated = { ...c, status: newStatus };
        if (selectedContact && selectedContact.id === conId) {
          setSelectedContact(updated);
        }
        return updated;
      }
      return c;
    }));

    try {
      const res = await fetch(`/api/admin/contacts/${conId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status on server.");
      }

      triggerToast(`Message status updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update status on server, rolling back:", err);
      triggerToast("Failed to save changes to database. Rolling back.");
      // Rollback: re-fetch from database
      fetchContacts(false);
    }
  };

  // Inline Quick "Mark Read" Action
  const handleMarkRead = (conId: string) => {
    handleUpdateStatus(conId, "Read");
  };

  // Close Detail Modal & clear URL param
  const handleCloseDetail = () => {
    setSelectedContact(null);
    router.push("/trp-67.73/contacts");
  };

  // Filter contacts lists
  const filteredContacts = contacts.filter(c => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.toLowerCase().includes(query) ||
      c.projectType.toLowerCase().includes(query) ||
      c.message.toLowerCase().includes(query);
    
    const matchesStatus = 
      statusFilter === "All Message Statuses" || 
      c.status === statusFilter;

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
          <Mail className="w-3 h-3" />
          <span>Client Inquiries</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <span>Contact Submissions</span>
          {reconnecting && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              Reconnecting...
            </span>
          )}
        </h1>
        <p className="text-white/60 text-sm mt-1">
          Review business inquiries, client messages, and update submission status
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
            placeholder="Search by sender name, email, or message keyword..."
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
            <option className="bg-[#09090b] text-white" value="All Message Statuses">All Message Statuses</option>
            <option className="bg-[#09090b] text-white" value="New">New</option>
            <option className="bg-[#09090b] text-white" value="Read">Read</option>
            <option className="bg-[#09090b] text-white" value="In Progress">In Progress</option>
            <option className="bg-[#09090b] text-white" value="Replied">Replied</option>
            <option className="bg-[#09090b] text-white" value="Closed">Closed</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Contacts Table Card */}
      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-black text-white/40 uppercase tracking-widest bg-white/[0.01]">
                <th className="py-4 px-6">SENDER & CONTACT</th>
                <th className="py-4 px-6">PROJECT TYPE / MESSAGE PREVIEW</th>
                <th className="py-4 px-6">DATE</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-white/40 text-sm font-semibold">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    Loading contacts...
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <AlertCircle className="w-8 h-8 text-white/20" />
                      <p className="text-sm text-white/40 font-medium">No contact submissions match the selected criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((con) => (
                  <tr 
                    key={con.id} 
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] text-sm text-white/80 transition-colors"
                  >
                    {/* Sender details */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-white">{con.name}</p>
                        <p className="text-xs text-white/40 font-semibold mt-0.5">{con.email}</p>
                        {con.phone && con.phone !== "Not provided" && (
                          <p className="text-[10px] text-white/30 font-mono mt-0.5">{con.phone}</p>
                        )}
                      </div>
                    </td>
                    
                    {/* Message Preview */}
                    <td className="py-4 px-6 max-w-xs sm:max-w-md">
                      <div className="min-w-0">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-primary uppercase tracking-wider">
                          {con.projectType}
                        </span>
                        <p className="text-xs text-white/55 truncate mt-1.5 font-medium leading-relaxed">
                          {con.message}
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 font-mono text-xs text-white/60">{con.date}</td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase tracking-wider", getStatusClasses(con.status))}>
                        {con.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {con.status === "New" && (
                          <button
                            onClick={() => handleMarkRead(con.id)}
                            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 text-white/70 transition-all active:scale-95 text-xs font-bold cursor-pointer"
                            title="Mark as Read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedContact(con)}
                          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-white/70 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Open &rarr;</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Detail Modal Overlay */}
      {selectedContact && (
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
                <span className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full uppercase tracking-wider", getStatusClasses(selectedContact.status))}>
                  {selectedContact.status}
                </span>
                <span className="text-white/30 text-xs">Received on {selectedContact.date}</span>
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
                  <p className="text-base font-bold text-white mt-1.5">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">EMAIL ADDRESS</p>
                  <p className="text-sm font-bold text-white/90 mt-1.5 break-all">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">PHONE NUMBER</p>
                  <p className="text-sm font-bold text-white/90 mt-1.5">{selectedContact.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">RECEIVED DATE</p>
                  <p className="text-sm font-bold text-white/90 mt-1.5 font-mono">{selectedContact.date}</p>
                </div>
              </div>

              {/* Project Type */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">PROJECT REQUIREMENT</p>
                <p className="text-base font-bold text-primary mt-1 flex items-center gap-2">
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>{selectedContact.projectType}</span>
                </p>
              </div>

              {/* Message content */}
              <div>
                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">INQUIRY DETAIL</h4>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-sm text-white/75 leading-relaxed whitespace-pre-line font-medium">
                  {selectedContact.message}
                </div>
              </div>

            </div>

            {/* Footer status buttons */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex flex-col gap-3">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Update Inquiry Status</span>
              <div className="flex flex-wrap gap-2">
                {(["Read", "In Progress", "Replied", "Closed"] as Contact["status"][]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(selectedContact.id, status)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer",
                      selectedContact.status === status
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

export default function ContactsPage() {
  return (
    <Suspense fallback={<div className="text-white/60 text-sm font-medium">Loading contacts...</div>}>
      <ContactsContent />
    </Suspense>
  );
}
