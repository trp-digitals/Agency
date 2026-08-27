"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    title: "One Team, Multiple Capabilities",
    desc: "From websites and apps to AI, e-commerce, SaaS, and marketing, you can access the digital expertise you need in one place.",
  },
  {
    title: "Built for Your Business",
    desc: "We create solutions around your goals, customers, brand, and budget instead of forcing your business into a generic template.",
  },
  {
    title: "Transparent From Start to Finish",
    desc: "Clear communication, defined deliverables, regular updates, and straightforward pricing keep every project predictable.",
  },
  {
    title: "You Own What We Build",
    desc: "Your website, application, design assets, and source code belong to you. No unnecessary lock-in.",
  },
];

export default function ServiceModel() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/10 blur-[130px] rounded-full pointer-events-none" />

      <MaxWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary mb-3 block">
              THE TRP DIGITALS DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              More than a service. <br />
              <span className="text-gradient">A partner for your growth.</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 font-normal">
              TRP Digitals brings design, development, AI, e-commerce, and digital growth together under one team—so you can focus on your business while we handle the digital side.
            </p>
            <Link
              href="/contact"
              className="cta-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Highlights */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-7 rounded-2xl border border-white/10 flex flex-col justify-start"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </MaxWrapper>
    </section>
  );
}
