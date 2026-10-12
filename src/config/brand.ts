/**
 * Brand Configuration for RankPilot
 * Centralized settings so the brand name, contact info, domains,
 * and copy can be customized or replaced in one place.
 */

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  domain: string;
  appUrl: string;
  supportEmail: string;
  twitterHandle: string;
  heroHeadline: string;
  heroSubheadline: string;
  affiliateDisclosureNotice: string;
  dataNotice: string;
}

export const BRAND: BrandConfig = {
  name: "RankPilot",
  shortName: "RankPilot",
  tagline: "Free AI SEO & Creator Toolkit",
  domain: "rankpilot.app",
  appUrl: "https://rankpilot.app",
  supportEmail: "hello@rankpilot.app",
  twitterHandle: "@RankPilotApp",
  heroHeadline: "Find Better Keywords. Create Better Content. Grow Your Traffic.",
  heroSubheadline:
    "Research keywords, discover content opportunities, and create search-optimized articles with powerful free SEO and AI creator tools.",
  affiliateDisclosureNotice:
    "RankPilot is supported by our community. When you click through certain partner links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend tools and services we thoroughly evaluate and trust.",
  dataNotice:
    "Metrics displayed are powered by intelligent search analysis and heuristic modeling. Search volume, CPC, and competition values are labeled as AI estimates or demo figures unless a verified third-party API is connected.",
};

export const NAVIGATION_LINKS = [
  { label: "Research", href: "/keyword-explorer" },
  { label: "Content", href: "/ai-article-writer" },
  { label: "AI Tools", href: "/tools" },
  { label: "SEO Tools", href: "/tools?cat=seo" },
  { label: "YouTube", href: "/youtube-keyword-tool" },
  { label: "Blog", href: "/blog" },
  { label: "Workspace", href: "/workspace" },
];
