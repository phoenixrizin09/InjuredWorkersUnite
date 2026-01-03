/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE EYE ORACLE - NEW DATA CONNECTORS IMPLEMENTATION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This document provides complete setup and configuration instructions for
 * the new global and specialized data connectors added to The Eye Oracle
 * system in January 2026.
 * 
 * Document Version: 1.0
 * Last Updated: 2026-01-03
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// 1. OVERVIEW OF NEW DATA SOURCES
// ═══════════════════════════════════════════════════════════════════════════

/*
TWO NEW CONNECTOR FILES CREATED:

1. global-data-connectors.js
   Location: utils/global-data-connectors.js
   Sources: 8 international/public data APIs
   Purpose: Expand data coverage globally and capture real-time discussions

2. specialized-data-connectors.js
   Location: utils/specialized-data-connectors.js
   Sources: 7 specialized supplementary data sources
   Purpose: Accessibility mapping, semantic data, historical records

TOTAL NEW DATA SOURCES: 15
EXISTING SOURCES: ~20 (Canadian federal/provincial + parliamentary)
TOTAL COVERAGE: 35+ data sources globally
*/

// ═══════════════════════════════════════════════════════════════════════════
// 2. GLOBAL DATA CONNECTORS (global-data-connectors.js)
// ═══════════════════════════════════════════════════════════════════════════

