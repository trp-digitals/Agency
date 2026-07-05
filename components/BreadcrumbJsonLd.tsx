import JsonLd from "./JsonLd";
import { generateBreadcrumbJsonLd, siteUrl } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  /** Relative path, e.g. "/about" */
  path: string;
}

/**
 * BreadcrumbJsonLd — Server component that renders BreadcrumbList structured data.
 * Always prepends the homepage as the first crumb.
 *
 * Usage:
 *   <BreadcrumbJsonLd
 *     crumbs={[{ name: "About", path: "/about" }]}
 *   />
 */
export default function BreadcrumbJsonLd({
  crumbs,
}: {
  crumbs: BreadcrumbItem[];
}) {
  const allCrumbs = [
    { name: "Home", url: siteUrl },
    ...crumbs.map((c) => ({ name: c.name, url: `${siteUrl}${c.path}` })),
  ];

  const jsonLd = generateBreadcrumbJsonLd(allCrumbs);

  return <JsonLd id="breadcrumb-jsonld" data={jsonLd} />;
}
