import { BusinessIntelligenceResult } from '../src/types.js';

export const DEMO_INTELLIGENCE_REPORTS: Record<string, BusinessIntelligenceResult> = {
  'beauty_skincare': {
    analysis_id: 'analysis_demo_beauty_skincare',
    instagram_handle: 'solsticebotanicals',
    instagram_url: 'https://www.instagram.com/solsticebotanicals/',
    status: 'complete',
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_preset_id: 'beauty_skincare',

    profile: {
      handle: 'solsticebotanicals',
      display_name: {
        value: 'Solstice Botanicals | Clean Barrier Care',
        basis: 'observed',
        confidence: 98,
        evidence_ids: ['ev_demo_1']
      },
      bio: {
        value: '🌿 Biodynamic barrier repair skincare for sensitive skin\n✨ 100% cold-pressed Nordic seed oils • Vegan • Cruelty-free\n💧 Leaping Bunny Certified & Dermatologist Tested\n🎁 Free mini Cloud Barrier Balm on orders $65+',
        basis: 'observed',
        confidence: 96,
        evidence_ids: ['ev_demo_1']
      },
      website: {
        value: 'https://solsticebotanicals.com',
        basis: 'web_researched',
        confidence: 98,
        evidence_ids: ['ev_demo_2', 'ev_demo_3']
      },
      location: {
        value: 'Stockholm, Sweden & Brooklyn, NY',
        basis: 'web_researched',
        confidence: 90,
        evidence_ids: ['ev_demo_3']
      },
      metrics: {
        followers: {
          value: 142800,
          formatted: '142.8K',
          basis: 'observed',
          confidence: 98,
          evidence_ids: ['ev_demo_1'],
          benchmark_context: 'Top 5% reach in indie clean beauty & barrier care'
        },
        following: {
          value: 624,
          formatted: '624',
          basis: 'observed',
          confidence: 98,
          evidence_ids: ['ev_demo_1']
        },
        posts_count: {
          value: 486,
          formatted: '486 Posts',
          basis: 'observed',
          confidence: 98,
          evidence_ids: ['ev_demo_1'],
          benchmark_context: 'Consistent 3-year publishing archive'
        },
        engagement_rate_estimate: {
          value: 3.4,
          formatted: '3.4%',
          basis: 'ai_inference',
          confidence: 92,
          benchmark_context: 'Category benchmark: 1.8% - 2.6%'
        },
        posting_cadence: {
          value: '4-6 posts / week',
          formatted: '4-6 posts / week',
          basis: 'observed',
          confidence: 94
        },
        account_tier: {
          tier_label: 'Emerging Scale D2C Brand (100k - 500k)',
          basis: 'ai_inference',
          confidence: 96,
          description: 'High-affinity direct-to-consumer brand with international footprint'
        },
        is_verified: {
          value: true,
          basis: 'observed',
          confidence: 99
        },
        follower_to_following_ratio: {
          ratio_value: '228.8x',
          authority_assessment: 'Elite Brand Authority Ratio',
          basis: 'ai_inference'
        }
      }
    },

    business: {
      name: 'Solstice Botanicals',
      category: 'Beauty, Cosmetic & Personal Care',
      subcategory: 'Clean Barrier Care & D2C Skincare',
      short_description: 'Biodynamic barrier repair skincare formulated with wildcrafted Nordic berry oils and bio-fermented ceramides.',
      detailed_description: 'Solstice Botanicals is an indie direct-to-consumer clean skincare brand dedicated to sensitive, eczema-prone skin. It combines cold-pressed Arctic cloudberry and sea buckthorn seed oils with multi-molecular ceramides.',
      basis: 'web_researched',
      confidence: 95,
      evidence_ids: ['ev_demo_1', 'ev_demo_2', 'ev_demo_3']
    },

    products: [
      {
        id: 'prod_1',
        name: 'Midnight Cloud Barrier Elixir (30ml)',
        description: 'Night treatment oil formulated with wild Arctic cloudberry seed oil, ceramides NP/AP/EOP, and 2% madecassoside for lipid restoration.',
        price_indicator: '$68.00',
        basis: 'web_researched',
        confidence: 96,
        evidence_ids: ['ev_demo_2'],
        evidence: 'Featured in official product catalog with clinical trial notes (94% TEWL improvement).'
      },
      {
        id: 'prod_2',
        name: 'Cloud Barrier Balm (50ml)',
        description: 'Multi-use soothing recovery salve for dry patches, windburn, and compromised skin barrier.',
        price_indicator: '$42.00',
        basis: 'web_researched',
        confidence: 92,
        evidence_ids: ['ev_demo_1', 'ev_demo_2'],
        evidence: 'Referenced in promotional promo tier (orders $65+) and store landing.'
      },
      {
        id: 'prod_3',
        name: 'Bio-Fermented Sea Buckthorn Cleanser',
        description: 'Gentle low-pH milky emulsion cleanser that melts makeup without stripping natural skin oils.',
        price_indicator: '$34.00',
        basis: 'web_researched',
        confidence: 88,
        evidence_ids: ['ev_demo_2'],
        evidence: 'Corroborated by online shop catalog.'
      }
    ],

    services: [
      {
        id: 'serv_1',
        name: 'Personalized Skin Barrier Consultation',
        description: '15-minute virtual video skin barrier assessment with an in-house aesthetician.',
        basis: 'web_researched',
        confidence: 85,
        evidence_ids: ['ev_demo_3'],
        evidence: 'Complimentary consultation offered on official website booking portal.'
      }
    ],

    content_intelligence: {
      themes: [
        'Barrier Science & Ingredient Education',
        'Nordic Wildcrafted Sourcing',
        'Customer Skin Transformation & Clinical Proof',
        'Mindful Rituals & Aesthetic Packaging'
      ],
      theme_distribution: [
        { theme: 'Barrier Science & Ingredients', percentage: 40 },
        { theme: 'Sourcing & Sustainability', percentage: 25 },
        { theme: 'Clinical Proof & Reviews', percentage: 20 },
        { theme: 'Aesthetic Rituals', percentage: 15 }
      ],
      keywords: ['barrier repair', 'ceramides', 'nordic seed oil', 'sensitive skin', 'clean beauty', 'biodynamic'],
      hashtags: ['#barrierrepair', '#cleanbeauty', '#ceramides', '#sensitiveskin', '#nordicskincare'],
      content_signals: [
        'High engagement on educational carousel breakdowns of lipid bilayers',
        'Strong community commentary asking about rosacea compatibility',
        'Consistent soft earth-tone visual palette (sage green, warm sand, translucent amber glass)'
      ],
      confidence: 92,
      limitations: ['Direct Instagram reel comment sentiment sampled from public excerpts'],
      has_sufficient_content_evidence: true
    },

    brand_positioning: {
      statement: 'Science-grounded Nordic barrier care for people with sensitive, reactive, and stressed skin barriers.',
      signals: [
        'Emphasizes clinical TEWL metrics over generic glow promises',
        'Transparent ingredient harvest windows (24-hour midnight sun harvest)',
        'Eco-conscious packaging with Leaping Bunny & dermatological certifications'
      ],
      differentiators: [
        'Pure cold-pressed Arctic botanicals from Finnish cooperatives',
        'Formulated with 3 essential skin-identical ceramides (NP, AP, EOP)',
        'Zero synthetic fragrance, essential oil irritants, or drying alcohols'
      ],
      archetype: 'The Caregiver',
      tone_of_voice: ['Gentle', 'Empathetic', 'Dermatologically Authoritative', 'Serene'],
      basis: 'ai_inference',
      confidence: 94,
      evidence_ids: ['ev_demo_1', 'ev_demo_2', 'ev_demo_3']
    },

    target_audience: [
      {
        segment: 'Sensitive & Compromised Barrier Consumers',
        basis: 'ai_inference',
        confidence: 95,
        supporting_evidence: 'Direct messaging targeting rosacea, eczema, and over-exfoliation recovery in bio and post captions.',
        pain_points: ['Redness and stinging from mainstream products', 'Peeling skin barrier from retinoids', 'Confusing marketing'],
        buying_triggers: ['Dermatologist-tested claims', 'Clinical transepidermal water loss proof', 'Fragrance-free formulations']
      },
      {
        segment: 'Conscious Clean Beauty Enthusiasts',
        basis: 'ai_inference',
        confidence: 88,
        supporting_evidence: 'Emphasis on vegan, carbon-neutral shipping and Leaping Bunny certification.',
        pain_points: ['Greenwashing in cosmetics', 'Excessive plastic packaging'],
        buying_triggers: ['Sustainable Nordic wildcrafting', 'Miron glass recyclability']
      }
    ],

    business_signals: {
      product_clarity_score: 94,
      service_clarity_score: 82,
      brand_positioning_score: 96,
      content_evidence_score: 90,
      overall_evidence_quality_score: 93
    },

    insights: [
      {
        id: 'ins_1',
        headline: 'Subscription Retention Engine Opportunity',
        analysis: 'Barrier repair creams have a predictable 60-day consumption lifecycle. Given the 94% clinical trial satisfaction, introducing an automated replenishing auto-ship program could increase Customer Lifetime Value by ~35%.',
        actionable_recommendation: 'Launch a "Barrier Care Club" with a 15% refill discount and seasonal travel minis.',
        impact: 'High',
        basis: 'ai_inference'
      },
      {
        id: 'ins_2',
        headline: 'Wholesale Apothecary Expansion',
        analysis: 'The brand carries strong high-margin aesthetic appeal suitable for boutique hotel spas, credentialed dermatologist clinics, and clean retailers (e.g. Credo, Mecca).',
        actionable_recommendation: 'Develop clinical trial sell-sheets for aesthetician retail channels.',
        impact: 'Medium',
        basis: 'ai_inference'
      }
    ],

    opportunities: [
      'Expand into SPF 50 Mineral Barrier Drops',
      'Refillable aluminum pouch packaging to cut unit costs',
      'Clinical trial co-marketing with leading dermatology influencers'
    ],

    competitive_signals: [
      {
        competitor_or_peer: 'KraveBeauty / Dieux Skin',
        context: 'Similar barrier-first positioning, but Solstice differentiates via exclusive wild Nordic botanical harvest sourcing.',
        basis: 'ai_inference'
      }
    ],

    evidence: [
      {
        id: 'ev_demo_1',
        type: 'instagram_profile',
        field: 'bio_and_handles',
        value: 'Solstice Botanicals | Clean Barrier Care. 100% cold-pressed Nordic seed oils • Vegan • Cruelty-free.',
        source_url: 'https://instagram.com/solsticebotanicals',
        source_title: 'Instagram Profile @solsticebotanicals',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      },
      {
        id: 'ev_demo_2',
        type: 'official_website',
        field: 'catalog_metadata',
        value: 'Midnight Cloud Barrier Elixir ($68), Cloud Barrier Balm ($42), Free shipping on orders $65+.',
        source_url: 'https://solsticebotanicals.com',
        source_title: 'Solstice Botanicals Official Shop',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      },
      {
        id: 'ev_demo_3',
        type: 'public_web',
        field: 'press_feature',
        value: 'Featured in Vogue Beauty and Allure Best of Clean Skincare 2024. Return rate <2%.',
        source_url: 'https://vogue.com/beauty/clean-skincare-2024',
        source_title: 'Vogue Beauty Editorial',
        retrieved_at: new Date().toISOString(),
        directness: 'derived'
      }
    ],

    sources: [
      {
        id: 'src_ig',
        title: 'Instagram Official Profile (@solsticebotanicals)',
        url: 'https://instagram.com/solsticebotanicals',
        domain: 'instagram.com',
        type: 'instagram_profile',
        retrieved_at: new Date().toISOString()
      },
      {
        id: 'src_shop',
        title: 'Solstice Botanicals Web Storefront',
        url: 'https://solsticebotanicals.com',
        domain: 'solsticebotanicals.com',
        type: 'official_website',
        retrieved_at: new Date().toISOString()
      },
      {
        id: 'src_press',
        title: 'Allure Clean Skincare Awards 2024',
        url: 'https://allure.com/awards',
        domain: 'allure.com',
        type: 'public_web',
        retrieved_at: new Date().toISOString()
      }
    ],

    limitations: [
      {
        limitation_type: 'Direct Private Instagram Metrics Barrier',
        description: 'Direct live engagement metrics and closed story posts are behind Instagram access controls. Analysis is grounded on verified public web indicators and domain signals.',
        impact_on_confidence: 'No impact on core business identity or catalog; minor reduction in daily engagement precision.',
        recommended_follow_up: 'Corroborate with official website analytics when available.'
      }
    ],

    contradictions: []
  },

  'restaurant_cafe': {
    analysis_id: 'analysis_demo_restaurant_cafe',
    instagram_handle: 'latelierlevain',
    instagram_url: 'https://www.instagram.com/latelierlevain/',
    status: 'complete',
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_preset_id: 'restaurant_cafe',

    profile: {
      handle: 'latelierlevain',
      display_name: {
        value: 'L’Atelier Levain Bakery',
        basis: 'observed',
        confidence: 99,
        evidence_ids: ['ev_bakery_1']
      },
      bio: {
        value: '🥖 100% stone-milled heritage grain sourdough & laminated viennoiserie\n🌾 Naturally leavened with a 9-year-old mother starter\n📍 482 Richmond St, Toronto\n⏰ Wed-Sun 7:30AM until sold out\n🥐 Pre-order bread subscriptions:',
        basis: 'observed',
        confidence: 98,
        evidence_ids: ['ev_bakery_1']
      },
      website: {
        value: 'https://latelierlevain.ca',
        basis: 'web_researched',
        confidence: 97,
        evidence_ids: ['ev_bakery_2']
      },
      location: {
        value: '482 Richmond St, Toronto, Ontario',
        basis: 'observed',
        confidence: 99,
        evidence_ids: ['ev_bakery_1', 'ev_bakery_2']
      },
      metrics: {
        followers: {
          value: 38400,
          formatted: '38.4K',
          basis: 'observed',
          confidence: 99,
          evidence_ids: ['ev_bakery_1'],
          benchmark_context: 'Hyper-engaged metropolitan food community'
        },
        following: {
          value: 312,
          formatted: '312',
          basis: 'observed',
          confidence: 98,
          evidence_ids: ['ev_bakery_1']
        },
        posts_count: {
          value: 620,
          formatted: '620 Posts',
          basis: 'observed',
          confidence: 99,
          evidence_ids: ['ev_bakery_1'],
          benchmark_context: 'Daily product drops & morning bake updates'
        },
        engagement_rate_estimate: {
          value: 5.2,
          formatted: '5.2%',
          basis: 'ai_inference',
          confidence: 94,
          benchmark_context: '2.5x higher than regional restaurant average'
        },
        posting_cadence: {
          value: 'Daily bake alerts (6-7 posts/week)',
          formatted: 'Daily (6-7 posts / week)',
          basis: 'observed',
          confidence: 96
        },
        account_tier: {
          tier_label: 'Local Culinary Destination (25k - 50k)',
          basis: 'ai_inference',
          confidence: 95,
          description: 'High foot-traffic artisanal destination with rapid sell-out cycles'
        },
        is_verified: {
          value: false,
          basis: 'observed',
          confidence: 99
        },
        follower_to_following_ratio: {
          ratio_value: '123.1x',
          authority_assessment: 'Strong Community Authority Ratio',
          basis: 'ai_inference'
        }
      }
    },

    business: {
      name: 'L’Atelier Levain',
      category: 'Food & Beverage',
      subcategory: 'Artisanal Sourdough Bakery & Viennoiserie',
      short_description: 'Heritage grain sourdough bakery and French viennoiserie specializing in long-fermentation naturally leavened breads.',
      detailed_description: 'L’Atelier Levain is an artisanal culinary destination in downtown Toronto producing small-batch, 36-hour cold fermented sourdough loaves and laminated French pastries using locally stone-milled Red Fife and Einkorn flours.',
      basis: 'web_researched',
      confidence: 96,
      evidence_ids: ['ev_bakery_1', 'ev_bakery_2']
    },

    products: [
      {
        id: 'prod_b1',
        name: 'Signature Country Sourdough Loaf',
        description: '36-hour cold fermented naturally leavened loaf made with stone-milled organic heritage Red Fife flour.',
        price_indicator: '$11.50',
        basis: 'web_researched',
        confidence: 95,
        evidence_ids: ['ev_bakery_2'],
        evidence: 'Verified on in-store menu board and online pre-order system.'
      },
      {
        id: 'prod_b2',
        name: 'Pistachio Rose Twice-Baked Croissant',
        description: 'Laminated French butter pastry filled with organic pistachio frangipane and organic rosewater syrup.',
        price_indicator: '$7.25',
        basis: 'web_researched',
        confidence: 94,
        evidence_ids: ['ev_bakery_1', 'ev_bakery_2'],
        evidence: 'Highlighted as signature daily sellout item in captions.'
      },
      {
        id: 'prod_b3',
        name: 'Weekly Bread Subscription Box',
        description: 'Curated weekly delivery of 2 seasonal loaves and 4 breakfast pastries.',
        price_indicator: '$38.00/wk',
        basis: 'web_researched',
        confidence: 91,
        evidence_ids: ['ev_bakery_2'],
        evidence: 'Live subscription portal on latelierlevain.ca.'
      }
    ],

    services: [
      {
        id: 'serv_b1',
        name: 'Monthly Sourdough Masterclass',
        description: '3-hour hands-on sourdough fermentation, shaping, and scoring workshop with head baker.',
        price_indicator: '$140.00/person',
        basis: 'web_researched',
        confidence: 96,
        evidence_ids: ['ev_bakery_2'],
        evidence: 'Online event calendar shows monthly sold-out sessions.'
      },
      {
        id: 'serv_b2',
        name: 'Boutique Event Catering & Viennoiserie Tables',
        description: 'Custom breakfast catering and pastry spreads for corporate events and weddings.',
        basis: 'web_researched',
        confidence: 88,
        evidence_ids: ['ev_bakery_2'],
        evidence: 'Inquiry form on catering webpage.'
      }
    ],

    content_intelligence: {
      themes: [
        'Baking Process & Crumb Structure ASMR',
        'Local Organic Farm Grain Sourcing',
        'Daily Morning Fresh Bake Alerts',
        'Baking Science & Fermentation Education'
      ],
      theme_distribution: [
        { theme: 'Baking Process & Crumb ASMR', percentage: 45 },
        { theme: 'Daily Fresh Bake Alerts', percentage: 30 },
        { theme: 'Grain Sourcing & Milling', percentage: 15 },
        { theme: 'Masterclass Education', percentage: 10 }
      ],
      keywords: ['sourdough', 'heritage grain', 'viennoiserie', 'fermentation', 'red fife', 'croissant', 'artisan bakery'],
      hashtags: ['#sourdough', '#artisanbread', '#viennoiserie', '#croissant', '#torontofood', '#boulangerie'],
      content_signals: [
        'Viral sound-focused video clips of crust crunch and bread slicing',
        'Time-sensitive "sold out" stories triggering FOMO queue behavior',
        'Strong repeat comment engagement from neighborhood regulars'
      ],
      confidence: 94,
      limitations: [],
      has_sufficient_content_evidence: true
    },

    brand_positioning: {
      statement: 'Purist artisanal French-Canadian baking celebrating unhurried 36-hour sourdough fermentation and heritage grains.',
      signals: [
        'Clear schedule boundary ("Wed-Sun 7:30AM until sold out") driving scarcity value',
        'Direct naming of local organic stone mills and heritage grain varieties',
        'Refusal of commercial yeast or artificial dough conditioners'
      ],
      differentiators: [
        '9-year-old active sourdough mother starter',
        '100% Ontario stone-milled organic ancient grains',
        'Traditional high-hydration open crumb crumb structure'
      ],
      archetype: 'The Creator',
      tone_of_voice: ['Passionate', 'Warm', 'Culinary Craft', 'Unpretentious'],
      basis: 'ai_inference',
      confidence: 95,
      evidence_ids: ['ev_bakery_1', 'ev_bakery_2']
    },

    target_audience: [
      {
        segment: 'Culinary Enthusiasts & Third-Wave Foodies',
        basis: 'ai_inference',
        confidence: 96,
        supporting_evidence: 'High willingness to wait in line early morning for specialized single-origin grain sourdough.',
        pain_points: ['Grocery store industrial bread quality', 'Lack of authentic laminated viennoiserie'],
        buying_triggers: ['Fresh morning warmth', 'Authentic European pastry texture', 'Clean digestible sourdough fermentation']
      },
      {
        segment: 'Home Bakers & Sourdough Hobbyists',
        basis: 'ai_inference',
        confidence: 92,
        supporting_evidence: 'Rapid sellout of $140/person masterclasses within 2 minutes of drop.',
        pain_points: ['Inconsistent starter rising at home', 'Difficulty mastering Dutch oven steam baking'],
        buying_triggers: ['Expert in-person instruction from recognized master baker']
      }
    ],

    business_signals: {
      product_clarity_score: 96,
      service_clarity_score: 90,
      brand_positioning_score: 98,
      content_evidence_score: 94,
      overall_evidence_quality_score: 95
    },

    insights: [
      {
        id: 'ins_b1',
        headline: 'B2B Wholesale Cafe Channel Monetization',
        analysis: 'High specialty coffee shops within a 5km radius seek premium laminated croissants to accompany specialty espresso. A curated daily wholesale route could add recurring base revenue.',
        actionable_recommendation: 'Onboard 5 exclusive partner cafes with early-morning wholesale viennoiserie drops.',
        impact: 'High',
        basis: 'ai_inference'
      },
      {
        id: 'ins_b2',
        headline: 'Merchandise & Digital Sourdough Course',
        analysis: 'The brand has built significant culinary authority. Packaging their 9-year starter with a banneton shaping basket and video guide represents high-margin e-commerce potential.',
        actionable_recommendation: 'Launch a "Sourdough At Home" starter kit shipped nationwide.',
        impact: 'Medium',
        basis: 'ai_inference'
      }
    ],

    opportunities: [
      'Nationwide dried sourdough starter kits',
      'Weekend outdoor woodfired pizza pop-ups',
      'Seasonal panettone holiday pre-order campaign'
    ],

    competitive_signals: [
      {
        competitor_or_peer: 'Brodflour / Forno Cultura',
        context: 'Competes in high-end Toronto sourdough and pastry; L’Atelier stands out on French laminated viennoiserie technique.',
        basis: 'ai_inference'
      }
    ],

    evidence: [
      {
        id: 'ev_bakery_1',
        type: 'instagram_profile',
        field: 'bio_and_schedule',
        value: '100% stone-milled heritage grain sourdough & laminated viennoiserie. 482 Richmond St, Wed-Sun 7:30AM.',
        source_url: 'https://instagram.com/latelierlevain',
        source_title: 'Instagram Profile @latelierlevain',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      },
      {
        id: 'ev_bakery_2',
        type: 'official_website',
        field: 'menu_and_classes',
        value: 'Menu includes Country Sourdough ($11.50), Pistachio Croissant ($7.25), Bread Subscription ($38/wk), Masterclasses ($140).',
        source_url: 'https://latelierlevain.ca',
        source_title: 'Official Bakery Website & Ordering',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      }
    ],

    sources: [
      {
        id: 'src_bakery_ig',
        title: 'Instagram Profile (@latelierlevain)',
        url: 'https://instagram.com/latelierlevain',
        domain: 'instagram.com',
        type: 'instagram_profile',
        retrieved_at: new Date().toISOString()
      },
      {
        id: 'src_bakery_web',
        title: 'L’Atelier Levain Official Portal',
        url: 'https://latelierlevain.ca',
        domain: 'latelierlevain.ca',
        type: 'official_website',
        retrieved_at: new Date().toISOString()
      }
    ],

    limitations: [],
    contradictions: []
  },

  'fashion_apparel': {
    analysis_id: 'analysis_demo_fashion',
    instagram_handle: 'auracoffeeroasters',
    instagram_url: 'https://www.instagram.com/auracoffeeroasters/',
    status: 'complete',
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_preset_id: 'fashion_apparel',

    profile: {
      handle: 'auracoffeeroasters',
      display_name: {
        value: 'Aura Specialty Coffee Roasters',
        basis: 'observed',
        confidence: 99,
        evidence_ids: ['ev_coffee_1']
      },
      bio: {
        value: '🌱 Direct-trade single origin & seasonal blends\n☕ Flagship Tasting Room: 1424 Pine St, Seattle\n📦 Nationwide subscription & barista gear\n👇 Fresh roast drops every Tuesday:',
        basis: 'observed',
        confidence: 97,
        evidence_ids: ['ev_coffee_1']
      },
      website: {
        value: 'https://auracoffeeroasters.com',
        basis: 'web_researched',
        confidence: 98,
        evidence_ids: ['ev_coffee_2']
      },
      location: {
        value: '1424 Pine St, Seattle, Washington',
        basis: 'observed',
        confidence: 98,
        evidence_ids: ['ev_coffee_1', 'ev_coffee_2']
      },
      metrics: {
        followers: {
          value: 86200,
          formatted: '86.2K',
          basis: 'observed',
          confidence: 97,
          evidence_ids: ['ev_coffee_1'],
          benchmark_context: 'Recognized Pacific Northwest specialty roaster'
        },
        following: {
          value: 540,
          formatted: '540',
          basis: 'observed',
          confidence: 96,
          evidence_ids: ['ev_coffee_1']
        },
        posts_count: {
          value: 740,
          formatted: '740 Posts',
          basis: 'observed',
          confidence: 98,
          evidence_ids: ['ev_coffee_1'],
          benchmark_context: 'Origin documentaries & extraction tutorials'
        },
        engagement_rate_estimate: {
          value: 2.9,
          formatted: '2.9%',
          basis: 'ai_inference',
          confidence: 90,
          benchmark_context: 'Healthy engagement with barista and coffee purist base'
        },
        posting_cadence: {
          value: '3-4 posts / week (Tuesday roast drops)',
          formatted: '3-4 posts / week',
          basis: 'observed',
          confidence: 95
        },
        account_tier: {
          tier_label: 'National Niche Specialist (50k - 100k)',
          basis: 'ai_inference',
          confidence: 94,
          description: 'Specialty roaster with robust direct-to-consumer and wholesale footprint'
        },
        is_verified: {
          value: true,
          basis: 'observed',
          confidence: 98
        },
        follower_to_following_ratio: {
          ratio_value: '159.6x',
          authority_assessment: 'High Authority Brand Ratio',
          basis: 'ai_inference'
        }
      }
    },

    business: {
      name: 'Aura Specialty Coffee Roasters',
      category: 'Food & Beverage',
      subcategory: 'Specialty Coffee Roastery & D2C Subscriptions',
      short_description: 'Direct-trade specialty coffee roaster featuring anaerobic microlots, flagship Seattle tasting room, and nationwide coffee club.',
      detailed_description: 'Aura Coffee Roasters is an independent third-wave roastery founded in Seattle. It operates a high-precision Loring S35 roaster, provides barista training workshops, and curates monthly direct-trade coffee subscriptions.',
      basis: 'web_researched',
      confidence: 96,
      evidence_ids: ['ev_coffee_1', 'ev_coffee_2']
    },

    products: [
      {
        id: 'prod_c1',
        name: 'Ethiopia Yirgacheffe Gedeb Microlot (250g)',
        description: 'Anaerobic natural process single-origin with tasting notes of bergamot, jasmine blossom, and candied apricot (2,150 MASL).',
        price_indicator: '$24.00',
        basis: 'web_researched',
        confidence: 97,
        evidence_ids: ['ev_coffee_2'],
        evidence: 'Corroborated by online web store catalog.'
      },
      {
        id: 'prod_c2',
        name: 'Monthly Tasting Reserve Subscription',
        description: 'Bi-weekly roaster reserve box delivering 2 freshly roasted microlots with brewer cards.',
        price_indicator: '$22.00/mo',
        basis: 'web_researched',
        confidence: 95,
        evidence_ids: ['ev_coffee_1', 'ev_coffee_2'],
        evidence: 'Promoted in bio link and official web subscription funnel.'
      },
      {
        id: 'prod_c3',
        name: 'Precision Barista & Cupping Gear',
        description: 'Comandante C40 grinders, Origami drippers, and custom water chemistry mineral packets.',
        price_indicator: '$45.00 - $350.00',
        basis: 'web_researched',
        confidence: 90,
        evidence_ids: ['ev_coffee_2'],
        evidence: 'Featured on equipment store page.'
      }
    ],

    services: [
      {
        id: 'serv_c1',
        name: 'B2B Wholesale Roasting & Espresso Machine Maintenance',
        description: 'Custom cafe roasting, weekly staff calibration, and La Marzocco machine servicing.',
        basis: 'web_researched',
        confidence: 94,
        evidence_ids: ['ev_coffee_1', 'ev_coffee_2'],
        evidence: 'Dedicated wholesale portal at wholesale@auracoffeeroasters.com.'
      },
      {
        id: 'serv_c2',
        name: 'Sensory Cupping & Pour-Over Workshops',
        description: '2-hour weekend barista technique and palate calibration classes in Seattle.',
        price_indicator: '$75.00/seat',
        basis: 'web_researched',
        confidence: 92,
        evidence_ids: ['ev_coffee_2'],
        evidence: 'Event booking schedule on site.'
      }
    ],

    content_intelligence: {
      themes: [
        'Single-Origin Farm Traceability & Producer Profiles',
        'Water Chemistry & Extraction Science',
        'Tasting Room Culture & Latte Art',
        'Wholesale Partner Cafe Showcases'
      ],
      theme_distribution: [
        { theme: 'Farm Traceability & Origin', percentage: 40 },
        { theme: 'Extraction Science & Brewing', percentage: 30 },
        { theme: 'Tasting Room Culture', percentage: 20 },
        { theme: 'Wholesale Partners', percentage: 10 }
      ],
      keywords: ['specialty coffee', 'single origin', 'loring roaster', 'yirgacheffe', 'water chemistry', 'direct trade'],
      hashtags: ['#specialtycoffee', '#singleorigin', '#thirdwavecoffee', '#pourover', '#seattlecoffee'],
      content_signals: [
        'Technical scientific depth regarding water hardness (ppm GH/KH)',
        'Transparency regarding green coffee sourcing premiums and farm altitude',
        'Engaged community of coffee connoisseurs and cafe owners'
      ],
      confidence: 95,
      limitations: [],
      has_sufficient_content_evidence: true
    },

    brand_positioning: {
      statement: 'Precision-roasted specialty coffee engineered for discerning coffee professionals and home purists.',
      signals: [
        'Detailed technical harvest data on every bag (altitude, processing, varietal, producer)',
        'Emphasis on energy-efficient smokeless Loring roasting',
        'Educational mindset over lifestyle marketing'
      ],
      differentiators: [
        'Direct long-term relationships with micro-mill producers',
        'Custom mineral-formulated brew water standards',
        'Ultra-light Nordic roast profiles preserving floral aromatics'
      ],
      archetype: 'The Sage',
      tone_of_voice: ['Knowledgeable', 'Precise', 'Passionate', 'Elevated'],
      basis: 'ai_inference',
      confidence: 96,
      evidence_ids: ['ev_coffee_1', 'ev_coffee_2']
    },

    target_audience: [
      {
        segment: 'Third-Wave Coffee Enthusiasts & Home Baristas',
        basis: 'ai_inference',
        confidence: 96,
        supporting_evidence: 'High engagement on water buffering and anaerobic natural fermentation posts.',
        pain_points: ['Over-roasted bitter supermarket coffee', 'Stale beans lacking roast date transparency'],
        buying_triggers: ['Fresh roast-on-order dates', 'Distinct fruity/floral cupping notes', 'Brew recipes provided']
      },
      {
        segment: 'Independent Cafe Operators (B2B)',
        basis: 'ai_inference',
        confidence: 90,
        supporting_evidence: 'Wholesale partnership announcements and equipment maintenance offerings.',
        pain_points: ['Inconsistent roast batches', 'Lack of barista technical support'],
        buying_triggers: ['Dedicated cafe account manager', 'Free staff calibration training']
      }
    ],

    business_signals: {
      product_clarity_score: 95,
      service_clarity_score: 92,
      brand_positioning_score: 97,
      content_evidence_score: 94,
      overall_evidence_quality_score: 95
    },

    insights: [
      {
        id: 'ins_c1',
        headline: 'Office Coffee Subscription Program',
        analysis: 'With many Pacific Northwest tech hubs returning to hybrid schedules, launching curated recurring 5lb bulk office roaster boxes provides high-volume stability.',
        actionable_recommendation: 'Launch "Aura for Teams" with automatic monthly whole-bean deliveries and commercial Moccamaster brewer bundles.',
        impact: 'High',
        basis: 'ai_inference'
      }
    ],

    opportunities: [
      'RTD Nitro Cold Brew canned in single-origin microlots',
      'Specialty coffee drip bags for travel',
      'Exclusive holiday advent calendar of 24 international microlots'
    ],

    competitive_signals: [
      {
        competitor_or_peer: 'Onyx Coffee Lab / Sey Coffee',
        context: 'Competes in the top 1% specialty light roast tier; Aura maintains competitive pricing with Seattle tasting room accessibility.',
        basis: 'ai_inference'
      }
    ],

    evidence: [
      {
        id: 'ev_coffee_1',
        type: 'instagram_profile',
        field: 'bio_and_flagship',
        value: 'Direct-trade single origin & seasonal blends. Flagship Tasting Room: 1424 Pine St, Seattle.',
        source_url: 'https://instagram.com/auracoffeeroasters',
        source_title: 'Instagram Profile @auracoffeeroasters',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      },
      {
        id: 'ev_coffee_2',
        type: 'official_website',
        field: 'store_and_wholesale',
        value: 'Offers single-origin coffees ($24), monthly subscriptions ($22/mo), Barista gear and wholesale program.',
        source_url: 'https://auracoffeeroasters.com',
        source_title: 'Aura Roasters Web Store',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      }
    ],

    sources: [
      {
        id: 'src_coffee_ig',
        title: 'Instagram (@auracoffeeroasters)',
        url: 'https://instagram.com/auracoffeeroasters',
        domain: 'instagram.com',
        type: 'instagram_profile',
        retrieved_at: new Date().toISOString()
      },
      {
        id: 'src_coffee_web',
        title: 'Aura Coffee Roasters Official Site',
        url: 'https://auracoffeeroasters.com',
        domain: 'auracoffeeroasters.com',
        type: 'official_website',
        retrieved_at: new Date().toISOString()
      }
    ],

    limitations: [],
    contradictions: []
  },

  'insufficient_data': {
    analysis_id: 'analysis_demo_sparse_profile',
    instagram_handle: 'phantom_stealth_labs',
    instagram_url: 'https://www.instagram.com/phantom_stealth_labs/',
    status: 'insufficient_data',
    created_at: new Date().toISOString(),
    is_demo: true,
    demo_preset_id: 'insufficient_data',

    profile: {
      handle: 'phantom_stealth_labs',
      display_name: {
        value: 'Phantom Labs',
        basis: 'observed',
        confidence: 60,
        evidence_ids: ['ev_sparse_1']
      },
      bio: {
        value: 'Building stealth hardware. Private alpha.',
        basis: 'observed',
        confidence: 65,
        evidence_ids: ['ev_sparse_1']
      },
      website: {
        value: 'No verified website detected',
        basis: 'insufficient_evidence',
        confidence: 15,
        evidence_ids: []
      },
      location: {
        value: 'Undisclosed',
        basis: 'insufficient_evidence',
        confidence: 10,
        evidence_ids: []
      },
      metrics: {
        followers: {
          value: 124,
          formatted: '124',
          basis: 'observed',
          confidence: 85,
          evidence_ids: ['ev_sparse_1'],
          benchmark_context: 'Sparse public audience reach'
        },
        following: {
          value: 18,
          formatted: '18',
          basis: 'observed',
          confidence: 85,
          evidence_ids: ['ev_sparse_1']
        },
        posts_count: {
          value: 0,
          formatted: '0 Posts',
          basis: 'observed',
          confidence: 98,
          evidence_ids: ['ev_sparse_1'],
          benchmark_context: 'No public post history'
        },
        engagement_rate_estimate: {
          value: 'N/A',
          formatted: 'N/A',
          basis: 'insufficient_evidence',
          confidence: 10,
          benchmark_context: 'Zero published media to calculate engagement'
        },
        posting_cadence: {
          value: 'Inactive / Pre-launch',
          formatted: '0 posts / week (Pre-launch)',
          basis: 'insufficient_evidence',
          confidence: 85
        },
        account_tier: {
          tier_label: 'Stealth / Pre-launch Account (<1k)',
          basis: 'ai_inference',
          confidence: 85,
          description: 'Early stealth entity with no active public marketing channels'
        },
        is_verified: {
          value: false,
          basis: 'observed',
          confidence: 99
        },
        follower_to_following_ratio: {
          ratio_value: '6.8x',
          authority_assessment: 'Early Stage Ratio',
          basis: 'ai_inference'
        }
      }
    },

    business: {
      name: 'Phantom Labs',
      category: 'Unclassified / Technology Research',
      subcategory: 'Stealth Research',
      short_description: 'Early-stage stealth entity with sparse public footprint.',
      detailed_description: 'The target handle contains minimal public signals. No official domain, product catalog, customer pricing, or verified media mentions could be found in public records.',
      basis: 'insufficient_evidence',
      confidence: 30,
      evidence_ids: ['ev_sparse_1']
    },

    products: [],
    services: [],

    content_intelligence: {
      themes: [],
      theme_distribution: [],
      keywords: ['stealth', 'hardware', 'private alpha'],
      hashtags: [],
      content_signals: ['Single cryptic bio statement', 'Zero published public posts or catalogs'],
      confidence: 25,
      limitations: [
        'Profile has 0 public media posts available',
        'No verified website or public business registry link attached'
      ],
      has_sufficient_content_evidence: false
    },

    brand_positioning: {
      statement: 'Stealth technology organization operating without public customer acquisition channels.',
      signals: ['Cryptic one-line bio', 'Restricted access posture'],
      differentiators: ['Insufficient public evidence to establish commercial differentiators'],
      archetype: 'The Magician',
      tone_of_voice: ['Cryptic', 'Minimalist'],
      basis: 'insufficient_evidence',
      confidence: 35,
      evidence_ids: ['ev_sparse_1']
    },

    target_audience: [
      {
        segment: 'Stealth Investors / Early Alpha Testers',
        basis: 'ai_inference',
        confidence: 40,
        supporting_evidence: 'Mention of "Private alpha" indicates restricted audience gating.',
        pain_points: [],
        buying_triggers: []
      }
    ],

    business_signals: {
      product_clarity_score: 15,
      service_clarity_score: 10,
      brand_positioning_score: 30,
      content_evidence_score: 12,
      overall_evidence_quality_score: 20
    },

    insights: [
      {
        id: 'ins_sparse_1',
        headline: 'Public Brand Footprint Deficit',
        analysis: 'Without a discoverable website or clear value proposition, public commercial conversions and client inbound discovery are non-existent.',
        actionable_recommendation: 'Deploy a minimal landing page with an email waitlist capture to establish search grounding.',
        impact: 'High',
        basis: 'ai_inference'
      }
    ],

    opportunities: [
      'Register official domain and deploy landing page',
      'Define clear initial problem statement for public alpha recruitment'
    ],

    competitive_signals: [],

    evidence: [
      {
        id: 'ev_sparse_1',
        type: 'instagram_profile',
        field: 'bio_text',
        value: 'Building stealth hardware. Private alpha.',
        source_url: 'https://instagram.com/phantom_stealth_labs',
        source_title: 'Instagram Handle @phantom_stealth_labs',
        retrieved_at: new Date().toISOString(),
        directness: 'direct'
      }
    ],

    sources: [
      {
        id: 'src_sparse_ig',
        title: 'Instagram Handle (@phantom_stealth_labs)',
        url: 'https://instagram.com/phantom_stealth_labs',
        domain: 'instagram.com',
        type: 'instagram_profile',
        retrieved_at: new Date().toISOString()
      }
    ],

    limitations: [
      {
        limitation_type: 'Data Sparsity / Insufficient Public Evidence',
        description: 'The target handle contains minimal public signals. No products, services, or verified website exist in public index.',
        impact_on_confidence: 'High impact: Confidence across all commercial vectors is capped at <40%.',
        recommended_follow_up: 'Re-analyze once an official website or product launch announcement is published.'
      }
    ],

    contradictions: []
  }
};
