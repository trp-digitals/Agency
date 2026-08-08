"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaxWrapper from "./ui/MaxWrapper";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What services does TRP Digitals provide?",
    a: "We design and build websites, web applications, mobile apps, e-commerce stores, SaaS platforms, AI-powered solutions, and digital marketing strategies for businesses at different stages.",
  },
  {
    q: "How much does a project cost?",
    a: "Project pricing depends on the scope, features, design requirements, integrations, and complexity of your project. After understanding your requirements, we'll provide a clear and customized proposal.",
  },
  {
    q: "How long does it take to complete a project?",
    a: "Launchpad projects typically take 2–4 weeks, Scaleup projects 4–6 weeks, and Enterprise Growth projects 8–12 weeks. Custom projects may vary depending on scope.",
  },
  {
    q: "Will I own my website, app, and source code?",
    a: "Yes. Once the project is completed and the agreed payment terms are fulfilled, you receive ownership of the delivered project and source code. Third-party services, licenses, and subscriptions remain subject to their respective providers' terms.",
  },
  {
    q: "Can you maintain and improve my project after launch?",
    a: "Absolutely. We provide post-launch support and can continue working with you on updates, new features, performance improvements, SEO, automation, and ongoing digital growth.",
  },
  {
    q: "Do you work with businesses outside India?",
    a: "Yes. TRP Digitals can work with clients remotely across India and internationally. Communication, project management, and delivery can all be handled online.",
  },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background relative border-t border-white/5">
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
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            Everything you need to know <br />
            <span className="text-gradient">before getting started.</span>
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </MaxWrapper>
    </section>
  );
}
