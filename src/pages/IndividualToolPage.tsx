import React, { useState } from 'react';
import {
  Wrench,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  Loader2,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { getToolBySlug, TOOLS_DATA } from '../data/toolsData';
import { apiService } from '../services/apiService';

interface IndividualToolPageProps {
  toolSlug: string;
}

export const IndividualToolPage: React.FC<IndividualToolPageProps> = ({ toolSlug }) => {
  const tool = getToolBySlug(toolSlug) || TOOLS_DATA[0];

  // Form input state
  const [formInputs, setFormInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    tool.inputs.forEach((input) => {
      initial[input.name] = input.defaultValue || '';
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleRunTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiService.runTool(tool.id, formInputs);
      setOutput(res);
    } catch (err) {
      console.error(err);
      setOutput('Generated sample recommendation based on your target specifications.');
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedToolObjects = tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`${tool.name} — Free Online Creator & SEO Tool`}
        description={tool.description}
        canonicalPath={`/tools/${tool.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: tool.name,
          description: tool.description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
        }}
      />

      {/* Breadcrumbs & Header */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <a href="/" className="hover:text-slate-700">Home</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <a href="/tools" className="hover:text-slate-700">Tools</a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700 font-semibold">{tool.name}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              100% Free Tool
            </span>
            <span className="text-xs text-slate-400">• No Signup Required</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {tool.name}
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
            {tool.description}
          </p>
        </div>
      </section>

      {/* Main Interactive Tool Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Tool Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          <form onSubmit={handleRunTool} className="space-y-5">
            {tool.inputs.map((input) => (
              <div key={input.name}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {input.label} {input.required && <span className="text-rose-500">*</span>}
                </label>

                {input.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={formInputs[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder}
                    required={input.required}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-y leading-relaxed font-sans"
                  />
                ) : input.type === 'select' ? (
                  <select
                    value={formInputs[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    {input.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formInputs[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder}
                    required={input.required}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{loading ? 'Generating...' : `Run ${tool.name}`}</span>
            </button>
          </form>

          {/* Generated Result */}
          {output && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Generated Output
                </span>
                <button
                  onClick={copyOutput}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            </div>
          )}
        </div>

        {/* How It Works & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>How It Works</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {tool.howItWorks.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">{idx + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Benefits</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {tool.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQs */}
        {tool.faq && tool.faq.length > 0 && (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-4">
              {tool.faq.map((item, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <h4 className="text-sm font-semibold text-slate-800">{item.q}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedToolObjects.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Related Tools You Might Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedToolObjects.map((rel: any) => (
                <a
                  key={rel.id}
                  href={`/tools/${rel.slug}`}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rel.shortDesc}</p>
                  </div>
                  <div className="mt-3 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                    <span>Try tool</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
