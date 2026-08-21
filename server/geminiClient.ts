/**
 * Server-side Google Gemini API Client
 * 
 * Securely communicates with the official @google/genai Gemini API.
 * Never exposes GEMINI_API_KEY to the client bundle or browser.
 * Uses centralized GEMINI_MODEL configuration and automatic fallback logic.
 */

import { GoogleGenAI } from '@google/genai';
import { GEMINI_CONFIG, GEMINI_MODEL } from './geminiConfig.js';

export interface GeminiChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GeminiCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  systemInstruction?: string;
  timeoutMs?: number;
}

export interface GeminiCompletionResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens?: number;
    candidatesTokens?: number;
    totalTokens?: number;
  };
  latencyMs: number;
}

export interface GeminiDiagnosticResult {
  hasKey: boolean;
  activeModel: string;
  reachable: boolean;
  availableModels?: string[];
  message: string;
}

export class GeminiApiClient {
  private apiKey: string;
  private activeModel: string = GEMINI_MODEL;
  private genAI: GoogleGenAI | null = null;
  private verifiedModelsCache: string[] | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || 'AQ.Ab8RN6IdylRDOgnGhhmIEeybHJXV5_QRpzgiq5gFy5GQJOCCww';
    if (this.hasApiKey()) {
      this.initGenAI();
    }
  }

  private initGenAI(): void {
    if (!this.genAI && this.apiKey) {
      this.genAI = new GoogleGenAI({
        apiKey: this.apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }

  public hasApiKey(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  public getActiveModel(): string {
    return this.activeModel;
  }

  public setActiveModel(modelName: string): void {
    this.activeModel = modelName;
  }

  /**
   * Queries available models to validate credentials
   */
  public async listModels(): Promise<{ models: string[]; error?: string }> {
    if (!this.hasApiKey()) {
      return { models: [] };
    }

    if (this.verifiedModelsCache) {
      return { models: this.verifiedModelsCache };
    }

    this.initGenAI();
    if (!this.genAI) {
      return { models: [], error: 'GenAI client not initialized' };
    }

    try {
      const pager = await this.genAI.models.list();
      const models: string[] = [];
      for await (const m of pager) {
        if (m.name) {
          models.push(m.name.replace(/^models\//, ''));
        }
      }
      this.verifiedModelsCache = models;
      return { models };
    } catch (err: any) {
      console.warn(`[GeminiApiClient] Failed to list models: ${err.message}`);
      return { models: [], error: err.message };
    }
  }

  /**
   * Diagnostic check to confirm API key and model connectivity
   */
  public async runDiagnostic(): Promise<GeminiDiagnosticResult> {
    if (!this.hasApiKey()) {
      return {
        hasKey: false,
        activeModel: this.activeModel,
        reachable: false,
        message: 'No GEMINI_API_KEY configured in server environment. Built-in demo fixtures active.'
      };
    }

    this.initGenAI();

    try {
      // Test generation with active model or fallback models
      const testModels = [this.activeModel, ...GEMINI_CONFIG.FALLBACK_MODELS];
      let workingModel: string | null = null;
      let lastErrMsg = '';

      for (const m of testModels) {
        try {
          const res = await this.genAI!.models.generateContent({
            model: m,
            contents: 'ping',
          });
          if (res && res.text) {
            workingModel = m;
            this.activeModel = m;
            break;
          }
        } catch (err: any) {
          lastErrMsg = err.message || '';
          continue;
        }
      }

      if (workingModel) {
        return {
          hasKey: true,
          activeModel: workingModel,
          reachable: true,
          message: `Connected to Gemini API successfully. Active Model: ${workingModel}`
        };
      }

      return {
        hasKey: true,
        activeModel: this.activeModel,
        reachable: false,
        message: `Gemini API key is configured, but test ping returned: ${lastErrMsg}`
      };
    } catch (err: any) {
      return {
        hasKey: true,
        activeModel: this.activeModel,
        reachable: false,
        message: `Diagnostic check failed: ${err.message}`
      };
    }
  }

  /**
   * Executes structured content generation using Google GenAI SDK with automatic fallback
   */
  public async generateStructuredContent(
    userPrompt: string,
    options: GeminiCompletionOptions = {}
  ): Promise<GeminiCompletionResponse> {
    if (!this.hasApiKey()) {
      throw new Error(
        'GEMINI_API_KEY is not configured in the server environment. Please configure GEMINI_API_KEY in your settings.'
      );
    }

    this.initGenAI();
    if (!this.genAI) {
      throw new Error('GoogleGenAI SDK failed to initialize.');
    }

    const startTime = Date.now();
    const primaryModel = options.model || this.activeModel || GEMINI_MODEL;
    const candidateModels = [
      primaryModel,
      ...GEMINI_CONFIG.FALLBACK_MODELS.filter(m => m !== primaryModel)
    ];

    const temperature = options.temperature ?? GEMINI_CONFIG.ANALYSIS_TEMPERATURE;
    let lastError: Error | null = null;

    for (const model of candidateModels) {
      try {
        const config: any = {
          temperature,
        };

        if (options.systemInstruction) {
          config.systemInstruction = options.systemInstruction;
        }

        if (options.jsonMode) {
          config.responseMimeType = 'application/json';
        }

        const response = await this.genAI.models.generateContent({
          model,
          contents: userPrompt,
          config,
        });

        const text = response.text || '';
        this.activeModel = model;

        return {
          content: text,
          model,
          usage: {
            promptTokens: response.usageMetadata?.promptTokenCount,
            candidatesTokens: response.usageMetadata?.candidatesTokenCount,
            totalTokens: response.usageMetadata?.totalTokenCount,
          },
          latencyMs: Date.now() - startTime,
        };
      } catch (err: any) {
        console.warn(`[GeminiApiClient] Model "${model}" failed: ${err.message}. Trying fallback...`);
        lastError = err;
        // If it's a rate limit or 503, brief pause before fallback
        if (err.status === 429 || err.status === 503) {
          await new Promise(r => setTimeout(r, 600));
        }
      }
    }

    throw lastError || new Error('Failed to generate content with any Gemini model.');
  }

  /**
   * Executes live Google Search grounded query using official GoogleGenAI tools
   */
  public async generateGroundedSearch(
    query: string,
    systemInstruction?: string
  ): Promise<{ text: string; sources: Array<{ title: string; url: string; snippet?: string }> }> {
    if (!this.hasApiKey()) {
      return { text: '', sources: [] };
    }

    this.initGenAI();
    if (!this.genAI) {
      return { text: '', sources: [] };
    }

    const candidateModels = [
      this.activeModel || GEMINI_MODEL,
      'gemini-3.7-flash',
      'gemini-flash-latest'
    ];

    for (const model of candidateModels) {
      try {
        const config: any = {
          tools: [{ googleSearch: {} }],
          temperature: 0.1,
        };

        if (systemInstruction) {
          config.systemInstruction = systemInstruction;
        }

        const response = await this.genAI.models.generateContent({
          model,
          contents: query,
          config,
        });

        const text = response.text || '';
        const sources: Array<{ title: string; url: string; snippet?: string }> = [];

        // Extract grounding chunks if present in candidates
        const candidate = response.candidates?.[0];
        const groundingMetadata = candidate?.groundingMetadata;

        if (groundingMetadata?.groundingChunks) {
          for (const chunk of groundingMetadata.groundingChunks) {
            if (chunk.web?.uri) {
              sources.push({
                title: chunk.web.title || 'Google Search Result',
                url: chunk.web.uri,
              });
            }
          }
        }

        return { text, sources };
      } catch (err: any) {
        console.warn(`[GeminiApiClient] Grounded search with model ${model} failed: ${err.message}. Retrying fallback...`);
      }
    }

    return { text: '', sources: [] };
  }
}

