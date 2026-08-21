import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Globe,
  Instagram,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  Users,
  Grid,
  Compass,
  Info
} from 'lucide-react';
import { normalizeInstagramHandle } from '../../services/apiClient';

export interface UserMetricOverrides {
  followers?: string;
  following?: string;
  posts_count?: string;
  is_verified?: boolean;
}

interface ProfileInputFormProps {
  inputHandle: string;
  setInputHandle: (val: string) => void;
  onAnalyze: (customInput?: string, customMetrics?: UserMetricOverrides) => void;
  isRunning: boolean;
  onSelectPreset: (presetId: string, handle: string) => void;
  selectedPresetId?: string;
  hasXaiKey?: boolean;
  hasGeminiKey?: boolean;
}

export const ProfileInputForm: React.FC<ProfileInputFormProps> = ({
  inputHandle,
  setInputHandle,
  onAnalyze,
  isRunning,
  onSelectPreset,
  selectedPresetId,
  hasXaiKey,
  hasGeminiKey,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuggestion, setValidationSuggestion] = useState<string | null>(null);
  const [showMetricOverrides, setShowMetricOverrides] = useState(false);
  const [customFollowers, setCustomFollowers] = useState('');
  const [customFollowing, setCustomFollowing] = useState('');
  const [customPosts, setCustomPosts] = useState('');
  const [customVerified, setCustomVerified] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHandle(e.target.value);
    if (validationError) {
      setValidationError(null);
      setValidationSuggestion(null);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputHandle.trim()) {
      setValidationError('Please enter an Instagram handle or profile URL.');
      setValidationSuggestion('Example: @glossier or https://www.instagram.com/nike/');
      return;
    }

    // Client-side quick normalization check
    const check = await normalizeInstagramHandle(inputHandle.trim());
    if (!check.success) {
      setValidationError(check.error?.message || 'Invalid Instagram handle.');
      setValidationSuggestion(check.error?.suggestion || null);
      return;
    }

    setValidationError(null);
    setValidationSuggestion(null);

    const overrides: UserMetricOverrides = {};
    if (customFollowers.trim()) overrides.followers = customFollowers.trim();
    if (customFollowing.trim()) overrides.following = customFollowing.trim();
    if (customPosts.trim()) overrides.posts_count = customPosts.trim();
    if (customVerified) overrides.is_verified = true;

    onAnalyze(
      inputHandle.trim(), 
      Object.keys(overrides).length > 0 ? overrides : undefined
    );
  };

  const demoPresets = [
    {
      id: 'beauty_skincare',
      handle: 'solsticebotanicals',
      name: 'Solstice Botanicals',
      tag: 'Clean Skincare / D2C',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'restaurant_cafe',
      handle: 'latelierlevain',
      name: 'L’Atelier Levain',
      tag: 'Bakery & Viennoiserie',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'fashion_apparel',
      handle: 'auracoffeeroasters',
      name: 'Aura Coffee Roasters',
      tag: 'Specialty Roastery / D2C',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'insufficient_data',
      handle: 'phantom_stealth_labs',
      name: 'Phantom Labs',
      tag: 'Sparse Profile Test',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Single-Input Analysis Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              One-Click Intelligence Engine
            </span>
            <span className="text-xs text-slate-400">• Powered by Google Gemini</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Analyze any Instagram business profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Enter a single Instagram handle or profile URL. ProfileIQ automatically discovers public footprint signals, researches domain context with Gemini, and produces an evidence-grounded intelligence dossier.
          </p>
        </div>

        {/* The One Single Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Input Box */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Instagram className="w-5 h-5 text-indigo-500" />
              </div>

              <input
                id="input-instagram-handle"
                type="text"
                value={inputHandle}
                onChange={handleInputChange}
                disabled={isRunning}
                placeholder="e.g. @nike or https://www.instagram.com/latelierlevain/"
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-sm font-medium text-slate-900 placeholder:text-slate-400 rounded-xl border ${
                  validationError ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
                } transition-all outline-none`}
              />
            </div>

            {/* The One Primary Button */}
            <button
              id="btn-analyze-profile"
              type="submit"
              disabled={isRunning}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xs hover:shadow transition flex items-center justify-center space-x-2.5 flex-shrink-0 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>ANALYZE PROFILE</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="flex items-start gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-3 mt-2">
              <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">{validationError}</span>
                {validationSuggestion && (
                  <p className="text-rose-500 mt-0.5">{validationSuggestion}</p>
                )}
              </div>
            </div>
          )}

          {/* Expandable Accurate Numbers & Metric Overrides Drawer */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowMetricOverrides(!showMetricOverrides)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition py-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-500" />
              <span>Known Metrics & Number Calibration (Optional)</span>
              {showMetricOverrides ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {showMetricOverrides && (
              <div className="mt-2.5 p-4 bg-slate-50/90 border border-slate-200 rounded-xl space-y-3 animate-fadeIn">
                <div className="flex items-start gap-2 text-[11px] text-slate-600 pb-2 border-b border-slate-200/60">
                  <Info className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Provide exact known numbers to bypass platform scraping limitations and guarantee 100% numerical accuracy.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Users className="w-3 h-3 text-indigo-600" />
                      Followers
                    </label>
                    <input
                      type="text"
                      value={customFollowers}
                      onChange={(e) => setCustomFollowers(e.target.value)}
                      placeholder="e.g. 142.8K or 142800"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Grid className="w-3 h-3 text-purple-600" />
                      Total Posts
                    </label>
                    <input
                      type="text"
                      value={customPosts}
                      onChange={(e) => setCustomPosts(e.target.value)}
                      placeholder="e.g. 486"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-sky-600" />
                      Following
                    </label>
                    <input
                      type="text"
                      value={customFollowing}
                      onChange={(e) => setCustomFollowing(e.target.value)}
                      placeholder="e.g. 624"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={customVerified}
                      onChange={(e) => setCustomVerified(e.target.checked)}
                      className="w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span>Account has verified blue checkmark</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Demo Profiles Quick-Select */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              Demo Presets & Quick Test Profiles
            </span>
            <span className="text-[11px] text-slate-500">Click any preset to test immediately</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {demoPresets.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id, preset.handle)}
                disabled={isRunning}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedPresetId === preset.id
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {preset.name}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${preset.badgeColor}`}>
                    @{preset.handle}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {preset.tag}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Layer Automation Guarantee Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold mb-2">
            1
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Input Normalization</h4>
          <p className="text-slate-600 leading-relaxed">
            Sanitizes handles, rejects malformed routes or post URLs, and standardizes profile target URLs.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold mb-2">
            2
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Gemini Web Grounding</h4>
          <p className="text-slate-600 leading-relaxed">
            Performs focused public domain discovery, official website retrieval, and signal corroboration.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold mb-2">
            3
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Evidence-First Synthesis</h4>
          <p className="text-slate-600 leading-relaxed">
            Categorizes basis labels (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">observed</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">web_researched</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">ai_inference</code>) with verifiable citations.
          </p>
        </div>
      </div>
    </div>
  );
};
