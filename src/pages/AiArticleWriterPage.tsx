import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Download,
  Clock,
  BookOpen,
  Share2,
  CheckCircle2,
  HelpCircle,
  Code,
  Sliders,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { ArticleDraft } from '../types/seo';
import { useWorkspace } from '../context/WorkspaceContext';

export const AiArticleWriterPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialTopic = searchParams.get('topic') || searchParams.get('keyword') || '';
  const initialTitle = searchParams.get('title') || '';

  const [topic, setTopic] = useState(initialTopic || 'Remote Work Ergonomics');
  const [title, setTitle] = useState(initialTitle);
  const [primaryKeyword, setPrimaryKeyword] = useState(initialTopic || 'remote work ergonomics');
  const [secondaryKeywords, setSecondaryKeywords] = useState('ergonomic desk setup, standing desk tips, posture at home');
  const [tone, setTone] = useState('Authoritative yet engaging');
  const [length, setLength] = useState('Comprehensive (2,000+ words)');
  const [audience, setAudience] = useState('Remote professionals & office workers');

  // Checkboxes
  const [includeFaq, setIncludeFaq] = useState(true);
  const [includeTable, setIncludeTable] = useState(true);
  const [includeKeyTakeaways, setIncludeKeyTakeaways] = useState(true);

  // Workflow steps: 1: Inputs/Brief -> 2: Review Outline -> 3: Full Draft
  const [step, setStep] = useState<1 | 2>(1);
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<ArticleDraft | null>(null);

  const [copied, setCopied] = useState(false);
  const { saveDraft } = useWorkspace();

  const handleCreateArticle = async () => {
    if (!topic.trim()) return;
    setGenerating(true);

    try {
      const generated = await apiService.generateArticle({
        topic,
        title: title || undefined,
        primaryKeyword,
        secondaryKeywords: secondaryKeywords.split(',').map((s) => s.trim()).filter(Boolean),
        tone,
        articleLength: length,
        audience,
        includeFaq,
        includeTable,
        includeKeyTakeaways,
      });

      setDraft(generated);
      saveDraft(generated);
      setStep(2);
    } catch (err) {
      console.error('Error generating article:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!draft) return;
    navigator.clipboard.writeText(draft.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    if (!draft) return;
    const blob = new Blob([draft.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${draft.slug || 'article'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="AI Article Writer — Create E-E-A-T Long-Form SEO Content"
        description="Generate publication-ready, deeply researched long-form articles with structured outlines, FAQ schema, and takeaways."
        canonicalPath="/ai-article-writer"
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              Flagship Content Suite
            </span>
            <span className="text-xs text-slate-400">• E-E-A-T Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Article Writer
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
            Create exhaustive, search-optimized articles designed for humans first. Includes automated briefs, structured Markdown, tables, key takeaways, and FAQ schema.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8 text-xs font-semibold">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              step === 1 ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            <span>1. Strategy &amp; Parameters</span>
          </button>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <button
            onClick={() => draft && setStep(2)}
            disabled={!draft}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              step === 2
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-400 border border-slate-200 disabled:opacity-50'
            }`}
          >
            <span>2. Full Article Draft &amp; Metadata</span>
          </button>
        </div>

        {/* STEP 1: FORM INPUTS */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Topic or Target Subject *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Best Email Marketing Strategies for Creators"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Article Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Leave empty for auto-generated high-CTR title"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Keyword
                </label>
                <input
                  type="text"
                  value={primaryKeyword}
                  onChange={(e) => setPrimaryKeyword(e.target.value)}
                  placeholder="e.g. email marketing strategies"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Secondary Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={secondaryKeywords}
                  onChange={(e) => setSecondaryKeywords(e.target.value)}
                  placeholder="newsletter growth, welcome sequence, email automation"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tone of Voice
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="Authoritative yet engaging">Authoritative yet engaging</option>
                  <option value="Conversational & Friendly">Conversational &amp; Friendly</option>
                  <option value="Data-Driven & Analytical">Data-Driven &amp; Analytical</option>
                  <option value="Step-by-Step Educational">Step-by-Step Educational</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Length
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="Standard Guide (1,200 words)">Standard Guide (1,200 words)</option>
                  <option value="Comprehensive (2,000+ words)">Comprehensive (2,000+ words)</option>
                  <option value="Ultimate Pillar Guide (3,000+ words)">Ultimate Pillar Guide (3,000+ words)</option>
                </select>
              </div>
            </div>

            {/* Quality toggles */}
            <div className="pt-4 border-t border-slate-100">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Included Editorial Elements
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeKeyTakeaways}
                    onChange={(e) => setIncludeKeyTakeaways(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span className="font-medium text-slate-800">Executive Takeaways Box</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTable}
                    onChange={(e) => setIncludeTable(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span className="font-medium text-slate-800">Comparison Data Table</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFaq}
                    onChange={(e) => setIncludeFaq(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span className="font-medium text-slate-800">FAQ Section with Schema</span>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Adheres to Google E-E-A-T search evaluator principles.
              </span>
              <button
                type="button"
                onClick={handleCreateArticle}
                disabled={generating || !topic.trim()}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm transition-all shadow-xs flex items-center gap-2 disabled:opacity-50"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{generating ? 'Drafting Article...' : 'Create Full Article'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DRAFT PREVIEW & METADATA */}
        {step === 2 && draft && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <strong>{draft.wordCount}</strong> words
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <strong>{draft.readingTimeMinutes}</strong> min read
                </span>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  E-E-A-T Ready
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>

                <a
                  href={`/content-optimizer?keyword=${encodeURIComponent(draft.primaryKeyword)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Open in Content Optimizer &rarr;</span>
                </a>
              </div>
            </div>

            {/* Metadata Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Search Engine Metadata Preview
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans">
                <div className="text-sm font-semibold text-indigo-700 hover:underline cursor-pointer">
                  {draft.metaTitle}
                </div>
                <div className="text-xs text-emerald-800 font-mono mt-0.5">
                  https://yourdomain.com/{draft.slug}
                </div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {draft.metaDescription}
                </div>
              </div>
            </div>

            {/* Rendered Article Body */}
            <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-xs prose prose-slate max-w-none text-slate-800 leading-relaxed">
              <div className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
                {draft.content}
              </div>
            </div>

            {/* Schema JSON-LD Section */}
            {draft.schemaJsonLd && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Article Schema.org JSON-LD
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(draft.schemaJsonLd);
                      alert('Schema copied!');
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Copy JSON-LD
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto">
                  {draft.schemaJsonLd}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
