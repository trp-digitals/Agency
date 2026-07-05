import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export const metadata: Metadata = generatePageMetadata({
  title: "Portfolio",
  description:
    "Explore TRP Digitals' portfolio — a curated showcase of premium web development, UI/UX design, and mobile app projects delivered for clients worldwide.",
  path: "/portfolio",
  keywords: [
    "TRP Digitals portfolio",
    "web design projects",
    "digital agency work",
    "UI UX portfolio",
    "web development showcase",
    "client projects India",
  ],
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Portfolio | TRP Digitals",
  description:
    "A curated showcase of premium web development, design, and mobile app projects.",
  url: `${siteUrl}/portfolio`,
});

export default function PortfolioPage() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd crumbs={[{ name: "Portfolio", path: "/portfolio" }]} />
      <JsonLd id="webpage-jsonld" data={webPageJsonLd} />

      {/* Page Content */}
      <main className="min-h-screen pt-20">
        <Navbar />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}
