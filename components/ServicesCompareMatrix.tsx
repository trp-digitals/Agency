"use client";

import { useState } from "react";

export default function ServicesCompareMatrix() {
  const [showCompareModal, setShowCompareModal] = useState(false);

  return (
    <div className="text-center mt-12">
      <button
        onClick={() => setShowCompareModal(!showCompareModal)}
        className="font-mono text-xs font-medium text-primary hover:underline cursor-pointer"
      >
        {showCompareModal ? "Hide Package Comparison Matrix ▲" : "Compare All Package Features Side-by-Side ▼"}
      </button>

      {showCompareModal && (
        <div className="mt-8 glass-card p-6 rounded-2xl border border-white/10 overflow-x-auto text-left fade-in">
          <table className="w-full text-left text-xs text-white">
            <thead>
              <tr className="border-b border-white/10 text-primary font-mono font-semibold uppercase tracking-wider">
                <th className="p-3">Feature</th>
                <th className="p-3">Launchpad</th>
                <th className="p-3">Scaleup</th>
                <th className="p-3">Enterprise Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/70">
              <tr><td className="p-3 font-medium text-white">Pages</td><td className="p-3 font-normal">Up to 5</td><td className="p-3 text-primary font-semibold">Up to 15</td><td className="p-3 font-normal">20+</td></tr>
              <tr><td className="p-3 font-medium text-white">Design</td><td className="p-3 font-normal">Custom Responsive</td><td className="p-3 text-primary font-semibold">Advanced UI/UX</td><td className="p-3 font-normal">Custom Product Design</td></tr>
              <tr><td className="p-3 font-medium text-white">CMS</td><td className="p-3 font-normal">—</td><td className="p-3 text-primary font-semibold">✓</td><td className="p-3 font-normal">✓</td></tr>
              <tr><td className="p-3 font-medium text-white">Integrations</td><td className="p-3 font-normal">WhatsApp &amp; Forms</td><td className="p-3 text-primary font-semibold">Advanced APIs</td><td className="p-3 font-normal">Custom Workflows</td></tr>
              <tr><td className="p-3 font-medium text-white">SEO</td><td className="p-3 font-normal">Technical</td><td className="p-3 text-primary font-semibold">Advanced</td><td className="p-3 font-normal">Enterprise</td></tr>
              <tr><td className="p-3 font-medium text-white">AI</td><td className="p-3 font-normal">—</td><td className="p-3 text-primary font-semibold">—</td><td className="p-3 font-normal">✓</td></tr>
              <tr><td className="p-3 font-medium text-white">Delivery</td><td className="p-3 font-normal">2–4 Weeks</td><td className="p-3 text-primary font-semibold">4–6 Weeks</td><td className="p-3 font-normal">8–12 Weeks</td></tr>
              <tr><td className="p-3 font-medium text-white">Support</td><td className="p-3 font-normal">15 Days</td><td className="p-3 text-primary font-semibold">30 Days</td><td className="p-3 font-normal">Priority</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
