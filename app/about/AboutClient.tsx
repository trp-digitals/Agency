"use client";

import { motion } from "framer-motion";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Link from "next/link";
import { ArrowRight, Target, Compass, Code, ShieldCheck, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Code,
    title: "Quality That Matters",
    desc: "We focus on clean design, reliable development, performance, and usability so your digital product works as beautifully as it looks.",
  },
  {
    icon: Target,
    title: "Built Around You",
    desc: "Every project starts with understanding your business, audience, and goals. We build solutions that fit your needs—not generic templates.",
  },
  {
    icon: Compass,
    title: "Clear & Transparent",
    desc: "From scope and timelines to communication and delivery, we keep the process clear so you always know what's happening.",
  },
  {
    icon: ShieldCheck,
    title: "You Own What We Build",
    desc: "Your website, application, design assets, and source code belong to you. No unnecessary lock-in or hidden restrictions.",
  },
];

export default function AboutClient() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary font-mono text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT TRP DIGITALS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Building digital solutions <br />
              <span className="text-gradient">that move businesses forward.</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
              TRP Digitals is a digital solutions agency helping startups, small businesses, and growing companies build better websites, apps, digital products, and AI-powered solutions.
            </p>
          </motion.div>
        </MaxWrapper>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 border-b border-white/5">
        <MaxWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-10 rounded-3xl border border-white/10"
            >
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary mb-3 block">
                OUR VISION
              </span>
              <h2 className="text-2xl font-semibold text-white mb-4">To become a trusted digital partner for businesses everywhere.</h2>
              <p className="text-white/60 text-sm leading-relaxed font-normal">
                We believe every business should have access to modern, high-quality digital solutions that are practical, scalable, and built around its goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-card p-10 rounded-3xl border border-white/10"
            >
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-secondary mb-3 block">
                OUR MISSION
              </span>
              <h2 className="text-2xl font-semibold text-white mb-4">Make great digital solutions accessible to every business.</h2>
              <p className="text-white/60 text-sm leading-relaxed font-normal">
                We combine thoughtful design, modern technology, and transparent collaboration to help businesses build, launch, and grow without unnecessary complexity.
              </p>
            </motion.div>
          </div>
        </MaxWrapper>
      </section>

      {/* Core Engineering Pillars */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary mb-3 block">
              CORE PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              How we build <br />
              <span className="text-gradient">better digital solutions.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-2xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{pil.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed font-normal">{pil.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </MaxWrapper>
      </section>

      {/* Founder's Message */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 sm:p-14 rounded-3xl border border-primary/20 max-w-4xl mx-auto"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary mb-3 block">
              FOUNDER&apos;S NOTE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-snug">
              Building TRP Digitals with a simple belief: great digital work should be accessible.
            </h2>
            <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                I started TRP Digitals with a simple goal: to help businesses build a stronger digital presence without the complexity, cost, and confusion that often comes with finding the right digital partner.
              </p>
              <p>
                Whether you need a website for your business, a mobile app for your customers, a SaaS product, an e-commerce store, or an AI-powered solution, our goal is to make the process simple—from the first idea to the final launch.
              </p>
              <p>
                We&apos;re building TRP Digitals around quality, transparency, and long-term relationships. Every project we take on is an opportunity to create something useful, thoughtful, and built to grow with the business behind it.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-base sm:text-lg">Syed Wameez Ahmed</p>
                <p className="text-white/50 text-xs sm:text-sm font-normal">Founder &amp; CEO &middot; TRP Digitals</p>
              </div>
              <Link
                href="/contact"
                className="cta-primary px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto hover:scale-105 transition-all"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </MaxWrapper>
      </section>

    </main>
  );
}
