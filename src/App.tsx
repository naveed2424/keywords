import React, { useState, useEffect } from 'react';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { FloatingAIAssistant } from './components/common/FloatingAIAssistant';

// Pages
import { HomePage } from './pages/HomePage';
import { KeywordExplorerPage } from './pages/KeywordExplorerPage';
import { AiArticleWriterPage } from './pages/AiArticleWriterPage';
import { ContentOptimizerPage } from './pages/ContentOptimizerPage';
import { BlogTitleGeneratorPage } from './pages/BlogTitleGeneratorPage';
import { BlogIdeaGeneratorPage } from './pages/BlogIdeaGeneratorPage';
import { QuestionFinderPage } from './pages/QuestionFinderPage';
import { KeywordClusteringPage } from './pages/KeywordClusteringPage';
import { SerpAnalyzerPage } from './pages/SerpAnalyzerPage';
import { ContentGapPage } from './pages/ContentGapPage';
import { TrafficEstimatorPage } from './pages/TrafficEstimatorPage';
import { YouTubeKeywordToolPage } from './pages/YouTubeKeywordToolPage';
import { YouTubeToBlogPage } from './pages/YouTubeToBlogPage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { IndividualToolPage } from './pages/IndividualToolPage';
import { BlogArchivePage } from './pages/BlogArchivePage';
import { BlogPostPage } from './pages/BlogPostPage';
import { TrendingKeywordsPage } from './pages/TrendingKeywordsPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { MethodologyPage } from './pages/MethodologyPage';
import {
  AboutPage,
  EditorialPolicyPage,
  AffiliateDisclosurePage,
  PrivacyPolicyPage,
  TermsPage,
  ContactPage,
} from './pages/TrustPages';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync navigation on browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleCustomCommandPalette = () => {
      setIsCommandPaletteOpen(true);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('open-command-palette', handleCustomCommandPalette);

    // Global internal link interceptor for SPA navigation
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (
        target &&
        target.href &&
        target.href.startsWith(window.location.origin) &&
        !target.hasAttribute('download') &&
        target.getAttribute('target') !== '_blank'
      ) {
        const url = new URL(target.href);
        // Only intercept local paths, ignore hash jumps on same path
        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          e.preventDefault();
          window.history.pushState({}, '', target.href);
          setCurrentPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('open-command-palette', handleCustomCommandPalette);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Router matching
  const renderCurrentPage = () => {
    const path = currentPath.replace(/\/$/, '') || '/';

    if (path === '/') return <HomePage />;
    if (path === '/keyword-explorer' || path === '/keyword-difficulty') return <KeywordExplorerPage />;
    if (path === '/ai-article-writer') return <AiArticleWriterPage />;
    if (path === '/content-optimizer') return <ContentOptimizerPage />;
    if (path === '/blog-title-generator') return <BlogTitleGeneratorPage />;
    if (path === '/blog-idea-generator') return <BlogIdeaGeneratorPage />;
    if (path === '/questions') return <QuestionFinderPage />;
    if (path === '/keyword-clustering') return <KeywordClusteringPage />;
    if (path === '/serp-analyzer') return <SerpAnalyzerPage />;
    if (path === '/content-gap') return <ContentGapPage />;
    if (path === '/traffic-estimator') return <TrafficEstimatorPage />;
    if (path === '/youtube-keyword-tool') return <YouTubeKeywordToolPage />;
    if (path === '/youtube-to-blog') return <YouTubeToBlogPage />;
    if (path === '/tools') return <ToolsDirectoryPage />;
    if (path.startsWith('/tools/')) {
      const toolSlug = path.replace('/tools/', '');
      return <IndividualToolPage toolSlug={toolSlug} />;
    }
    if (path === '/blog') return <BlogArchivePage />;
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogPostPage slug={slug} />;
    }
    if (path === '/trending') return <TrendingKeywordsPage />;
    if (path === '/workspace') return <WorkspacePage />;
    if (path === '/methodology') return <MethodologyPage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/editorial-policy') return <EditorialPolicyPage />;
    if (path === '/affiliate-disclosure') return <AffiliateDisclosurePage />;
    if (path === '/privacy') return <PrivacyPolicyPage />;
    if (path === '/terms') return <TermsPage />;
    if (path === '/contact') return <ContactPage />;

    // 404 Fallback
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900">404 - Page Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-sm">
          The requested page could not be located. Browse our free tools or return to the homepage.
        </p>
        <a
          href="/"
          className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-xs hover:bg-indigo-700 transition-colors"
        >
          Return to Home
        </a>
      </div>
    );
  };

  return (
    <WorkspaceProvider>
      <div className="flex flex-col min-h-screen text-slate-900 bg-[#fafbfc]">
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        <main className="flex-1">{renderCurrentPage()}</main>

        <Footer />

        {/* Global Command Palette (Ctrl/Cmd + K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />

        {/* Floating Context-Aware AI SEO Assistant */}
        <FloatingAIAssistant />
      </div>
    </WorkspaceProvider>
  );
}
