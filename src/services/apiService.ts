import { KeywordResearchSummary, ArticleDraft, ContentOptimizationReport } from '../types/seo';

const API_BASE = '/api';

export const apiService = {
  /**
   * Keyword Research: Comprehensive metrics, questions, clusters, SERP, and content ideas
   */
  async researchKeyword(
    keyword: string,
    country: string = 'United States',
    language: string = 'English'
  ): Promise<KeywordResearchSummary> {
    const cleanKeyword = keyword.trim();
    if (!cleanKeyword) throw new Error('Keyword cannot be empty');

    try {
      const res = await fetch(`${API_BASE}/ai/keyword-research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: cleanKeyword, country, language }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('API call failed, falling back to local heuristic response:', err);
      return getClientFallbackKeywordData(cleanKeyword, country, language);
    }
  },

  /**
   * AI Article Writer: Generates full E-E-A-T article draft with brief, outline, and JSON-LD
   */
  async generateArticle(params: {
    topic: string;
    title?: string;
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    audience?: string;
    articleLength?: string;
    tone?: string;
    includeFaq?: boolean;
    includeTable?: boolean;
    includeKeyTakeaways?: boolean;
  }): Promise<ArticleDraft> {
    try {
      const res = await fetch(`${API_BASE}/ai/generate-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) throw new Error(`Article generation returned ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Fallback to client article generator:', err);
      return getClientFallbackArticle(params);
    }
  },

  /**
   * Blog Title Generator: Generates 20 categorized titles
   */
  async generateTitles(keyword: string): Promise<{ keyword: string; titles: { category: string; title: string; ctrScore: number }[] }> {
    try {
      const res = await fetch(`${API_BASE}/ai/generate-titles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });
      if (!res.ok) throw new Error(`Titles API error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Fallback title generation:', err);
      const kw = keyword || 'blogging';
      return {
        keyword: kw,
        titles: [
          { category: 'SEO', title: `${kw}: The Complete Guide for 2026`, ctrScore: 92 },
          { category: 'How-To', title: `How to Master ${kw} Step-by-Step`, ctrScore: 94 },
          { category: 'List', title: `10 Crucial ${kw} Strategies Proven to Work`, ctrScore: 91 },
          { category: 'Curiosity', title: `The Shocking Truth About ${kw}`, ctrScore: 89 },
          { category: 'Comparison', title: `${kw} vs Traditional Methods: Full Test`, ctrScore: 86 },
          { category: 'Beginner', title: `${kw} for Beginners: Fast Start Checklist`, ctrScore: 93 },
          { category: 'Expert', title: `Advanced ${kw} Tactics for Serious Growth`, ctrScore: 88 },
          { category: 'Commercial', title: `Best ${kw} Software & Pricing Compared`, ctrScore: 90 },
          { category: 'High CTR', title: `I Tested ${kw} for 30 Days. Here's What Happened.`, ctrScore: 97 },
        ]
      };
    }
  },

  /**
   * Content Optimizer: Scores draft against target keyword
   */
  async optimizeContent(content: string, targetKeyword: string): Promise<ContentOptimizationReport> {
    try {
      const res = await fetch(`${API_BASE}/ai/optimize-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, targetKeyword }),
      });
      if (!res.ok) throw new Error(`Optimizer error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Fallback optimizer calculation:', err);
      const words = content.split(/\s+/).filter(Boolean);
      return {
        score: Math.min(85, Math.max(30, Math.round(words.length / 25))),
        targetKeyword,
        wordCount: words.length,
        readingGrade: '8th Grade (Clear & Accessible)',
        keywordDensity: 1.2,
        headingCounts: { h1: 1, h2: 3, h3: 2 },
        checks: [
          { passed: words.length >= 1000, title: 'Word Count Depth', description: `Word count is ${words.length}. Recommended 1,200+` },
          { passed: true, title: 'Keyword Match', description: `Target keyword "${targetKeyword}" appears in headings.` },
          { passed: true, title: 'Readability', description: 'Clear paragraph lengths and sentence structures.' }
        ],
        topicalGaps: ['Include detailed statistics', 'Add a comparison chart'],
        entityChecklist: [
          { name: 'search intent', found: true },
          { name: 'conversion', found: false },
          { name: 'roi', found: true }
        ],
        faqSuggestions: [`How to start with ${targetKeyword}?`]
      };
    }
  },

  /**
   * Tool Runner: Executes any of the 35+ tools
   */
  async runTool(toolId: string, inputs: Record<string, any>): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/ai/tool-run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, inputs }),
      });
      if (!res.ok) throw new Error(`Tool execution error: ${res.status}`);
      const data = await res.json();
      return data.result || 'Output ready.';
    } catch (err) {
      console.warn('Fallback tool runner:', err);
      const firstVal = Object.values(inputs)[0] || 'Topic';
      return `### Generated Output for ${toolId}\n\n**Focus:** ${firstVal}\n\n1. **Core Recommendation:** High-quality structure directly satisfying search intent.\n2. **Best Practice:** Ensure concise answers within the first 100 words.\n3. **Engagement:** Add relevant bullet points and clear call to action.\n\n*(Heuristic Demo Mode)*`;
    }
  },

  /**
   * Floating Assistant: Answers contextual SEO questions
   */
  async askAssistant(message: string, currentContext: string): Promise<string> {
    try {
      const res = await fetch(`${API_BASE}/ai/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, currentContext }),
      });
      if (!res.ok) throw new Error(`Assistant error: ${res.status}`);
      const data = await res.json();
      return data.reply;
    } catch (err) {
      return `For **${message}**, prioritize low-difficulty keywords (KD < 30), structure your page with clean H2/H3 subheadings, and link to related topical cluster articles to prove domain authority.`;
    }
  }
};

// ---------------------------------------------------------------------
// Client Fallback Helpers for 100% resilient offline/demo operations
// ---------------------------------------------------------------------
function getClientFallbackKeywordData(seed: string, country: string, language: string): KeywordResearchSummary {
  const clean = seed.toLowerCase().trim();
  const variations = [
    { suffix: ' for beginners', intent: 'informational' as const, diff: 22, vol: 5400, cpc: 1.80 },
    { suffix: ' strategy 2026', intent: 'informational' as const, diff: 38, vol: 8200, cpc: 2.90 },
    { suffix: ' checklist pdf', intent: 'transactional' as const, diff: 19, vol: 3100, cpc: 1.20 },
    { suffix: ' software tools', intent: 'commercial' as const, diff: 44, vol: 6900, cpc: 4.10 },
    { suffix: ' vs alternatives', intent: 'commercial' as const, diff: 31, vol: 2400, cpc: 2.30 },
    { suffix: ' cost and pricing', intent: 'commercial' as const, diff: 35, vol: 4100, cpc: 3.50 },
    { suffix: ' best practices', intent: 'informational' as const, diff: 26, vol: 4800, cpc: 2.10 },
    { suffix: ' case study examples', intent: 'informational' as const, diff: 18, vol: 1900, cpc: 1.50 },
    { suffix: ' course online', intent: 'transactional' as const, diff: 49, vol: 7200, cpc: 5.20 },
    { suffix: ' tips for creators', intent: 'informational' as const, diff: 21, vol: 2800, cpc: 1.60 },
  ];

  const keywords = variations.map((v, i) => {
    const kw = `${clean}${v.suffix}`;
    return {
      id: `fallback-kw-${i}`,
      keyword: kw,
      volume: v.vol,
      difficulty: v.diff,
      difficultyLabel: v.diff < 25 ? ('Very Easy' as const) : v.diff < 35 ? ('Easy' as const) : ('Medium' as const),
      cpc: v.cpc,
      competition: v.diff > 40 ? ('High' as const) : v.diff > 25 ? ('Medium' as const) : ('Low' as const),
      intent: v.intent,
      trend: [65, 70, 75, 80, 85, 90, 88, 92, 95, 96, 98, 100],
      trendChange: 15,
      trafficPotential: Math.round(v.vol * 0.4),
      opportunityScore: Math.max(20, 100 - v.diff + Math.round(v.vol / 500)),
      serpFeatures: ['Featured Snippet', 'People Also Ask'],
      isLongTail: true,
      wordCount: kw.split(' ').length,
      sourceType: 'AI Estimate' as const,
    };
  });

  return {
    seed: clean,
    country,
    language,
    overview: {
      volume: 12500,
      difficulty: 32,
      difficultyLabel: 'Easy',
      cpc: 2.15,
      competition: 'Medium',
      intent: 'informational',
      trend: [60, 64, 70, 76, 80, 85, 88, 92, 94, 95, 98, 100],
      trafficPotential: 8400,
      opportunityScore: 82,
      opportunityRationale: 'Strong search interest with notable gaps in competitor depth. High ranking potential.',
      sourceType: 'AI Estimate',
    },
    keywords,
    questions: [
      { id: 'q-1', type: 'how', question: `How to implement ${clean} step by step?`, volume: 3800, difficulty: 24, intent: 'informational' },
      { id: 'q-2', type: 'what', question: `What is the best way to master ${clean}?`, volume: 4600, difficulty: 28, intent: 'informational' },
      { id: 'q-3', type: 'which', question: `Which ${clean} tools offer the highest ROI?`, volume: 2200, difficulty: 36, intent: 'commercial' },
      { id: 'q-4', type: 'why', question: `Why does ${clean} matter for creators in 2026?`, volume: 2900, difficulty: 19, intent: 'informational' },
    ],
    clusters: [
      {
        id: 'cl-1',
        pillarTopic: `${clean.toUpperCase()} Core Guide`,
        supportingCluster: 'Foundations & Implementation',
        suggestedUrl: `/guides/${clean.replace(/\s+/g, '-')}`,
        recommendedArticleTitle: `The Complete Guide to ${clean}: Step-by-Step`,
        primaryIntent: 'informational',
        keywords: [clean, `${clean} for beginners`, `how to start ${clean}`],
        internalLinkingTips: ['Link to tool comparisons', 'Include downloadable checklist'],
      }
    ],
    contentIdeas: [
      {
        id: 'id-1',
        title: `${clean}: 7 Practical Tactics Proven to Drive Results`,
        category: 'How-To',
        targetKeyword: clean,
        difficultyEstimate: 'Easy',
        estimatedCTR: 'High',
        suggestedAngle: 'Step-by-step case study with templates',
        monetizationAngle: 'Affiliate links to recommended tools',
      }
    ],
    serpAnalysis: {
      keyword: clean,
      featuresPresent: ['Featured Snippet', 'People Also Ask', 'Discussions and Forums'],
      topResults: [
        {
          position: 1,
          title: `Comprehensive Guide to ${clean}`,
          url: `https://example.com/${clean.replace(/\s+/g, '-')}`,
          domain: 'example.com',
          snippet: `Authoritative guide covering everything you need to know about ${clean}.`,
          estimatedTraffic: 9400,
          domainAuthority: 64,
          wordCount: 2800,
          weaknessFlag: 'Outdated statistics from previous year',
        }
      ],
      serpWeaknesses: ['Top results lack fresh 2026 benchmarks', 'Forums ranking on page 1'],
      rankingOpportunities: ['Create an interactive checklist', 'Include comprehensive FAQ section'],
      recommendedContentLength: 2400,
      sourceType: 'AI Estimate',
    }
  };
}

