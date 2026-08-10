"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { Globe, Palette, Smartphone, Cpu, ShoppingCart, Zap, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const allServices = [
  {
    icon: Globe,
    title: "Web & Digital Development",
    description:
      "High-performance websites and web applications designed to help businesses establish, grow, and scale their digital presence.",
    bullets: [
      "Business Websites and Landing Pages",
      "Custom Web Applications",
      "Responsive & Mobile-First Design",
      "SEO-Ready Development",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX & Product Design",
    description:
      "User-focused interfaces and design systems crafted to create beautiful, intuitive, and conversion-driven digital experiences.",
    bullets: [
      "Figma UI/UX Design",
      "Design Systems & Components",
      "Wireframes & Prototypes",
      "User-Centered Design",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Modern Android and iOS applications built for performance, usability, and seamless user experiences.",
    bullets: [
      "Android & iOS Applications",
      "React Native Development",
      "Cross-Platform Development",
      "App Store Deployment",
    ],
  },
  {
    icon: Cpu,
    title: "SaaS & Custom Platforms",
    description:
      "Scalable SaaS products and custom digital platforms built around your business workflows and growth goals.",
    bullets: [
      "SaaS Application Development",
      "Custom Dashboards & Portals",
      "Authentication & User Management",
      "APIs & Database Integration",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Conversion-focused online stores with secure payments, product management, and scalable e-commerce experiences.",
    bullets: [
      "Custom E-Commerce Stores",
      "Product & Order Management",
      "Payment Gateway Integration",
      "WhatsApp & Automation",
    ],
  },
  {
    icon: Zap,
    title: "AI & Business Automation",
    description:
      "Intelligent AI solutions and automated workflows that reduce manual work and help businesses operate smarter.",
    bullets: [
      "AI Chatbots & Assistants",
      "AI-Powered Features",
      "Business Workflow Automation",
      "API & AI Integrations",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <MaxWrapper>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-left"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              Six Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              From ideas to <br />
              <span className="text-gradient">Digital Growth</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border-white/15 text-white text-sm font-semibold hover:border-primary/40 transition-all"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {allServices.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-full group hover:border-primary/30 transition-all shadow-lg"
              >
                <div className="flex flex-col grow">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 mt-auto">
                    {svc.bullets.map((b, i) => (
                      <li key={i} className="text-xs sm:text-sm text-white/80 flex items-start gap-2.5">
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
  );
}

