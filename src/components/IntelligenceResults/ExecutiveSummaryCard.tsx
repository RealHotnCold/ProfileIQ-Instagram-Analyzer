import React, { useState } from 'react';
import { BusinessIntelligenceResult, ProfileSocialMetrics } from '../../types';
import { BasisBadge } from './BasisBadge';
import { EditMetricsModal } from './EditMetricsModal';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Instagram, 
  ShieldCheck, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  Info,
  Users,
  Grid,
  Heart,
  Calendar,
  CheckCircle2,
  Share2,
  Compass,
  Edit3
} from 'lucide-react';

interface ExecutiveSummaryCardProps {
  report: BusinessIntelligenceResult;
  onUpdateMetrics?: (newMetrics: ProfileSocialMetrics) => void;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({ report, onUpdateMetrics }) => {
  const [isEditMetricsOpen, setIsEditMetricsOpen] = useState(false);
  const { profile, business, business_signals, status } = report;
  const metrics = profile.metrics;

  const scoreMetrics = [
    { label: 'Product Clarity', score: business_signals.product_clarity_score, desc: 'Clarity of tangible product catalog' },
    { label: 'Service Clarity', score: business_signals.service_clarity_score, desc: 'Clarity of service/booking model' },
    { label: 'Brand Positioning', score: business_signals.brand_positioning_score, desc: 'Coherence of market differentiation' },
    { label: 'Content Evidence', score: business_signals.content_evidence_score, desc: 'Depth of verified media signals' },
    { label: 'Evidence Quality', score: business_signals.overall_evidence_quality_score, desc: 'Cross-corroboration reliability' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header Row: Entity Identity & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs flex-shrink-0">
            {business.name.charAt(0)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {profile.display_name.value}
              </h1>

              {metrics?.is_verified?.value && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Verified
                </span>
              )}

              <BasisBadge basis={profile.display_name.basis} />

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                status === 'complete' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : status === 'partial' 
                  ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                  : 'bg-slate-100 text-slate-700 border border-slate-300'
              }`}>
                {status.replace('_', ' ')}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-mono text-indigo-600 font-semibold">
                <Instagram className="w-3.5 h-3.5" />
                @{profile.handle}
              </span>

              {profile.website.value && profile.website.value !== 'No verified website detected' && (
                <a
                  href={profile.website.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-700 hover:text-indigo-600 transition underline underline-offset-2"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.website.value.replace(/^https?:\/\//i, '').replace(/\/$/, '')}</span>
                  <BasisBadge basis={profile.website.basis} showIcon={false} className="text-[9px] py-0 px-1" />
                </a>
              )}

              {profile.location && (
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.location.value}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Intelligence Report Meta */}
        <div className="flex flex-col sm:items-end text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="font-mono text-[10px] text-slate-500 font-medium">ID: {report.analysis_id}</span>
          <span className="text-slate-600 font-medium mt-0.5">Engine: Google Gemini Flash</span>
          <span className="text-[11px] text-slate-400 mt-0.5">Generated: {new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Social Metrics & Audience Footprint Banner */}
      {metrics && (
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Audience & Social Footprint Analysis
              </span>
            </div>

            <div className="flex items-center gap-2">
              {metrics.account_tier && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 w-fit">
                  {metrics.account_tier.tier_label}
                </span>
              )}

              {onUpdateMetrics && (
                <button
                  type="button"
                  onClick={() => setIsEditMetricsOpen(true)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg shadow-2xs transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3 text-indigo-600" />
                  <span>Calibrate Numbers</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Followers */}
            <div 
              onClick={() => onUpdateMetrics && setIsEditMetricsOpen(true)}
              className={`bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs transition group ${
                onUpdateMetrics ? 'cursor-pointer hover:border-indigo-300 hover:shadow-xs' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 group-hover:text-indigo-600 transition">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  Followers
                </span>
                <div className="flex items-center gap-1">
                  <BasisBadge basis={metrics.followers.basis} showIcon={false} className="text-[9px] py-0 px-1" />
                  {onUpdateMetrics && (
                    <Edit3 className="w-2.5 h-2.5 text-slate-300 group-hover:text-indigo-500 transition opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 group-hover:text-indigo-700 transition">
                  {metrics.followers.formatted}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {metrics.followers.benchmark_context || 'Audience reach volume'}
                </div>
              </div>
            </div>

            {/* Total Posts */}
            <div 
              onClick={() => onUpdateMetrics && setIsEditMetricsOpen(true)}
              className={`bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs transition group ${
                onUpdateMetrics ? 'cursor-pointer hover:border-purple-300 hover:shadow-xs' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 group-hover:text-purple-600 transition">
                  <Grid className="w-3.5 h-3.5 text-purple-600" />
                  Total Posts
                </span>
                <div className="flex items-center gap-1">
                  <BasisBadge basis={metrics.posts_count.basis} showIcon={false} className="text-[9px] py-0 px-1" />
                  {onUpdateMetrics && (
                    <Edit3 className="w-2.5 h-2.5 text-slate-300 group-hover:text-purple-500 transition opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 group-hover:text-purple-700 transition">
                  {metrics.posts_count.formatted}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {metrics.posts_count.benchmark_context || 'Published catalog'}
                </div>
              </div>
            </div>

            {/* Following */}
            <div 
              onClick={() => onUpdateMetrics && setIsEditMetricsOpen(true)}
              className={`bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs transition group ${
                onUpdateMetrics ? 'cursor-pointer hover:border-sky-300 hover:shadow-xs' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 group-hover:text-sky-600 transition">
                  <Compass className="w-3.5 h-3.5 text-sky-600" />
                  Following
                </span>
                <div className="flex items-center gap-1">
                  {metrics.following && (
                    <BasisBadge basis={metrics.following.basis} showIcon={false} className="text-[9px] py-0 px-1" />
                  )}
                  {onUpdateMetrics && (
                    <Edit3 className="w-2.5 h-2.5 text-slate-300 group-hover:text-sky-500 transition opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 group-hover:text-sky-700 transition">
                  {metrics.following?.formatted || '—'}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {metrics.follower_to_following_ratio?.authority_assessment || 'Network footprint'}
                </div>
              </div>
            </div>

            {/* Est Engagement Rate */}
            <div 
              onClick={() => onUpdateMetrics && setIsEditMetricsOpen(true)}
              className={`bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs transition group ${
                onUpdateMetrics ? 'cursor-pointer hover:border-rose-300 hover:shadow-xs' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 group-hover:text-rose-600 transition">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  Engagement
                </span>
                <div className="flex items-center gap-1">
                  {metrics.engagement_rate_estimate && (
                    <BasisBadge basis={metrics.engagement_rate_estimate.basis} showIcon={false} className="text-[9px] py-0 px-1" />
                  )}
                  {onUpdateMetrics && (
                    <Edit3 className="w-2.5 h-2.5 text-slate-300 group-hover:text-rose-500 transition opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 group-hover:text-rose-700 transition">
                  {metrics.engagement_rate_estimate?.formatted || '—'}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {metrics.engagement_rate_estimate?.benchmark_context || 'Estimated interaction'}
                </div>
              </div>
            </div>

          </div>

          {/* Footprint Sub-bar: Cadence & Authority Ratio */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-600">
            {metrics.posting_cadence && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">Cadence:</span>
                <span className="font-semibold text-slate-900">{metrics.posting_cadence.formatted}</span>
              </div>
            )}

            {metrics.follower_to_following_ratio && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-slate-700">Authority Ratio:</span>
                <span className="font-mono font-bold text-slate-900">{metrics.follower_to_following_ratio.ratio_value}</span>
                <span className="text-[11px] text-slate-500">({metrics.follower_to_following_ratio.authority_assessment})</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid: Left Column Bio & Business Description | Right Column Business Signal Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Bio & Core Overview */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Bio Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-slate-400" />
                Extracted Instagram Bio
              </span>
              <BasisBadge basis={profile.bio.basis} />
            </div>
            <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
              {profile.bio.value}
            </p>
          </div>

          {/* Business Overview Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                Executive Business Overview
              </span>
              <BasisBadge basis={business.basis} />
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {business.detailed_description}
            </p>
          </div>
        </div>

        {/* Right Column: Business Signal Strength Radar / Bars */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                Business Signal Strength
              </span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Gemini Signal Index
              </span>
            </div>

            <div className="space-y-3">
              {scoreMetrics.map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="font-mono font-bold text-slate-900">{item.score}/100</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.score >= 80 ? 'bg-emerald-500' : item.score >= 50 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-start gap-1.5 text-[10px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>Scores reflect analysis signal clarity and evidence cross-verification depth.</span>
          </div>
        </div>
      </div>

      {/* Edit Metrics Calibration Modal */}
      {metrics && onUpdateMetrics && (
        <EditMetricsModal
          isOpen={isEditMetricsOpen}
          onClose={() => setIsEditMetricsOpen(false)}
          currentMetrics={metrics}
          handle={profile.handle}
          onSaveMetrics={onUpdateMetrics}
        />
      )}
    </div>
  );
};
