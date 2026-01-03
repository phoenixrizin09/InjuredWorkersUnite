/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DELIVERY CONFIRMATION & RATE LIMITING SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Track delivery status, receipt confirmation, and implement smart throttling
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

/**
 * Delivery status tracker
 */
class DeliveryTracker {
  constructor(dataDir = './data') {
    this.dataDir = dataDir;
    this.logsFile = path.join(dataDir, 'delivery-logs.json');
    this.logs = this.loadLogs();
    this.maxLogs = 10000; // Keep last 10k deliveries
  }

  /**
   * Load delivery logs from file
   */
  loadLogs() {
    try {
      if (fs.existsSync(this.logsFile)) {
        const data = fs.readFileSync(this.logsFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading delivery logs:', error);
    }
    return [];
  }

  /**
   * Save logs to file
   */
  saveLogs() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(
        this.logsFile,
        JSON.stringify(this.logs, null, 2),
        'utf8'
      );
    } catch (error) {
      console.error('Error saving delivery logs:', error);
    }
  }

  /**
   * Record delivery attempt
   */
  recordDelivery(deliveryInfo) {
    const log = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      alertId: deliveryInfo.alertId,
      userId: deliveryInfo.userId,
      channel: deliveryInfo.channel,
      status: deliveryInfo.status, // 'sent', 'failed', 'pending', 'delivered', 'bounced', 'opened'
      externalId: deliveryInfo.externalId, // ID from service (e.g., message ID)
      error: deliveryInfo.error || null,
      metadata: deliveryInfo.metadata || {},
      retryCount: 0,
      nextRetryAt: null,
    };

    this.logs.push(log);
    
