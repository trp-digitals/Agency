import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import MaxWrapper from "@/components/ui/MaxWrapper";
import { Mail, MapPin, Clock, Send, Sparkles, MessageSquare, Compass, Rocket } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with TRP Digitals. Discuss your web development, mobile app, SaaS, or AI project with our expert team.",
  path: "/contact",
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Contact Us | TRP Digitals",
  description:
    "Tell us about your project goals and let's build something extraordinary together.",
  url: `${siteUrl}/contact`,
});

const timelineSteps = [
  {
    num: "01",
    icon: Send,
    title: "Tell Us About Your Project",
    desc: "Share your business, idea, goals, and what you'd like us to build or improve.",
  },
  {
    num: "02",
    icon: MessageSquare,
    title: "Let's Discuss Your Needs",
    desc: "We'll talk through your requirements, answer your questions, and understand the right solution for your business.",
  },
  {
    num: "03",
    icon: Compass,
    title: "Get Your Plan",
    desc: "We'll recommend the right approach, scope, timeline, and deliverables for your project.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "We Build & Launch",
    desc: "Once everything is agreed, our team gets to work, keeps you updated, and delivers your finished digital solution.",
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Contact", path: "/contact" }]} />
      <JsonLd id="contact-webpage-jsonld" data={webPageJsonLd} />

      <main className="min-h-screen bg-background pt-28 pb-20 overflow-hidden text-foreground">
        
        {/* Page Hero */}
        <section className="relative py-16 border-b border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

          <MaxWrapper>
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONTACT TRP DIGITALS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Have a project in mind? <br />
                <span className="text-gradient">Let&apos;s build it together.</span>
              </h1>

              <p className="text-white/70 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
                Tell us what you&apos;re looking to build, improve, or grow. We&apos;ll get back to you and discuss the right digital solution for your business.
              </p>
            </div>
          </MaxWrapper>
        </section>

        {/* Main Contact Section */}
        <section className="py-24 border-b border-white/5">
          <MaxWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Contact Details */}
              <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">Tell us what you want to build.</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Whether you need a website, app, e-commerce store, SaaS platform, AI solution, or help growing your online presence, tell us what you have in mind and we'll help you find the right approach.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/40 tracking-wider block">EMAIL ADDRESS</span>
                    <a href="mailto:trpdigitals.dev@gmail.com" className="text-sm font-bold text-white hover:text-primary transition-colors">
                      trpdigitals.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/40 tracking-wider block">HEADQUARTERS</span>
                    <span className="text-sm font-bold text-white">Hyderabad, India</span>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-white/40 tracking-wider block">PROJECT SUPPORT</span>
                    <span className="text-sm font-bold text-white">From idea to launch and beyond</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 block">FOLLOW OUR WORK</span>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/trp-digitals" target="_blank" rel="noopener noreferrer" className="glass p-3 rounded-xl border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 text-xs font-semibold">
                    <FaLinkedinIn size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://www.instagram.com/trp.digitals" target="_blank" rel="noopener noreferrer" className="glass p-3 rounded-xl border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2 text-xs font-semibold">
                    <FaInstagram size={16} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </MaxWrapper>
      </section>

      {/* What Happens Next Section */}
      <section className="py-24 border-b border-white/5">
        <MaxWrapper>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
              HOW IT STARTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              From first conversation <br />
              <span className="text-gradient">to final launch.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 rounded-2xl border border-white/10 relative"
                >
                  <span className="text-3xl font-mono font-black text-primary/40 block mb-4">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </MaxWrapper>
      </section>

    </main>
    </>
  );
}
