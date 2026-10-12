import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X, Bookmark, Compass, Sparkles, FileText, Wrench } from 'lucide-react';
import { BRAND } from '../../config/brand';
import { ResearchMegaMenu } from './MegaMenu';
import { useWorkspace } from '../../context/WorkspaceContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [isResearchMenuOpen, setIsResearchMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { savedKeywords } = useWorkspace();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                {BRAND.name}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            {/* Research Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsResearchMenuOpen(true)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors ${
                  isResearchMenuOpen ? 'text-indigo-600 bg-slate-50' : ''
                }`}
              >
                <span>Research</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isResearchMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <a href="/ai-article-writer" className="px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              Content
            </a>

            <a href="/tools" className="px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              AI Tools
            </a>

            <a href="/tools?cat=seo" className="px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              SEO Tools
            </a>

            <a href="/youtube-keyword-tool" className="px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              YouTube
            </a>

            <a href="/blog" className="px-3 py-2 rounded-lg hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              Blog
            </a>
          </nav>
        </div>

        {/* Right CTA & Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search shortcut button */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs font-medium"
            title="Global Search (Ctrl/Cmd + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search tools & guides...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Workspace Link */}
          <a
            href="/workspace"
            className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            title="My Workspace"
          >
            <Bookmark className="w-5 h-5" />
            {savedKeywords.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {savedKeywords.length > 9 ? '9+' : savedKeywords.length}
              </span>
            )}
          </a>

          {/* Primary CTA */}
          <a
            href="/keyword-explorer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Researching</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Research Mega Menu Container */}
      <ResearchMegaMenu isOpen={isResearchMenuOpen} onClose={() => setIsResearchMenuOpen(false)} />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <a
            href="/keyword-explorer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            Keyword Explorer
          </a>
          <a
            href="/ai-article-writer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            AI Article Writer
          </a>
          <a
            href="/content-optimizer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            SEO Content Optimizer
          </a>
          <a
            href="/questions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            Question Finder
          </a>
          <a
            href="/keyword-clustering"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            Keyword Clustering
          </a>
          <a
            href="/serp-analyzer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            SERP Analyzer
          </a>
          <a
            href="/tools"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            Browse All 35+ Tools
          </a>
          <a
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-slate-900 hover:bg-slate-50"
          >
            SEO & Blogging Guides
          </a>
          <a
            href="/workspace"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block p-2.5 rounded-xl font-semibold text-indigo-600 bg-indigo-50"
          >
            My Workspace ({savedKeywords.length} saved)
          </a>
        </div>
      )}
    </header>
  );
};
