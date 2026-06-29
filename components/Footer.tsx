import MaxWrapper from "./ui/MaxWrapper";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-background">
      <MaxWrapper>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-6 block w-fit">
              <Logo />
            </Link>
            <p className="max-w-sm text-foreground/50 leading-relaxed mb-8">
              Empowering brands through cutting-edge technology and exceptional design. 
              Let's create something extraordinary together.
            </p>
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:text-primary transition-all">
                <FaLinkedinIn size={18} />
              </a>
              <a href="https://www.instagram.com/trp.digitals" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:text-primary transition-all">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="flex flex-col gap-4 text-foreground/50">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Our Projects</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Contact</h4>
            <ul className="flex flex-col gap-4 text-foreground/50">
              <li>trpdigitals.dev@gmail.com</li>
              <li>+91 9063851105</li>
              <li>Hyderabad</li>
              <li>India</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-foreground/40 font-medium">
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
