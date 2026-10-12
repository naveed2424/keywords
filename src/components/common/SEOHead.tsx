import { useEffect } from 'react';
import { BRAND } from '../../config/brand';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: Record<string, any>;
  ogType?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  schema,
  ogType = 'website',
}) => {
  useEffect(() => {
    // Dynamic document title
    const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`;
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (nameOrProperty: string, content: string) => {
      let element =
        document.querySelector(`meta[name="${nameOrProperty}"]`) ||
        document.querySelector(`meta[property="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (nameOrProperty.startsWith('og:') || nameOrProperty.startsWith('twitter:')) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:type', ogType);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    // Canonical link
    const canonicalUrl = `${window.location.origin}${canonicalPath || window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema
    const scriptId = 'rankpilot-jsonld-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalPath, schema, ogType]);

  return null;
};
