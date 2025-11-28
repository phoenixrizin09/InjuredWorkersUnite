/**
 * ALERT DELIVERY SYSTEM - The Eye / Oracle
 * 
 * FREE alert delivery using:
 * - Telegram Bot API (FREE, unlimited)
 * - Discord Webhooks (FREE)
 * - Email via Resend free tier (100/day) or custom SMTP
 * - Browser notifications
 */

// ============================================================================
// TELEGRAM BOT (FREE - Unlimited messages)
// Create bot at https://t.me/BotFather
// ============================================================================

export class TelegramDelivery {
  constructor(botToken, chatId) {
    this.botToken = botToken || process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = chatId || process.env.TELEGRAM_CHAT_ID;
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`;
    this.name = 'telegram';
  }

  isConfigured() {
    return !!(this.botToken && this.chatId);
  }

  async send(alert) {
    if (!this.isConfigured()) {
      console.log('Telegram not configured, skipping');
      return { success: false, error: 'Not configured' };
    }

    const emoji = {
      critical: '🚨',
      high: '🔴',
      medium: '🟠',
      low: '🟡',
    }[alert.severity] || '⚪';

    const scopeEmoji = {
      local: '🏘️',
      provincial: '🏛️',
      federal: '🇨🇦',
    }[alert.scope] || '📍';

    const message = `
${emoji} *${this.escapeMarkdown(alert.title)}*

${this.escapeMarkdown(alert.message || '')}

${scopeEmoji} *Scope:* ${alert.scope}
📂 *Category:* ${alert.category}
⚠️ *Severity:* ${alert.severity.toUpperCase()}

${alert.source_url ? `🔗 [View Source](${alert.source_url})` : ''}
${alert.source ? `📰 Source: ${this.escapeMarkdown(alert.source)}` : ''}

---
👁️ *The Eye sees. The Eye speaks truth.*
🔗 [View on IWU](https://injuredworkersunite.pages.dev/alerts)
    `.trim();

    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'Markdown',
          disable_web_page_preview: false,
        }),
      });

      const result = await response.json();
      
      if (!result.ok) {
        throw new Error(result.description || 'Telegram API error');
      }

      return { success: true, messageId: result.result.message_id };
    } catch (error) {
      console.error('Telegram delivery error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendDailySummary(summary) {
    if (!this.isConfigured()) return { success: false, error: 'Not configured' };

    const message = `
📊 *THE EYE - DAILY SUMMARY*
📅 ${new Date().toLocaleDateString('en-CA')}

━━━━━━━━━━━━━━━━━━━━

📈 *New Alerts Today:* ${summary.newAlerts || 0}
🚨 *Critical:* ${summary.critical || 0}
🔴 *High:* ${summary.high || 0}
🟠 *Medium:* ${summary.medium || 0}

📋 *Cases:*
• Draft: ${summary.cases?.draft || 0}
• Under Review: ${summary.cases?.underReview || 0}
• Published: ${summary.cases?.published || 0}

🎯 *Targets Monitored:* ${summary.targets || 0}

📡 *Sources Scanned:*
${(summary.sources || []).map(s => `• ${s}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━

${summary.topAlert ? `
🔥 *Top Alert:*
${this.escapeMarkdown(summary.topAlert.title)}
` : ''}

👁️ *The Eye never sleeps.*
🔗 [View Dashboard](https://injuredworkersunite.pages.dev/the-eye-oracle)
    `.trim();

    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();
      return { success: result.ok, messageId: result.result?.message_id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  escapeMarkdown(text) {
    if (!text) return '';
    return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
  }

  // Get updates (for bot commands)
  async getUpdates(offset = 0) {
    try {
      const response = await fetch(`${this.baseUrl}/getUpdates?offset=${offset}`);
      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error getting updates:', error);
      return [];
    }
  }
}

// ============================================================================
// DISCORD WEBHOOK (FREE - Unlimited)
// ============================================================================

export class DiscordDelivery {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl || process.env.DISCORD_WEBHOOK_URL;
    this.name = 'discord';
  }

  isConfigured() {
    return !!this.webhookUrl;
  }

  async send(alert) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    const color = {
      critical: 0xFF0000,  // Red
      high: 0xFF6600,      // Orange
      medium: 0xFFCC00,    // Yellow
      low: 0x00FF00,       // Green
    }[alert.severity] || 0x808080;

    const embed = {
      title: `👁️ ${alert.title}`,
      description: alert.message || '',
      color: color,
      fields: [
        { name: '⚠️ Severity', value: alert.severity.toUpperCase(), inline: true },
        { name: '📂 Category', value: alert.category, inline: true },
        { name: '📍 Scope', value: alert.scope, inline: true },
      ],
      footer: {
        text: 'The Eye sees. The Eye speaks truth.',
        icon_url: 'https://injuredworkersunite.pages.dev/favicon.ico',
      },
      timestamp: new Date().toISOString(),
    };

    if (alert.source) {
      embed.fields.push({ name: '📰 Source', value: alert.source, inline: false });
    }

    if (alert.source_url) {
      embed.url = alert.source_url;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'The Eye Oracle',
          avatar_url: 'https://injuredworkersunite.pages.dev/favicon.ico',
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        throw new Error(`Discord API error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Discord delivery error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ============================================================================
// EMAIL (Using Resend FREE tier - 100/day, or custom SMTP)
// ============================================================================

export class EmailDelivery {
  constructor(config = {}) {
    this.resendApiKey = config.resendApiKey || process.env.RESEND_API_KEY;
    this.fromEmail = config.fromEmail || process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org';
    this.toEmails = config.toEmails || (process.env.ALERT_EMAILS?.split(',') || []);
    this.name = 'email';
  }

  isConfigured() {
    return !!(this.resendApiKey && this.toEmails.length > 0);
  }

  async send(alert) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    const severityColor = {
      critical: '#FF0000',
      high: '#FF6600',
      medium: '#FFCC00',
      low: '#00FF00',
    }[alert.severity] || '#808080';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; }
    .severity { display: inline-block; padding: 5px 15px; border-radius: 20px; color: white; font-weight: bold; }
    .content { padding: 20px; background: #f5f5f5; }
    .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
    .cta { display: inline-block; background: #e94560; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>👁️ THE EYE ALERT</h1>
  </div>
  <div class="content">
    <h2>${alert.title}</h2>
    <p><span class="severity" style="background: ${severityColor}">${alert.severity.toUpperCase()}</span></p>
    <p>${alert.message || ''}</p>
    
    <table style="width: 100%; margin-top: 20px;">
      <tr><td><strong>Category:</strong></td><td>${alert.category}</td></tr>
      <tr><td><strong>Scope:</strong></td><td>${alert.scope}</td></tr>
      ${alert.source ? `<tr><td><strong>Source:</strong></td><td>${alert.source}</td></tr>` : ''}
      ${alert.source_url ? `<tr><td><strong>Link:</strong></td><td><a href="${alert.source_url}">${alert.source_url}</a></td></tr>` : ''}
    </table>
    
    <a href="https://injuredworkersunite.pages.dev/alerts" class="cta">View All Alerts</a>
  </div>
  <div class="footer">
    <p>👁️ The Eye sees. The Eye speaks truth.</p>
    <p>Injured Workers Unite | <a href="https://injuredworkersunite.pages.dev">Visit Website</a></p>
  </div>
</body>
</html>
    `;

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: this.toEmails,
          subject: `👁️ [${alert.severity.toUpperCase()}] ${alert.title}`,
          html: html,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Resend API error');
      }

      return { success: true, id: result.id };
    } catch (error) {
      console.error('Email delivery error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ============================================================================
// WEBHOOK DELIVERY (For custom integrations)
// ============================================================================

export class WebhookDelivery {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl || process.env.CUSTOM_WEBHOOK_URL;
    this.name = 'webhook';
  }

  isConfigured() {
    return !!this.webhookUrl;
  }

  async send(alert) {
    if (!this.isConfigured()) {
      return { success: false, error: 'Not configured' };
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'eye_alert',
          timestamp: new Date().toISOString(),
          alert: {
            id: alert.id,
            title: alert.title,
            message: alert.message,
            severity: alert.severity,
            category: alert.category,
            scope: alert.scope,
            source: alert.source,
            source_url: alert.source_url,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Webhook delivery error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ============================================================================
// UNIFIED ALERT DISPATCHER
// ============================================================================

export class AlertDispatcher {
  constructor(config = {}) {
    this.channels = [];
    
    // Add Telegram if configured
    const telegram = new TelegramDelivery(config.telegramToken, config.telegramChatId);
    if (telegram.isConfigured()) {
      this.channels.push(telegram);
    }
    
    // Add Discord if configured
    const discord = new DiscordDelivery(config.discordWebhook);
    if (discord.isConfigured()) {
      this.channels.push(discord);
    }
    
    // Add Email if configured
    const email = new EmailDelivery(config.email);
    if (email.isConfigured()) {
      this.channels.push(email);
    }
    
    // Add custom webhook if configured
    const webhook = new WebhookDelivery(config.webhookUrl);
    if (webhook.isConfigured()) {
      this.channels.push(webhook);
    }
  }

  getConfiguredChannels() {
    return this.channels.map(c => c.name);
  }

  async dispatch(alert, options = {}) {
    const results = {
      alert_id: alert.id,
      timestamp: new Date().toISOString(),
      channels: [],
      success: false,
    };

    // Filter by severity threshold if specified
    const severityOrder = ['low', 'medium', 'high', 'critical'];
    const alertLevel = severityOrder.indexOf(alert.severity);
    const thresholdLevel = severityOrder.indexOf(options.severityThreshold || 'low');
    
    if (alertLevel < thresholdLevel) {
      results.skipped = true;
      results.reason = `Severity ${alert.severity} below threshold ${options.severityThreshold}`;
      return results;
    }

    // Dispatch to all configured channels
    for (const channel of this.channels) {
      try {
        const result = await channel.send(alert);
        results.channels.push({
          name: channel.name,
          ...result,
        });
      } catch (error) {
        results.channels.push({
          name: channel.name,
          success: false,
          error: error.message,
        });
      }
    }

    results.success = results.channels.some(c => c.success);
    return results;
  }

  async dispatchBatch(alerts, options = {}) {
    const results = [];
    
    for (const alert of alerts) {
      // Add small delay between messages to avoid rate limiting
      if (results.length > 0) {
        await new Promise(r => setTimeout(r, 500));
      }
      
      const result = await this.dispatch(alert, options);
      results.push(result);
    }
    
    return {
      total: alerts.length,
      dispatched: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success && !r.skipped).length,
      skipped: results.filter(r => r.skipped).length,
      results,
    };
  }

  async sendDailySummary(summary) {
    const telegram = this.channels.find(c => c.name === 'telegram');
    if (telegram) {
      return await telegram.sendDailySummary(summary);
    }
    return { success: false, error: 'No summary channel configured' };
  }
}

// ============================================================================
// BROWSER NOTIFICATION HELPER (For frontend)
// ============================================================================

export function createBrowserNotification(alert) {
  if (typeof window === 'undefined') return null;
  
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return null;
  }

  if (Notification.permission === 'granted') {
    return new Notification(`👁️ ${alert.title}`, {
      body: alert.message || `${alert.severity.toUpperCase()} - ${alert.category}`,
      icon: '/favicon.ico',
      tag: alert.id,
      requireInteraction: alert.severity === 'critical',
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        return createBrowserNotification(alert);
      }
    });
  }
  
  return null;
}

export default {
  TelegramDelivery,
  DiscordDelivery,
  EmailDelivery,
  WebhookDelivery,
  AlertDispatcher,
  createBrowserNotification,
};
