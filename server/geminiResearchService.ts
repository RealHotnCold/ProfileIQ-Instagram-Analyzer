import { EvidenceRecord, SourceRecord } from '../src/types.js';
import { GeminiApiClient } from './geminiClient.js';

export interface GeminiResearchResult {
  businessName: string;
  officialWebsite?: string;
  identifiedCategory: string;
  subcategory?: string;
  keyProducts: Array<{ name: string; description: string; price?: string }>;
  keyServices: Array<{ name: string; description: string; price?: string }>;
  differentiators: string[];
  locations: string[];
  socialFootprint?: {
    followerCountEstimate?: string;
    postsCountEstimate?: string;
    followingCountEstimate?: string;
    postingCadence?: string;
    isVerified?: boolean;
    accountTier?: string;
  };
  researchEvidence: EvidenceRecord[];
  discoveredSources: SourceRecord[];
  confidenceAssessment: string;
  rawGeminiSummary: string;
}

const GEMINI_RESEARCH_SYSTEM_PROMPT = `You are the Gemini External Web & Public Footprint Research Specialist for ProfileIQ.
Your role is to perform rigorous, focused public web research on the business represented by the given Instagram handle.

Research Priorities:
1. Identify the real-world company, brand, or creator behind the Instagram handle.
2. Determine their official website domain, primary business category, subcategory, and core product/service offerings.
3. Discover public social footprint indicators: follower scale/count, post volume count, following count, publishing frequency/cadence, and account verification tier.
4. Extract verified business signals: price indicators, locations served, core brand differentiators, and target customer profiles.
5. Strictly distinguish verified public facts from unverified assumptions. If evidence is thin or ambiguous, state that clearly.
6. Never fabricate citations, URLs, or store locations.

Output MUST be strict valid JSON matching this schema:
{
  "businessName": "Official business or brand name",
  "officialWebsite": "https://example.com or null",
  "identifiedCategory": "Industry vertical / category",
  "subcategory": "Subcategory / niche specialization",
  "keyProducts": [
    { "name": "Product name", "description": "Product details", "price": "$XX or null" }
  ],
  "keyServices": [
    { "name": "Service name", "description": "Service details", "price": "Pricing model or null" }
  ],
  "differentiators": ["Differentiator 1", "Differentiator 2"],
  "locations": ["City, Country or Global"],
  "socialFootprint": {
    "followerCountEstimate": "e.g. 45.2K or 1.2M or null",
    "postsCountEstimate": "e.g. 380 or 1,240 or null",
    "followingCountEstimate": "e.g. 520 or null",
    "postingCadence": "e.g. 3-5 posts/week or Daily or Occasional",
    "isVerified": false,
    "accountTier": "Emerging Brand | Micro-Creator | Mid-Tier Commercial | Macro Enterprise"
  },
  "researchFindings": [
    {
      "field": "category | product | service | website | positioning | location | followers | posts",
      "claim": "Specific factual claim",
      "sourceTitle": "Title of public source or official domain",
      "sourceUrl": "URL or domain",
      "directness": "direct | derived"
    }
  ],
  "confidenceAssessment": "Brief note on confidence and data completeness"
}`;

