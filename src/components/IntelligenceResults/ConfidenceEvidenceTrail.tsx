import React, { useState } from 'react';
import { BusinessIntelligenceResult } from '../../types';
import { ShieldCheck, FileText, ExternalLink, Globe, Instagram, Clock, Filter, Eye } from 'lucide-react';

interface ConfidenceEvidenceTrailProps {
  evidence: BusinessIntelligenceResult['evidence'];
  sources: BusinessIntelligenceResult['sources'];
}

export const ConfidenceEvidenceTrail: React.FC<ConfidenceEvidenceTrailProps> = ({
  evidence,
  sources,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvidence = filterType === 'all' 
    ? evidence 
    : evidence.filter(e => e.type === filterType);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Structured Evidence Inventory & Grounded Audit Trail
            </h3>
            <p className="text-xs text-slate-500">
              Verifiable citations and public signal sources underpinning every conclusion
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              filterType === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({evidence.length})
          </button>
          <button
            onClick={() => setFilterType('instagram_profile')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              filterType === 'instagram_profile' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setFilterType('official_website')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              filterType === 'official_website' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Website
          </button>
          <button
            onClick={() => setFilterType('public_web')}
            className={`px-2.5 py-1 rounded-md font-semibold transition ${
              filterType === 'public_web' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Public Web
          </button>
        </div>
      </div>

      {/* Sources Bar */}
      {sources.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Corroborating Source Domains ({sources.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {sources.map(src => (
              <a
                key={src.id}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100/80 border border-slate-200 rounded-lg text-xs text-slate-700 hover:text-indigo-600 transition shadow-xs"
              >
                {src.type === 'instagram_profile' ? (
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                ) : (
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                )}
                <span className="font-semibold">{src.title}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Items List */}
      <div className="space-y-3">
        {filteredEvidence.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400">
            No evidence records match the selected filter.
          </div>
        ) : (
          filteredEvidence.map(ev => (
            <div
              key={ev.id}
              className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl space-y-2 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {ev.id}
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    ev.type === 'instagram_profile'
                      ? 'bg-pink-50 text-pink-700 border border-pink-200'
                      : ev.type === 'official_website'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {ev.type.replace('_', ' ')}
                  </span>

                  <span className="text-xs font-semibold text-slate-600">
                    Field: <span className="text-slate-900 font-bold">{ev.field}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700 font-medium capitalize">
                    {ev.directness}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(ev.retrieved_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Evidence Value */}
              <div className="text-xs text-slate-900 font-medium bg-white p-3 rounded-lg border border-slate-200/80 leading-relaxed font-mono whitespace-pre-wrap">
                "{ev.value}"
              </div>

              {/* Citation Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1 truncate">
                  <span className="font-semibold text-slate-600">Source:</span>
                  <span>{ev.source_title}</span>
                </span>

                {ev.source_url && (
                  <a
                    href={ev.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold flex-shrink-0"
                  >
                    <span>View URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
