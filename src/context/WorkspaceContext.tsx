import React, { createContext, useContext, useState, useEffect } from 'react';
import { KeywordMetric, ArticleDraft, ContentIdea } from '../types/seo';

interface WorkspaceContextType {
  savedKeywords: KeywordMetric[];
  favoriteToolSlugs: string[];
  recentSearches: string[];
  savedDrafts: ArticleDraft[];
  savedIdeas: ContentIdea[];
  saveKeyword: (keyword: KeywordMetric) => void;
  removeKeyword: (keywordId: string) => void;
  isKeywordSaved: (keywordName: string) => boolean;
  toggleFavoriteTool: (slug: string) => void;
  isToolFavorite: (slug: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  saveDraft: (draft: ArticleDraft) => void;
  deleteDraft: (draftId: string) => void;
  saveIdea: (idea: ContentIdea) => void;
  removeIdea: (ideaId: string) => void;
  exportKeywordsCSV: () => void;
  exportWorkspaceJSON: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  KEYWORDS: 'rankpilot_saved_keywords',
  FAVORITE_TOOLS: 'rankpilot_favorite_tools',
  SEARCHES: 'rankpilot_recent_searches',
  DRAFTS: 'rankpilot_saved_drafts',
  IDEAS: 'rankpilot_saved_ideas',
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedKeywords, setSavedKeywords] = useState<KeywordMetric[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.KEYWORDS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoriteToolSlugs, setFavoriteToolSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITE_TOOLS);
      return saved ? JSON.parse(saved) : ['keyword-explorer', 'ai-article-writer', 'content-optimizer'];
    } catch {
      return ['keyword-explorer', 'ai-article-writer', 'content-optimizer'];
    }
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEARCHES);
      return saved ? JSON.parse(saved) : ['digital marketing', 'travel Europe', 'home workout'];
    } catch {
      return ['digital marketing', 'travel Europe', 'home workout'];
    }
  });

  const [savedDrafts, setSavedDrafts] = useState<ArticleDraft[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRAFTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedIdeas, setSavedIdeas] = useState<ContentIdea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IDEAS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(savedKeywords));
  }, [savedKeywords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_TOOLS, JSON.stringify(favoriteToolSlugs));
  }, [favoriteToolSlugs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCHES, JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(savedIdeas));
  }, [savedIdeas]);

  const saveKeyword = (kw: KeywordMetric) => {
    setSavedKeywords((prev) => {
      if (prev.some((k) => k.keyword.toLowerCase() === kw.keyword.toLowerCase())) return prev;
      return [kw, ...prev];
    });
  };

  const removeKeyword = (keywordId: string) => {
    setSavedKeywords((prev) => prev.filter((k) => k.id !== keywordId && k.keyword !== keywordId));
  };

  const isKeywordSaved = (keywordName: string) => {
    return savedKeywords.some((k) => k.keyword.toLowerCase() === keywordName.toLowerCase());
  };

  const toggleFavoriteTool = (slug: string) => {
    setFavoriteToolSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const isToolFavorite = (slug: string) => {
    return favoriteToolSlugs.includes(slug);
  };

  const addRecentSearch = (query: string) => {
    const clean = query.trim();
    if (!clean) return;
    setRecentSearches((prev) => [clean, ...prev.filter((q) => q.toLowerCase() !== clean.toLowerCase())].slice(0, 10));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const saveDraft = (draft: ArticleDraft) => {
    setSavedDrafts((prev) => {
      const existingIdx = prev.findIndex((d) => d.id === draft.id);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = draft;
        return copy;
      }
      return [draft, ...prev];
    });
  };

  const deleteDraft = (draftId: string) => {
    setSavedDrafts((prev) => prev.filter((d) => d.id !== draftId));
  };

  const saveIdea = (idea: ContentIdea) => {
    setSavedIdeas((prev) => {
      if (prev.some((i) => i.title.toLowerCase() === idea.title.toLowerCase())) return prev;
      return [idea, ...prev];
    });
  };

  const removeIdea = (ideaId: string) => {
    setSavedIdeas((prev) => prev.filter((i) => i.id !== ideaId));
  };

  const exportKeywordsCSV = () => {
    if (savedKeywords.length === 0) return;
    const headers = ['Keyword', 'Volume', 'Difficulty', 'Difficulty Label', 'CPC ($)', 'Intent', 'Opportunity Score'];
    const rows = savedKeywords.map((k) => [
      `"${k.keyword.replace(/"/g, '""')}"`,
      k.volume,
      k.difficulty,
      `"${k.difficultyLabel}"`,
      k.cpc,
      `"${k.intent}"`,
      k.opportunityScore,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rankpilot_keywords_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportWorkspaceJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      savedKeywords,
      savedDrafts,
      savedIdeas,
      favoriteToolSlugs,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `rankpilot_workspace_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        savedKeywords,
        favoriteToolSlugs,
        recentSearches,
        savedDrafts,
        savedIdeas,
        saveKeyword,
        removeKeyword,
        isKeywordSaved,
        toggleFavoriteTool,
        isToolFavorite,
        addRecentSearch,
        clearRecentSearches,
        saveDraft,
        deleteDraft,
        saveIdea,
        removeIdea,
        exportKeywordsCSV,
        exportWorkspaceJSON,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
