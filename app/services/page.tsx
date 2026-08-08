import type { Metadata } from "next";
import {
  generatePageMetadata,
  generateWebPageJsonLd,
  generateServicesJsonLd,
  siteUrl,
} from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Digital Solutions & Development Services | TRP Digitals",
  description:
    "Explore TRP Digitals' core digital services: custom web development, UI/UX product design, mobile apps, SaaS platforms, e-commerce, and AI automation workflows.",
  path: "/services",
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Digital Solutions & Development Services | TRP Digitals",
  description:
    "Explore our core digital capabilities and transparent multi-service packages for web, app, SaaS, and AI development.",
  url: `${siteUrl}/services`,
});

const servicesCatalogJsonLd = generateServicesJsonLd();

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Services", path: "/services" }]} />
      <JsonLd id="services-webpage-jsonld" data={webPageJsonLd} />
      <JsonLd id="services-catalog-jsonld" data={servicesCatalogJsonLd} />
      <ServicesClient />
    </>
  );
}


