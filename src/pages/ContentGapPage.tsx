import React, { useState } from 'react';
import { Split, Search, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { DifficultyBadge } from '../components/common/Badges';

export const ContentGapPage: React.FC = () => {
  const [yourDomain, setYourDomain] = useState('mycreatorblog.com');
  const [comp1, setComp1] = useState('hubspot.com');
  const [comp2, setComp2] = useState('buffer.com');
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  const missingOpportunities = [
    { keyword: 'social media audit template free', volume: 8900, difficulty: 24, competitor: 'buffer.com' },
    { keyword: 'b2b email marketing benchmarks 2026', volume: 6400, difficulty: 31, competitor: 'hubspot.com' },
    { keyword: 'tiktok content calendar notion', volume: 5200, difficulty: 19, competitor: 'buffer.com' },
    { keyword: 'inbound marketing lead scoring checklist', volume: 4100, difficulty: 28, competitor: 'hubspot.com' },
    { keyword: 'newsletter sponsorship rate card template', volume: 3800, difficulty: 21, competitor: 'buffer.com' },
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 600);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="Content Gap Analyzer — Find Keywords Competitors Rank For That You Miss"
        description="Compare your domain against up to 3 competitors to uncover missing topical clusters and high-value ranking openings."
        canonicalPath="/content-gap"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Split className="w-3.5 h-3.5" />
            <span>Competitive Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Content Gap Analyzer
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Enter your domain alongside leading niche competitors to identify keywords and topical clusters they rank for that your site has not yet covered.
          </p>

          <form onSubmit={handleAnalyze} className="mt-6 max-w-xl mx-auto space-y-3">
            <input
              type="text"
              value={yourDomain}
              onChange={(e) => setYourDomain(e.target.value)}
              placeholder="Your domain (e.g. yoursite.com)"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={comp1}
                onChange={(e) => setComp1(e.target.value)}
                placeholder="Competitor 1 (required)"
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
              <input
                type="text"
                value={comp2}
                onChange={(e) => setComp2(e.target.value)}
                placeholder="Competitor 2 (optional)"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Split className="w-4 h-4" />}
              <span>Find Missing Content Opportunities</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {analyzed && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Comparison: <strong>{yourDomain}</strong> vs <strong>{comp1}</strong>, <strong>{comp2}</strong></span>
              <span className="text-emerald-700 font-semibold">{missingOpportunities.length} High-Yield Gaps</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100">
              {missingOpportunities.map((gap, idx) => (
                <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 mb-1 inline-block">
                      Ranks on {gap.competitor}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{gap.keyword}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-mono text-slate-500">{gap.volume.toLocaleString()} /mo</span>
                    <DifficultyBadge difficulty={gap.difficulty} />
                    <a
                      href={`/ai-article-writer?topic=${encodeURIComponent(gap.keyword)}`}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-xs"
                    >
                      Fill Gap
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
