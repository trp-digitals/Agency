"use client";

import MaxWrapper from "./ui/MaxWrapper";
import { FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/trp-67.73")) {
    return null;
  }

  return (
    <footer id="site-footer" className="py-20 border-t border-white/5 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      <MaxWrapper>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 block w-fit">
              <Logo />
            </Link>
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              BUILD. <span className="text-secondary">LAUNCH.</span> GROW.
            </p>
            <p className="max-w-sm text-foreground/60 leading-relaxed text-sm mb-8">
              Digital solutions for businesses ready to build a stronger online presence.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/trp-digitals" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 hover:text-primary transition-all">
                <FaLinkedinIn size={18} />
              </a>
              <a href="https://www.instagram.com/trp.digitals" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 hover:text-primary transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="mailto:trpdigitals.dev@gmail.com" aria-label="Email" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 hover:text-primary transition-all">
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-white text-sm tracking-wider uppercase">Navigate</h3>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-col gap-3 text-sm text-foreground/60">
                <li><Link href="/" title="TRP Digitals Homepage" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/about" title="About TRP Digitals" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/services" title="TRP Digitals Services & Packages" className="hover:text-primary transition-colors">Services</Link></li>
                {/* <li><Link href="/careers" title="Careers at TRP Digitals" className="hover:text-primary transition-colors">Careers</Link></li> */}
                <li><Link href="/contact" title="Contact TRP Digitals" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm tracking-wider uppercase">Get in Touch</h4>
            <ul className="flex flex-col gap-3 text-sm text-foreground/60">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary shrink-0" size={15} />
                <a href="mailto:trpdigitals.dev@gmail.com" className="hover:text-primary transition-colors">
                  trpdigitals.dev@gmail.com
                </a>
              </li>
              <li>+91 9063851105</li>
              <li>Hyderabad, India</li>
              <li className="text-xs text-white/40 pt-2">Response SLA: Within 24 Hours</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-foreground/40 font-medium">
          <p>© 2026 TRP Digitals. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-foreground/60">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground/60">Terms of Service</Link>
          </div>
        </div>
      </MaxWrapper>
    </footer>
  );
}
