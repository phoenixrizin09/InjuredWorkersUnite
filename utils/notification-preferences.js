/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NOTIFICATION PREFERENCES SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Allows users to customize which channels and alert types they receive
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

/**
 * Default notification preferences for a user
 */
const DEFAULT_PREFERENCES = {
  userId: null,
  email: null,
  createdAt: null,
  updatedAt: null,
  
  // Channel preferences
  channels: {
    email: {
      enabled: true,
      priority: 'high',
    },
    telegram: {
      enabled: true,
      priority: 'high',
    },
    slack: {
      enabled: false,
      priority: 'medium',
    },
    discord: {
      enabled: true,
      priority: 'high',
    },
    sms: {
      enabled: false,
      priority: 'high', // SMS for critical only
    },
    push: {
      enabled: true,
      priority: 'medium',
    },
    webhook: {
      enabled: false,
      priority: 'low',
    },
  },

  // Severity-based filters
  severityFilter: {
    critical: {
      enabled: true,
      minSeverity: 'critical',
      channels: ['email', 'telegram', 'discord', 'sms', 'push'],
      immediate: true,
    },
    high: {
      enabled: true,
      minSeverity: 'high',
      channels: ['email', 'telegram', 'discord', 'push'],
      immediate: true,
    },
    medium: {
      enabled: true,
      minSeverity: 'medium',
      channels: ['email', 'discord', 'push'],
      batchAfterMinutes: 30,
    },
    low: {
      enabled: false, // Disabled by default
      minSeverity: 'low',
      channels: ['email'],
      batchAfterMinutes: 1440, // Daily digest
    },
  },

  // Category filters
  categoryFilter: {
    'workers-rights': { enabled: true },
    'wage-theft': { enabled: true },
    'occupational-health': { enabled: true },
    'discrimination': { enabled: true },
    'retaliation': { enabled: true },
    'legislation': { enabled: true },
    'case-updates': { enabled: true },
    'policy-changes': { enabled: true },
    'community-news': { enabled: false },
  },

  // Jurisdiction/geographic filters
  jurisdictionFilter: {
    'ontario': { enabled: true },
    'bc': { enabled: false },
    'federal': { enabled: true },
    'all': { enabled: false },
  },

  // Quiet hours (no notifications)
  quietHours: {
    enabled: false,
    startTime: '22:00', // 10 PM
    endTime: '08:00',   // 8 AM
    timezone: 'America/Toronto',
  },

  // Rate limiting
  rateLimit: {
    maxEmailsPerDay: 20,
    maxSMSPerDay: 5,
    maxPushPerDay: 50,
    batchNotifications: true, // Combine multiple alerts into one message
    batchAfterMinutes: 15,
  },

  // Digest preferences
  digest: {
    enabled: true,
    frequency: 'daily', // daily, weekly, or none
    time: '09:00', // 9 AM
    timezone: 'America/Toronto',
    includeCategories: ['workers-rights', 'wage-theft', 'legislation'],
  },

  // Advanced settings
  unsubscribeToken: null,
  language: 'en',
  timezone: 'America/Toronto',
  doNotTrack: false,
  apiKeyForWebhook: null,
};

/**
 * Notification Preferences Manager
 */
class NotificationPreferencesManager {
  constructor(dataDir = './data') {
    this.dataDir = dataDir;
    this.preferencesFile = path.join(dataDir, 'user-preferences.json');
    this.preferences = this.loadPreferences();
  }

