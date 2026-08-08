import type { Metadata } from "next";
import { generatePageMetadata, generateWebPageJsonLd, siteUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy | TRP Digitals",
  description:
    "Read TRP Digitals' Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with data protection standards.",
  path: "/privacy",
  keywords: ["TRP Digitals privacy policy", "data protection", "privacy compliance"],
});

const webPageJsonLd = generateWebPageJsonLd({
  title: "Privacy Policy | TRP Digitals",
  description: "How TRP Digitals collects, uses, and protects your personal data.",
  url: `${siteUrl}/privacy`,
  dateModified: "2026-03-18T00:00:00Z",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd id="webpage-jsonld" data={webPageJsonLd} />
      <PrivacyClient />
    </>
  );
}

