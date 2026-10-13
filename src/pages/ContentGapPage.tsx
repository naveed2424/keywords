import React, { useState, useEffect } from 'react';
import { Split, Search, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { DifficultyBadge } from '../components/common/Badges';
import { apiService } from '../services/apiService';
import { ContentGapItem } from '../services/seoEngine';

export const ContentGapPage: React.FC = () => {
  const [yourDomain, setYourDomain] = useState('mycreatorblog.com');
  const [comp1, setComp1] = useState('hubspot.com');
  const [comp2, setComp2] = useState('buffer.com');
  const [loading, setLoading] = useState(false);
  const [gaps, setGaps] = useState<ContentGapItem[]>([]);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!comp1.trim()) return;

    setLoading(true);
    try {
      const results = await apiService.analyzeContentGap(yourDomain, [comp1, comp2].filter(Boolean));
      setGaps(results);
    } catch (err) {
      console.error('Content gap error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze();
  }, []);

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
            <span>Competitive Matrix &amp; SERP Gaps</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Content Gap Analyzer
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Enter your domain alongside leading niche competitors to identify keywords and topical clusters they rank for on Google Page 1 that your site has not yet covered.
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
                placeholder="Competitor 1 (required, e.g. ahrefs.com)"
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
              <input
                type="text"
                value={comp2}
                onChange={(e) => setComp2(e.target.value)}
                placeholder="Competitor 2 (optional, e.g. semrush.com)"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Split className="w-4 h-4" />}
              <span>Find Missing Content Opportunities</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading && (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">Evaluating keyword gaps against {comp1}...</p>
          </div>
        )}

        {!loading && gaps.length > 0 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Comparison: <strong>{yourDomain}</strong> vs <strong>{comp1}</strong>{comp2 ? `, ${comp2}` : ''}</span>
              <span className="text-emerald-700 font-semibold">{gaps.length} High-Yield Keyword Gaps Found</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100">
              {gaps.map((gap, idx) => (
                <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        Ranks #{gap.competitorPosition} on {gap.competitor}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {gap.intent}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{gap.keyword}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900">{gap.volume.toLocaleString()} /mo</div>
                      <div className="text-[11px] text-slate-400">Est. Traffic: ~{gap.potentialTraffic.toLocaleString()}</div>
                    </div>
                    <DifficultyBadge difficulty={gap.difficulty} />
                    <a
                      href={`/ai-article-writer?topic=${encodeURIComponent(gap.keyword)}`}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-xs whitespace-nowrap"
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
