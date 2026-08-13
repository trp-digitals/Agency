import { notFound } from "next/navigation";
// import CareersClient from "./CareersClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | TRP Digitals",
  description: "Join TRP Digitals and work on real digital projects across development, design, marketing, analytics, and creative solutions.",
};

export default function CareersPage() {
  // Page disabled - return 404
  notFound();
  // return <CareersClient />;
}
