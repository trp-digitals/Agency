"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, FileText, Clock, ExternalLink, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "services", title: "2. Services Offered" },
  { id: "responsibilities", title: "3. User Responsibilities" },
  { id: "payments", title: "4. Payments & Pricing" },
  { id: "intellectual-property", title: "5. Intellectual Property Rights" },
  { id: "liability", title: "6. Limitation of Liability" },
  { id: "termination", title: "7. Termination" },
  { id: "changes", title: "8. Changes to Terms" },
  { id: "contact", title: "9. Contact Information" },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0% -80% 0%" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <MaxWrapper className="pt-40 pb-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Sticky Sidebar Nav */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="flex items-center gap-2 text-primary mb-8 px-2">
                <FileText className="w-5 h-5" />
                <span className="font-black uppercase tracking-widest text-xs">Agreement Sections</span>
              </div>
              <nav className="flex flex-col gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left group",
                      activeSection === section.id 
                        ? "bg-secondary/10 text-secondary shadow-lg shadow-secondary/5" 
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      activeSection === section.id ? "rotate-90 text-secondary" : "group-hover:translate-x-1"
                    )} />
                    <span className="truncate">{section.title.split(". ")[1]}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Terms of <span className="text-white/40">Service</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-foreground/50 font-medium">
                <p className="text-xl">Clear terms for a transparent collaboration.</p>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Last Updated: March 18, 2026</span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-24 prose prose-invert prose-p:text-xl prose-p:text-foreground/60 prose-p:leading-relaxed prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white">
              <section id="introduction" className="scroll-mt-40">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to TRP Digitals. These Terms of Service ("Terms") govern your access to and use of 
                  our website and services. By accessing or using our services, you agree to be bound by these 
                  Terms and our Privacy Policy.
                </p>
                <p>
                  If you do not agree to these Terms, please do not use our services. We reserve the right to 
                  modify these Terms at any time, and your continued use of our services constitutes acceptance 
                  of any updates.
                </p>
              </section>

              <section id="services" className="scroll-mt-40">
                <h2>2. Services Offered</h2>
                <p>
                  TRP Digitals provides premium digital solutions, including but not limited to:
                </p>
                <ul>
                  <li>Custom Web Development</li>
                  <li>UI/UX Design & Branding</li>
                  <li>Mobile Application Development</li>
                  <li>Full-Stack Software Engineering</li>
                  <li>API Integration & Cloud Solutions</li>
                </ul>
              </section>

              <section id="responsibilities" className="scroll-mt-40">
                <h2>3. User Responsibilities</h2>
                <p>
                  As a user of our services, you agree to:
                </p>
                <ul>
                  <li>Provide accurate and complete information when contacting us.</li>
                  <li>Use our services only for lawful purposes.</li>
                  <li>Not attempt to disrupt or interfere with the security or integrity of our systems.</li>
                  <li>Respect all intellectual property rights associated with our work.</li>
                </ul>
              </section>

              <section id="payments" className="scroll-mt-40">
                <h2>4. Payments & Pricing</h2>
                <p>
                  Pricing for our services is project-based and communicated through individual proposals. 
                  Unless otherwise stated:
                </p>
                <ul>
                  <li>A partial upfront deposit is required to initiate any project.</li>
                  <li>Final payment is due upon successful completion and delivery of agreed-upon milestones.</li>
                  <li>Late payments may be subject to additional service fees.</li>
                </ul>
              </section>

              <section id="intellectual-property" className="scroll-mt-40">
                <h2>5. Intellectual Property Rights</h2>
                <p>
                  All custom code, designs, and digital assets created by TRP Digitals specifically for a 
                  client remain our property until full payment is received. Upon final payment, full 
                  ownership and usage rights are transferred to the client, unless otherwise agreed upon 
                  in writing.
                </p>
                <p>
                  We reserve the right to display the completed work in our portfolio and marketing 
                  materials unless a Non-Disclosure Agreement (NDA) is in place.
                </p>
              </section>

              <section id="liability" className="scroll-mt-40">
                <h2>6. Limitation of Liability</h2>
                <p>
                  TRP Digitals shall not be liable for any indirect, incidental, special, or consequential 
                  damages resulting from the use or inability to use our services, even if we have been 
                  advised of the possibility of such damages.
                </p>
              </section>

              <section id="termination" className="scroll-mt-40">
                <h2>7. Termination</h2>
                <p>
                  We may terminate or suspend access to our service immediately, without prior notice or 
                  liability, for any reason whatsoever, including without limitation if you breach the Terms. 
                  You may also terminate a project request at any time according to the cancellation policy 
                  detailed in your specific service agreement.
                </p>
              </section>

              <section id="changes" className="scroll-mt-40">
                <h2>8. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days' notice prior to any 
                  new terms taking effect. What constitutes a material change will be determined at our 
                  sole discretion.
                </p>
              </section>

              <section id="contact" className="scroll-mt-40">
                <h2>9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact our team.
                </p>
                <div className="glass p-12 rounded-[3rem] border-white/5 not-prose relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10 group-hover:bg-primary/20 transition-colors" />
                  <h3 className="text-3xl font-black text-white mb-6">Have questions?</h3>
                  <p className="text-foreground/60 text-lg mb-8 leading-relaxed max-w-md">
                    Our team is here to provide clarity on our terms and collaboration process. Reach out anytime.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#0a0a0a] font-bold hover:bg-primary hover:text-white transition-all group/btn"
                    >
                      Contact Us
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <a 
                      href="mailto:syedwameez67@gmail.com"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                    >
                      <Mail className="w-5 h-5" />
                      Email Us
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </MaxWrapper>

      <Footer />
    </main>
  );
}
