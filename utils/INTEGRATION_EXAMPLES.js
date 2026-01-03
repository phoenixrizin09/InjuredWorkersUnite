/**
 * ═════════════════════════════════════════════════════════════════════════════
 * INTEGRATION EXAMPLES - Performance Optimization in Existing Code
 * ═════════════════════════════════════════════════════════════════════════════
 * 
 * Copy-paste examples to integrate performance optimizations into existing code
 */

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Enhance API Response Caching (in api/core.js)
// ═══════════════════════════════════════════════════════════════════════════════

const { getCacheInstance } = require('../utils/performance-cache');

// Initialize cache at module load
const cache = getCacheInstance({ ttl: 5 * 60 * 1000 });

// BEFORE (without caching):
/*
app.get('/api/cases', async (req, res) => {
  try {
    const cases = db.getCases(req.query.filters);
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

// AFTER (with caching):
app.get('/api/cases', async (req, res) => {
  try {
    const cacheKey = `cases:${JSON.stringify(req.query.filters)}`;
    const cases = await cache.get(cacheKey, () => 
      db.getCases(req.query.filters)
    );
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add cache invalidation when data changes
app.post('/api/cases', async (req, res) => {
  try {
    const newCase = await db.createCase(req.body);
    cache.invalidatePattern('cases:*'); // Clear all cases caches
    res.json(newCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Database Query Optimization (in utils/db.js)
// ═══════════════════════════════════════════════════════════════════════════════

const { DatabaseOptimizer } = require('./db-optimizer');

let dbOptimizer = null;

// Initialize on startup
function initializeOptimizer() {
  dbOptimizer = new DatabaseOptimizer(module.exports, {
    cacheResults: true,
    enableIndexing: true
  });
  
  // Build indexes on startup
  dbOptimizer.buildIndexes('cases', ['status', 'category', 'severity']);
  dbOptimizer.buildIndexes('evidence', ['case_id', 'type']);
  dbOptimizer.buildIndexes('articles', ['status', 'published']);
  
  console.log('✅ Database indexes built');
}

// BEFORE (full table scan):
/*
function getCases(filters = {}) {
  const cases = readJsonFile(CASES_FILE) || [];
  return cases.filter(c => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.category && c.category !== filters.category) return false;
    return true;
  });
}
*/