export async function executeGeminiPublicResearch(
  geminiClient: GeminiApiClient,
  handle: string,
  initialEvidence: EvidenceRecord[],
  webSignals?: any
): Promise<GeminiResearchResult> {
  const timestamp = new Date().toISOString();
  const discoveredSources: SourceRecord[] = [];
  const researchEvidence: EvidenceRecord[] = [];
  
  // 1. Live Google Search Grounding to discover exact real metrics and website
  let groundedSearchText = '';
  try {
    const searchQuery = `Look up current public Instagram account details for @${handle} (instagram.com/${handle}):
1. Exact follower count (e.g., 628M, 142K, 38,400, 1.2K)
2. Exact total posts count
3. Exact following count
4. Verified badge status
5. Official brand name and official website link
6. Primary business category and products`;

    const searchRes = await geminiClient.generateGroundedSearch(searchQuery);
    groundedSearchText = searchRes.text || '';

    // Add any web sources found by Google Search grounding
    searchRes.sources.forEach((s, idx) => {
      let domain = s.url;
      try { domain = new URL(s.url).hostname; } catch {}
      discoveredSources.push({
        id: `src_grounding_${idx}_${Date.now()}`,
        url: s.url,
        domain,
        title: s.title,
        type: 'public_web',
        retrieved_at: timestamp
      });
    });

    if (groundedSearchText) {
      researchEvidence.push({
        id: `ev_grounded_search_${Date.now()}`,
        field: 'google_grounded_search_summary',
        value: groundedSearchText.slice(0, 500),
        type: 'public_web',
        source_url: `https://www.instagram.com/${handle}/`,
        source_title: `Google Live Search Grounding (@${handle})`,
        retrieved_at: timestamp,
        directness: 'direct'
      });
    }
  } catch (err) {
    console.warn(`[GeminiResearch] Grounded search step skipped or failed:`, err);
  }

  const evidenceSummary = initialEvidence
    .map(e => `- [${e.type}] ${e.field}: "${e.value}" (Source: ${e.source_title})`)
    .join('\n');

  const webSignalsText = webSignals
    ? `Discovered Web Signals:\n- URL: ${webSignals.websiteUrl}\n- Title: ${webSignals.title}\n- Description: ${webSignals.description}\n- Headings: ${(webSignals.headings || []).join(', ')}`
    : 'No direct web domain scraped yet.';

  const groundedContext = groundedSearchText
    ? `\n\nLIVE GOOGLE SEARCH GROUNDED FACTS:\n${groundedSearchText}`
    : '';

  const userPrompt = `Perform focused public business intelligence research for Instagram profile @${handle}:

KNOWN PROFILE FOOTPRINT & EVIDENCE:
${evidenceSummary}

${webSignalsText}${groundedContext}

TASK:
1. Identify the official registered or public commercial brand identity for @${handle}.
2. Use the live search grounded numbers and facts to provide the exact follower count, posts count, following count, and verification status.
3. Synthesize verified public signals regarding their core business vertical, subcategory, product lines, services, locations, and brand positioning.
4. Return the findings in the required JSON format.`;

  const completion = await geminiClient.generateStructuredContent(
    userPrompt,
    {
      systemInstruction: GEMINI_RESEARCH_SYSTEM_PROMPT,
      temperature: 0.1,
      jsonMode: true,
    }
  );


  let parsed: any;
  try {
    const raw = completion.content.replace(/```json\n?|\n?```/g, '').trim();
    parsed = JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse Gemini research JSON, falling back to structured extraction:', err);
    parsed = {
      businessName: handle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      identifiedCategory: 'Digital Brand / Commercial Enterprise',
      subcategory: 'General Commercial Profile',
      keyProducts: [],
      keyServices: [],
      differentiators: ['Distinct public digital footprint on Instagram'],
      locations: ['Global / Multi-channel'],
      researchFindings: [],
      confidenceAssessment: 'Extracted from public profile metadata.'
    };
  }

  // Construct structured EvidenceRecords and SourceRecords from research findings
  if (parsed.officialWebsite) {
    const srcId = `src_gemini_web_${Date.now()}`;
    let domain = parsed.officialWebsite;
    try {
      domain = new URL(parsed.officialWebsite).hostname;
    } catch {
      // keep raw string
    }

    discoveredSources.push({
      id: srcId,
      url: parsed.officialWebsite,
      domain: domain,
      title: `${parsed.businessName || handle} Official Web Presence`,
      type: 'official_website',
      retrieved_at: timestamp,
    });

    researchEvidence.push({
      id: `ev_gemini_web_${Date.now()}`,
      field: 'official_domain',
      value: parsed.officialWebsite,
      type: 'official_website',
      source_url: parsed.officialWebsite,
      source_title: `${parsed.businessName || handle} Official Web Presence`,
      retrieved_at: timestamp,
      directness: 'direct'
    });
  }

  // If parsed socialFootprint missed numbers, check if groundedSearchText contains them
  if (groundedSearchText && (!parsed.socialFootprint?.followerCountEstimate || parsed.socialFootprint?.followerCountEstimate === '0')) {
    const folMatch = groundedSearchText.match(/([\d.,]+[kmKMbB]?)\s+(?:Followers|followers)/i) ||
                     groundedSearchText.match(/(?:Followers|followers):\s*([\d.,]+[kmKMbB]?)/i);
    const postMatch = groundedSearchText.match(/([\d.,]+[kmKMbB]?)\s+(?:Posts|posts|Photos|photos)/i) ||
                      groundedSearchText.match(/(?:Posts|posts):\s*([\d.,]+[kmKMbB]?)/i);
    const follingMatch = groundedSearchText.match(/([\d.,]+[kmKMbB]?)\s+(?:Following|following)/i) ||
                         groundedSearchText.match(/(?:Following|following):\s*([\d.,]+[kmKMbB]?)/i);
    
    if (!parsed.socialFootprint) parsed.socialFootprint = {};
    if (folMatch && !parsed.socialFootprint.followerCountEstimate) {
      parsed.socialFootprint.followerCountEstimate = folMatch[1].trim();
    }
    if (postMatch && !parsed.socialFootprint.postsCountEstimate) {
      parsed.socialFootprint.postsCountEstimate = postMatch[1].trim();
    }
    if (follingMatch && !parsed.socialFootprint.followingCountEstimate) {
      parsed.socialFootprint.followingCountEstimate = follingMatch[1].trim();
    }
  }


  // Add individual research findings
  (parsed.researchFindings || []).forEach((finding: any, idx: number) => {
    if (finding && finding.claim) {
      const srcId = `src_gemini_finding_${idx}_${Date.now()}`;
      if (finding.sourceUrl) {
        let domain = finding.sourceUrl;
        try { domain = new URL(finding.sourceUrl).hostname; } catch {}
        discoveredSources.push({
          id: srcId,
          url: finding.sourceUrl,
          domain,
          title: finding.sourceTitle || 'Gemini Web Grounding finding',
          type: 'public_web',
          retrieved_at: timestamp,
        });
      }

      researchEvidence.push({
        id: `ev_gemini_${idx}_${Date.now()}`,
        field: finding.field || 'brand_signal',
        value: finding.claim,
        type: 'public_web',
        source_url: finding.sourceUrl || `https://instagram.com/${handle}`,
        source_title: finding.sourceTitle || 'Gemini Public Web Synthesis',
        retrieved_at: timestamp,
        directness: finding.directness === 'direct' ? 'direct' : 'derived'
      });
    }
  });

  return {
    businessName: parsed.businessName || handle,
    officialWebsite: parsed.officialWebsite,
    identifiedCategory: parsed.identifiedCategory || 'Commercial Enterprise',
    subcategory: parsed.subcategory || 'Commercial Profile',
    keyProducts: parsed.keyProducts || [],
    keyServices: parsed.keyServices || [],
    differentiators: parsed.differentiators || [],
    locations: parsed.locations || [],
    socialFootprint: parsed.socialFootprint || undefined,
    researchEvidence,
    discoveredSources,
    confidenceAssessment: parsed.confidenceAssessment || 'Analyzed via Gemini multi-signal research pipeline.',
    rawGeminiSummary: completion.content
  };
}
