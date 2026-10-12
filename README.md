# RankPilot — AI-Powered SEO, Keyword Research & Creator Platform

A production-ready SEO intelligence, keyword research, AI content writing, and creator monetization platform deployable to Netlify.

---

## 🚀 Key Architectural Highlights

1. **Free Creator & SEO Toolkit:**
   - Universal Intelligent Search with intent-aware routing (Keywords, Questions, URLs, Domains, Topics).
   - Flagship **Keyword Explorer** (`/keyword-explorer`) with Search Volume, Difficulty, CPC, Intent, 12-Month Sparkline Trends, Opportunity Scores, and batch CSV export.
   - **8 Research Modes:** Overview, Keyword Ideas, Questions, Difficulty, SERP Analyzer, Topic Clusters, Content Ideas, and Trend Trajectory.
   - **AI Article Writer** (`/ai-article-writer`) generating complete E-E-A-T guides with custom briefs, outlines, takeaways, comparison tables, and FAQ Schema.org JSON-LD.
   - **SEO Content Optimizer** (`/content-optimizer`) scoring drafts from 0–100 with heading hierarchy checks, density calculations, and semantic entity gap detection.
   - **35+ Free Creator Tools** (`/tools`) across SEO, Writing, Blogging, YouTube, Social Media, and Ecommerce.
   - **YouTube Suite:** YouTube Keyword Tool and YouTube-to-Blog Converter.
   - **Local Workspace:** Saved keywords, drafts, and JSON/CSV backups with zero signup required.

2. **Data Transparency & Trust:**
   - Every metric is explicitly labeled as **"AI Estimate"**, **"Demo Data"**, or **"Live API"**.
   - Transparent **Methodology Page** (`/methodology`) detailing heuristic formulas and limitation notices.
   - Full legal compliance: FTC & GDPR Affiliate Disclosures, Privacy Policy, Terms, and Editorial Standards.

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Copy environment configuration
cp .env.example .env

# 3. Start development server (Runs on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔑 Environment Variables

Configure these in `.env` (or in Netlify Site Settings > Environment Variables):

| Variable | Required | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional / Recommended | Injected automatically in AI Studio. Powers real-time AI keyword brainstorming, cluster generation, and long-form article drafts. |
| `APP_URL` | Optional | Host domain used for canonical links and OpenGraph tags. |
| `SEO_DATA_API_KEY` | Optional | External API provider key for third-party volume & CPC datasets. |
| `SERP_API_KEY` | Optional | External API provider key for live Google SERP scraping. |
| `YOUTUBE_API_KEY` | Optional | Official YouTube Data API v3 key for verified video metrics. |

*Note: Even without any API keys configured, RankPilot operates with high-fidelity heuristic simulation data clearly labeled as "AI Estimate / Demo Data" with zero crashes.*

---

## 🌐 Netlify Deployment Instructions

RankPilot is pre-configured for one-click Netlify deployment:

1. **Repository Setup:** Push the code to GitHub, GitLab, or Bitbucket.
2. **Netlify Dashboard:** Click **"Add new site"** > **"Import an existing project"**.
3. **Build Settings:**
   - **Base directory:** Leave empty (root)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. **Environment Variables:**
   - Add `GEMINI_API_KEY` in **Site Configuration > Environment Variables**.
5. **Deploy:** Click **"Deploy site"**. Client-side SPA routing (`_redirects` and `netlify.toml`) will handle page refreshes seamlessly.

---

## 📊 Feature Matrix: Free vs External APIs

| Feature | Built-In Free Operation | With Connected External API |
| :--- | :--- | :--- |
| **Keyword Brainstorming** | Generates 40+ semantic variations | Syncs with live keyword databases |
| **Search Volume & CPC** | Modeled AI Estimate / Heuristic range | Verified Google Ads Keyword Planner data |
| **Keyword Difficulty** | 0–100 proprietary difficulty model | Verified backlink/domain authority metrics |
| **Question Finder** | PAA questions categorized by grammar triggers | Live SERP scraper queries |
| **Topic Clustering** | Semantic grouping into Pillar & Spoke hubs | Same |
| **SERP Analyzer** | Modeled Page 1 simulation with weakness flags | Live Google organic Page 1 scraper |
| **AI Article Writer** | Complete E-E-A-T Markdown articles + Schema | Complete E-E-A-T Markdown articles + Schema |
| **Content Optimizer** | Real-time on-page audit & density checks | Same |
| **YouTube Repurposer** | Transcript/concept synthesis into articles | Direct YouTube caption retrieval |
| **Local Workspace** | LocalStorage saved keywords & CSV export | Cloud sync with user accounts |

---

## 🧭 Recommended Next Development Phase

1. **Optional User Accounts:** Connect Firebase Auth or Supabase for multi-device workspace sync.
2. **Scheduled Rank Tracking:** Automated weekly position tracking for saved keywords.
3. **Headless CMS Sync:** One-click publishing directly to WordPress, Ghost, or Webflow.
