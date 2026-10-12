import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Wrench, BookOpen, Sparkles } from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { BLOG_POSTS } from '../../data/blogData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global shortcut Cmd+K or Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const evt = new CustomEvent('open-command-palette');
          window.dispatchEvent(evt);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter tools and articles
  const clean = query.toLowerCase().trim();
  const matchingTools = TOOLS_DATA.filter(
    (t) => t.name.toLowerCase().includes(clean) || t.shortDesc.toLowerCase().includes(clean)
  ).slice(0, 5);

  const matchingArticles = BLOG_POSTS.filter(
    (a) => a.title.toLowerCase().includes(clean) || a.category.toLowerCase().includes(clean)
  ).slice(0, 3);

  const allItems = [
    ...matchingTools.map((t) => ({ type: 'tool' as const, data: t, href: `/tools/${t.slug}` })),
    ...matchingArticles.map((a) => ({ type: 'article' as const, data: a, href: `/blog/${a.slug}` })),
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools, guides, topics, and resources..."
            className="w-full ml-3 bg-transparent text-slate-900 text-base placeholder:text-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {matchingTools.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tools & Utilities ({matchingTools.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/70 text-slate-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-2">
                          <span>{tool.name}</span>
                          {tool.badge && (
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDesc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {matchingArticles.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Articles & Guides ({matchingArticles.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchingArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm line-clamp-1">{article.title}</div>
                        <span className="text-xs text-slate-400">{article.category} • {article.readingTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {allItems.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p>No tools or articles found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-slate-400 mt-1">Try searching &ldquo;keyword&rdquo;, &ldquo;article&rdquo;, or &ldquo;youtube&rdquo;.</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">Enter</kbd> to select</span>
            <span><kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">Esc</kbd> to exit</span>
          </div>
          <span className="text-indigo-600 font-medium">RankPilot Command Search</span>
        </div>
      </div>
    </div>
  );
};