/*
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. WORLD BANK DATA API                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://data.worldbank.org                               │
│ Authentication: None required                                           │
│ Rate Limit:    Generous (100+ requests/minute)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     Socioeconomic indicators (poverty, disability, health)  │
│ Coverage:      190+ countries                                          │
│ Update:        Annual (typically March-April)                          │
│                                                                         │
│ Function:      fetchWorldBankData(indicators)                          │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'World Bank',                                 │
│                  indicators: [{                                        │
│                    indicator: string,                                  │
│                    name: string,                                       │
│                    records: [{                                         │
│                      country: string,                                  │
│                      countryName: string,                              │
│                      value: number,                                    │
│                      year: number,                                     │
│                      unit: string                                      │
│                    }]                                                  │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Default Indicators:                                                    │
│   - SP.DYN.CDRT.IN: Crude death rate                                   │
│   - SI.POV.DDAY: Poverty headcount ratio                               │
│   - SI.POV.GINI: Gini inequality index                                 │
│   - SH.DYN.MORRT: Mortality rate                                       │
│   - SL.UEM.TOTL.ZS: Unemployment rate                                  │
│                                                                         │
│ Example Usage:                                                         │
│   const data = await fetchWorldBankData();                             │
│   const customData = await fetchWorldBankData(['SI.POV.GINI']);        │
│                                                                         │
│ Full Indicator List:                                                   │
│   Visit: https://data.worldbank.org/indicator                          │
│   Search terms: disability, poverty, health, employment                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 2. UNHCR (UN REFUGEE AGENCY) API                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://data2.unhcr.org                                  │
│ Authentication: None required                                           │
│ Rate Limit:    Moderate (50+ requests/minute)                          │
│ Cache:         30 minutes                                              │
│ Data Type:     Displacement, refugee, vulnerable population statistics │
│ Coverage:      Global displacement crises                              │
│ Update:        Real-time                                               │
│                                                                         │
│ Function:      fetchUNHCRData(region)                                  │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'UNHCR',                                      │
│                  situations: [{                                        │
│                    id: string,                                         │
│                    name: string,                                       │
│                    region: string,                                     │
│                    type: 'displacement',                               │
│                    status: string,                                     │
│                    description: string                                 │
│                  }],                                                   │
│                  coverage: string                                      │
│                }                                                        │
│                                                                         │
│ Data Available:                                                        │
│   - Refugee population statistics                                      │
│   - Internally displaced persons (IDPs)                                │
│   - Asylum seekers                                                     │
│   - People in refugee-like situations                                  │
│                                                                         │
│ Example Usage:                                                         │
│   const unhcrData = await fetchUNHCRData();                            │
│   const regionalData = await fetchUNHCRData('Middle East');            │
│                                                                         │
│ API Documentation:                                                     │
│   https://data2.unhcr.org/en/situations                                │
│   https://github.com/unhcr-americas/api-data-access-stats              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 3. GLOBAL FUND TO FIGHT AIDS, TB AND MALARIA DATA API                   │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://data.theglobalfund.org                           │
│ Authentication: None required (public endpoint)                         │
│ Rate Limit:    Generous (100+ requests/minute)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     Health funding, disease burden, vulnerable population    │
│ Coverage:      150+ countries                                          │
│ Update:        Quarterly                                               │
│                                                                         │
│ Function:      fetchGlobalFundData()                                   │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Global Fund',                                │
│                  grants: [{                                            │
│                    id: string,                                         │
│                    country: string,                                    │
│                    component: string,                                  │
│                    amount: number,                                     │
│                    startDate: string,                                  │
│                    endDate: string,                                    │
│                    disease: string,                                    │
│                    vulnerablePopulations: array                        │
│                  }],                                                   │
│                  totalFunding: number                                  │
│                }                                                        │
│                                                                         │
│ Disease Components:                                                    │
│   - HIV/AIDS                                                           │
│   - Tuberculosis                                                       │
│   - Malaria                                                            │
│   - Health systems strengthening                                       │
│   - COVID-19 response (recent additions)                               │
│                                                                         │
│ Example Usage:                                                         │
│   const fundData = await fetchGlobalFundData();                        │
│   const grants = fundData.grants.filter(g => g.country === 'Namibia');│
│                                                                         │
│ API Documentation:                                                     │
│   https://data.theglobalfund.org/api/                                  │
│   https://www.theglobalfund.org/en/                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 4. OECD STATISTICS API                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://data.oecd.org                                    │
│ Authentication: None required                                           │
│ Rate Limit:    Generous (100+ requests/minute)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     Social security, disability benefits, employment        │
│ Coverage:      OECD member countries (35+ countries)                   │
│ Update:        Annual/Quarterly                                        │
│                                                                         │
│ Function:      fetchOECDData(datasets)                                 │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'OECD',                                       │
│                  datasets: [{                                          │
│                    dataset: string,                                    │
│                    name: string,                                       │
│                    records: [{                                         │
│                      country: string,                                  │
│                      value: number,                                    │
│                      unit: string                                      │
│                    }]                                                  │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Available Datasets:                                                    │
│   - SOCX_AGG: Social expenditure on disability/social protection       │
│   - LFS_PERSON: Labour force statistics                                │
│   - IDD: Income distribution database                                  │
│   - BEN: Social benefits                                               │
│   - EQI: Equity indicators                                             │
│                                                                         │
│ Example Usage:                                                         │
│   const oecdData = await fetchOECDData(['SOCX_AGG']);                  │
│   const allData = await fetchOECDData();                               │
│                                                                         │
│ API Documentation:                                                     │
│   https://data.oecd.org/developers                                     │
│   https://stats.oecd.org/                                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 5. REDDIT API - COMMUNITY DISCUSSIONS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://www.reddit.com/dev/api/                          │
│ Authentication: None required for public data reading                   │
│ Rate Limit:    60 requests/minute (may be higher with auth)            │
│ Cache:         30 minutes                                              │
│ Data Type:     Community discussions, user experiences, support        │
│ Coverage:      8 relevant subreddits (configurable)                    │
│ Update:        Real-time                                               │
│                                                                         │
│ Function:      fetchRedditData(subreddits, postsPerSub)                │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Reddit',                                     │
│                  subreddits: [{                                        │
│                    subreddit: string,                                  │
│                    posts: [{                                           │
│                      id: string,                                       │
│                      title: string,                                    │
│                      score: number,                                    │
│                      comments: number,                                 │
│                      created: ISO8601,                                 │
│                      url: string,                                      │
│                      selftext: string,                                 │
│                      keywords: array                                   │
│                    }],                                                 │
│                    engagementScore: number                             │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Default Subreddits:                                                    │
│   - r/workerscomp          - Workers compensation discussions          │
│   - r/disability           - Disability community                      │
│   - r/disabledandfab       - Disabled & fabulous                       │
│   - r/chronicpain          - Chronic pain management                   │
│   - r/CPTSD                - Complex PTSD                              │
│   - r/InjuryRecovery       - Injury recovery strategies                │
│   - r/personalinjury       - Personal injury cases                     │
│   - r/AskLawyers           - Legal advice                              │
│                                                                         │
│ Example Usage:                                                         │
│   const redditData = await fetchRedditData();                          │
│   const customSubs = await fetchRedditData(['r/disability'], 50);      │
│                                                                         │
│ Data Quality Notes:                                                    │
│   - Posts ranked by score and engagement                               │
│   - Real user experiences and stories                                  │
│   - Crowdsourced advice and support                                    │
│   - Monthly trending topics extracted                                  │
│                                                                         │
│ API Documentation:                                                     │
│   https://www.reddit.com/dev/api/                                      │
│   https://github.com/reddit-archive/reddit                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 6. TWITTER/X API - REAL-TIME DISCUSSIONS                                │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://developer.twitter.com/                           │
│ Authentication: REQUIRED - Bearer Token (OAuth 2.0)                    │
│ Rate Limit:    300 requests/15 minutes (standard tier)                 │
│ Cache:         30 minutes (for historical queries)                     │
│ Data Type:     Real-time policy, justice, and advocacy discussions     │
│ Coverage:      Recent tweets (7 days, standard tier)                   │
│ Update:        Real-time                                               │
│                                                                         │
│ SETUP REQUIRED:                                                        │
│   1. Go to https://developer.twitter.com                               │
│   2. Sign up for a free account                                        │
│   3. Create an app in the Developer Portal                             │
│   4. Generate API v2 keys and Bearer Token                             │
│   5. Store Bearer Token in environment variable: TWITTER_BEARER_TOKEN  │
│                                                                         │
│ Function:      fetchTwitterData(queries, apiKey)                       │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Twitter/X API',                              │
│                  searches: [{                                          │
│                    query: string,                                      │
│                    tweets: [{                                          │
│                      id: string,                                       │
│                      text: string,                                     │
│                      createdAt: ISO8601,                               │
│                      likes: number,                                    │
│                      retweets: number,                                 │
│                      replies: number,                                  │
│                      url: string,                                      │
│                      impact: number (engagement metric)                │
│                    }]                                                  │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Default Search Queries:                                                │
│   - "workers compensation AND (injury OR disability)"                  │
│   - "workplace injury AND (justice OR injustice)"                      │
│   - "disability benefits AND policy"                                   │
│   - "worker rights AND advocacy"                                       │
│   - "injured workers AND support"                                      │
│                                                                         │
│ Example Usage (with authentication):                                   │
│   const apiKey = process.env.TWITTER_BEARER_TOKEN;                    │
│   const twitterData = await fetchTwitterData(null, apiKey);            │
│                                                                         │
│ Without API Key:                                                       │
│   const info = await fetchTwitterData(); // Returns setup instructions │
│                                                                         │
│ Environment Variable Setup (.env file):                                │
│   TWITTER_BEARER_TOKEN=your_bearer_token_here                         │
│                                                                         │
│ API Documentation:                                                     │
│   https://developer.twitter.com/en/docs/twitter-api                    │
│   https://developer.twitter.com/en/docs/twitter-api/tweets/search-    │
│   https://developer.twitter.com/en/docs/authentication                 │
│                                                                         │
│ Pricing: Free tier available (sufficient for research)                 │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 7. WIKIPEDIA API - HISTORICAL LEGISLATION & MOVEMENTS                    │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://www.wikipedia.org/                               │
│ Authentication: None required                                           │
│ Rate Limit:    Moderate (50+ requests/minute)                          │
│ Cache:         30 minutes                                              │
│ Data Type:     Historical legislation, rights movements, education      │
│ Coverage:      English Wikipedia (6+ million articles)                 │
│ Update:        Real-time (community-edited)                            │
│                                                                         │
│ Function:      fetchWikipediaData(searchTerms)                         │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Wikipedia',                                  │
│                  searches: [{                                          │
│                    searchTerm: string,                                 │
│                    articles: [{                                        │
│                      title: string,                                    │
│                      snippet: string,                                  │
│                      wordCount: number,                                │
│                      lastModified: ISO8601,                            │
│                      url: string,                                      │
│                      relevance: number (0-100)                         │
│                    }]                                                  │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Default Search Terms:                                                  │
│   - "Disability rights movement"                                       │
│   - "Workers compensation history"                                     │
│   - "Occupational safety and health"                                   │
│   - "Accessibility legislation"                                        │
│   - "Employment discrimination law"                                    │
│   - "Social security history"                                          │
│                                                                         │
│ Example Usage:                                                         │
│   const wikiData = await fetchWikipediaData();                         │
│   const customSearch = await fetchWikipediaData([                      │
│     'Disability Rights Act',                                           │
│     'OSHA History'                                                     │
│   ]);                                                                   │
│                                                                         │
│ Data Quality:                                                          │
│   - Heavily cited sources (citations included in API)                  │
│   - Community-reviewed and edited                                      │
│   - Historical perspective on movements                                │
│   - Often includes legislative timelines                               │
│                                                                         │
│ API Documentation:                                                     │
│   https://www.mediawiki.org/wiki/API:Main_page                         │
│   https://en.wikipedia.org/w/api.php                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 8. GOOGLE TRENDS API - SEARCH TREND ANALYSIS                             │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://trends.google.com                                │
│ Authentication: None (public dashboard) / Paid for API                 │
│ Rate Limit:    Varies by implementation                                │
│ Cache:         30 minutes                                              │
│ Data Type:     Search trends, public interest, keyword popularity      │
│ Coverage:      Global search trends                                    │
│ Update:        Real-time                                               │
│                                                                         │
│ IMPORTANT NOTE:                                                        │
│ Google does not provide an official free REST API for Trends. Current  │
│ implementation uses:                                                   │
│   - Public dashboard data                                              │
│   - Estimated values for demonstration                                 │
│   For production use, consider:                                        │
│     * Official Google Trends API (paid)                                │
│     * PyTrends (Python package, web scraping)                          │
│     * Google Search Console API (if you own domains)                   │
│     * Semrush/Ahrefs (commercial alternatives)                        │
│                                                                         │
│ Function:      fetchGoogleTrendsData(keywords)                         │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Google Trends',                              │
│                  keywords: [{                                          │
│                    keyword: string,                                    │
│                    searchVolume: number,                               │
│                    trend: string ('ascending'|'descending'|'stable'),  │
│                    regionInterest: array,                              │
│                    relatedQueries: array,                              │
│                    timestamp: ISO8601                                  │
│                  }],                                                   │
│                  apiNote: string                                       │
│                }                                                        │
│                                                                         │
│ Default Keywords:                                                      │
│   - "disability benefits"                                              │
│   - "workers compensation"                                             │
│   - "injury recovery"                                                  │
│   - "workers rights"                                                   │
│   - "occupational health"                                              │
│   - "disability legislation"                                           │
│                                                                         │
│ Example Usage:                                                         │
│   const trendsData = await fetchGoogleTrendsData();                    │
│   const customTrends = await fetchGoogleTrendsData([                   │
│     'workers compensation changes 2025'                                │
│   ]);                                                                   │
│                                                                         │
│ For Production Implementation:                                         │
│   See: https://github.com/GeneralMills/pytrends                        │
│   Or: Use Google Search Console API                                    │
│                                                                         │
│ Current Status: Demonstration mode                                     │
│ NOTE: See apiNote field in returned data                               │
└─────────────────────────────────────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════════════
// 3. SPECIALIZED DATA CONNECTORS (specialized-data-connectors.js)
// ═══════════════════════════════════════════════════════════════════════════

/*
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. OPENSTREETMAP ACCESSIBILITY API                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://www.openstreetmap.org/                           │
│ Engine:        Overpass API (query engine)                             │
│ Authentication: None required                                           │
│ Rate Limit:    Moderate (10-30 requests/minute)                        │
│ Cache:         30 minutes                                              │
│ Data Type:     Wheelchair accessibility mapping                        │
│ Coverage:      Global (crowdsourced OpenStreetMap data)                │
│ Update:        Real-time (community contributions)                     │
│                                                                         │
│ Function:      fetchAccessibilityMapData(location, amenities)          │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'OpenStreetMap',                              │
│                  amenities: [{                                         │
│                    amenity: string,                                    │
│                    locations: [{                                       │
│                      id: number,                                       │
│                      name: string,                                     │
│                      wheelchair: string,                               │
│                      latitude: number,                                 │
│                      longitude: number,                                │
│                      address: string,                                  │
│                      phone: string,                                    │
│                      website: string                                   │
│                    }]                                                  │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Supported Amenities:                                                   │
│   - hospital, pharmacy, public_transport, parking, toilets             │
│   - restaurants, shops, libraries, post_offices                        │
│   - schools, government_offices, banks                                 │
│   - parking: add wheelchair parking specifics                          │
│                                                                         │
│ Wheelchair Tag Values:                                                 │
│   - "yes": Fully wheelchair accessible                                 │
│   - "limited": Partially accessible                                    │
│   - "no": Not wheelchair accessible                                    │
│   - "unknown": Not documented                                          │
│                                                                         │
│ Example Usage:                                                         │
│   const accessData = await fetchAccessibilityMapData();                │
│   const hospitals = await fetchAccessibilityMapData('US',              │
│     ['hospital', 'pharmacy']                                           │
│   );                                                                    │
│                                                                         │
│ API Documentation:                                                     │
│   https://wiki.openstreetmap.org/wiki/API                              │
│   https://overpass-turbo.eu/                                           │
│   Query examples: https://wiki.openstreetmap.org/wiki/Overpass_API    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 2. WIKIDATA API - STRUCTURED DISABILITY DATA                             │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://www.wikidata.org/                                │
│ Authentication: None required                                           │
│ Rate Limit:    Generous (100+ requests/minute)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     Structured semantic data on disability rights           │
│ Coverage:      9 million+ items globally                               │
│ Update:        Real-time (community-edited)                            │
│                                                                         │
│ Function:      fetchWikidataDisabilityData(searchQuery)                │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Wikidata',                                   │
│                  entities: {                                           │
│                    people: [{ id, label, description, url }],         │
│                    legislation: [{ id, label, description, url }],    │
│                    organizations: [{ id, label, description, url }],  │
│                    events: [{ id, label, description, url }]          │
│                  },                                                    │
│                  dataFormat: 'Linked data (RDF/JSON-LD)'               │
│                }                                                        │
│                                                                         │
│ Query Types:                                                           │
│   - Disability rights activists (people)                               │
│   - Legislation and acts                                               │
│   - Organizations and NGOs                                             │
│   - Movements and historical events                                    │
│                                                                         │
│ Example Usage:                                                         │
│   const wikidataInfo = await fetchWikidataDisabilityData();            │
│   // Returns activists, legislation, orgs, events                      │
│                                                                         │
│ Interoperability:                                                      │
│   - IDs can be cross-referenced with Wikipedia                         │
│   - Linked to OCLC, VIAF, and other databases                          │
│   - RDF export available for each entity                               │
│                                                                         │
│ API Documentation:                                                     │
│   https://www.wikidata.org/w/api.php                                   │
│   https://www.wikidata.org/wiki/Wikidata:Data_access                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 3. DBPEDIA API - SEMANTIC WEB DATA EXTRACTION                            │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://www.dbpedia.org/                                 │
│ Authentication: None required                                           │
│ Rate Limit:    Generous (100+ requests/minute)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     Semantic data from Wikipedia                            │
│ Coverage:      Structured data from Wikipedia (38+ languages)          │
│ Update:        Regular (follows Wikipedia updates)                     │
│                                                                         │
│ Function:      fetchDBpediaData(resourceType)                          │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'DBpedia',                                    │
│                  resources: [{                                         │
│                    subject: string (URI),                              │
│                    label: string,                                      │
│                    abstract: string,                                   │
│                    url: string,                                        │
│                    ontologyType: string                                │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Resource Types (Classes):                                              │
│   - DisabilityRights                                                   │
│   - Organization                                                       │
│   - Person                                                             │
│   - LegalCase                                                          │
│   - Law                                                                │
│   - SocialService                                                      │
│                                                                         │
│ Example Usage:                                                         │
│   const dbpediaData = await fetchDBpediaData('DisabilityRights');      │
│   // Returns 50 DBpedia resources of type DisabilityRights             │
│                                                                         │
│ SPARQL Query:                                                          │
│   Uses SPARQL (RDF query language) under the hood                      │
│   Custom queries possible via DBpedia SPARQL endpoint                  │
│                                                                         │
│ API Documentation:                                                     │
│   https://www.dbpedia.org/resources/sparql/                            │
│   https://wiki.dbpedia.org/public/DBpedia%20Documentation             │
│   SPARQL Tutorials: https://www.wikidata.org/wiki/Wikidata:SPARQL_      │
│   query_service/Beginners                                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 4. GITHUB API - OPEN SOURCE DISABILITY PROJECTS                          │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://api.github.com                                   │
│ Authentication: None required (limited) / Token recommended             │
│ Rate Limit:    60 requests/hour (unauthenticated)                      │
│             5000 requests/hour (authenticated)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     Open source accessibility and disability projects       │
│ Coverage:      GitHub repositories                                     │
│ Update:        Real-time                                               │
│                                                                         │
│ Function:      fetchGitHubAccessibilityProjects(topics, maxResults)    │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'GitHub',                                     │
│                  topics: [{                                            │
│                    topic: string,                                      │
│                    projects: [{                                        │
│                      name: string,                                     │
│                      owner: string,                                    │
│                      url: string,                                      │
│                      description: string,                              │
│                      stars: number,                                    │
│                      language: string,                                 │
│                      license: string,                                  │
│                      accessibility: array                              │
│                    }]                                                  │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Default Topics:                                                        │
│   - accessibility: Screen readers, WCAG compliance                     │
│   - disability: Disability-focused applications                        │
│   - assistive-technology: Assistive tech tools                         │
│   - wcag: WCAG 2.1 compliance tools                                    │
│   - a11y: General accessibility                                        │
│                                                                         │
│ Example Usage:                                                         │
│   const gitHubData = await fetchGitHubAccessibilityProjects();         │
│   const wcagProjects = await fetchGitHubAccessibilityProjects(         │
│     ['wcag', 'a11y'], 50                                               │
│   );                                                                    │
│                                                                         │
│ Authentication (Optional but Recommended):                             │
│   Set GITHUB_TOKEN environment variable for higher rate limits         │
│                                                                         │
│ API Documentation:                                                     │
│   https://docs.github.com/en/rest                                      │
│   https://docs.github.com/en/rest/search                               │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 5. ARCHIVE.ORG API - HISTORICAL LEGISLATIVE RECORDS                      │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://archive.org/                                     │
│ Authentication: None required                                           │
│ Rate Limit:    Moderate (50+ requests/minute)                          │
│ Cache:         30 minutes                                              │
│ Data Type:     Historical documents, archived legislation               │
│ Coverage:      600+ billion web pages, 30+ million books               │
│ Update:        Continuous archival                                     │
│                                                                         │
│ Function:      fetchArchiveOrgLegislativeData(searchTerm)              │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Archive.org',                                │
│                  documents: [{                                         │
│                    id: string,                                         │
│                    title: string,                                      │
│                    date: string,                                       │
│                    creator: string,                                    │
│                    description: string,                                │
│                    url: string,                                        │
│                    type: string,                                       │
│                    archivalDate: string                                │
│                  }],                                                   │
│                  totalRecords: number                                  │
│                }                                                        │
│                                                                         │
│ Collections:                                                           │
│   - Web Archive: Snapshots of websites over time                       │
│   - Open Library: Digitized books and texts                            │
│   - Government Documents: Federal and state records                    │
│   - Academic Texts: Research papers and theses                         │
│                                                                         │
│ Example Searches:                                                      │
│   - "workers compensation history"                                     │
│   - "disability rights legislation 1990s"                              │
│   - "OSHA regulations history"                                         │
│   - "ADA implementation documents"                                     │
│                                                                         │
│ Example Usage:                                                         │
│   const archiveData = await fetchArchiveOrgLegislativeData();          │
│   const historicalDocs = await fetchArchiveOrgLegislativeData(         │
│     'disability discrimination law 1970-2000'                          │
│   );                                                                    │
│                                                                         │
│ Advanced Search:                                                       │
│   Visit: https://archive.org/advancedsearch.php                        │
│   Supports complex queries with AND, OR, NOT operators                 │
│                                                                         │
│ API Documentation:                                                     │
│   https://archive.org/help/aboutsearch.php                             │
│   https://archive.org/developers/                                      │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 6. EUROSTAT API - EU DISABILITY & EMPLOYMENT STATISTICS                  │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://ec.europa.eu/eurostat                            │
│ Authentication: None required                                           │
│ Rate Limit:    Generous (100+ requests/minute)                         │
│ Cache:         30 minutes                                              │
│ Data Type:     EU disability rates, employment, social indicators      │
│ Coverage:      EU member states (27 countries) + EFTA                  │
│ Update:        Annual/Quarterly                                        │
│                                                                         │
│ Function:      fetchEurostatData(indicator)                            │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'Eurostat',                                   │
│                  records: [{                                           │
│                    key: string,                                        │
│                    value: number,                                      │
│                    unit: string                                        │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Key Indicators:                                                        │
│   - hlth_silc_08: Activity limitation (disability)                     │
│   - lfsa_egais: Employment rate of disabled persons                    │
│   - hc_ca_arm: Population with chronic disability                      │
│   - spr_exp_sum: Social expenditure as % of GDP                        │
│   - ilc_mddw01: Material deprivation                                   │
│   - hc_sth: Self-assessed health status                                │
│                                                                         │
│ Example Usage:                                                         │
│   const euData = await fetchEurostatData('hlth_silc_08');              │
│                                                                         │
│ Data Format:                                                           │
│   SDMX (Statistical Data and Metadata eXchange)                        │
│   JSON output available                                                │
│                                                                         │
│ API Documentation:                                                     │
│   https://ec.europa.eu/eurostat/web/json-and-unicode-web-services/    │
│   https://ec.europa.eu/eurostat/web/main/home                          │
│                                                                         │
│ Coverage by Country:                                                   │
│   EU27 (Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech,           │
│   Denmark, Estonia, Finland, France, Germany, Greece, Hungary,        │
│   Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands,  │
│   Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden)       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ 7. UN SUSTAINABLE DEVELOPMENT GOALS (SDG) TRACKER                        │
├─────────────────────────────────────────────────────────────────────────┤
│ URL:           https://sdg-tracker.org/                                 │
│ Authentication: None required                                           │
│ Rate Limit:    Generous                                                │
│ Cache:         30 minutes                                              │
│ Data Type:     UN SDG progress metrics on disability inclusion          │
│ Coverage:      193 UN member states                                    │
│ Update:        Annual/Quarterly                                        │
│                                                                         │
│ Function:      fetchUNSDGData()                                        │
│ Returns:       {                                                        │
│                  success: boolean,                                     │
│                  source: 'UN SDG Tracker',                             │
│                  relevantGoals: [{                                     │
│                    number: number,                                     │
│                    name: string,                                       │
│                    disabilityRelevance: string                         │
│                  }]                                                    │
│                }                                                        │
│                                                                         │
│ Disability-Relevant Goals:                                             │
│   - SDG 3: Good Health and Well-being                                  │
│     Target: Universal health coverage, mental health                   │
│   - SDG 5: Gender Equality                                             │
│     Target: Women and girls with disabilities                          │
│   - SDG 8: Decent Work and Economic Growth                             │
│     Target: Full and productive employment, inclusive growth           │
│   - SDG 10: Reduced Inequalities                                       │
│     Target: Promote social, economic, and political inclusion          │
│   - SDG 16: Peace, Justice and Strong Institutions                     │
│     Target: Inclusive and representative governance, rule of law       │
│                                                                         │
│ Example Usage:                                                         │
│   const sdgData = await fetchUNSDGData();                              │
│   // Returns 5 goals with disability relevance and indicators          │
│                                                                         │
│ Data Sources:                                                          │
│   - World Bank                                                         │
│   - UN Agencies (WHO, ILO, etc.)                                       │
│   - National governments                                               │
│   - Academic institutions                                              │
│                                                                         │
│ API Documentation:                                                     │
│   https://sdg-tracker.org/about                                        │
│   https://github.com/owid/sdg-tracker.org                              │
└─────────────────────────────────────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════════════
// 4. INTEGRATION WITH EYE ORACLE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

/*
IMPORTING THE NEW CONNECTORS:

In your main Eye Oracle files:

const globalConnectors = require('./utils/global-data-connectors');
const specializedConnectors = require('./utils/specialized-data-connectors');

USING INDIVIDUAL FUNCTIONS:

// Fetch World Bank data
const wbData = await globalConnectors.fetchWorldBankData();

// Fetch Reddit discussions
const redditData = await globalConnectors.fetchRedditData();

// Fetch accessibility maps
const mapData = await specializedConnectors.fetchAccessibilityMapData();

// Fetch GitHub projects
const githubData = await specializedConnectors.fetchGitHubAccessibilityProjects();

USING UNIFIED FETCH:

// Get all global data sources at once
const allGlobal = await globalConnectors.fetchAllGlobalData({
  includeWorldBank: true,
  includeReddit: true,
  includeTwitter: false, // Disabled without API key
  twitterApiKey: process.env.TWITTER_BEARER_TOKEN
});

// Get all specialized data sources
const allSpecialized = await specializedConnectors.fetchAllSpecializedData({
  includeAccessibilityMap: true,
  includeWikidata: true,
  includeGitHub: true
});

USING CACHED DATA:

// Use cache to avoid hammering APIs
const cachedGlobal = await globalConnectors.getCachedGlobalData();
const cachedSpecial = await specializedConnectors.getCachedSpecializedData();

CACHE MANAGEMENT:

Cache duration: 30 minutes (CACHE_DURATION = 1800000)
Automatic invalidation after 30 minutes
Subsequent calls within 30 min use cached data
Manual refresh forces new API calls
*/

