"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { Rocket, Building2, Landmark, Globe2 } from "lucide-react";

const verticals = [
  {
    num: "01",
    icon: Rocket,
    title: "Startups & New Ventures",
    desc: "Launching an idea? We help startups turn concepts into websites, MVPs, apps, and digital products ready for the market.",
  },
  {
    num: "02",
    icon: Building2,
    title: "Small & Local Businesses",
    desc: "Build a stronger online presence with professional websites, e-commerce, local SEO, and digital solutions that help attract more customers.",
  },
  {
    num: "03",
    icon: Landmark,
    title: "Growing Businesses",
    desc: "Upgrade your digital presence with custom platforms, automation, mobile apps, integrations, and growth-focused solutions.",
  },
  {
    num: "04",
    icon: Globe2,
    title: "Established Companies",
    desc: "Modernize and expand your digital operations with custom software, AI solutions, e-commerce, automation, and ongoing digital support.",
  },
];

export default function ClientsGrid() {
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
            WHO WE WORK WITH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Digital solutions for <br />
            <span className="text-gradient">businesses at every stage.</span>
          </h2>
          <p className="text-white/60 text-base">
            Whether you're starting from scratch or ready to scale, we build digital solutions around where your business is today and where you want to go next.
          </p>
        </motion.div>

        {/* Verticals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((vert, idx) => {
            const Icon = vert.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-2xl font-black text-primary/40 font-mono">{vert.num}</span>
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{vert.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{vert.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </MaxWrapper>
    </section>
  );
}
