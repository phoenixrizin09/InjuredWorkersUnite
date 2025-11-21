/**
 * FREE API CONNECTORS
 * 
 * 100% FREE data sources - no API keys, no subscriptions, no costs
 * All endpoints are publicly accessible
 */

/**
 * 1. REDDIT API - Completely Free (JSON endpoints)
 * Monitor Canadian subreddits for corruption discussions
 */
export class RedditConnector {
  constructor() {
    this.subreddits = [
      'ontario', 'toronto', 'canada', 'onguardforthee',
      'legaladvicecanada', 'PersonalFinanceCanada',
      'CanadaPolitics', 'ndp', 'antiwork'
    ];
  }
  
  async searchSubreddit(subreddit, keywords, timeframe = 'week') {
    try {
      const query = keywords.join(' OR ');
      const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&t=${timeframe}&limit=100`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        subreddit,
        keywords,
        posts: data.data.children.map(post => ({
          id: post.data.id,
          title: post.data.title,
          author: post.data.author,
          url: `https://reddit.com${post.data.permalink}`,
          score: post.data.score,
          num_comments: post.data.num_comments,
          created: new Date(post.data.created_utc * 1000).toISOString(),
          text: post.data.selftext,
          upvote_ratio: post.data.upvote_ratio
        })),
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Reddit search error (${subreddit}):`, error);
      return { subreddit, posts: [], error: error.message };
    }
  }
  
  async monitorAll(keywords) {
    const results = [];
    for (const subreddit of this.subreddits) {
      const data = await this.searchSubreddit(subreddit, keywords);
      if (data.posts.length > 0) {
        results.push(data);
      }
      // Respectful delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return results;
  }
}

/**
 * 2. ONTARIO OPEN DATA - Free API
 * Government datasets on WSIB, ODSP, healthcare
 */
export class OntarioOpenDataConnector {
  constructor() {
    this.baseUrl = 'https://data.ontario.ca/api/3/action';
  }
  
  async searchDatasets(query) {
    try {
      const url = `${this.baseUrl}/package_search?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        query,
        count: data.result.count,
        datasets: data.result.results.map(ds => ({
          id: ds.id,
          title: ds.title,
          description: ds.notes,
          organization: ds.organization?.title,
          url: `https://data.ontario.ca/dataset/${ds.name}`,
          last_updated: ds.metadata_modified,
          resources: ds.resources?.map(r => ({
            name: r.name,
            format: r.format,
            url: r.url
          }))
        })),
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Ontario Open Data error:', error);
      return { query, datasets: [], error: error.message };
    }
  }
  
  async getWSIBData() {
    return await this.searchDatasets('WSIB workplace injury statistics');
  }
  
  async getODSPData() {
    return await this.searchDatasets('ODSP disability support');
  }
}

/**
 * 3. FEDERAL OPEN DATA - Free API
 * Federal government datasets
 */
export class FederalOpenDataConnector {
  constructor() {
    this.baseUrl = 'https://open.canada.ca/data/api/3/action';
  }
  
  async searchDatasets(query) {
    try {
      const url = `${this.baseUrl}/package_search?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        query,
        count: data.result.count,
        datasets: data.result.results.map(ds => ({
          id: ds.id,
          title: ds.title_translated?.en || ds.title,
          description: ds.notes_translated?.en || ds.notes,
          organization: ds.organization?.title_translated?.en,
          url: `https://open.canada.ca/data/en/dataset/${ds.name}`,
          last_updated: ds.metadata_modified,
          resources: ds.resources?.map(r => ({
            name: r.name_translated?.en || r.name,
            format: r.format,
            url: r.url
          }))
        })),
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Federal Open Data error:', error);
      return { query, datasets: [], error: error.message };
    }
  }
  
  async getIndigenousData() {
    return await this.searchDatasets('Indigenous First Nations water');
  }
  
  async getCPPDisabilityData() {
    return await this.searchDatasets('CPP disability benefits statistics');
  }
}

