"use client";

import { motion } from "framer-motion";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Link from "next/link";
import { Globe, Palette, Smartphone, Cpu, ShoppingCart, Zap, Check, ArrowRight, Sparkles } from "lucide-react";
import ServicesCompareMatrix from "@/components/ServicesCompareMatrix";

const servicesList = [
  {
    icon: Globe,
    title: "Web & Digital Development",
    desc: "High-performance websites and web applications designed to help businesses establish, grow, and scale their digital presence.",
    bullets: ["Business Websites and Landing Pages", "Custom Web Applications", "Responsive & Mobile-First Design", "SEO-Ready Development"],
  },
  {
    icon: Palette,
    title: "UI/UX & Product Design",
    desc: "User-focused interfaces and design systems crafted to create beautiful, intuitive, and conversion-driven digital experiences.",
    bullets: ["Figma UI/UX Design", "Design Systems & Components", "Wireframes & Prototypes", "User-Centered Design"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Modern Android and iOS applications built for performance, usability, and seamless user experiences.",
    bullets: ["Android & iOS Applications", "React Native Development", "Cross-Platform Development", "App Store Deployment"],
  },
  {
    icon: Cpu,
    title: "SaaS & Custom Platforms",
    desc: "Scalable SaaS products and custom digital platforms built around your business workflows and growth goals.",
    bullets: ["SaaS Application Development", "Custom Dashboards", "Authentication & User Management", "APIs & Database Integration"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Conversion-focused online stores with secure payments, product management, and scalable e-commerce experiences.",
    bullets: ["Custom E-Commerce Stores", "Product & Order Management", "Payment Gateway Integration", "WhatsApp & Automation"],
  },
  {
    icon: Zap,
    title: "AI & Business Automation",
    desc: "Intelligent AI solutions and automated workflows that reduce manual work and help businesses operate smarter.",
    bullets: ["AI Chatbots & Assistants", "AI-Powered Features", "Business Workflow Automation", "API & AI Integrations"],
  },
];

const packages = [
  {
    name: "Launchpad",
    badge: "For Small Businesses",
    price: "10,000",
    desc: "Everything you need to launch a professional digital presence",
    features: [
      "Upto 5 Pages",
      "Mobile First Design",
      "Technical SEO Setup",
      "Whatsapp and Forms",
      "2-4 Weeks",
      "15 days support",
    ],
  },
  {
    name: "Scaleup",
    badge: "For Growing Businesses",
    price: "16,000",
    desc: "Advanced digital experiences built to generate leads and support growth",
    features: [
      "Everything in Launchpad",
      "Upto 15 Pages",
      "CMS Dashboard",
      "API Integrations",
      "Advanced SEO",
      "4-6 weeks",
      "30 days support",
    ],
    popular: true,
  },
  {
    name: "Enterprise Growth",
    badge: "For Established Companies",
    price: "25,000",
    desc: "Custom digital platforms and automation built for ambitious businesses",
    features: [
      "Everything in Scaleup",
      "20+ Pages",
      "Custom Web Platform",
      "AI Automation",
      "Priority Support",
      "8-12 weeks",
    ],
  },
];

export default function ServicesClient() {
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
              <span>FULL SERVICE CATALOG</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Everything Digital. <br />
              <span className="text-gradient">Built for Your Business.</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
              From websites and mobile apps to SaaS, e-commerce, AI automation, and digital marketing — TRP Digitals provides the digital solutions your business needs to build, launch, and grow.
            </p>
          </motion.div>
        </MaxWrapper>
      </section>

      {/* Core Services Grid */}
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
              What We Build
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Our core digital <span className="text-gradient">capabilities.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {servicesList.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-full group hover:border-primary/30 transition-all shadow-lg"
                >
                  <div className="flex flex-col grow">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{svc.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-6">{svc.desc}</p>

                    <ul className="space-y-2.5 mb-6 mt-auto">
                      {svc.bullets.map((b, i) => (
                        <li key={i} className="text-xs text-white/80 flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="cta-primary w-full py-3 rounded-xl text-xs font-bold text-center inline-flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Discuss Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </MaxWrapper>
      </section>

      {/* Multi-Service Packages */}
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
              Multi-Service Packages
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              One partner. <span className="text-gradient">Three ways to scale.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`glass-card p-8 rounded-3xl border flex flex-col justify-between relative ${
                  pkg.popular ? "border-primary shadow-[0_0_40px_rgba(192,132,252,0.2)]" : "border-white/10"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                    Recommended
                  </span>
                )}

                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">{pkg.badge}</span>
                  <h3 className="text-2xl font-black text-white mb-2">{pkg.name}</h3>
                  <p className="text-white/60 text-xs mb-4 leading-relaxed">{pkg.desc}</p>

                  {/* Price display */}
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">₹{pkg.price}</span>
                    <span className="text-xs text-white/50 font-medium">/ starting</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="text-xs text-white/80 flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-4 rounded-full text-xs font-bold text-center flex items-center justify-center gap-2 ${
                    pkg.popular ? "cta-primary" : "glass border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  <span>Discuss Your Package</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <ServicesCompareMatrix />

        </MaxWrapper>
      </section>

    </main>
  );
}
