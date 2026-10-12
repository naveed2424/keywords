import React, { useState } from 'react';
import { X, Copy, Check, Bookmark, BookmarkCheck, ArrowRight, Sparkles, Video, HelpCircle, FileText, Layers, Share2 } from 'lucide-react';
import { KeywordMetric } from '../../types/seo';
import { DifficultyBadge, IntentBadge } from './Badges';
import { useWorkspace } from '../../context/WorkspaceContext';

interface KeywordDrawerProps {
  keyword: KeywordMetric | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (action: string, keyword: string) => void;
}

export const KeywordDrawer: React.FC<KeywordDrawerProps> = ({
  keyword,
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const { isKeywordSaved, saveKeyword, removeKeyword } = useWorkspace();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'actions' | 'ideas'>('actions');

  if (!isOpen || !keyword) return null;

  const isSaved = isKeywordSaved(keyword.keyword);

  const handleCopy = () => {
    navigator.clipboard.writeText(keyword.keyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSave = () => {
    if (isSaved) {
      removeKeyword(keyword.id);
    } else {
      saveKeyword(keyword);
    }
  };

  // Instant pre-computed smart ideas for this keyword
  const ideas = [
    { type: 'How-To Guide', title: `How to Master ${keyword.keyword} in 7 Practical Steps`, icon: FileText },
    { type: 'Listicle', title: `10 Best ${keyword.keyword} Strategies for Faster Growth`, icon: Sparkles },
    { type: 'Comparison', title: `${keyword.keyword} vs Alternatives: Comprehensive Breakdown`, icon: Layers },
    { type: 'YouTube Video', title: `I Tested ${keyword.keyword} for 30 Days (Real Results)`, icon: Video },
    { type: 'FAQ Guide', title: `Top 5 Questions Beginners Ask About ${keyword.keyword}`, icon: HelpCircle },
    { type: 'Lead Magnet', title: `The Ultimate ${keyword.keyword} Printable Checklist [PDF]`, icon: Share2 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <DifficultyBadge difficulty={keyword.difficulty} label={keyword.difficultyLabel} />
              <IntentBadge intent={keyword.intent} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 break-words">{keyword.keyword}</h3>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-mono">
              <span>Vol: {keyword.volume.toLocaleString()}/mo</span>
              <span>CPC: ${keyword.cpc.toFixed(2)}</span>
              <span>Opp: {keyword.opportunityScore}/100</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Toolbar */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-white text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Query'}</span>
            </button>

            <button
              onClick={handleToggleSave}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border font-medium transition-colors ${
                isSaved
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved to Workspace' : 'Save Keyword'}</span>
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'actions' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Actions
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeTab === 'ideas' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Content Ideas
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-6">
          {activeTab === 'actions' ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Immediate Next Workflows
                </h4>
                <div className="space-y-2">
                  <a
                    href={`/ai-article-writer?topic=${encodeURIComponent(keyword.keyword)}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-950 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-600 text-white">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Write Full Article Draft</div>
                        <div className="text-xs text-indigo-600/80">Generate E-E-A-T article with schema & FAQs</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={`/blog-title-generator?q=${encodeURIComponent(keyword.keyword)}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Generate 20 High-CTR Titles</div>
                        <div className="text-xs text-slate-500">Curiosity, How-To, and Listicle formats</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={`/youtube-keyword-tool?q=${encodeURIComponent(keyword.keyword)}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Research YouTube Angles</div>
                        <div className="text-xs text-slate-500">Video hooks, tags, and suggested thumbnails</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href={`/keyword-clustering?q=${encodeURIComponent(keyword.keyword)}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900">Cluster with Related Keywords</div>
                        <div className="text-xs text-slate-500">Form a hub and spoke topical authority plan</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* SERP Details */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  SERP Features Detected
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {keyword.serpFeatures.map((feat, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Curated Content Angles for &ldquo;{keyword.keyword}&rdquo;
              </h4>
              {ideas.map((idea, idx) => {
                const Icon = idea.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white transition-all group"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{idea.type}</span>
                    </div>
                    <h5 className="text-sm font-medium text-slate-900 leading-snug">{idea.title}</h5>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(idea.title);
                          alert('Title copied!');
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        Copy Title
                      </button>
                      <a
                        href={`/ai-article-writer?title=${encodeURIComponent(idea.title)}&keyword=${encodeURIComponent(
                          keyword.keyword
                        )}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        Write This <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
