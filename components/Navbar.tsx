"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import MaxWrapper from "./ui/MaxWrapper";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "./Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  // { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menu when screen size reaches md breakpoint (768px) or wider
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  if (pathname.startsWith("/trp-67.73")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-6"
        )}
      >
        <MaxWrapper className="flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <nav aria-label="Main Navigation" className="flex items-center gap-8 px-6 py-2 rounded-full glass border-white/5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={`${link.name} — TRP Digitals`}
                    className={cn(
                      "relative text-sm font-medium transition-colors hover:text-white",
                      isActive ? "text-white" : "text-foreground/50"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold neon-purple hover:scale-105 active:scale-95 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden touch-target w-12 h-12 flex items-center justify-center text-foreground hover:bg-white/5 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </MaxWrapper>
      </header>

      {/* Floating Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Floating Menu Card */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-20 left-4 right-4 max-w-md mx-auto z-50 md:hidden bg-[#0d0d12]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-primary/10 overflow-hidden flex flex-col gap-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-foreground/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center min-h-12 px-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200",
                          isActive
                            ? "text-primary bg-primary/15 border-l-4 border-primary pl-3 font-bold"
                            : "text-foreground/80 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-center flex items-center justify-center shadow-[0_0_25px_rgba(192,132,252,0.3)] hover:brightness-110 active:scale-95 transition-all"
                >
                  Get Started — Free Consult
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

