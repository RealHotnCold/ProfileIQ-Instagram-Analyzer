export type EvidenceBasis = 'observed' | 'web_researched' | 'ai_inference' | 'insufficient_evidence';

export interface EvidenceRecord {
  id: string;
  type: 'instagram_profile' | 'instagram_content' | 'official_website' | 'public_web';
  field: string;
  value: string;
  source_url: string;
  source_title: string;
  retrieved_at: string;
  directness: 'direct' | 'derived';
}

export interface SourceRecord {
  id: string;
  title: string;
  url: string;
  domain: string;
  type: string;
  retrieved_at: string;
}

export interface TargetAudienceSegment {
  segment: string;
  basis: EvidenceBasis;
  confidence: number;
  supporting_evidence: string;
  pain_points?: string[];
  buying_triggers?: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price_indicator?: string;
  basis: EvidenceBasis;
  confidence: number;
  evidence_ids: string[];
  evidence?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price_indicator?: string;
  basis: EvidenceBasis;
  confidence: number;
  evidence_ids: string[];
  evidence?: string;
}

export interface ContentThemeDistributionItem {
  theme: string;
  percentage: number;
}

export interface ContentIntelligenceData {
  themes: string[];
  theme_distribution: ContentThemeDistributionItem[];
  keywords: string[];
  hashtags: string[];
  content_signals: string[];
  confidence: number;
  limitations: string[];
  has_sufficient_content_evidence: boolean;
}

export interface BusinessSignalScores {
  product_clarity_score: number;
  service_clarity_score: number;
  brand_positioning_score: number;
  content_evidence_score: number;
  overall_evidence_quality_score: number;
}

export interface StrategicInsightItem {
  id: string;
  headline: string;
  analysis: string;
  actionable_recommendation: string;
  impact: 'High' | 'Medium' | 'Low';
  basis: EvidenceBasis;
}

export interface CompetitiveSignalItem {
  competitor_or_peer: string;
  context: string;
  basis: EvidenceBasis;
}

export interface PipelineLimitationItem {
  limitation_type: string;
  description: string;
  impact_on_confidence: string;
  recommended_follow_up: string;
}

export interface SocialMetricItem {
  value: number | string;
  formatted: string;
  basis: EvidenceBasis;
  confidence: number;
  evidence_ids?: string[];
  benchmark_context?: string;
}

export interface ProfileSocialMetrics {
  followers: SocialMetricItem;
  following?: SocialMetricItem;
  posts_count: SocialMetricItem;
  engagement_rate_estimate?: SocialMetricItem;
  posting_cadence?: SocialMetricItem;
  account_tier?: {
    tier_label: string;
    basis: EvidenceBasis;
    confidence: number;
    description?: string;
  };
  is_verified?: {
    value: boolean;
    basis: EvidenceBasis;
    confidence: number;
  };
  follower_to_following_ratio?: {
    ratio_value: string;
    authority_assessment: string;
    basis: EvidenceBasis;
  };
}

export interface BusinessIntelligenceResult {
  analysis_id: string;
  instagram_handle: string;
  instagram_url?: string;
  status: 'complete' | 'partial' | 'insufficient_data' | 'failed';
  created_at: string;
  is_demo?: boolean;
  demo_preset_id?: string;

  profile: {
    handle: string;
    display_name: {
      value: string;
      basis: EvidenceBasis;
      confidence: number;
      evidence_ids: string[];
    };
    bio: {
      value: string;
      basis: EvidenceBasis;
      confidence: number;
      evidence_ids: string[];
    };
    website: {
      value: string;
      basis: EvidenceBasis;
      confidence: number;
      evidence_ids: string[];
    };
    location?: {
      value: string;
      basis: EvidenceBasis;
      confidence: number;
      evidence_ids: string[];
    };
    metrics?: ProfileSocialMetrics;
  };

  social_metrics?: ProfileSocialMetrics;

  business: {
    name: string;
    category: string;
    subcategory: string;
    short_description: string;
    detailed_description: string;
    basis: EvidenceBasis;
    confidence: number;
    evidence_ids: string[];
  };

  products: ProductItem[];
  services: ServiceItem[];

  content_intelligence: ContentIntelligenceData;

  brand_positioning: {
    statement: string;
    signals: string[];
    differentiators: string[];
    archetype?: string;
    tone_of_voice?: string[];
    basis: EvidenceBasis;
    confidence: number;
    evidence_ids: string[];
  };

  target_audience: TargetAudienceSegment[];

  business_signals: BusinessSignalScores;

  insights: StrategicInsightItem[];
  opportunities: string[];
  competitive_signals: CompetitiveSignalItem[];

  evidence: EvidenceRecord[];
  sources: SourceRecord[];
  limitations: PipelineLimitationItem[];
  contradictions: string[];
}

export interface NormalizedInstagramInput {
  instagram_handle: string;
  instagram_url: string;
}

export interface InputValidationError {
  field: string;
  message: string;
  suggestion?: string;
}

export interface AnalysisPipelineStep {
  step_number: number;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  details?: string;
  duration_ms?: number;
}