// AFTER (with indexing):
async function getCasesOptimized(filters = {}) {
  if (!dbOptimizer) {
    // Fallback if not initialized
    return getCases(filters);
  }
  
  try {
    return await dbOptimizer.queryOptimized('cases', filters);
  } catch (err) {
    console.error('Optimization query failed, falling back:', err.message);
    return getCases(filters);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Rate Limiting Outbound API Calls
// ═══════════════════════════════════════════════════════════════════════════════

const { APIRateLimiter } = require('./api-rate-limiter');
const fetch = require('node-fetch');

const rateLimiter = new APIRateLimiter({
  rps: 10,        // 10 requests per second
  burstSize: 20,  // Allow bursts to 20
  maxRetries: 3
});

// BEFORE (no rate limiting, can exceed API limits):
/*
async function fetchExternalData(url) {
  const response = await fetch(url);
  return response.json();
}
*/

// AFTER (with rate limiting):
async function fetchExternalDataRateLimited(url, options = {}) {
  // Mock implementation of rate-limited fetch
  // Replace with actual HTTP client in production
  return rateLimiter.executeRequest(url, options);
}

// Batch multiple requests efficiently
async function fetchMultipleDataSources(urls) {
  const requests = urls.map(url => ({
    url: url,
    options: { method: 'GET' }
  }));
  
  return rateLimiter.batchRequest('https://api.example.com', requests);
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Add Performance Monitoring to Scripts (in scripts/generate-*.js)
// ═══════════════════════════════════════════════════════════════════════════════

const { PerformanceMonitor } = require('../utils/performance-monitor');

const monitor = new PerformanceMonitor({
  slowThresholdMs: 1000, // Alert if operation takes > 1 second
  enableAutoLogging: true,
  logInterval: 3600000 // Log every hour
});

// BEFORE (no monitoring):
/*
async function generateDailyReport() {
  const cases = loadCases();
  const analysis = analyzeIssues(cases);
  const content = generateContent(analysis);
  return publishContent(content);
}
*/

// AFTER (with performance monitoring):
async function generateDailyReportMonitored() {
  const cases = await monitor.profileAsync('loadCases', loadCases);
  const analysis = await monitor.profileAsync('analyzeIssues', 
    () => analyzeIssues(cases));
  const content = await monitor.profileAsync('generateContent', 
    () => generateContent(analysis));
  const result = await monitor.profileAsync('publishContent', 
    () => publishContent(content));
  
  return result;
}

// Track memory during large operations
async function generateDailyReportWithMemoryTracking() {
  monitor.snapshotMemory('report-start');
  
  const cases = await monitor.profileAsync('loadCases', loadCases);
  monitor.snapshotMemory('after-load');
  
  const analysis = await monitor.profileAsync('analyzeIssues', 
    () => analyzeIssues(cases));
  monitor.snapshotMemory('after-analysis');
  
  const content = await monitor.profileAsync('generateContent', 
    () => generateContent(analysis));
  monitor.snapshotMemory('after-generation');
  
  // Print report and save metrics
  monitor.printReport();
  await monitor.logMetrics();
  
  return content;
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Data Processing Optimization (in utils/real-data-generator.js)
// ═══════════════════════════════════════════════════════════════════════════════

const { DataProcessor } = require('./data-processor');

const processor = new DataProcessor({
  chunkSize: 1000,
  regexCacheSize: 100
});

// BEFORE (slow deduplication):
/*
function deduplicateIssues(issues) {
  const seen = [];
  return issues.filter(issue => {
    if (seen.find(s => s.id === issue.id)) return false;
    seen.push(issue);
    return true;
  });
}
*/

// AFTER (fast deduplication):
function deduplicateIssuesOptimized(issues) {
  return processor.deduplicate(issues, 'id', 'set');
}

// Group and organize data efficiently
function organizeIssuesByCategory(issues) {
  return processor.groupBy(issues, 'category');
}

// Optimize regex operations with caching
function findJusticeTerms(text) {
  const pattern = /\\b(justice|rights|charter|violation)\\b/gi;
  return processor.regex.match(pattern, text);
}

// Process large datasets in streams
async function processLargeIssueDataset(issues) {
  const transformations = [
    // Clean and normalize
    issue => ({
      ...issue,
      title: processor.optimizeString(issue.title),
      description: processor.optimizeString(issue.description)
    }),
    // Extract terms
    async issue => ({
      ...issue,
      keyTerms: processor.regex.match(/\\b([a-z]+)\\b/gi, issue.description)
    })
  ];
  
  return processor.streamPipeline(issues, transformations);
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Full Integration - Optimization Engine
// ═══════════════════════════════════════════════════════════════════════════════

const { OptimizationEngine } = require('./optimization-engine');

let engine = null;

// Initialize on application startup
async function initializeOptimizationEngine(db) {
  engine = new OptimizationEngine({
    enableCache: true,
    enableMonitoring: true,
    enableRateLimiting: true,
    cacheTTL: 5 * 60 * 1000,
    slowThresholdMs: 1000
  });
  
  await engine.initialize(db);
  console.log('✅ Optimization engine initialized');
  
  return engine;
}

// Use in main API handler
async function handleAPIRequest(req, res, operation) {
  try {
    const result = await engine.executeOptimized(operation.name, 
      async () => operation.handler(req)
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Example API endpoint using optimization engine
app.get('/api/optimized/cases', async (req, res) => {
  await handleAPIRequest(req, res, {
    name: 'get-cases',
    handler: () => engine.cachedExecute('cases', () => db.getCases())
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Error Handling and Graceful Degradation
// ═══════════════════════════════════════════════════════════════════════════════

// Safe wrapper for cached operations
async function safeCache(key, fn, ttl = null) {
  try {
    return await cache.get(key, fn, ttl);
  } catch (err) {
    console.error(`Cache error for ${key}, executing without cache:`, err.message);
    // Fallback to uncached execution
    return fn();
  }
}

// Safe database query with fallback
async function safeDBQuery(operation) {
  try {
    // Try optimized query
    if (dbOptimizer) {
      return await dbOptimizer.queryOptimized(operation.table, operation.filters);
    }
  } catch (err) {
    console.warn('Optimized query failed, using fallback:', err.message);
  }
  
  // Fallback to unoptimized query
  return operation.fallback();
}

// Safe rate-limited API call
async function safeAPICall(url, options = {}) {
  try {
    return await rateLimiter.executeRequest(url, options);
  } catch (err) {
    console.error(`Rate-limited API call failed for ${url}:`, err.message);
    // In production, implement circuit breaker or queue for retry
    throw err;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Shutdown and Cleanup
// ═══════════════════════════════════════════════════════════════════════════════

// Call on application shutdown
async function shutdownOptimizations() {
  console.log('🛑 Shutting down performance optimizations...');
  
  try {
    // Save final metrics
    if (monitor) {
      await monitor.logMetrics();
      monitor.destroy();
    }
    
    // Cleanup engine
    if (engine) {
      await engine.shutdown();
    }
    
    // Clear caches if needed
    if (cache) {
      cache.clear();
      cache.destroy();
    }
    
    console.log('✅ Performance optimizations shut down cleanly');
  } catch (err) {
    console.error('Error during shutdown:', err.message);
  }
}

// Register shutdown handler
process.on('SIGTERM', shutdownOptimizations);
process.on('SIGINT', shutdownOptimizations);

module.exports = {
  initializeOptimizationEngine,
  safeCache,
  safeDBQuery,
  safeAPICall,
  shutdownOptimizations,
  getCacheInstance,
  getMonitorInstance: () => monitor,
  getEngine: () => engine
};
