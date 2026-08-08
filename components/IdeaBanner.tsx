"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const serviceChips = [
  "Web & WebApps",
  "UI/UX Design",
  "Mobile Apps",
  "E-Commerce",
  "SaaS & Custom Platforms",
  "AI & Automation",
];

export default function IdeaBanner() {
  return (
    <section className="py-20 bg-background relative">
      <MaxWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 sm:p-16 rounded-3xl border border-primary/30 relative overflow-hidden text-center bg-linear-to-br from-primary/10 via-background to-secondary/10 shadow-[0_0_50px_rgba(192,132,252,0.15)]"
        >
          {/* Ambient Glow Pill */}
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 inline-block px-4 py-1.5 rounded-full glass border-primary/20">
            LET'S WORK TOGETHER
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
            Have a project in mind? <br />
            <span className="text-gradient">Let's build it together.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-white/70 text-base leading-relaxed mb-10">
            Tell us what you're looking to build. We'll help you choose the right digital solution and turn your idea into something your customers can use.
          </p>

          {/* Service Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {serviceChips.map((chip, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-xl glass border border-white/10 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{chip}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="cta-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-base font-bold transition-all hover:scale-105 shadow-[0_0_40px_rgba(192,132,252,0.4)]"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </MaxWrapper>
    </section>
  );
}
