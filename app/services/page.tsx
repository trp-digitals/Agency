import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, generateFaqJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import ServicesClient from "./_ServicesClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Our Services",
  description:
    "Explore TRP Digitals' premium digital services — web development, UI/UX design, mobile app development, full-stack engineering, and API integration. Based in Hyderabad, serving clients worldwide.",
  path: "/services",
  keywords: [
    "web development services",
    "UI UX design services",
    "mobile app development India",
    "full stack development agency",
    "API integration services",
    "Next.js development agency",
    "React development Hyderabad",
    "custom software development",
  ],
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Our Services | TRP Digitals",
  description: "Premium digital services — web, design, mobile, and full-stack.",
  url: `${siteUrl}/services`,
});

const faqJsonLd = generateFaqJsonLd([
  {
    question: "What services does TRP Digitals offer?",
    answer:
      "TRP Digitals offers web development, UI/UX design, mobile app development, full-stack application engineering, and API integration services.",
  },
  {
    question: "Where is TRP Digitals based?",
    answer:
      "We are based in Hyderabad, Telangana, India, and serve clients globally.",
  },
  {
    question: "Do you build custom websites or use templates?",
    answer:
      "All our solutions are custom-built from scratch. We never use templates — every project is uniquely tailored to your brand and goals.",
  },
  {
    question: "What technologies do you use for web development?",
    answer:
      "We specialize in Next.js, React, Node.js, Python, and cloud platforms including AWS and Google Cloud.",
  },
]);

export default function ServicesPage() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd crumbs={[{ name: "Services", path: "/services" }]} />
      <JsonLd id="webpage-jsonld" data={webPageJsonLd} />
      <JsonLd id="faq-jsonld" data={faqJsonLd} />

      {/* Page Content */}
      <ServicesClient />
    </>
  );
}
