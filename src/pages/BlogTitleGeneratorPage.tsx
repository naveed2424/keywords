import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, RefreshCw, Loader2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';

export const BlogTitleGeneratorPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQ = searchParams.get('q') || 'affiliate marketing';

  const [keyword, setKeyword] = useState(initialQ);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [titles, setTitles] = useState<Array<{ category: string; title: string; ctrScore: number }>>([
    { category: 'SEO', title: 'Affiliate Marketing: The Step-by-Step 2026 Blueprint', ctrScore: 94 },
    { category: 'SEO', title: 'How to Build an Affiliate Marketing Site That Ranks #1', ctrScore: 91 },
    { category: 'Curiosity', title: 'The Shocking Truth About Affiliate Marketing in 2026', ctrScore: 89 },
    { category: 'How-To', title: 'How to Make Your First $1,000 in Affiliate Commissions', ctrScore: 95 },
    { category: 'List', title: '15 High-Paying Affiliate Programs for Content Creators', ctrScore: 92 },
    { category: 'Comparison', title: 'Affiliate Marketing vs Dropshipping: Honest 2026 Test', ctrScore: 88 },
    { category: 'Beginner', title: 'Affiliate Marketing for Beginners: Everything You Need', ctrScore: 93 },
    { category: 'Expert', title: 'Advanced Conversion Optimization for Affiliate Bloggers', ctrScore: 87 },
    { category: 'Commercial', title: 'Best Affiliate Tracking Software (Tested & Ranked)', ctrScore: 90 },
    { category: 'High CTR', title: 'I Tested 20 Affiliate Strategies for 6 Months. Here is What Worked.', ctrScore: 97 },
  ]);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await apiService.generateTitles(keyword);
      if (res.titles && res.titles.length > 0) {
        setTitles(res.titles);
      }
    } catch (err) {
      console.error('Error generating titles:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = (titleText: string, idx: number) => {
    navigator.clipboard.writeText(titleText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`Blog Title Generator — 20 High-CTR Headlines for ${keyword}`}
        description="Generate 20 irresistible blog titles categorized by SEO, Curiosity, How-To, Listicle, and High-CTR formats."
        canonicalPath="/blog-title-generator"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High CTR Headline Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Blog Title Generator
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Enter your keyword or niche to generate 20 tested headline variations designed to capture clicks on Google search and social feeds.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword or topic..."
              className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>Generate Titles</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-3">
          {titles.map((t, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {t.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    CTR Score: {t.ctrScore}/100
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{t.title}</h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => copyTitle(t.title, idx)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
                >
                  {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                </button>

                <a
                  href={`/ai-article-writer?title=${encodeURIComponent(t.title)}&keyword=${encodeURIComponent(keyword)}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <span>Write Article</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
