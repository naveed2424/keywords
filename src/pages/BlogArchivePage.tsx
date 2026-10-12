import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowRight, User } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { BLOG_POSTS } from '../data/blogData';

export const BlogArchivePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'Keyword Research',
    'SEO',
    'Content Marketing',
    'Affiliate Marketing',
    'YouTube',
    'AI',
  ];

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCat = activeCategory === 'all' || post.category === activeCategory;
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      post.title.toLowerCase().includes(cleanSearch) ||
      post.excerpt.toLowerCase().includes(cleanSearch);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title="SEO, Keyword Research & Creator Growth Blog"
        description="Actionable editorial guides on keyword research, E-E-A-T content strategy, affiliate monetization, and search algorithms."
        canonicalPath="/blog"
      />

      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Search &amp; Content Playbooks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            SEO &amp; Creator Guides
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Data-driven strategies for bloggers, creators, and founders aiming to scale organic traffic and monetization.
          </p>

          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, strategies, and tutorials..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white shadow-xs"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-slate-200/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
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
                    Read Post <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