/**
 * 4. CANLII API - Free Legal Database
 * Requires free API key: https://www.canlii.org/en/info/api.html
 */
export class CanLIIConnector {
  constructor(apiKey = null) {
    this.baseUrl = 'https://api.canlii.org/v1';
    this.apiKey = apiKey; // Get free at: https://www.canlii.org/en/info/api.html
    this.webSearchUrl = 'https://www.canlii.org/en/';
  }
  
  // No API key? Use web scraping approach (slower but free)
  async searchCasesWeb(keywords) {
    const query = keywords.join(' ');
    const searchUrl = `${this.webSearchUrl}#search/text=${encodeURIComponent(query)}`;
    
    return {
      search_url: searchUrl,
      keywords,
      note: 'Visit this URL to see cases. API key needed for automated access.',
      get_api_key: 'https://www.canlii.org/en/info/api.html (FREE registration)',
      fetched_at: new Date().toISOString()
    };
  }
  
  // With API key
  async searchCases(keywords) {
    if (!this.apiKey) {
      return this.searchCasesWeb(keywords);
    }
    
    try {
      const query = keywords.join(' ');
      const url = `${this.baseUrl}/caseBrowse/en/?text=${encodeURIComponent(query)}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      const data = await response.json();
      
      return {
        keywords,
        cases: data.cases || [],
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('CanLII API error:', error);
      return this.searchCasesWeb(keywords);
    }
  }
}

/**
 * 5. ONTARIO LEGISLATURE - Free XML/RSS
 * Track bills and hansard
 */
export class OntarioLegislatureConnector {
  constructor() {
    this.baseUrl = 'https://www.ola.org';
  }
  
  async getCurrentBills() {
    try {
      // Ontario Legislature provides XML feeds
      const url = `${this.baseUrl}/en/legislative-business/bills`;
      
      return {
        url,
        note: 'Scraping required - Ontario provides HTML/XML feeds',
        manual_check: 'Visit URL for current bills',
        automation_ready: 'Can be automated with Cheerio/JSDOM',
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Legislature error:', error);
      return { error: error.message };
    }
  }
  
  // Helper: Generate direct links to important searches
  getImportantLinks() {
    return {
      all_bills: `${this.baseUrl}/en/legislative-business/bills`,
      hansard: `${this.baseUrl}/en/legislative-business/house-documents/parliament-43/session-1/hansard`,
      committees: `${this.baseUrl}/en/legislative-business/committees`,
      search_wsib: `${this.baseUrl}/en/legislative-business/bills?search=wsib`,
      search_odsp: `${this.baseUrl}/en/legislative-business/bills?search=odsp`,
      search_disability: `${this.baseUrl}/en/legislative-business/bills?search=disability`
    };
  }
}

/**
 * 6. FEDERAL PARLIAMENT - Free Open Data
 * Track federal bills and debates
 */
export class ParliamentConnector {
  constructor() {
    this.baseUrl = 'https://www.ourcommons.ca';
    this.openParliamentUrl = 'https://openparliament.ca/api';
  }
  
  // OpenParliament.ca provides FREE API
  async searchDebates(query) {
    try {
      const url = `${this.openParliamentUrl}/debates/?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        query,
        debates: data.objects || [],
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Parliament API error:', error);
      return { query, debates: [], error: error.message };
    }
  }
  