    // Trim old logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    this.saveLogs();
    return log;
  }

  /**
   * Update delivery status
   */
  updateDeliveryStatus(deliveryId, newStatus, metadata = {}) {
    const log = this.logs.find(l => l.id === deliveryId);
    if (log) {
      log.status = newStatus;
      log.updatedAt = new Date().toISOString();
      if (newStatus === 'delivered') {
        log.deliveredAt = new Date().toISOString();
      }
      if (metadata) {
        log.metadata = { ...log.metadata, ...metadata };
      }
      this.saveLogs();
      return log;
    }
    return null;
  }

  /**
   * Mark delivery as confirmed/opened
   */
  confirmDelivery(deliveryId, confirmation = {}) {
    const log = this.logs.find(l => l.id === deliveryId);
    if (log) {
      log.status = 'confirmed';
      log.confirmedAt = new Date().toISOString();
      log.metadata = { ...log.metadata, ...confirmation };
      this.saveLogs();
      return log;
    }
    return null;
  }

  /**
   * Get delivery history for alert
   */
  getAlertDeliveryHistory(alertId) {
    return this.logs.filter(l => l.alertId === alertId);
  }

  /**
   * Get delivery history for user
   */
  getUserDeliveryHistory(userId, limit = 100) {
    return this.logs
      .filter(l => l.userId === userId)
      .slice(-limit)
      .reverse();
  }

  /**
   * Get delivery statistics
   */
  getDeliveryStats(timeframeHours = 24) {
    const cutoff = Date.now() - (timeframeHours * 60 * 60 * 1000);
    const recentLogs = this.logs.filter(l => new Date(l.timestamp).getTime() > cutoff);

    const stats = {
      total: recentLogs.length,
      byChannel: {},
      byStatus: {},
      successRate: 0,
    };

    recentLogs.forEach(log => {
      // By channel
      stats.byChannel[log.channel] = (stats.byChannel[log.channel] || 0) + 1;
      
      // By status
      stats.byStatus[log.status] = (stats.byStatus[log.status] || 0) + 1;
    });

    // Calculate success rate
    const successful = stats.byStatus['delivered'] || stats.byStatus['confirmed'] || 0;
    const sent = stats.byStatus['sent'] || 0;
    stats.successRate = sent > 0 ? Math.round((successful / sent) * 100) : 0;

    return stats;
  }

  /**
   * Get failed deliveries for retry
   */
  getFailedDeliveriesForRetry(channelName = null) {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // Last 24 hours
    
    return this.logs.filter(l => {
      const isOldEnough = new Date(l.timestamp).getTime() < cutoff;
      const isFailed = l.status === 'failed';
      const isRetryable = (l.retryCount || 0) < 3;
      const matchesChannel = !channelName || l.channel === channelName;
      
      return isOldEnough && isFailed && isRetryable && matchesChannel;
    });
  }

  /**
   * Schedule retry for failed delivery
   */
  scheduleRetry(deliveryId, delayMinutes = 5) {
    const log = this.logs.find(l => l.id === deliveryId);
    if (log) {
      log.retryCount = (log.retryCount || 0) + 1;
      log.nextRetryAt = new Date(Date.now() + delayMinutes * 60 * 1000).toISOString();
      log.status = 'retry-scheduled';
      this.saveLogs();
      return log;
    }
    return null;
  }

  /**
   * Helper: Generate unique ID
   */
  generateId() {
    return `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Rate limiter with smart batching and throttling
 */
class AlertRateLimiter {
  constructor() {
    this.windowSize = 60 * 1000; // 1 minute window
    this.userActivity = new Map(); // userId -> { channel -> [timestamps] }
    this.batches = new Map(); // batchKey -> alerts
  }

  /**
   * Check if user can send alert via channel
   */
  canSendAlert(userId, channel, limits = {}) {
    const defaultLimits = {
      email: 20,    // per day
      sms: 5,       // per day
      telegram: 50, // per day
      discord: 50,  // per day
      slack: 50,    // per day
      push: 50,     // per day
      webhook: 100, // per day
    };

    const limit = limits[channel] || defaultLimits[channel] || 100;
    const timePeriod = 24 * 60 * 60 * 1000; // 24 hours
    const cutoff = Date.now() - timePeriod;

    if (!this.userActivity.has(userId)) {
      return true;
    }

    const userActivity = this.userActivity.get(userId);
    const timestamps = (userActivity[channel] || []).filter(t => t > cutoff);

    return timestamps.length < limit;
  }

  /**
   * Record alert delivery for user
   */
  recordAlert(userId, channel) {
    if (!this.userActivity.has(userId)) {
      this.userActivity.set(userId, {});
    }

    const userActivity = this.userActivity.get(userId);
    if (!userActivity[channel]) {
      userActivity[channel] = [];
    }

    userActivity[channel].push(Date.now());

    // Clean up old entries (older than 24 hours)
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    userActivity[channel] = userActivity[channel].filter(t => t > cutoff);
  }

  /**
   * Get user's current usage for a channel
   */
  getCurrentUsage(userId, channel) {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    
    if (!this.userActivity.has(userId)) {
      return 0;
    }

    const userActivity = this.userActivity.get(userId);
    const timestamps = (userActivity[channel] || []).filter(t => t > cutoff);
    
    return timestamps.length;
  }

  /**
   * Add alert to batch for later delivery
   */
  addToBatch(userId, alert, batchOptions = {}) {
    const {
      maxBatchSize = 10,
      maxWaitMinutes = 15,
      channel = 'email',
    } = batchOptions;

    const batchKey = `${userId}_${channel}`;

    if (!this.batches.has(batchKey)) {
      this.batches.set(batchKey, {
        alerts: [],
        createdAt: Date.now(),
        maxSize: maxBatchSize,
        maxWait: maxWaitMinutes * 60 * 1000,
      });
    }

    const batch = this.batches.get(batchKey);
    batch.alerts.push(alert);

    // Return batch info and whether it should be sent now
    const shouldSendNow =
      batch.alerts.length >= batch.maxSize ||
      (Date.now() - batch.createdAt) >= batch.maxWait;

    return {
      batchKey,
      batchSize: batch.alerts.length,
      shouldSendNow,
      alerts: shouldSendNow ? batch.alerts : null,
    };
  }

  /**
   * Get batch for delivery
   */
  getBatch(batchKey) {
    const batch = this.batches.get(batchKey);
    if (batch) {
      const alerts = batch.alerts;
      this.batches.delete(batchKey);
      return alerts;
    }
    return null;
  }

  /**
   * Get all pending batches
   */
  getPendingBatches() {
    const now = Date.now();
    const pending = [];

    for (const [batchKey, batch] of this.batches.entries()) {
      if ((now - batch.createdAt) >= batch.maxWait) {
        pending.push({
          batchKey,
          alerts: batch.alerts,
          size: batch.alerts.length,
        });
      }
    }

    return pending;
  }

  /**
   * Clear expired batches
   */
  clearExpiredBatches(maxAgeMinutes = 60) {
    const cutoff = Date.now() - (maxAgeMinutes * 60 * 1000);

    for (const [batchKey, batch] of this.batches.entries()) {
      if (batch.createdAt < cutoff) {
        // Send batch even if not full
        console.log(`Clearing expired batch: ${batchKey} (${batch.alerts.length} alerts)`);
        this.batches.delete(batchKey);
      }
    }
  }

  /**
   * Get rate limit status for user
   */
  getRateLimitStatus(userId, channels = ['email', 'sms', 'push']) {
    const status = {};

    for (const channel of channels) {
      const usage = this.getCurrentUsage(userId, channel);
      status[channel] = {
        used: usage,
        remaining: Math.max(0, 100 - usage), // Assuming max is ~100
      };
    }

    return status;
  }

  /**
   * Reset user activity (for testing or admin operations)
   */
  resetUserActivity(userId, channel = null) {
    if (channel) {
      const userActivity = this.userActivity.get(userId);
      if (userActivity) {
        delete userActivity[channel];
      }
    } else {
      this.userActivity.delete(userId);
    }
  }
}

module.exports = {
  DeliveryTracker,
  AlertRateLimiter,
};
