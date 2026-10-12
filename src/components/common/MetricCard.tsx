import React from 'react';
import { DataTransparencyTooltip } from './DataTransparencyTooltip';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendPositive?: boolean;
  explanation: string;
  sourceType?: 'AI Estimate' | 'Demo Data' | 'Live API';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  trend,
  trendPositive = true,
  explanation,
  sourceType = 'AI Estimate',
  icon,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <DataTransparencyTooltip label={label} explanation={explanation} sourceType={sourceType} />
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              trendPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subValue && <p className="mt-1.5 text-xs text-slate-500">{subValue}</p>}
    </div>
  );
};
