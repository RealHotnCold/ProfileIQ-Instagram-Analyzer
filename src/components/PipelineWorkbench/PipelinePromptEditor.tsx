import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  FileCode2,
  Cpu,
  Layers,
  Info,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { DEFAULT_GEMINI_ANALYSIS_PROMPT, PROMPT_PRESETS, PromptPreset } from '../../constants/defaultPrompts';

interface PipelinePromptEditorProps {
  promptValue: string;
  onPromptChange: (newPrompt: string) => void;
  onResetPrompt: () => void;
  activeModelName?: string;
  isPipelineRunning?: boolean;
}

export const PipelinePromptEditor: React.FC<PipelinePromptEditorProps> = ({
  promptValue,
  onPromptChange,
  onResetPrompt,
  activeModelName = 'gemini-flash-latest',
  isPipelineRunning = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [resetNotification, setResetNotification] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string>('standard');

  const isDefault = promptValue.trim() === DEFAULT_GEMINI_ANALYSIS_PROMPT.trim();

  // Character and word counts
  const charCount = promptValue.length;
  const wordCount = promptValue.trim() ? promptValue.trim().split(/\s+/).length : 0;
  const estTokens = Math.round(charCount / 4);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetClick = () => {
    onResetPrompt();
    setActivePresetId('standard');
    setResetNotification(true);
    setTimeout(() => setResetNotification(false), 2500);
  };

  const handleSelectPreset = (preset: PromptPreset) => {
    onPromptChange(preset.prompt);
    setActivePresetId(preset.id);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Pipeline Stage 04: Gemini Analysis & Synthesis Prompt
              </h3>
              {isDefault ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Default Prompt
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse">
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  Customized Directives
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and customize the system prompt instructions passed to Gemini during business intelligence synthesis.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
          
          {/* Reset Button */}
          <button
            type="button"
            onClick={handleResetClick}
            disabled={isPipelineRunning}
            title="Reset prompt window back to the original default analysis prompt"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition cursor-pointer ${
              !isDefault
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 shadow-2xs font-bold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${resetNotification ? 'animate-spin text-amber-600' : ''}`} />
            <span>Reset to Default</span>
          </button>

          {/* Copy Prompt Button */}
          <button
            type="button"
            onClick={handleCopyPrompt}
            title="Copy current prompt text to clipboard"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Toggle Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            aria-label={isExpanded ? 'Collapse prompt window' : 'Expand prompt window'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preset Directive Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          <span>Analysis Focus Presets:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PROMPT_PRESETS.map(preset => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                <span>{preset.name.split(' (')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-500'
                }`}>
                  {preset.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Toast Feedback */}
      {resetNotification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Default analysis prompt restored successfully!</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">100% Grounded Standard</span>
        </div>
      )}

      {/* Expandable Prompt Editor Window */}
      {isExpanded ? (
        <div className="space-y-3">
          
          {/* Main Prompt Textarea Window */}
          <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-inner">
            
            {/* Editor Toolbar Header */}
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-300 font-semibold">system_instruction.prompt</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Gemini 3.7 Flash Engine</span>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span>{wordCount} words</span>
                <span className="text-slate-600">|</span>
                <span>{charCount} chars</span>
                <span className="text-slate-600">|</span>
                <span className="text-indigo-300 font-bold font-mono">~{estTokens} tokens</span>
              </div>
            </div>

            {/* Editable Text Area */}
            <div className="relative">
              <textarea
                value={promptValue}
                onChange={(e) => {
                  onPromptChange(e.target.value);
                  setActivePresetId('custom');
                }}
                disabled={isPipelineRunning}
                rows={12}
                placeholder="Enter custom Gemini analysis directives..."
                className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-4 leading-relaxed outline-none resize-y selection:bg-indigo-600 selection:text-white border-0 focus:ring-1 focus:ring-indigo-500 transition"
                spellCheck={false}
              />
            </div>

            {/* Editor Bottom Bar */}
            <div className="bg-slate-950/80 px-4 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Live Editable: Edits apply directly to the next analysis run</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Directives are validated against JSON output schema</span>
              </div>
            </div>
          </div>

          {/* Injected Variables Reference Pill Bar */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Automated Context Variables Available to Prompt:
              </span>
              <span className="text-slate-400 font-normal">Passed automatically by data acquisition stage</span>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700" title="Target Instagram Handle">
                @{'{{handle}}'}
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700" title="Collected Evidence Inventory IDs & Directness">
                {'{{evidence_inventory}}'}
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700" title="Discovered Website Sources & Crawled URLs">
                {'{{discovered_sources}}'}
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700" title="Followers, Posts, Velocity & Verification Tier">
                {'{{social_footprint}}'}
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700" title="Pre-extracted Category & Offerings Signals">
                {'{{research_findings}}'}
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* Collapsed Preview State */
        <div 
          onClick={() => setIsExpanded(true)}
          className="bg-slate-900 text-slate-300 rounded-xl p-3 font-mono text-xs cursor-pointer hover:bg-slate-850 transition border border-slate-800 flex items-center justify-between"
        >
          <div className="truncate text-slate-400 pr-4">
            <span className="text-indigo-400 font-bold">Prompt Directives: </span>
            {promptValue.substring(0, 90)}...
          </div>
          <span className="text-[11px] text-indigo-400 hover:text-indigo-300 font-sans font-semibold flex-shrink-0">
            Click to expand editor & view full directives →
          </span>
        </div>
      )}
    </div>
  );
};
