import React from 'react';
import { BusinessIntelligenceResult } from '../../types';
import { BasisBadge } from './BasisBadge';
import { Lightbulb, TrendingUp, Compass, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface StrategicInsightsCardProps {
  insights: BusinessIntelligenceResult['insights'];
  opportunities: BusinessIntelligenceResult['opportunities'];
  competitiveSignals: BusinessIntelligenceResult['competitive_signals'];
}

export const StrategicInsightsCard: React.FC<StrategicInsightsCardProps> = ({
  insights,
  opportunities,
  competitiveSignals,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Strategic AI Advisory & Growth Opportunities
            </h3>
            <p className="text-xs text-slate-500">
              Synthesized commercial recommendations and competitive landscape clues
            </p>
          </div>
        </div>

        <BasisBadge basis="ai_inference" />
      </div>

      {/* Strategic Insights */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Evidence-Grounded Strategic Insights
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map(ins => (
            <div
              key={ins.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="font-bold text-xs text-slate-900 leading-snug">
                    {ins.headline}
                  </h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    ins.impact === 'High'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {ins.impact} Impact
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ins.analysis}
                </p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-indigo-900 font-medium">
                <span className="font-bold text-indigo-700 block mb-0.5">Actionable Recommendation:</span>
                {ins.actionable_recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities & Competitive Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Growth Opportunities */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            Identified High-Value Opportunities
          </span>

          <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-2">
            {opportunities.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No specific opportunities synthesized.</p>
            ) : (
              <ul className="space-y-2 text-xs text-emerald-950">
                {opportunities.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Competitive Signals */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            Competitive Peer Signals
          </span>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            {competitiveSignals.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No direct peer comparisons found in public footprint.</p>
            ) : (
              competitiveSignals.map((comp, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{comp.competitor_or_peer}</span>
                    <BasisBadge basis={comp.basis} showIcon={false} className="text-[9px]" />
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {comp.context}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
