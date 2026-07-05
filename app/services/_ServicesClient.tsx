"use client";

import Navbar from "@/components/Navbar";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  Smartphone, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  {
    id: "web",
    title: "Web Development",
    description: "We build enterprise-grade web applications that are fast, secure, and architected for scale. Our development process prioritizes performance and user experience above all else.",
    icon: Globe,
    features: [
      "Next.js & React Expert Development",
      "Headless CMS Integration",
      "Performance Optimization (Core Web Vitals)",
      "Progressive Web Apps (PWA)",
      "E-commerce Solutions (Shopify, Custom)"
    ],
    color: "purple",
    glow: "neon-purple"
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description: "Design is more than just aesthetics; it's about solving problems and creating intuitive paths for your users. We craft immersive digital interfaces that leave a lasting impression.",
    icon: Palette,
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "Interactive Design systems",
      "Accessibility (WCAG) Compliance",
      "Conversion Rate Optimization (CRO)"
    ],
    color: "blue",
    glow: "neon-blue"
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Bring your brand to your customers' pockets. We develop high-quality native and cross-platform mobile applications that leverage the full potential of modern devices.",
    icon: Smartphone,
    features: [
      "iOS & Android Development",
      "React Native & Flutter Expertise",
      "Native API Integrations",
      "Offline-First Architecture",
      "App Store Optimization (ASO)"
    ],
    color: "emerald",
    glow: "neon-blue"
  },
  {
    id: "fullstack",
    title: "Full Stack Applications",
    description: "From database architecture to front-end polish, we handle the entire development lifecycle. Our solutions are robust, secure, and built to handle millions of requests.",
    icon: Cpu,
    features: [
      "Node.js & Python Backend Systems",
      "Microservices Architecture",
      "Database Design (SQL & NoSQL)",
      "Cloud Infrastructure (AWS, Google Cloud)",
      "Real-time Data Processing"
    ],
    color: "orange",
    glow: "neon-purple"
  },
  {
    id: "api",
    title: "API Integration",
    description: "Enable your systems to communicate seamlessly. We build and integrate secure APIs that streamline your business processes and connect your digital ecosystem.",
    icon: Zap,
    features: [
      "RESTful & GraphQL API Design",
      "Third-party Service Integration",
      "Secure Authentication (OAuth, JWT)",
      "Legacy System Modernization",
      "API Documentation & SDKs"
    ],
    color: "yellow",
    glow: "neon-blue"
  }
];

export default function ServicesClient() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Services Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        <MaxWrapper>
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tailored Digital Excellence</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              Our <span className="text-gradient">Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-xl text-foreground/50 font-medium"
            >
              We provide end-to-end digital solutions that help ambitious brands scale, 
              innovate, and dominate their industries.
            </motion.p>
          </div>
        </MaxWrapper>
      </section>

      {/* Detailed Services Sections */}
      <section className="pb-32">
        <MaxWrapper>
          <div className="flex flex-col gap-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={cn(
                  "flex flex-col gap-12 lg:gap-20 pb-32 border-b border-white/5 last:border-0",
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                )}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5", service.glow)}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">
                      {service.title}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black">
                    Crafting <span className="text-white/40">{service.title}</span> <br />
                    At The Highest Level
                  </h2>
                  
                  <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-foreground/80 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Link 
                      href="/contact"
                      className="px-10 py-5 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all neon-purple w-fit"
                    >
                      Start Project
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Decorative Visual Element */}
                <div className="flex-1 relative flex items-center justify-center">
                  <div className={cn("absolute inset-0 bg-primary/5 blur-[80px] rounded-full", service.glow)} />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full aspect-square max-w-md rounded-[3rem] glass border-white/10 flex items-center justify-center group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <service.icon size={120} className="text-white/10 group-hover:text-primary/20 transition-colors" />
                    <div className="absolute inset-x-8 bottom-8 p-6 rounded-2xl glass border-white/5 backdrop-blur-2xl translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                      <p className="text-sm font-bold text-center tracking-widest uppercase text-primary">
                        Premium {service.title}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </MaxWrapper>
      </section>

      <Footer />
    </main>
  );
}
