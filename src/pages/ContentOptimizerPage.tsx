import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders,
  Sparkles,
  BarChart2,
  FileText,
  Loader2,
  ArrowRight,
  Copy,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { ContentOptimizationReport } from '../types/seo';

export const ContentOptimizerPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialKeyword = searchParams.get('keyword') || 'email marketing';

  const [targetKeyword, setTargetKeyword] = useState(initialKeyword);
  const [content, setContent] = useState(
    `# The Complete Guide to Email Marketing\n\nEmail marketing is one of the highest-ROI growth channels available to modern businesses and creators.\n\n## 1. Why Email Marketing Still Outperforms Social Media\n\nAlgorithms change, but your subscriber list belongs to you. In this guide, we break down how to launch, nurture, and monetize an email audience.\n\n## 2. Choosing the Right Email Platform\n\nEvaluate deliverability rates, automation capabilities, and ease of use before committing.`
  );
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ContentOptimizationReport | null>(null);

  const handleRunOptimizer = async () => {
    if (!content.trim() || !targetKeyword.trim()) return;
    setLoading(true);

    try {
      const res = await apiService.optimizeContent(content, targetKeyword);
      setReport(res);
    } catch (err) {
      console.error('Optimizer error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRunOptimizer();
  }, []);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="SEO Content Optimizer — Score Your Article Against Search Intent"
        description="Audit your content for heading structure, keyword density, semantic entities, and readability with our real-time optimizer."
        canonicalPath="/content-optimizer"
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
              On-Page Audit Tool
            </span>
            <span className="text-xs text-slate-400">• Real-Time Optimization Score</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SEO Content Optimizer
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Paste your article draft and target keyword. We evaluate structural headings, readability grade, topical gaps, and semantic entity coverage.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Editor / Input Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Target Keyword *
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g. email marketing strategies"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Article Draft (Text or Markdown) *
                  </label>
                  <span className="text-xs text-slate-400 font-mono">
                    {content.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  placeholder="Paste your full article text or markdown here..."
                  className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-mono leading-relaxed focus:outline-none focus:border-indigo-600 focus:bg-white resize-y"
                />
              </div>

              <button
                type="button"
                onClick={handleRunOptimizer}
                disabled={loading || !content.trim() || !targetKeyword.trim()}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{loading ? 'Analyzing Content...' : 'Run Content Audit'}</span>
              </button>
            </div>
          </div>

          {/* Right Score & Audit Report Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {report && (
              <>
                {/* Score Summary Box */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Content Optimization Score
                  </span>

                  <div className="my-4 flex items-center justify-center">
                    <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full border-8 border-indigo-100">
                      <span className="text-4xl font-black text-indigo-600 tracking-tight">
                        {report.score}
                      </span>
                      <span className="absolute -bottom-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                        / 100
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Proprietary benchmark evaluating on-page density, structure, and intent match. Not an official Google metric.
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Density</span>
                      <strong className="text-slate-800">{report.keywordDensity}%</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Readability</span>
                      <strong className="text-slate-800">{report.readingGrade.split(' ')[0]}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Headings</span>
                      <strong className="text-slate-800">
                        {report.headingCounts.h2} H2s
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Audit Checklist */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Structural Audit Checklist
                  </h4>
                  {report.checks.map((check, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-slate-100 flex items-start gap-2.5 text-xs"
                    >
                      {check.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-900">{check.title}</div>
                        <div className="text-slate-500 mt-0.5">{check.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Missing Entities & Topical Gaps */}
                {report.topicalGaps && report.topicalGaps.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Topical Gaps Competitors Cover
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">
                      Add sections or bullet points addressing these concepts to improve depth:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {report.topicalGaps.map((gap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
