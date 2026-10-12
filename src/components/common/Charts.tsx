import React, { useState } from 'react';

/**
 * 12-Month Interactive Trend Sparkline
 */
export const TrendSparkline: React.FC<{
  data: number[];
  height?: number;
  showLabels?: boolean;
}> = ({ data = [50, 55, 60, 65, 70, 75, 80, 85, 90, 88, 94, 98], height = 60, showLabels = false }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const min = Math.min(...data, 0);
  const max = Math.max(...data, 100);
  const range = max - min || 1;

  const width = 240;
  const padding = 10;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * usableWidth;
    const y = height - padding - ((val - min) / range) * usableHeight;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${
    height - padding
  } Z`;

  return (
    <div className="relative inline-block w-full max-w-[280px]">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Base Area */}
        <path d={areaD} fill="url(#trendGradient)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {points.map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.x}
            cy={pt.y}
            r={hoveredIdx === idx ? 4.5 : 2}
            className={`transition-all ${
              hoveredIdx === idx ? 'fill-indigo-600 stroke-white stroke-2' : 'fill-indigo-500'
            }`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          />
        ))}
      </svg>

      {hoveredIdx !== null && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono shadow-xs pointer-events-none">
          {months[hoveredIdx]}: {data[hoveredIdx]}% popularity
        </div>
      )}

      {showLabels && (
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 px-1">
          <span>12 mo ago</span>
          <span>Current</span>
        </div>
      )}
    </div>
  );
};

/**
 * Circular Difficulty Gauge (0-100)
 */
export const DifficultyGauge: React.FC<{ score: number; size?: number }> = ({ score, size = 100 }) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  let strokeColor = '#10b981'; // emerald
  if (score >= 25 && score < 35) strokeColor = '#14b8a6'; // teal
  else if (score >= 35 && score < 50) strokeColor = '#f59e0b'; // amber
  else if (score >= 50 && score < 75) strokeColor = '#f97316'; // orange
  else if (score >= 75) strokeColor = '#ef4444'; // rose

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">{score}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">/100</span>
      </div>
    </div>
  );
};
