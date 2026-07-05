/**
 * JsonLd — Reusable server component for injecting JSON-LD structured data.
 * Renders a <script type="application/ld+json"> tag safely.
 *
 * Usage:
 *   <JsonLd data={organizationJsonLd} />
 *   <JsonLd data={breadcrumbJsonLd} id="breadcrumb" />
 */
export default function JsonLd({
  data,
  id,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  id?: string;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}