// ═══════════════════════════════════════════════════════════════════════════
// 5. ERROR HANDLING & RATE LIMITING
// ═══════════════════════════════════════════════════════════════════════════

/*
ALL FUNCTIONS IMPLEMENT:

1. Try-Catch Blocks:
   - Graceful error handling
   - Specific error logging
   - Fallback responses

2. Rate Limit Handling:
   - Respects API rate limits
   - Requests are throttled appropriately
   - Includes User-Agent headers for identification

3. Response Validation:
   - Checks for API success indicators
   - Validates response structure
   - Handles null/undefined values

4. Caching:
   - Automatic cache storage
   - 30-minute TTL
   - getCached* functions check before fetching

5. Timeout Management:
   - Default timeout: 30 seconds
   - Some APIs have built-in timeouts
   - Graceful timeout handling with fallback data

EXAMPLE ERROR RESPONSE:

{
  success: false,
  source: 'World Bank',
  error: 'Connection timeout',
  records: []
}

RETRY STRATEGY:

For production, consider wrapper:

async function fetchWithRetry(fetchFn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}
*/

// ═══════════════════════════════════════════════════════════════════════════
// 6. ENVIRONMENT VARIABLES REQUIRED
// ═══════════════════════════════════════════════════════════════════════════

/*
Add to your .env file:

# Twitter/X API (if using Twitter data)
TWITTER_BEARER_TOKEN=your_bearer_token_here

# Optional: GitHub API (for higher rate limits)
GITHUB_TOKEN=your_github_token_here

# Optional: Other service credentials
# (Most sources work without authentication)

Note: Do NOT commit .env file to version control
Use .env.example with placeholder values instead
*/

