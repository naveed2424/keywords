import { ToolDefinition } from '../types/seo';

export const TOOLS_CATEGORIES = [
  { id: 'all', name: 'All Tools', count: 35 },
  { id: 'seo', name: 'SEO & SERP', count: 8 },
  { id: 'keywords', name: 'Keyword Research', count: 6 },
  { id: 'writing', name: 'AI Writing', count: 7 },
  { id: 'blogging', name: 'Blogging & Content', count: 5 },
  { id: 'youtube', name: 'YouTube & Video', count: 5 },
  { id: 'social', name: 'Social Media', count: 5 },
  { id: 'ecommerce', name: 'Ecommerce & KDP', count: 4 },
  { id: 'creator', name: 'Creator & Email', count: 4 },
];

export const TOOLS_DATA: ToolDefinition[] = [
  // 1. Keyword Explorer (Flagship)
  {
    id: 'keyword-explorer',
    name: 'Keyword Explorer',
    slug: 'keyword-explorer',
    category: 'keywords',
    badge: 'FLAGSHIP',
    popular: true,
    icon: 'Search',
    shortDesc: 'Deep keyword metrics, difficulty, search intent, and opportunity scores.',
    description: 'Discover thousands of low-competition keyword opportunities with estimated monthly volume, CPC, search intent, SERP weakness analysis, and automated topic clusters.',
    inputs: [
      { name: 'keyword', label: 'Seed Keyword or Topic', type: 'text', placeholder: 'e.g. coffee shop marketing', required: true },
      { name: 'country', label: 'Target Country', type: 'select', defaultValue: 'United States', options: [
        { label: 'United States', value: 'United States' },
        { label: 'United Kingdom', value: 'United Kingdom' },
        { label: 'Canada', value: 'Canada' },
        { label: 'Australia', value: 'Australia' },
        { label: 'Worldwide', value: 'Worldwide' },
      ]},
    ],
    howItWorks: [
      'Enter your seed keyword or niche concept.',
      'Our engine analyzes search patterns, intent, and competitive SERP density.',
      'Review difficulty scores, long-tail variations, and clustered content opportunities.',
      'Export to CSV or instantly transfer to the AI Article Writer.'
    ],
    benefits: [
      'Find keywords authority competitors missed.',
      'Group related queries into topical clusters.',
      'Filter by questions, commercial intent, and difficulty tier.',
      '100% free with no account creation needed.'
    ],
    faq: [
      { q: 'Where do search volume and difficulty metrics come from?', a: 'Values are generated via heuristic algorithmic modeling and search pattern analysis. When external data providers are connected, verified API metrics are displayed.' },
      { q: 'Can I export keywords to CSV or Google Sheets?', a: 'Yes, full one-click CSV export is supported for selected keywords or entire datasets.' }
    ],
    relatedTools: ['keyword-difficulty', 'question-finder', 'keyword-clustering', 'ai-article-writer']
  },

  // 2. Keyword Difficulty Analyzer
  {
    id: 'keyword-difficulty',
    name: 'Keyword Difficulty Analyzer',
    slug: 'keyword-difficulty',
    category: 'keywords',
    popular: true,
    icon: 'BarChart2',
    shortDesc: 'Analyze SERP competition and find out why a keyword is hard to rank for.',
    description: 'Detailed competitive breakdown evaluating SERP strength, forum rankings, required content depth, and specific strategies to outrank established competitors.',
    inputs: [
      { name: 'keyword', label: 'Keyword to Evaluate', type: 'text', placeholder: 'e.g. best credit cards for travel', required: true },
    ],
    howItWorks: [
      'Input the target keyword you want to rank for.',
      'We examine the top SERP listings and search intent alignment.',
      'Review the Difficulty Score (0-100) and actionable ranking recommendations.'
    ],
    benefits: [
      'Understand why specific queries are competitive.',
      'Detect SERP weaknesses like outdated pages or thin forums.',
      'Receive recommended word count and content angle advice.'
    ],
    faq: [
      { q: 'Is a difficulty score of 30 easy to rank for?', a: 'Yes! Keywords with difficulty under 35 are generally accessible for newer websites focusing on depth and search intent.' }
    ],
    relatedTools: ['keyword-explorer', 'serp-analyzer', 'content-gap']
  },

  // 3. Question Finder
  {
    id: 'question-finder',
    name: 'Question Finder',
    slug: 'question-finder',
    category: 'keywords',
    popular: true,
    icon: 'HelpCircle',
    shortDesc: 'Find questions people ask on Google (Who, What, Where, Why, How).',
    description: 'Extract real user questions and "People Also Ask" concepts to optimize FAQ schema, capture featured snippets, and build high-relevance blog sections.',
    inputs: [
      { name: 'keyword', label: 'Topic or Keyword', type: 'text', placeholder: 'e.g. sourdough bread', required: true }
    ],
    howItWorks: [
      'Type any subject, product, or hobby.',
      'RankPilot generates questions categorized by grammatical trigger (How, What, Why, Can, Should).',
      'Select any question to write an article, draft an FAQ, or add to your workspace.'
    ],
    benefits: [
      'Capture Google People Also Ask (PAA) rich snippets.',
      'Uncover conversational voice-search queries.',
      'Build comprehensive FAQ sections for E-E-A-T.'
    ],
    faq: [
      { q: 'Can I generate an FAQ section directly from these questions?', a: 'Yes! You can select questions and click "Generate FAQ" or send them to the Article Writer.' }
    ],
    relatedTools: ['keyword-explorer', 'ai-article-writer', 'faq-generator']
  },

  // 4. Keyword Clustering Engine
  {
    id: 'keyword-clustering',
    name: 'Keyword Cluster Generator',
    slug: 'keyword-clustering',
    category: 'keywords',
    popular: true,
    icon: 'Network',
    shortDesc: 'Group keywords by semantic similarity and topical authority.',
    description: 'Turn lists of disjointed keywords into organized pillar topics and supporting article clusters with URL recommendations and internal linking architecture.',
    inputs: [
      { name: 'keyword', label: 'Seed Topic or Comma-Separated Keywords', type: 'textarea', placeholder: 'e.g. email marketing, newsletter software, welcome email sequence, cold outreach', required: true }
    ],
    howItWorks: [
      'Enter your seed keyword or paste a list of queries.',
      'Our semantic grouping engine pairs related search intents together.',
      'View organized pillars, cluster hubs, and bidirectional linking plans.'
    ],
    benefits: [
      'Prevents keyword cannibalization across your domain.',
      'Builds real topical authority recognized by search engines.',
      'Saves hours of manual spreadsheet categorizing.'
    ],
    faq: [
      { q: 'Why is keyword clustering superior to single-keyword posts?', a: 'Search engines prefer topic hubs that thoroughly answer an entire subject across connected articles rather than isolated fragments.' }
    ],
    relatedTools: ['keyword-explorer', 'ai-article-writer', 'internal-link-generator']
  },

  // 5. SERP Analyzer
  {
    id: 'serp-analyzer',
    name: 'SERP Analyzer',
    slug: 'serp-analyzer',
    category: 'seo',
    icon: 'Layers',
    shortDesc: 'Inspect Page 1 search results and uncover competitive weaknesses.',
    description: 'Analyze top search results, identify featured snippet opportunities, detect forum threads ranking, and spot weak competitor content you can outrank.',
    inputs: [
      { name: 'keyword', label: 'Keyword to Inspect', type: 'text', placeholder: 'e.g. best standing desks', required: true }
    ],
    howItWorks: [
      'Enter your query.',
      'Examine simulated Page 1 results with content length, authority, and feature tags.',
      'Review the SERP Weakness summary for immediate content openings.'
    ],
    benefits: [
      'Identify if forums (Reddit, Quora) are ranking on Page 1.',
      'Evaluate average word count of top-ranking articles.',
      'Craft content tailored specifically to exploit competitor gaps.'
    ],
    faq: [
      { q: 'What does a "Forum ranking" weakness signify?', a: 'When forums appear on Page 1, search engines are often compensating for a lack of a clear, authoritative editorial guide—giving you a strong opportunity to rank.' }
    ],
    relatedTools: ['keyword-difficulty', 'content-gap', 'seo-content-optimizer']
  },

  // 6. Content Gap Analyzer
  {
    id: 'content-gap',
    name: 'Content Gap Analyzer',
    slug: 'content-gap',
    category: 'seo',
    icon: 'Split',
    shortDesc: 'Find keywords competitors rank for that your website is missing.',
    description: 'Compare your domain against up to 3 competitors to discover untapped keyword topics, missing cluster pages, and high-value traffic opportunities.',
    inputs: [
      { name: 'yourDomain', label: 'Your Domain', type: 'text', placeholder: 'yoursite.com', required: true },
      { name: 'competitor1', label: 'Competitor 1', type: 'text', placeholder: 'competitor1.com', required: true },
      { name: 'competitor2', label: 'Competitor 2 (Optional)', type: 'text', placeholder: 'competitor2.com' }
    ],
    howItWorks: [
      'Enter your domain and competitor URLs.',
      'Identify topic gaps and shared ranking keywords.',
      'Generate an immediate content roadmap of high-potential target terms.'
    ],
    benefits: [
      'Steal validated traffic ideas from market leaders.',
      'Close critical subject holes across your product niche.',
      'Prioritize articles with proven search demand.'
    ],
    faq: [
      { q: 'Can I run this without connecting a paid SEO API?', a: 'Yes! RankPilot provides intelligent heuristic gap modeling based on topical domains and niche competitor archetypes.' }
    ],
    relatedTools: ['keyword-explorer', 'serp-analyzer']
  },

  // 7. AI Article Writer (Flagship Content)
  {
    id: 'ai-article-writer',
    name: 'AI Article Writer',
    slug: 'ai-article-writer',
    category: 'writing',
    badge: 'POPULAR',
    popular: true,
    icon: 'FileText',
    shortDesc: 'Generate comprehensive, E-E-A-T friendly long-form SEO articles.',
    description: 'Create publication-ready, deeply researched long-form articles complete with SEO briefs, H2/H3 outlines, key takeaways, comparison tables, FAQ schema, and meta tags.',
    inputs: [
      { name: 'topic', label: 'Article Topic or Primary Keyword', type: 'text', placeholder: 'e.g. Remote Team Management Best Practices', required: true },
      { name: 'tone', label: 'Tone of Voice', type: 'select', defaultValue: 'Authoritative yet engaging', options: [
        { label: 'Authoritative & Professional', value: 'Authoritative & Professional' },
        { label: 'Conversational & Friendly', value: 'Conversational & Friendly' },
        { label: 'Data-Driven & Analytical', value: 'Data-Driven & Analytical' },
        { label: 'Step-by-Step Practical', value: 'Step-by-Step Practical' }
      ]},
      { name: 'length', label: 'Target Length', type: 'select', defaultValue: 'Comprehensive (2,000+ words)', options: [
        { label: 'Standard Guide (1,200 words)', value: 'Standard Guide (1,200 words)' },
        { label: 'Comprehensive (2,000+ words)', value: 'Comprehensive (2,000+ words)' },
        { label: 'Ultimate Pillar (3,000+ words)', value: 'Ultimate Pillar (3,000+ words)' }
      ]}
    ],
    howItWorks: [
      'Enter your primary topic, tone, and desired length.',
      'Step 1 produces an SEO Content Brief, outline, and entity targets.',
      'Step 2 writes the complete E-E-A-T compliant article draft.',
      'Copy as Markdown/HTML, review readability metrics, or transfer to the Content Optimizer.'
    ],
    benefits: [
      'Generates structured markdown with clean tables and lists.',
      'Includes valid Schema.org Article JSON-LD markup.',
      'Encourages real human expertise and original case studies.',
      'Zero fluff; focused on user search intent.'
    ],
    faq: [
      { q: 'Does AI-generated content automatically rank on Google?', a: 'No tool can guarantee rankings. Google rewards helpful, accurate content with authentic experience (E-E-A-T). We recommend infusing your own proprietary screenshots, opinions, and case studies.' }
    ],
    relatedTools: ['content-optimizer', 'blog-outline-generator', 'faq-generator', 'schema-generator']
  },

  // 8. Content Optimizer
  {
    id: 'content-optimizer',
    name: 'SEO Content Optimizer',
    slug: 'content-optimizer',
    category: 'writing',
    popular: true,
    icon: 'CheckCircle',
    shortDesc: 'Paste an article and analyze keyword density, readability, and gaps.',
    description: 'Score your content from 0 to 100 against target search intent, evaluate heading distribution, uncover topical concept omissions, and get concrete editorial recommendations.',
    inputs: [
      { name: 'targetKeyword', label: 'Target Keyword', type: 'text', placeholder: 'e.g. email marketing strategy', required: true },
      { name: 'content', label: 'Paste Your Article Text or Markdown', type: 'textarea', placeholder: 'Paste your full draft here...', required: true }
    ],
    howItWorks: [
      'Paste your draft and enter your primary search query.',
      'The optimizer scans for structural tags, entity depth, and readability.',
      'Follow the step-by-step checklist to increase your Content Optimization Score.'
    ],
    benefits: [
      'Real-time keyword density and heading hierarchy check.',
      'Reveals missing semantic concepts competitors discuss.',
      'Readability grade assessment for audience accessibility.'
    ],
    faq: [
      { q: 'Is the Content Optimization Score a Google metric?', a: 'No, this is our proprietary heuristic benchmark based on on-page SEO best practices and semantic entity coverage.' }
    ],
    relatedTools: ['ai-article-writer', 'keyword-explorer', 'schema-generator']
  },

  // 9. Blog Title Generator
  {
    id: 'blog-title-generator',
    name: 'Blog Title Generator',
    slug: 'blog-title-generator',
    category: 'blogging',
    popular: true,
    icon: 'Sparkles',
    shortDesc: 'Generate 20 high-CTR blog titles across 10 distinct categories.',
    description: 'Create irresistible, search-friendly headlines categorized by SEO, Curiosity, How-To, Listicle, Comparison, Beginner, Expert, Commercial, and Evergreen angles.',
    inputs: [
      { name: 'keyword', label: 'Keyword or Topic', type: 'text', placeholder: 'e.g. indoor plant care', required: true }
    ],
    howItWorks: [
      'Type your seed topic.',
      'Instantly receive 20 tested headline variations with estimated CTR scores.',
      'Click to copy or instantly start an outline or full article.'
    ],
    benefits: [
      'Boost click-through rate (CTR) in search results and social feeds.',
      'Diverse emotional triggers: curiosity, clarity, proof, and authority.',
      'One-click workflow into the AI Article Writer.'
    ],
    faq: [
      { q: 'How does CTR influence organic search rankings?', a: 'High CTR signals strong user interest and query relevance, helping maintain and elevate SERP positions.' }
    ],
    relatedTools: ['blog-idea-generator', 'ai-article-writer', 'keyword-explorer']
  },

  // 10. Blog Idea Generator
  {
    id: 'blog-idea-generator',
    name: 'Blog Idea Generator',
    slug: 'blog-idea-generator',
    category: 'blogging',
    icon: 'Lightbulb',
    shortDesc: 'Get infinite content ideas tailored to your specific niche.',
    description: 'Never run out of content. Generates evergreen topics, beginner tutorials, affiliate reviews, comparison teardowns, and high-converting lead magnet angles.',
    inputs: [
      { name: 'niche', label: 'Your Niche or Industry', type: 'text', placeholder: 'e.g. freelance web development', required: true }
    ],
    howItWorks: [
      'Enter your website niche or target customer segment.',
      'Receive a categorized matrix of content ideas with suggested angles.',
      'Save your favorites directly to your local workspace.'
    ],
    benefits: [
      'Eliminates writer\'s block completely.',
      'Combines informational traffic ideas with commercial affiliate posts.',
      'Helps plan multi-month editorial calendars.'
    ],
    faq: [
      { q: 'Can I export the ideas to a content calendar?', a: 'Yes, save items to your workspace and export via CSV or JSON.' }
    ],
    relatedTools: ['blog-title-generator', 'content-calendar-generator', 'ai-article-writer']
  },

  // 11. YouTube Keyword Tool
  {
    id: 'youtube-keyword-tool',
    name: 'YouTube Keyword Tool',
    slug: 'youtube-keyword-tool',
    category: 'youtube',
    popular: true,
    icon: 'Video',
    shortDesc: 'Find high-search video keywords, title formulas, and tags.',
    description: 'Discover video topics people are actively searching on YouTube, along with thumbnail hook angles, video descriptions, and competitor tag recommendations.',
    inputs: [
      { name: 'keyword', label: 'Video Subject or Query', type: 'text', placeholder: 'e.g. python tutorial', required: true }
    ],
    howItWorks: [
      'Enter any video subject.',
      'Get video search angles, long-tail queries, hook templates, and tag lists.',
      'Use directly for YouTube SEO or convert into written blog guides.'
    ],
    benefits: [
      'Rank in both YouTube search and Google Video carousels.',
      'Increase audience retention with proven hook formulas.',
      'Generate copy-paste video tags in seconds.'
    ],
    faq: [
      { q: 'Are YouTube rankings calculated the same as Google web search?', a: 'YouTube prioritizes click-through rate (CTR), watch time, and average percentage viewed (retention), in addition to keyword metadata.' }
    ],
    relatedTools: ['youtube-to-blog', 'youtube-title-generator', 'youtube-tag-generator']
  },

  // 12. YouTube to Blog Converter
  {
    id: 'youtube-to-blog',
    name: 'YouTube to Blog Converter',
    slug: 'youtube-to-blog',
    category: 'youtube',
    icon: 'Repeat',
    shortDesc: 'Repurpose video transcripts or URLs into SEO blog articles.',
    description: 'Transform video concepts or transcript notes into original, well-structured long-form articles with key takeaways, FAQs, and social media summaries.',
    inputs: [
      { name: 'videoUrlOrNotes', label: 'Video Topic, Summary, or Transcript Notes', type: 'textarea', placeholder: 'Paste video transcript, key talking points, or video concept...', required: true },
      { name: 'targetKeyword', label: 'Target SEO Keyword for the Article', type: 'text', placeholder: 'e.g. how to start a podcast' }
    ],
    howItWorks: [
      'Paste your video script, transcript excerpts, or core points.',
      'Our engine synthesizes the speech into structured written prose.',
      'Export a full SEO blog post with takeaways and newsletter recap.'
    ],
    benefits: [
      'Multiply your content output without starting from scratch.',
      'Respects copyright by synthesizing concepts into original editorial prose.',
      'Captures search traffic for your existing video library.'
    ],
    faq: [
      { q: 'Does this violate YouTube copyrights?', a: 'No, this tool transforms ideas and concepts into completely original written summaries and instructional guides.' }
    ],
    relatedTools: ['youtube-keyword-tool', 'ai-article-writer']
  },

  // 13. Blog Outline Generator
  {
    id: 'blog-outline-generator',
    name: 'Blog Outline Generator',
    slug: 'blog-outline-generator',
    category: 'writing',
    icon: 'List',
    shortDesc: 'Generate comprehensive H2/H3 article structures.',
    description: 'Build detailed, search-intent optimized outlines that guide writers or AI tools to create exhaustive, top-ranking guides.',
    inputs: [
      { name: 'topic', label: 'Article Topic or Title', type: 'text', placeholder: 'e.g. Ultimate Guide to SaaS Pricing Models', required: true }
    ],
    howItWorks: ['Enter your topic or title.', 'Receive a structured hierarchy of H2 and H3 subheadings with target discussion notes.'],
    benefits: ['Guarantees logical flow and complete topic coverage.', 'Saves 30+ minutes of manual outlining.'],
    faq: [{ q: 'Can I send this outline to the Article Writer?', a: 'Yes, with one click you can expand the outline into a full draft.' }],
    relatedTools: ['ai-article-writer', 'content-brief-generator']
  },

  // 14. Meta Description Generator
  {
    id: 'meta-description-generator',
    name: 'Meta Description Generator',
    slug: 'meta-description-generator',
    category: 'seo',
    icon: 'AlignLeft',
    shortDesc: 'Generate CTR-optimized meta descriptions under 155 characters.',
    description: 'Craft persuasive snippets that attract clicks on SERPs while staying within pixel and character limits.',
    inputs: [
      { name: 'title', label: 'Page Title', type: 'text', placeholder: '10 Best Budget Laptops for Students', required: true },
      { name: 'keyword', label: 'Primary Keyword', type: 'text', placeholder: 'budget laptops for students', required: true }
    ],
    howItWorks: ['Provide your page title and keyword.', 'Receive 5 concise meta descriptions with character counts.'],
    benefits: ['Never get truncated with ellipsis (...) on search engines.', 'Features strong calls to action.'],
    faq: [{ q: 'What is the optimal meta description length?', a: 'Between 120 and 155 characters ensures compatibility across desktop and mobile screens.' }],
    relatedTools: ['seo-title-generator', 'content-optimizer']
  },

  // 15. SEO Title Generator
  {
    id: 'seo-title-generator',
    name: 'SEO Title Generator',
    slug: 'seo-title-generator',
    category: 'seo',
    icon: 'Type',
    shortDesc: 'Create search-optimized page titles under 60 characters.',
    description: 'Generate high-ranking title tags that maximize search engine prominence and user click-through rate.',
    inputs: [
      { name: 'keyword', label: 'Primary Keyword', type: 'text', placeholder: 'e.g. remote work tools', required: true }
    ],
    howItWorks: ['Enter your target keyword.', 'Get title tags structured for front-loaded keywords and branding.'],
    benefits: ['Avoids Google title rewrites.', 'Front-loads primary keywords for ranking weight.'],
    faq: [{ q: 'Why keep titles under 60 characters?', a: 'Google typically truncates titles exceeding 60 characters (approx 600px width).' }],
    relatedTools: ['meta-description-generator', 'blog-title-generator']
  },

  // 16. FAQ Generator
  {
    id: 'faq-generator',
    name: 'FAQ Generator (With Schema)',
    slug: 'faq-generator',
    category: 'seo',
    icon: 'HelpCircle',
    shortDesc: 'Generate relevant FAQs and copy-paste JSON-LD Schema markup.',
    description: 'Identify top user objections and search questions, write concise answers, and export valid FAQPage Schema markup.',
    inputs: [
      { name: 'topic', label: 'Topic or Product', type: 'text', placeholder: 'e.g. Shopify vs WooCommerce', required: true }
    ],
    howItWorks: ['Enter your subject.', 'Receive 5-8 question and answer pairs along with Schema.org JSON-LD code.'],
    benefits: ['Wins rich snippet real estate on search pages.', 'Overcomes visitor objections directly on page.'],
    faq: [{ q: 'Is FAQ schema still valid in 2026?', a: 'Yes, for well-structured authoritative websites providing genuine customer utility.' }],
    relatedTools: ['schema-generator', 'ai-article-writer']
  },

  // 17. Schema Generator
  {
    id: 'schema-generator',
    name: 'JSON-LD Schema Generator',
    slug: 'schema-generator',
    category: 'seo',
    icon: 'Code',
    shortDesc: 'Generate valid Article, FAQ, Product, and HowTo JSON-LD.',
    description: 'Easily create rich structured data snippets without coding knowledge to enhance your appearance in search engines.',
    inputs: [
      { name: 'schemaType', label: 'Schema Type', type: 'select', defaultValue: 'Article', options: [
        { label: 'Article', value: 'Article' },
        { label: 'FAQPage', value: 'FAQPage' },
        { label: 'Product', value: 'Product' },
        { label: 'HowTo', value: 'HowTo' },
      ]},
      { name: 'title', label: 'Entity Title or Name', type: 'text', placeholder: 'How to Build an Email List', required: true },
      { name: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Step by step tutorial on email list growth...', required: true }
    ],
    howItWorks: ['Select schema type and enter entity details.', 'Generate clean, validated JSON-LD to paste in your <head> tag.'],
    benefits: ['Improves crawlability and machine understanding.', 'Enables Google rich result badges.'],
    faq: [{ q: 'Where should I paste JSON-LD schema?', a: 'Paste it inside the <head> of your HTML or via Google Tag Manager.' }],
    relatedTools: ['faq-generator', 'content-optimizer']
  },

  // 18. Paragraph Rewriter
  {
    id: 'paragraph-rewriter',
    name: 'Paragraph Rewriter',
    slug: 'paragraph-rewriter',
    category: 'writing',
    icon: 'Edit3',
    shortDesc: 'Rewrite sentences and paragraphs with enhanced clarity and tone.',
    description: 'Transform awkward phrasing, eliminate passive voice, and improve readability without losing original meaning.',
    inputs: [
      { name: 'text', label: 'Text to Rewrite', type: 'textarea', placeholder: 'Paste paragraph here...', required: true },
      { name: 'style', label: 'Desired Style', type: 'select', defaultValue: 'Clear & Punchy', options: [
        { label: 'Clear & Punchy', value: 'Clear & Punchy' },
        { label: 'Professional & Authoritative', value: 'Professional & Authoritative' },
        { label: 'Casual & Conversational', value: 'Casual & Conversational' },
        { label: 'Simplified (ELIF)', value: 'Simplified (ELIF)' },
      ]}
    ],
    howItWorks: ['Paste your text and choose your rewrite style.', 'Receive 3 alternative phrasing options with readability stats.'],
    benefits: ['Removes redundant filler words.', 'Enhances engagement and reader comprehension.'],
    faq: [{ q: 'Does this change the meaning of my content?', a: 'No, it preserves the core thesis while upgrading vocabulary, flow, and cadence.' }],
    relatedTools: ['ai-article-writer', 'content-optimizer']
  },

  // 19. Content Expander
  {
    id: 'content-expander',
    name: 'Content Expander',
    slug: 'content-expander',
    category: 'writing',
    icon: 'Maximize2',
    shortDesc: 'Turn thin bullet points or short paragraphs into rich explanations.',
    description: 'Flesh out brief ideas with examples, data considerations, nuances, and step-by-step illustrations.',
    inputs: [
      { name: 'briefPoint', label: 'Bullet Point or Brief Idea', type: 'textarea', placeholder: 'e.g. Always A/B test email subject lines.', required: true }
    ],
    howItWorks: ['Provide a brief concept.', 'Receive an in-depth 250-word exploration with tactical examples.'],
    benefits: ['Eliminates thin content flags.', 'Adds practical depth for E-E-A-T.'],
    faq: [{ q: 'Will this add fluff?', a: 'Our engine is tuned to add concrete context, examples, and logic rather than empty adjectives.' }],
    relatedTools: ['ai-article-writer', 'paragraph-rewriter']
  },

  // 20. Internal Link Idea Generator
  {
    id: 'internal-link-generator',
    name: 'Internal Link Idea Generator',
    slug: 'internal-link-generator',
    category: 'seo',
    icon: 'Link',
    shortDesc: 'Discover contextual anchor text and linking opportunities.',
    description: 'Map out reciprocal linking paths between your articles, guides, and commercial pages to pass link equity effectively.',
    inputs: [
      { name: 'sourceArticle', label: 'Current Article Topic', type: 'text', placeholder: 'e.g. Best Email Marketing Software', required: true },
      { name: 'targetTopics', label: 'Other Articles on Your Site', type: 'textarea', placeholder: 'e.g. How to grow an email list, Welcome email templates, Lead magnet ideas', required: true }
    ],
    howItWorks: ['Enter the source article and related articles on your site.', 'Get recommended anchor texts and natural in-content placement suggestions.'],
    benefits: ['Distributes PageRank throughout your domain.', 'Reduces bounce rates by keeping readers engaged.'],
    faq: [{ q: 'Why is internal linking crucial for SEO?', a: 'It establishes topical hierarchies and helps crawlers discover and index deep content pages.' }],
    relatedTools: ['keyword-clustering', 'content-optimizer']
  },

  // 21. Content Brief Generator
  {
    id: 'content-brief-generator',
    name: 'Content Brief Generator',
    slug: 'content-brief-generator',
    category: 'writing',
    icon: 'FileSpreadsheet',
    shortDesc: 'Create structured editorial briefs for freelance writers.',
    description: 'Standardize your writing operations with comprehensive briefs covering search intent, target entities, competitor references, and required headings.',
    inputs: [
      { name: 'keyword', label: 'Primary Target Keyword', type: 'text', placeholder: 'e.g. Notion for project management', required: true }
    ],
    howItWorks: ['Enter the keyword.', 'Receive a complete 1-page editorial specification ready to share with freelance writers or agency teams.'],
    benefits: ['Eliminates back-and-forth editing rounds.', 'Ensures consistent E-E-A-T quality across your publishing pipeline.'],
    faq: [{ q: 'Can I copy this into Notion or Google Docs?', a: 'Yes, copy formatted Markdown with one click.' }],
    relatedTools: ['blog-outline-generator', 'ai-article-writer']
  },

  // 22. YouTube Title Generator
  {
    id: 'youtube-title-generator',
    name: 'YouTube Title Generator',
    slug: 'youtube-title-generator',
    category: 'youtube',
    icon: 'PlayCircle',
    shortDesc: 'Generate 15 viral video titles built for high CTR.',
    description: 'Create high-converting video titles using storytelling curiosity, contrasting statements, and high-volume keywords.',
    inputs: [
      { name: 'topic', label: 'Video Subject', type: 'text', placeholder: 'e.g. I worked from a camper van for 1 year', required: true }
    ],
    howItWorks: ['Enter your video idea.', 'Get 15 tested title templates tailored for YouTube browsing behavior.'],
    benefits: ['Dramatically improves YouTube browse and suggested CTR.', 'Combines SEO keywords with curiosity.'],
    faq: [{ q: 'Should video titles be short?', a: 'Titles under 50 characters prevent mobile truncation in recommendations.' }],
    relatedTools: ['youtube-keyword-tool', 'youtube-description-generator']
  },

  // 23. YouTube Description Generator
  {
    id: 'youtube-description-generator',
    name: 'YouTube Description Generator',
    slug: 'youtube-description-generator',
    category: 'youtube',
    icon: 'FileText',
    shortDesc: 'Create SEO-rich video descriptions with timestamps and links.',
    description: 'Generate optimized video descriptions that help YouTube algorithms index your video while promoting affiliate links and lead magnets.',
    inputs: [
      { name: 'title', label: 'Video Title', type: 'text', placeholder: 'e.g. How to Build a PC in 2026', required: true },
      { name: 'keyPoints', label: 'Key Topics / Timestamps Covered', type: 'textarea', placeholder: 'e.g. Parts selection, CPU install, Cooler, Cable management', required: true }
    ],
    howItWorks: ['Provide video title and topics.', 'Receive a formatted description with chapters, affiliate disclosures, and social links.'],
    benefits: ['Captures search traffic directly from Google Video carousels.', 'Professional structure with clear call to action.'],
    faq: [{ q: 'Do YouTube descriptions help ranking?', a: 'Yes, the first 200 characters are heavily indexed by YouTube search algorithms.' }],
    relatedTools: ['youtube-title-generator', 'youtube-tag-generator']
  },

  // 24. YouTube Tag Generator
  {
    id: 'youtube-tag-generator',
    name: 'YouTube Tag Generator',
    slug: 'youtube-tag-generator',
    category: 'youtube',
    icon: 'Tag',
    shortDesc: 'Generate copy-paste comma-separated tags for your video upload.',
    description: 'Find relevant broad and specific tags to help YouTube categorize your video and correct for common misspellings.',
    inputs: [
      { name: 'keyword', label: 'Video Topic', type: 'text', placeholder: 'e.g. mechanical keyboard review', required: true }
    ],
    howItWorks: ['Type your topic.', 'Get 25 relevant tags formatted for instant copy-paste into YouTube Studio.'],
    benefits: ['Helps YouTube match your video to suggested feeds.', 'Includes long-tail and misspellings variations.'],
    faq: [{ q: 'How many tags should I use on YouTube?', a: 'Use 15-25 highly relevant tags without keyword spamming.' }],
    relatedTools: ['youtube-keyword-tool', 'youtube-description-generator']
  },

  // 25. TikTok Hook Generator
  {
    id: 'tiktok-hook-generator',
    name: 'TikTok & Reels Hook Generator',
    slug: 'tiktok-hook-generator',
    category: 'social',
    icon: 'Smartphone',
    shortDesc: 'Create first-3-seconds hooks that stop the scroll.',
    description: 'Generate irresistible visual and verbal hooks designed to retain viewers past the critical 3-second mark on TikTok and Instagram Reels.',
    inputs: [
      { name: 'topic', label: 'Video Subject or Niche', type: 'text', placeholder: 'e.g. productivity habits that changed my life', required: true }
    ],
    howItWorks: ['Enter your topic.', 'Get 10 proven hook formulas (visual cue + spoken audio + text overlay).'],
    benefits: ['Spikes video completion rates.', 'Unlocks algorithmic distribution on the For You page.'],
    faq: [{ q: 'Why are the first 3 seconds critical on short-form video?', a: 'Algorithms measure drop-off in seconds 1-3 to decide whether to push a video to a wider audience.' }],
    relatedTools: ['youtube-title-generator', 'instagram-caption-generator']
  },

  // 26. Instagram Caption Generator
  {
    id: 'instagram-caption-generator',
    name: 'Instagram Caption & Hashtag Generator',
    slug: 'instagram-caption-generator',
    category: 'social',
    icon: 'Instagram',
    shortDesc: 'Create engaging storytelling captions and targeted hashtags.',
    description: 'Write captions that prompt comments and saves, formatted with clean spacing and high-relevance hashtags.',
    inputs: [
      { name: 'topic', label: 'Post Topic or Image Subject', type: 'text', placeholder: 'e.g. launching our new minimalist desk setup', required: true }
    ],
    howItWorks: ['Describe your photo or reel.', 'Receive a captivating micro-blog caption with strong CTA and hashtags.'],
    benefits: ['Encourages comments and bookmarks.', 'Clean spacing without awkward periods.'],
    faq: [{ q: 'Are hashtags still important on Instagram?', a: 'Yes, 3-5 niche hashtags help categorize content for search and explore feeds.' }],
    relatedTools: ['tiktok-hook-generator', 'pinterest-description-generator']
  },

  // 27. LinkedIn Post Generator
  {
    id: 'linkedin-post-generator',
    name: 'LinkedIn Thought Leadership Post Generator',
    slug: 'linkedin-post-generator',
    category: 'social',
    icon: 'Linkedin',
    shortDesc: 'Format viral thought-leadership posts with hook, story, and takeaway.',
    description: 'Craft professional LinkedIn posts with captivating first lines, formatted whitespace, and engaging business insights.',
    inputs: [
      { name: 'lesson', label: 'Business Lesson or Experience', type: 'textarea', placeholder: 'e.g. What I learned after firing our biggest client...', required: true }
    ],
    howItWorks: ['Share your lesson or story.', 'Get 2 high-performing post layouts with line breaks optimized for desktop and mobile.'],
    benefits: ['Boosts connection requests and brand authority.', 'High organic reach on B2B audiences.'],
    faq: [{ q: 'How long should a LinkedIn post be?', a: '150-300 words with punchy 1-2 sentence paragraphs performs best.' }],
    relatedTools: ['x-post-generator', 'newsletter-generator']
  },

  // 28. X / Twitter Post Generator
  {
    id: 'x-post-generator',
    name: 'X (Twitter) Thread & Post Generator',
    slug: 'x-post-generator',
    category: 'social',
    icon: 'Twitter',
    shortDesc: 'Generate standalone viral posts or 5-tweet educational threads.',
    description: 'Write punchy tweets and insightful threads that drive retweets, bookmarks, and newsletter signups.',
    inputs: [
      { name: 'topic', label: 'Topic or Takeaway', type: 'text', placeholder: 'e.g. 7 mental models for decision making', required: true }
    ],
    howItWorks: ['Enter your topic.', 'Receive single punchy tweets or a complete 5-step thread with introductory hook and CTA.'],
    benefits: ['Maximizes bookmark rate (a key X algorithm signal).', 'Drives traffic to your blog or newsletter.'],
    faq: [{ q: 'Why are bookmarks important on X?', a: 'Bookmarks signal high reference value, significantly boosting distribution.' }],
    relatedTools: ['linkedin-post-generator', 'newsletter-generator']
  },

  // 29. Pinterest Description Generator
  {
    id: 'pinterest-description-generator',
    name: 'Pinterest SEO Description Generator',
    slug: 'pinterest-description-generator',
    category: 'social',
    icon: 'Image',
    shortDesc: 'Create search-friendly Pin descriptions that drive blog clicks.',
    description: 'Generate keyword-dense Pinterest descriptions and board ideas to drive steady visual search traffic to your site.',
    inputs: [
      { name: 'topic', label: 'Pin Subject or Blog Post Title', type: 'text', placeholder: 'e.g. 15 Modern Farmhouse Kitchen Ideas', required: true }
    ],
    howItWorks: ['Enter your pin theme.', 'Get 3 descriptions loaded with natural Pinterest search phrases and calls to action.'],
    benefits: ['Long-term evergreen referral traffic.', 'Rank in Pinterest visual search engine.'],
    faq: [{ q: 'How long does a Pin stay active?', a: 'Unlike Twitter or Instagram, pins can drive referral traffic for 12 to 24 months.' }],
    relatedTools: ['blog-idea-generator', 'instagram-caption-generator']
  },

  // 30. Product Description Generator
  {
    id: 'product-description-generator',
    name: 'Ecommerce Product Description Generator',
    slug: 'product-description-generator',
    category: 'ecommerce',
    icon: 'ShoppingBag',
    shortDesc: 'Turn boring feature specs into high-converting benefit copy.',
    description: 'Write persuasive product copy for Shopify, WooCommerce, or Amazon that highlights emotional benefits and overcomes hesitation.',
    inputs: [
      { name: 'productName', label: 'Product Name', type: 'text', placeholder: 'e.g. Ergonomic Bamboo Laptop Stand', required: true },
      { name: 'features', label: 'Key Features & Materials', type: 'textarea', placeholder: 'e.g. 100% organic bamboo, 6 adjustable angles, portable foldable design, cooling airflow', required: true }
    ],
    howItWorks: ['Provide product name and raw specs.', 'Receive sensory, benefit-driven product copy formatted with bullets and FAQ.'],
    benefits: ['Increases store conversion rate.', 'Optimized for search engines and shoppers alike.'],
    faq: [{ q: 'Can I use this for Shopify and Amazon?', a: 'Yes! It generates both storytelling paragraphs and bulleted feature breakdowns.' }],
    relatedTools: ['etsy-tag-generator', 'amazon-kdp-keyword-generator']
  },

  // 31. Etsy Tag & Title Generator
  {
    id: 'etsy-tag-generator',
    name: 'Etsy Title & Tag Generator',
    slug: 'etsy-tag-generator',
    category: 'ecommerce',
    icon: 'Tag',
    shortDesc: 'Find all 13 Etsy tags and search-optimized listing titles.',
    description: 'Maximize your organic views on Etsy by discovering high-intent buyer phrases and utilizing all 13 tag slots with zero wasted characters.',
    inputs: [
      { name: 'item', label: 'Handmade Item / Craft', type: 'text', placeholder: 'e.g. Custom leather dog collar with engraved nameplate', required: true }
    ],
    howItWorks: ['Describe your handmade product.', 'Receive 1 optimized title and all 13 multi-word Etsy tags under 20 characters.'],
    benefits: ['Uses all 13 available tag slots.', 'Focuses on buyer intent search queries.'],
    faq: [{ q: 'What is the character limit for Etsy tags?', a: 'Each Etsy tag must be 20 characters or fewer. Multi-word phrases are recommended.' }],
    relatedTools: ['product-description-generator', 'amazon-kdp-keyword-generator']
  },

  // 32. Amazon KDP Keyword Generator
  {
    id: 'amazon-kdp-keyword-generator',
    name: 'Amazon KDP Keyword Generator',
    slug: 'amazon-kdp-keyword-generator',
    category: 'ecommerce',
    icon: 'BookOpen',
    shortDesc: 'Find profitable low-competition 7-box keywords for self-publishing.',
    description: 'Research book niche keywords for Kindle Direct Publishing (KDP) fiction and non-fiction titles to boost organic Amazon rank.',
    inputs: [
      { name: 'bookNiche', label: 'Book Genre or Topic', type: 'text', placeholder: 'e.g. mindfulness journal for anxiety', required: true }
    ],
    howItWorks: ['Enter your book concept or genre.', 'Get 7 strategic multi-word keyword phrases designed for KDP\'s backend metadata slots.'],
    benefits: ['Avoids wasting characters on words already in the title.', 'Targets real Amazon buyer search strings.'],
    faq: [{ q: 'Should I repeat words from my book title in KDP keywords?', a: 'No, Amazon already indexes words from your title and subtitle automatically.' }],
    relatedTools: ['product-description-generator', 'keyword-explorer']
  },

  // 33. Email Subject Line Generator
  {
    id: 'email-subject-generator',
    name: 'Email Subject Line & Hook Generator',
    slug: 'email-subject-generator',
    category: 'creator',
    icon: 'Mail',
    shortDesc: 'Generate 15 open-rate boosting subject lines and preview text.',
    description: 'Create high-open subject lines with matching preheaders categorized by curiosity, urgency, numbers, personal, and benefit angles.',
    inputs: [
      { name: 'emailTopic', label: 'Email Content / Newsletter Topic', type: 'text', placeholder: 'e.g. announcing our new free SEO templates', required: true }
    ],
    howItWorks: ['Enter your email message summary.', 'Get 15 subject lines with paired preview text and spam-trigger warnings.'],
    benefits: ['Increases email open rates by 20-35%.', 'Avoids common spam filter words.'],
    faq: [{ q: 'What is preview text?', a: 'Preview text is the secondary snippet displayed next to or under the subject line in inboxes.' }],
    relatedTools: ['newsletter-generator', 'cta-generator']
  },

  // 34. Newsletter Generator
  {
    id: 'newsletter-generator',
    name: 'Newsletter Issue Generator',
    slug: 'newsletter-generator',
    category: 'creator',
    icon: 'Inbox',
    shortDesc: 'Draft engaging weekly newsletters with curated links and takeaways.',
    description: 'Create structured email newsletters with personal commentary, curated industry links, actionable tutorials, and sponsor shoutouts.',
    inputs: [
      { name: 'topic', label: 'Main Newsletter Theme', type: 'text', placeholder: 'e.g. The death of third-party cookies in marketing', required: true }
    ],
    howItWorks: ['Enter your main theme.', 'Receive a complete email newsletter draft ready to paste into Beehiiv, Substack, ConvertKit, or MailerLite.'],
    benefits: ['Builds strong direct subscriber relationships.', 'Includes tasteful sponsor or affiliate ad blocks.'],
    faq: [{ q: 'Can I customize the newsletter format?', a: 'Yes, select from curated curation, deep-dive essay, or quick bullet recap templates.' }],
    relatedTools: ['email-subject-generator', 'ai-article-writer']
  },

  // 35. Call to Action (CTA) Generator
  {
    id: 'cta-generator',
    name: 'Call to Action (CTA) Generator',
    slug: 'cta-generator',
    category: 'creator',
    icon: 'MousePointer',
    shortDesc: 'Generate high-converting button and copy CTAs that get clicks.',
    description: 'Design persuasive conversion prompts for newsletter signups, affiliate recommendations, SaaS trials, and ebook downloads.',
    inputs: [
      { name: 'offer', label: 'What are you promoting?', type: 'text', placeholder: 'e.g. Free 7-Day SEO Masterclass email course', required: true },
      { name: 'targetAction', label: 'Target Action', type: 'select', defaultValue: 'Email Opt-In', options: [
        { label: 'Email Opt-In', value: 'Email Opt-In' },
        { label: 'Product Purchase / Affiliate Click', value: 'Product Purchase' },
        { label: 'Software Free Trial', value: 'Free Trial' },
        { label: 'Book a Call', value: 'Book a Call' }
      ]}
    ],
    howItWorks: ['Define your offer and desired action.', 'Get 10 micro-copy variations (button text + supporting trust trigger).'],
    benefits: ['Eliminates generic "Submit" or "Click Here" buttons.', 'Reduces user friction and hesitation.'],
    faq: [{ q: 'Why does CTA microcopy matter?', a: 'Specific value-focused CTAs (e.g. "Get Instant Access – Free") routinely convert 15-30% higher than generic buttons.' }],
    relatedTools: ['email-subject-generator', 'product-description-generator']
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_DATA.find(t => t.slug === slug || t.id === slug);
}
