import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import AboutClient from "./_AboutClient";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about TRP Digitals — a premium digital agency from Hyderabad, India. Discover our story, philosophy, and what sets us apart in web development, UI/UX design, and software engineering.",
  path: "/about",
  keywords: [
    "about TRP Digitals",
    "digital agency team Hyderabad",
    "web development company India",
    "agency story",
    "premium digital studio",
  ],
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "About Us | TRP Digitals",
  description:
    "Learn about TRP Digitals — a premium digital agency from Hyderabad, India.",
  url: `${siteUrl}/about`,
});

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd crumbs={[{ name: "About", path: "/about" }]} />
      <JsonLd id="webpage-jsonld" data={webPageJsonLd} />

      {/* Page Content */}
      <AboutClient />
    </>
  );
}
