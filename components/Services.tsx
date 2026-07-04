"use client";

import { motion } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { Globe, Palette, Smartphone, Cpu, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Web Development",
    description: "High-performance, responsive websites built with the latest frameworks and best practices.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "UI/UX Design",
    description: "User-centric design focused on creating intuitive, beautiful, and engaging digital interfaces.",
    icon: Palette,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications that provide seamless user experiences.",
    icon: Smartphone,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Full Stack Applications",
    description: "End-to-end development of robust, scalable applications with powerful backend logic.",
    icon: Cpu,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "API Integration",
    description: "Connecting systems and streamlining workflows through secure and efficient API solutions.",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-125 h-125 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <MaxWrapper>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
            >
              Our Expertise
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black leading-tight"
            >
              Tailored Digital <br />
              <span className="text-white/40">Solutions for You</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/services"
              className="group flex items-center gap-3 px-8 py-4 rounded-full glass border-white/5 hover:border-primary/30 transition-all text-white font-bold"
            >
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 md:p-10 rounded-[2.5rem] glass border-white/5 hover:border-primary/20 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 relative z-10 transition-transform group-hover:scale-110", service.bg)}>
                <service.icon className={cn("w-6 h-6 md:w-8 md:h-8", service.color)} />
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 relative z-10 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-foreground/65 leading-relaxed text-base md:text-lg relative z-10">
                {service.description}
              </p>

              <div className="mt-8 relative z-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <span className="text-primary font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </MaxWrapper>
    </section>
  );
}
