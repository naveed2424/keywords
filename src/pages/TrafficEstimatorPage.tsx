import React, { useState } from 'react';
import { BarChart3, Globe, Search, ArrowRight, Info, ShieldCheck, Key } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { MetricCard } from '../components/common/MetricCard';

export const TrafficEstimatorPage: React.FC = () => {
  const [domain, setDomain] = useState('example.com');
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="Organic Traffic Estimator & Domain Overview"
        description="Estimate monthly organic search traffic, top ranking pages, and keyword distribution for any domain or URL."
        canonicalPath="/traffic-estimator"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Organic Traffic Modeling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Traffic Estimator
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Analyze domain search volume potential, estimated monthly organic visits, and top ranking assets.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowDemo(true);
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
          >
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g. nytimes.com)..."
              className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-xs"
            >
              Estimate Traffic
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Data Transparency Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Third-Party Data Transparency:</span> Exact domain traffic logs are confidential server analytics (Google Analytics / Plausible). Public traffic tools (Ahrefs, Semrush, SimilarWeb) utilize clickstream panels and SERP click-through estimation models. Below is our heuristic demonstration model.
          </div>
        </div>

        {showDemo && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                label="Est. Organic Visits"
                value="48,200"
                subValue="Monthly search traffic"
                trend="+8% MoM"
                explanation="Calculated estimate based on modeled click-through rates across indexed ranking positions."
                sourceType="Demo Data"
              />

              <MetricCard
                label="Ranking Keywords"
                value="2,450"
                subValue="Top 100 Google positions"
                explanation="Total number of distinct query strings for which this domain ranks in the top 100."
                sourceType="Demo Data"
              />

              <MetricCard
                label="Organic Traffic Value"
                value="$18,400"
                subValue="Equivalent monthly Google Ads"
                explanation="Estimated cost to acquire this volume of traffic through paid search ads."
                sourceType="Demo Data"
              />
            </div>

            {/* Top Estimated Pages */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Top Estimated Organic Pages for &ldquo;{domain}&rdquo;
              </h3>
              <div className="space-y-3">
                {[
                  { path: '/blog/remote-work-tools', share: '34%', traffic: '16,400/mo', topKeyword: 'remote work tools' },
                  { path: '/templates/content-calendar', share: '22%', traffic: '10,600/mo', topKeyword: 'content calendar template' },
                  { path: '/guides/email-marketing', share: '18%', traffic: '8,700/mo', topKeyword: 'email marketing guide' },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{domain}{row.path}</span>
                      <div className="text-slate-500 mt-0.5">Top Query: <em>&ldquo;{row.topKeyword}&rdquo;</em></div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-indigo-600 font-bold">{row.traffic}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                        {row.share} share
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
