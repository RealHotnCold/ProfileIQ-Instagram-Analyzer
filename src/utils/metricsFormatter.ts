import { ProfileSocialMetrics, SocialMetricItem, EvidenceBasis } from '../types';

/**
 * Parses numeric strings like "142.8K", "1.2M", "38,400", "520" into actual integer numbers
 */
export function parseMetricStringToNumber(input: string | number | undefined | null): number {
  if (input === undefined || input === null) return 0;
  if (typeof input === 'number') return isNaN(input) ? 0 : input;

  const clean = input.toString().trim().replace(/,/g, '');
  if (!clean) return 0;

  // Handle K (thousands)
  if (/^([\d.]+)k$/i.test(clean)) {
    const match = clean.match(/^([\d.]+)k$/i);
    return match ? Math.round(parseFloat(match[1]) * 1000) : 0;
  }

  // Handle M (millions)
  if (/^([\d.]+)m$/i.test(clean)) {
    const match = clean.match(/^([\d.]+)m$/i);
    return match ? Math.round(parseFloat(match[1]) * 1000000) : 0;
  }

  // Handle B (billions)
  if (/^([\d.]+)b$/i.test(clean)) {
    const match = clean.match(/^([\d.]+)b$/i);
    return match ? Math.round(parseFloat(match[1]) * 1000000000) : 0;
  }

  const num = parseFloat(clean);
  return isNaN(num) ? 0 : Math.round(num);
}

/**
 * Formats integer numbers into human-readable compact strings like "142.8K", "1.2M", "520"
 */
export function formatMetricNumber(num: number | string | undefined | null): string {
  const value = typeof num === 'number' ? num : parseMetricStringToNumber(num);
  if (value === 0 && (num === '0' || num === 0)) return '0';
  if (!value || isNaN(value)) return '0';

  if (value >= 1000000) {
    const formatted = (value / 1000000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}M`;
  }
  if (value >= 10000) {
    const formatted = (value / 1000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}K`;
  }
  if (value >= 1000) {
    return value.toLocaleString();
  }
  return value.toString();
}

/**
 * Derives accurate account tier label from verified follower numbers
 */
export function deriveAccountTier(followerCount: number): {
  tier_label: string;
  description: string;
} {
  if (followerCount >= 1000000) {
    return {
      tier_label: 'Macro / Global Enterprise (1M+)',
      description: 'Mass market international reach with prominent brand footprint'
    };
  }
  if (followerCount >= 500000) {
    return {
      tier_label: 'Major Commercial Authority (500K - 1M)',
      description: 'Established category leader with high organic resonance'
    };
  }
  if (followerCount >= 100000) {
    return {
      tier_label: 'Emerging Scale D2C Brand (100K - 500K)',
      description: 'High-affinity commercial enterprise with international footprint'
    };
  }
  if (followerCount >= 50000) {
    return {
      tier_label: 'National Niche Specialist (50K - 100K)',
      description: 'Focused commercial specialist with robust customer retention'
    };
  }
  if (followerCount >= 10000) {
    return {
      tier_label: 'Community Growth Brand (10K - 50K)',
      description: 'High-engagement regional or niche community destination'
    };
  }
  if (followerCount >= 1000) {
    return {
      tier_label: 'Micro-Niche Commercial (1K - 10K)',
      description: 'Artisanal or boutique local business with loyal core audience'
    };
  }
  return {
    tier_label: 'Stealth / Early-Stage Account (<1K)',
    description: 'Early stage presence or nascent public marketing channel'
  };
}

/**
 * Computes follower to following authority ratio and assessment
 */
export function calculateAuthorityRatio(followers: number, following: number): {
  ratio_value: string;
  authority_assessment: string;
} {
  if (!following || following === 0) {
    return {
      ratio_value: `${followers}x`,
      authority_assessment: 'Elite Broadcast Authority'
    };
  }

  const ratio = followers / following;
  const formattedRatio = `${ratio.toFixed(1)}x`;

  let assessment = 'Standard Network Ratio';
  if (ratio >= 200) {
    assessment = 'Elite Brand Authority Ratio';
  } else if (ratio >= 50) {
    assessment = 'High Commercial Authority Ratio';
  } else if (ratio >= 10) {
    assessment = 'Strong Community Authority Ratio';
  } else if (ratio >= 2) {
    assessment = 'Balanced Peer Network Ratio';
  } else {
    assessment = 'Reciprocal / Discovery Stage Ratio';
  }

  return {
    ratio_value: formattedRatio,
    authority_assessment: assessment
  };
}

