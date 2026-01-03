/**
 * ═════════════════════════════════════════════════════════════════════════════
 * PERFORMANCE OPTIMIZATION INTEGRATION
 * ═════════════════════════════════════════════════════════════════════════════
 * 
 * This module integrates all optimization utilities and provides:
 * - Unified performance interface
 * - Automatic metrics collection
 * - Performance improvement tracking
 * - Real-time monitoring
 * 
 * USAGE:
 *   const { OptimizationEngine } = require('./optimization-engine');
 *   const engine = new OptimizationEngine();
 *   
 *   // Enable optimizations
 *   await engine.initialize();
 *   
 *   // Use cache
 *   const data = await engine.cache.get('key', () => expensiveOp());
 *   
 *   // Get reports
 *   engine.printOptimizationReport();
 */

const { PerformanceCache, getCacheInstance } = require('./performance-cache');
const { DatabaseOptimizer } = require('./db-optimizer');
const { APIRateLimiter } = require('./api-rate-limiter');
const { PerformanceMonitor, getMonitorInstance } = require('./performance-monitor');
const { DataProcessor } = require('./data-processor');

class OptimizationEngine {
  constructor(options = {}) {
    this.options = {
      enableCache: options.enableCache !== false,
      enableMonitoring: options.enableMonitoring !== false,
      enableRateLimiting: options.enableRateLimiting !== false,
      cacheDir: options.cacheDir,
      logDir: options.logDir,
      ...options
    };

    // Initialize components
    this.cache = null;
    this.monitor = null;
    this.rateLimiter = null;
    this.dataProcessor = new DataProcessor(options.dataProcessorOptions);
    this.dbOptimizer = null;

    this.startTime = Date.now();
    this.optimizationMetrics = {
      cacheHits: 0,
      apiCallsReducedByRateLimit: 0,
      apiCallsReducedByBatching: 0,
      queryTimeReduced: 0,
      memoryOptimized: 0
    };
  }

  /**
   * Initialize the optimization engine
   */
  async initialize(db = null) {
    try {
      // Initialize cache
      if (this.options.enableCache) {
        this.cache = getCacheInstance({
          cacheDir: this.options.cacheDir,
          ttl: this.options.cacheTTL
        });
        console.log('✅ Cache initialized');
      }

      // Initialize monitoring
      if (this.options.enableMonitoring) {
        this.monitor = getMonitorInstance({
          logDir: this.options.logDir,
          slowThresholdMs: this.options.slowThresholdMs || 1000
        });
        console.log('✅ Performance monitoring initialized');
      }

      // Initialize rate limiting
      if (this.options.enableRateLimiting) {
        this.rateLimiter = new APIRateLimiter({
          rps: this.options.rps || 10,
          burstSize: this.options.burstSize || 20
        });
        console.log('✅ API rate limiting initialized');
      }

      // Initialize database optimizer
      if (db) {
        this.dbOptimizer = new DatabaseOptimizer(db, {
          cacheResults: true,
          enableIndexing: true
        });
        console.log('✅ Database optimizer initialized');
      }

      return true;
    } catch (err) {
      console.error('Error initializing optimization engine:', err.message);
      throw err;
    }
  }

  /**
   * Execute function with full optimization stack
   */
  async executeOptimized(name, fn, options = {}) {
    const startTime = Date.now();

    try {
      // Profile execution
      let result;
      if (this.monitor) {
        result = await this.monitor.profileAsync(name, fn);
      } else {
        result = await fn();
      }

      const elapsed = Date.now() - startTime;
      console.log(`✅ ${name} completed in ${elapsed}ms`);

      return result;
    } catch (err) {
      console.error(`❌ Error executing ${name}:`, err.message);
      throw err;
    }
  }

  /**
   * Cached execution of function
   */
  async cachedExecute(cacheKey, fn, ttl = null) {
    if (!this.cache) {
      return fn();
    }

    return this.cache.get(cacheKey, fn, ttl);
  }

  /**
   * Rate-limited API call
   */
  async rateLimitedAPICall(url, options = {}) {
    if (!this.rateLimiter) {
      throw new Error('Rate limiter not initialized');
    }

    return this.rateLimiter.executeRequest(url, options);
  }

  /**
   * Batch API calls
   */
  async batchAPICall(endpoint, requests = []) {
    if (!this.rateLimiter) {
      throw new Error('Rate limiter not initialized');
    }

    return this.rateLimiter.batchRequest(endpoint, requests);
  }

  /**
   * Optimize data processing
   */
  processData(data, transformations = [], deduplicationKey = null) {
    let result = data;

    // Apply deduplication if requested
    if (deduplicationKey) {
      result = this.dataProcessor.deduplicate(result, deduplicationKey);
    }

    // Apply transformations
    if (transformations.length > 0) {
      result = this.dataProcessor.streamPipeline(result, transformations);
    }

    return result;
  }

  /**
   * Optimize database query
   */
  async optimizedQuery(tableName, filters = {}) {
    if (!this.dbOptimizer) {
      throw new Error('Database optimizer not initialized');
    }

    return this.dbOptimizer.queryOptimized(tableName, filters);
  }

  /**
   * Build database indexes
   */
  async buildIndexes(tableName, fields = []) {
    if (!this.dbOptimizer) {
      throw new Error('Database optimizer not initialized');
    }

    return this.dbOptimizer.buildIndexes(tableName, fields);
  }

  /**
   * Take memory snapshot
   */
  snapshotMemory(label = '') {
    if (!this.monitor) {
      return null;
    }

    return this.monitor.snapshotMemory(label);
  }

