import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import TermsClient from "./_TermsClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service",
  description:
    "Read TRP Digitals' Terms of Service. Understand the terms governing our web development, design, and software engineering services.",
  path: "/terms",
  keywords: ["TRP Digitals terms of service", "service agreement", "digital agency terms"],
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Terms of Service | TRP Digitals",
  description: "Terms governing TRP Digitals' web development and design services.",
  url: `${siteUrl}/terms`,
  dateModified: "2026-03-18T00:00:00Z",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd id="webpage-jsonld" data={webPageJsonLd} />
      <TermsClient />
    </>
  );
}
