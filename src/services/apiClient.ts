import { 
  BusinessIntelligenceResult, 
  NormalizedInstagramInput, 
  InputValidationError 
} from '../types';

export interface HealthResponse {
  status: string;
  engine: string;
  model: string;
  hasGeminiKey?: boolean;
  hasXaiKey?: boolean;
  cachedAnalysesCount?: number;
}

export async function checkBackendHealth(): Promise<HealthResponse> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err: any) {
    return { 
      status: 'offline', 
      engine: 'gemini_flash', 
      model: 'gemini-flash-latest', 
      hasGeminiKey: false 
    };
  }
}

export async function normalizeInstagramHandle(input: string): Promise<{
  success: boolean;
  data?: NormalizedInstagramInput;
  error?: InputValidationError;
}> {
  const res = await fetch('/api/normalize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });
  return await res.json();
}

export async function executeProfileAnalysis(params: {
  input?: string;
  demoPresetId?: string;
  customAnalysisPrompt?: string;
  customMetrics?: {
    followers?: string | number;
    following?: string | number;
    posts_count?: string | number;
    is_verified?: boolean;
  };
}): Promise<BusinessIntelligenceResult> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const message = errData.error || errData.details || `Analysis request failed with status ${res.status}`;
    throw new Error(message);
  }

  return await res.json();
}

export async function fetchDefaultPrompt(): Promise<string> {
  try {
    const res = await fetch('/api/default-prompt');
    if (!res.ok) throw new Error('Failed to fetch default prompt');
    const data = await res.json();
    return data.defaultPrompt;
  } catch (err) {
    return '';
  }
}

export async function fetchAnalysisReport(analysisId: string): Promise<BusinessIntelligenceResult> {
  const res = await fetch(`/api/analysis/${analysisId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch report with ID ${analysisId}`);
  }
  return await res.json();
}

export async function fetchDemoPresets(): Promise<Array<{
  id: string;
  name: string;
  handle: string;
  category: string;
  status: string;
}>> {
  const res = await fetch('/api/demo-presets');
  if (!res.ok) return [];
  const data = await res.json();
  return data.presets || [];
}
