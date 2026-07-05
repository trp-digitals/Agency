import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import ContactClient from "./_ContactClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with TRP Digitals. Start your project today — reach out via WhatsApp, email, or our contact form. Hyderabad, India.",
  path: "/contact",
  keywords: [
    "contact TRP Digitals",
    "hire digital agency India",
    "web development quote",
    "start a project",
    "get in touch digital agency",
    "Hyderabad web agency contact",
  ],
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Contact Us | TRP Digitals",
  description: "Reach out to TRP Digitals to start your digital project.",
  url: `${siteUrl}/contact`,
});

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd crumbs={[{ name: "Contact", path: "/contact" }]} />
      <JsonLd id="webpage-jsonld" data={webPageJsonLd} />

      {/* Page Content */}
      <ContactClient />
    </>
  );
}
