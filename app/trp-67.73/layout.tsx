"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Mail, 
  Menu, 
  X, 
  LogOut,
  Sparkles
} from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Overview", href: "/trp-67.73", icon: LayoutDashboard },
  { name: "Analytics", href: "/trp-67.73/analytics", icon: TrendingUp },
  { name: "Applications", href: "/trp-67.73/applications", icon: Users },
  { name: "Contacts", href: "/trp-67.73/contacts", icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const isLoginPage = pathname === "/trp-67.73/login";

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Auth session check
  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    fetch("/api/admin/overview")
      .then((res) => {
        if (res.status === 401) {
          setAuthorized(false);
          router.push("/trp-67.73/login");
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
        setAuthorized(true);
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
      router.push("/");
    }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between py-8 px-6 bg-[#09090b]/95 backdrop-blur-md border-r border-white/5 select-none">
      {/* Top Section */}
      <div className="space-y-8">
        {/* Brand Header */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo />
          </Link>
          <div className="pl-1 pt-1">
            <p className="text-xs font-black tracking-[0.2em] text-primary uppercase">
              TRP DIGITALS
            </p>
            <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
              ADMIN CONSOLE
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1.5" aria-label="Admin Navigation">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            // Exact match for root Overview, startsWith for others to handle sub-details
            const isActive = link.href === "/trp-67.73" 
              ? pathname === "/trp-67.73" 
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group",
                  isActive
                    ? "text-white bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(192,132,252,0.08)]"
                    : "text-foreground/50 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon 
                  className={cn(
                    "w-4.5 h-4.5 transition-colors duration-300",
                    isActive ? "text-primary" : "text-foreground/40 group-hover:text-white"
                  )} 
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="space-y-4 pt-6 border-t border-white/5">
        <div className="px-1">
          <p className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-1">
            LOGGED IN AS
          </p>
          <p className="text-xs font-bold text-white/80 truncate" title="trpdigitals.dev@gmail.com">
            trpdigitals.dev@gmail.com
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent transition-all duration-300 w-full text-left cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Exit Console</span>
        </button>
      </div>
    </div>
  );

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#070709] text-foreground flex items-center justify-center font-sans antialiased">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-white/60">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (authorized === false) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#070709] text-foreground font-sans antialiased flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[315px] shrink-0 h-screen sticky top-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 z-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="text-[10px] font-black tracking-widest text-primary uppercase leading-none">
              TRP
            </p>
            <p className="text-[8px] font-bold tracking-widest text-white/40 uppercase">
              CONSOLE
            </p>
          </div>
        </div>

        <button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-foreground hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          {/* Drawer Sheet */}
          <div className="relative w-4/5 max-w-xs h-full z-50">
            <SidebarContent />
            {/* Close trigger inside panel */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-4 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-foreground hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full relative z-10 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