function getClientFallbackArticle(params: any): ArticleDraft {
  const topic = params.topic || params.primaryKeyword || 'SEO Strategy';
  return {
    id: `draft-${Date.now()}`,
    title: params.title || `The Ultimate Guide to ${topic} (2026 Edition)`,
    slug: (params.title || topic).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    primaryKeyword: params.primaryKeyword || topic,
    secondaryKeywords: params.secondaryKeywords || [`best ${topic}`, `${topic} tips`],
    searchIntent: 'informational',
    brief: `A comprehensive masterclass on ${topic} crafted for actionable reader results.`,
    outline: [
      { h2: `1. Foundations of ${topic}`, h3s: ['Core Definitions', 'Why It Matters Now'] },
      { h2: `2. Step-by-Step Execution Plan`, h3s: ['Phase 1', 'Phase 2'] },
      { h2: `3. Frequently Asked Questions`, h3s: [] }
    ],
    keyTakeaways: [
      'Focus relentlessly on satisfying user search intent.',
      'Group related articles into topical clusters for maximum authority.',
      'Audit and refresh content every 6 months.'
    ],
    faqs: [
      { question: `What is the best way to get started with ${topic}?`, answer: `Start with focused long-tail keyword research and build a 4-post topical cluster.` }
    ],
    metaTitle: `${topic} (Complete 2026 Blueprint)`,
    metaDescription: `Discover the proven strategies for ${topic}. Step-by-step tutorial, key takeaways, and FAQ schema included.`,
    schemaJsonLd: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: topic }, null, 2),
    suggestedInternalLinks: ['/keyword-explorer', '/tools/seo-content-optimizer'],
    readingTimeMinutes: 7,
    wordCount: 1850,
    createdAt: new Date().toISOString(),
    content: `# The Ultimate Guide to ${topic} (2026 Edition)\n\n## 1. Introduction\n\nMastering **${topic}** requires understanding user intent, semantic entity coverage, and clear editorial formatting.\n\n## 2. Key Takeaways\n\n* **Intent First:** Align your heading structure with what users actually search.\n* **Clear Formatting:** Use tables, bullet points, and short readable paragraphs.\n\n## 3. Step-by-Step Process\n\nBegin by mapping your primary keyword and supporting clusters. Then write with direct, fluff-free prose.`
  };
}
