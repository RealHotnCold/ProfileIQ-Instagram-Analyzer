import React from 'react';
import { BusinessIntelligenceResult } from '../../types';
import { BasisBadge } from './BasisBadge';
import { FolderTree, Tag, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BusinessClassificationViewProps {
  business: BusinessIntelligenceResult['business'];
}

export const BusinessClassificationView: React.FC<BusinessClassificationViewProps> = ({ business }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
      
      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FolderTree className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Business Taxonomy & Industry Classification
            </h3>
            <p className="text-xs text-slate-500">
              Categorical mapping and commercial classification
            </p>
          </div>
        </div>

        <BasisBadge basis={business.basis} />
      </div>

      {/* Grid of Classification Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Primary Category */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Primary Industry
          </span>
          <div className="font-bold text-sm text-slate-900">
            {business.category}
          </div>
          <div className="text-[10px] text-slate-400">
            Standardized commercial industry vertical
          </div>
        </div>

        {/* Subcategory */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Niche Subcategory
          </span>
          <div className="font-bold text-sm text-indigo-700">
            {business.subcategory}
          </div>
          <div className="text-[10px] text-slate-400">
            Specialized market segment
          </div>
        </div>

        {/* Confidence Level */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Classification Confidence
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm font-mono text-emerald-700">
              {business.confidence}%
            </span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${business.confidence}%` }}
              />
            </div>
          </div>
          <div className="text-[10px] text-slate-400">
            Based on corroborating domain evidence
          </div>
        </div>
      </div>

      {/* Short Summary Description */}
      <div className="p-3.5 bg-indigo-50/40 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-relaxed">
        <span className="font-bold">Executive Synopsis: </span>
        {business.short_description}
      </div>
    </div>
  );
};
