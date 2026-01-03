/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PROFESSIONAL EMAIL TEMPLATES SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * HTML email templates for different alert severities with professional styling
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Email template factory
 */
class EmailTemplateFactory {
  /**
   * Create an email from an alert
   */
  static createEmailFromAlert(alert, preferences = {}) {
    const templateMethod = `template${alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}`;
    
    if (this[templateMethod]) {
      return this[templateMethod](alert, preferences);
    }
    
    return this.templateMedium(alert, preferences);
  }

  /**
   * CRITICAL severity template - Red, urgent, immediate action required
   */
  static templateCritical(alert, preferences = {}) {
    const { email = 'subscriber@example.com' } = preferences;
    
    return {
      subject: `🚨 CRITICAL ALERT: ${alert.title}`,
      from: process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org',
      to: email,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRITICAL ALERT - The Eye Oracle</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f7f7f7; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%); color: white; padding: 30px 20px; text-align: center; border-bottom: 4px solid #000; }
    .header h1 { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .header p { font-size: 14px; opacity: 0.9; }
    .critical-badge { display: inline-block; background: #fff; color: #c41e3a; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 16px; margin-top: 10px; }
    .content { padding: 30px 20px; }
    .alert-title { font-size: 22px; font-weight: bold; color: #c41e3a; margin-bottom: 15px; border-left: 4px solid #c41e3a; padding-left: 15px; }
    .alert-message { background-color: #fff3cd; border-left: 4px solid #c41e3a; padding: 15px; margin-bottom: 20px; font-size: 16px; line-height: 1.8; }
    .details-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
    .details-table td { padding: 12px; border-bottom: 1px solid #eee; }
    .details-table .label { font-weight: bold; color: #555; width: 30%; }
    .details-table .value { color: #333; }
    .action-required { background: #ffe6e6; border-left: 4px solid #c41e3a; padding: 15px; margin: 20px 0; }
    .action-required h3 { color: #c41e3a; margin-bottom: 10px; font-size: 16px; }
    .action-required ol { margin-left: 20px; }
    .action-required li { margin-bottom: 8px; }
    .cta-button { display: inline-block; background: #c41e3a; color: white; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; cursor: pointer; }
    .cta-button:hover { background: #8b0000; }
    .footer { padding: 20px; background-color: #f0f0f0; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .footer a { color: #c41e3a; text-decoration: none; }
    .urgency-note { background: #c41e3a; color: white; padding: 15px; margin-bottom: 20px; border-radius: 4px; text-align: center; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>👁️ THE EYE ORACLE</h1>
      <p>Critical Rights Violation Alert</p>
      <div class="critical-badge">CRITICAL - IMMEDIATE ACTION REQUIRED</div>
    </div>
    
    <div class="content">
      <div class="urgency-note">
        ⚠️ This requires immediate attention and action
      </div>
      
      <div class="alert-title">
        🚨 ${this.escapeHtml(alert.title)}
      </div>
      
      <div class="alert-message">
        ${this.escapeHtml(alert.message || alert.description || '')}
      </div>
      
      <table class="details-table">
        <tr>
          <td class="label">Severity Level:</td>
          <td class="value"><strong style="color: #c41e3a;">CRITICAL</strong></td>
        </tr>
        <tr>
          <td class="label">Category:</td>
          <td class="value">${this.escapeHtml(alert.category)}</td>
        </tr>
        <tr>
          <td class="label">Scope:</td>
          <td class="value">${this.escapeHtml(alert.scope || alert.jurisdiction || 'Multi-jurisdictional')}</td>
        </tr>
        ${alert.affectedPopulation ? `
        <tr>
          <td class="label">Affected Population:</td>
          <td class="value">${this.escapeHtml(alert.affectedPopulation)}</td>
        </tr>
        ` : ''}
        ${alert.source ? `
        <tr>
          <td class="label">Source:</td>
          <td class="value">${this.escapeHtml(alert.source)}</td>
        </tr>
        ` : ''}
        <tr>
          <td class="label">Reported:</td>
          <td class="value">${new Date(alert.createdAt || Date.now()).toLocaleString()}</td>
        </tr>
      </table>
      
      ${alert.recommendedAction ? `
      <div class="action-required">
        <h3>✓ Recommended Actions</h3>
        ${typeof alert.recommendedAction === 'string' ? 
          `<p>${this.escapeHtml(alert.recommendedAction)}</p>` :
          `<ol>${alert.recommendedAction.map(a => `<li>${this.escapeHtml(a)}</li>`).join('')}</ol>`
        }
      </div>
      ` : ''}
      
      <center>
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}" class="cta-button">
          View Full Alert Details →
        </a>
      </center>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      
      <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
        <strong>Need to manage your notifications?</strong><br>
        You can customize which alerts you receive at any time in your <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/preferences">notification preferences</a>.
      </p>
    </div>
    
    <div class="footer">
      <p><strong>The Eye Oracle</strong> - Injured Workers Unite</p>
      <p>Protecting workers' rights through investigative intelligence</p>
      <p>
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}">Visit Website</a> | 
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/preferences">Manage Preferences</a>
      </p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        This is an automated alert from the Eye Oracle investigative system. 
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/unsubscribe?token=TOKEN_PLACEHOLDER">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
      text: `
CRITICAL ALERT - IMMEDIATE ACTION REQUIRED

${alert.title}

${alert.message || alert.description || ''}

Details:
- Severity: CRITICAL
- Category: ${alert.category}
- Scope: ${alert.scope || alert.jurisdiction || 'Multi-jurisdictional'}
- Reported: ${new Date(alert.createdAt || Date.now()).toLocaleString()}

${alert.recommendedAction ? `Recommended Actions:\n${
  typeof alert.recommendedAction === 'string' ? alert.recommendedAction : alert.recommendedAction.join('\n')
}\n` : ''}

View Full Details: ${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}

---
The Eye Oracle | Injured Workers Unite
      `,
    };
  }

  /**
   * HIGH severity template - Orange, requires attention
   */
  static templateHigh(alert, preferences = {}) {
    const { email = 'subscriber@example.com' } = preferences;
    
    return {
      subject: `🔴 HIGH PRIORITY: ${alert.title}`,
      from: process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org',
      to: email,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HIGH PRIORITY ALERT - The Eye Oracle</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f7f7f7; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #ff6600 0%, #cc5200 100%); color: white; padding: 25px 20px; text-align: center; }
    .header h1 { font-size: 22px; font-weight: bold; margin-bottom: 10px; }
    .priority-badge { display: inline-block; background: #fff; color: #ff6600; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-top: 10px; }
    .content { padding: 25px 20px; }
    .alert-title { font-size: 20px; font-weight: bold; color: #ff6600; margin-bottom: 15px; border-left: 4px solid #ff6600; padding-left: 15px; }
    .alert-message { background-color: #fff9e6; border-left: 4px solid #ff6600; padding: 15px; margin-bottom: 20px; }
    .details-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
    .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
    .details-table .label { font-weight: bold; color: #555; width: 30%; }
    .cta-button { display: inline-block; background: #ff6600; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .cta-button:hover { background: #cc5200; }
    .footer { padding: 20px; background-color: #f0f0f0; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .footer a { color: #ff6600; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>👁️ THE EYE ORACLE</h1>
      <p>High Priority Alert</p>
      <div class="priority-badge">HIGH PRIORITY</div>
    </div>
    
    <div class="content">
      <div class="alert-title">
        🔴 ${this.escapeHtml(alert.title)}
      </div>
      
      <div class="alert-message">
        ${this.escapeHtml(alert.message || alert.description || '')}
      </div>
      
      <table class="details-table">
        <tr>
          <td class="label">Severity:</td>
          <td><strong style="color: #ff6600;">HIGH</strong></td>
        </tr>
        <tr>
          <td class="label">Category:</td>
          <td>${this.escapeHtml(alert.category)}</td>
        </tr>
        <tr>
          <td class="label">Scope:</td>
          <td>${this.escapeHtml(alert.scope || alert.jurisdiction || 'Multi-jurisdictional')}</td>
        </tr>
        ${alert.source ? `
        <tr>
          <td class="label">Source:</td>
          <td>${this.escapeHtml(alert.source)}</td>
        </tr>
        ` : ''}
      </table>
      
      <center>
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}" class="cta-button">
          View Alert Details →
        </a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>The Eye Oracle</strong> - Injured Workers Unite</p>
      <p>
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/preferences">Manage Preferences</a> | 
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}">Visit Website</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };
  }

  /**
   * MEDIUM severity template - Yellow, informational
   */
  static templateMedium(alert, preferences = {}) {
    const { email = 'subscriber@example.com' } = preferences;
    
    return {
      subject: `📢 Alert: ${alert.title}`,
      from: process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org',
      to: email,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alert - The Eye Oracle</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f7f7; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #ffcc00 0%, #ffb300 100%); color: #333; padding: 20px; text-align: center; }
    .header h1 { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
    .content { padding: 25px 20px; }
    .alert-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-left: 4px solid #ffcc00; padding-left: 15px; }
    .alert-message { background-color: #fffbf0; border-left: 4px solid #ffcc00; padding: 15px; margin-bottom: 20px; }
    .details-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
    .details-table td { padding: 10px; border-bottom: 1px solid #eee; }
    .details-table .label { font-weight: bold; color: #555; width: 30%; }
    .cta-button { display: inline-block; background: #ffb300; color: #333; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .footer { padding: 20px; background-color: #f0f0f0; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .footer a { color: #ffb300; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>👁️ THE EYE ORACLE</h1>
      <p>New Alert</p>
    </div>
    
    <div class="content">
      <div class="alert-title">
        📢 ${this.escapeHtml(alert.title)}
      </div>
      
      <div class="alert-message">
        ${this.escapeHtml(alert.message || alert.description || '')}
      </div>
      
      <table class="details-table">
        <tr>
          <td class="label">Category:</td>
          <td>${this.escapeHtml(alert.category)}</td>
        </tr>
        <tr>
          <td class="label">Scope:</td>
          <td>${this.escapeHtml(alert.scope || alert.jurisdiction || 'Multi-jurisdictional')}</td>
        </tr>
      </table>
      
      <center>
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}" class="cta-button">
          View Details →
        </a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>The Eye Oracle</strong> - Injured Workers Unite</p>
      <p><a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/preferences">Manage Preferences</a></p>
    </div>
  </div>
</body>
</html>
      `,
    };
  }

  /**
   * LOW severity template - Green, FYI
   */
  static templateLow(alert, preferences = {}) {
    const { email = 'subscriber@example.com' } = preferences;
    
    return {
      subject: `ℹ️ Notice: ${alert.title}`,
      from: process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org',
      to: email,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notice - The Eye Oracle</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f7f7; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #00cc66 0%, #009950 100%); color: white; padding: 20px; text-align: center; }
    .header h1 { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
    .content { padding: 25px 20px; }
    .alert-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-left: 4px solid #00cc66; padding-left: 15px; }
    .alert-message { background-color: #f0fdf4; border-left: 4px solid #00cc66; padding: 15px; margin-bottom: 20px; }
    .cta-button { display: inline-block; background: #00cc66; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .footer { padding: 20px; background-color: #f0f0f0; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>👁️ THE EYE ORACLE</h1>
      <p>Notice</p>
    </div>
    
    <div class="content">
      <div class="alert-title">
        ℹ️ ${this.escapeHtml(alert.title)}
      </div>
      
      <div class="alert-message">
        ${this.escapeHtml(alert.message || alert.description || '')}
      </div>
      
      <center>
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts" class="cta-button">
          View All Alerts →
        </a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>The Eye Oracle</strong> - Injured Workers Unite</p>
    </div>
  </div>
</body>
</html>
      `,
    };
  }

  /**
   * Daily digest template
   */
  static templateDigest(alerts, preferences = {}) {
    const { email = 'subscriber@example.com' } = preferences;
    const today = new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const alertsByCategory = {};
    alerts.forEach(alert => {
      if (!alertsByCategory[alert.category]) {
        alertsByCategory[alert.category] = [];
      }
      alertsByCategory[alert.category].push(alert);
    });

    const alertsHtml = Object.entries(alertsByCategory).map(([category, categoryAlerts]) => `
      <h3 style="color: #333; margin-top: 20px; margin-bottom: 10px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px;">
        ${this.escapeHtml(category)}
      </h3>
      <ul style="margin-left: 20px;">
        ${categoryAlerts.map(alert => `
          <li style="margin-bottom: 12px;">
            <strong>${this.escapeHtml(alert.title)}</strong><br>
            <small style="color: #666;">${this.escapeHtml(alert.message || alert.description || '')</small><br>
            <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts/${alert.id}" style="color: #007bff; text-decoration: none; font-size: 12px;">View →</a>
          </li>
        `).join('')}
      </ul>
    `).join('');

    return {
      subject: `📊 Daily Summary - ${today}`,
      from: process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org',
      to: email,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Digest - The Eye Oracle</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f7f7; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 25px 20px; text-align: center; }
    .content { padding: 25px 20px; }
    .summary-stats { display: flex; justify-content: space-around; margin-bottom: 30px; text-align: center; }
    .stat { flex: 1; }
    .stat-number { font-size: 28px; font-weight: bold; color: #007bff; }
    .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
    .footer { padding: 20px; background-color: #f0f0f0; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>👁️ THE EYE ORACLE</h1>
      <p>Daily Summary - ${today}</p>
    </div>
    
    <div class="content">
      <div class="summary-stats">
        <div class="stat">
          <div class="stat-number">${alerts.filter(a => a.severity === 'critical').length}</div>
          <div class="stat-label">Critical</div>
        </div>
        <div class="stat">
          <div class="stat-number">${alerts.filter(a => a.severity === 'high').length}</div>
          <div class="stat-label">High</div>
        </div>
        <div class="stat">
          <div class="stat-number">${alerts.filter(a => a.severity === 'medium').length}</div>
          <div class="stat-label">Medium</div>
        </div>
        <div class="stat">
          <div class="stat-number">${alerts.length}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
      
      ${alertsHtml}
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/alerts" style="color: #007bff; text-decoration: none; font-weight: bold;">View All Alerts →</a>
      </p>
    </div>
    
    <div class="footer">
      <p><strong>The Eye Oracle</strong> - Injured Workers Unite</p>
      <p><a href="${process.env.SITE_URL || 'https://injuredworkersunite.pages.dev'}/preferences">Manage Preferences</a></p>
    </div>
  </div>
</body>
</html>
      `,
    };
  }

  /**
   * Helper: Escape HTML
   */
  static escapeHtml(text) {
    const div = document.createElement ? document.createElement('div') : null;
    if (div) {
      div.textContent = text;
      return div.innerHTML;
    }
    // Fallback for non-browser environments
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

module.exports = {
  EmailTemplateFactory,
};
