"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { ArrowRight, Sparkles, Code2, Globe, Cpu, ChevronDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FloatingCard = ({ icon: Icon, title, delay, className }: {
  icon: React.ElementType;
  title: string;
  delay: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.8, 
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.5
    }}
    className={cn("absolute glass p-4 rounded-2xl flex items-center gap-3 border shadow-2xl z-10", className)}
    style={{ animation: `float 6s ease-in-out infinite ${delay}s` }}
  >
    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
      <Icon size={20} />
    </div>
    <span className="text-sm font-semibold whitespace-nowrap">{title}</span>
  </motion.div>
);

export default function Hero() {
  const words = "We Craft Digital Experiences That Convert".split(" ");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-background grid-mask opacity-30" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/20 blur-[120px] rounded-full"
        />
      </div>

      <MaxWrapper className="relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-primary text-sm font-medium mb-10"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Innovating Digital Excellence</span>
          </motion.div>

          {/* Headline with Text Reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "inline-block mr-[0.2em]",
                  word === "Experiences" ? "text-gradient bg-clip-text" : "text-white"
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle — improved contrast & line height */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl text-lg md:text-xl text-white/70 mb-10 font-medium leading-loose tracking-wide"
          >
            We build high-converting websites, mobile apps &amp; SaaS products that
            grow your business — from concept to launch in weeks, not months.
          </motion.p>

          {/* CTAs — clear visual hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* PRIMARY CTA — white bg, maximum contrast (21:1) */}
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="group relative px-10 py-4 min-h-14 rounded-full bg-white text-background font-black text-base flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(192,132,252,0.3)] hover:shadow-[0_0_60px_rgba(192,132,252,0.5)] w-full sm:w-auto"
            >
              {/* Sliding bg on hover */}
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
            </Link>

            {/* SECONDARY CTA — clearly subordinate, ghost style */}
            <Link
              href="/portfolio"
              id="hero-cta-secondary"
              className="px-8 py-4 min-h-14 rounded-full glass border border-white/20 text-white/80 font-bold hover:bg-white/5 hover:border-white/40 hover:text-white transition-all flex items-center justify-center w-full sm:w-auto text-sm"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Trust signal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex items-center gap-2 mt-6 text-white/40 text-sm font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Free consultation &middot; No commitment &middot; 100% satisfaction guarantee</span>
          </motion.div>
        </div>
      </MaxWrapper>

      {/* Floating Elements */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <FloatingCard 
          icon={Code2} 
          title="Clean Code" 
          delay={0} 
          className="top-[25%] left-[12%]"
        />
        <FloatingCard 
          icon={Globe} 
          title="Scalable Web" 
          delay={1.5} 
          className="top-[60%] left-[8%]"
        />
        <FloatingCard 
          icon={Cpu} 
          title="AI Powered" 
          delay={3} 
          className="top-[35%] right-[10%]"
        />
        <FloatingCard 
          icon={Sparkles} 
          title="Premium Design" 
          delay={4.5} 
          className="top-[70%] right-[15%]"
        />
      </div>

      {/* Scroll indicator — sits at very bottom, never overlaps content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-white/30 text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>

    </section>
  );
}
