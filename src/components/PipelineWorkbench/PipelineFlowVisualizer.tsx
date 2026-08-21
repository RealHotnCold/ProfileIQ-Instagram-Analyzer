import React from 'react';
import { 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  Clock, 
  Layers,
  Sparkles,
  Search,
  FileCheck,
  Zap,
  BarChart,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { AnalysisPipelineStep } from '../../types';

interface PipelineFlowVisualizerProps {
  steps: AnalysisPipelineStep[];
  currentStepIndex: number;
  isRunning: boolean;
  totalDurationMs?: number;
}

export const PipelineFlowVisualizer: React.FC<PipelineFlowVisualizerProps> = ({
  steps,
  currentStepIndex,
  isRunning,
  totalDurationMs,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Gemini Intelligence Pipeline Execution
            </h3>
            <p className="text-xs text-slate-500">
              Real-time multi-stage verification & evidence synthesis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRunning && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Stage {currentStepIndex + 1} of {steps.length}
            </span>
          )}
          {totalDurationMs !== undefined && !isRunning && (
            <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3 text-slate-400" />
              Pipeline Time: {(totalDurationMs / 1000).toFixed(1)}s
            </span>
          )}
        </div>
      </div>

      {/* Visual Stepper List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';
          const isFailed = step.status === 'failed';
          const isPending = step.status === 'pending';

          return (
            <div
              key={step.step_number}
              className={`p-3 rounded-xl border text-xs transition-all relative ${
                isInProgress
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/20 text-slate-800'
                  : isFailed
                  ? 'border-rose-200 bg-rose-50/30 text-rose-800'
                  : 'border-slate-200 bg-slate-50/60 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  0{step.step_number}
                </span>

                <div>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isInProgress && <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />}
                  {isFailed && <AlertCircle className="w-3.5 h-3.5 text-rose-500" />}
                  {isPending && <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />}
                </div>
              </div>

              <div className="font-bold text-xs text-slate-900 truncate">
                {step.name}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                {step.description}
              </p>

              {step.duration_ms !== undefined && (
                <div className="mt-2 text-[10px] font-mono text-slate-400">
                  {step.duration_ms}ms
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