  /**
   * Get comprehensive performance report
   */
  getOptimizationReport() {
    const report = {
      timestamp: new Date().toISOString(),
      uptime: (Date.now() - this.startTime) / 1000,
      components: {
        cacheEnabled: !!this.cache,
        monitoringEnabled: !!this.monitor,
        rateLimitingEnabled: !!this.rateLimiter,
        dbOptimizerEnabled: !!this.dbOptimizer
      },
      stats: {}
    };

    // Cache stats
    if (this.cache) {
      report.stats.cache = this.cache.getStats();
    }

    // Monitor stats
    if (this.monitor) {
      report.stats.performance = this.monitor.getPerformanceReport();
    }

    // Rate limiter stats
    if (this.rateLimiter) {
      report.stats.rateLimiting = this.rateLimiter.getStats();
    }

    // DB optimizer stats
    if (this.dbOptimizer) {
      report.stats.database = this.dbOptimizer.getStats();
    }

    // Data processor stats
    report.stats.dataProcessor = this.dataProcessor.getStats();

    // Optimization metrics
    report.optimizationMetrics = this.optimizationMetrics;

    return report;
  }

  /**
   * Print optimization report to console
   */
  printOptimizationReport() {
    const report = this.getOptimizationReport();

    console.log('\n╔═════════════════════════════════════════════════════════════════════════════╗');
    console.log('║               📊 OPTIMIZATION ENGINE PERFORMANCE REPORT                     ║');
    console.log('╚═════════════════════════════════════════════════════════════════════════════╝\n');

    console.log(`⏱️  Uptime: ${report.uptime.toFixed(2)}s`);
    console.log(`📅 Timestamp: ${report.timestamp}\n`);

    // Cache report
    if (report.stats.cache) {
      console.log('💾 CACHE STATISTICS:');
      console.log(`   • Hit Rate: ${report.stats.cache.hitRate}`);
      console.log(`   • Hits: ${report.stats.cache.hits}`);
      console.log(`   • Misses: ${report.stats.cache.misses}`);
      console.log(`   • Expiries: ${report.stats.cache.expires}`);
      console.log(`   • Cached Items: ${report.stats.cache.size}/${report.stats.cache.maxSize}`);
      console.log(`   • Memory: ${report.stats.cache.memoryUsage.toFixed(2)}MB\n`);
    }

    // Performance report
    if (report.stats.performance) {
      console.log('⚡ PERFORMANCE METRICS:');
      console.log(`   • Total Functions: ${report.stats.performance.summary.totalFunctionsCalled}`);
      console.log(`   • Total Calls: ${report.stats.performance.summary.totalCalls}`);
      console.log(`   • Avg Duration: ${report.stats.performance.summary.avgDuration}ms`);
      console.log(`   • Memory Usage: ${report.stats.performance.summary.memoryUsageMB}MB`);

      if (report.stats.performance.slowestFunctions.length > 0) {
        console.log('\n   🐌 Top 5 Slowest:');
        report.stats.performance.slowestFunctions.slice(0, 5).forEach((fn, i) => {
          console.log(`      ${i + 1}. ${fn.name}: ${fn.avgDuration}ms (${fn.slowCalls} slow)`);
        });
      }
      console.log();
    }

    // Rate limiting report
    if (report.stats.rateLimiting) {
      console.log('🚦 API RATE LIMITING:');
      console.log(`   • Requests: ${report.stats.rateLimiting.requests}`);
      console.log(`   • Batched: ${report.stats.rateLimiting.batched}`);
      console.log(`   • Deduplicated: ${report.stats.rateLimiting.deduplicated}`);
      console.log(`   • Retries: ${report.stats.rateLimiting.retries}`);
      console.log(`   • Errors: ${report.stats.rateLimiting.errors}`);
      console.log(`   • Avg Time: ${report.stats.rateLimiting.avgRequestTime}\n`);
    }

    // Database report
    if (report.stats.database) {
      console.log('🗄️  DATABASE OPTIMIZATION:');
      console.log(`   • Index Hit Rate: ${report.stats.database.indexHitRate}`);
      console.log(`   • Cache Hit Rate: ${report.stats.database.cacheHitRate}`);
      console.log(`   • Indexes: ${report.stats.database.indexCount}`);
      console.log(`   • Cached Queries: ${report.stats.database.cachedQueries}`);
      console.log(`   • Batch Operations: ${report.stats.database.batchOperations}\n`);
    }

    // Data processor report
    if (report.stats.dataProcessor) {
      console.log('📊 DATA PROCESSING:');
      console.log(`   • Deduplications: ${report.stats.dataProcessor.deduplications}`);
      console.log(`   • Transformations: ${report.stats.dataProcessor.transformations}`);
      console.log(`   • Records Processed: ${report.stats.dataProcessor.processedRecords}`);
      console.log(`   • Regex Cache Hit Rate: ${report.stats.dataProcessor.regexCacheStats.hitRate}\n`);
    }

    console.log('╔═════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                         END OF REPORT                                       ║');
    console.log('╚═════════════════════════════════════════════════════════════════════════════╝\n');
  }

  /**
   * Cleanup and save metrics
   */
  async shutdown() {
    console.log('🛑 Shutting down optimization engine...');

    // Log final metrics
    if (this.monitor) {
      await this.monitor.logMetrics();
    }

    // Cleanup
    if (this.cache) {
      this.cache.destroy();
    }

    if (this.monitor) {
      this.monitor.destroy();
    }

    console.log('✅ Shutdown complete');
  }
}

module.exports = {
  OptimizationEngine,
  PerformanceCache,
  DatabaseOptimizer,
  APIRateLimiter,
  PerformanceMonitor,
  DataProcessor
};
