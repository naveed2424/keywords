import React from 'react';
import { ExternalLink, Check, Star } from 'lucide-react';

export interface RecommendedToolProps {
  name: string;
  badge?: string;
  rating?: number;
  description: string;
  bestFor: string;
  pricing: string;
  features: string[];
  ctaText?: string;
  affiliateUrl: string;
  isPopular?: boolean;
}

export const RecommendedTool: React.FC<RecommendedToolProps> = ({
  name,
  badge = 'Recommended Partner',
  rating = 4.9,
  description,
  bestFor,
  pricing,
  features,
  ctaText = 'Visit Platform',
  affiliateUrl,
  isPopular = false,
}) => {
  return (
    <div
      className={`relative my-6 rounded-2xl border transition-all duration-200 bg-white p-6 ${
        isPopular ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/20' : 'border-slate-200 shadow-xs'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-semibold uppercase tracking-wider shadow-xs">
          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
          {badge}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-bold text-slate-900">{name}</h4>
            <div className="flex items-center text-xs font-semibold text-amber-500">
              <span>★ {rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">{description}</p>
        </div>

        <div className="flex flex-col sm:items-end">
          <span className="text-xs text-slate-400 font-medium">Starting at</span>
          <span className="text-lg font-bold text-slate-900">{pricing}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Best For</span>
          <p className="text-sm font-medium text-slate-800 mt-0.5">{bestFor}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Key Highlights</span>
          <ul className="mt-1 space-y-1">
            {features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400 italic">
          *Affiliate link: RankPilot may earn a referral fee at zero additional cost to you.
        </span>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-medium text-sm transition-colors shadow-xs"
        >
          <span>{ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
