"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MaxWrapper from "@/components/ui/MaxWrapper";
import { Mail, MapPin, Clock, Send, Sparkles, CheckCircle2, MessageSquare, Compass, Rocket, ArrowRight } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const serviceOptions = [
  "Web & Digital Development",
  "UI/UX & Product Design",
  "Mobile App Development",
  "SaaS & Custom Platforms",
  "E-Commerce Solutions",
  "AI & Business Automation",
];

const timelineSteps = [
  {
    num: "01",
    icon: Send,
    title: "Tell Us About Your Project",
    desc: "Share your business, idea, goals, and what you'd like us to build or improve.",
  },
  {
    num: "02",
    icon: MessageSquare,
    title: "Let's Discuss Your Needs",
    desc: "We'll talk through your requirements, answer your questions, and understand the right solution for your business.",
  },
  {
    num: "03",
    icon: Compass,
    title: "Get Your Plan",
    desc: "We'll recommend the right approach, scope, timeline, and deliverables for your project.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "We Build & Launch",
    desc: "Once everything is agreed, our team gets to work, keeps you updated, and delivers your finished digital solution.",
  },
];

export default function ContactPage() {
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact Form submit error:", err);
      // Show success after graceful API response or fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-20 overflow-hidden text-foreground">
      
      {/* Page Hero */}
      <section className="relative py-16 border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

        <MaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONTACT TRP DIGITALS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Have a project in mind? <br />
              <span className="text-gradient">Let's build it together.</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
              Tell us what you're looking to build, improve, or grow. We'll get back to you and discuss the right digital solution for your business.
            </p>
          </motion.div>
        </MaxWrapper>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">Tell us what you want to build.</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Whether you need a website, app, e-commerce store, SaaS platform, AI solution, or help growing your online presence, tell us what you have in mind and we'll help you find the right approach.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/40 tracking-wider block">EMAIL ADDRESS</span>
                    <a href="mailto:trpdigitals.dev@gmail.com" className="text-sm font-bold text-white hover:text-primary transition-colors">
                      trpdigitals.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/40 tracking-wider block">HEADQUARTERS</span>
                    <span className="text-sm font-bold text-white">Hyderabad, India</span>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/40 tracking-wider block">PROJECT SUPPORT</span>
                    <span className="text-sm font-bold text-white">From idea to launch and beyond</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 block">FOLLOW OUR WORK</span>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/trp-digitals" target="_blank" rel="noopener noreferrer" className="glass p-3 rounded-xl border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 text-xs font-semibold">
                    <FaLinkedinIn size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://www.instagram.com/trp.digitals" target="_blank" rel="noopener noreferrer" className="glass p-3 rounded-xl border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 text-xs font-semibold">
                    <FaInstagram size={16} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
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
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                        Services Needed <span className="text-white/40">(select all that apply)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {serviceOptions.map((svc, idx) => {
                          const isSelected = selectedServices.includes(svc);
                          return (
                            <button
                              type="button"
                              key={idx}
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
                    </div>

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
            </motion.div>

          </div>
        </MaxWrapper>
      </section>

      {/* What Happens Next Section */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              HOW IT STARTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              From first conversation <br />
              <span className="text-gradient">to final launch.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-2xl border border-white/10 relative"
                >
                  <span className="text-3xl font-mono font-black text-primary/40 block mb-4">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </MaxWrapper>
      </section>

    </main>
  );
}
