/**
 * ═════════════════════════════════════════════════════════════════════════════
 * PERFORMANCE MONITORING & METRICS
 * ═════════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive performance tracking:
 * - Function execution profiling
 * - Slow operation detection
 * - Memory usage tracking
 * - Performance alerts
 * - Historical metrics logging
 * 
 * PERFORMANCE BENEFITS:
 * - Identify bottlenecks early
 * - Track optimization progress
 * - Detect memory leaks
 * - Continuous monitoring for regression
 * 
 * USAGE:
 *   const monitor = new PerformanceMonitor();
 *   
 *   const elapsed = await monitor.profileAsync(
 *     'myFunction',
 *     async () => { ... }
 *   );
 *   
 *   monitor.logMetrics();
 *   const report = monitor.getPerformanceReport();
 */

const fs = require('fs').promises;
const path = require('path');

class FunctionMetrics {
  constructor(name, threshold = 1000) {
    this.name = name;
    this.threshold = threshold; // ms - alert if exceeded
    this.calls = [];
    this.errors = [];
  }

  recordCall(duration, success = true) {
    this.calls.push({
      duration,
      success,
      timestamp: Date.now(),
      slow: duration > this.threshold
    });

    // Keep only last 1000 calls to avoid memory bloat
    if (this.calls.length > 1000) {
      this.calls = this.calls.slice(-1000);
    }
  }

  recordError(error, duration) {
    this.errors.push({
      message: error.message,
      stack: error.stack,
      duration,
      timestamp: Date.now()
    });

    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }
  }

  getStats() {
    if (this.calls.length === 0) {
      return {
        name: this.name,
        calls: 0,
        errors: this.errors.length,
        avgDuration: 0,
        minDuration: 0,
        maxDuration: 0,
        slowCalls: 0
      };
    }

    const successfulCalls = this.calls.filter(c => c.success);
    const durations = successfulCalls.map(c => c.duration);
    const slowCalls = this.calls.filter(c => c.slow).length;

    return {
      name: this.name,
      totalCalls: this.calls.length,
      successfulCalls: successfulCalls.length,
      failedCalls: this.calls.filter(c => !c.success).length,
      errors: this.errors.length,
      avgDuration: (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(2),
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      slowCalls: slowCalls,
      slowCallRate: ((slowCalls / this.calls.length) * 100).toFixed(2),
      threshold: this.threshold,
      p95Duration: this._percentile(durations, 0.95),
      p99Duration: this._percentile(durations, 0.99)
    };
  }

  _percentile(arr, p) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[Math.max(0, index)];
  }
}

