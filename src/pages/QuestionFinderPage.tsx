import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, Copy, Check, ArrowRight, Loader2, Sparkles, Globe } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { apiService } from '../services/apiService';
import { QuestionKeyword } from '../types/seo';
import { DifficultyBadge } from '../components/common/Badges';

export const QuestionFinderPage: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQ = searchParams.get('q') || 'email marketing';
  const initialCountry = searchParams.get('country') || 'United States';

  const [seed, setSeed] = useState(initialQ);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionKeyword[]>([]);

  const handleSearch = async (termToUse?: string, countryToUse?: string) => {
    const term = (termToUse || seed).trim();
    if (!term) return;

    const country = countryToUse || selectedCountry;
    setLoading(true);

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('q', term);
      url.searchParams.set('country', country);
      window.history.replaceState({}, '', url.toString());
    } catch {}

    try {
      const res = await apiService.researchKeyword(term, country);
      if (res.questions && res.questions.length > 0) {
        setQuestions(res.questions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(initialQ, initialCountry);
  }, []);

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
        title={`Question Finder: Questions People Ask About ${seed} in ${selectedCountry}`}
        description={`Discover conversational search questions and People Also Ask queries about ${seed} in ${selectedCountry}.`}
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
            Uncover questions real people type into Google (How, What, Why, Which, Can). Capture featured snippets and optimize FAQ schema.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-6 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Enter seed topic (e.g. coffee brewing, crypto, fitness)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:bg-white"
              />
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => {
                const nextCountry = e.target.value;
                setSelectedCountry(nextCountry);
                handleSearch(seed, nextCountry);
              }}
              className="px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-purple-600 cursor-pointer"
            >
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="France">🇫🇷 France</option>
              <option value="India">🇮🇳 India</option>
              <option value="Worldwide">🌐 Worldwide</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Find Questions</span>
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading && (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">Searching questions for &ldquo;{seed}&rdquo; in {selectedCountry}...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Category Pill Filters */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
              {questionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedFilter(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedFilter === type
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {type === 'all' ? `All Questions (${questions.length})` : type}
                </button>
              ))}
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700">
                        {q.type.toUpperCase()}
                      </span>
                      <DifficultyBadge difficulty={q.difficulty} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{q.question}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500">{q.volume.toLocaleString()} searches/mo</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyText(q.question, q.id)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                        title="Copy question text"
                      >
                        {copiedId === q.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <a
                        href={`/ai-article-writer?topic=${encodeURIComponent(q.question)}`}
                        className="inline-flex items-center gap-1 font-bold text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <span>Write Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
