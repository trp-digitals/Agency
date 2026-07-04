"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MaxWrapper from "./ui/MaxWrapper";
import { ArrowRight, Zap } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-background"
      aria-label="Call to action"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-primary/20 blur-[130px] rounded-full"
        />
        <div className="absolute inset-0 grid-background grid-mask opacity-10" />
      </div>

      <MaxWrapper className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass border border-white/10 rounded-[3rem] p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-blue-500/5 rounded-[3rem]" />

          <div className="relative z-10">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-bold mb-8"
            >
              <Zap className="w-4 h-4" />
              Let's Build Together
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            >
              Ready to Launch{" "}
              <span className="text-gradient">Your Next</span>
              <br />
              Big Idea?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-loose mb-10"
            >
              From a simple landing page to a full-scale SaaS platform — we've got you covered.
              Get a free consultation and project estimate today.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                id="cta-banner-primary"
                className="group px-10 py-4 min-h-14 rounded-full bg-white text-background font-black text-base flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(192,132,252,0.25)] hover:shadow-[0_0_60px_rgba(192,132,252,0.5)] hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary */}
              <Link
                href="/portfolio"
                id="cta-banner-secondary"
                className="px-8 py-4 min-h-14 rounded-full glass border border-white/20 text-white/80 font-bold hover:bg-white/5 hover:border-white/40 hover:text-white transition-all text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                See Our Work
              </Link>
            </motion.div>

            {/* Social proof micro-text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-white/35 text-sm font-medium"
            >
              5+ projects delivered · Hyderabad, India · Reply within 24hrs
            </motion.p>
          </div>
        </motion.div>
      </MaxWrapper>
    </section>
  );
}