class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      logDir: options.logDir || path.join(process.cwd(), 'logs/performance'),
      slowThresholdMs: options.slowThresholdMs || 1000,
      enableAutoLogging: options.enableAutoLogging !== false,
      logInterval: options.logInterval || 3600000, // 1 hour
      ...options
    };

    this.metrics = new Map(); // { functionName -> FunctionMetrics }
    this.memorySnapshots = [];
    this.startTime = Date.now();
    this.startMemory = process.memoryUsage();

    if (this.options.enableAutoLogging) {
      this._startAutoLogging();
    }
  }

  /**
   * Profile async function
   */
  async profileAsync(functionName, fn, threshold = null) {
    const metrics = this._getMetrics(functionName, threshold);
    const start = process.hrtime.bigint();

    try {
      const result = await fn();
      const elapsed = Number(process.hrtime.bigint() - start) / 1_000_000; // Convert to ms
      metrics.recordCall(elapsed, true);

      if (elapsed > metrics.threshold) {
        console.warn(`⏱️ Slow operation detected: ${functionName} took ${elapsed.toFixed(2)}ms (threshold: ${metrics.threshold}ms)`);
      }

      return result;
    } catch (error) {
      const elapsed = Number(process.hrtime.bigint() - start) / 1_000_000;
      metrics.recordCall(elapsed, false);
      metrics.recordError(error, elapsed);
      console.error(`❌ Error in ${functionName}:`, error.message);
      throw error;
    }
  }

  /**
   * Profile sync function
   */
  profileSync(functionName, fn, threshold = null) {
    const metrics = this._getMetrics(functionName, threshold);
    const start = process.hrtime.bigint();

    try {
      const result = fn();
      const elapsed = Number(process.hrtime.bigint() - start) / 1_000_000;
      metrics.recordCall(elapsed, true);

      if (elapsed > metrics.threshold) {
        console.warn(`⏱️ Slow operation detected: ${functionName} took ${elapsed.toFixed(2)}ms (threshold: ${metrics.threshold}ms)`);
      }

      return result;
    } catch (error) {
      const elapsed = Number(process.hrtime.bigint() - start) / 1_000_000;
      metrics.recordCall(elapsed, false);
      metrics.recordError(error, elapsed);
      console.error(`❌ Error in ${functionName}:`, error.message);
      throw error;
    }
  }

  /**
   * Measure time-based operation
   */
  async measure(operationName, asyncFn) {
    return this.profileAsync(operationName, asyncFn);
  }

  /**
   * Get metrics for function
   */
  _getMetrics(functionName, threshold = null) {
    if (!this.metrics.has(functionName)) {
      const finalThreshold = threshold || this.options.slowThresholdMs;
      this.metrics.set(functionName, new FunctionMetrics(functionName, finalThreshold));
    }
    return this.metrics.get(functionName);
  }

  /**
   * Take memory snapshot
   */
  snapshotMemory(label = '') {
    const snapshot = {
      timestamp: Date.now(),
      label,
      ...process.memoryUsage(),
      uptime: (Date.now() - this.startTime) / 1000
    };

    this.memorySnapshots.push(snapshot);

    // Keep only last 100 snapshots
    if (this.memorySnapshots.length > 100) {
      this.memorySnapshots = this.memorySnapshots.slice(-100);
    }

    return snapshot;
  }

  /**
   * Get memory analysis
   */
  getMemoryAnalysis() {
    if (this.memorySnapshots.length < 2) {
      return {
        snapshots: this.memorySnapshots.length,
        message: 'Insufficient snapshots for analysis'
      };
    }

    const first = this.memorySnapshots[0];
    const latest = this.memorySnapshots[this.memorySnapshots.length - 1];

    return {
      snapshots: this.memorySnapshots.length,
      duration: ((latest.timestamp - first.timestamp) / 1000).toFixed(2),
      heapUsedChange: {
        bytes: latest.heapUsed - first.heapUsed,
        mb: ((latest.heapUsed - first.heapUsed) / 1024 / 1024).toFixed(2)
      },
      heapTotalChange: {
        bytes: latest.heapTotal - first.heapTotal,
        mb: ((latest.heapTotal - first.heapTotal) / 1024 / 1024).toFixed(2)
      },
      externalChange: {
        bytes: latest.external - first.external,
        mb: ((latest.external - first.external) / 1024 / 1024).toFixed(2)
      },
      rssChange: {
        bytes: latest.rss - first.rss,
        mb: ((latest.rss - first.rss) / 1024 / 1024).toFixed(2)
      }
    };
  }

  /**
   * Get comprehensive performance report
   */
  getPerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      uptime: ((Date.now() - this.startTime) / 1000).toFixed(2),
      functions: [],
      slowestFunctions: [],
      errorSummary: {
        totalErrors: 0,
        byFunction: {}
      },
      memoryAnalysis: this.getMemoryAnalysis(),
      summary: {}
    };

    // Collect function metrics
    const allMetrics = Array.from(this.metrics.values())
      .map(m => m.getStats())
      .sort((a, b) => parseFloat(b.avgDuration) - parseFloat(a.avgDuration));

    report.functions = allMetrics;

    // Identify slowest functions
    report.slowestFunctions = allMetrics
      .filter(m => m.slowCalls > 0)
      .slice(0, 10);

    // Error summary
    for (const metrics of this.metrics.values()) {
      const stats = metrics.getStats();
      if (stats.errors > 0) {
        report.errorSummary.totalErrors += stats.errors;
        report.errorSummary.byFunction[stats.name] = stats.errors;
      }
    }

    // Overall summary
    const totalCalls = allMetrics.reduce((sum, m) => sum + m.totalCalls, 0);
    const avgDuration = allMetrics.reduce((sum, m) => sum + parseFloat(m.avgDuration), 0) / allMetrics.length;

    report.summary = {
      totalFunctionsCalled: allMetrics.length,
      totalCalls,
      avgDuration: avgDuration.toFixed(2),
      memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    };

    return report;
  }

  /**
   * Log metrics to file
   */
  async logMetrics() {
    try {
      const logDir = this.options.logDir;
      if (!fs.existsSync?.(logDir)) {
        await fs.mkdir(logDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const report = this.getPerformanceReport();
      const filePath = path.join(logDir, `performance-${timestamp}.json`);

      await fs.writeFile(filePath, JSON.stringify(report, null, 2), 'utf8');
      console.log(`📊 Performance metrics logged to ${filePath}`);

      return filePath;
    } catch (err) {
      console.error('Error logging metrics:', err.message);
    }
  }

  /**
   * Print performance report to console
   */
  printReport() {
    const report = this.getPerformanceReport();

    console.log('\n═══════════════════════════════════════════════════════════════════════════');
    console.log('📊 PERFORMANCE REPORT');
    console.log('═══════════════════════════════════════════════════════════════════════════');
    console.log(`⏱️  Uptime: ${report.uptime} seconds`);
    console.log(`📈 Functions: ${report.summary.totalFunctionsCalled}`);
    console.log(`📞 Total Calls: ${report.summary.totalCalls}`);
    console.log(`⏳ Avg Duration: ${report.summary.avgDuration}ms`);
    console.log(`💾 Memory: ${report.summary.memoryUsageMB}MB`);

    if (report.slowestFunctions.length > 0) {
      console.log('\n🐌 SLOWEST FUNCTIONS:');
      report.slowestFunctions.slice(0, 5).forEach((fn, i) => {
        console.log(`  ${i + 1}. ${fn.name}: ${fn.avgDuration}ms avg (${fn.slowCalls} slow calls)`);
      });
    }

    if (report.errorSummary.totalErrors > 0) {
      console.log(`\n❌ ERRORS: ${report.errorSummary.totalErrors}`);
      Object.entries(report.errorSummary.byFunction).forEach(([name, count]) => {
        console.log(`  - ${name}: ${count} errors`);
      });
    }

    console.log('\n═══════════════════════════════════════════════════════════════════════════\n');
  }

  /**
   * Start auto-logging interval
   */
  _startAutoLogging() {
    this.logInterval = setInterval(() => {
      this.logMetrics().catch(err => console.error('Auto-logging failed:', err.message));
    }, this.options.logInterval);
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.logInterval) {
      clearInterval(this.logInterval);
    }
  }
}

// Export singleton
let monitorInstance = null;

function getMonitorInstance(options = {}) {
  if (!monitorInstance) {
    monitorInstance = new PerformanceMonitor(options);
  }
  return monitorInstance;
}

module.exports = {
  PerformanceMonitor,
  FunctionMetrics,
  getMonitorInstance
};
