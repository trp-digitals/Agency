"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MaxWrapper from "./ui/MaxWrapper";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Discovery",
    description: "We dive deep into your brand, goals, and target audience to define the perfect digital strategy.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Planning",
    description: "Detailed wireframes, interactive prototypes, and a robust technical roadmap for your project.",
    icon: PenTool,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Development",
    description: "Bringing designs to life with clean, scalable code and high-performance frameworks.",
    icon: Code2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Launch",
    description: "Final optimization, rigorous testing, and a seamless deployment to the production environment.",
    icon: Rocket,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} id="process" className="py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      <MaxWrapper>
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Our Workflow
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            How We <span className="text-white/40">Work</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-[60px] left-0 w-full h-[2px] bg-white/5 hidden lg:block">
            <motion.div
              style={{ scaleX: pathLength, originX: 0 }}
              className="h-full bg-gradient-to-r from-blue-500 via-primary to-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Step Number Badge */}
                <div className="hidden lg:flex absolute -top-[20px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass border-white/10 items-center justify-center text-xs font-black text-white z-20">
                  0{index + 1}
                </div>

                {/* Card Container */}
                <div className="relative p-10 rounded-[2.5rem] glass border-white/5 hover:border-primary/20 transition-all text-center group-hover:bg-white/5">
                  <div className="inline-flex w-20 h-20 rounded-2xl items-center justify-center mb-8 relative transition-transform group-hover:scale-110">
                    <div className={cn("absolute inset-0 blur-xl opacity-20", step.bg)} />
                    <div className={cn("relative z-10 w-full h-full rounded-2xl flex items-center justify-center", step.bg)}>
                      <step.icon className={cn("w-10 h-10", step.color)} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MaxWrapper>
    </section>
  );
}
