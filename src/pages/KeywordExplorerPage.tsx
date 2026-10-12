import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Download,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  Filter,
  ArrowUpDown,
  Sparkles,
  BarChart2,
  HelpCircle,
  Network,
  Layers,
  TrendingUp,
  FileText,
  ExternalLink,
  ChevronDown,
  Loader2,
  SlidersHorizontal,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { MetricCard } from '../components/common/MetricCard';
import { DifficultyBadge, IntentBadge, OpportunityScore } from '../components/common/Badges';
import { TrendSparkline, DifficultyGauge } from '../components/common/Charts';
import { KeywordDrawer } from '../components/common/KeywordDrawer';
import { apiService } from '../services/apiService';
import { KeywordResearchSummary, KeywordMetric, SearchIntent } from '../types/seo';
import { useWorkspace } from '../context/WorkspaceContext';

export const KeywordExplorerPage: React.FC = () => {
  // Query param parsing
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get('q') || 'digital marketing';

  const [keywordInput, setKeywordInput] = useState(initialQuery);
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<KeywordResearchSummary | null>(null);

  // Active tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'keywords' | 'questions' | 'difficulty' | 'serp' | 'clusters' | 'content' | 'trends'
  >('overview');

  // Side Drawer for "Ideas for this keyword"
  const [drawerKeyword, setDrawerKeyword] = useState<KeywordMetric | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters for the Keyword Ideas Table
  const [filterSearch, setFilterSearch] = useState('');
  const [filterIntent, setFilterIntent] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [onlyLongTail, setOnlyLongTail] = useState(false);
  const [onlyQuestions, setOnlyQuestions] = useState(false);
  const [sortField, setSortField] = useState<keyof KeywordMetric>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  // Selected row checkboxes for batch actions
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [copiedBatch, setCopiedBatch] = useState(false);

  const { isKeywordSaved, saveKeyword, removeKeyword, addRecentSearch } = useWorkspace();

  // Perform research
  const executeResearch = async (term: string) => {
    const clean = term.trim();
    if (!clean) return;

    setLoading(true);
    addRecentSearch(clean);

    try {
      const result = await apiService.researchKeyword(clean, selectedCountry, selectedLanguage);
      setData(result);
      setSelectedRowIds([]);
    } catch (err) {
      console.error('Research error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeResearch(initialQuery);
  }, []);

  // Filtered & Sorted Keywords
  const filteredKeywords = useMemo(() => {
    if (!data?.keywords) return [];

    return data.keywords
      .filter((kw) => {
        if (filterSearch && !kw.keyword.toLowerCase().includes(filterSearch.toLowerCase())) {
          return false;
        }
        if (filterIntent !== 'all' && kw.intent !== filterIntent) {
          return false;
        }
        if (filterDifficulty === 'easy' && kw.difficulty >= 35) return false;
        if (filterDifficulty === 'medium' && (kw.difficulty < 35 || kw.difficulty >= 60)) return false;
        if (filterDifficulty === 'hard' && kw.difficulty < 60) return false;
        if (onlyLongTail && !kw.isLongTail) return false;
        if (onlyQuestions && !/^(how|what|why|who|when|where|which|can|is)\b/i.test(kw.keyword)) return false;
        return true;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [data, filterSearch, filterIntent, filterDifficulty, onlyLongTail, onlyQuestions, sortField, sortAsc]);

  const handleSort = (field: keyof KeywordMetric) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(filteredKeywords.map((k) => k.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const toggleRowSelect = (id: string) => {
    setSelectedRowIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const exportSelectedCSV = () => {
    const rowsToExport = data?.keywords.filter((k) =>
      selectedRowIds.length > 0 ? selectedRowIds.includes(k.id) : true
    );
    if (!rowsToExport || rowsToExport.length === 0) return;

    const headers = ['Keyword', 'Search Volume', 'Keyword Difficulty', 'CPC ($)', 'Intent', 'Opportunity Score'];
    const rows = rowsToExport.map((k) => [
      `"${k.keyword.replace(/"/g, '""')}"`,
      k.volume,
      k.difficulty,
      k.cpc,
      `"${k.intent}"`,
      k.opportunityScore,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `keywords_${data?.seed || 'export'}_${Date.now()}.csv`;
    link.click();
  };

  const copySelectedKeywords = () => {
    const list = data?.keywords
      .filter((k) => (selectedRowIds.length > 0 ? selectedRowIds.includes(k.id) : true))
      .map((k) => k.keyword)
      .join('\n');
    if (!list) return;

    navigator.clipboard.writeText(list);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  const openDrawer = (kw: KeywordMetric) => {
    setDrawerKeyword(kw);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead
        title={`Keyword Explorer: ${data?.seed || keywordInput} Research & Search Volume`}
        description={`Analyze monthly search volume, keyword difficulty, CPC, and intent for "${data?.seed || keywordInput}".`}
        canonicalPath="/keyword-explorer"
      />

      {/* Header Search Bar Area */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Flagship Tool
                </span>
                <span className="text-xs text-slate-400">• Free AI SEO Research</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Keyword Explorer
              </h1>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeResearch(keywordInput);
              }}
              className="flex flex-wrap sm:flex-nowrap items-center gap-2 max-w-3xl w-full"
            >
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Enter seed keyword (e.g. coffee shop marketing)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                />
              </div>

              {/* Country Selector */}
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-600"
              >
                <option value="United States">🇺🇸 United States</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="France">🇫🇷 France</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Worldwide">🌐 Worldwide</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>{loading ? 'Analyzing...' : 'Analyze Keyword'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Research Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading && (
          <div className="py-24 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">Researching &ldquo;{keywordInput}&rdquo;...</h3>
            <p className="text-xs text-slate-500 mt-1">
              Building intent vectors, difficulty heuristics, questions, and topic clusters.
            </p>
          </div>
        )}

        {!loading && data && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                <MetricCard
                  label="Search Volume"
                  value={data.overview.volume.toLocaleString()}
                  subValue="Estimated monthly searches"
                  trend="+14% YoY"
                  trendPositive={true}
                  explanation="Estimated average monthly searches based on historical query velocity and search trends."
                  sourceType={data.overview.sourceType}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                <MetricCard
                  label="Keyword Difficulty"
                  value={`${data.overview.difficulty}/100`}
                  subValue={data.overview.difficultyLabel}
                  explanation="Proprietary 0-100 score estimating backlink profile and domain authority needed to reach Page 1."
                  sourceType={data.overview.sourceType}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                <MetricCard
                  label="Est. CPC"
                  value={`$${data.overview.cpc.toFixed(2)}`}
                  subValue="Ad bid estimate"
                  explanation="Average cost per click advertisers pay for sponsored search ads on this term."
                  sourceType={data.overview.sourceType}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                <MetricCard
                  label="Intent"
                  value={data.overview.intent.slice(0, 4).toUpperCase()}
                  subValue={data.overview.intent}
                  explanation="The primary goal of searchers when typing this phrase: informational, commercial, or transactional."
                  sourceType={data.overview.sourceType}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                <MetricCard
                  label="Opportunity Score"
                  value={`${data.overview.opportunityScore}/100`}
                  subValue="High ranking opening"
                  explanation="Calculated formula combining search volume against competitive resistance."
                  sourceType={data.overview.sourceType}
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 bg-white rounded-xl shadow-xs px-2 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'overview', label: 'Overview', icon: Sparkles },
                { id: 'keywords', label: `Keyword Ideas (${data.keywords.length})`, icon: Search },
                { id: 'questions', label: `Questions (${data.questions.length})`, icon: HelpCircle },
                { id: 'difficulty', label: 'Difficulty Breakdown', icon: BarChart2 },
                { id: 'serp', label: 'SERP Analyzer', icon: Layers },
                { id: 'clusters', label: `Clusters (${data.clusters.length})`, icon: Network },
                { id: 'content', label: `Content Ideas (${data.contentIdeas.length})`, icon: FileText },
                { id: 'trends', label: 'Trend Trajectory', icon: TrendingUp },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 py-3.5 px-3.5 border-b-2 transition-all whitespace-nowrap ${
                      isActive
                        ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* TAB: OVERVIEW                                                 */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Cols: Opportunity Rationale & Quick Ideas */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Opportunity Banner */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-base font-bold text-slate-900">
                        Strategic Assessment for &ldquo;{data.seed}&rdquo;
                      </h3>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {data.overview.opportunityRationale}
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <DifficultyBadge
                          difficulty={data.overview.difficulty}
                          label={data.overview.difficultyLabel}
                        />
                        <IntentBadge intent={data.overview.intent} />
                      </div>

                      <a
                        href={`/ai-article-writer?topic=${encodeURIComponent(data.seed)}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Draft Article on &ldquo;{data.seed}&rdquo;</span>
                      </a>
                    </div>
                  </div>

                  {/* Top Keyword Opportunities Preview */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-slate-900">
                        Top Low-Hanging Fruit Keywords
                      </h3>
                      <button
                        onClick={() => setActiveTab('keywords')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        View all {data.keywords.length} &rarr;
                      </button>
                    </div>

                    <div className="space-y-2">
                      {data.keywords.slice(0, 5).map((kw) => (
                        <div
                          key={kw.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all text-sm group"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => openDrawer(kw)}
                              className="text-amber-500 hover:text-amber-600 p-1"
                              title="Ideas for this keyword"
                            >
                              <Lightbulb className="w-4 h-4" />
                            </button>
                            <span
                              onClick={() => openDrawer(kw)}
                              className="font-semibold text-slate-900 cursor-pointer hover:text-indigo-600"
                            >
                              {kw.keyword}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <span className="font-mono text-slate-500">{kw.volume.toLocaleString()} /mo</span>
                            <DifficultyBadge difficulty={kw.difficulty} label={kw.difficultyLabel} />
                            <OpportunityScore score={kw.opportunityScore} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Trend Sparkline & Intent Breakdown */}
                <div className="space-y-6">
                  {/* Gauge Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col items-center text-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      Difficulty Level
                    </h4>
                    <DifficultyGauge score={data.overview.difficulty} size={120} />
                    <div className="mt-4">
                      <span className="text-sm font-bold text-slate-900">
                        {data.overview.difficultyLabel} Competition
                      </span>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        {data.overview.difficulty < 35
                          ? 'Accessible for newer blogs with focused, high-depth guides.'
                          : 'Requires established domain equity or specialized subtopic clustering.'}
                      </p>
                    </div>
                  </div>

                  {/* 12-Month Trend */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      12-Month Search Velocity
                    </h4>
                    <TrendSparkline data={data.overview.trend} height={70} showLabels={true} />
                    <p className="text-xs text-slate-500 mt-3">
                      Search interest is currently positive with sustained steady demand.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: KEYWORD IDEAS TABLE                                      */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'keywords' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Table Control Bar */}
                <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Search inside table */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={filterSearch}
                        onChange={(e) => setFilterSearch(e.target.value)}
                        placeholder="Filter terms..."
                        className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    {/* Intent Filter */}
                    <select
                      value={filterIntent}
                      onChange={(e) => setFilterIntent(e.target.value)}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="all">All Intents</option>
                      <option value="informational">Informational</option>
                      <option value="commercial">Commercial</option>
                      <option value="transactional">Transactional</option>
                    </select>

                    {/* Difficulty Filter */}
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="all">All Difficulties</option>
                      <option value="easy">Easy (&lt; 35)</option>
                      <option value="medium">Medium (35 - 59)</option>
                      <option value="hard">Hard (60+)</option>
                    </select>

                    {/* Long Tail Checkbox */}
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer ml-1">
                      <input
                        type="checkbox"
                        checked={onlyLongTail}
                        onChange={(e) => setOnlyLongTail(e.target.checked)}
                        className="rounded text-indigo-600"
                      />
                      <span>Long-Tail Only</span>
                    </label>

                    {/* Questions Checkbox */}
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer ml-1">
                      <input
                        type="checkbox"
                        checked={onlyQuestions}
                        onChange={(e) => setOnlyQuestions(e.target.checked)}
                        className="rounded text-indigo-600"
                      />
                      <span>Questions Only</span>
                    </label>
                  </div>

                  {/* Actions: Copy & CSV Export */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copySelectedKeywords}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
                    >
                      {copiedBatch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBatch ? 'Copied' : `Copy (${selectedRowIds.length || 'All'})`}</span>
                    </button>

                    <button
                      onClick={exportSelectedCSV}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* The Responsive Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4 w-10">
                          <input
                            type="checkbox"
                            checked={
                              filteredKeywords.length > 0 && selectedRowIds.length === filteredKeywords.length
                            }
                            onChange={handleSelectAll}
                            className="rounded text-indigo-600"
                          />
                        </th>
                        <th className="py-3 px-4 w-10">Save</th>
                        <th
                          className="py-3 px-4 cursor-pointer hover:text-slate-900"
                          onClick={() => handleSort('keyword')}
                        >
                          <div className="flex items-center gap-1">
                            <span>Keyword</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th
                          className="py-3 px-4 cursor-pointer hover:text-slate-900 text-right"
                          onClick={() => handleSort('volume')}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>Volume</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th
                          className="py-3 px-4 cursor-pointer hover:text-slate-900"
                          onClick={() => handleSort('difficulty')}
                        >
                          <div className="flex items-center gap-1">
                            <span>Difficulty</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th
                          className="py-3 px-4 cursor-pointer hover:text-slate-900 text-right"
                          onClick={() => handleSort('cpc')}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>CPC</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4">Intent</th>
                        <th className="py-3 px-4">12-Mo Trend</th>
                        <th
                          className="py-3 px-4 cursor-pointer hover:text-slate-900 text-right"
                          onClick={() => handleSort('opportunityScore')}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>Opp Score</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center">Ideas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredKeywords.map((kw) => {
                        const isSelected = selectedRowIds.includes(kw.id);
                        const isSaved = isKeywordSaved(kw.keyword);

                        return (
                          <tr
                            key={kw.id}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              isSelected ? 'bg-indigo-50/30' : ''
                            }`}
                          >
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleRowSelect(kw.id)}
                                className="rounded text-indigo-600"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => (isSaved ? removeKeyword(kw.id) : saveKeyword(kw))}
                                className={`transition-colors ${
                                  isSaved ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-600'
                                }`}
                                title={isSaved ? 'Saved to Workspace' : 'Save keyword'}
                              >
                                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                              </button>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900">
                              <button
                                onClick={() => openDrawer(kw)}
                                className="hover:text-indigo-600 text-left cursor-pointer transition-colors"
                              >
                                {kw.keyword}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-slate-700">
                              {kw.volume.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                              <DifficultyBadge difficulty={kw.difficulty} label={kw.difficultyLabel} />
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-slate-700">
                              ${kw.cpc.toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              <IntentBadge intent={kw.intent} />
                            </td>
                            <td className="py-3 px-4">
                              <div className="w-24">
                                <TrendSparkline data={kw.trend} height={24} />
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <OpportunityScore score={kw.opportunityScore} />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => openDrawer(kw)}
                                className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-colors"
                                title="Ideas for this keyword"
                              >
                                <Lightbulb className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Showing {filteredKeywords.length} of {data.keywords.length} keywords
                  </span>
                  <span>Data: AI Heuristic Estimate</span>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: QUESTIONS                                                */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs">
                  People ask these high-intent questions. Use them to capture Google &ldquo;People Also Ask&rdquo; (PAA) rich snippets or build FAQ sections.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.questions.map((q) => (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                            {q.type.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{q.volume.toLocaleString()} /mo</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{q.question}</h4>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <DifficultyBadge difficulty={q.difficulty} />
                        <a
                          href={`/ai-article-writer?topic=${encodeURIComponent(q.question)}`}
                          className="font-semibold text-purple-600 hover:text-purple-800"
                        >
                          Write FAQ &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: DIFFICULTY BREAKDOWN                                     */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'difficulty' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col items-center text-center">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Difficulty Score
                  </h4>
                  <DifficultyGauge score={data.overview.difficulty} size={140} />
                  <div className="mt-6">
                    <span className="text-lg font-bold text-slate-900">
                      {data.overview.difficultyLabel} Tier
                    </span>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Evaluates on-page intent saturation, domain authority resistance, and content depth.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Why is &ldquo;{data.seed}&rdquo; rated {data.overview.difficultyLabel}?
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {data.overview.opportunityRationale}
                    </p>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-6 mb-2">
                      Ranking Strategy &amp; Recommended Actions
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>
                          <strong>Content Depth:</strong> Target at least 2,400+ words covering foundational steps and actionable 2026 workflows.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>
                          <strong>Topical Clustering:</strong> Build 3 supporting sub-posts linking back to this central guide.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>
                          <strong>E-E-A-T Signal:</strong> Add original templates, real numbers, and transparent author credentials.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: SERP ANALYZER                                            */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'serp' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    SERP Weakness Analysis &amp; Opportunities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs">
                      <h4 className="font-bold text-amber-900 uppercase tracking-wider mb-2">
                        Detected SERP Weaknesses
                      </h4>
                      <ul className="space-y-1.5 text-amber-800">
                        {data.serpAnalysis.serpWeaknesses.map((w, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span>⚠</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs">
                      <h4 className="font-bold text-emerald-900 uppercase tracking-wider mb-2">
                        Your Ranking Advantages
                      </h4>
                      <ul className="space-y-1.5 text-emerald-800">
                        {data.serpAnalysis.rankingOpportunities.map((o, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span>✓</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Simulated Top Results */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Simulated Page 1 Search Results
                  </h4>
                  {data.serpAnalysis.topResults.map((item) => (
                    <div
                      key={item.position}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="font-mono font-bold text-slate-400">#{item.position}</span>
                        <span className="text-emerald-700 font-medium">{item.domain}</span>
                        {item.domainAuthority && (
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                            DA: {item.domainAuthority}
                          </span>
                        )}
                        {item.wordCount && (
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                            {item.wordCount} words
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-indigo-700 hover:underline">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.snippet}</p>

                      {item.weaknessFlag && (
                        <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-amber-700 flex items-center gap-1.5">
                          <span className="font-semibold">Weakness:</span>
                          <span>{item.weaknessFlag}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: CLUSTERS                                                 */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'clusters' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.clusters.map((cluster) => (
                  <div
                    key={cluster.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {cluster.supportingCluster}
                        </span>
                        <IntentBadge intent={cluster.primaryIntent} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {cluster.recommendedArticleTitle}
                      </h3>
                      <div className="text-xs font-mono text-slate-400 mt-1">URL: {cluster.suggestedUrl}</div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Keywords in this Cluster:
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {cluster.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Pillar Topic: {cluster.pillarTopic}</span>
                      <a
                        href={`/ai-article-writer?title=${encodeURIComponent(
                          cluster.recommendedArticleTitle
                        )}&keyword=${encodeURIComponent(cluster.keywords[0])}`}
                        className="font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Create This Pillar &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: CONTENT IDEAS                                            */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'content' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {data.contentIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {idea.category}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600">
                          CTR: {idea.estimatedCTR}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        <strong>Angle:</strong> {idea.suggestedAngle}
                      </p>
                      {idea.monetizationAngle && (
                        <p className="text-xs text-indigo-600 mt-1">
                          <strong>Monetization:</strong> {idea.monetizationAngle}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Target: {idea.targetKeyword}</span>
                      <a
                        href={`/ai-article-writer?title=${encodeURIComponent(
                          idea.title
                        )}&keyword=${encodeURIComponent(idea.targetKeyword)}`}
                        className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        Write Full Article &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB: TRENDS                                                   */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'trends' && (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="max-w-2xl mx-auto text-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    12-Month Search Volume History for &ldquo;{data.seed}&rdquo;
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Normalized index representing relative search frequency over the last 12 calendar months.
                  </p>
                </div>

                <div className="max-w-xl mx-auto flex flex-col items-center">
                  <TrendSparkline data={data.overview.trend} height={120} showLabels={true} />
                  <div className="mt-6 text-center text-xs text-slate-600">
                    <strong>Trend Evaluation:</strong> Search frequency has climbed{' '}
                    <span className="text-emerald-600 font-bold">+{data.keywords[0]?.trendChange || 14}%</span> over the past 90 days.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Side Action Drawer (when keyword row or bulb is clicked) */}
      <KeywordDrawer
        keyword={drawerKeyword}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
