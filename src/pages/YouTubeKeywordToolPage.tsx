import React, { useState, useEffect } from 'react';
import { Video, Search, Sparkles, Copy, Check, ArrowRight, Loader2, Tag, PlayCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';

export const YouTubeKeywordToolPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQ = searchParams.get('q') || 'how to start a podcast';

  const [keyword, setKeyword] = useState(initialQ);
  const [loading, setLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const [data, setData] = useState({
    keyword: 'how to start a podcast',
    videoAngles: [
      'How to Start a Podcast in 2026 (Beginner Setup with $0 Equipment)',
      'Podcast Mistakes That Ruin Your Audio (And How to Fix Them)',
      'How I Built a Top 100 Podcast from My Bedroom',
      'The Only 3 Pieces of Podcast Gear You Actually Need',
    ],
    hooks: [
      'Visual: Holding an expensive microphone. "You don’t need this $400 mic to launch a top 10 podcast."',
      'Text overlay: "The 3 biggest podcasting mistakes in 2026." Spoken: "Number 3 is why 90% of shows quit after episode 3."',
      'Before/after audio sample test: "This is raw smartphone audio, and this is processed audio with a free software hack."',
    ],
    tags: [
      'how to start a podcast',
      'podcast for beginners',
      'podcast equipment 2026',
      'start a podcast on budget',
      'podcast recording software',
      'podcast hosting platforms',
      'spotify for podcasters',
    ],
  });

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await apiService.researchKeyword(keyword);
      if (res && res.contentIdeas) {
        setData({
          keyword,
          videoAngles: res.contentIdeas.map((c) => `${c.title} [Full Tutorial]`),
          hooks: [
            `"Stop doing ${keyword} the old way in 2026. Here is the modern workflow."`,
            `"If you only remember one rule about ${keyword}, make it this one."`,
          ],
          tags: res.keywords.slice(0, 10).map((k) => k.keyword),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQ) {
      handleSearch();
    }
  }, []);

  const copyTags = () => {
    navigator.clipboard.writeText(data.tags.join(', '));
    setCopiedSection('tags');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`YouTube Keyword Tool — Video SEO & Hook Formula for ${keyword}`}
        description="Discover video topics people search on YouTube, thumbnail hook formulas, video tags, and description blueprints."
        canonicalPath="/youtube-keyword-tool"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>YouTube Search &amp; Retention Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            YouTube Keyword Tool
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Find high-traffic video search queries, 3-second hook scripts that stop the scroll, and copy-paste YouTube tags.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter video subject..."
              className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Find Video Angles</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Video Title Formulas */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-rose-600" />
            <span>High-CTR YouTube Title Formulas</span>
          </h3>

          <div className="space-y-3">
            {data.videoAngles.map((angle, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 hover:border-rose-200 bg-slate-50/50 flex items-center justify-between gap-4 text-sm font-medium text-slate-900"
              >
                <span>{angle}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(angle);
                    alert('Copied title!');
                  }}
                  className="text-xs text-rose-600 hover:underline shrink-0"
                >
                  Copy Title
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Second Retention Hooks */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>First 3-Second Retention Hook Scripts</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Audience retention in seconds 1–5 determines YouTube algorithmic recommendation. Use these visual and verbal hooks:
          </p>

          <div className="space-y-3">
            {data.hooks.map((hook, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                {hook}
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-600" />
              <span>Comma-Separated Video Tags ({data.tags.length})</span>
            </h3>

            <button
              onClick={copyTags}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              {copiedSection === 'tags' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'tags' ? 'Copied' : 'Copy All Tags'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
            {data.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded bg-white border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
