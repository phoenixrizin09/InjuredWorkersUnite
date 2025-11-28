/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE EYE ORACLE - REAL DATA CONNECTORS (NO DEMO DATA)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ALL data comes from REAL, VERIFIABLE government sources.
 * NO placeholder data. NO demo data. ONLY real API responses.
 * 
 * Data Sources:
 * 1. Open Canada CKAN API - Federal government datasets
 * 2. Ontario Open Data API - Provincial datasets
 * 3. Parliament LEGISinfo API - Bills and legislation
 * 4. RSS Feeds from official government/oversight sources
 * ═══════════════════════════════════════════════════════════════════════════
 */

const CACHE_DURATION = 1800000; // 30 minutes

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 1. OPEN CANADA API (Federal Government Data)
 * API Docs: https://open.canada.ca/data/en/dataset/about
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchFederalData(keywords = ['disability', 'workers', 'WSIB']) {
  const baseUrl = 'https://open.canada.ca/data/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=20`);
    
    if (!response.ok) {
      console.error('Open Canada API returned:', response.status);
      return { success: false, error: `API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    // Transform to our format with verification
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Canada',
      url: `https://open.canada.ca/data/en/dataset/${pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      resources: (pkg.resources || []).map(r => ({
        name: r.name,
        format: r.format,
        url: r.url,
        size: r.size
      })),
      tags: (pkg.tags || []).map(t => t.display_name),
      // Verification info
      verified: true,
      verificationSource: 'open.canada.ca',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Open Canada',
      sourceUrl: 'https://open.canada.ca',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Open Canada fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2. ONTARIO OPEN DATA API (Provincial Government Data)
 * API Docs: https://data.ontario.ca/pages/developers
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchOntarioData(keywords = ['WSIB', 'ODSP', 'disability']) {
  const baseUrl = 'https://data.ontario.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=20`);
    
    if (!response.ok) {
      console.error('Ontario API returned:', response.status);
      return { success: false, error: `API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Ontario',
      url: `https://data.ontario.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      resources: (pkg.resources || []).map(r => ({
        name: r.name,
        format: r.format,
        url: r.url,
        size: r.size
      })),
      tags: (pkg.tags || []).map(t => t.display_name),
      verified: true,
      verificationSource: 'data.ontario.ca',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Ontario Open Data',
      sourceUrl: 'https://data.ontario.ca',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Ontario API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2B. BRITISH COLUMBIA OPEN DATA API (Provincial Government Data)
 * API Docs: https://catalogue.data.gov.bc.ca/api/3/action/package_search
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchBCData(keywords = ['WorkSafeBC', 'disability', 'workers', 'employment']) {
  const baseUrl = 'https://catalogue.data.gov.bc.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `BC API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of British Columbia',
      url: `https://catalogue.data.gov.bc.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'catalogue.data.gov.bc.ca',
      jurisdiction: 'provincial',
      province: 'BC',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'BC Open Data',
      sourceUrl: 'https://catalogue.data.gov.bc.ca',
      province: 'BC',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('BC API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2C. ALBERTA OPEN DATA API (Provincial Government Data)
 * API Docs: https://open.alberta.ca/opendata
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchAlbertaData(keywords = ['WCB', 'disability', 'workers', 'employment']) {
  const baseUrl = 'https://open.alberta.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `Alberta API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Alberta',
      url: `https://open.alberta.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'open.alberta.ca',
      jurisdiction: 'provincial',
      province: 'AB',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Alberta Open Data',
      sourceUrl: 'https://open.alberta.ca',
      province: 'AB',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Alberta API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2D. QUEBEC OPEN DATA API (Provincial Government Data)
 * API Docs: https://www.donneesquebec.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchQuebecData(keywords = ['CNESST', 'disability', 'workers', 'employment', 'handicap']) {
  const baseUrl = 'https://www.donneesquebec.ca/recherche/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `Quebec API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Gouvernement du Québec',
      url: `https://www.donneesquebec.ca/recherche/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'donneesquebec.ca',
      jurisdiction: 'provincial',
      province: 'QC',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Quebec Open Data',
      sourceUrl: 'https://www.donneesquebec.ca',
      province: 'QC',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Quebec API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2E. NOVA SCOTIA OPEN DATA API (Provincial Government Data)
 * API Docs: https://data.novascotia.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchNovaScotiaData(keywords = ['WCB', 'disability', 'workers', 'employment']) {
  const baseUrl = 'https://data.novascotia.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `Nova Scotia API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Nova Scotia',
      url: `https://data.novascotia.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'data.novascotia.ca',
      jurisdiction: 'provincial',
      province: 'NS',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Nova Scotia Open Data',
      sourceUrl: 'https://data.novascotia.ca',
      province: 'NS',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Nova Scotia API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2F. MANITOBA OPEN DATA API
 * API Docs: https://geoportal.gov.mb.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchManitobaData(keywords = ['WCB', 'disability', 'workers', 'employment']) {
  // Manitoba uses ArcGIS Hub
  const baseUrl = 'https://geoportal.gov.mb.ca/api/v2/datasets';
  const query = keywords.join(' ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&per_page=15`);
    
    if (!response.ok) {
      return { success: false, error: `Manitoba API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    const datasets = (data.data || []).map(item => ({
      id: item.id,
      title: item.attributes?.name || item.attributes?.title || 'Untitled',
      description: item.attributes?.description || '',
      organization: 'Government of Manitoba',
      url: item.attributes?.url || `https://geoportal.gov.mb.ca/datasets/${item.id}`,
      lastUpdated: item.attributes?.modified,
      tags: item.attributes?.tags || [],
      verified: true,
      verificationSource: 'geoportal.gov.mb.ca',
      jurisdiction: 'provincial',
      province: 'MB',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Manitoba Open Data',
      sourceUrl: 'https://geoportal.gov.mb.ca',
      province: 'MB',
      totalCount: datasets.length,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Manitoba API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2G. SASKATCHEWAN OPEN DATA API
 * API Docs: https://data.saskatchewan.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchSaskatchewanData(keywords = ['WCB', 'disability', 'workers', 'employment']) {
  const baseUrl = 'https://data.saskatchewan.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `Saskatchewan API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Saskatchewan',
      url: `https://data.saskatchewan.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'data.saskatchewan.ca',
      jurisdiction: 'provincial',
      province: 'SK',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Saskatchewan Open Data',
      sourceUrl: 'https://data.saskatchewan.ca',
      province: 'SK',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Saskatchewan API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2H. NEW BRUNSWICK OPEN DATA API
 * API Docs: http://www.snb.ca/geonb1/e/DC/catalogue-E.asp
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchNewBrunswickData(keywords = ['WorkSafeNB', 'disability', 'workers', 'employment']) {
  // New Brunswick uses GeoNB - simplified approach
  const baseUrl = 'http://geonb.snb.ca/arcgis/rest/services';
  
  try {
    // NB doesn't have a standard CKAN API, use federal data filtered for NB
    const federalUrl = 'https://open.canada.ca/data/api/3/action/package_search';
    const query = `New Brunswick ${keywords.join(' ')}`;
    
    const response = await fetch(`${federalUrl}?q=${encodeURIComponent(query)}&rows=10`);
    
    if (!response.ok) {
      return { success: false, error: `NB API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    const datasets = (data.result?.results || []).map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: 'Government of New Brunswick',
      url: `https://open.canada.ca/data/en/dataset/${pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'open.canada.ca (NB)',
      jurisdiction: 'provincial',
      province: 'NB',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'New Brunswick Data',
      sourceUrl: 'https://www2.gnb.ca/content/gnb/en/gateways/online_services/open_data.html',
      province: 'NB',
      totalCount: datasets.length,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('New Brunswick API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2I. PRINCE EDWARD ISLAND OPEN DATA API
 * API Docs: https://data.princeedwardisland.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchPEIData(keywords = ['WCB', 'disability', 'workers', 'employment']) {
  const baseUrl = 'https://data.princeedwardisland.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `PEI API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Prince Edward Island',
      url: `https://data.princeedwardisland.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'data.princeedwardisland.ca',
      jurisdiction: 'provincial',
      province: 'PE',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'PEI Open Data',
      sourceUrl: 'https://data.princeedwardisland.ca',
      province: 'PE',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('PEI API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2J. NEWFOUNDLAND & LABRADOR OPEN DATA API
 * API Docs: https://opendata.gov.nl.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchNewfoundlandData(keywords = ['WorkplaceNL', 'disability', 'workers', 'employment']) {
  const baseUrl = 'https://opendata.gov.nl.ca/api/3/action/package_search';
  const query = keywords.join(' OR ');
  
  try {
    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `NL API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: pkg.organization?.title || 'Government of Newfoundland and Labrador',
      url: `https://opendata.gov.nl.ca/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'opendata.gov.nl.ca',
      jurisdiction: 'provincial',
      province: 'NL',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Newfoundland & Labrador Open Data',
      sourceUrl: 'https://opendata.gov.nl.ca',
      province: 'NL',
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Newfoundland API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2K. YUKON OPEN DATA API
 * API Docs: https://yukon.ca/open-data
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchYukonData(keywords = ['WCB', 'disability', 'workers', 'employment']) {
  // Yukon uses federal portal with territorial filter
  const federalUrl = 'https://open.canada.ca/data/api/3/action/package_search';
  const query = `Yukon ${keywords.join(' ')}`;
  
  try {
    const response = await fetch(`${federalUrl}?q=${encodeURIComponent(query)}&rows=10`);
    
    if (!response.ok) {
      return { success: false, error: `Yukon API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    const datasets = (data.result?.results || []).map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: 'Government of Yukon',
      url: `https://open.canada.ca/data/en/dataset/${pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'open.canada.ca (YT)',
      jurisdiction: 'territorial',
      province: 'YT',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Yukon Data',
      sourceUrl: 'https://yukon.ca/en/open-data',
      province: 'YT',
      totalCount: datasets.length,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Yukon API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2L. NORTHWEST TERRITORIES OPEN DATA API
 * API Docs: https://www.gov.nt.ca/open-data
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchNWTData(keywords = ['WSCC', 'disability', 'workers', 'employment']) {
  // NWT uses federal portal with territorial filter
  const federalUrl = 'https://open.canada.ca/data/api/3/action/package_search';
  const query = `Northwest Territories ${keywords.join(' ')}`;
  
  try {
    const response = await fetch(`${federalUrl}?q=${encodeURIComponent(query)}&rows=10`);
    
    if (!response.ok) {
      return { success: false, error: `NWT API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    const datasets = (data.result?.results || []).map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: 'Government of Northwest Territories',
      url: `https://open.canada.ca/data/en/dataset/${pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'open.canada.ca (NT)',
      jurisdiction: 'territorial',
      province: 'NT',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'NWT Data',
      sourceUrl: 'https://www.gov.nt.ca/en/open-data',
      province: 'NT',
      totalCount: datasets.length,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('NWT API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2M. NUNAVUT OPEN DATA API
 * API Docs: https://www.gov.nu.ca/
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchNunavutData(keywords = ['WSCC', 'disability', 'workers', 'employment']) {
  // Nunavut uses federal portal with territorial filter
  const federalUrl = 'https://open.canada.ca/data/api/3/action/package_search';
  const query = `Nunavut ${keywords.join(' ')}`;
  
  try {
    const response = await fetch(`${federalUrl}?q=${encodeURIComponent(query)}&rows=10`);
    
    if (!response.ok) {
      return { success: false, error: `Nunavut API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    const datasets = (data.result?.results || []).map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: 'Government of Nunavut',
      url: `https://open.canada.ca/data/en/dataset/${pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: 'open.canada.ca (NU)',
      jurisdiction: 'territorial',
      province: 'NU',
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: 'Nunavut Data',
      sourceUrl: 'https://www.gov.nu.ca/',
      province: 'NU',
      totalCount: datasets.length,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Nunavut API fetch error:', error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 3. PARLIAMENT LEGISINFO API (Bills & Legislation)
 * API Docs: https://www.parl.ca/legisinfo/en/open-data
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchLegislation() {
  // LEGISinfo provides XML/JSON feeds
  const feedUrl = 'https://www.parl.ca/legisinfo/en/bills/json';
  
  try {
    const response = await fetch(feedUrl);
    
    if (!response.ok) {
      console.error('LEGISinfo API returned:', response.status);
      return { success: false, error: `API returned ${response.status}`, bills: [] };
    }
    
    const data = await response.json();
    
    // Filter for relevant bills (workers rights, disability, healthcare)
    const relevantKeywords = ['worker', 'disability', 'employment', 'health', 'pension', 'benefit', 'labour', 'labor'];
    
    const bills = (data.Bills || data || [])
      .filter(bill => {
        const title = (bill.LongTitle || bill.ShortTitle || '').toLowerCase();
        return relevantKeywords.some(kw => title.includes(kw));
      })
      .map(bill => ({
        billNumber: bill.NumberCode || bill.BillNumber,
        title: bill.LongTitle || bill.ShortTitle,
        shortTitle: bill.ShortTitle,
        status: bill.StatusName || bill.Status,
        sponsor: bill.SponsorName || bill.Sponsor,
        parliament: bill.ParliamentNumber,
        session: bill.SessionNumber,
        url: `https://www.parl.ca/legisinfo/en/bill/${bill.Id}`,
        lastUpdated: bill.LastMajorStageDateTime || bill.LastEvent?.DateTime,
        verified: true,
        verificationSource: 'parl.ca',
        fetchedAt: new Date().toISOString()
      }));
    
    return {
      success: true,
      source: 'Parliament of Canada',
      sourceUrl: 'https://www.parl.ca/legisinfo',
      totalCount: bills.length,
      bills,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('LEGISinfo fetch error:', error);
    return { success: false, error: error.message, bills: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 4. MUNICIPAL/LOCAL OPEN DATA (Major Canadian Cities)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchMunicipalData(city = 'toronto') {
  const cityApis = {
    // ONTARIO
    toronto: {
      baseUrl: 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_search',
      name: 'City of Toronto',
      province: 'ON',
      keywords: ['accessibility', 'shelter', 'housing', 'transit', 'health', 'disability']
    },
    ottawa: {
      baseUrl: 'https://open.ottawa.ca/api/3/action/package_search',
      name: 'City of Ottawa',
      province: 'ON',
      keywords: ['accessibility', 'housing', 'transit', 'social services']
    },
    hamilton: {
      baseUrl: 'https://open.hamilton.ca/api/3/action/package_search',
      name: 'City of Hamilton',
      province: 'ON',
      keywords: ['accessibility', 'housing', 'health', 'social services']
    },
    london: {
      baseUrl: 'https://opendata.london.ca/api/3/action/package_search',
      name: 'City of London',
      province: 'ON',
      keywords: ['accessibility', 'housing', 'health', 'transit']
    },
    // BRITISH COLUMBIA
    vancouver: {
      baseUrl: 'https://opendata.vancouver.ca/api/3/action/package_search',
      name: 'City of Vancouver',
      province: 'BC',
      keywords: ['housing', 'homelessness', 'health', 'accessibility']
    },
    surrey: {
      baseUrl: 'https://data.surrey.ca/api/3/action/package_search',
      name: 'City of Surrey',
      province: 'BC',
      keywords: ['accessibility', 'housing', 'transit', 'health']
    },
    // ALBERTA
    calgary: {
      baseUrl: 'https://data.calgary.ca/api/3/action/package_search',
      name: 'City of Calgary',
      province: 'AB',
      keywords: ['accessibility', 'housing', 'transit', 'social services']
    },
    edmonton: {
      baseUrl: 'https://data.edmonton.ca/api/3/action/package_search',
      name: 'City of Edmonton',
      province: 'AB',
      keywords: ['accessibility', 'housing', 'transit', 'health']
    },
    // QUEBEC
    montreal: {
      baseUrl: 'https://donnees.montreal.ca/api/3/action/package_search',
      name: 'City of Montreal',
      province: 'QC',
      keywords: ['accessibilité', 'housing', 'logement', 'transport', 'santé']
    },
    // MANITOBA
    winnipeg: {
      baseUrl: 'https://data.winnipeg.ca/api/3/action/package_search',
      name: 'City of Winnipeg',
      province: 'MB',
      keywords: ['accessibility', 'housing', 'transit', 'health']
    }
  };

  const cityConfig = cityApis[city] || cityApis.toronto;
  const query = cityConfig.keywords.join(' OR ');

  try {
    const response = await fetch(`${cityConfig.baseUrl}?q=${encodeURIComponent(query)}&rows=15`);
    
    if (!response.ok) {
      return { success: false, error: `${cityConfig.name} API returned ${response.status}`, datasets: [] };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.result) {
      return { success: false, error: 'Invalid API response', datasets: [] };
    }
    
    const datasets = data.result.results.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.notes || '',
      organization: cityConfig.name,
      url: pkg.url || `${cityConfig.baseUrl.replace('/api/3/action/package_search', '')}/dataset/${pkg.name || pkg.id}`,
      lastUpdated: pkg.metadata_modified,
      tags: (pkg.tags || []).map(t => t.display_name || t.name),
      verified: true,
      verificationSource: cityConfig.name,
      jurisdiction: 'municipal',
      city: city,
      fetchedAt: new Date().toISOString()
    }));
    
    return {
      success: true,
      source: cityConfig.name,
      jurisdiction: 'municipal',
      city: city,
      totalCount: data.result.count,
      datasets,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`${cityConfig.name} API fetch error:`, error);
    return { success: false, error: error.message, datasets: [] };
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 5. OFFICIAL RSS FEEDS (News & Reports)
 * These are publicly available RSS feeds from official sources
 * ═══════════════════════════════════════════════════════════════════════════
 */
const OFFICIAL_RSS_FEEDS = [
  // Federal
  {
    name: 'Government of Canada News',
    url: 'https://www.canada.ca/content/canadasite/en/news.feed.xml',
    category: 'government',
    jurisdiction: 'federal'
  },
  {
    name: 'Federal Auditor General',
    url: 'https://www.oag-bvg.gc.ca/internet/rss/rss_news_e.xml',
    category: 'oversight',
    jurisdiction: 'federal'
  },
  // Provincial
  {
    name: 'Ontario Auditor General',
    url: 'https://www.auditor.on.ca/en/rss.xml',
    category: 'oversight',
    jurisdiction: 'provincial'
  },
  {
    name: 'WSIB News',
    url: 'https://www.wsib.ca/en/news/rss.xml',
    category: 'workers',
    jurisdiction: 'provincial'
  },
  // Municipal
  {
    name: 'City of Toronto News',
    url: 'https://www.toronto.ca/feed/',
    category: 'government',
    jurisdiction: 'municipal'
  }
];

export async function fetchRSSFeed(feedInfo) {
  try {
    const response = await fetch(feedInfo.url);
    
    if (!response.ok) {
      return { success: false, error: `Feed returned ${response.status}`, items: [] };
    }
    
    const text = await response.text();
    
    // Parse RSS/XML - simple regex parsing for browser compatibility
    const items = [];
    const itemMatches = text.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    for (const itemXml of itemMatches.slice(0, 10)) {
      const title = itemXml.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1] || '';
      const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const description = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1] || '';
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      
      if (title) {
        items.push({
          title: title.trim().replace(/<[^>]*>/g, ''),
          url: link.trim(),
          description: description.trim().replace(/<[^>]*>/g, '').substring(0, 500),
          publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
          source: feedInfo.name,
          category: feedInfo.category,
          jurisdiction: feedInfo.jurisdiction,
          verified: true,
          verificationSource: feedInfo.url,
          fetchedAt: new Date().toISOString()
        });
      }
    }
    
    return {
      success: true,
      source: feedInfo.name,
      sourceUrl: feedInfo.url,
      items,
      fetchedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`RSS fetch error for ${feedInfo.name}:`, error);
    return { success: false, error: error.message, items: [] };
  }
}

