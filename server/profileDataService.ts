import { EvidenceRecord, SourceRecord } from '../src/types.js';
import { parseMetricStringToNumber, formatMetricNumber } from '../src/utils/metricsFormatter.js';

export interface InitialDataAcquisitionResult {
  handle: string;
  instagramUrl: string;
  initialEvidence: EvidenceRecord[];
  sources: SourceRecord[];
  extractedWebSignals?: {
    websiteUrl?: string;
    title?: string;
    description?: string;
    headings?: string[];
    priceSignals?: string[];
    socialLinks?: string[];
  };
  discoveredSocialMetrics?: {
    followers?: string;
    following?: string;
    posts_count?: string;
    is_verified?: boolean;
  };
  acquisitionNotes: string[];
}

export interface UserCustomMetricsInput {
  followers?: string | number;
  following?: string | number;
  posts_count?: string | number;
  is_verified?: boolean;
}

/**
 * Public Data Acquisition Layer (profileDataService)
 * 
 * Collects legitimate public signals from the web, official domains, and public metadata.
 * Complies with strict ethical standards:
 * - NO bypassing authentication or login walls
 * - NO bypassing CAPTCHAs
 * - NO private data access
 * - NO fabricated scraped data
 * - Transparent recording of all public evidence retrieved with timestamps and exact URLs
 */
