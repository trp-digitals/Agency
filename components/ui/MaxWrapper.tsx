import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function MaxWrapper({ children, className }: MaxWrapperProps) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-20", className)}>
      {children}
    </div>
  );
}
