import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

/**
 * Custom 404 page — branded, on-theme, noindexed.
 * Next.js automatically returns a 404 HTTP status for this route.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 blur-[120px] rounded-full -z-10" />

      <div className="text-center px-6 py-24 max-w-2xl mx-auto">
        {/* Glitch 404 */}
        <div className="relative mb-8 select-none">
          <span
            aria-hidden="true"
            className="block text-[10rem] md:text-[14rem] font-black leading-none text-white/5 select-none pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            404
          </span>
          <span className="relative block text-[10rem] md:text-[14rem] font-black leading-none bg-gradient-to-br from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Label */}
        <p className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-6">
          Page Not Found
        </p>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          This page doesn&apos;t exist
        </h1>

        {/* Description */}
        <p className="text-lg text-white/40 mb-12 leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for may have been moved, renamed, or
          simply doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#0a0a0a] font-bold hover:bg-purple-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(192,132,252,0.4)]"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
