const services = [
  {
    title: "SAAS & CUSTOM",
    subtitle: "Digital Platforms",
    angle: -90,
    badgePos: "left-1/2 top-[23.75%] -translate-x-1/2 -translate-y-[calc(100%+10px)] text-center",
  },
  {
    title: "E-COMMERCE",
    subtitle: "Online Stores",
    angle: -30,
    badgePos: "left-[72.75%] top-[36.875%] translate-x-2.5 min-[400px]:translate-x-3.5 -translate-y-1/2 text-left",
  },
  {
    title: "AI & AUTOMATION",
    subtitle: "AI-Powered Workflows",
    angle: 30,
    badgePos: "left-[72.75%] top-[63.125%] translate-x-2.5 min-[400px]:translate-x-3.5 -translate-y-1/2 text-left",
  },
  {
    title: "UI/UX & PRODUCT",
    subtitle: "Design & Prototypes",
    angle: 90,
    badgePos: "left-1/2 top-[76.25%] -translate-x-1/2 translate-y-2.5 min-[400px]:translate-y-3.5 text-center",
  },
  {
    title: "WEB & DIGITAL",
    subtitle: "Websites & WebApps",
    angle: 150,
    badgePos: "left-[27.25%] top-[63.125%] -translate-x-[calc(100%+10px)] min-[400px]:-translate-x-[calc(100%+14px)] -translate-y-1/2 text-right",
  },
  {
    title: "MOBILE APPS",
    subtitle: "Android & iOS Apps",
    angle: 210,
    badgePos: "left-[27.25%] top-[36.875%] -translate-x-[calc(100%+10px)] min-[400px]:-translate-x-[calc(100%+14px)] -translate-y-1/2 text-right",
  },
];

const round = (num: number) => Number(num.toFixed(4));

export default function HeroNetworkDiagram() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-85 min-[400px]:max-w-97.5 sm:max-w-xl lg:max-w-2xl mx-auto aspect-square flex items-center justify-center px-1">
        {/* Background Radial Glow */}
        <div
          className="absolute inset-0 bg-linear-to-r from-primary/15 via-secondary/15 to-accent/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* SVG Container */}
        <svg
          className="w-full h-full text-white overflow-visible select-none"
          viewBox="0 0 800 800"
          role="img"
          aria-label="TRP Digitals Core Services Network Diagram: Web & Digital, UI/UX & Product, Mobile App Development, SaaS & Custom Platforms, E-Commerce Solutions, AI & Business Automation"
        >
          <defs>
            <radialGradient id="trp-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="line-purple-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient Ring Circles */}
          <g aria-hidden="true">
            <circle cx="400" cy="400" r="90" fill="none" stroke="rgba(192, 132, 252, 0.25)" strokeWidth="1" />
            <circle cx="400" cy="400" r="150" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="400" cy="400" r="210" fill="none" stroke="rgba(192, 132, 252, 0.22)" strokeWidth="1.2" />
            <circle cx="400" cy="400" r="275" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="3 5" />
          </g>

          {/* Outer Hub Spokes & Nodes */}
          {services.map((svc, i) => {
            const rad = (svc.angle * Math.PI) / 180;
            const r = 210;
            const x = round(400 + r * Math.cos(rad));
            const y = round(400 + r * Math.sin(rad));

            return (
              <g key={i} className="group cursor-pointer">
                {/* Connecting Line */}
                <line
                  x1="400"
                  y1="400"
                  x2={x}
                  y2={y}
                  stroke="url(#line-purple-blue)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="transition-all duration-300 group-hover:stroke-primary group-hover:stroke-width-2"
                  aria-hidden="true"
                />
                {/* Outer Node Outer Ring Glow */}
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill="#0c0c12"
                  stroke="#c084fc"
                  strokeWidth="1.5"
                  className="transition-all duration-300 group-hover:scale-125"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  filter="url(#glow)"
                />
                <circle cx={x} cy={y} r="6" fill="#3b82f6" aria-hidden="true" className="transition-transform duration-300 group-hover:scale-125" />
                <circle cx={x} cy={y} r="2" fill="#ffffff" aria-hidden="true" />
              </g>
            );
          })}

          {/* Center Hub */}
          <circle cx="400" cy="400" r="80" fill="url(#trp-center-glow)" aria-hidden="true" />
          <circle cx="400" cy="400" r="58" fill="#0c0c12" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="2" aria-hidden="true" />
        </svg>

        {/* Central Brand Lockup */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center z-10">
          <span className="text-lg min-[400px]:text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]">
            TRP
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-gradient uppercase">
            DIGITALS
          </span>
        </div>

        {/* Floating Service Labels overlay - Positioned outward around node dots */}
        {services.map((svc, i) => (
          <div
            key={i}
            className={`absolute z-20 flex flex-col pointer-events-auto cursor-pointer group ${svc.badgePos}`}
          >
            <div className="glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl border border-primary/30 bg-[#0c0c14]/90 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]">
              <p className="text-[10.5px] sm:text-xs font-semibold tracking-normal text-white whitespace-nowrap">
                {svc.title}
              </p>
              <p className="text-[10px] sm:text-[11px] font-normal text-white/70 whitespace-nowrap">
                {svc.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
