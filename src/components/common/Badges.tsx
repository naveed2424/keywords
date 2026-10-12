import React from 'react';
import { DifficultyLabel, SearchIntent } from '../../types/seo';

export const DifficultyBadge: React.FC<{
  difficulty: number;
  label?: DifficultyLabel;
  showScore?: boolean;
}> = ({ difficulty, label, showScore = true }) => {
  let displayLabel = label;
  if (!displayLabel) {
    if (difficulty < 25) displayLabel = 'Very Easy';
    else if (difficulty < 35) displayLabel = 'Easy';
    else if (difficulty < 50) displayLabel = 'Medium';
    else if (difficulty < 75) displayLabel = 'Hard';
    else displayLabel = 'Very Hard';
  }

  let colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (difficulty >= 25 && difficulty < 35) {
    colorClasses = 'bg-teal-50 text-teal-700 border-teal-200';
  } else if (difficulty >= 35 && difficulty < 50) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (difficulty >= 50 && difficulty < 75) {
    colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
  } else if (difficulty >= 75) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      <span>{displayLabel}</span>
      {showScore && <span className="opacity-75 font-mono">({difficulty})</span>}
    </span>
  );
};

export const IntentBadge: React.FC<{ intent: SearchIntent }> = ({ intent }) => {
  const configs: Record<SearchIntent, { bg: string; text: string; label: string }> = {
    informational: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'Informational' },
    commercial: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', label: 'Commercial' },
    transactional: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Transactional' },
    navigational: { bg: 'bg-slate-100 border-slate-200', text: 'text-slate-700', label: 'Navigational' },
  };

  const c = configs[intent] || configs.informational;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
};

export const OpportunityScore: React.FC<{ score: number }> = ({ score }) => {
  let color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score < 50) color = 'text-amber-600 bg-amber-50 border-amber-200';
  if (score < 30) color = 'text-rose-600 bg-rose-50 border-rose-200';

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border font-semibold text-xs ${color}`}>
      <span>Score:</span>
      <span className="font-mono text-sm">{score}/100</span>
    </div>
  );
};