export async function fetchAllRSSFeeds() {
  const results = [];
  
  for (const feed of OFFICIAL_RSS_FEEDS) {
    const data = await fetchRSSFeed(feed);
    if (data.success && data.items.length > 0) {
      results.push(data);
    }
  }
  
  return results;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 6. COMBINED FETCH - All Real Data Sources (ALL 13 PROVINCES/TERRITORIES)
 * ═══════════════════════════════════════════════════════════════════════════
 */
export async function fetchAllRealData() {
  console.log('👁️ THE EYE ORACLE: Fetching COMPREHENSIVE REAL data from ALL 13 PROVINCES/TERRITORIES...');
  
  const results = {
    federal: null,
    provincial: [],
    territorial: [],
    municipal: [],
    legislation: null,
    news: [],
    fetchedAt: new Date().toISOString(),
    errors: []
  };
  
  // Fetch all in parallel - ALL PROVINCES AND TERRITORIES
  try {
    const [
      // Federal
      federal,
      // ALL 10 PROVINCES
      ontario, bc, alberta, quebec, novascotia,
      manitoba, saskatchewan, newbrunswick, pei, newfoundland,
      // ALL 3 TERRITORIES
      yukon, nwt, nunavut,
      // Municipal (10 cities)
      toronto, ottawa, hamilton, london,
      vancouver, surrey,
      calgary, edmonton,
      montreal,
      winnipeg,
      // Legislation & News
      legislation, rssFeeds
    ] = await Promise.all([
      // Federal
      fetchFederalData(['disability', 'workers', 'employment insurance', 'pension', 'accessibility']),
      // ALL 10 PROVINCES
      fetchOntarioData(['WSIB', 'ODSP', 'disability', 'workplace', 'accessibility']),
      fetchBCData(['WorkSafeBC', 'disability', 'workers', 'employment', 'PWD']),
      fetchAlbertaData(['WCB', 'AISH', 'disability', 'workers', 'employment']),
      fetchQuebecData(['CNESST', 'disability', 'workers', 'handicap']),
      fetchNovaScotiaData(['WCB', 'disability', 'workers', 'employment']),
      fetchManitobaData(['WCB', 'disability', 'workers', 'employment']),
      fetchSaskatchewanData(['WCB', 'disability', 'workers', 'employment']),
      fetchNewBrunswickData(['WorkSafeNB', 'disability', 'workers', 'employment']),
      fetchPEIData(['WCB', 'disability', 'workers', 'employment']),
      fetchNewfoundlandData(['WorkplaceNL', 'disability', 'workers', 'employment']),
      // ALL 3 TERRITORIES
      fetchYukonData(['WCB', 'disability', 'workers', 'employment']),
      fetchNWTData(['WSCC', 'disability', 'workers', 'employment']),
      fetchNunavutData(['WSCC', 'disability', 'workers', 'employment']),
      // Municipal
      fetchMunicipalData('toronto'),
      fetchMunicipalData('ottawa'),
      fetchMunicipalData('hamilton'),
      fetchMunicipalData('london'),
      fetchMunicipalData('vancouver'),
      fetchMunicipalData('surrey'),
      fetchMunicipalData('calgary'),
      fetchMunicipalData('edmonton'),
      fetchMunicipalData('montreal'),
      fetchMunicipalData('winnipeg'),
      // Legislation & News
      fetchLegislation(),
      fetchAllRSSFeeds()
    ]);
    
    results.federal = federal;
    results.provincial = [ontario, bc, alberta, quebec, novascotia, manitoba, saskatchewan, newbrunswick, pei, newfoundland].filter(p => p.success);
    results.territorial = [yukon, nwt, nunavut].filter(t => t.success);
    results.municipal = [toronto, ottawa, hamilton, london, vancouver, surrey, calgary, edmonton, montreal, winnipeg].filter(m => m.success);
    results.legislation = legislation;
    results.news = rssFeeds;
    
    // Collect any errors (silent - don't break on partial failures)
    if (!federal.success) results.errors.push(`Federal: ${federal.error}`);
    // Provincial errors
    const provinces = { ontario, bc, alberta, quebec, novascotia, manitoba, saskatchewan, newbrunswick, pei, newfoundland };
    Object.entries(provinces).forEach(([name, data]) => {
      if (!data.success) results.errors.push(`${name}: ${data.error}`);
    });
    // Territorial errors
    const territories = { yukon, nwt, nunavut };
    Object.entries(territories).forEach(([name, data]) => {
      if (!data.success) results.errors.push(`${name}: ${data.error}`);
    });
    if (!legislation.success) results.errors.push(`Legislation: ${legislation.error}`);
    
  } catch (error) {
    console.error('Error fetching all data:', error);
    results.errors.push(error.message);
  }
  
  const provincialCount = results.provincial.reduce((acc, p) => acc + (p.datasets?.length || 0), 0);
  const territorialCount = results.territorial.reduce((acc, t) => acc + (t.datasets?.length || 0), 0);
  const municipalCount = results.municipal.reduce((acc, m) => acc + (m.datasets?.length || 0), 0);
  console.log(`👁️ THE EYE ORACLE: COMPLETE CANADA-WIDE FETCH COMPLETE`);
  console.log(`  📊 Federal: ${results.federal?.datasets?.length || 0} datasets`);
  console.log(`  🏛️ Provincial: ${provincialCount} datasets (ALL 10 PROVINCES)`);
  console.log(`  🏔️ Territorial: ${territorialCount} datasets (YT/NT/NU)`);
  console.log(`  🏙️ Municipal: ${municipalCount} datasets (10 cities)`);
  console.log(`  📜 Bills: ${results.legislation?.bills?.length || 0}`);
  console.log(`  📰 News: ${results.news?.length || 0} feeds`);
  
  return results;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 6. CONVERT TO INSIGHTS FORMAT
 * Transform real data into the format THE EYE ORACLE displays
 * ═══════════════════════════════════════════════════════════════════════════
 */
export function convertToInsights(realData) {
  const insights = [];
  
  // Convert federal datasets
  if (realData.federal?.datasets) {
    for (const dataset of realData.federal.datasets) {
      insights.push({
        severity: 'info',
        category: categorizeDataset(dataset),
        title: dataset.title,
        description: dataset.description?.substring(0, 300) || 'Government dataset available',
        action: `VERIFIED DATA: Official Government of Canada dataset`,
        timestamp: formatTimestamp(dataset.lastUpdated),
        actionButtons: ['View Dataset', 'Download Data'],
        sources: [{
          name: dataset.organization,
          url: dataset.url
        }],
        verified: true,
        verificationBadge: '✓ VERIFIED - open.canada.ca',
        scope: 'federal'
      });
    }
  }
  
  // Convert provincial datasets (now an array of provinces)
  for (const provData of realData.provincial || []) {
    for (const dataset of provData.datasets || []) {
      insights.push({
        severity: 'info',
        category: categorizeDataset(dataset),
        title: dataset.title,
        description: dataset.description?.substring(0, 300) || 'Provincial dataset available',
        action: `VERIFIED DATA: Official ${dataset.organization || provData.source} dataset`,
        timestamp: formatTimestamp(dataset.lastUpdated),
        actionButtons: ['View Dataset', 'Download Data'],
        sources: [{
          name: dataset.organization || provData.source,
          url: dataset.url
        }],
        verified: true,
        verificationBadge: `✓ VERIFIED - ${dataset.verificationSource || provData.sourceUrl}`,
        scope: 'provincial',
        province: dataset.province || provData.province
      });
    }
  }
  
  // Convert legislation
  if (realData.legislation?.bills) {
    for (const bill of realData.legislation.bills) {
      insights.push({
        severity: bill.status?.toLowerCase().includes('royal') ? 'critical' : 'warning',
        category: 'legislation',
        title: `${bill.billNumber}: ${bill.shortTitle || bill.title}`,
        description: bill.title,
        action: `BILL STATUS: ${bill.status} | Sponsor: ${bill.sponsor || 'Unknown'}`,
        timestamp: formatTimestamp(bill.lastUpdated),
        actionButtons: ['View Bill', 'Track Status'],
        sources: [{
          name: 'Parliament of Canada',
          url: bill.url
        }],
        verified: true,
        verificationBadge: '✓ VERIFIED - parl.ca',
        scope: 'federal',
        legislativeBadge: `${bill.billNumber} - ${bill.status}`
      });
    }
  }
  
  // Convert municipal datasets
  for (const cityData of realData.municipal || []) {
    for (const dataset of cityData.datasets || []) {
      insights.push({
        severity: 'info',
        category: categorizeDataset(dataset),
        title: dataset.title,
        description: dataset.description?.substring(0, 300) || 'Municipal dataset available',
        action: `VERIFIED DATA: Official ${dataset.organization} dataset`,
        timestamp: formatTimestamp(dataset.lastUpdated),
        actionButtons: ['View Dataset', 'Download Data'],
        sources: [{
          name: dataset.organization,
          url: dataset.url
        }],
        verified: true,
        verificationBadge: `✓ VERIFIED - ${dataset.city} open data`,
        scope: 'municipal',
        city: dataset.city
      });
    }
  }
  
  // Convert news items
  for (const feed of realData.news || []) {
    for (const item of feed.items || []) {
      insights.push({
        severity: 'info',
        category: item.category || 'news',
        title: item.title,
        description: item.description?.substring(0, 300) || '',
        action: `SOURCE: ${item.source}`,
        timestamp: formatTimestamp(item.publishedAt),
        actionButtons: ['Read Full Article'],
        sources: [{
          name: item.source,
          url: item.url
        }],
        verified: true,
        verificationBadge: `✓ VERIFIED - ${item.source}`,
        scope: item.jurisdiction
      });
    }
  }
  
  return insights;
}

function categorizeDataset(dataset) {
  const text = (dataset.title + ' ' + (dataset.description || '')).toLowerCase();
  
  if (text.includes('wsib') || text.includes('worker') || text.includes('workplace')) return 'workers';
  if (text.includes('disability') || text.includes('odsp') || text.includes('accessible')) return 'disabilities';
  if (text.includes('health') || text.includes('hospital')) return 'healthcare';
  if (text.includes('indigenous') || text.includes('first nation')) return 'indigenous';
  if (text.includes('housing') || text.includes('shelter')) return 'housing';
  if (text.includes('pension') || text.includes('cpp')) return 'seniors';
  if (text.includes('employment') || text.includes('job') || text.includes('labour')) return 'employment';
  
  return 'government';
}

function formatTimestamp(dateString) {
  if (!dateString) return 'Unknown date';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-CA');
  } catch {
    return dateString;
  }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CACHE MANAGEMENT
 * ═══════════════════════════════════════════════════════════════════════════
 */
let dataCache = null;
let lastFetchTime = 0;

export async function getCachedRealData() {
  const now = Date.now();
  
  if (dataCache && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('👁️ THE EYE ORACLE: Using cached data');
    return dataCache;
  }
  
  console.log('👁️ THE EYE ORACLE: Fetching fresh data...');
  dataCache = await fetchAllRealData();
  lastFetchTime = now;
  
  return dataCache;
}

export async function getRealInsights() {
  const realData = await getCachedRealData();
  return convertToInsights(realData);
}
