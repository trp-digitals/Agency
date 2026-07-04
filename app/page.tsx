import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      {/* 1. Hero — first impression & primary CTA */}
      <Hero />
      {/* 2. Stats Strip — instant trust & social proof */}
      <StatsStrip />
      {/* 3. Services — what we offer */}
      <Services />
      {/* 4. Process — how we work */}
      <Process />
      {/* 5. Portfolio — proof of quality */}
      <Portfolio />
      {/* 6. Testimonials — client validation */}
      <Testimonials />
      {/* 7. CTA Banner — final conversion opportunity */}
      <CTABanner />
      <Footer />
    </main>
  );
}
