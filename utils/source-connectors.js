/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SOURCE CONNECTORS - The Eye Data Ingestion Layer (REAL DATA ONLY)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * NO DEMO DATA. NO PLACEHOLDER DATA. ONLY REAL API CALLS.
 * 
 * Connects to authoritative Canadian data sources:
 * - Open Government portals (federal/provincial)
 * - FOI disclosure pages
 * - Auditor/Ombudsman reports
 * - Court/tribunal databases (CanLII)
 * - Media/news feeds (RSS)
 * 
 * Each connector provides standardized interface for:
 * - fetch(): Get latest data
 * - search(query): Search specific topics
 * - monitor(): Set up continuous monitoring
 * ═══════════════════════════════════════════════════════════════════════════
 */

const CACHE_DURATION = 3600000; // 1 hour

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 1. OPEN GOVERNMENT DATA (REAL API CALLS)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class OpenGovernmentConnector {
  constructor() {
    this.baseUrls = {
      federal: 'https://open.canada.ca/data/api/3/action',
      ontario: 'https://data.ontario.ca/api/3/action',
      bc: 'https://catalogue.data.gov.bc.ca/api/3/action',
      alberta: 'https://open.alberta.ca/api/3/action'
    };
    this.cache = new Map();
  }
  
  async fetchDatasets(jurisdiction = 'federal', keywords = []) {
    const cacheKey = `${jurisdiction}_${keywords.join('_')}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;
    
    try {
      const baseUrl = this.baseUrls[jurisdiction];
      if (!baseUrl) {
        return { success: false, error: `Unknown jurisdiction: ${jurisdiction}`, datasets: [] };
      }
      
      const query = keywords.join(' OR ');
      const searchUrl = `${baseUrl}/package_search?q=${encodeURIComponent(query)}&rows=20`;
      
      // REAL API CALL
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        return { 
          success: false, 
          error: `API returned ${response.status}`, 
          datasets: [],
          source: jurisdiction
        };
      }
      
      const data = await response.json();
      
      if (!data.success || !data.result) {
        return { success: false, error: 'Invalid API response', datasets: [] };
      }
      
      // Transform real data
      const datasets = data.result.results.map(pkg => ({
        id: pkg.id,
        title: pkg.title || pkg.name,
        description: pkg.notes || '',
        organization: pkg.organization?.title || `Government of ${jurisdiction}`,
        url: `${baseUrl.replace('/api/3/action', '')}/dataset/${pkg.id}`,
        lastUpdated: pkg.metadata_modified,
        resources: (pkg.resources || []).slice(0, 5).map(r => ({
          name: r.name,
          format: r.format,
          url: r.url
        })),
        tags: (pkg.tags || []).map(t => t.display_name || t.name),
        verified: true,
        verificationSource: baseUrl,
        fetchedAt: new Date().toISOString()
      }));
      
      const result = {
        success: true,
        jurisdiction,
        keywords,
        totalCount: data.result.count,
        datasets,
        fetchedAt: new Date().toISOString(),
        source: 'open_government',
        sourceUrl: baseUrl
      };
      
      this.setCache(cacheKey, result);
      return result;
      
    } catch (error) {
      console.error(`Open Government API error (${jurisdiction}):`, error);
      return { 
        success: false, 
        error: error.message, 
        datasets: [],
        jurisdiction
      };
    }
  }
  
  async monitor(keywords, callback) {
    // Set up polling for new datasets
    const check = async () => {
      const data = await this.fetchDatasets('federal', keywords);
      if (data.success && data.datasets?.length > 0) {
        callback(data);
      }
    };
    
    // Initial check
    await check();
    
    // Then check every 6 hours
    const interval = setInterval(check, 21600000);
    
    return () => clearInterval(interval);
  }
  
  getCache(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    return cached.data;
  }
  
  setCache(key, data) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2. FOI DISCLOSURE PAGES
 * Note: These require scraping - links provided for manual access
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class FOIConnector {
  constructor() {
    this.sources = [
      {
        name: 'Ontario WSIB FOI',
        url: 'https://www.wsib.ca/en/freedom-information',
        type: 'page_reference'
      },
      {
        name: 'Ontario Ministry FOI',
        url: 'https://www.ontario.ca/page/freedom-information-requests',
        type: 'page_reference'
      },
      {
        name: 'Federal ATIP',
        url: 'https://open.canada.ca/en/search/ati',
        type: 'api'
      }
    ];
  }
  
  async fetchCompletedRequests(source) {
    // FOI pages typically require scraping
    // Return reference information for manual access
    return {
      source: source.name,
      url: source.url,
      type: source.type,
      accessNote: 'Visit URL to search completed FOI requests',
      completed_requests: [],
      fetchedAt: new Date().toISOString(),
      manualAccessRequired: true
    };
  }
  
  async monitorAll(callback) {
    // FOI monitoring requires periodic manual checks or scraping
    const checkAll = async () => {
      for (const source of this.sources) {
        const data = await this.fetchCompletedRequests(source);
        callback(data);
      }
    };
    
    await checkAll();
    const interval = setInterval(checkAll, 604800000); // Weekly
    
    return () => clearInterval(interval);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 3. AUDITOR/OMBUDSMAN REPORTS
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class OversightConnector {
  constructor() {
    this.sources = [
      {
        name: 'Ontario Auditor General',
        url: 'https://www.auditor.on.ca/',
        reportsUrl: 'https://www.auditor.on.ca/en/content/annualreports/arbymain.html'
      },
      {
        name: 'Ontario Ombudsman',
        url: 'https://www.ombudsman.on.ca/',
        reportsUrl: 'https://www.ombudsman.on.ca/resources/reports-and-case-summaries'
      },
      {
        name: 'Federal Auditor General',
        url: 'https://www.oag-bvg.gc.ca/',
        reportsUrl: 'https://www.oag-bvg.gc.ca/internet/English/parl_lpf_e_901.html'
      }
    ];
  }
  
  async fetchReports(source) {
    // Oversight reports require scraping or manual access
    return {
      source: source.name,
      url: source.url,
      reportsUrl: source.reportsUrl,
      accessNote: 'Visit reports URL to access published oversight reports',
      reports: [],
      fetchedAt: new Date().toISOString(),
      manualAccessRequired: true
    };
  }
  
  async monitorAll(callback) {
    const checkAll = async () => {
      for (const source of this.sources) {
        const data = await this.fetchReports(source);
        callback(data);
      }
    };
    
    await checkAll();
    const interval = setInterval(checkAll, 2592000000); // Monthly
    
    return () => clearInterval(interval);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 4. COURT/TRIBUNAL DATABASES (CanLII)
 * Note: CanLII has public search - API requires registration
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class LegalDatabaseConnector {
  constructor() {
    this.baseUrl = 'https://www.canlii.org/en/';
    this.tribunals = [
      {
        id: 'on/wsiat',
        name: 'Workplace Safety & Insurance Appeals Tribunal',
        jurisdiction: 'Ontario',
        searchUrl: 'https://www.canlii.org/en/on/onwsiat/'
      },
      {
        id: 'on/onhrt',
        name: 'Human Rights Tribunal of Ontario',
        jurisdiction: 'Ontario',
        searchUrl: 'https://www.canlii.org/en/on/onhrt/'
      },
      {
        id: 'ca/scc',
        name: 'Supreme Court of Canada',
        jurisdiction: 'Federal',
        searchUrl: 'https://www.canlii.org/en/ca/scc/'
      }
    ];
  }
  
  async searchCases(tribunal, keywords) {
    // CanLII public search available at searchUrl
    return {
      tribunal: tribunal.name,
      jurisdiction: tribunal.jurisdiction,
      searchUrl: tribunal.searchUrl,
      keywords,
      accessNote: 'CanLII provides free public access. Visit searchUrl to search cases.',
      apiNote: 'Full API access requires registration at canlii.org/en/info/api.html',
      cases: [],
      fetchedAt: new Date().toISOString(),
      manualAccessRequired: true
    };
  }
  
  async monitorKeywords(keywords, callback) {
    const checkAll = async () => {
      for (const tribunal of this.tribunals) {
        const data = await this.searchCases(tribunal, keywords);
        callback(data);
      }
    };
    
    await checkAll();
    const interval = setInterval(checkAll, 604800000); // Weekly
    
    return () => clearInterval(interval);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 5. MEDIA/NEWS FEEDS (RSS)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class MediaConnector {
  constructor() {
    this.sources = [
      {
        name: 'CBC News Canada',
        rss: 'https://www.cbc.ca/cmlink/rss-canada',
        category: 'national'
      },
      {
        name: 'CTV News Canada',
        rss: 'https://www.ctvnews.ca/rss/ctvnews-ca-canada-public-rss-1.822009',
        category: 'national'
      }
    ];
  }
  
  async fetchNews(keywords = []) {
    // RSS feeds require a parser library
    // Return feed URLs for direct access
    return {
      sources: this.sources.map(s => ({
        name: s.name,
        rss: s.rss,
        category: s.category
      })),
      keywords,
      accessNote: 'Use RSS reader or parser library to fetch feeds',
      articles: [],
      fetchedAt: new Date().toISOString(),
      rssParserRequired: true
    };
  }
  
  async monitorKeywords(keywords, callback) {
    const check = async () => {
      const data = await this.fetchNews(keywords);
      callback(data);
    };
    
    await check();
    const interval = setInterval(check, 21600000); // 6 hours
    
    return () => clearInterval(interval);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 6. SOCIAL LISTENING (Reddit - Public API)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class SocialConnector {
  constructor() {
    this.subreddits = [
      'ontario',
      'canada',
      'legaladvicecanada',
      'PersonalFinanceCanada'
    ];
  }
  
  async searchPosts(platform, keywords, limit = 10) {
    if (platform !== 'Reddit') {
      return {
        platform,
        note: 'Only Reddit public API is supported',
        posts: []
      };
    }
    
    try {
      const query = keywords.join(' OR ');
      const posts = [];
      
      // Reddit public JSON API
      for (const subreddit of this.subreddits.slice(0, 2)) {
        try {
          const response = await fetch(
            `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&restrict_sr=1&sort=new`,
            { headers: { 'User-Agent': 'TheEyeOracle/1.0' } }
          );
          
          if (response.ok) {
            const data = await response.json();
            
            if (data.data?.children) {
              for (const child of data.data.children) {
                const post = child.data;
                posts.push({
                  id: post.id,
                  title: post.title,
                  subreddit: post.subreddit,
                  author: post.author,
                  url: `https://reddit.com${post.permalink}`,
                  created: new Date(post.created_utc * 1000).toISOString(),
                  score: post.score,
                  numComments: post.num_comments,
                  selftext: (post.selftext || '').substring(0, 500)
                });
              }
            }
          }
        } catch (e) {
          console.warn(`Reddit search error for r/${subreddit}:`, e.message);
        }
      }
      
      return {
        platform: 'Reddit',
        keywords,
        subreddits: this.subreddits,
        posts,
        fetchedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Reddit search error:', error);
      return { 
        platform: 'Reddit',
        error: error.message, 
        posts: [] 
      };
    }
  }
  
  async monitorKeywords(keywords, callback) {
    const check = async () => {
      const data = await this.searchPosts('Reddit', keywords);
      if (data.posts?.length > 0) {
        callback(data);
      }
    };
    
    await check();
    const interval = setInterval(check, 86400000); // Daily
    
    return () => clearInterval(interval);
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UNIFIED MONITORING COORDINATOR
 * ═══════════════════════════════════════════════════════════════════════════
 */
export class SourceMonitor {
  constructor() {
    this.connectors = {
      openGov: new OpenGovernmentConnector(),
      foi: new FOIConnector(),
      oversight: new OversightConnector(),
      legal: new LegalDatabaseConnector(),
      media: new MediaConnector(),
      social: new SocialConnector()
    };
    
    this.activeMonitors = [];
  }
  
  async startMonitoring(config) {
    const { keywords = [], sources = ['all'] } = config;
    
    const enabledSources = sources.includes('all') 
      ? Object.keys(this.connectors) 
      : sources;
    
    for (const source of enabledSources) {
      const connector = this.connectors[source];
      if (!connector) continue;
      
      try {
        if (connector.monitorKeywords) {
          const unsubscribe = await connector.monitorKeywords(keywords, (data) => {
            this.handleNewData(source, data);
          });
          this.activeMonitors.push({ source, unsubscribe });
        } else if (connector.monitorAll) {
          const unsubscribe = await connector.monitorAll((data) => {
            this.handleNewData(source, data);
          });
          this.activeMonitors.push({ source, unsubscribe });
        } else if (connector.monitor) {
          const unsubscribe = await connector.monitor(keywords, (data) => {
            this.handleNewData(source, data);
          });
          this.activeMonitors.push({ source, unsubscribe });
        }
      } catch (e) {
        console.warn(`Failed to start monitoring for ${source}:`, e.message);
      }
    }
    
    return this.activeMonitors.length;
  }
  
  stopMonitoring() {
    this.activeMonitors.forEach(monitor => {
      if (monitor.unsubscribe) {
        try {
          monitor.unsubscribe();
        } catch (e) {
          // Ignore unsubscribe errors
        }
      }
    });
    this.activeMonitors = [];
  }
  
  handleNewData(source, data) {
    console.log(`[SourceMonitor] New data from ${source}`);
    
    // Emit event for listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('source-data', {
        detail: { source, data, timestamp: Date.now() }
      }));
    }
  }
  
  async searchAll(keywords) {
    const results = {};
    
    // Open Government (REAL API)
    results.openGov = await this.connectors.openGov.fetchDatasets('federal', keywords);
    
    // FOI (reference links)
    results.foi = await this.connectors.foi.fetchCompletedRequests(
      this.connectors.foi.sources[0]
    );
    
    // Oversight (reference links)
    results.oversight = await this.connectors.oversight.fetchReports(
      this.connectors.oversight.sources[0]
    );
    
    // Legal (reference links)
    results.legal = await this.connectors.legal.searchCases(
      this.connectors.legal.tribunals[0],
      keywords
    );
    
    // Media (RSS feed references)
    results.media = await this.connectors.media.fetchNews(keywords);
    
    // Social (REAL Reddit API)
    results.social = await this.connectors.social.searchPosts('Reddit', keywords);
    
    return {
      keywords,
      results,
      searched_at: new Date().toISOString(),
      total_sources: Object.keys(results).length
    };
  }
}

/**
 * EXPORT DEFAULT INSTANCE
 */
export const sourceMonitor = new SourceMonitor();

export default {
  OpenGovernmentConnector,
  FOIConnector,
  OversightConnector,
  LegalDatabaseConnector,
  MediaConnector,
  SocialConnector,
  SourceMonitor,
  sourceMonitor
};
