import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Clock, Sparkles, Globe, HelpCircle, FileText } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

interface UniversalSearchProps {
  onSearch?: (query: string, type: string) => void;
  size?: 'hero' | 'compact';
  autoFocus?: boolean;
}

export const UniversalSearch: React.FC<UniversalSearchProps> = ({
  onSearch,
  size = 'hero',
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { recentSearches, addRecentSearch } = useWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Classify query intent
  const classifyQuery = (input: string) => {
    const text = input.trim().toLowerCase();
    if (text.startsWith('http://') || text.startsWith('https://')) return 'url';
    if (text.includes('.com') || text.includes('.io') || text.includes('.org') || text.includes('.co')) return 'domain';
    if (
      text.startsWith('how') ||
      text.startsWith('what') ||
      text.startsWith('why') ||
      text.startsWith('who') ||
      text.startsWith('when') ||
      text.startsWith('where') ||
      text.startsWith('which') ||
      text.startsWith('can') ||
      text.startsWith('is') ||
      text.endsWith('?')
    ) {
      return 'question';
    }
    return 'keyword';
  };

  const handleExecuteSearch = (searchQuery: string) => {
    const clean = searchQuery.trim();
    if (!clean) return;

    addRecentSearch(clean);
    setIsFocused(false);

    const type = classifyQuery(clean);

    if (onSearch) {
      onSearch(clean, type);
      return;
    }

    // Default route navigation
    if (type === 'question') {
      window.location.href = `/questions?q=${encodeURIComponent(clean)}`;
    } else if (type === 'domain' || type === 'url') {
      window.location.href = `/traffic-estimator?domain=${encodeURIComponent(clean)}`;
    } else {
      window.location.href = `/keyword-explorer?q=${encodeURIComponent(clean)}`;
    }
  };

  const exampleChips = [
    'AI tools',
    'personal finance',
    'travel Europe',
    'home workout',
    'digital marketing',
  ];

  const currentType = classifyQuery(query);

  return (
    <div ref={containerRef} className="w-full relative max-w-3xl mx-auto">
      {/* Search Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExecuteSearch(query);
        }}
        className={`relative flex items-center transition-all duration-300 rounded-2xl bg-white ${
          size === 'hero'
            ? 'p-2 shadow-lg shadow-indigo-500/5 border-2 border-slate-200/80 focus-within:border-indigo-600 focus-within:shadow-xl focus-within:shadow-indigo-500/10'
            : 'p-1.5 border border-slate-200 shadow-xs focus-within:border-indigo-500'
        }`}
      >
        <div className="pl-3.5 pr-2 text-slate-400 shrink-0">
          <Search className={size === 'hero' ? 'w-6 h-6 text-slate-400' : 'w-4 h-4'} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          autoFocus={autoFocus}
          placeholder="Enter a keyword, topic, website or question..."
          className={`w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none ${
            size === 'hero' ? 'text-base lg:text-lg py-2' : 'text-sm py-1'
          }`}
        />

        {/* Dynamic Intent indicator badge inside search bar */}
        {query.trim().length > 2 && (
          <div className="hidden sm:inline-flex items-center gap-1 mr-2 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
            {currentType === 'question' && <HelpCircle className="w-3 h-3 text-purple-600" />}
            {currentType === 'domain' && <Globe className="w-3 h-3 text-emerald-600" />}
            {currentType === 'keyword' && <Sparkles className="w-3 h-3 text-indigo-600" />}
            <span className="capitalize">{currentType}</span>
          </div>
        )}

        <button
          type="submit"
          className={`shrink-0 inline-flex items-center gap-2 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-xs ${
            size === 'hero' ? 'px-6 py-3.5 text-base' : 'px-4 py-2 text-sm'
          }`}
        >
          <span>Research</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Suggestion Dropdown (when focused) */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
          {query.trim().length > 1 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Intelligent Action Routes
              </div>
              <button
                type="button"
                onClick={() => handleExecuteSearch(query)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 text-slate-800 hover:text-indigo-950 transition-colors text-sm text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>
                    Explore Keyword metrics for <strong className="text-indigo-600">&ldquo;{query}&rdquo;</strong>
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = `/questions?q=${encodeURIComponent(query)}`;
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50 text-slate-800 hover:text-purple-950 transition-colors text-sm text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <span>
                    Find questions people ask about <strong className="text-purple-600">&ldquo;{query}&rdquo;</strong>
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = `/ai-article-writer?topic=${encodeURIComponent(query)}`;
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-slate-800 hover:text-emerald-950 transition-colors text-sm text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>
                    Draft full article on <strong className="text-emerald-600">&ldquo;{query}&rdquo;</strong>
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            <div>
              {recentSearches.length > 0 && (
                <div className="mb-3">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Recent Searches</span>
                    <span className="text-[10px] text-slate-400 font-normal">Saved locally</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {recentSearches.slice(0, 6).map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleExecuteSearch(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Trending Suggestions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 px-1">
                {exampleChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExecuteSearch(chip)}
                    className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 text-xs text-left flex items-center gap-2"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span>{chip}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Example Chips Under Hero Bar */}
      {size === 'hero' && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Try:</span>
          {exampleChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExecuteSearch(chip)}
              className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 transition-colors border border-slate-200/60 font-medium"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Trust microcopy */}
      {size === 'hero' && (
        <div className="mt-4 text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-3">
          <span>✓ No signup required</span>
          <span>•</span>
          <span>✓ 100% Free Tools</span>
          <span>•</span>
          <span>✓ AI-powered insights</span>
        </div>
      )}
    </div>
  );
};
