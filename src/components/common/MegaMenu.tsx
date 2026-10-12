import React from 'react';
import {
  Search,
  BarChart2,
  HelpCircle,
  Network,
  Layers,
  Split,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
  ArrowRight,
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchMegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-white border-b border-slate-200/90 shadow-2xl py-8 px-6 lg:px-12 z-40 animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* COLUMN 1 — KEYWORDS */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Search className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Keywords</h4>
          </div>
          <ul className="space-y-1">
            <li>
              <a
                href="/keyword-explorer"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 flex items-center gap-1.5">
                    <span>Keyword Explorer</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700">Flagship</span>
                  </div>
                  <div className="text-xs text-slate-500">Volume, difficulty, intent, & opportunity score</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/keyword-difficulty"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">Keyword Difficulty</div>
                  <div className="text-xs text-slate-500">Analyze why a keyword is hard to rank for</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/keyword-clustering"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">Keyword Clustering</div>
                  <div className="text-xs text-slate-500">Group terms into topical authority hubs</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/trending"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">Keyword Trends</div>
                  <div className="text-xs text-slate-500">Breakout topics across 24h, 7d, and 30 days</div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 2 — COMPETITION */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <BarChart2 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Competition</h4>
          </div>
          <ul className="space-y-1">
            <li>
              <a
                href="/serp-analyzer"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600">SERP Analyzer</div>
                  <div className="text-xs text-slate-500">Inspect Page 1 features and competitor weaknesses</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/content-gap"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600">Content Gap</div>
                  <div className="text-xs text-slate-500">Find keywords competitors rank for that you lack</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/traffic-estimator"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600">Traffic Estimator</div>
                  <div className="text-xs text-slate-500">Organic visitors & domain traffic models</div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 3 — DISCOVERY */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Discovery</h4>
          </div>
          <ul className="space-y-1">
            <li>
              <a
                href="/questions"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-purple-600">Question Finder</div>
                  <div className="text-xs text-slate-500">People Also Ask (How, What, Why, Can)</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/blog-idea-generator"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-purple-600">Blog Idea Generator</div>
                  <div className="text-xs text-slate-500">Evergreen and high-demand topics for your niche</div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/youtube-keyword-tool"
                onClick={onClose}
                className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800 group-hover:text-purple-600">YouTube Keyword Tool</div>
                  <div className="text-xs text-slate-500">Video searches, hooks, descriptions & tags</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mega Menu Footer Banner */}
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Every tool works free without creating an account.</span>
        </div>
        <a
          href="/tools"
          onClick={onClose}
          className="font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
        >
          <span>Browse all 35+ tools directory</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
