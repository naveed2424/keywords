import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  label: string;
  explanation: string;
  sourceType?: 'AI Estimate' | 'Demo Data' | 'Live API';
}

export const DataTransparencyTooltip: React.FC<TooltipProps> = ({
  label,
  explanation,
  sourceType = 'AI Estimate',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center gap-1 group">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
        aria-label={`Info about ${label}`}
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-slate-100 rounded-lg shadow-xl text-xs pointer-events-none">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-white">{label}</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">
              {sourceType}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">{explanation}</p>
          <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            Proprietary heuristic estimate. Not an official Google metric.
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
