"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { ArrowRight, Sparkles, Code2, Globe, Cpu } from "lucide-react";
import Link from "next/link";

const FloatingCard = ({ icon: Icon, title, delay, className }: any) => (
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

import { cn } from "@/lib/utils";

export default function Hero() {
  const words = "We Craft Digital Experiences That Convert".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-background grid-mask opacity-30" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full"
        />
      </div>

      <MaxWrapper className="relative z-10">
        <div className="flex flex-col items-center text-center">
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl text-lg md:text-xl text-foreground/50 mb-12 font-medium tracking-wide"
          >
            Full-stack development | Premium UI/UX | Scalable solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link 
              href="/contact"
              className="group relative px-10 py-5 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 neon-purple"
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link 
              href="/portfolio"
              className="px-10 py-5 rounded-full glass border-white/10 text-white font-bold hover:bg-white/5 transition-all hover:border-white/20"
            >
              View Work
            </Link>
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

      {/* Floating Animation Global Style */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
}
