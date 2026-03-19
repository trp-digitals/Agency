"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Shield, Clock } from "lucide-react";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Information" },
  { id: "protection", title: "4. Data Protection & Security" },
  { id: "third-party", title: "5. Third-Party Services" },
  { id: "rights", title: "6. User Rights" },
  { id: "cookies", title: "7. Cookies Policy" },
  { id: "contact", title: "8. Contact Information" },
];

export default function PrivacyPage() {
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
          
          {/* Sticky Sidebar ToC */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="flex items-center gap-2 text-primary mb-8 px-2">
                <Shield className="w-5 h-5" />
                <span className="font-black uppercase tracking-widest text-xs">Navigation</span>
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
                    {section.title.split(". ")[1]}
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
                Privacy <span className="text-white/40">Policy</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-foreground/50 font-medium">
                <p className="text-xl">Your data, handled with transparency and care.</p>
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
                  At TRP Digitals, we value your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, and safeguard your information when you visit 
                  our website and use our digital services.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with 
                  this policy. We ensure that your data is handled with the highest level of security and 
                  transparency.
                </p>
              </section>

              <section id="collection" className="scroll-mt-40">
                <h2>2. Information We Collect</h2>
                <p>
                  We collect information to provide better services to our users. This includes:
                </p>
                <ul>
                  <li><strong>Personal Information:</strong> Name, email address, and phone number when you fill out our contact form.</li>
                  <li><strong>Project Data:</strong> Details about your project requirements and budget.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and pages visited.</li>
                </ul>
              </section>

              <section id="usage" className="scroll-mt-40">
                <h2>3. How We Use Information</h2>
                <p>
                  The information we collect is used in the following ways:
                </p>
                <ul>
                  <li>To provide, operate, and maintain our digital services.</li>
                  <li>To improve, personalize, and expand our website experience.</li>
                  <li>To communicate with you regarding your project inquiries.</li>
                  <li>To send you administrative information and marketing updates (with your consent).</li>
                </ul>
              </section>

              <section id="protection" className="scroll-mt-40">
                <h2>4. Data Protection & Security</h2>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. 
                  All data is encrypted and stored in secure environments accessible only by authorized personnel. 
                  We use industry-standard protocols (SSL/TLS) for data transmission.
                </p>
              </section>

              <section id="third-party" className="scroll-mt-40">
                <h2>5. Third-Party Services</h2>
                <p>
                  We may employ third-party companies and individuals to facilitate our service. These third 
                  parties have access to your Personal Information only to perform specific tasks on our behalf 
                   and are obligated not to disclose or use it for any other purpose. Common providers include 
                  analytics services and cloud hosting.
                </p>
              </section>

              <section id="rights" className="scroll-mt-40">
                <h2>6. User Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Request access to the personal data we hold about you.</li>
                  <li>Request correction of any inaccurate or incomplete data.</li>
                  <li>Request erasure of your data under certain conditions.</li>
                  <li>Object to the processing of your data for marketing purposes.</li>
                </ul>
              </section>

              <section id="cookies" className="scroll-mt-40">
                <h2>7. Cookies Policy</h2>
                <p>
                  We use cookies and similar tracking technologies to track the activity on our service and hold 
                  certain information. Cookies are files with a small amount of data which may include an 
                  anonymous unique identifier. You can instruct your browser to refuse all cookies.
                </p>
              </section>

              <section id="contact" className="scroll-mt-40">
                <h2>8. Contact Information</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="glass p-8 rounded-3xl border-white/5 not-prose">
                  <p className="text-white font-bold mb-2">Email</p>
                  <p className="text-primary text-xl font-bold mb-6">syedwameez67@gmail.com</p>
                  <p className="text-white font-bold mb-2">Address</p>
                  <p className="text-foreground/60 text-lg">Hyderabad, Telangana, India</p>
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
