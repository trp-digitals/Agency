import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | TRP Digitals Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // Admin area has its own layout — no public Navbar or Footer
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#ededed" }}>
      {children}
    </div>
  );
}
