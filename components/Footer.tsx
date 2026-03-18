import MaxWrapper from "./ui/MaxWrapper";
import { Github, Twitter, Linkedin, Instagram, Code2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-background">
      <MaxWrapper>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-purple">
                <Code2 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">CodeCraftStudios</span>
            </Link>
            <p className="max-w-sm text-foreground/50 leading-relaxed mb-8">
              Empowering brands through cutting-edge technology and exceptional design. 
              Let's create something extraordinary together.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 hover:text-primary transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="flex flex-col gap-4 text-foreground/50">
              <li><Link href="#about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#work" className="hover:text-primary">Our Projects</Link></li>
              <li><Link href="#services" className="hover:text-primary">Services</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Contact</h4>
            <ul className="flex flex-col gap-4 text-foreground/50">
              <li>hello@codecraftstudios.com</li>
              <li>+1 (555) 000-1234</li>
              <li>123 Digital Square</li>
              <li>Innovation City, IC 94103</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/30">
          <p>© 2024 CodeCraftStudios. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground/60">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground/60">Terms of Service</Link>
          </div>
        </div>
      </MaxWrapper>
    </footer>
  );
}
