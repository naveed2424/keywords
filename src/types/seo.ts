export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational";

export type DifficultyLabel = "Very Easy" | "Easy" | "Medium" | "Hard" | "Very Hard";

export interface KeywordMetric {
  id: string;
  keyword: string;
  volume: number; // monthly estimate
  difficulty: number; // 0-100
  difficultyLabel: DifficultyLabel;
  cpc: number; // USD
  competition: "Low" | "Medium" | "High";
  intent: SearchIntent;
  trend: number[]; // 12-month relative popularity
  trendChange: number; // percentage change vs last month
  trafficPotential: number;
  opportunityScore: number; // 0-100
  serpFeatures: string[];
  isLongTail: boolean;
  wordCount: number;
  sourceType: "AI Estimate" | "Demo Data" | "Live API";
}

export interface QuestionKeyword {
  id: string;
  type: "who" | "what" | "when" | "where" | "why" | "how" | "can" | "should" | "does" | "is" | "are" | "which";
  question: string;
  volume: number;
  difficulty: number;
  intent: SearchIntent;
}

export interface SerpResultItem {
  position: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  estimatedTraffic?: number;
  domainAuthority?: number;
  wordCount?: number;
  features?: string[];
  weaknessFlag?: string; // e.g. "Thin Content", "Forum result (Reddit/Quora)", "Outdated date", "Poor intent match"
}

export interface SerpAnalysis {
  keyword: string;
  featuresPresent: string[];
  topResults: SerpResultItem[];
  serpWeaknesses: string[];
  rankingOpportunities: string[];
  recommendedContentLength: number;
  sourceType: "AI Estimate" | "Demo Data" | "Live API";
}

export interface KeywordCluster {
  id: string;
  pillarTopic: string;
  supportingCluster: string;
  suggestedUrl: string;
  recommendedArticleTitle: string;
  primaryIntent: SearchIntent;
  keywords: string[];
  internalLinkingTips: string[];
}

export interface ContentIdea {
  id: string;
  title: string;
  category: "How-To" | "Listicle" | "Comparison" | "Beginner Guide" | "Case Study" | "Commercial" | "Deep Dive";
  targetKeyword: string;
  difficultyEstimate: DifficultyLabel;
  estimatedCTR: "High" | "Very High" | "Medium";
  suggestedAngle: string;
  monetizationAngle?: string;
}

export interface KeywordResearchSummary {
  seed: string;
  country: string;
  language: string;
  overview: {
    volume: number;
    difficulty: number;
    difficultyLabel: DifficultyLabel;
    cpc: number;
    competition: "Low" | "Medium" | "High";
    intent: SearchIntent;
    trend: number[];
    trafficPotential: number;
    opportunityScore: number;
    opportunityRationale: string;
    sourceType: "AI Estimate" | "Demo Data" | "Live API";
  };
  keywords: KeywordMetric[];
  questions: QuestionKeyword[];
  clusters: KeywordCluster[];
  contentIdeas: ContentIdea[];
  serpAnalysis: SerpAnalysis;
}

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  category: "seo" | "keywords" | "writing" | "blogging" | "youtube" | "social" | "ecommerce" | "creator";
  description: string;
  shortDesc: string;
  icon: string;
  badge?: string;
  popular?: boolean;
  inputs: {
    name: string;
    label: string;
    type: "text" | "textarea" | "select" | "number";
    placeholder?: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
    required?: boolean;
  }[];
  howItWorks: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  relatedTools: string[];
}

export interface ArticleDraft {
  id: string;
  title: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  brief: string;
  outline: { h2: string; h3s?: string[]; notes?: string }[];
  content: string; // Markdown or rich text
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  schemaJsonLd: string;
  suggestedInternalLinks: string[];
  readingTimeMinutes: number;
  wordCount: number;
  createdAt: string;
}

export interface ContentOptimizationReport {
  score: number; // 0-100
  targetKeyword: string;
  wordCount: number;
  readingGrade: string;
  keywordDensity: number; // %
  headingCounts: { h1: number; h2: number; h3: number };
  checks: {
    passed: boolean;
    title: string;
    description: string;
    recommendation?: string;
  }[];
  topicalGaps: string[];
  entityChecklist: { name: string; found: boolean }[];
  faqSuggestions: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  featuredImage: string;
  content: string; // Markdown formatted
  tableOfContents: { id: string; text: string; level: number }[];
  faqs: { question: string; answer: string }[];
  relatedTools: string[];
  relatedPosts: string[];
}
