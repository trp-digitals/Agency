"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Check } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

const serviceOptions = [
  "Web & Digital Development",
  "UI/UX & Product Design",
  "Mobile App Development",
  "SaaS & Custom Platforms",
  "E-Commerce Solutions",
  "AI & Business Automation",
];

export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [botTrap, setBotTrap] = useState("");
  const [draftSavedStatus, setDraftSavedStatus] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // 1. Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("trp_contact_form_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.formData) {
          setFormData(parsed.formData);
        }
        if (Array.isArray(parsed.selectedServices)) {
          setSelectedServices(parsed.selectedServices);
        }
        setDraftSavedStatus("Draft restored");
      }
    } catch (e) {
      console.error("Failed to restore contact form draft:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Save draft to localStorage whenever form values change
  useEffect(() => {
    if (!isLoaded || submitted) return;

    const hasData =
      formData.name.trim() !== "" ||
      formData.email.trim() !== "" ||
      formData.phone.trim() !== "" ||
      formData.message.trim() !== "" ||
      selectedServices.length > 0;

    if (hasData) {
      try {
        localStorage.setItem(
          "trp_contact_form_draft",
          JSON.stringify({ formData, selectedServices })
        );
        setDraftSavedStatus("Draft saved");
      } catch (e) {
        console.error("Failed to save contact form draft:", e);
      }
    } else {
      localStorage.removeItem("trp_contact_form_draft");
      setDraftSavedStatus(null);
    }
  }, [formData, selectedServices, isLoaded, submitted]);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service needed.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          servicesNeeded: selectedServices,
          projectDetails: formData.message,
          bot_trap: botTrap,
        }),
      });

      let data: any = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message. Please try again.");
      }

      // Clear draft on successful submit
      localStorage.removeItem("trp_contact_form_draft");
      setDraftSavedStatus(null);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact Form submit error:", err);
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 sm:p-10 rounded-3xl border border-primary/20 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Start a Conversation</h3>
        {draftSavedStatus && !submitted && isLoaded && (
          <span className="font-mono text-[11px] font-medium tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {draftSavedStatus}
          </span>
        )}
      </div>

      {!isLoaded ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-28 rounded-md" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-32 rounded-md" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-40 rounded-md" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-14 w-full rounded-full pt-2" />
        </div>
      ) : submitted ? (
        <div className="py-16 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h4 className="text-2xl font-semibold text-white mb-2">Request Received!</h4>
          <p className="text-white/60 text-sm max-w-md mx-auto font-normal">
            Thank you for reaching out. Our team will get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hidden honeypot field to block automated spam bots */}
          <input
            type="text"
            name="bot_trap"
            value={botTrap}
            onChange={(e) => setBotTrap(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm font-normal"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm font-normal"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm font-normal"
            />
          </div>

          {/* Services Multi-Select */}
          <fieldset>
            <legend className="block font-mono text-xs font-medium uppercase tracking-wider text-white/60 mb-3">
              Services Needed <span className="text-white/40 font-normal">(select all that apply)</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {serviceOptions.map((svc, idx) => {
                const isSelected = selectedServices.includes(svc);
                return (
                  <button
                    type="button"
                    key={idx}
                    aria-pressed={isSelected}
                    onClick={() => toggleService(svc)}
                    className={`px-4 py-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/20 text-white font-semibold shadow-[0_0_15px_rgba(192,132,252,0.2)]"
                        : "border-white/10 glass text-white/70 hover:text-white hover:border-white/20 font-normal"
                    }`}
                  >
                    <span>{svc}</span>
                    <span
                      className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                        isSelected
                          ? "bg-primary border-primary text-black"
                          : "border-white/30 bg-white/5"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Message Area */}
          <div>
            <label className="block font-mono text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
              TELL US ABOUT YOUR PROJECT <span className="text-primary">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your business, what you want to build, your goals, and any important requirements..."
              className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm font-normal"
            />
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-normal text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-primary w-full py-4 rounded-full text-sm font-semibold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {loading ? (
              <span>Sending Request...</span>
            ) : (
              <>
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-xs font-normal text-white/50 text-center">We respect your privacy. No spam ever.</p>
        </form>
      )}
    </div>
  );
}
