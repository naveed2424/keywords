import React, { useState } from 'react';
import { Compass, Mail, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { BRAND } from '../../config/brand';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="pb-14 border-b border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Weekly Creator Briefing
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Get smarter SEO & content ideas every Tuesday.
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Join 45,000+ creators, SEOs, and founders. We share verified keyword opportunities, algorithm breakdowns, and AI prompt workflows. Zero spam.
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>You&apos;re subscribed! Check your inbox for the 2026 SEO Blueprint PDF.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors shrink-0 shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Join Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <div className="mt-2 text-[11px] text-slate-500 text-center sm:text-left">
              Includes our free 50-point Technical SEO Audit Checklist.
            </div>
          </div>
        </div>

        {/* 6-Column Navigation Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          {/* PRODUCT */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="/keyword-explorer" className="hover:text-white transition-colors">Keyword Explorer</a></li>
              <li><a href="/keyword-difficulty" className="hover:text-white transition-colors">Keyword Difficulty</a></li>
              <li><a href="/serp-analyzer" className="hover:text-white transition-colors">SERP Analyzer</a></li>
              <li><a href="/content-optimizer" className="hover:text-white transition-colors">Content Optimizer</a></li>
              <li><a href="/keyword-clustering" className="hover:text-white transition-colors">Keyword Clustering</a></li>
              <li><a href="/traffic-estimator" className="hover:text-white transition-colors">Traffic Estimator</a></li>
            </ul>
          </div>

          {/* AI TOOLS */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">AI Tools</h4>
            <ul className="space-y-2.5">
              <li><a href="/ai-article-writer" className="hover:text-white transition-colors">Article Writer</a></li>
              <li><a href="/blog-title-generator" className="hover:text-white transition-colors">Title Generator</a></li>
              <li><a href="/blog-idea-generator" className="hover:text-white transition-colors">Blog Ideas</a></li>
              <li><a href="/tools/paragraph-rewriter" className="hover:text-white transition-colors">Paragraph Rewriter</a></li>
              <li><a href="/tools/faq-generator" className="hover:text-white transition-colors">FAQ Generator</a></li>
              <li><a href="/tools/schema-generator" className="hover:text-white transition-colors">Schema Generator</a></li>
            </ul>
          </div>

          {/* CREATOR */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Creator</h4>
            <ul className="space-y-2.5">
              <li><a href="/youtube-keyword-tool" className="hover:text-white transition-colors">YouTube Keyword Tool</a></li>
              <li><a href="/youtube-to-blog" className="hover:text-white transition-colors">YouTube to Blog</a></li>
              <li><a href="/tools/tiktok-hook-generator" className="hover:text-white transition-colors">TikTok Hooks</a></li>
              <li><a href="/tools/instagram-caption-generator" className="hover:text-white transition-colors">Instagram Captions</a></li>
              <li><a href="/tools/product-description-generator" className="hover:text-white transition-colors">Product Descriptions</a></li>
              <li><a href="/tools/amazon-kdp-keyword-generator" className="hover:text-white transition-colors">Amazon KDP Keywords</a></li>
            </ul>
          </div>

          {/* LEARN */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Learn</h4>
            <ul className="space-y-2.5">
              <li><a href="/blog" className="hover:text-white transition-colors">Blogging Guides</a></li>
              <li><a href="/blog/keyword-research-for-beginners-guide" className="hover:text-white transition-colors">Keyword Research Guide</a></li>
              <li><a href="/blog/topical-authority-seo-strategy" className="hover:text-white transition-colors">Topical Authority</a></li>
              <li><a href="/blog/how-to-write-eeat-content" className="hover:text-white transition-colors">E-E-A-T Blueprint</a></li>
              <li><a href="/blog/affiliate-marketing-seo-blueprint" className="hover:text-white transition-colors">Affiliate Strategy</a></li>
              <li><a href="/blog/ai-search-optimization-sge-perplexity" className="hover:text-white transition-colors">AI Search (GEO)</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="/about" className="hover:text-white transition-colors">About {BRAND.name}</a></li>
              <li><a href="/methodology" className="hover:text-white transition-colors">Data Methodology</a></li>
              <li><a href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="/workspace" className="hover:text-white transition-colors">My Workspace</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-4">Legal & Trust</h4>
            <ul className="space-y-2.5">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</a></li>
              <li><span className="text-slate-500">GDPR Compliant</span></li>
            </ul>
          </div>
        </div>

        {/* Affiliate & Transparency Notice */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <p className="mb-2">
            <strong className="text-slate-400">Affiliate Disclosure:</strong> {BRAND.affiliateDisclosureNotice}
          </p>
          <p>
            <strong className="text-slate-400">Data Transparency:</strong> {BRAND.dataNotice}
          </p>
        </div>

        {/* Copyright & Brand Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-400">{BRAND.name}</span>
            <span>&copy; {new Date().getFullYear()} {BRAND.name} Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Built for Creators &amp; SEO Pros</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for open web search
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
