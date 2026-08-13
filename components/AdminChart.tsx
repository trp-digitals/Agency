"use client";

import { useState, useRef, useEffect } from "react";
import { ChartPoint } from "@/app/trp-67.73/types";

interface AdminChartProps {
  data: ChartPoint[];
}

export default function AdminChart({ data }: AdminChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  if (data.length === 0) return null;

  // Chart Dimensions
  const width = 600;
  const height = 250;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  // Calculate scales
  const maxVal = Math.max(...data.map(d => Math.max(d.views, d.unique)), 10) * 1.15; // 15% headroom
  const minVal = 0;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Map data to SVG coordinate points
  const pointsViews = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = height - paddingBottom - ((d.views - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, val: d.views, label: d.label };
  });

  const pointsUnique = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = height - paddingBottom - ((d.unique - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, val: d.unique, label: d.label };
  });

  // Calculate Bézier spline paths
  const getBezierPath = (pts: typeof pointsViews) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 3;
      const cp1y = curr.y;
      const cp2x = curr.x + (2 * (next.x - curr.x)) / 3;
      const cp2y = next.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const pathViews = getBezierPath(pointsViews);
  const pathUnique = getBezierPath(pointsUnique);

  // Closed paths for area gradients
  const fillPathViews = ptsToClosedArea(pointsViews);
  const fillPathUnique = ptsToClosedArea(pointsUnique);

  function ptsToClosedArea(pts: typeof pointsViews) {
    if (pts.length === 0) return "";
    const baselineY = height - paddingBottom;
    const bezierPath = getBezierPath(pts);
    return `${bezierPath} L ${pts[pts.length - 1].x} ${baselineY} L ${pts[0].x} ${baselineY} Z`;
  }

  // Handle cursor tracking for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouseX to SVG coordinate space
    const svgX = (mouseX / rect.width) * width;

    // Find nearest point
    let nearestIdx = 0;
    let minDiff = Infinity;
    pointsViews.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = idx;
      }
    });

    setHoveredIdx(nearestIdx);

    // Calculate tooltip coordinates inside CSS relative parent
    const targetX = (pointsViews[nearestIdx].x / width) * rect.width;
    const targetY = (pointsViews[nearestIdx].y / height) * rect.height;

    setTooltipPos({
      x: targetX,
      y: targetY - 70, // Float above point
    });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  // Generate grid values for Y-axis
  const gridLinesCount = 4;
  const gridLines = Array.from({ length: gridLinesCount }).map((_, idx) => {
    const ratio = idx / (gridLinesCount - 1);
    const value = Math.round(maxVal - ratio * (maxVal - minVal));
    const y = paddingTop + ratio * chartHeight;
    return { y, value };
  });

  return (
    <div className="relative w-full" ref={containerRef}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-visible cursor-crosshair select-none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.00" />
          </linearGradient>
          <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((line, idx) => (
          <g key={idx}>
            <line
              x1={paddingLeft}
              y1={line.y}
              x2={width - paddingRight}
              y2={line.y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4"
            />
            <text
              x={paddingLeft - 10}
              y={line.y + 4}
              textAnchor="end"
              className="text-[10px] fill-white/40 font-bold font-mono"
            >
              {line.value}
            </text>
          </g>
        ))}

        {/* Closed Gradient Fills */}
        {fillPathViews && (
          <path d={fillPathViews} fill="url(#viewsGradient)" />
        )}
        {fillPathUnique && (
          <path d={fillPathUnique} fill="url(#uniqueGradient)" />
        )}

        {/* Colored Curves */}
        {pathViews && (
          <path
            d={pathViews}
            fill="none"
            stroke="#c084fc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
        {pathUnique && (
          <path
            d={pathUnique}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* X-Axis labels */}
        {data.map((d, i) => {
          const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
          return (
            <text
              key={i}
              x={x}
              y={height - paddingBottom + 20}
              textAnchor="middle"
              className="text-[10px] fill-white/40 font-bold uppercase tracking-wider"
            >
              {d.label}
            </text>
          );
        })}

        {/* Hover elements (Vertical guide line and dots) */}
        {hoveredIdx !== null && (
          <g>
            <line
              x1={pointsViews[hoveredIdx].x}
              y1={paddingTop}
              x2={pointsViews[hoveredIdx].x}
              y2={height - paddingBottom}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeDasharray="3"
            />
            {/* Views Point indicator */}
            <circle
              cx={pointsViews[hoveredIdx].x}
              cy={pointsViews[hoveredIdx].y}
              r="5"
              fill="#c084fc"
              stroke="#09090b"
              strokeWidth="2"
            />
            <circle
              cx={pointsViews[hoveredIdx].x}
              cy={pointsViews[hoveredIdx].y}
              r="10"
              fill="#c084fc"
              fillOpacity="0.2"
            />
            {/* Unique Point indicator */}
            <circle
              cx={pointsUnique[hoveredIdx].x}
              cy={pointsUnique[hoveredIdx].y}
              r="4.5"
              fill="#3b82f6"
              stroke="#09090b"
              strokeWidth="2"
            />
            <circle
              cx={pointsUnique[hoveredIdx].x}
              cy={pointsUnique[hoveredIdx].y}
              r="9"
              fill="#3b82f6"
              fillOpacity="0.2"
            />
          </g>
        )}
      </svg>

      {/* Floating HTML HTML Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-10 p-3 bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl flex flex-col gap-1 w-40 pointer-events-none transition-all duration-100 ease-out"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translateX(-50%)",
          }}
        >
          <p className="text-[10px] font-black text-white/50 uppercase tracking-widest border-b border-white/5 pb-1 mb-1">
            {data[hoveredIdx].label} telemetry
          </p>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Views:
            </span>
            <span className="font-mono font-black text-white">{data[hoveredIdx].views}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Unique:
            </span>
            <span className="font-mono font-black text-white">{data[hoveredIdx].unique}</span>
          </div>
        </div>
      )}
    </div>
  );
}
