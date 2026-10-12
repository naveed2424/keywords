import React, { useState } from 'react';
import { ShieldCheck, Mail, CheckCircle2, Heart, ExternalLink, Compass } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { BRAND } from '../config/brand';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead title={`About ${BRAND.name} — Our Mission & Story`} description={`Learn about ${BRAND.name}, our mission to democratize search intelligence, and our free creator tools.`} canonicalPath="/about" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">About {BRAND.name}</h1>
        <p className="mt-4 text-base text-slate-600 leading-relaxed">
          {BRAND.name} was built with a simple conviction: <strong>independent creators, bloggers, and small businesses deserve world-class SEO intelligence without paying $100+/month subscriptions.</strong>
        </p>
        <div className="mt-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <p>
            When legacy SEO tools gated basic search volume and keyword suggestions behind aggressive paywalls, they locked out millions of passionate niche creators. We combined modern browser capabilities with advanced AI heuristic modeling to create a fast, clean, and 100% free toolkit.
          </p>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Our 3 Core Principles</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><strong>1. No Forced Signups:</strong> Every core tool works immediately without requiring an account.</li>
              <li><strong>2. Radical Transparency:</strong> We never manufacture fake numbers. Estimates and demo values are clearly flagged.</li>
              <li><strong>3. Human-First Content:</strong> We believe in E-E-A-T and editorial substance over repetitive AI slop.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead title="Editorial Policy & Integrity Standards" description="How we review tools, publish educational guides, and maintain strict editorial independence." canonicalPath="/editorial-policy" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 text-slate-800 space-y-6 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Editorial Policy</h1>
        <p className="text-base text-slate-600">
          Our editorial guidelines govern every article, comparison review, and tool recommendation published across {BRAND.name}.
        </p>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Independent Testing &amp; Fact-Checking</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            We test software and tools hands-on before publishing guides. Our opinions are never influenced by affiliate partnerships, paid placements, or sponsorships. When an affiliate relationship exists, it is disclosed prominently on the page.
          </p>
          <h3 className="font-bold text-slate-900 text-base">Correction &amp; Update Cadence</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Search engine algorithms evolve rapidly. We review cornerstone guides every 90 to 180 days to reflect new Google updates, Core Web Vitals changes, and current best practices.
          </p>
        </div>
      </div>
    </div>
  );
};

export const AffiliateDisclosurePage: React.FC = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead title="Affiliate Disclosure & FTC Compliance" description="Full disclosure regarding partner links, commissions, and editorial independence on RankPilot." canonicalPath="/affiliate-disclosure" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 text-slate-800 space-y-6 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Affiliate Disclosure</h1>
        <p className="text-base text-slate-600">
          Compliance with Federal Trade Commission (FTC) guidelines and international advertising transparency laws.
        </p>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
          <p>
            {BRAND.affiliateDisclosureNotice}
          </p>
          <p>
            When you purchase a product or service through an affiliate link on {BRAND.name}, we may receive a referral commission from the vendor. <strong>This does not increase the price you pay.</strong> In many cases, our partner agreements secure discounted rates or extended trials for our community.
          </p>
          <p>
            We only recommend products, software, and services that we have personally tested, evaluated, and determined provide genuine value to creators and SEO professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead title="Privacy Policy & GDPR Compliance" description="Privacy practices, cookies, and local data storage on RankPilot." canonicalPath="/privacy" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 text-slate-800 space-y-6 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
          <p><strong>Effective Date:</strong> October 2026</p>
          <p>
            Your privacy is fundamental to our platform. {BRAND.name} is designed to operate primarily without requiring user accounts or passwords.
          </p>
          <h4 className="font-bold text-slate-900">Local Browser Storage</h4>
          <p>
            Your saved keywords, content drafts, and favorite tools are stored locally in your own browser using HTML5 LocalStorage. We do not transmit or sell your personal workspace drafts to third-party ad networks.
          </p>
          <h4 className="font-bold text-slate-900">GDPR &amp; European Privacy</h4>
          <p>
            We honor European General Data Protection Regulation (GDPR) standards. You can clear your stored data at any time via your browser settings or directly inside the &ldquo;My Workspace&rdquo; panel.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead title="Terms of Service" description="Terms of service and acceptable use for RankPilot tools and services." canonicalPath="/terms" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 text-slate-800 space-y-6 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
          <p>
            By accessing or using {BRAND.name}, you agree to use our tools responsibly for legitimate research, content writing, and educational purposes.
          </p>
          <p>
            Automated scraping, denial-of-service abuse, and attempts to circumvent rate limits are strictly prohibited. All content and heuristic tools are provided on an &ldquo;as is&rdquo; basis for informational assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-24">
      <SEOHead title={`Contact ${BRAND.name} Support & Partnerships`} description="Reach our team for tool feedback, feature requests, or partnership inquiries." canonicalPath="/contact" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center">Contact Us</h1>
        <p className="mt-2 text-sm text-slate-600 text-center">
          Have a feature suggestion or found an issue? Send us a direct note.
        </p>

        <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {sent ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 text-sm">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <h4 className="font-bold text-emerald-950 text-base">Message Sent!</h4>
              <p className="mt-1 text-xs">Thanks for reaching out. We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white resize-y"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
