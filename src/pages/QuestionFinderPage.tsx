import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, Copy, Check, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { QuestionKeyword } from '../types/seo';
import { DifficultyBadge } from '../components/common/Badges';

export const QuestionFinderPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQ = searchParams.get('q') || 'email marketing';

  const [seed, setSeed] = useState(initialQ);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuestionKeyword[]>([
    { id: 'q-1', type: 'how', question: 'How does email marketing work for small business?', volume: 5400, difficulty: 24, intent: 'informational' },
    { id: 'q-2', type: 'what', question: 'What is the best email marketing automation strategy?', volume: 7200, difficulty: 32, intent: 'informational' },
    { id: 'q-3', type: 'why', question: 'Why is email marketing still important in 2026?', volume: 3800, difficulty: 18, intent: 'informational' },
    { id: 'q-4', type: 'which', question: 'Which email marketing tool has the highest deliverability?', volume: 2900, difficulty: 38, intent: 'commercial' },
    { id: 'q-5', type: 'can', question: 'Can you start email marketing for free?', volume: 4100, difficulty: 21, intent: 'informational' },
    { id: 'q-6', type: 'is', question: 'Is email marketing worth it for content creators?', volume: 3100, difficulty: 19, intent: 'informational' },
    { id: 'q-7', type: 'when', question: 'When is the best time to send email newsletters?', volume: 8900, difficulty: 29, intent: 'informational' },
    { id: 'q-8', type: 'where', question: 'Where can I find free email newsletter templates?', volume: 4600, difficulty: 22, intent: 'informational' },
  ]);

  const handleSearch = async () => {
    if (!seed.trim()) return;
    setLoading(true);
    try {
      const res = await apiService.researchKeyword(seed);
      if (res.questions && res.questions.length > 0) {
        setQuestions(res.questions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const questionTypes = ['all', 'how', 'what', 'why', 'which', 'can', 'is', 'when', 'where', 'who'];

  const filtered = questions.filter((q) => (selectedFilter === 'all' ? true : q.type === selectedFilter));

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`Question Finder — Questions People Ask About ${seed}`}
        description="Discover conversational questions and People Also Ask queries categorized by How, What, Why, Which, Can, and Is."
        canonicalPath="/questions"
      />

      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Voice Search &amp; PAA Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Question Finder
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Uncover questions people type into Google (How, What, Why, Which, Can). Capture featured snippets and optimize FAQ schema.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto"
          >
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Enter seed topic (e.g. coffee brewing)..."
              className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Find Questions</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {questionTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedFilter(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === type
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type === 'all' ? 'All Questions' : type}
            </button>
          ))}
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                    {q.type.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {q.volume.toLocaleString()} /mo
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{q.question}</h3>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <DifficultyBadge difficulty={q.difficulty} />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyText(q.question, q.id)}
                    className="text-slate-500 hover:text-slate-800 font-medium"
                  >
                    {copiedId === q.id ? 'Copied' : 'Copy'}
                  </button>
                  <span>•</span>
                  <a
                    href={`/ai-article-writer?topic=${encodeURIComponent(q.question)}`}
                    className="font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    Write Guide <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