// ═══════════════════════════════════════════════════════════════════════════
// 7. DATA COVERAGE SUMMARY
// ═══════════════════════════════════════════════════════════════════════════

/*
GLOBAL DATA CONNECTORS (global-data-connectors.js)
──────────────────────────────────────────────────

1. World Bank Data
   ✓ 190+ countries
   ✓ Disability, poverty, health indicators
   ✓ Annual updates
   ✓ Free, public API
   Coverage: GLOBAL

2. UNHCR Data
   ✓ Displacement statistics
   ✓ Refugee populations
   ✓ Vulnerable population tracking
   ✓ Real-time updates
   Coverage: GLOBAL (crisis-focused)

3. Global Fund Data
   ✓ 150+ countries
   ✓ Health funding for vulnerable populations
   ✓ Disease burden data
   ✓ Quarterly updates
   Coverage: GLOBAL

4. OECD Statistics
   ✓ 35+ developed/emerging countries
   ✓ Social security and disability benefits data
   ✓ Employment statistics
   ✓ Annual/Quarterly updates
   Coverage: OECD MEMBER STATES

5. Reddit API
   ✓ 8 relevant subreddits
   ✓ Real user experiences
   ✓ Workers compensation discussions
   ✓ Disability community support
   ✓ Real-time updates
   Coverage: ENGLISH-SPEAKING COMMUNITY

6. Twitter/X API
   ✓ Real-time policy discussions
   ✓ Justice and advocacy tweets
   ✓ Worker injustice awareness
   ✓ 5 search queries (configurable)
   ✓ Real-time updates
   Coverage: GLOBAL (English, requires API key)

7. Wikipedia API
   ✓ Historical legislation records
   ✓ Rights movement history
   ✓ Occupational safety information
   ✓ Educational content
   ✓ Real-time community updates
   Coverage: GLOBAL (Multiple languages)

8. Google Trends API
   ✓ Search trend analysis
   ✓ Public interest tracking
   ✓ Keyword popularity
   ✓ Regional interest patterns
   Coverage: GLOBAL (limited in current implementation)


SPECIALIZED DATA CONNECTORS (specialized-data-connectors.js)
────────────────────────────────────────────────────────────

1. OpenStreetMap Accessibility
   ✓ Wheelchair accessible locations
   ✓ Medical facilities, transport, amenities
   ✓ Global coverage (crowdsourced)
   ✓ Real-time updates
   Coverage: GLOBAL

2. Wikidata
   ✓ Structured disability rights data
   ✓ Historical figures and organizations
   ✓ Legislation records
   ✓ 9M+ items in knowledge base
   Coverage: GLOBAL

3. DBpedia
   ✓ Semantic data extraction
   ✓ Linked data format
   ✓ 38+ languages
   ✓ Cross-referenced with other databases
   Coverage: GLOBAL

4. GitHub
   ✓ Open source accessibility projects
   ✓ 1000s of disability/accessibility repos
   ✓ Active development communities
   ✓ Real-time updates
   Coverage: GLOBAL DEVELOPER COMMUNITY

5. Archive.org
   ✓ Historical legislation documents
   ✓ 600B+ web pages archived
   ✓ 30M+ digitized books
   ✓ Government records
   Coverage: GLOBAL HISTORICAL RECORDS

6. Eurostat
   ✓ 27 EU member states + EFTA
   ✓ Disability employment rates
   ✓ Activity limitation data
   ✓ Social expenditure tracking
   Coverage: EUROPEAN UNION

7. UN SDG Tracker
   ✓ 193 UN member states
   ✓ 5 disability-relevant SDGs
   ✓ Annual progress tracking
   ✓ Multiple indicators per goal
   Coverage: GLOBAL


TOTAL COVERAGE ESTIMATION:
──────────────────────────

Geographic Coverage:
  - All UN member countries (193)
  - Focus on developed/developing economies
  - Emphasis on English-speaking regions
  - Growing data availability globally

Data Types Captured:
  - ✓ Socioeconomic indicators
  - ✓ Government statistics
  - ✓ Community discussions
  - ✓ Real-time social media
  - ✓ Historical records and legislation
  - ✓ Accessibility information
  - ✓ Semantic/structured data
  - ✓ Academic and research data
  - ✓ Health and humanitarian data
  - ✓ Search trend analysis

Time Coverage:
  - Real-time: Reddit, Twitter, OpenStreetMap
  - Current year: World Bank, OECD, Eurostat
  - Multiple years: UN SDG, Archive.org, UNHCR
  - Historical: Wikipedia, DBpedia, Wikidata

Update Frequency:
  - Real-time: 5 sources (Reddit, Twitter, Maps, Trends, etc.)
  - Weekly/Monthly: 3 sources
  - Quarterly: 4 sources
  - Annual: 3 sources

Estimated Records Per Query:
  - World Bank: 50-200 records
  - UNHCR: 10-50 records
  - Global Fund: 50-200 records
  - OECD: 50-200 records
  - Reddit: 40-100 posts
  - Twitter: 50-500 tweets (requires auth)
  - Wikipedia: 10-50 articles
  - Google Trends: 6-20 keywords
  - OpenStreetMap: 20-100 locations
  - Wikidata: 50-200 entities
  - DBpedia: 50 resources
  - GitHub: 20-100 projects
  - Archive.org: 30-100 documents
  - Eurostat: 50+ records
  - SDG: 5 goals with multiple indicators
*/

