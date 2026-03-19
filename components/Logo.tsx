"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center group shrink-0", className)}>
      {showText && (
        <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-500">
          TRP<span className="text-primary ml-1 group-hover:text-white transition-colors duration-500">DIGITALS</span>
        </span>
      )}
    </div>
  );
}
