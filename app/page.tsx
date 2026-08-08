import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhyStackingCards from "@/components/WhyStackingCards";
import ProblemBentoGrid from "@/components/ProblemBentoGrid";
import Process from "@/components/Process";
import Services from "@/components/Services";
import ServiceModel from "@/components/ServiceModel";
import ClientsGrid from "@/components/ClientsGrid";
import FAQAccordion from "@/components/FAQAccordion";
import IdeaBanner from "@/components/IdeaBanner";
import JsonLd from "@/components/JsonLd";
import {
  generatePageMetadata,
  generateWebPageJsonLd,
  generateFaqJsonLd,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "TRP Digitals | Web Development, Apps, AI & Digital Solutions",
  description:
    "TRP Digitals is a digital solutions agency in Hyderabad building high-performance websites, mobile apps, SaaS platforms, e-commerce stores, and AI automation for growing businesses.",
  path: "",
});

const homeWebPageJsonLd = generateWebPageJsonLd({
  title: "TRP Digitals | Web Development, Apps, AI & Digital Solutions",
  description:
    "TRP Digitals is a digital solutions agency building high-performance websites, mobile apps, SaaS platforms, e-commerce stores, and AI automation.",
  url: siteUrl,
});

const homeFaqJsonLd = generateFaqJsonLd([
  {
    question: "What services does TRP Digitals provide?",
    answer:
      "We design and build websites, web applications, mobile apps, e-commerce stores, SaaS platforms, AI-powered solutions, and digital marketing strategies for businesses at different stages.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Project pricing depends on the scope, features, design requirements, integrations, and complexity of your project. After understanding your requirements, we'll provide a clear and customized proposal.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Launchpad projects typically take 2–4 weeks, Scaleup projects 4–6 weeks, and Enterprise Growth projects 8–12 weeks. Custom projects may vary depending on scope.",
  },
  {
    question: "Will I own my website, app, and source code?",
    answer:
      "Yes. Once the project is completed and the agreed payment terms are fulfilled, you receive ownership of the delivered project and source code. Third-party services, licenses, and subscriptions remain subject to their respective providers' terms.",
  },
  {
    question: "Can you maintain and improve my project after launch?",
    answer:
      "Absolutely. We provide post-launch support and can continue working with you on updates, new features, performance improvements, SEO, automation, and ongoing digital growth.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes. TRP Digitals can work with clients remotely across India and internationally. Communication, project management, and delivery can all be handled online.",
  },
]);

export default function Home() {
  return (
    <>
      <JsonLd id="home-webpage-jsonld" data={homeWebPageJsonLd} />
      <JsonLd id="home-faq-jsonld" data={homeFaqJsonLd} />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Hero />
        <WhyStackingCards />
        <ProblemBentoGrid />
        <Process />
        <Services />
        <ServiceModel />
        <ClientsGrid />
        <FAQAccordion />
        <IdeaBanner />
      </main>
    </>
  );
}