// ═══════════════════════════════════════════════════════════════════════════
// 8. IMPLEMENTATION CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════

/*
SETUP CHECKLIST:
[ ] Review both connector files: global-data-connectors.js, specialized-data-connectors.js
[ ] Create/update .env file with required credentials
  [ ] Add TWITTER_BEARER_TOKEN (if using Twitter API)
  [ ] Add GITHUB_TOKEN (optional, for higher rate limits)
[ ] Integrate connectors into main Eye Oracle system
[ ] Add imports to relevant Eye Oracle processing files
[ ] Configure caching strategy
[ ] Set up error logging
[ ] Test each connector individually
[ ] Monitor API rate limits
[ ] Document API credentials in secure vault
[ ] Set up alerts for failed API calls

INTEGRATION CHECKLIST:
[ ] Update the-eye-processor.js to include global sources
[ ] Add specialized connectors to evidence bundle system
[ ] Configure data normalization for each source
[ ] Set up data quality validation
[ ] Create visualization mappings for new data types
[ ] Update dashboard to show global coverage
[ ] Document new data sources in system docs
[ ] Create user-facing explanations of data sources
[ ] Set up monitoring/alerting for API health

TESTING CHECKLIST:
[ ] Test each function with mock API calls
[ ] Verify error handling for failed requests
[ ] Check cache functionality (30-minute TTL)
[ ] Validate data normalization
[ ] Test rate limiting behavior
[ ] Verify timeout handling
[ ] Check memory usage with large datasets
[ ] Test with various network conditions
[ ] Verify pagination (where applicable)
[ ] Test with different parameter combinations
*/

