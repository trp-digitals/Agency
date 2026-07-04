"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import MaxWrapper from "./ui/MaxWrapper";
import { cn } from "@/lib/utils";

const stats = [
  { value: 5, suffix: "+", label: "Projects Delivered", color: "text-primary" },
  { value: 5, suffix: "+", label: "Happy Clients", color: "text-blue-400" },
  { value: 100, suffix: "%", label: "Client Satisfaction", color: "text-orange-400" },
];

function AnimatedCounter({
  value,
  suffix,
  color,
  inView,
}: {
  value: number;
  suffix: string;
  color: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className={cn("text-5xl md:text-6xl font-black tabular-nums", color)}>
      {count}
      <span className="text-3xl md:text-4xl">{suffix}</span>
    </span>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 border-y border-white/5 bg-[#0d0d0d] overflow-hidden"
      aria-label="Agency statistics"
    >
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/3 via-transparent to-blue-500/3 pointer-events-none" />

      <MaxWrapper>
        <div className="grid grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                color={stat.color}
                inView={inView}
              />
              <p className="text-white/60 text-sm md:text-base font-medium leading-snug">
                {stat.label}
              </p>
              {/* Thin accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className={cn("h-0.5 w-12 rounded-full mt-1 origin-left", stat.color.replace("text-", "bg-"))}
              />
            </motion.div>
          ))}
        </div>
      </MaxWrapper>
    </section>
  );
}