  /**
   * Load preferences from file
   */
  loadPreferences() {
    try {
      if (fs.existsSync(this.preferencesFile)) {
        const data = fs.readFileSync(this.preferencesFile, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
    return {};
  }

  /**
   * Save preferences to file
   */
  savePreferences() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(
        this.preferencesFile,
        JSON.stringify(this.preferences, null, 2),
        'utf8'
      );
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  /**
   * Get user preferences (creates default if not exists)
   */
  getPreferences(userId) {
    if (!this.preferences[userId]) {
      this.preferences[userId] = {
        ...JSON.parse(JSON.stringify(DEFAULT_PREFERENCES)),
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        unsubscribeToken: this.generateToken(),
      };
      this.savePreferences();
    }
    return this.preferences[userId];
  }

  /**
   * Update user preferences
   */
  updatePreferences(userId, updates) {
    const prefs = this.getPreferences(userId);
    
    // Deep merge updates
    const merged = this.deepMerge(prefs, updates);
    merged.updatedAt = new Date().toISOString();
    
    this.preferences[userId] = merged;
    this.savePreferences();
    
    return merged;
  }

  /**
   * Check if user wants to receive alert via channel
   */
  shouldReceiveViaChannel(userId, alert, channel) {
    const prefs = this.getPreferences(userId);
    
    // Check if channel is enabled
    if (!prefs.channels[channel]?.enabled) {
      return false;
    }

    // Check severity filter
    const severity = alert.severity || 'medium';
    const severityConfig = prefs.severityFilter[severity];
    if (!severityConfig?.enabled) {
      return false;
    }
    
    if (!severityConfig.channels.includes(channel)) {
      return false;
    }

    // Check category filter
    const category = alert.category;
    if (category && prefs.categoryFilter[category]?.enabled === false) {
      return false;
    }

    // Check jurisdiction filter
    const jurisdiction = alert.jurisdiction;
    if (jurisdiction && prefs.jurisdictionFilter[jurisdiction]?.enabled === false) {
      return false;
    }

    return true;
  }

  /**
   * Get channels to use for an alert
   */
  getChannelsForAlert(userId, alert) {
    const prefs = this.getPreferences(userId);
    const channels = [];

    for (const [channelName, config] of Object.entries(prefs.channels)) {
      if (config.enabled && this.shouldReceiveViaChannel(userId, alert, channelName)) {
        channels.push({
          name: channelName,
          priority: config.priority,
        });
      }
    }

    return channels;
  }

  /**
   * Check if alert should be batched
   */
  shouldBatchAlert(userId, alert) {
    const prefs = this.getPreferences(userId);
    const severity = alert.severity || 'medium';
    const severityConfig = prefs.severityFilter[severity];
    
    return severityConfig?.batchAfterMinutes > 0;
  }

  /**
   * Get batch delay in milliseconds
   */
  getBatchDelay(userId, alert) {
    const prefs = this.getPreferences(userId);
    const severity = alert.severity || 'medium';
    const severityConfig = prefs.severityFilter[severity];
    
    return (severityConfig?.batchAfterMinutes || 15) * 60 * 1000;
  }

  /**
   * Check if current time is in quiet hours
   */
  isInQuietHours(userId) {
    const prefs = this.getPreferences(userId);
    
    if (!prefs.quietHours?.enabled) {
      return false;
    }

    // TODO: Implement timezone-aware quiet hours checking
    // For now, simple implementation
    const now = new Date();
    const currentHours = now.getHours();
    const [startHours] = prefs.quietHours.startTime.split(':').map(Number);
    const [endHours] = prefs.quietHours.endTime.split(':').map(Number);

    if (startHours > endHours) {
      // Quiet hours span midnight
      return currentHours >= startHours || currentHours < endHours;
    } else {
      return currentHours >= startHours && currentHours < endHours;
    }
  }

  /**
   * Check rate limit
   */
  checkRateLimit(userId, channel, alertsAlreadySent = 0) {
    const prefs = this.getPreferences(userId);
    const rateLimit = prefs.rateLimit;

    const limitMap = {
      email: rateLimit.maxEmailsPerDay,
      sms: rateLimit.maxSMSPerDay,
      push: rateLimit.maxPushPerDay,
      telegram: 100, // Default high limit
      discord: 100,
      slack: 100,
      webhook: 100,
    };

    const limit = limitMap[channel] || 100;
    return alertsAlreadySent < limit;
  }

  /**
   * Get digest settings
   */
  getDigestSettings(userId) {
    const prefs = this.getPreferences(userId);
    return prefs.digest;
  }

  /**
   * Generate unsubscribe link
   */
  generateUnsubscribeLink(userId) {
    const prefs = this.getPreferences(userId);
    const token = prefs.unsubscribeToken;
    return `${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/unsubscribe?token=${token}`;
  }

  /**
   * Process unsubscribe token
   */
  processUnsubscribe(token) {
    for (const [userId, prefs] of Object.entries(this.preferences)) {
      if (prefs.unsubscribeToken === token) {
        // Disable all channels
        for (const channelKey of Object.keys(prefs.channels)) {
          prefs.channels[channelKey].enabled = false;
        }
        this.savePreferences();
        return { success: true, userId };
      }
    }
    return { success: false, error: 'Invalid token' };
  }

  /**
   * Helper: Deep merge objects
   */
  deepMerge(target, source) {
    const result = JSON.parse(JSON.stringify(target));
    
    for (const key of Object.keys(source)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  /**
   * Helper: Generate random token
   */
  generateToken() {
    return require('crypto').randomBytes(32).toString('hex');
  }

  /**
   * Get all preferences for reporting
   */
  getAllPreferences() {
    return this.preferences;
  }

  /**
   * Export preferences for user
   */
  exportPreferences(userId) {
    const prefs = this.getPreferences(userId);
    return {
      ...prefs,
      exportedAt: new Date().toISOString(),
      unsubscribeUrl: this.generateUnsubscribeLink(userId),
    };
  }
}

module.exports = {
  NotificationPreferencesManager,
  DEFAULT_PREFERENCES,
};