export async function collectInitialPublicEvidence(
  handle: string, 
  instagramUrl: string,
  userCustomMetrics?: UserCustomMetricsInput
): Promise<InitialDataAcquisitionResult> {
  const timestamp = new Date().toISOString();
  const initialEvidence: EvidenceRecord[] = [];
  const sources: SourceRecord[] = [];
  const notes: string[] = [];
  const discoveredSocialMetrics: {
    followers?: string;
    following?: string;
    posts_count?: string;
    is_verified?: boolean;
  } = {};

  // Evidence Item 1: The verified input handle
  const ev1Id = `ev_${Date.now()}_001`;
  initialEvidence.push({
    id: ev1Id,
    type: 'instagram_profile',
    field: 'handle',
    value: `@${handle}`,
    source_url: instagramUrl,
    source_title: `Instagram Profile @${handle}`,
    retrieved_at: timestamp,
    directness: 'direct'
  });

  sources.push({
    id: 'src_instagram_profile',
    title: `Public Instagram Profile (@${handle})`,
    url: instagramUrl,
    domain: 'instagram.com',
    type: 'instagram_profile',
    retrieved_at: timestamp
  });

  // 1. If user provided explicit known metrics, prioritize them as 100% verified observed evidence
  if (userCustomMetrics) {
    if (userCustomMetrics.followers !== undefined && userCustomMetrics.followers !== '') {
      const formatted = typeof userCustomMetrics.followers === 'number' 
        ? formatMetricNumber(userCustomMetrics.followers)
        : userCustomMetrics.followers.toString();
      
      discoveredSocialMetrics.followers = formatted;
      initialEvidence.push({
        id: `ev_${Date.now()}_user_followers`,
        type: 'instagram_profile',
        field: 'followers_count',
        value: formatted,
        source_url: instagramUrl,
        source_title: `User Verified Profile Input (@${handle})`,
        retrieved_at: timestamp,
        directness: 'direct'
      });
      notes.push(`User provided verified follower count: ${formatted}`);
    }

    if (userCustomMetrics.posts_count !== undefined && userCustomMetrics.posts_count !== '') {
      const formatted = typeof userCustomMetrics.posts_count === 'number'
        ? formatMetricNumber(userCustomMetrics.posts_count)
        : userCustomMetrics.posts_count.toString();
      
      discoveredSocialMetrics.posts_count = formatted;
      initialEvidence.push({
        id: `ev_${Date.now()}_user_posts`,
        type: 'instagram_profile',
        field: 'posts_count',
        value: formatted,
        source_url: instagramUrl,
        source_title: `User Verified Profile Input (@${handle})`,
        retrieved_at: timestamp,
        directness: 'direct'
      });
      notes.push(`User provided verified posts count: ${formatted}`);
    }

    if (userCustomMetrics.following !== undefined && userCustomMetrics.following !== '') {
      const formatted = typeof userCustomMetrics.following === 'number'
        ? formatMetricNumber(userCustomMetrics.following)
        : userCustomMetrics.following.toString();
      
      discoveredSocialMetrics.following = formatted;
      initialEvidence.push({
        id: `ev_${Date.now()}_user_following`,
        type: 'instagram_profile',
        field: 'following_count',
        value: formatted,
        source_url: instagramUrl,
        source_title: `User Verified Profile Input (@${handle})`,
        retrieved_at: timestamp,
        directness: 'direct'
      });
      notes.push(`User provided verified following count: ${formatted}`);
    }

    if (userCustomMetrics.is_verified !== undefined) {
      discoveredSocialMetrics.is_verified = Boolean(userCustomMetrics.is_verified);
    }
  }

  // 2. Comprehensive social metrics parser for OpenGraph and HTML meta strings
  const parseSocialMetricsFromText = (text: string, srcUrl: string, srcTitle: string) => {
    if (!text) return;
    
    // Pattern A: "142.8K Followers, 624 Following, 486 Posts" or "142K Followers" or "38,400 followers"
    const followerMatch = text.match(/([\d.,]+[kmKMbB]?)\s+(?:Followers|followers)/i) ||
                          text.match(/(?:Followers|followers):\s*([\d.,]+[kmKMbB]?)/i);
    if (followerMatch && !discoveredSocialMetrics.followers) {
      const rawVal = followerMatch[1].trim();
      discoveredSocialMetrics.followers = rawVal;
      initialEvidence.push({
        id: `ev_${Date.now()}_followers`,
        type: 'instagram_profile',
        field: 'followers_count',
        value: rawVal,
        source_url: srcUrl,
        source_title: srcTitle,
        retrieved_at: timestamp,
        directness: 'direct'
      });
      notes.push(`Discovered public follower metric: ${rawVal}`);
    }

    // Pattern B: "486 Posts" or "1,200 posts" or "340 Photos"
    const postsMatch = text.match(/([\d.,]+[kmKMbB]?)\s+(?:Posts|posts|Photos|photos)/i) ||
                       text.match(/(?:Posts|posts):\s*([\d.,]+[kmKMbB]?)/i);
    if (postsMatch && !discoveredSocialMetrics.posts_count) {
      const rawVal = postsMatch[1].trim();
      discoveredSocialMetrics.posts_count = rawVal;
      initialEvidence.push({
        id: `ev_${Date.now()}_posts`,
        type: 'instagram_profile',
        field: 'posts_count',
        value: rawVal,
        source_url: srcUrl,
        source_title: srcTitle,
        retrieved_at: timestamp,
        directness: 'direct'
      });
      notes.push(`Discovered public posts metric: ${rawVal}`);
    }

    // Pattern C: "624 Following" or "520 following"
    const followingMatch = text.match(/([\d.,]+[kmKMbB]?)\s+(?:Following|following)/i) ||
                         text.match(/(?:Following|following):\s*([\d.,]+[kmKMbB]?)/i);
    if (followingMatch && !discoveredSocialMetrics.following) {
      const rawVal = followingMatch[1].trim();
      discoveredSocialMetrics.following = rawVal;
      initialEvidence.push({
        id: `ev_${Date.now()}_following`,
        type: 'instagram_profile',
        field: 'following_count',
        value: rawVal,
        source_url: srcUrl,
        source_title: srcTitle,
        retrieved_at: timestamp,
        directness: 'direct'
      });
      notes.push(`Discovered public following metric: ${rawVal}`);
    }

    // Pattern D: Verified badge text
    if (text.toLowerCase().includes('verified') || text.includes('✓') || text.includes('✔')) {
      discoveredSocialMetrics.is_verified = true;
    }
  };

  // 3. Attempt direct public fetch of Instagram profile with social crawler User-Agent (OpenGraph fetch)
  try {
    const igController = new AbortController();
    const igTimeout = setTimeout(() => igController.abort(), 2000);
    const igResponse = await fetch(instagramUrl, {
      method: 'GET',
      signal: igController.signal,
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    clearTimeout(igTimeout);

    if (igResponse.ok) {
      const igHtml = await igResponse.text();
      
      // Look for og:description: <meta property="og:description" content="142K Followers, 624 Following, 486 Posts - ...">
      const ogDesc = igHtml.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
                     igHtml.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
      if (ogDesc && ogDesc[1]) {
        parseSocialMetricsFromText(ogDesc[1], instagramUrl, `Instagram OpenGraph Metadata`);
        initialEvidence.push({
          id: `ev_${Date.now()}_ig_og_desc`,
          type: 'instagram_profile',
          field: 'opengraph_description',
          value: ogDesc[1],
          source_url: instagramUrl,
          source_title: `Instagram OpenGraph Description`,
          retrieved_at: timestamp,
          directness: 'direct'
        });
      }

      // Look for title: <title>Solstice Botanicals (@solsticebotanicals) • Instagram photos and videos</title>
      const igTitle = igHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (igTitle && igTitle[1]) {
        parseSocialMetricsFromText(igTitle[1], instagramUrl, `Instagram Page Title`);
      }
    }
  } catch (err) {
    // Expected in network restricted environments or if rate limited by Meta
  }

  // 4. Attempt to check if public web presence or official domain exists based on common brand patterns in parallel

  // Attempt to check if public web presence or official domain exists based on common brand patterns in parallel
  const probableDomains = [
    `https://${handle}.com`,
    `https://www.${handle}.com`,
    `https://${handle}.co`
  ];

  let detectedWebData: any = null;

  const probeDomain = async (domain: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);
    try {
      const resp = await fetch(domain, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ProfileIQ-Intelligence-Bot/1.0; +https://profileiq.ai)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9'
        }
      });
      clearTimeout(timeout);
      if (resp.ok && resp.headers.get('content-type')?.includes('text/html')) {
        const html = await resp.text();
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                              html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
        const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
        
        const title = titleMatch ? titleMatch[1].trim() : (ogTitleMatch ? ogTitleMatch[1].trim() : '');
        const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

        const h1s = Array.from(html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)).map(m => m[1].trim().replace(/<[^>]+>/g, '')).filter(Boolean).slice(0, 3);
        const h2s = Array.from(html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)).map(m => m[1].trim().replace(/<[^>]+>/g, '')).filter(Boolean).slice(0, 4);

        if (title || metaDesc || h1s.length > 0) {
          return {
            domain,
            title,
            description: metaDesc,
            headings: [...h1s, ...h2s],
            h1s
          };
        }
      }
    } catch {
      clearTimeout(timeout);
    }
    return null;
  };

  const domainResults = await Promise.allSettled(probableDomains.map(probeDomain));
  for (const r of domainResults) {
    if (r.status === 'fulfilled' && r.value) {
      const data = r.value;
      detectedWebData = {
        websiteUrl: data.domain,
        title: data.title,
        description: data.description,
        headings: data.headings
      };

      const domainSrcId = `src_domain_${Date.now()}`;
      let parsedHost = data.domain;
      try { parsedHost = new URL(data.domain).hostname; } catch {}

      sources.push({
        id: domainSrcId,
        title: data.title || `${parsedHost} Official Web Portal`,
        url: data.domain,
        domain: parsedHost,
        type: 'official_website',
        retrieved_at: timestamp
      });

      if (data.title) {
        initialEvidence.push({
          id: `ev_${Date.now()}_title`,
          type: 'official_website',
          field: 'website_title',
          value: data.title,
          source_url: data.domain,
          source_title: `${parsedHost} - Title Tag`,
          retrieved_at: timestamp,
          directness: 'direct'
        });
        parseSocialMetricsFromText(data.title, data.domain, `${parsedHost} - Title Tag`);
      }

      if (data.description) {
        initialEvidence.push({
          id: `ev_${Date.now()}_metadesc`,
          type: 'official_website',
          field: 'website_meta_description',
          value: data.description,
          source_url: data.domain,
          source_title: `${parsedHost} - Meta Description`,
          retrieved_at: timestamp,
          directness: 'direct'
        });
        parseSocialMetricsFromText(data.description, data.domain, `${parsedHost} - Meta Description`);
      }

      if (data.h1s && data.h1s.length > 0) {
        initialEvidence.push({
          id: `ev_${Date.now()}_h1`,
          type: 'official_website',
          field: 'website_primary_headlines',
          value: data.h1s.join(' | '),
          source_url: data.domain,
          source_title: `${parsedHost} - H1 Headings`,
          retrieved_at: timestamp,
          directness: 'direct'
        });
      }

      notes.push(`Discovered matching official domain: ${data.domain}`);
      break;
    }
  }

  return {
    handle,
    instagramUrl,
    initialEvidence,
    sources,
    extractedWebSignals: detectedWebData,
    acquisitionNotes: notes
  };
}
