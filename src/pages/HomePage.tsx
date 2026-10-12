import React from 'react';
import {
  Compass,
  Search,
  Sparkles,
  FileText,
  BarChart2,
  Video,
  Layers,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Bookmark,
  Users,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { UniversalSearch } from '../components/common/UniversalSearch';
import { SEOHead } from '../components/common/SEOHead';
import { BRAND } from '../config/brand';
import { TOOLS_DATA } from '../data/toolsData';
import { BLOG_POSTS } from '../data/blogData';

export const HomePage: React.FC = () => {
  const popularTools = TOOLS_DATA.filter((t) => t.popular).slice(0, 8);

  return (
    <div className="bg-[#fafbfc] min-h-screen">
      <SEOHead
        title="Free AI SEO & Creator Toolkit — Keyword Research & Writing"
        description="Research keywords, discover content opportunities, and create search-optimized articles with powerful free SEO and AI creator tools."
      />

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION                                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-200/60">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-indigo-100/60 via-blue-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Free AI SEO &amp; Creator Toolkit</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Find Better Keywords. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">
              Create Better Content.
            </span>{' '}
            <br className="hidden sm:inline" />
            Grow Your Traffic.
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Research keywords, discover content opportunities and create optimized content with powerful free SEO and AI tools.
          </p>

          {/* Universal Search Bar */}
          <div className="mt-10">
            <UniversalSearch size="hero" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: EVERYTHING YOU NEED TO GROW                         */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            End-to-End Creator Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Everything You Need to Grow
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Move seamlessly from raw search query to ranking editorial assets with zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Research Keywords */}
          <a
            href="/keyword-explorer"
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Research Keywords
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Uncover search volume, difficulty tiers, long-tail variations, and commercial intent signals.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600 gap-1">
              <span>Open Keyword Explorer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 2: Analyze Competition */}
          <a
            href="/serp-analyzer"
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Analyze Competition
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Spot ranking forum threads, thin competitor pages, and featured snippet weaknesses on Page 1.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-600 gap-1">
              <span>Inspect SERPs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 3: Create Content */}
          <a
            href="/ai-article-writer"
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Create Content
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Generate exhaustive, E-E-A-T friendly articles complete with outlines, FAQ schema, and takeaways.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-600 gap-1">
              <span>Launch Article Writer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 4: Optimize SEO */}
          <a
            href="/content-optimizer"
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                Optimize SEO
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Audit headings, keyword density, readability grade, and semantic entity coverage in real time.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-teal-600 gap-1">
              <span>Run Content Optimizer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 5: Grow YouTube */}
          <a
            href="/youtube-keyword-tool"
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                Grow YouTube
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Discover video search terms, proven 3-second hook formulas, and convert videos to blog articles.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-rose-600 gap-1">
              <span>Explore YouTube Tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 6: Find Content Ideas */}
          <a
            href="/blog-idea-generator"
            className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Find Content Ideas
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Generate 20+ viral angles, comparison teardowns, and high-CTR blog titles for any niche.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-amber-600 gap-1">
              <span>Generate Ideas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: POPULAR FREE TOOLS DIRECTORY                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Direct Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Popular Free Tools
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Zero signups. Instant answers for every creator and SEO need.
              </p>
            </div>
            <a
              href="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>View all 35+ tools</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map((tool) => (
              <a
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="p-5 rounded-2xl border border-slate-200 bg-[#fafbfc] hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      FREE
                    </span>
                    {tool.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: 5-STEP WORKFLOW BLUEPRINT                           */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Proven Content Growth Model
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            From Keyword to Published Traffic
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            How modern creators use RankPilot to systematically build 50K+ monthly organic traffic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: 'STEP 1',
              title: 'Research',
              desc: 'Enter your niche seed query and find low-difficulty long-tail targets.',
              link: '/keyword-explorer',
            },
            {
              step: 'STEP 2',
              title: 'Analyze',
              desc: 'Inspect Page 1 SERP results, PAA questions, and ranking weaknesses.',
              link: '/serp-analyzer',
            },
            {
              step: 'STEP 3',
              title: 'Create',
              desc: 'Draft comprehensive E-E-A-T guides with custom outlines and FAQ schema.',
              link: '/ai-article-writer',
            },
            {
              step: 'STEP 4',
              title: 'Optimize',
              desc: 'Score your draft against target intent, readability, and topical entities.',
              link: '/content-optimizer',
            },
            {
              step: 'STEP 5',
              title: 'Grow',
              desc: 'Repurpose into YouTube videos, newsletters, and social assets to dominate.',
              link: '/youtube-to-blog',
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 tracking-wider">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500 group-hover:text-indigo-600 flex items-center gap-1">
                <span>Launch tool</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: EDITORIAL GUIDES FROM THE BLOG                     */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Education &amp; Strategy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Latest SEO &amp; Blogging Guides
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                In-depth editorial playbooks from experienced search architects.
              </p>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className="font-semibold text-indigo-600">{post.category}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{post.readingTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{post.author.name}</span>
                    <span className="font-semibold text-indigo-600 flex items-center gap-1">
                      Read Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
