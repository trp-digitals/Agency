import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import AboutClient from "./AboutClient";

export const metadata: Metadata = generatePageMetadata({
  title: "About TRP Digitals | Digital Solutions Agency",
  description:
    "Learn about TRP Digitals, our founder Syed Wameez Ahmed, and our mission to provide clean code, transparent pricing, and scalable digital solutions for growing companies.",
  path: "/about",
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "About TRP Digitals | Digital Solutions Agency",
  description:
    "Building digital solutions that move businesses forward. Learn about our vision, mission, engineering principles, and founder Syed Wameez Ahmed.",
  url: `${siteUrl}/about`,
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "About Us", path: "/about" }]} />
      <JsonLd id="about-webpage-jsonld" data={webPageJsonLd} />
      <AboutClient />
    </>
  );
}


