import { 
  BusinessIntelligenceResult, 
  EvidenceRecord, 
  SourceRecord, 
  EvidenceBasis,
  ProductItem,
  ServiceItem,
  TargetAudienceSegment,
  StrategicInsightItem,
  CompetitiveSignalItem,
  PipelineLimitationItem
} from '../src/types.js';
import { GeminiApiClient } from './geminiClient.js';
import { GeminiResearchResult } from './geminiResearchService.js';
import { DEFAULT_GEMINI_ANALYSIS_PROMPT } from './defaultPromptConfig.js';
import { buildVerifiedSocialMetrics, parseMetricStringToNumber } from '../src/utils/metricsFormatter.js';

export async function executeGeminiBusinessAnalysis(
  geminiClient: GeminiApiClient,
  handle: string,
  instagramUrl: string,
  evidenceInventory: EvidenceRecord[],
  sources: SourceRecord[],
  researchResult: GeminiResearchResult,
  customAnalysisPrompt?: string
): Promise<BusinessIntelligenceResult> {
  const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();

  const activeSystemPrompt = customAnalysisPrompt?.trim() || DEFAULT_GEMINI_ANALYSIS_PROMPT;

  const evidenceText = evidenceInventory
    .map(e => `[ID: ${e.id}] Type: ${e.type} | Field: ${e.field} | Value: "${e.value}" | Source: ${e.source_title} (${e.source_url})`)
    .join('\n');

  const sourcesText = sources
    .map(s => `- ${s.title} (${s.domain}) -> ${s.url}`)
    .join('\n');

  const followersEvidence = evidenceInventory.find(e => e.field === 'followers_count' || e.field === 'followers');
  const postsEvidence = evidenceInventory.find(e => e.field === 'posts_count' || e.field === 'posts');
  const followingEvidence = evidenceInventory.find(e => e.field === 'following_count' || e.field === 'following');

  const userPrompt = `SYNTHESIZE COMPLETE BUSINESS INTELLIGENCE DOSSIER FOR @${handle}:

EVIDENCE INVENTORY (Traceable IDs):
${evidenceText}

DISCOVERED SOURCES & DOMAINS:
${sourcesText}

GEMINI RESEARCH FINDINGS:
- Official Brand Name: ${researchResult.businessName}
- Identified Vertical: ${researchResult.identifiedCategory}
- Subcategory: ${researchResult.subcategory || 'Commercial Brand'}
- Official Website: ${researchResult.officialWebsite || 'None detected'}
- Differentiators: ${researchResult.differentiators.join(', ') || 'None'}
- Locations: ${researchResult.locations.join(', ') || 'None'}
${researchResult.socialFootprint ? `- Public Social Footprint Signals: Followers: ${researchResult.socialFootprint.followerCountEstimate || 'N/A'}, Posts: ${researchResult.socialFootprint.postsCountEstimate || 'N/A'}, Following: ${researchResult.socialFootprint.followingCountEstimate || 'N/A'}, Cadence: ${researchResult.socialFootprint.postingCadence || 'N/A'}, Tier: ${researchResult.socialFootprint.accountTier || 'N/A'}` : ''}

Generate a comprehensive JSON intelligence dossier matching this exact JSON structure:
{
  "profile": {
    "display_name": { "value": "Name", "basis": "observed | web_researched | ai_inference", "confidence": 95, "evidence_ids": ["ev_..."] },
    "bio": { "value": "Extracted bio", "basis": "observed", "confidence": 95, "evidence_ids": ["ev_..."] },
    "website": { "value": "URL", "basis": "web_researched | observed", "confidence": 92, "evidence_ids": ["ev_..."] },
    "location": { "value": "City, Country", "basis": "web_researched | observed", "confidence": 88, "evidence_ids": ["ev_..."] },
    "metrics": {
      "followers": {
        "value": 48500,
        "formatted": "48.5K",
        "basis": "observed | web_researched | ai_inference | insufficient_evidence",
        "confidence": 90,
        "evidence_ids": ["ev_..."],
        "benchmark_context": "e.g. Strong audience reach in niche"
      },
      "following": {
        "value": 520,
        "formatted": "520",
        "basis": "observed | web_researched | ai_inference",
        "confidence": 90,
        "evidence_ids": ["ev_..."]
      },
      "posts_count": {
        "value": 340,
        "formatted": "340 Posts",
        "basis": "observed | web_researched | ai_inference | insufficient_evidence",
        "confidence": 92,
        "evidence_ids": ["ev_..."],
        "benchmark_context": "e.g. Deep catalog with established historical content"
      },
      "engagement_rate_estimate": {
        "value": 2.8,
        "formatted": "2.8%",
        "basis": "ai_inference",
        "confidence": 85,
        "benchmark_context": "Industry benchmark median: 1.6% - 3.2%"
      },
      "posting_cadence": {
        "value": "3-5 posts/week",
        "formatted": "3-5 posts / week",
        "basis": "web_researched | ai_inference",
        "confidence": 86
      },
      "account_tier": {
        "tier_label": "Emerging Commercial Brand (10k-50k)",
        "basis": "ai_inference",
        "confidence": 90,
        "description": "High engagement micro-to-mid commercial scale"
      },
      "is_verified": {
        "value": false,
        "basis": "observed | web_researched | ai_inference",
        "confidence": 95
      },
      "follower_to_following_ratio": {
        "ratio_value": "93.2x",
        "authority_assessment": "High authority brand ratio",
        "basis": "ai_inference"
      }
    }
  },
  "business": {
    "name": "${researchResult.businessName}",
    "category": "${researchResult.identifiedCategory}",
    "subcategory": "${researchResult.subcategory || 'Commercial Enterprise'}",
    "short_description": "1-sentence executive summary",
    "detailed_description": "2-3 sentence in-depth synthesis of business model and offerings",
    "basis": "web_researched | observed | ai_inference",
    "confidence": 92,
    "evidence_ids": ["ev_..."]
  },
  "products": [
    {
      "id": "prod_1",
      "name": "Product Name",
      "description": "Product details",
      "price_indicator": "$XX or null",
      "basis": "web_researched | observed | ai_inference | insufficient_evidence",
      "confidence": 90,
      "evidence_ids": ["ev_..."]
    }
  ],
  "services": [
    {
      "id": "serv_1",
      "name": "Service Name",
      "description": "Service details",
      "price_indicator": "Pricing model or null",
      "basis": "web_researched | observed | ai_inference | insufficient_evidence",
      "confidence": 90,
      "evidence_ids": ["ev_..."]
    }
  ],
  "content_intelligence": {
    "themes": ["Theme 1", "Theme 2"],
    "theme_distribution": [
      { "theme": "Theme 1", "percentage": 45 },
      { "theme": "Theme 2", "percentage": 30 }
    ],
    "keywords": ["keyword1", "keyword2"],
    "hashtags": ["#tag1", "#tag2"],
    "content_signals": ["Signal 1", "Signal 2"],
    "confidence": 85,
    "limitations": ["Public post stream inferred"],
    "has_sufficient_content_evidence": true
  },
  "brand_positioning": {
    "statement": "Brand core positioning statement",
    "signals": ["Signal 1", "Signal 2"],
    "differentiators": ["Diff 1", "Diff 2"],
    "archetype": "The Creator / The Expert / The Caregiver",
    "tone_of_voice": ["Authoritative", "Elevated"],
    "basis": "ai_inference",
    "confidence": 88,
    "evidence_ids": ["ev_..."]
  },
  "target_audience": [
    {
      "segment": "Segment name",
      "basis": "ai_inference",
      "confidence": 85,
      "supporting_evidence": "Evidence reason",
      "pain_points": ["Pain point 1"],
      "buying_triggers": ["Trigger 1"]
    }
  ],
  "business_signals": {
    "product_clarity_score": 88,
    "service_clarity_score": 85,
    "brand_positioning_score": 90,
    "content_evidence_score": 75,
    "overall_evidence_quality_score": 86
  },
  "insights": [
    {
      "id": "ins_1",
      "headline": "Strategic Headline",
      "analysis": "Detailed analytical breakdown",
      "actionable_recommendation": "Concrete tactical step",
      "impact": "High | Medium | Low",
      "basis": "ai_inference"
    }
  ],
  "opportunities": ["Opportunity 1", "Opportunity 2"],
  "competitive_signals": [
    {
      "competitor_or_peer": "Competitor Type or Name",
      "context": "How they position relative to target",
      "basis": "ai_inference"
    }
  ],
  "limitations": [
    {
      "limitation_type": "Data scope",
      "description": "Public web footprint analysis only",
      "impact_on_confidence": "Moderate",
      "recommended_follow_up": "Verify internal conversion metrics"
    }
  ],
  "contradictions": []
}`;

  const completion = await geminiClient.generateStructuredContent(
    userPrompt,
    {
      systemInstruction: activeSystemPrompt,
      temperature: 0.15,
      jsonMode: true,
    }
  );

  let rawJson: any;
  try {
    const raw = completion.content.replace(/```json\n?|\n?```/g, '').trim();
    rawJson = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse Gemini analysis JSON response:', completion.content);
    throw new Error('Gemini AI engine response could not be parsed as valid JSON.');
  }

  // Find initial bio / display name evidence if available
  const bioEvidence = evidenceInventory.find(e => e.field === 'bio');
  const displayNameEvidence = evidenceInventory.find(e => e.field === 'display_name');

  const result: BusinessIntelligenceResult = {
    analysis_id: analysisId,
    instagram_handle: handle,
    instagram_url: instagramUrl,
    status: 'complete',
    created_at: timestamp,
    profile: {
      handle,
      display_name: rawJson.profile?.display_name || {
        value: displayNameEvidence ? displayNameEvidence.value : researchResult.businessName,
        basis: displayNameEvidence ? 'observed' : 'web_researched',
        confidence: 95,
        evidence_ids: displayNameEvidence ? [displayNameEvidence.id] : []
      },
      bio: rawJson.profile?.bio || {
        value: bioEvidence ? bioEvidence.value : `Commercial brand profile for @${handle}`,
        basis: bioEvidence ? 'observed' : 'insufficient_evidence',
        confidence: bioEvidence ? 95 : 60,
        evidence_ids: bioEvidence ? [bioEvidence.id] : []
      },
      website: rawJson.profile?.website || {
        value: researchResult.officialWebsite || `https://instagram.com/${handle}`,
        basis: researchResult.officialWebsite ? 'web_researched' : 'insufficient_evidence',
        confidence: researchResult.officialWebsite ? 92 : 50,
        evidence_ids: []
      },
      location: rawJson.profile?.location || {
        value: researchResult.locations[0] || 'Global / Digital First',
        basis: researchResult.locations.length ? 'web_researched' : 'insufficient_evidence',
        confidence: researchResult.locations.length ? 85 : 50,
        evidence_ids: []
      },
      metrics: (() => {
        const rawFollowers = followersEvidence ? followersEvidence.value : (rawJson.profile?.metrics?.followers?.value || researchResult.socialFootprint?.followerCountEstimate || '0');
        const rawFollowing = followingEvidence ? followingEvidence.value : (rawJson.profile?.metrics?.following?.value || researchResult.socialFootprint?.followingCountEstimate || '0');
        const rawPosts = postsEvidence ? postsEvidence.value : (rawJson.profile?.metrics?.posts_count?.value || researchResult.socialFootprint?.postsCountEstimate || '0');
        const isVerified = Boolean(researchResult.socialFootprint?.isVerified || rawJson.profile?.metrics?.is_verified?.value);
        const cadence = rawJson.profile?.metrics?.posting_cadence?.value || researchResult.socialFootprint?.postingCadence;
        const customRate = rawJson.profile?.metrics?.engagement_rate_estimate?.value;

        const verifiedMetrics = buildVerifiedSocialMetrics({
          followersRaw: rawFollowers,
          followingRaw: rawFollowing,
          postsRaw: rawPosts,
          isVerified,
          postingCadence: cadence,
          customEngagementRate: customRate,
          basis: followersEvidence ? 'observed' : (researchResult.socialFootprint?.followerCountEstimate ? 'web_researched' : 'ai_inference'),
          evidenceIds: [
            ...(followersEvidence ? [followersEvidence.id] : []),
            ...(followingEvidence ? [followingEvidence.id] : []),
            ...(postsEvidence ? [postsEvidence.id] : [])
          ]
        });

        return verifiedMetrics;
      })(),
    },
    social_metrics: undefined,
    business: {
      name: rawJson.business?.name || researchResult.businessName,
      category: rawJson.business?.category || researchResult.identifiedCategory,
      subcategory: rawJson.business?.subcategory || researchResult.subcategory || 'Commercial Brand',
      short_description: rawJson.business?.short_description || `${researchResult.businessName} is a commercial brand specialized in ${researchResult.identifiedCategory}.`,
      detailed_description: rawJson.business?.detailed_description || `${researchResult.businessName} operates within ${researchResult.identifiedCategory}, serving customers with dedicated offerings and strong brand signals.`,
      basis: rawJson.business?.basis || 'web_researched',
      confidence: rawJson.business?.confidence || 90,
      evidence_ids: rawJson.business?.evidence_ids || []
    },
    products: Array.isArray(rawJson.products) ? rawJson.products : [],
    services: Array.isArray(rawJson.services) ? rawJson.services : [],
    content_intelligence: rawJson.content_intelligence || {
      themes: ['Brand Stories', 'Product Highlights'],
      theme_distribution: [
        { theme: 'Brand Identity', percentage: 60 },
        { theme: 'Commercial Showcase', percentage: 40 }
      ],
      keywords: [handle, researchResult.identifiedCategory],
      hashtags: [`#${handle}`],
      content_signals: ['Active visual public presence'],
      confidence: 80,
      limitations: ['Public signals only'],
      has_sufficient_content_evidence: true
    },
    brand_positioning: rawJson.brand_positioning || {
      statement: `${researchResult.businessName} delivers specialized solutions in ${researchResult.identifiedCategory}.`,
      signals: researchResult.differentiators,
      differentiators: researchResult.differentiators,
      archetype: 'The Creator',
      tone_of_voice: ['Direct', 'Professional'],
      basis: 'ai_inference',
      confidence: 85,
      evidence_ids: []
    },
    target_audience: Array.isArray(rawJson.target_audience) ? rawJson.target_audience : [],
    business_signals: rawJson.business_signals || {
      product_clarity_score: 85,
      service_clarity_score: 80,
      brand_positioning_score: 88,
      content_evidence_score: 75,
      overall_evidence_quality_score: 84
    },
    insights: Array.isArray(rawJson.insights) ? rawJson.insights : [],
    opportunities: Array.isArray(rawJson.opportunities) ? rawJson.opportunities : [],
    competitive_signals: Array.isArray(rawJson.competitive_signals) ? rawJson.competitive_signals : [],
    evidence: evidenceInventory,
    sources: sources,
    limitations: Array.isArray(rawJson.limitations) ? rawJson.limitations : [],
    contradictions: Array.isArray(rawJson.contradictions) ? rawJson.contradictions : []
  };

  return result;
}
