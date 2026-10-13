import React, { useState, useEffect } from 'react';
import { BarChart3, Globe, Search, ArrowRight, Info, ShieldCheck, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { MetricCard } from '../components/common/MetricCard';
import { apiService } from '../services/apiService';
import { DomainTrafficReport } from '../services/seoEngine';

export const TrafficEstimatorPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialDomain = searchParams.get('domain') || searchParams.get('q') || 'shopify.com';

  const [domainInput, setDomainInput] = useState(initialDomain);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<DomainTrafficReport | null>(null);

  const fetchTraffic = async (target: string) => {
    const clean = target.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();
    if (!clean) return;

    setLoading(true);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('domain', clean);
      window.history.replaceState({}, '', url.toString());
    } catch {}

    try {
      const data = await apiService.estimateTraffic(clean);
      setReport(data);
    } catch (err) {
      console.error('Traffic estimate failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraffic(initialDomain);
  }, []);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`Organic Traffic Estimator: ${report?.domain || domainInput} Performance`}
        description="Estimate monthly organic search traffic, top ranking pages, domain authority, and keyword distribution for any domain or URL."
        canonicalPath="/traffic-estimator"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Organic Traffic &amp; Authority Modeling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Traffic Estimator
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Analyze domain search volume potential, estimated monthly organic visits, ranking keywords, and top performing assets.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchTraffic(domainInput);
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="Enter domain (e.g. bbc.co.uk, stripe.com, shopify.com)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Estimate Traffic</span>
            </button>
          </form>

          {/* Quick domain chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Try analyzing:</span>
            {['shopify.com', 'stripe.com', 'bbc.co.uk', 'hubspot.com', 'nerdwallet.com'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDomainInput(d);
                  fetchTraffic(d);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {loading && (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">Modeling traffic profile for {domainInput}...</p>
          </div>
        )}

        {!loading && report && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Domain Overview Header */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{report.category}</span>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{report.domain}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    DA {report.domainAuthority}
                  </span>
                </h2>
              </div>
              <div className="text-xs text-slate-500">
                Data Modeling: Clickstream &amp; SERP position click-through analysis
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                label="Est. Monthly Visits"
                value={report.monthlyVisits.toLocaleString()}
                subValue="Estimated organic traffic"
                trend={report.trend}
                trendPositive={true}
                explanation="Estimated organic Google searches visiting this domain monthly."
                sourceType="AI Estimate"
              />

              <MetricCard
                label="Ranking Keywords"
                value={report.rankingKeywordsCount.toLocaleString()}
                subValue="Top 100 Google positions"
                explanation="Total number of distinct keywords this domain ranks for in Google Top 100."
                sourceType="AI Estimate"
              />

              <MetricCard
                label="Organic Traffic Value"
                value={`$${report.organicTrafficValue.toLocaleString()}`}
                subValue="Google Ads equivalent / month"
                explanation="Modeled cost to buy equivalent search traffic via Google Ads pay-per-click."
                sourceType="AI Estimate"
              />
            </div>

            {/* Country Breakdown Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span>Geographic Search Traffic Distribution</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {report.countryBreakdown.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-2xl">{c.flag}</span>
                    <div className="text-xs font-bold text-slate-900 mt-1">{c.country}</div>
                    <div className="text-xs text-indigo-600 font-mono font-bold">{c.share}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{c.visits.toLocaleString()} visits</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Estimated Pages */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Top Estimated Organic Pages for &ldquo;{report.domain}&rdquo;
              </h3>
              <div className="space-y-3">
                {report.topPages.map((row, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{report.domain}{row.path}</span>
                      <div className="text-slate-500 mt-0.5">Top Query: <em>&ldquo;{row.topKeyword}&rdquo;</em></div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-indigo-600 font-bold">{row.traffic}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                        {row.trafficShare} share
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
