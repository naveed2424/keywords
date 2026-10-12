import React, { useState } from 'react';
import {
  Bookmark,
  Download,
  Trash2,
  FileText,
  Search,
  Wrench,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { useWorkspace } from '../context/WorkspaceContext';
import { DifficultyBadge, IntentBadge } from '../components/common/Badges';
import { getToolBySlug } from '../data/toolsData';

export const WorkspacePage: React.FC = () => {
  const {
    savedKeywords,
    removeKeyword,
    favoriteToolSlugs,
    savedDrafts,
    deleteDraft,
    exportKeywordsCSV,
    exportWorkspaceJSON,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<'keywords' | 'drafts' | 'tools'>('keywords');

  const favoriteTools = favoriteToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="My Workspace — Saved Keywords & Content Drafts"
        description="Access your locally saved keywords, favorite tools, and article drafts without an account. Export to CSV or JSON anytime."
        canonicalPath="/workspace"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Personal Workspace
              </span>
              <span className="text-xs text-slate-400">• Stored Privately in LocalStorage</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Workspace
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage saved keywords, article drafts, and favorite utilities without creating an account.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportKeywordsCSV}
              disabled={savedKeywords.length === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={exportWorkspaceJSON}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'keywords' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Saved Keywords ({savedKeywords.length})
          </button>

          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'drafts' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Article Drafts ({savedDrafts.length})
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'tools' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Favorite Tools ({favoriteTools.length})
          </button>
        </div>

        {/* TAB 1: SAVED KEYWORDS */}
        {activeTab === 'keywords' && (
          <div className="space-y-4">
            {savedKeywords.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Keyword</th>
                      <th className="py-3 px-4 text-right">Volume</th>
                      <th className="py-3 px-4">Difficulty</th>
                      <th className="py-3 px-4 text-right">CPC</th>
                      <th className="py-3 px-4">Intent</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {savedKeywords.map((kw) => (
                      <tr key={kw.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <a
                            href={`/keyword-explorer?q=${encodeURIComponent(kw.keyword)}`}
                            className="hover:text-indigo-600"
                          >
                            {kw.keyword}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                          {kw.volume.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <DifficultyBadge difficulty={kw.difficulty} label={kw.difficultyLabel} />
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                          ${kw.cpc.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <IntentBadge intent={kw.intent} />
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <a
                            href={`/ai-article-writer?topic=${encodeURIComponent(kw.keyword)}`}
                            className="font-semibold text-indigo-600 hover:underline"
                          >
                            Write
                          </a>
                          <button
                            onClick={() => removeKeyword(kw.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors"
                            title="Remove keyword"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-sm text-slate-500">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-base">No saved keywords yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Click the bookmark icon on any keyword row in Keyword Explorer to save it here for later.
                </p>
                <a
                  href="/keyword-explorer"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Explore Keywords</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARTICLE DRAFTS */}
        {activeTab === 'drafts' && (
          <div className="space-y-4">
            {savedDrafts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedDrafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>{draft.wordCount} words</span>
                        <button
                          onClick={() => deleteDraft(draft.id)}
                          className="hover:text-rose-600 transition-colors"
                          title="Delete draft"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base line-clamp-1">{draft.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{draft.brief}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">Target: {draft.primaryKeyword}</span>
                      <a
                        href={`/ai-article-writer?topic=${encodeURIComponent(draft.primaryKeyword)}`}
                        className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        Open Draft <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-sm text-slate-500">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-base">No saved drafts yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Generate full articles in the AI Article Writer and they will automatically save to your local browser storage.
                </p>
                <a
                  href="/ai-article-writer"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xs hover:bg-indigo-700 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Draft an Article</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FAVORITE TOOLS */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTools.map((tool: any) => (
              <a
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tool.shortDesc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
