import React, { useState, useEffect } from 'react';
import { 
  BusinessIntelligenceResult, 
  AnalysisPipelineStep,
  ProfileSocialMetrics
} from './types';
import { Header } from './components/Header';
import { ProfileInputForm } from './components/DataInputLayer/ProfileInputForm';
import { PipelineFlowVisualizer } from './components/PipelineWorkbench/PipelineFlowVisualizer';
import { PipelinePromptEditor } from './components/PipelineWorkbench/PipelinePromptEditor';
import { DEFAULT_GEMINI_ANALYSIS_PROMPT } from './constants/defaultPrompts';
import { ExecutiveSummaryCard } from './components/IntelligenceResults/ExecutiveSummaryCard';
import { BusinessClassificationView } from './components/IntelligenceResults/BusinessClassificationView';
import { OfferingsMatrix } from './components/IntelligenceResults/OfferingsMatrix';
import { AudiencePositioningCard } from './components/IntelligenceResults/AudiencePositioningCard';
import { ContentEditorialCard } from './components/IntelligenceResults/ContentEditorialCard';
import { ConfidenceEvidenceTrail } from './components/IntelligenceResults/ConfidenceEvidenceTrail';
import { StrategicInsightsCard } from './components/IntelligenceResults/StrategicInsightsCard';
import { LimitationsRiskCard } from './components/IntelligenceResults/LimitationsRiskCard';
import { ExportShareModal } from './components/ExportShareModal';
import { 
  checkBackendHealth, 
  executeProfileAnalysis, 
  fetchDemoPresets,
  normalizeInstagramHandle 
} from './services/apiClient';
import { 
  Play, 
  Sparkles, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  FileCode, 
  Copy, 
  Check, 
  Zap,
  Globe,
  Info,
  ShieldCheck
} from 'lucide-react';

