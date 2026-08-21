import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  FileText, 
  RefreshCw, 
  Play, 
  Share2, 
  Zap,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'workbench' | 'results' | 'raw_schema';
  setActiveTab: (tab: 'workbench' | 'results' | 'raw_schema') => void;
  isRunning: boolean;
  onRunPipeline: () => void;
  onOpenExport: () => void;
  hasResult: boolean;
  activeProfileHandle?: string;
  isBackendHealthy: boolean;
  hasXaiKey?: boolean;
  hasGeminiKey?: boolean;
  activeModelName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isRunning,
  onRunPipeline,
  onOpenExport,
  hasResult,
  activeProfileHandle,
  isBackendHealthy,
  hasXaiKey,
  hasGeminiKey,
  activeModelName = 'gemini-flash-latest',
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Engine Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  ProfileIQ <span className="text-indigo-600 font-medium">Intelligence Engine</span>
                </span>
                <span className="px-2 py-0.5 rounded border border-indigo-100 bg-indigo-50 text-[10px] font-bold text-indigo-700 uppercase tracking-wide">
                  Gemini Flash
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200">
            <button
              id="tab-workbench"
              onClick={() => setActiveTab('workbench')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'workbench'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Pipeline & Analyzer</span>
            </button>

            <button
              id="tab-results"
              onClick={() => setActiveTab('results')}
              disabled={!hasResult && !isRunning}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'results'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                  : hasResult
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  : 'text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Intelligence Output</span>
              {hasResult && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            <button
              id="tab-schema"
              onClick={() => setActiveTab('raw_schema')}
              disabled={!hasResult}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'raw_schema'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                  : hasResult
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  : 'text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>JSON Schema</span>
            </button>
          </nav>

          {/* Action Buttons & Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engine Status</span>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-500 animate-ping' : isBackendHealthy ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {isRunning ? 'Synthesizing...' : isBackendHealthy ? 'Operational' : 'Offline'}
              </span>
            </div>

            <div className="h-7 w-px bg-slate-200 hidden sm:block"></div>

            {hasResult && (
              <button
                id="btn-export-report"
                onClick={onOpenExport}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-md border border-slate-200 shadow-xs transition"
                title="Export Intelligence Dossier"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Export</span>
              </button>
            )}

            <button
              id="btn-run-pipeline-header"
              onClick={onRunPipeline}
              disabled={isRunning}
              className={`flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold rounded-md shadow-xs transition-colors ${
                isRunning
                  ? 'bg-amber-600 text-white cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Analyze Profile</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Sub-status Bar */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 py-1 text-xs text-slate-500">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-700 font-medium text-[11px]">Layer 1: Input Normalization</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-700 font-medium text-[11px]">Layer 2: Gemini Web Research</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-slate-700 font-medium text-[11px]">Layer 3: Evidence Synthesis</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            {activeProfileHandle && (
              <span className="hidden md:inline text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Target: @{activeProfileHandle}
              </span>
            )}
            <span className="flex items-center space-x-1.5 text-slate-600">
              <ShieldCheck className="w-3 h-3 text-indigo-600" />
              <span>Model: <span className="font-mono font-medium text-slate-800">{activeModelName}</span></span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
