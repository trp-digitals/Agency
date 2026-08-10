"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: selectedServices.length > 0 ? selectedServices.join(", ") : "General Inquiry",
          message: formData.message,
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
      <h3 className="text-2xl font-bold text-white mb-6">Start a Conversation</h3>

      {submitted ? (
        <div className="py-16 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Thank you for reaching out. Our team will get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm"
            />
          </div>

          {/* Services Multi-Select */}
          <fieldset>
            <legend className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Services Needed <span className="text-white/40">(select all that apply)</span>
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {serviceOptions.map((svc, idx) => {
                const isSelected = selectedServices.includes(svc);
                return (
                  <button
                    type="button"
                    key={idx}
                    aria-pressed={isSelected}
                    onClick={() => toggleService(svc)}
                    className={`px-3.5 py-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-primary bg-primary/10 text-white"
                        : "border-white/10 glass text-white/60 hover:text-white"
                    }`}
                  >
                    <span>{svc}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Message Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
              TELL US ABOUT YOUR PROJECT <span className="text-primary">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your business, what you want to build, your goals, and any important requirements..."
              className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm"
            />
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-primary w-full py-4 rounded-full text-sm font-bold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
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
          <p className="text-[11px] text-white/40 text-center">We respect your privacy. No spam ever.</p>
        </form>
      )}
    </div>
  );
}
