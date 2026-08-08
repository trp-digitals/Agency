import type { Metadata, Viewport } from "next";

// ─────────────────────────────────────────────────────────────────────────────

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://trp-digitals.vercel.app";

// ─────────────────────────────────────────────────────────────────────────────
// Site Configuration
// ─────────────────────────────────────────────────────────────────────────────
export const siteConfig = {
  name: "TRP Digitals",
  shortName: "TRP",
  tagline: "Digital Solutions Agency",
  description:
    "TRP Digitals is a digital solutions agency based in Hyderabad, India. We build high-performance websites, mobile apps, SaaS platforms, e-commerce stores, and AI automation for growing businesses.",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  logo: `${siteUrl}/logo.png`,

  keywords: [
    "TRP Digitals",
    "web development agency Hyderabad",
    "website development company Hyderabad",
    "mobile app development company",
    "SaaS development agency",
    "e-commerce development",
    "AI automation agency",
    "UI UX design agency",
    "digital solutions agency",
    "Syed Wameez Ahmed",
    "custom website development",
    "full stack development India",
  ],

  author: {
    name: "Syed Wameez Ahmed",
    role: "Founder & CEO",
    company: "TRP Digitals",
    email: "trpdigitals.dev@gmail.com",
    url: siteUrl,
  },

  social: {
    linkedin: "https://www.linkedin.com/company/trp-digitals",
    instagram: "https://www.instagram.com/trp.digitals",
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
    default: `${siteConfig.name} — Web Development, Apps & AI Solutions`,
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
    title: `${siteConfig.name} — Web Development, Apps & AI Solutions`,
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
    title: `${siteConfig.name} — Web Development, Apps & AI Solutions`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // ── Alternates / Canonical ───────────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },

  // ── Verification ─────────────────────────────────────────────────────────────
  verification: {
    google: "VEeY_ajw5G2m4zOCEkpqIOCk3TH4lZz7KTuelbCctKc",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION",
    },
  },

  // ── Misc ─────────────────────────────────────────────────────────────────────
  category: "technology",
  classification: "Digital Solutions Agency",
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
      title: title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`,
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
      title: title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD Structured Data
// ─────────────────────────────────────────────────────────────────────────────

/** Organization & Professional Service schema — injected once in root layout */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.name,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: siteConfig.logo,
    width: 512,
    height: 512,
  },
  description: siteConfig.description,
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.role,
      worksFor: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
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
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.instagram,
    siteConfig.social.whatsapp,
  ],
  serviceArea: [
    {
      "@type": "AdministrativeArea",
      name: "Hyderabad",
    },
    {
      "@type": "Country",
      name: "India",
    },
    {
      "@type": "Place",
      name: "Worldwide",
    },
  ],
  knowsAbout: [
    "Web Development",
    "UI/UX & Product Design",
    "Mobile App Development",
    "SaaS Platform Engineering",
    "E-Commerce Solutions",
    "AI & Business Automation",
    "Digital Growth & SEO",
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

/** Services Catalog JSON-LD generator */
export function generateServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TRP Digitals Core Services",
    url: `${siteUrl}/services`,
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "Web & Digital Development",
        description:
          "High-performance websites and web applications designed to help businesses establish, grow, and scale their digital presence.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        position: 2,
        name: "UI/UX & Product Design",
        description:
          "User-focused interfaces and design systems crafted to create beautiful, intuitive, and conversion-driven digital experiences.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        position: 3,
        name: "Mobile App Development",
        description:
          "Modern Android and iOS applications built for performance, usability, and seamless user experiences.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        position: 4,
        name: "SaaS & Custom Platforms",
        description:
          "Scalable SaaS products and custom digital platforms built around your business workflows and growth goals.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        position: 5,
        name: "E-Commerce Solutions",
        description:
          "Conversion-focused online stores with secure payments, product management, and scalable e-commerce experiences.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        position: 6,
        name: "AI & Business Automation",
        description:
          "Intelligent AI solutions and automated workflows that reduce manual work and help businesses operate smarter.",
        provider: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

