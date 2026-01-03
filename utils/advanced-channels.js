/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ADVANCED DELIVERY CHANNELS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Slack, SMS (Twilio), and Push notification integrations
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ============================================================================
// SLACK WEBHOOK INTEGRATION
// ============================================================================

class SlackDelivery {
  constructor(config = {}) {
    this.webhookUrl = config.webhookUrl || process.env.SLACK_WEBHOOK_URL;
    this.botName = config.botName || 'The Eye Oracle';
    this.iconEmoji = config.iconEmoji || ':eye:';
    this.name = 'slack';
  }

  isConfigured() {
    return !!this.webhookUrl;
  }

  async send(alert) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    const colorMap = {
      critical: '#c41e3a',
      high: '#ff6600',
      medium: '#ffcc00',
      low: '#00cc66',
    };

    const payload = {
      username: this.botName,
      icon_emoji: this.iconEmoji,
      attachments: [
        {
          color: colorMap[alert.severity] || '#808080',
          title: alert.title,
          title_link: `${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}`,
          text: alert.message || alert.description || '',
          fields: [
            {
              title: 'Severity',
              value: alert.severity.toUpperCase(),
              short: true,
            },
            {
              title: 'Category',
              value: alert.category,
              short: true,
            },
            {
              title: 'Scope',
              value: alert.scope || alert.jurisdiction || 'Multi-jurisdictional',
              short: true,
            },
            {
              title: 'Status',
              value: alert.status || 'Active',
              short: true,
            },
          ],
          footer: 'The Eye Oracle',
          footer_icon: 'https://injuredworkersunite.pages.dev/favicon.ico',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    if (alert.source) {
      payload.attachments[0].fields.push({
        title: 'Source',
        value: alert.source,
        short: false,
      });
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Slack API error: ${response.status} - ${text}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Slack delivery error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send rich formatted message with thread support
   */
  async sendRichMessage(alert, threadTs = null) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    const payload = {
      username: this.botName,
      icon_emoji: this.iconEmoji,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `👁️ ${alert.title}`,
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: alert.message || alert.description || '',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Severity:*\n${alert.severity.toUpperCase()}`,
            },
            {
              type: 'mrkdwn',
              text: `*Category:*\n${alert.category}`,
            },
            {
              type: 'mrkdwn',
              text: `*Scope:*\n${alert.scope || 'Multi-jurisdictional'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Status:*\n${alert.status || 'Active'}`,
            },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Details',
                emoji: true,
              },
              value: alert.id,
              url: `${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}`,
              action_id: `view_alert_${alert.id}`,
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Open Dashboard',
                emoji: true,
              },
              url: `${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts`,
              action_id: 'open_dashboard',
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `_The Eye sees. The Eye speaks truth._`,
            },
          ],
        },
      ],
    };

    // Add thread reply capability
    if (threadTs) {
      payload.thread_ts = threadTs;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, ts: data.ts };
    } catch (error) {
      console.error('Slack rich message error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ============================================================================
// TWILIO SMS DELIVERY
// ============================================================================

class SMSDelivery {
  constructor(config = {}) {
    this.accountSid = config.accountSid || process.env.TWILIO_ACCOUNT_SID;
    this.authToken = config.authToken || process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = config.fromNumber || process.env.TWILIO_PHONE_NUMBER;
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}`;
    this.name = 'sms';
  }

  isConfigured() {
    return !!(this.accountSid && this.authToken && this.fromNumber);
  }

  /**
   * Send SMS to phone number
   */
  async sendSMS(phoneNumber, message) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    // Validate phone number format
    if (!this.isValidPhoneNumber(phoneNumber)) {
      return { success: false, error: 'Invalid phone number' };
    }

    const credentials = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');

    try {
      const response = await fetch(`${this.baseUrl}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: this.fromNumber,
          To: phoneNumber,
          Body: message,
        }).toString(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Twilio error: ${response.status}`);
      }

      return {
        success: true,
        messageId: result.sid,
        status: result.status,
      };
    } catch (error) {
      console.error('SMS delivery error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send SMS alert
   */
  async send(alert, phoneNumber) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    // Create concise message for SMS (160 char limit)
    const emoji = {
      critical: '🚨',
      high: '🔴',
      medium: '🟠',
      low: '🟡',
    }[alert.severity] || '⚪';

    // Truncate message to fit SMS character limit
    const maxLength = 160;
    const message = `${emoji} [${alert.severity.toUpperCase()}] ${alert.title}`.substring(0, maxLength);

    return this.sendSMS(phoneNumber, message);
  }

  /**
   * Validate phone number format
   */
  isValidPhoneNumber(phoneNumber) {
    // Simple validation - accept +1234567890 format or 10-digit US/Canada
    return /^\+?[\d\s\-()]{10,}$/.test(phoneNumber);
  }

  /**
   * Get SMS status
   */
  async getMessageStatus(messageSid) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    const credentials = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');

    try {
      const response = await fetch(`${this.baseUrl}/Messages/${messageSid}.json`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
        },
      });

      const result = await response.json();
      return {
        success: response.ok,
        status: result.status,
        errorCode: result.error_code,
        errorMessage: result.error_message,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// ============================================================================
// BROWSER PUSH NOTIFICATIONS
// ============================================================================

class PushNotificationDelivery {
  constructor(config = {}) {
    this.vapidPublicKey = config.vapidPublicKey || process.env.VAPID_PUBLIC_KEY;
    this.vapidPrivateKey = config.vapidPrivateKey || process.env.VAPID_PRIVATE_KEY;
    this.vapidSubject = config.vapidSubject || process.env.VAPID_SUBJECT || 'mailto:admin@injuredworkersunite.org';
    this.name = 'push';
    this.subscriptions = new Map(); // userId -> [subscriptions]
  }

  isConfigured() {
    return !!(this.vapidPublicKey && this.vapidPrivateKey);
  }

  /**
   * Register push subscription
   */
  registerSubscription(userId, subscription) {
    if (!this.subscriptions.has(userId)) {
      this.subscriptions.set(userId, []);
    }

    const subs = this.subscriptions.get(userId);
    
    // Check if already registered
    const exists = subs.find(s => s.endpoint === subscription.endpoint);
    if (!exists) {
      subs.push({
        ...subscription,
        registeredAt: new Date().toISOString(),
      });
    }

    return { success: true, registered: !exists };
  }

  /**
   * Send push notification
   */
  async send(alert, userIds = []) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    const results = [];

    for (const userId of userIds) {
      const subscriptions = this.subscriptions.get(userId) || [];

      for (const subscription of subscriptions) {
        const result = await this.sendToSubscription(alert, subscription);
        results.push(result);
      }
    }

    return {
      success: results.some(r => r.success),
      sent: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    };
  }

  /**
   * Send to specific subscription
   */
  async sendToSubscription(alert, subscription) {
    try {
      const payload = JSON.stringify({
        title: alert.title,
        body: alert.message || alert.description || '',
        icon: 'https://injuredworkersunite.pages.dev/favicon.ico',
        badge: 'https://injuredworkersunite.pages.dev/favicon.ico',
        tag: alert.id,
        requireInteraction: alert.severity === 'critical',
        data: {
          alertId: alert.id,
          severity: alert.severity,
          category: alert.category,
          url: `${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}`,
        },
      });

      // In production, use web-push library for VAPID signing
      // For now, simplified implementation
      const response = await fetch(subscription.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Encoding': 'aes128gcm',
        },
        body: payload,
      });

      if (response.status === 410) {
        // Subscription expired
        return { success: false, error: 'Subscription expired', expired: true };
      }

      if (!response.ok) {
        throw new Error(`Push error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Push notification error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get VAPID public key for client
   */
  getVAPIDPublicKey() {
    if (!this.isConfigured()) {
      return null;
    }
    return this.vapidPublicKey;
  }

  /**
   * Remove subscription (e.g., when user unsubscribes)
   */
  removeSubscription(userId, endpoint) {
    const subscriptions = this.subscriptions.get(userId);
    if (subscriptions) {
      const index = subscriptions.findIndex(s => s.endpoint === endpoint);
      if (index !== -1) {
        subscriptions.splice(index, 1);
      }
    }
  }

  /**
   * Get user subscription count
   */
  getSubscriptionCount(userId) {
    return (this.subscriptions.get(userId) || []).length;
  }
}

module.exports = {
  SlackDelivery,
  SMSDelivery,
  PushNotificationDelivery,
};
