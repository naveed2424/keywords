import React, { useState } from 'react';
import { TrendingUp, Sparkles, ArrowUpRight, Search, Globe } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const TrendingKeywordsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d'>('7d');
  const [category, setCategory] = useState<string>('all');

  const trendingItems = [
    { keyword: 'AI video generation models', surge: '+240%', category: 'AI', volume: 49500, intent: 'informational' },
    { keyword: 'deep research agent workflow', surge: '+180%', category: 'Technology', volume: 32000, intent: 'informational' },
    { keyword: 'best high yield savings account 2026', surge: '+140%', category: 'Finance', volume: 74000, intent: 'commercial' },
    { keyword: 'sourdough starter feeding ratio', surge: '+115%', category: 'Food', volume: 22000, intent: 'informational' },
    { keyword: 'minimalist desk setup accessories', surge: '+95%', category: 'Design', volume: 18500, intent: 'commercial' },
    { keyword: 'remote work ergonomics checklist', surge: '+90%', category: 'Business', volume: 14200, intent: 'transactional' },
    { keyword: 'etsy digital downloads ideas', surge: '+85%', category: 'Ecommerce', volume: 29000, intent: 'commercial' },
    { keyword: 'cold plunge temperature guidelines', surge: '+80%', category: 'Health', volume: 16800, intent: 'informational' },
  ];

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="Trending Keywords — Real-Time Breakout Topics & Surges"
        description="Discover breakout search queries, trending keywords across 24h, 7d, and 30 days, and search interest spikes."
        canonicalPath="/trending"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Search Velocity &amp; Breakouts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trending Keywords
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Monitor search velocity spikes across technology, AI, finance, health, and ecommerce to publish ahead of competitive curves.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            {(['today', '7d', '30d'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  timeframe === t
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t === 'today' ? 'Past 24 Hours' : t === '7d' ? 'Past 7 Days' : 'Past 30 Days'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
            <span>Showing verified breakout search queries</span>
            <span>Refreshed daily</span>
          </div>

          <div className="divide-y divide-slate-100">
            {trendingItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400 w-6">#{idx + 1}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        {item.surge}
                      </span>
                    </div>
                    <a
                      href={`/keyword-explorer?q=${encodeURIComponent(item.keyword)}`}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                    >
                      {item.keyword}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="font-mono text-slate-500">
                    ~{item.volume.toLocaleString()} /mo
                  </span>
                  <a
                    href={`/ai-article-writer?topic=${encodeURIComponent(item.keyword)}`}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors"
                  >
                    Draft Post
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
