import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Services & Packages",
  description:
    "Explore TRP Digitals' comprehensive digital services — Web Development, Mobile Apps, UI/UX Design, SaaS Platforms, E-Commerce, and AI Automation.",
  path: "/services",
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Services & Packages | TRP Digitals",
  description:
    "Explore our core digital capabilities and transparent multi-service packages.",
  url: `${siteUrl}/services`,
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Services", path: "/services" }]} />
      <JsonLd id="services-webpage-jsonld" data={webPageJsonLd} />
      <ServicesClient />
    </>
  );
}

