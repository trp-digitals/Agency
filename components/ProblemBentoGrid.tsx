"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { AlertTriangle, Users, Layers, ShieldAlert } from "lucide-react";

const problems = [
  {
    num: "01",
    icon: AlertTriangle,
    title: "Too Many Things to Manage",
    desc: "Websites, apps, marketing, automation, and design often require different tools and providers. We bring the essential digital solutions together in one place.",
    colSpan: "lg:col-span-7",
  },
  {
    num: "02",
    icon: Users,
    title: "Generic Solutions Don't Stand Out",
    desc: "Your business is unique. We create custom digital experiences designed around your brand, customers, and goals.",
    colSpan: "lg:col-span-5",
  },
  {
    num: "03",
    icon: Layers,
    title: "Building Is Only the Beginning",
    desc: "A website or app should do more than exist. We build with performance, usability, SEO, and growth in mind from the start.",
    colSpan: "lg:col-span-5",
  },
  {
    num: "04",
    icon: ShieldAlert,
    title: "Support Shouldn't End at Launch",
    desc: "Digital products need ongoing improvements. We're here to help with updates, optimization, new features, and future digital needs.",
    colSpan: "lg:col-span-7",
  },
];

export default function ProblemBentoGrid() {
  return (
    <section className="py-24 bg-background relative">
      <MaxWrapper>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            WHY TRP DIGITALS EXISTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Your business deserves better <br />
            <span className="text-gradient">digital solutions.</span>
          </h2>
          <p className="text-white/60 text-base">
            We make it easier for businesses to build, launch, and grow online without the complexity of managing multiple digital partners.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden ${prob.colSpan}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-2xl font-black text-primary/40 font-mono">{prob.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{prob.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{prob.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </MaxWrapper>
    </section>
  );
}