// ═══════════════════════════════════════════════════════════════════════════
// 9. PRODUCTION RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════════════

/*
PERFORMANCE OPTIMIZATION:

1. Implement Circuit Breaker Pattern:
   - Skip failed APIs temporarily
   - Recover after cool-off period
   - Reduce unnecessary requests

2. Use Connection Pooling:
   - Reuse HTTP connections
   - Reduce latency
   - Better resource management

3. Batch Requests:
   - Combine multiple queries where possible
   - Reduce round-trip times
   - Respect rate limits better

4. Implement Exponential Backoff:
   - Retry failed requests with increasing delays
   - 1s → 2s → 4s → 8s pattern
   - Max 3-5 retries

5. Monitor & Alert:
   - Track API availability
   - Alert on failures/timeouts
   - Log all API calls for debugging


DATA QUALITY:

1. Validation Rules:
   - Check data types (string, number, date)
   - Verify required fields present
   - Validate value ranges
   - Check date format consistency

2. Deduplication:
   - Remove duplicate records across sources
   - Handle slight variations (whitespace, case)
   - Maintain source attribution

3. Enrichment:
   - Cross-reference data from multiple sources
   - Add confidence scores
   - Track data provenance

4. Archival:
   - Keep historical snapshots
   - Track changes over time
   - Enable trend analysis


SECURITY:

1. API Key Management:
   - Use environment variables
   - Rotate keys periodically
   - Never commit keys to repository
   - Use secure vaults (AWS Secrets Manager, HashiCorp)

2. Data Privacy:
   - Anonymize personal data from Reddit/Twitter
   - Respect GDPR requirements (EU data)
   - Handle sensitive information carefully

3. Rate Limiting:
   - Respect all API rate limits
   - Implement queue systems
   - Set reasonable timeouts

4. Logging:
   - Log API calls but NOT with credentials
   - Use structured logging
   - Implement retention policies
*/

module.exports = {};
