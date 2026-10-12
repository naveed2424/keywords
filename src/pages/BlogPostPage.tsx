import React from 'react';
import {
  Clock,
  Calendar,
  User,
  ChevronRight,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Wrench,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogData';
import { getToolBySlug } from '../data/toolsData';

interface BlogPostPageProps {
  slug: string;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const post = getBlogPostBySlug(slug) || BLOG_POSTS[0];

  const relatedTools = post.relatedTools
    .map((s) => getToolBySlug(s))
    .filter(Boolean);

  const relatedPosts = post.relatedPosts
    .map((s) => getBlogPostBySlug(s))
    .filter(Boolean);

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: {
            '@type': 'Person',
            name: post.author.name,
            jobTitle: post.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'RankPilot',
          },
        }}
      />

      {/* Header Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <a href="/" className="hover:text-slate-700">Home</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="/blog" className="hover:text-slate-700">Blog</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-semibold truncate max-w-xs">{post.category}</span>
        </div>

        {/* H1 Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
          {post.title}
        </h1>

        {/* Post Metadata & Author Bar */}
        <div className="mt-6 pb-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <div className="font-bold text-slate-900">{post.author.name}</div>
              <div className="text-slate-500">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Updated {post.updatedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="my-8 rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-sm">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Layout: TOC + Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Table of Contents (Desktop Sticky Sidebar) */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Table of Contents
              </h4>
              <nav className="space-y-2 text-xs">
                {post.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-slate-600 hover:text-indigo-600 transition-colors py-0.5 leading-snug"
                  >
                    {item.text}
                  </a>
                ))}
              </nav>

              {/* Quick Tool Promotion in Sidebar */}
              {relatedTools.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Recommended Free Tool
                  </h5>
                  <a
                    href={`/tools/${relatedTools[0]?.slug}`}
                    className="block p-3 rounded-xl bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-200/60 text-indigo-950 transition-colors"
                  >
                    <div className="font-bold text-xs">{relatedTools[0]?.name}</div>
                    <p className="text-[11px] text-indigo-700/80 mt-1 line-clamp-2">
                      {relatedTools[0]?.shortDesc}
                    </p>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Article Markdown Prose Content */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans text-sm sm:text-base space-y-4">
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Box */}
            <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Written by {post.author.name}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {post.author.role} at RankPilot. Specializes in technical search architecture, heuristic intent models, and high-velocity organic content strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
