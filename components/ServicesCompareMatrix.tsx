"use client";

import { useState } from "react";

export default function ServicesCompareMatrix() {
  const [showCompareModal, setShowCompareModal] = useState(false);

  return (
    <div className="text-center mt-12">
      <button
        onClick={() => setShowCompareModal(!showCompareModal)}
        className="text-xs font-bold text-primary hover:underline cursor-pointer"
      >
        {showCompareModal ? "Hide Package Comparison Matrix ▲" : "Compare All Package Features Side-by-Side ▼"}
      </button>

      {showCompareModal && (
        <div className="mt-8 glass-card p-6 rounded-2xl border border-white/10 overflow-x-auto text-left fade-in">
          <table className="w-full text-left text-xs text-white">
            <thead>
              <tr className="border-b border-white/10 text-primary font-bold">
                <th className="p-3">Feature</th>
                <th className="p-3">Launchpad</th>
                <th className="p-3">Scaleup</th>
                <th className="p-3">Enterprise Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/70">
              <tr><td className="p-3 font-semibold text-white">Pages</td><td className="p-3">Up to 5</td><td className="p-3 text-primary font-bold">Up to 15</td><td className="p-3">20+</td></tr>
              <tr><td className="p-3 font-semibold text-white">Design</td><td className="p-3">Custom Responsive</td><td className="p-3 text-primary font-bold">Advanced UI/UX</td><td className="p-3">Custom Product Design</td></tr>
              <tr><td className="p-3 font-semibold text-white">CMS</td><td className="p-3">—</td><td className="p-3 text-primary font-bold">✓</td><td className="p-3">✓</td></tr>
              <tr><td className="p-3 font-semibold text-white">Integrations</td><td className="p-3">WhatsApp &amp; Forms</td><td className="p-3 text-primary font-bold">Advanced APIs</td><td className="p-3">Custom Workflows</td></tr>
              <tr><td className="p-3 font-semibold text-white">SEO</td><td className="p-3">Technical</td><td className="p-3 text-primary font-bold">Advanced</td><td className="p-3">Enterprise</td></tr>
              <tr><td className="p-3 font-semibold text-white">AI</td><td className="p-3">—</td><td className="p-3 text-primary font-bold">—</td><td className="p-3">✓</td></tr>
              <tr><td className="p-3 font-semibold text-white">Delivery</td><td className="p-3">2–4 Weeks</td><td className="p-3 text-primary font-bold">4–6 Weeks</td><td className="p-3">8–12 Weeks</td></tr>
              <tr><td className="p-3 font-semibold text-white">Support</td><td className="p-3">15 Days</td><td className="p-3 text-primary font-bold">30 Days</td><td className="p-3">Priority</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
