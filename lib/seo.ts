import type { Metadata, Viewport } from "next";

// ─────────────────────────────────────────────────────────────────────────────

export const siteUrl = "https://trp-digitals.vercel.app/";

// ─────────────────────────────────────────────────────────────────────────────
// Site Configuration
// ─────────────────────────────────────────────────────────────────────────────
export const siteConfig = {
  name: "TRP Digitals",
  shortName: "TRP",
  tagline: "Premium Digital Agency",
  description:
    "TRP Digitals is a premium digital agency based in Hyderabad, India. We craft high-performance websites, mobile apps, and full-stack software solutions that help businesses grow in the digital world.",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  logo: `${siteUrl}/logo.png`,

  keywords: [
    "TRP Digitals",
    "digital agency Hyderabad",
    "web development agency India",
    "custom website development",
    "UI UX design agency",
    "mobile app development",
    "full stack development",
    "Next.js agency",
    "React development",
    "premium web design",
    "software development agency",
    "digital solutions India",
  ],

  author: {
    name: "TRP Digitals",
    email: "trpdigitals.dev@gmail.com",
    url: siteUrl,
  },

  social: {
    whatsapp: "https://wa.me/919063851105",
    email: "trpdigitals.dev@gmail.com",
  },

  location: {
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    countryCode: "IN",
  },

  themeColor: "#c084fc",
  backgroundColor: "#0a0a0a",

  locale: "en_IN",
  twitterHandle: "@trpdigitals",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Default / Root Metadata
// Used in app/layout.tsx and as the fallback for all pages.
// ─────────────────────────────────────────────────────────────────────────────
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ────────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
  },

  // ── Open Graph ───────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ─────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // ── Alternates / Canonical ───────────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },

  // ── Verification ─────────────────────────────────────────────────────────────
  // TODO: Replace with your actual verification codes from each platform
  verification: {
    google: "REPLACE_WITH_SEARCH_CONSOLE_CODE",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION",
    },
  },

  // ── Misc ─────────────────────────────────────────────────────────────────────
  category: "technology",
  classification: "Digital Agency",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Viewport Export
// In Next.js 16+, themeColor/colorScheme/viewport must be in a separate
// generateViewport export. Export this from app/layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor },
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor },
  ],
  colorScheme: "dark",
};

// ─────────────────────────────────────────────────────────────────────────────
// Page Metadata Generator
// Merges page-specific overrides with the defaults.
// Usage: export const metadata = generatePageMetadata({ title, description, ... })
// ─────────────────────────────────────────────────────────────────────────────
export function generatePageMetadata(
  overrides: {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    noIndex?: boolean;
    ogImage?: string;
  }
): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    noIndex = false,
    ogImage = siteConfig.ogImage,
  } = overrides;

  const resolvedKeywords: string[] = keywords
    ? [...keywords]
    : [...siteConfig.keywords];

  const canonicalUrl = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: resolvedKeywords,

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      ...(defaultMetadata.openGraph as object),
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },

    twitter: {
      ...(defaultMetadata.twitter as object),
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD Structured Data
// ─────────────────────────────────────────────────────────────────────────────

/** Organization schema — injected once in root layout */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteConfig.name,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: siteConfig.logo,
    width: 512,
    height: 512,
  },
  description: siteConfig.description,
  foundingDate: "2024",
  founders: [{ "@type": "Person", name: "TRP Digitals Team" }],
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.state,
    addressCountry: siteConfig.location.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.social.email,
    telephone: "+91-9063851105",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [siteConfig.social.whatsapp],
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  knowsAbout: [
    "Web Development",
    "UI/UX Design",
    "Mobile App Development",
    "Full-Stack Engineering",
  ],
};

/** WebSite schema — injected once in root layout, enables sitelinks searchbox */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** Breadcrumb JSON-LD generator */
export function generateBreadcrumbJsonLd(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** WebPage JSON-LD generator */
export function generateWebPageJsonLd(page: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${page.url}/#webpage`,
    url: page.url,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    dateModified: page.dateModified ?? new Date().toISOString(),
    inLanguage: "en-IN",
  };
}

/** FAQ JSON-LD generator */
export function generateFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
