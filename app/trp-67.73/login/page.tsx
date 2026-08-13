"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Successful login
      router.push("/trp-67.73");
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070709] text-foreground flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background blur mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center">
          <Logo />
          <div className="mt-4">
            <p className="text-xs font-black tracking-[0.2em] text-primary uppercase">
              TRP DIGITALS
            </p>
            <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase mt-0.5">
              ADMIN CONSOLE
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-primary/20 relative shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/30 focus:border-primary focus:outline-none text-sm transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cta-primary w-full py-3.5 rounded-full text-sm font-bold text-center flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 cursor-pointer mt-6"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
