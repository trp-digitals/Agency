"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { UserCheck, Layers, Cpu, Zap } from "lucide-react";

const cards = [
  {
    icon: UserCheck,
    title: "One Digital Partner",
    desc: "Design, development, AI, e-commerce, and growth under one roof. No need to coordinate multiple freelancers or agencies.",
  },
  {
    icon: Layers,
    title: "Built Around Your Business",
    desc: "Every project is tailored to your goals, audience, workflow, and budget—not built from a one-size-fits-all template.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    desc: "We use modern tools and proven technologies to build fast, responsive, scalable, and maintainable digital products.",
  },
  {
    icon: Zap,
    title: "Support Beyond Launch",
    desc: "We don't disappear after delivery. Get post-launch support, improvements, and ongoing digital solutions as your business grows.",
  },
];

export default function WhyStackingCards() {
  return (
    <section className="py-24 bg-background relative overflow-x-clip">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <MaxWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-primary mb-3 block">
              WHY TRP DIGITALS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Built to turn ideas into <br />
              <span className="text-gradient">digital growth.</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 font-normal">
              From your first website to custom apps, SaaS platforms, AI solutions, and digital marketing, TRP Digitals gives you one team to design, build, and grow your digital presence.
            </p>
          </motion.div>

          {/* Stacking Value Cards List */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-2xl border border-white/10 relative group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed font-normal">{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </MaxWrapper>
    </section>
  );
}
