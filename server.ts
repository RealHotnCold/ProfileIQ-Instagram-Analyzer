import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { normalizeInstagramInput } from './server/normalizeInput.js';
import { collectInitialPublicEvidence } from './server/profileDataService.js';
import { GeminiApiClient } from './server/geminiClient.js';
import { GEMINI_MODEL } from './server/geminiConfig.js';
import { executeGeminiPublicResearch } from './server/geminiResearchService.js';
import { executeGeminiBusinessAnalysis } from './server/geminiAnalysisService.js';
import { DEFAULT_GEMINI_ANALYSIS_PROMPT } from './server/defaultPromptConfig.js';
import { DEMO_INTELLIGENCE_REPORTS } from './server/demoFixtures.js';
import { BusinessIntelligenceResult } from './src/types.js';

dotenv.config();

// In-memory cache for recent analyses
const analysisCache = new Map<string, BusinessIntelligenceResult>();

// Initialize analysis cache with demo fixtures
Object.values(DEMO_INTELLIGENCE_REPORTS).forEach(report => {
  analysisCache.set(report.analysis_id, report);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini API client with centralized configuration
  const geminiClient = new GeminiApiClient(
    process.env.GEMINI_API_KEY || 'AQ.Ab8RN6IdylRDOgnGhhmIEeybHJXV5_QRpzgiq5gFy5GQJOCCww'
  );

  // Run startup diagnostic check
  console.log(`[ProfileIQ] Centralized Gemini Model configured: ${geminiClient.getActiveModel()}`);
  if (geminiClient.hasApiKey()) {
    geminiClient.runDiagnostic().then(diag => {
      console.log(`[ProfileIQ] Gemini Startup Diagnostic: ${diag.message}`);
    }).catch(err => {
      console.warn(`[ProfileIQ] Gemini Diagnostic warning: ${err.message}`);
    });
  } else {
    console.log(`[ProfileIQ] Note: GEMINI_API_KEY is not set. Demo fixtures active.`);
  }

  // 1. Health & Configuration Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      engine: 'gemini_flash',
      model: geminiClient.getActiveModel(),
      hasGeminiKey: geminiClient.hasApiKey(),
      cachedAnalysesCount: analysisCache.size,
      timestamp: new Date().toISOString()
    });
  });

  // 1b. Gemini Engine Diagnostic Endpoint
  app.get('/api/diagnostic', async (req, res) => {
    const diagnostic = await geminiClient.runDiagnostic();
    res.json(diagnostic);
  });

  // 2. Demo Presets List
  app.get('/api/demo-presets', (req, res) => {
    res.json({
      presets: [
        {
          id: 'beauty_skincare',
          name: 'Solstice Botanicals (Clean Skincare / D2C)',
          handle: 'solsticebotanicals',
          category: 'Beauty, Cosmetic & Personal Care',
          status: 'complete'
        },
        {
          id: 'restaurant_cafe',
          name: 'L’Atelier Levain (Artisanal Bakery & Cafe)',
          handle: 'latelierlevain',
          category: 'Food & Beverage / Bakery',
          status: 'complete'
        },
        {
          id: 'fashion_apparel',
          name: 'Aura Specialty Coffee Roasters',
          handle: 'auracoffeeroasters',
          category: 'Food & Beverage / Coffee Roastery',
          status: 'complete'
        },
        {
          id: 'insufficient_data',
          name: 'Phantom Labs (Sparse / Stealth Profile)',
          handle: 'phantom_stealth_labs',
          category: 'Stealth Research / Unclassified',
          status: 'insufficient_data'
        }
      ]
    });
  });

  // 2b. Default Prompt Template Endpoint
  app.get('/api/default-prompt', (req, res) => {
    res.json({
      defaultPrompt: DEFAULT_GEMINI_ANALYSIS_PROMPT
    });
  });

  // 3. Instagram Handle / URL Input Normalization Endpoint
  app.post('/api/normalize', (req, res) => {
    const { input } = req.body;
    const result = normalizeInstagramInput(input);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json(result);
  });

  // 4. Retrieve Cached Analysis by ID
  app.get('/api/analysis/:analysisId', (req, res) => {
    const { analysisId } = req.params;
    const report = analysisCache.get(analysisId);
    if (!report) {
      return res.status(404).json({ error: `Analysis report with ID "${analysisId}" not found.` });
    }
    return res.json(report);
  });

  // 5. Main ProfileIQ AI Intelligence Pipeline Endpoint (POST /api/analyze)
  app.post('/api/analyze', async (req, res) => {
    try {
      const { input, demoPresetId, bundle, customAnalysisPrompt, customMetrics } = req.body;

      // Check if user requested a specific demo preset
      if (demoPresetId && DEMO_INTELLIGENCE_REPORTS[demoPresetId]) {
        const demoReport = DEMO_INTELLIGENCE_REPORTS[demoPresetId];
        analysisCache.set(demoReport.analysis_id, demoReport);
        return res.json(demoReport);
      }

      // Determine the input string to normalize
      const rawInput = input || (bundle ? bundle.profileUrl || bundle.username : '');

      if (!rawInput) {
        return res.status(400).json({
          error: 'Missing input. Please provide an Instagram username or profile URL.',
          field: 'input'
        });
      }

      // Step 1: Input Normalization
      const normResult = normalizeInstagramInput(rawInput);
      if (!normResult.success || !normResult.data) {
        return res.status(400).json({
          error: normResult.error?.message || 'Invalid Instagram handle or URL.',
          validation: normResult.error
        });
      }

      const { instagram_handle, instagram_url } = normResult.data;

      // Check if handle matches one of our demo profiles
      const matchedDemoKey = Object.keys(DEMO_INTELLIGENCE_REPORTS).find(
        key => DEMO_INTELLIGENCE_REPORTS[key].instagram_handle.toLowerCase() === instagram_handle.toLowerCase()
      );

      if (!geminiClient.hasApiKey()) {
        if (matchedDemoKey) {
          console.log(`[ProfileIQ] No GEMINI_API_KEY set. Serving matched demo fixture for @${instagram_handle}`);
          const demoReport = DEMO_INTELLIGENCE_REPORTS[matchedDemoKey];
          analysisCache.set(demoReport.analysis_id, demoReport);
          return res.json(demoReport);
        } else {
          return res.status(400).json({
            error: 'GEMINI_API_KEY is not configured in the server environment.',
            details: 'To analyze custom live profiles with Gemini, please configure GEMINI_API_KEY in your environment variables. Alternatively, you can select one of the built-in demo profiles to explore the intelligence engine.'
          });
        }
      }

      console.log(`[ProfileIQ] Initiating Gemini Intelligence Pipeline for @${instagram_handle}...`);

      // Step 2: Public Data Acquisition Layer
      console.log(`[ProfileIQ] Step 1/4: Collecting initial public web signals for @${instagram_handle}...`);
      const acquisition = await collectInitialPublicEvidence(instagram_handle, instagram_url, customMetrics);

      // Step 3: Gemini External Web Research
      console.log(`[ProfileIQ] Step 2/4: Executing Gemini focused public web research...`);
      const researchResult = await executeGeminiPublicResearch(
        geminiClient,
        instagram_handle,
        acquisition.initialEvidence,
        acquisition.extractedWebSignals
      );

      // Combine all gathered evidence and sources
      const fullEvidenceInventory = [
        ...acquisition.initialEvidence,
        ...researchResult.researchEvidence
      ];
      const fullSources = [
        ...acquisition.sources,
        ...researchResult.discoveredSources
      ];

      // Step 4: Gemini Business Intelligence Synthesis
      console.log(`[ProfileIQ] Step 3/4: Synthesizing structured intelligence dossier with Gemini...`);
      const intelligenceReport = await executeGeminiBusinessAnalysis(
        geminiClient,
        instagram_handle,
        instagram_url,
        fullEvidenceInventory,
        fullSources,
        researchResult,
        customAnalysisPrompt
      );

      // Step 5: Cache and return
      console.log(`[ProfileIQ] Step 4/4: Complete! Analysis ID: ${intelligenceReport.analysis_id}`);
      analysisCache.set(intelligenceReport.analysis_id, intelligenceReport);

      return res.json(intelligenceReport);
    } catch (err: any) {
      console.error('[ProfileIQ] Pipeline execution failed:', err);
      return res.status(500).json({
        error: err.message || 'An error occurred while executing the ProfileIQ intelligence pipeline.'
      });
    }
  });

  // Setup Vite / Static Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ProfileIQ] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
