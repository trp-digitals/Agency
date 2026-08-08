import MaxWrapper from "./ui/MaxWrapper";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import HeroNetworkDiagram from "./HeroNetworkDiagram";

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-background grid-mask opacity-25" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <MaxWrapper className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs (Immediate Server Render) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIGITAL SOLUTIONS AGENCY</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.15] text-white">
              Built Digital. <br />
              <span className="text-gradient">Grow Smarter.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/70 mb-8 font-medium leading-relaxed max-w-xl">
              We design and build high-performance websites, apps, digital platforms, and AI-powered solutions — helping businesses launch, grow, and scale.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <Link
                href="/contact"
                className="cta-primary px-8 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(192,132,252,0.3)]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="px-8 py-4 rounded-full glass border-white/15 text-white/80 font-semibold hover:bg-white/5 hover:text-white transition-all text-sm flex items-center justify-center"
              >
                View Services
              </Link>
            </div>

            {/* Trust Signal */}
            <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Code Ownership &middot; Single Accountable Lead &middot; Rapid Sprints</span>
            </div>
          </div>

          {/* Right Column: Hero Network Hub SVG */}
          <div className="lg:col-span-6 flex justify-center fade-in">
            <HeroNetworkDiagram />
          </div>

        </div>
      </MaxWrapper>
    </section>
  );
}
