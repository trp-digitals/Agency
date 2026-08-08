"use client";

import { motion } from "framer-motion";

const services = [
  { title: "SAAS & CUSTOM", subtitle: "Digital Platforms", angle: 0 },
  { title: "DIGITAL MARKETING", subtitle: "SEO & Growth", angle: 60 },
  { title: "AI & AUTOMATION", subtitle: "AI-Powered Workflows", angle: 120 },
  { title: "UI/UX & PRODUCT", subtitle: "Design & Prototypes", angle: 180 },
  { title: "WEB & DIGITAL", subtitle: "Websites & WebApps", angle: 240 },
  { title: "MOBILE & E-COMMERCE", subtitle: "Apps & Online Stores", angle: 300 },
];

const round = (num: number) => Number(num.toFixed(4));

export default function HeroNetworkDiagram() {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/10 to-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* SVG Container */}
      <svg className="w-full h-full text-white overflow-visible" viewBox="0 0 800 800">
        <defs>
          <radialGradient id="trp-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-purple-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ambient Ring Circles */}
        <circle cx="400" cy="400" r="120" fill="none" stroke="rgba(192, 132, 252, 0.2)" strokeWidth="1" />
        <circle cx="400" cy="400" r="200" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="400" cy="400" r="280" fill="none" stroke="rgba(192, 132, 252, 0.12)" strokeWidth="1" />
        <circle cx="400" cy="400" r="350" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" strokeDasharray="3 5" />

        {/* Outer Hub Spokes */}
        {services.map((svc, i) => {
          const rad = (svc.angle * Math.PI) / 180;
          const r = 280;
          const x = round(400 + r * Math.cos(rad));
          const y = round(400 + r * Math.sin(rad));

          return (
            <g key={i}>
              {/* Connecting Line */}
              <line
                x1="400"
                y1="400"
                x2={x}
                y2={y}
                stroke="url(#line-purple-blue)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Outer Node Circle */}
              <circle cx={x} cy={y} r="28" fill="#0f0f15" stroke="#c084fc" strokeWidth="1.5" className="transition-all hover:scale-125" />
              <circle cx={x} cy={y} r="8" fill="#3b82f6" />
              <circle cx={x} cy={y} r="3" fill="#ffffff" />
            </g>
          );
        })}

        {/* Center Hub */}
        <circle cx="400" cy="400" r="100" fill="url(#trp-center-glow)" />
        <circle cx="400" cy="400" r="70" fill="#0f0f15" stroke="rgba(192, 132, 252, 0.4)" strokeWidth="2" />
      </svg>

      {/* Central Brand Lockup */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <span className="text-2xl font-black tracking-tight text-white">TRP</span>
        <span className="text-xs font-extrabold tracking-widest text-gradient uppercase">DIGITALS</span>
      </div>

      {/* Floating Service Labels overlay */}
      {services.map((svc, i) => {
        const rad = (svc.angle * Math.PI) / 180;
        const r = 280;
        const xPercent = round(50 + (r / 400) * 50 * Math.cos(rad));
        const yPercent = round(50 + (r / 400) * 50 * Math.sin(rad));

        return (
          <div
            key={i}
            className="absolute hidden sm:flex flex-col items-center pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105"
            style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
          >
            <div className="glass px-3 py-1.5 rounded-lg border border-primary/20 bg-background/80 shadow-xl backdrop-blur-md">
              <p className="text-[11px] font-extrabold tracking-wider text-white whitespace-nowrap">{svc.title}</p>
              <p className="text-[9px] font-medium text-white/50 whitespace-nowrap">{svc.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
