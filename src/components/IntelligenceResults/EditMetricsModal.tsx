import React, { useState } from 'react';
import { 
  X, 
  Check, 
  RotateCcw, 
  Users, 
  Grid, 
  Compass, 
  Heart, 
  CheckCircle2, 
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';
import { ProfileSocialMetrics } from '../../types';
import { buildVerifiedSocialMetrics, formatMetricNumber } from '../../utils/metricsFormatter';

interface EditMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMetrics?: ProfileSocialMetrics;
  handle: string;
  onSaveMetrics: (newMetrics: ProfileSocialMetrics) => void;
}

export const EditMetricsModal: React.FC<EditMetricsModalProps> = ({
  isOpen,
  onClose,
  currentMetrics,
  handle,
  onSaveMetrics,
}) => {
  if (!isOpen) return null;

  const [followers, setFollowers] = useState<string>(
    currentMetrics?.followers?.value?.toString() || currentMetrics?.followers?.formatted || ''
  );
  const [following, setFollowing] = useState<string>(
    currentMetrics?.following?.value?.toString() || currentMetrics?.following?.formatted || ''
  );
  const [postsCount, setPostsCount] = useState<string>(
    currentMetrics?.posts_count?.value?.toString() || currentMetrics?.posts_count?.formatted?.replace(' Posts', '') || ''
  );
  const [engagementRate, setEngagementRate] = useState<string>(
    currentMetrics?.engagement_rate_estimate?.value?.toString() || currentMetrics?.engagement_rate_estimate?.formatted?.replace('%', '') || ''
  );
  const [isVerified, setIsVerified] = useState<boolean>(
    Boolean(currentMetrics?.is_verified?.value)
  );
  const [postingCadence, setPostingCadence] = useState<string>(
    currentMetrics?.posting_cadence?.value?.toString() || '3-5 posts / week'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = buildVerifiedSocialMetrics({
      followersRaw: followers,
      followingRaw: following,
      postsRaw: postsCount,
      isVerified,
      postingCadence,
      customEngagementRate: engagementRate ? parseFloat(engagementRate) : undefined,
      basis: 'observed',
      evidenceIds: [`ev_user_calibrated_${Date.now()}`]
    });

    onSaveMetrics(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Calibrate & Verify Numerical Metrics
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                @{handle} • Grounded Metric Calibration
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative explanation */}
        <div className="bg-indigo-50/70 border-b border-indigo-100/80 px-6 py-2.5 flex items-start gap-2.5 text-xs text-indigo-900">
          <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Public meta tags and AI estimates can vary due to unauthenticated platform restrictions. Enter exact numbers below to update all dossier ratios and account tier classifications with 100% precision.
          </p>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Followers */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                Followers Count
              </label>
              <input
                type="text"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                placeholder="e.g. 142.8K or 142800"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
              <span className="text-[10px] text-slate-400">Supports formats: 142K, 1.2M, 520</span>
            </div>

            {/* Total Posts */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-purple-600" />
                Total Published Posts
              </label>
              <input
                type="text"
                value={postsCount}
                onChange={(e) => setPostsCount(e.target.value)}
                placeholder="e.g. 486 or 1200"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
              <span className="text-[10px] text-slate-400">Total catalog archive count</span>
            </div>

            {/* Following */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                Following Count
              </label>
              <input
                type="text"
                value={following}
                onChange={(e) => setFollowing(e.target.value)}
                placeholder="e.g. 624"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
              <span className="text-[10px] text-slate-400">Used for authority ratio calculation</span>
            </div>

            {/* Engagement Rate */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                Engagement Rate (%)
              </label>
              <input
                type="text"
                value={engagementRate}
                onChange={(e) => setEngagementRate(e.target.value)}
                placeholder="e.g. 3.4"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
              />
              <span className="text-[10px] text-slate-400">Leave blank to auto-benchmark</span>
            </div>

          </div>

          {/* Publishing Cadence & Verified Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Publishing Cadence
              </label>
              <select
                value={postingCadence}
                onChange={(e) => setPostingCadence(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-600 outline-none cursor-pointer"
              >
                <option value="Daily (7+ posts / week)">Daily (7+ posts / week)</option>
                <option value="4-6 posts / week">4-6 posts / week</option>
                <option value="2-3 posts / week">2-3 posts / week</option>
                <option value="1 post / week">1 post / week</option>
                <option value="Occasional / Seasonal">Occasional / Seasonal</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Account has Verified Badge (Blue Check)
                </span>
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Verified Numbers</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
