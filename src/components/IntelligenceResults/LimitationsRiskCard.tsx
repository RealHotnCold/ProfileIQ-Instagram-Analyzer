import React from 'react';
import { BusinessIntelligenceResult } from '../../types';
import { AlertTriangle, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

interface LimitationsRiskCardProps {
  limitations: BusinessIntelligenceResult['limitations'];
  contradictions: BusinessIntelligenceResult['contradictions'];
}

export const LimitationsRiskCard: React.FC<LimitationsRiskCardProps> = ({
  limitations,
  contradictions,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Pipeline Limitations & Data Boundary Disclosures
            </h3>
            <p className="text-xs text-slate-500">
              Transparent reporting of data sparsity, signal ambiguities, and verification boundaries
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {limitations.length} Boundary Disclosures
        </div>
      </div>

      {/* Contradictions Alert if any */}
      {contradictions && contradictions.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-900">
          <div className="flex items-center gap-2 font-bold text-rose-800">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Detected Cross-Signal Contradictions</span>
          </div>
          <ul className="space-y-1 text-rose-700 pl-6 list-disc">
            {contradictions.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Limitations List */}
      <div className="space-y-3">
        {limitations.length === 0 ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>High data completeness across all core commercial vectors. No critical data gaps detected.</span>
          </div>
        ) : (
          limitations.map((lim, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900">
                  {lim.limitation_type}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  {lim.impact_on_confidence}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {lim.description}
              </p>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Recommended Follow-up: </span>
                {lim.recommended_follow_up}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
