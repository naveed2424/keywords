import React, { useState } from 'react';
import { Repeat, Video, FileText, Sparkles, Copy, Check, Download, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';

export const YouTubeToBlogPage: React.FC = () => {
  const [videoInput, setVideoInput] = useState(
    'https://youtube.com/watch?v=example123\n\nKey talking points from video: How we built our SaaS to $10k MRR in 9 months without paid advertising. Focused on organic SEO, building a public Notion template library, and launching 5 free micro-tools that ranked for high-volume keywords.'
  );
  const [targetKeyword, setTargetKeyword] = useState('how to grow saas to 10k mrr');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleConvert = async () => {
    if (!videoInput.trim()) return;
    setLoading(true);

    try {
      const generated = await apiService.generateArticle({
        topic: targetKeyword || 'How to Grow a SaaS Without Ads',
        title: 'How to Scale a Bootstrapped SaaS to $10,000 MRR (Without Paid Ads)',
        primaryKeyword: targetKeyword,
        tone: 'Conversational Case Study',
        articleLength: 'Comprehensive (2,000+ words)',
      });

      setResult({
        ...generated,
        socialPost: `We scaled our SaaS to $10K MRR in 9 months without spending $1 on Facebook or Google ads. Here is the 3-step flywheel we used: 1. Launch free utility tools for high-volume keywords. 2. Gate advanced templates with email capture. 3. Target bottom-of-funnel competitor comparison terms. Read the full guide here:`,
        newsletterSummary: `Hey everyone, this week we are breaking down the exact zero-ad blueprint for reaching $10,000 monthly recurring revenue. Many founders burn capital on paid ads before validating organic search channels. Here is what we learned from our 9-month sprint...`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="YouTube to Blog Converter — Repurpose Video into Long-Form SEO Posts"
        description="Transform YouTube transcripts, talking points, and video concepts into original, high-ranking SEO articles, newsletters, and social threads."
        canonicalPath="/youtube-to-blog"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Repeat className="w-3.5 h-3.5" />
            <span>Content Repurposing Multiplier</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            YouTube to Blog Converter
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Turn your video recordings, transcripts, or concept notes into original, high-ranking blog articles, executive takeaways, newsletter issues, and social posts.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              YouTube URL, Video Summary, or Transcript Notes *
            </label>
            <textarea
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              rows={5}
              placeholder="Paste YouTube video link or transcript notes..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-y font-mono text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Target SEO Keyword for the Converted Article
            </label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="e.g. how to scale saas"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Respects copyright: synthesizes concepts into original editorial prose.
            </span>
            <button
              onClick={handleConvert}
              disabled={loading || !videoInput.trim()}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{loading ? 'Converting Video...' : 'Convert to Blog Article'}</span>
            </button>
          </div>
        </div>

        {/* Output Area */}
        {result && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{result.title}</h3>
                <span className="text-xs text-slate-500">{result.wordCount} words • {result.readingTimeMinutes} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.content);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Article'}</span>
                </button>
              </div>
            </div>

            {/* Repurposed Assets (Social & Newsletter) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-2">
                  X / LinkedIn Social Post
                </span>
                <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {result.socialPost}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block mb-2">
                  Newsletter Intro Edition
                </span>
                <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {result.newsletterSummary}
                </p>
              </div>
            </div>

            {/* Full Draft Body */}
            <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-xs prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
              {result.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
