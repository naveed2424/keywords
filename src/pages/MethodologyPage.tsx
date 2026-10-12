import React from 'react';
import { ShieldCheck, Info, Database, Cpu, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { BRAND } from '../config/brand';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`Data Methodology & Transparency — ${BRAND.name}`}
        description="Learn how RankPilot calculates keyword metrics, difficulty scores, search intent, and opportunity algorithms. Complete transparency on heuristics and sources."
        canonicalPath="/methodology"
      />

      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open &amp; Transparent Metrics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Data Methodology
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We believe transparent software earns long-term creator trust. Here is exactly how our search volume, keyword difficulty, intent models, and AI generators operate.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
        {/* Core Principle */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-600" />
            <span>Our Transparency Promise</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Google does not provide an open public API delivering exact monthly organic search counts for all web queries. Even billion-dollar platforms like Ahrefs, Semrush, and Moz utilize clickstream estimation panels and third-party algorithmic modeling.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
            At {BRAND.name}, <strong>we never present invented or fabricated numbers as factual third-party data.</strong> Every metric is clearly flagged as an <span className="font-semibold text-indigo-600">&ldquo;AI Estimate&rdquo;</span>, <span className="font-semibold text-slate-600">&ldquo;Demo Data&rdquo;</span>, or <span className="font-semibold text-emerald-600">&ldquo;Live API Data&rdquo;</span>.
          </p>
        </div>

        {/* 1. Monthly Search Volume */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">1. Monthly Search Volume</h3>
          <p className="text-slate-600 text-sm">
            Search volume represents our estimate of how many times a particular query is typed into search engines per month within a chosen country.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Heuristic Modeling:</strong> Our algorithms analyze query length, term frequency, search modifier popularity, and niche velocity to project search volume ranges.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Seasonal Indexing:</strong> The 12-month sparkline displays relative popularity indexed between 0 and 100 to reveal whether interest is trending upward or declining.</span>
            </li>
          </ul>
        </section>

        {/* 2. Keyword Difficulty */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">2. Keyword Difficulty (KD 0–100)</h3>
          <p className="text-slate-600 text-sm">
            Keyword Difficulty is our proprietary score estimating how challenging it will be for a new or intermediate website to reach Google Page 1.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs my-4">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <span className="font-bold block">0 - 24: Very Easy</span>
              Accessible for brand-new blogs with focused guides.
            </div>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800">
              <span className="font-bold block">25 - 34: Easy</span>
              Requires solid E-E-A-T depth and 1–2 cluster posts.
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
              <span className="font-bold block">35 - 59: Medium</span>
              Needs moderate domain authority and thorough topical hubs.
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
              <span className="font-bold block">60+: Hard / Very Hard</span>
              Dominated by established legacy publications and brands.
            </div>
          </div>
        </section>

        {/* 3. Search Intent Classification */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">3. Search Intent Classification</h3>
          <p className="text-slate-600 text-sm">
            We evaluate grammatical triggers, semantic patterns, and commercial intent signals to classify every keyword into one of four categories:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li><strong>Informational:</strong> Searches seeking education or solutions (how-to, what is, tips, guide).</li>
            <li><strong>Commercial:</strong> Searches comparing products or services prior to purchase (best, review, vs, alternatives).</li>
            <li><strong>Transactional:</strong> High-intent queries ready to complete an action (pricing, buy, coupon, template).</li>
            <li><strong>Navigational:</strong> Specific brand queries seeking a destination URL.</li>
          </ul>
        </section>

        {/* 4. Opportunity Score */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">4. Opportunity Score (0–100)</h3>
          <p className="text-slate-600 text-sm">
            Opportunity Score is calculated by balancing search demand against competitive difficulty:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 font-mono text-xs text-slate-800">
            Opportunity Score = Clamp(0..100, (100 - KeywordDifficulty) + NormalizedSearchDemandBonus)
          </div>
          <p className="text-xs text-slate-500">
            This metric highlights keywords with high user interest and low competitive barrier—ideal targets for fast organic traction.
          </p>
        </section>

        {/* 5. Limitation Notice */}
        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <h4 className="font-bold text-slate-900 mb-1">Limitations &amp; Continuous Improvement</h4>
          <p>
            Search engine ranking algorithms evaluate hundreds of dynamic factors including user location, personalization, device type, and fresh web updates. No software platform can guarantee #1 rankings. We recommend pairing RankPilot insights with your authentic first-hand experience, proprietary data, and consistent publishing cadence.
          </p>
        </div>
      </div>
    </div>
  );
};