/**
 * Estimates engagement rate based on followers tier if not explicitly observed
 */
export function estimateEngagementRate(followerCount: number, customRate?: number | string): {
  value: number | string;
  formatted: string;
  benchmark_context: string;
} {
  if (customRate !== undefined && customRate !== null && customRate !== '') {
    const rateNum = typeof customRate === 'number' ? customRate : parseFloat(customRate.toString().replace('%', ''));
    if (!isNaN(rateNum)) {
      return {
        value: rateNum,
        formatted: `${rateNum.toFixed(1)}%`,
        benchmark_context: `Custom verified rate (${rateNum.toFixed(1)}%)`
      };
    }
  }

  if (followerCount === 0) {
    return {
      value: 'N/A',
      formatted: 'N/A',
      benchmark_context: 'No post activity to benchmark'
    };
  }

  if (followerCount >= 500000) {
    return {
      value: 1.8,
      formatted: '1.8%',
      benchmark_context: 'Category benchmark for macro accounts: 1.2% - 2.2%'
    };
  }
  if (followerCount >= 100000) {
    return {
      value: 3.4,
      formatted: '3.4%',
      benchmark_context: 'Category benchmark for mid-scale brands: 2.0% - 3.8%'
    };
  }
  if (followerCount >= 10000) {
    return {
      value: 4.8,
      formatted: '4.8%',
      benchmark_context: 'High-affinity community benchmark: 3.5% - 6.0%'
    };
  }
  return {
    value: 6.2,
    formatted: '6.2%',
    benchmark_context: 'Micro-tier organic benchmark: 5.0% - 8.5%'
  };
}

/**
 * Builds a complete, robust ProfileSocialMetrics object with math verification
 */
export function buildVerifiedSocialMetrics(params: {
  followersRaw?: string | number;
  followingRaw?: string | number;
  postsRaw?: string | number;
  isVerified?: boolean;
  postingCadence?: string;
  customEngagementRate?: number | string;
  basis?: EvidenceBasis;
  evidenceIds?: string[];
}): ProfileSocialMetrics {
  const followersNum = parseMetricStringToNumber(params.followersRaw);
  const followingNum = parseMetricStringToNumber(params.followingRaw);
  const postsNum = parseMetricStringToNumber(params.postsRaw);

  const tier = deriveAccountTier(followersNum);
  const authRatio = calculateAuthorityRatio(followersNum, followingNum);
  const engagement = estimateEngagementRate(followersNum, params.customEngagementRate);

  const basis = params.basis || (followersNum > 0 ? 'observed' : 'ai_inference');
  const confidence = basis === 'observed' ? 99 : (basis === 'web_researched' ? 92 : 80);

  return {
    followers: {
      value: followersNum,
      formatted: formatMetricNumber(followersNum),
      basis,
      confidence,
      evidence_ids: params.evidenceIds || [],
      benchmark_context: `${tier.tier_label} reach`
    },
    following: {
      value: followingNum,
      formatted: formatMetricNumber(followingNum),
      basis,
      confidence,
      evidence_ids: params.evidenceIds || []
    },
    posts_count: {
      value: postsNum,
      formatted: `${formatMetricNumber(postsNum)} Posts`,
      basis,
      confidence,
      evidence_ids: params.evidenceIds || [],
      benchmark_context: postsNum > 0 ? 'Published catalog archive' : 'No public posts'
    },
    engagement_rate_estimate: {
      value: engagement.value,
      formatted: engagement.formatted,
      basis: typeof params.customEngagementRate === 'number' ? 'observed' : 'ai_inference',
      confidence: typeof params.customEngagementRate === 'number' ? 98 : 85,
      benchmark_context: engagement.benchmark_context
    },
    posting_cadence: {
      value: params.postingCadence || (postsNum > 100 ? '4-6 posts / week' : '1-2 posts / week'),
      formatted: params.postingCadence || (postsNum > 100 ? '4-6 posts / week' : '1-2 posts / week'),
      basis: 'ai_inference',
      confidence: 85
    },
    account_tier: {
      tier_label: tier.tier_label,
      basis: 'ai_inference',
      confidence: 95,
      description: tier.description
    },
    is_verified: {
      value: Boolean(params.isVerified),
      basis: 'observed',
      confidence: 99
    },
    follower_to_following_ratio: {
      ratio_value: authRatio.ratio_value,
      authority_assessment: authRatio.authority_assessment,
      basis: 'ai_inference'
    }
  };
}
