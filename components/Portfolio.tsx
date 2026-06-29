"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = ["All", "Web", "Mobile", "Design"];

const projects = [
  {
    title: "Resort Website",
    category: "Web",
    image: "/portfolio/image 1.png",
    tech: ["Next.js", "Tailwind", "Typescript"],
    link: "https://talav-resort.vercel.app/",
  },
  {
    title: "United Sign Ads",
    category: "Web",
    image: "/portfolio/image 2.png",
    tech: ["NextJs", "Typescript", "Tailwind"],
    link: "https://united-sign-ads.vercel.app/",
  },
  {
    title: "Medi-Meet",
    category: "Web",
    image: "/portfolio/image 3.png",
    tech: ["Javascript", "Next.js", "Tailwind"],
    link: "https://medi-meet-blue.vercel.app/",
  },
  {
    title: "Pixxel",
    category: "Web",
    image: "/portfolio/image 4.jpeg",
    tech: ["React", "Node.js", "PostgreSQL"],
    link: "https://pixxel-one.vercel.app/",
  },
  {
    title: "Vehiql",
    category: "Web",
    image: "/portfolio/image 5.png",
    tech: ["React", "Next.js", "Typescript"],
    link: "https://vehiql-car.vercel.app/",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="work" className="py-32 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/5 blur-[120px] rounded-full -z-10" />

      <MaxWrapper>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
            >
              Our Portfolio
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black leading-tight text-white"
            >
              Exceptional <br />
              <span className="text-white/40">Digital Works</span>
            </motion.h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl glass border-white/5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-4/5 rounded-[2.5rem] overflow-hidden glass border-white/5"
              >
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-50 group-hover:opacity-80"
                  />
                </a>
                
                {/* Information Overlay */}
                <div className="absolute inset-x-6 bottom-6 p-8 rounded-4xl glass border-white/10 backdrop-blur-2xl translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
                  
                  <div className="relative z-20">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-primary uppercase tracking-tighter">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {project.title}
                    </h3>
                    
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group/btn pointer-events-auto cursor-pointer"
                    >
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Corner Category Tag */}
                <div className="absolute top-8 left-8 py-2 px-4 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  {project.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </MaxWrapper>
    </section>
  );
}
