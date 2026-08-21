import React from 'react';
import { EvidenceBasis } from '../../types';
import { Eye, Globe, Sparkles, HelpCircle } from 'lucide-react';

interface BasisBadgeProps {
  basis: EvidenceBasis;
  showIcon?: boolean;
  className?: string;
}

export const BasisBadge: React.FC<BasisBadgeProps> = ({ basis, showIcon = true, className = '' }) => {
  switch (basis) {
    case 'observed':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide ${className}`}
          title="Directly observed in profile data"
        >
          {showIcon && <Eye className="w-3 h-3 text-emerald-600" />}
          <span>Observed</span>
        </span>
      );
    case 'web_researched':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide ${className}`}
          title="Corroborated by verified public web source"
        >
          {showIcon && <Globe className="w-3 h-3 text-blue-600" />}
          <span>Web Researched</span>
        </span>
      );
    case 'ai_inference':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wide ${className}`}
          title="Synthesized inference based on evidence"
        >
          {showIcon && <Sparkles className="w-3 h-3 text-purple-600" />}
          <span>AI Inference</span>
        </span>
      );
    case 'insufficient_evidence':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide ${className}`}
          title="Insufficient public signals available"
        >
          {showIcon && <HelpCircle className="w-3 h-3 text-amber-600" />}
          <span>Insufficient Evidence</span>
        </span>
      );
  }
};
