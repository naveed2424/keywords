import React, { useState, useEffect } from 'react';
import { Layers, Search, AlertTriangle, CheckCircle, ExternalLink, Loader2, Sparkles, HelpCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { SerpAnalysis } from '../types/seo';

export const SerpAnalyzerPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQ = searchParams.get('q') || 'best ergonomic office chair';
  const initialCountry = searchParams.get('country') || 'United States';

  const [query, setQuery] = useState(initialQ);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SerpAnalysis | null>(null);

  const handleAnalyze = async (termToUse?: string, countryToUse?: string) => {
    const term = (termToUse || query).trim();
    if (!term) return;
    const country = countryToUse || selectedCountry;

    setLoading(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('q', term);
      url.searchParams.set('country', country);
      window.history.replaceState({}, '', url.toString());
    } catch {}

    try {
      const res = await apiService.researchKeyword(term, country);
      if (res.serpAnalysis) {
        setAnalysis(res.serpAnalysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze(initialQ, initialCountry);
  }, []);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`SERP Analyzer — Page 1 Weakness & Competitor Breakdown for ${query}`}
        description="Inspect Page 1 Google results. Detect ranking forums, thin competitor articles, and featured snippet gaps."
        canonicalPath="/serp-analyzer"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Competitive Weakness Scanner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SERP Analyzer
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Inspect what is currently ranking on Google Page 1. Identify content gaps, forum ranking vulnerabilities, and recommended article length.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAnalyze();
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto"
          >
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query or URL..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => {
                const nextCountry = e.target.value;
                setSelectedCountry(nextCountry);
                handleAnalyze(query, nextCountry);
              }}
              className="px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="France">🇫🇷 France</option>
              <option value="India">🇮🇳 India</option>
              <option value="Worldwide">🌐 Worldwide</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Inspect SERP</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {loading && (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">
              Analyzing Google Page 1 SERP for &ldquo;{query}&rdquo; in {selectedCountry}...
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Extracting domain authorities, search intent mismatches, and competitive content gaps.
            </p>
          </div>
        )}

        {!loading && analysis && (
          <>
            {/* SERP Features & Length Banner */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Features Detected on Page 1
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.featuresPresent.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Recommended Depth
                </span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {analysis.recommendedContentLength}+ words
                </span>
              </div>
            </div>

            {/* Weaknesses vs Opportunities Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
                <h3 className="font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Competitor Vulnerabilities</span>
                </h3>
                <ul className="space-y-2 text-amber-900 leading-relaxed">
                  {analysis.serpWeaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-amber-600">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                <h3 className="font-bold text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>How You Can Outrank Them</span>
                </h3>
                <ul className="space-y-2 text-emerald-900 leading-relaxed">
                  {analysis.rankingOpportunities.map((o, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-600">✓</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Page 1 Listings */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">
                Top Search Engine Results for &ldquo;{analysis.keyword}&rdquo; in {selectedCountry}
              </h3>

              {analysis.topResults.map((result) => (
                <div
                  key={result.position}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5 text-xs">
                    <span className="font-mono font-bold text-slate-400">Pos #{result.position}</span>
                    <span className="text-emerald-700 font-semibold">{result.domain}</span>
                    {result.domainAuthority && (
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                        DA: {result.domainAuthority}
                      </span>
                    )}
                    {result.wordCount && (
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                        ~{result.wordCount} words
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-indigo-700 hover:underline">
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      {result.title}
                    </a>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{result.snippet}</p>

                  {result.weaknessFlag && (
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-amber-700 flex items-center gap-1.5">
                      <span className="font-bold">Detected Opening:</span>
                      <span>{result.weaknessFlag}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
