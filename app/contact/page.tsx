"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Send, Phone, MapPin, ExternalLink, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web Development",
    message: "",
  });

  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 9063851105",
      link: "https://wa.me/919063851105",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Mail,
      label: "Email",
      value: "trpdigitals.dev@gmail.com",
      link: "mailto:trpdigitals.dev@gmail.com",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "Hyderabad",
      link: "#",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      <Navbar />
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full -z-10" />

      <MaxWrapper className="pt-40 pb-32">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="contact-form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20"
            >
              {/* Left Column: Info */}
              <div className="flex flex-col justify-center">
                <motion.div variants={itemVariants} className="mb-8">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Contact Us</span>
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                    Let's Build Something <span className="text-white/40">Incredible Together</span>
                  </h1>
                  <p className="text-xl text-foreground/50 max-w-lg leading-relaxed">
                    Have a project in mind or just want to say hi? We'd love to hear from you. 
                    Our team is ready to turn your vision into a digital masterpiece.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6">
                  {contactInfo.map((info) => (
                    <a 
                      key={info.label} 
                      href={info.link}
                      className="group flex items-center gap-6 p-6 rounded-3xl glass border-white/5 hover:border-primary/20 transition-all hover:bg-white/5"
                    >
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center relative", info.bg)}>
                        <info.icon className={cn("w-6 h-6", info.color)} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{info.label}</p>
                        <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">{info.value}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto text-white/20 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Right Column: Form */}
              <motion.div variants={itemVariants}>
                <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/5 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl glass border-white/10 flex items-center justify-center shadow-2xl">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>

                  <form className="space-y-8 mt-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Your Name</label>
                        <div className="relative">
                          <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                            placeholder="John Doe"
                          />
                          {focused === "name" && (
                            <motion.div layoutId="focus-glow" className="absolute inset-[-2px] rounded-2xl border-2 border-primary/30 blur-[2px] pointer-events-none" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Email Address</label>
                        <div className="relative">
                          <input 
                            required
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                            placeholder="john@example.com"
                          />
                          {focused === "email" && (
                            <motion.div layoutId="focus-glow" className="absolute inset-[-2px] rounded-2xl border-2 border-primary/30 blur-[2px] pointer-events-none" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Project Type</label>
                      <div className="relative">
                        <select 
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          onFocus={() => setFocused("project")}
                          onBlur={() => setFocused(null)}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                        >
                          <option className="bg-[#0a0a0a]">Web Development</option>
                          <option className="bg-[#0a0a0a]">UI/UX Design</option>
                          <option className="bg-[#0a0a0a]">Mobile App</option>
                          <option className="bg-[#0a0a0a]">Other</option>
                        </select>
                        {focused === "project" && (
                          <motion.div layoutId="focus-glow" className="absolute inset-[-2px] rounded-2xl border-2 border-primary/30 blur-[2px] pointer-events-none" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-4">Project Details</label>
                      <div className="relative">
                        <textarea 
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10 resize-none"
                          placeholder="Tell us about your project goals..."
                        />
                        {focused === "message" && (
                          <motion.div layoutId="focus-glow" className="absolute inset-[-2px] rounded-2xl border-2 border-primary/30 blur-[2px] pointer-events-none" />
                        )}
                      </div>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full py-6 rounded-2xl bg-white text-[#0a0a0a] font-black text-lg flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          Sending...
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <div className="glass p-16 rounded-[4rem] border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                  className="w-24 h-24 bg-primary rounded-3xl mx-auto flex items-center justify-center mb-10 shadow-lg shadow-primary/20"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-black text-white mb-6">Message Sent!</h2>
                <p className="text-xl text-foreground/50 leading-relaxed mb-12">
                  Thank you for reaching out. We've received your message and will get back to you 
                  within 24 hours.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass border-primary/20 text-white font-bold hover:bg-primary transition-all group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MaxWrapper>

      <Footer />
    </main>
  );
}