const PIPELINE_STAGES_CONFIG: Array<{ step_number: number; name: string; description: string }> = [
  { step_number: 1, name: 'Validating handle', description: 'Sanitizing handle format and validating Instagram profile URL' },
  { step_number: 2, name: 'Identifying public signals', description: 'Querying public domain signals, open graph metadata & web endpoints' },
  { step_number: 3, name: 'Building evidence inventory', description: 'Assembling structured citations with source URLs and timestamps' },
  { step_number: 4, name: 'Gemini public research', description: 'Focused web intelligence query to discover brand context & domains' },
  { step_number: 5, name: 'Identifying products & services', description: 'Extracting product catalog, service models & price indicators' },
  { step_number: 6, name: 'Analyzing business category', description: 'Standardizing industry taxonomy and niche market specialization' },
  { step_number: 7, name: 'Analyzing brand signals', description: 'Extracting archetype, positioning statement and differentiators' },
  { step_number: 8, name: 'Generating strategic insights', description: 'Synthesizing growth advisory, opportunities & peer context' },
  { step_number: 9, name: 'Calculating signal scores', description: 'Calibrating product clarity, brand positioning & evidence scores' },
  { step_number: 10, name: 'Assembling report', description: 'Compiling final structured dossier and validating JSON schema' },
];

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'workbench' | 'results' | 'raw_schema'>('workbench');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [rawJsonCopied, setRawJsonCopied] = useState(false);

  // Input & Preset State
  const [inputHandle, setInputHandle] = useState<string>('solsticebotanicals');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('beauty_skincare');

  // Prompt Configuration State
  const [analysisPrompt, setAnalysisPrompt] = useState<string>(DEFAULT_GEMINI_ANALYSIS_PROMPT);

  // Backend Engine Health State
  const [isBackendHealthy, setIsBackendHealthy] = useState(true);
  const [hasGeminiKey, setHasGeminiKey] = useState(true);
  const [activeModelName, setActiveModelName] = useState('gemini-flash-latest');

  // Execution & Stepper State
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [pipelineSteps, setPipelineSteps] = useState<AnalysisPipelineStep[]>(
    PIPELINE_STAGES_CONFIG.map(s => ({ ...s, status: 'pending' }))
  );
  const [totalExecutionTimeMs, setTotalExecutionTimeMs] = useState<number | undefined>(undefined);
  const [pipelineError, setPipelineError] = useState<string | null>(null);

  // Result Dossier
  const [report, setReport] = useState<BusinessIntelligenceResult | null>(null);

  // Check health on mount
  useEffect(() => {
    checkBackendHealth().then(res => {
      setIsBackendHealthy(res.status === 'ok');
      setHasGeminiKey(Boolean(res.hasGeminiKey ?? res.hasXaiKey));
      if (res.model) setActiveModelName(res.model);
    });
  }, []);

  const handleSelectPreset = (presetId: string, handle: string) => {
    setSelectedPresetId(presetId);
    setInputHandle(handle);
    setPipelineError(null);
  };

  // Main 1-Click Execution Controller
  const handleRunAnalysis = async (
    customInput?: string,
    customMetrics?: {
      followers?: string;
      following?: string;
      posts_count?: string;
      is_verified?: boolean;
    }
  ) => {
    const targetInput = (customInput || inputHandle || '').trim();
    if (!targetInput) {
      setPipelineError('Please provide an Instagram username or profile URL.');
      return;
    }

    setPipelineError(null);
    setIsRunning(true);
    setTotalExecutionTimeMs(undefined);
    const overallStartTime = Date.now();

    // Reset steps to pending
    const initialSteps: AnalysisPipelineStep[] = PIPELINE_STAGES_CONFIG.map(s => ({
      ...s,
      status: 'pending',
      duration_ms: undefined,
    }));
    setPipelineSteps(initialSteps);
    setCurrentStepIndex(0);

    // Helper to simulate step progression smoothly
    const advanceStep = async (stepIdx: number, duration: number) => {
      setCurrentStepIndex(stepIdx);
      setPipelineSteps(prev =>
        prev.map((s, i) => {
          if (i < stepIdx) return { ...s, status: 'completed' };
          if (i === stepIdx) return { ...s, status: 'in_progress' };
          return { ...s, status: 'pending' };
        })
      );
      await new Promise(r => setTimeout(r, duration));
      setPipelineSteps(prev =>
        prev.map((s, i) => (i === stepIdx ? { ...s, status: 'completed', duration_ms: duration } : s))
      );
    };

    try {
      // Step 1: Validating handle
      await advanceStep(0, 180);

      // Step 2: Identifying public signals
      await advanceStep(1, 240);

      // Step 3: Building evidence inventory
      await advanceStep(2, 200);

      // Step 4: Gemini public research
      await advanceStep(3, 300);

      // Trigger backend API call in parallel with remaining visual steps
      const apiPromise = executeProfileAnalysis({
        input: targetInput,
        demoPresetId: !hasGeminiKey && selectedPresetId ? selectedPresetId : undefined,
        customAnalysisPrompt: analysisPrompt,
        customMetrics,
      });

      // Step 5: Identifying products & services
      await advanceStep(4, 250);

      // Step 6: Analyzing business category
      await advanceStep(5, 220);

      // Step 7: Analyzing brand signals
      await advanceStep(6, 220);

      // Step 8: Generating strategic insights
      await advanceStep(7, 240);

      // Step 9: Calculating signal scores
      await advanceStep(8, 200);

      // Step 10: Assembling report
      setCurrentStepIndex(9);
      setPipelineSteps(prev =>
        prev.map((s, i) => (i === 9 ? { ...s, status: 'in_progress' } : s))
      );

      // Wait for backend response
      const synthesizedReport = await apiPromise;

      setPipelineSteps(prev =>
        prev.map((s, i) => (i === 9 ? { ...s, status: 'completed', duration_ms: 150 } : s))
      );

      const totalTime = Date.now() - overallStartTime;
      setTotalExecutionTimeMs(totalTime);
      setReport(synthesizedReport);
      setIsRunning(false);

      // Seamlessly switch to Intelligence Output tab
      setActiveTab('results');
    } catch (err: any) {
      console.error('[ProfileIQ] Analysis failed:', err);
      setIsRunning(false);
      setPipelineError(err.message || 'Analysis pipeline failed. Please check network connectivity or API key.');
      setPipelineSteps(prev =>
        prev.map(s => (s.status === 'in_progress' ? { ...s, status: 'failed' } : s))
      );
    }
  };

  const handleCopyRawJson = () => {
    if (!report) return;
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setRawJsonCopied(true);
    setTimeout(() => setRawJsonCopied(false), 2000);
  };

  const handleUpdateMetrics = (newMetrics: ProfileSocialMetrics) => {
    setReport(prev => {
      if (!prev) return null;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          metrics: newMetrics,
        }
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRunning={isRunning}
        onRunPipeline={() => handleRunAnalysis()}
        onOpenExport={() => setIsExportOpen(true)}
        hasResult={Boolean(report)}
        activeProfileHandle={report?.profile.handle || inputHandle}
        isBackendHealthy={isBackendHealthy}
        hasXaiKey={hasGeminiKey}
        activeModelName={activeModelName}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Error Banner */}
        {pipelineError && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 flex items-start justify-between shadow-xs">
            <div className="flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-rose-900">Pipeline Execution Notice</h4>
                <p className="mt-0.5 text-rose-700 leading-relaxed">{pipelineError}</p>
              </div>
            </div>
            <button
              onClick={() => setPipelineError(null)}
              className="text-rose-500 hover:text-rose-800 font-bold px-2 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* TAB 1: WORKBENCH & ONE-CLICK ANALYZER */}
        {activeTab === 'workbench' && (
          <div className="space-y-6">
            
            {/* The One-Input Form */}
            <ProfileInputForm
              inputHandle={inputHandle}
              setInputHandle={setInputHandle}
              onAnalyze={handleRunAnalysis}
              isRunning={isRunning}
              onSelectPreset={handleSelectPreset}
              selectedPresetId={selectedPresetId}
              hasXaiKey={hasGeminiKey}
            />

            {/* 10-Stage Pipeline Stepper Tracker */}
            <PipelineFlowVisualizer
              steps={pipelineSteps}
              currentStepIndex={currentStepIndex}
              isRunning={isRunning}
              totalDurationMs={totalExecutionTimeMs}
            />

            {/* Pipeline Stage 04: Dedicated Synthesis Prompt Editor Section */}
            <PipelinePromptEditor
              promptValue={analysisPrompt}
              onPromptChange={setAnalysisPrompt}
              onResetPrompt={() => setAnalysisPrompt(DEFAULT_GEMINI_ANALYSIS_PROMPT)}
              activeModelName={activeModelName}
              isPipelineRunning={isRunning}
            />

            {/* Quick Result Preview Banner if Report Available */}
            {report && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Intelligence Dossier Ready for @{report.profile.handle}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {report.business.category} • {report.products.length} Products • {report.evidence.length} Verified Evidence Records
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('results')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>View Full Intelligence Output</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INTELLIGENCE OUTPUT REPORT */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {report ? (
              <>
                {/* 1. Executive Summary & Identity */}
                <ExecutiveSummaryCard 
                  report={report} 
                  onUpdateMetrics={handleUpdateMetrics}
                />

                {/* 2. Taxonomy & Classification */}
                <BusinessClassificationView business={report.business} />

                {/* 3. Commercial Offerings & Product/Service Matrix */}
                <OfferingsMatrix
                  products={report.products}
                  services={report.services}
                />

                {/* 4. Brand Positioning & Target Audience */}
                <AudiencePositioningCard
                  positioning={report.brand_positioning}
                  targetAudience={report.target_audience}
                />

                {/* 5. Content Strategy & Theme Distribution */}
                <ContentEditorialCard 
                  contentIntelligence={report.content_intelligence}
                  profileMetrics={report.profile.metrics} 
                />

                {/* 6. Grounded Evidence Citation Trail */}
                <ConfidenceEvidenceTrail
                  evidence={report.evidence}
                  sources={report.sources}
                />

                {/* 7. Strategic AI Advisory & Opportunities */}
                <StrategicInsightsCard
                  insights={report.insights}
                  opportunities={report.opportunities}
                  competitiveSignals={report.competitive_signals}
                />

                {/* 8. Pipeline Limitations & Boundary Disclosures */}
                <LimitationsRiskCard
                  limitations={report.limitations}
                  contradictions={report.contradictions}
                />
              </>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-xs space-y-4">
                <Zap className="w-12 h-12 text-indigo-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  No Intelligence Report Synthesized Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Enter an Instagram profile handle on the Analyzer tab and click "ANALYZE PROFILE" to synthesize a complete intelligence dossier.
                </p>
                <button
                  onClick={() => setActiveTab('workbench')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
                >
                  Go to Analyzer
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RAW SCHEMA & JSON */}
        {activeTab === 'raw_schema' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Synthesized ProfileIQ Output Schema (JSON)</h3>
                  <p className="text-xs text-slate-500">Standardized, validated JSON payload adhering to the ProfileIQ specification</p>
                </div>
              </div>

              {report && (
                <button
                  onClick={handleCopyRawJson}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg border border-slate-200 transition cursor-pointer"
                >
                  {rawJsonCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{rawJsonCopied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              )}
            </div>

            {report ? (
              <div className="bg-slate-900 p-5 rounded-xl font-mono text-xs text-slate-200 max-h-[70vh] overflow-y-auto leading-relaxed border border-slate-800">
                <pre>{JSON.stringify(report, null, 2)}</pre>
              </div>
            ) : (
              <div className="text-center py-12 text-xs text-slate-400">
                Execute an analysis first to view the complete JSON output tree.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sleek Diagnostic Status Footer */}
      <footer className="h-9 bg-slate-900 text-slate-300 flex items-center px-6 justify-between text-[11px] font-medium border-t border-slate-800 mt-auto">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            ProfileIQ Engine: {isBackendHealthy ? 'Operational' : 'Offline'}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Gemini Model: <span className="font-mono text-slate-200">{activeModelName}</span></span>
        </div>
        <div className="flex items-center space-x-3 text-slate-400 font-mono text-[10px]">
          <span>Server-Side Google GenAI</span>
          <span>•</span>
          <span>Vite + React 19</span>
        </div>
      </footer>

      {/* Export Dossier Modal */}
      {report && (
        <ExportShareModal
          report={report}
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}
