"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { FileText, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Tell Us What You Need",
    desc: "Share your business, idea, goals, and requirements. We'll understand what you're trying to achieve and recommend the right digital solution.",
  },
  {
    num: "02",
    icon: Cpu,
    title: "Design & Build",
    desc: "Our team handles the design and development while keeping you updated throughout the process. No technical complexity on your side.",
  },
  {
    num: "03",
    icon: CheckCircle2,
    title: "Launch & Grow",
    desc: "We test, launch, and hand over your finished product with full ownership. Post-launch support helps you keep improving as your business grows.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-background relative border-y border-white/5">
      <MaxWrapper>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary mb-3 block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            From idea to launch. <br />
            <span className="text-gradient">Simple. Transparent.</span>
          </h2>
          <p className="text-white/60 text-base font-normal">
            A straightforward process designed to take your idea from the first conversation to a finished digital product.
          </p>
        </motion.div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card p-8 rounded-2xl border border-white/10 relative flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-mono font-medium text-primary">{step.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-normal">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </MaxWrapper>
    </section>
  );
}
