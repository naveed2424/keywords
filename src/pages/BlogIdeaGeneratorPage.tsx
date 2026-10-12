import React, { useState } from 'react';
import { Lightbulb, Sparkles, ArrowRight, Copy, Check, Loader2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';

export const BlogIdeaGeneratorPage: React.FC = () => {
  const [niche, setNiche] = useState('personal finance');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [ideas, setIdeas] = useState([
    { type: 'Evergreen Pillar', title: 'The Complete Guide to Budgeting for Beginners (Step-by-Step)', angle: 'Foundational 3,000-word tutorial with free printable budget template' },
    { type: 'Commercial Review', title: 'Top 7 High-Yield Savings Accounts Tested & Ranked', angle: 'Comparison table analyzing APY, minimum deposit, and FDIC protection' },
    { type: 'Comparison Teardown', title: 'Roth IRA vs Traditional IRA: Which Builds More Wealth?', angle: 'Clear mathematical breakdown comparing tax implications' },
    { type: 'Listicle & Hacks', title: '15 Frugal Living Habits That Saved Us $12,000 in One Year', angle: 'Relatable first-hand case study with itemized expense cuts' },
    { type: 'Beginner Roadmap', title: 'How to Invest Your First $1,000 in the Stock Market', angle: 'Index funds vs ETFs for first-time investors with low risk tolerance' },
    { type: 'Troubleshooting / FAQ', title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck', angle: 'Micro-savings strategies, emergency budgets, and debt reduction order' },
  ]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;
    setLoading(true);

    try {
      const res = await apiService.researchKeyword(niche);
      if (res && res.contentIdeas && res.contentIdeas.length > 0) {
        setIdeas(
          res.contentIdeas.map((i) => ({
            type: i.category,
            title: i.title,
            angle: i.suggestedAngle,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`Blog Idea Generator — High-Demand Content Topics for ${niche}`}
        description="Never run out of blog post ideas. Generate evergreen guides, comparison reviews, case studies, and tutorials for your niche."
        canonicalPath="/blog-idea-generator"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Content Strategy Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Blog Idea Generator
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Enter your niche or industry to generate categorized article topics, comparison teardowns, and high-converting affiliate reviews.
          </p>

          <form onSubmit={handleGenerate} className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Enter your niche (e.g. coffee brewing, web design)..."
              className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate Ideas</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
        {ideas.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 inline-block mb-1">
                {item.type}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{item.angle}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(item.title);
                  setCopiedIdx(idx);
                  setTimeout(() => setCopiedIdx(null), 2000);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                {copiedIdx === idx ? 'Copied' : 'Copy'}
              </button>

              <a
                href={`/ai-article-writer?title=${encodeURIComponent(item.title)}&keyword=${encodeURIComponent(niche)}`}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
              >
                <span>Write Draft</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
