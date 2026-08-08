// ─────────────────────────────────────────────────────────────────────────────
// Geographic Normalization Utility — TRP Digitals Analytics
// Maps IP network metadata (Vercel headers / standard ISO codes) to clean,
// human-readable country, state/region, and city names.
// Strict privacy: Never processes, returns, or stores IP addresses or PII.
// ─────────────────────────────────────────────────────────────────────────────

const COUNTRY_MAP: Record<string, string> = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  AE: "UAE",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  SG: "Singapore",
  SA: "Saudi Arabia",
  QA: "Qatar",
  KW: "Kuwait",
  OM: "Oman",
  BH: "Bahrain",
  JP: "Japan",
  CN: "China",
  BR: "Brazil",
  ZA: "South Africa",
  NL: "Netherlands",
  SE: "Sweden",
  CH: "Switzerland",
  MY: "Malaysia",
  ID: "Indonesia",
  TH: "Thailand",
  VN: "Vietnam",
  NZ: "New Zealand",
  IE: "Ireland",
  IT: "Italy",
  ES: "Spain",
  RU: "Russia",
  MX: "Mexico",
  PH: "Philippines",
  PK: "Pakistan",
  BD: "Bangladesh",
  LKA: "Sri Lanka",
  LK: "Sri Lanka",
  NPL: "Nepal",
  NP: "Nepal",
};

const INDIA_REGION_MAP: Record<string, string> = {
  TG: "Telangana",
  TS: "Telangana",
  TELANGANA: "Telangana",
  MH: "Maharashtra",
  MAHARASHTRA: "Maharashtra",
  KA: "Karnataka",
  KARNATAKA: "Karnataka",
  DL: "Delhi",
  DELHI: "Delhi",
  TN: "Tamil Nadu",
  "TAMIL NADU": "Tamil Nadu",
  AP: "Andhra Pradesh",
  "ANDHRA PRADESH": "Andhra Pradesh",
  GJ: "Gujarat",
  GUJARAT: "Gujarat",
  UP: "Uttar Pradesh",
  "UTTAR PRADESH": "Uttar Pradesh",
  WB: "West Bengal",
  "WEST BENGAL": "West Bengal",
  HR: "Haryana",
  HARYANA: "Haryana",
  KL: "Kerala",
  KERALA: "Kerala",
  PB: "Punjab",
  PUNJAB: "Punjab",
  RJ: "Rajasthan",
  RAJASTHAN: "Rajasthan",
  MP: "Madhya Pradesh",
  "MADHYA PRADESH": "Madhya Pradesh",
  OR: "Odisha",
  OD: "Odisha",
  ODISHA: "Odisha",
  CT: "Chhattisgarh",
  CG: "Chhattisgarh",
  CHHATTISGARH: "Chhattisgarh",
  JH: "Jharkhand",
  JHARKHAND: "Jharkhand",
  AS: "Assam",
  ASSAM: "Assam",
  UT: "Uttarakhand",
  UK: "Uttarakhand",
  UTTARAKHAND: "Uttarakhand",
  HP: "Himachal Pradesh",
  "HIMACHAL PRADESH": "Himachal Pradesh",
  JK: "Jammu and Kashmir",
  "JAMMU AND KASHMIR": "Jammu and Kashmir",
  GA: "Goa",
  GOA: "Goa",
};

const US_REGION_MAP: Record<string, string> = {
  CA: "California",
  NY: "New York",
  TX: "Texas",
  FL: "Florida",
  IL: "Illinois",
  WA: "Washington",
  MA: "Massachusetts",
  VA: "Virginia",
  GA: "Georgia",
  NC: "North Carolina",
  NJ: "New Jersey",
  OH: "Ohio",
  PA: "Pennsylvania",
  MI: "Michigan",
  CO: "Colorado",
};

/**
 * Normalizes country header (ISO 2-letter or name) to standard display name.
 */
export function normalizeCountry(raw: string | null | undefined): string {
  if (!raw) return "Unknown";
  const cleaned = raw.trim();
  if (!cleaned || cleaned.toLowerCase() === "unknown" || cleaned.toLowerCase() === "null") {
    return "Unknown";
  }

  const upper = cleaned.toUpperCase();
  if (COUNTRY_MAP[upper]) return COUNTRY_MAP[upper];

  // If it's already a full country name matching our map values or valid text
  const matchValue = Object.values(COUNTRY_MAP).find(
    (v) => v.toLowerCase() === cleaned.toLowerCase()
  );
  if (matchValue) return matchValue;

  // Titlecase if longer string
  if (cleaned.length > 2) {
    return cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  return "Unknown";
}

/**
 * Normalizes region / state header to standard display name.
 */
export function normalizeRegion(raw: string | null | undefined, country?: string | null): string {
  if (!raw) return "Unknown";
  let cleaned = raw.trim();
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    // Keep raw if URI decode fails
  }

  if (!cleaned || cleaned.toLowerCase() === "unknown" || cleaned.toLowerCase() === "null") {
    return "Unknown";
  }

  const upper = cleaned.toUpperCase();

  // Check India region map first if country is India or unspecified
  if (INDIA_REGION_MAP[upper]) return INDIA_REGION_MAP[upper];

  // Check US region map if country is US
  if (country === "United States" || country === "US") {
    if (US_REGION_MAP[upper]) return US_REGION_MAP[upper];
  }

  // General formatting for full region names
  if (cleaned.length > 2) {
    return cleaned
      .split(/[\s_-]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  return upper.length === 2 ? upper : "Unknown";
}

/**
 * Normalizes city header to clean title-case city name.
 */
export function normalizeCity(raw: string | null | undefined): string {
  if (!raw) return "Unknown";
  let cleaned = raw.trim();
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    // Keep raw
  }

  if (!cleaned || cleaned.toLowerCase() === "unknown" || cleaned.toLowerCase() === "null") {
    return "Unknown";
  }

  return cleaned
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Returns flag emoji for a country name or ISO code.
 */
export function getCountryFlag(country: string | null | undefined): string {
  if (!country || country === "Unknown") return "🌍";
  
  // Find ISO key if country is full name
  const isoKey = Object.keys(COUNTRY_MAP).find(
    (k) => COUNTRY_MAP[k].toLowerCase() === country.toLowerCase() || k.toLowerCase() === country.toLowerCase()
  );

  if (isoKey && isoKey.length === 2) {
    const codePoints = [...isoKey.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65);
    return String.fromCodePoint(...codePoints);
  }

  return "🌍";
}