  async searchBills(query) {
    try {
      const url = `${this.openParliamentUrl}/bills/?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        query,
        bills: data.objects || [],
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Bills API error:', error);
      return { query, bills: [], error: error.message };
    }
  }
  
  getImportantLinks() {
    return {
      all_bills: `${this.baseUrl}/en/bills`,
      hansard: `${this.baseUrl}/en/parliamentary-business/house-publications/debates`,
      committees: `${this.baseUrl}/en/committees`,
      openparliament: 'https://openparliament.ca/',
      legaladvice: 'https://laws-lois.justice.gc.ca/'
    };
  }
}

/**
 * 7. STATISTICS CANADA - Free Data
 * Economic and social statistics
 */
export class StatCanConnector {
  constructor() {
    this.baseUrl = 'https://www150.statcan.gc.ca/t1/wds/rest';
  }
  
  async getDataTable(tableId) {
    try {
      // StatCan Web Data Service is FREE
      const url = `${this.baseUrl}/getFullTableDownload/en/${tableId}`;
      
      return {
        table_id: tableId,
        download_url: url,
        note: 'CSV download available',
        fetched_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('StatCan error:', error);
      return { error: error.message };
    }
  }
  
  getImportantTables() {
    return {
      low_income: '11-10-0135-01', // Low income statistics
      disability: '13-10-0347-01', // Disability prevalence
      employment: '14-10-0287-01', // Employment by disability status
      housing: '11-10-0239-01', // Housing affordability
      url: 'https://www150.statcan.gc.ca/n1/en/type/data'
    };
  }
}

/**
 * UNIFIED FREE API MONITOR
 * Coordinates all free data sources
 */
export class FreeAPIMonitor {
  constructor() {
    this.connectors = {
      reddit: new RedditConnector(),
      ontarioData: new OntarioOpenDataConnector(),
      federalData: new FederalOpenDataConnector(),
      canlii: new CanLIIConnector(),
      ontarioLeg: new OntarioLegislatureConnector(),
      parliament: new ParliamentConnector(),
      statcan: new StatCanConnector()
    };
  }
  
  async searchAll(keywords) {
    console.log('🔍 Searching all FREE APIs for:', keywords);
    
    const results = {
      keywords,
      started_at: new Date().toISOString(),
      sources: {}
    };
    
    // Reddit (most reliable free API)
    try {
      results.sources.reddit = await this.connectors.reddit.monitorAll(keywords);
      console.log('✅ Reddit:', results.sources.reddit.length, 'subreddits searched');
    } catch (error) {
      console.error('Reddit failed:', error);
    }
    
    // Ontario Open Data
    try {
      results.sources.ontario_data = await this.connectors.ontarioData.searchDatasets(keywords.join(' '));
      console.log('✅ Ontario Data:', results.sources.ontario_data.count, 'datasets found');
    } catch (error) {
      console.error('Ontario Data failed:', error);
    }
    
    // Federal Open Data
    try {
      results.sources.federal_data = await this.connectors.federalData.searchDatasets(keywords.join(' '));
      console.log('✅ Federal Data:', results.sources.federal_data.count, 'datasets found');
    } catch (error) {
      console.error('Federal Data failed:', error);
    }
    
    // Parliament
    try {
      results.sources.parliament_bills = await this.connectors.parliament.searchBills(keywords.join(' '));
      console.log('✅ Parliament Bills searched');
    } catch (error) {
      console.error('Parliament failed:', error);
    }
    
    results.completed_at = new Date().toISOString();
    return results;
  }
  
  // Generate monitoring report
  generateReport(results) {
    const report = {
      summary: `Searched ${Object.keys(results.sources).length} free data sources`,
      total_reddit_posts: results.sources.reddit?.reduce((sum, sr) => sum + sr.posts.length, 0) || 0,
      total_datasets: (results.sources.ontario_data?.count || 0) + (results.sources.federal_data?.count || 0),
      keywords: results.keywords,
      timestamp: results.completed_at,
      all_free: true,
      cost: '$0.00'
    };
    
    return report;
  }
}

export const freeAPIMonitor = new FreeAPIMonitor();

export default {
  RedditConnector,
  OntarioOpenDataConnector,
  FederalOpenDataConnector,
  CanLIIConnector,
  OntarioLegislatureConnector,
  ParliamentConnector,
  StatCanConnector,
  FreeAPIMonitor,
  freeAPIMonitor
};
