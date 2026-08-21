import React from 'react';
import { BusinessIntelligenceResult } from '../../types';
import { BasisBadge } from './BasisBadge';
import { Target, Compass, Sparkles, CheckCircle2, Award, Zap, HelpCircle } from 'lucide-react';

interface AudiencePositioningCardProps {
  positioning: BusinessIntelligenceResult['brand_positioning'];
  targetAudience: BusinessIntelligenceResult['target_audience'];
}

export const AudiencePositioningCard: React.FC<AudiencePositioningCardProps> = ({
  positioning,
  targetAudience,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Brand Positioning & Target Audience Intelligence
            </h3>
            <p className="text-xs text-slate-500">
              Market archetype, core differentiators, and ideal customer segments
            </p>
          </div>
        </div>

        <BasisBadge basis={positioning.basis} />
      </div>

      {/* Grid: Left Column Brand Positioning | Right Column Target Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Brand Positioning & Archetype */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Core Positioning Statement
            </span>
            <p className="text-xs text-slate-900 font-medium leading-relaxed">
              "{positioning.statement}"
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
              {positioning.archetype && (
                <span className="text-[11px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg flex items-center gap-1">
                  <Award className="w-3 h-3 text-indigo-600" />
                  Archetype: {positioning.archetype}
                </span>
              )}

              {positioning.tone_of_voice && positioning.tone_of_voice.map((tone, i) => (
                <span key={i} className="text-[10px] font-semibold px-2 py-0.5 bg-white text-slate-700 border border-slate-200 rounded">
                  {tone}
                </span>
              ))}
            </div>
          </div>

          {/* Differentiators */}
          <div className="p-4 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Verified Key Differentiators
            </span>

            {positioning.differentiators.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No explicit differentiators isolated.</p>
            ) : (
              <ul className="space-y-1.5 text-xs text-slate-700">
                {positioning.differentiators.map((diff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Target Audience Segments */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            Target Customer Segments ({targetAudience.length})
          </span>

          {targetAudience.length === 0 ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 italic">
              Insufficient data to determine customer segments.
            </div>
          ) : (
            <div className="space-y-3">
              {targetAudience.map((seg, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-xs text-slate-900">
                      {seg.segment}
                    </div>
                    <BasisBadge basis={seg.basis} showIcon={false} className="text-[9px]" />
                  </div>

                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Supporting Evidence: </span>
                    {seg.supporting_evidence}
                  </p>

                  {((seg.pain_points && seg.pain_points.length > 0) || (seg.buying_triggers && seg.buying_triggers.length > 0)) && (
                    <div className="pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      {seg.pain_points && seg.pain_points.length > 0 && (
                        <div>
                          <span className="font-semibold text-slate-700 block mb-0.5">Pain Points:</span>
                          <span className="text-slate-500">{seg.pain_points.join(', ')}</span>
                        </div>
                      )}

                      {seg.buying_triggers && seg.buying_triggers.length > 0 && (
                        <div>
                          <span className="font-semibold text-slate-700 block mb-0.5">Buying Triggers:</span>
                          <span className="text-slate-500">{seg.buying_triggers.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
