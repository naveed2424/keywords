import React, { useState, useEffect } from 'react';
import { Network, Sparkles, Layers, Link2, ArrowRight, Loader2, Copy } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { IntentBadge } from '../components/common/Badges';
import { KeywordCluster } from '../types/seo';

export const KeywordClusteringPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialSeed = searchParams.get('q') || 'indoor plants, succulent care, fiddle leaf fig lighting';

  const [seed, setSeed] = useState(initialSeed);
  const [loading, setLoading] = useState(false);
  const [clusters, setClusters] = useState<KeywordCluster[]>([
    {
      id: 'cluster-1',
      pillarTopic: 'Indoor Houseplant Lighting Guide',
      supportingCluster: 'Artificial Lighting & Grow Lights',
      suggestedUrl: '/guides/indoor-plant-grow-lights',
      recommendedArticleTitle: 'The Definitive Guide to Grow Lights for Indoor Plants',
      primaryIntent: 'informational',
      keywords: ['grow light schedule', 'best led lights for succulents', 'how many hours for houseplant lights', 'indoor plant lux requirements'],
      internalLinkingTips: [
        'Link upward to the main cornerstone guide "Complete Indoor Plant Care"',
        'Cross-link to "Troubleshooting Yellowing Leaves Guide"'
      ],
    },
    {
      id: 'cluster-2',
      pillarTopic: 'Fiddle Leaf Fig Mastery',
      supportingCluster: 'Watering & Humidity Protocols',
      suggestedUrl: '/plants/fiddle-leaf-fig-care',
      recommendedArticleTitle: 'How to Care for a Fiddle Leaf Fig Without Dropping Leaves',
      primaryIntent: 'informational',
      keywords: ['fiddle leaf fig lighting', 'fiddle leaf brown spots', 'watering schedule for fiddle leaf', 'best soil mix for ficus lyrata'],
      internalLinkingTips: [
        'Include link to recommended moisture meters and fertilizers',
        'Link to propagation tutorial'
      ],
    },
  ]);

  const handleCluster = async () => {
    if (!seed.trim()) return;
    setLoading(true);
    try {
      const res = await apiService.researchKeyword(seed.split(',')[0] || seed);
      if (res.clusters && res.clusters.length > 0) {
        setClusters(res.clusters);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialSeed) {
      handleCluster();
    }
  }, []);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="Keyword Cluster Generator — Build Topical Authority Hubs"
        description="Group keywords by semantic relevance and search intent. Build pillar-and-spoke content hubs that search engines reward."
        canonicalPath="/keyword-clustering"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Network className="w-3.5 h-3.5" />
            <span>Semantic Topical Authority</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Keyword Cluster Generator
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Stop publishing disconnected one-off articles. Group keywords into organized topical pillars, hub pages, and bidirectional internal linking plans.
          </p>

          <div className="mt-6 max-w-xl mx-auto space-y-3">
            <textarea
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              rows={3}
              placeholder="Enter comma-separated keywords or a seed topic..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-y font-mono"
            />
            <button
              onClick={handleCluster}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate Topic Clusters</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Found {clusters.length} Topical Authority Clusters</span>
          <span>Prevents Keyword Cannibalization</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {cluster.supportingCluster}
                  </span>
                  <IntentBadge intent={cluster.primaryIntent} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {cluster.recommendedArticleTitle}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Suggested URL: {cluster.suggestedUrl}
                </div>

                {/* Keywords */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Clustered Keyword Targets:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cluster.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Internal Linking Recommendations */}
                {cluster.internalLinkingTips && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Link2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Internal Linking Architecture:</span>
                    </span>
                    <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
                      {cluster.internalLinkingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Pillar: {cluster.pillarTopic}</span>
                <a
                  href={`/ai-article-writer?title=${encodeURIComponent(
                    cluster.recommendedArticleTitle
                  )}&keyword=${encodeURIComponent(cluster.keywords[0])}`}
                  className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Create Article Draft &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
