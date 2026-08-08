import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import AboutClient from "./AboutClient";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about TRP Digitals — a digital solutions agency helping startups, small businesses, and growing companies build high-performance websites, apps, and digital platforms.",
  path: "/about",
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "About Us | TRP Digitals",
  description:
    "Building digital solutions that move businesses forward. Learn about our vision, mission, and core engineering principles.",
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

