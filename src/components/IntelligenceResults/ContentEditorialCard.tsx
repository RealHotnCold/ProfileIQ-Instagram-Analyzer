import React from 'react';
import { BusinessIntelligenceResult, ProfileSocialMetrics } from '../../types';
import { LayoutGrid, Hash, PieChart, AlertCircle, Sparkles, MessageSquare, Calendar, Layers, Activity } from 'lucide-react';
import { BasisBadge } from './BasisBadge';

interface ContentEditorialCardProps {
  contentIntelligence: BusinessIntelligenceResult['content_intelligence'];
  profileMetrics?: ProfileSocialMetrics;
}

export const ContentEditorialCard: React.FC<ContentEditorialCardProps> = ({ 
  contentIntelligence,
  profileMetrics 
}) => {
  const {
    themes,
    theme_distribution,
    keywords,
    hashtags,
    content_signals,
    has_sufficient_content_evidence,
    limitations
  } = contentIntelligence;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Content Strategy & Editorial Intelligence
            </h3>
            <p className="text-xs text-slate-500">
              Editorial theme distribution, publishing cadence, semantic keywords, and brand hashtags
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {profileMetrics?.posts_count && (
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Layers className="w-3 h-3 text-indigo-600" />
              {profileMetrics.posts_count.formatted}
            </span>
          )}
          <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            {themes.length} Content Themes
          </div>
        </div>
      </div>

      {/* Cadence & Velocity highlight if available */}
      {profileMetrics && (profileMetrics.posting_cadence || profileMetrics.posts_count) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Total Published Posts
            </span>
            <div className="text-base font-bold font-mono text-slate-900">
              {profileMetrics.posts_count?.formatted || '—'}
            </div>
            <span className="text-[10px] text-slate-400">
              {profileMetrics.posts_count?.benchmark_context || 'Verified archive'}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Publishing Velocity
            </span>
            <div className="text-base font-bold text-slate-900">
              {profileMetrics.posting_cadence?.formatted || '—'}
            </div>
            <span className="text-[10px] text-slate-400">
              Editorial drop frequency
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-rose-500" />
              Audience Engagement
            </span>
            <div className="text-base font-bold font-mono text-slate-900">
              {profileMetrics.engagement_rate_estimate?.formatted || '—'}
            </div>
            <span className="text-[10px] text-slate-400">
              {profileMetrics.engagement_rate_estimate?.benchmark_context || 'Benchmarked rate'}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Theme Distribution & Visual Chart */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-indigo-600" />
            Content Theme Distribution
          </span>

          {!has_sufficient_content_evidence || theme_distribution.length === 0 ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
              <AlertCircle className="w-6 h-6 text-amber-500 mx-auto" />
              <p className="text-xs font-bold text-slate-700">
                Insufficient content evidence to calculate theme distribution.
              </p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Direct post media history is sparse or uncorroborated in public search index.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
              {theme_distribution.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.theme}</span>
                    <span className="font-mono font-bold text-indigo-600">{item.percentage}%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Qualitative Content Signals */}
          {content_signals.length > 0 && (
            <div className="p-4 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                Observed Content Signals
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {content_signals.map((sig, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Keywords & Hashtags */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Semantic Keywords */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              High-Intent Semantic Keywords
            </span>
            <div className="flex flex-wrap gap-1.5">
              {keywords.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No semantic keywords identified.</span>
              ) : (
                keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg border border-slate-200/80 transition"
                  >
                    {kw}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-indigo-600" />
              Community & Brand Hashtags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {hashtags.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No public hashtags detected.</span>
              ) : (
                hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-mono font-semibold rounded-lg border border-indigo-100"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
