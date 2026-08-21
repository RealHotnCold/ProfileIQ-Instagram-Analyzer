/**
 * Centralized Gemini Configuration & Model Definitions
 * 
 * Single source of truth for Google GenAI Gemini model configuration,
 * fallback chains, parameters, and telemetry settings.
 */

export const GEMINI_CONFIG = {
  // Default primary model: Gemini Flash
  DEFAULT_MODEL: process.env.GEMINI_MODEL || 'gemini-flash-latest',

  // Valid current Gemini models from @google/genai guidelines
  FALLBACK_MODELS: [
    'gemini-flash-latest',
    'gemini-3.7-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview',
  ],

  // Temperature parameters
  RESEARCH_TEMPERATURE: 0.1,
  ANALYSIS_TEMPERATURE: 0.15,
  TIMEOUT_MS: 30000,
  MAX_RETRIES: 2,
};

export const GEMINI_MODEL = GEMINI_CONFIG.DEFAULT_MODEL;
