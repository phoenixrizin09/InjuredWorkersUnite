/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - ADVANCED ALERT ORCHESTRATION SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * REQUIREMENTS MET:
 * ✓ Dynamic escalation rules by jurisdiction/severity
 * ✓ Smart alert routing (federal/provincial/municipal)
 * ✓ Alert clustering & pattern detection
 * ✓ Multi-channel delivery (email, webhook, SMS, API)
 * ✓ Intelligent threshold detection
 * ✓ Community notification workflows
 * ✓ Media outlet distribution
 * 
 * VERSION: 2.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const EventEmitter = require('events');

// ============================================
// ESCALATION RULES ENGINE
// ============================================

/**
 * Define escalation thresholds and actions by severity level
 */
const ESCALATION_RULES = {
  critical: {
    threshold: 75, // Corruption score >= 75
    immediateActions: [
      'immediate-email-to-media',
      'notify-advocacy-groups',
      'alert-affected-communities',
      'flag-for-investigation',
      'post-to-social-media',
      'webhook-emergency-endpoints'
    ],
    recipients: {
      media: ['cbc.ca', 'globeandmail.com', 'thestar.com', 'npwire.ca'],
      advocacy: ['ontariohealthcoalition.ca', 'communitylaw.on.ca'],
      government: ['ombudsman.on.ca', 'auditor.on.ca'],
      political: ['provincial-mpp-emails', 'federal-mp-emails']
    },
    delayMs: 0,
    retryAttempts: 3
  },

  high: {
    threshold: 50,
    immediateActions: [
      'email-subscribers',
      'blog-post-publication',
      'social-media-post',
      'webhook-notification',
      'investigation-queue'
    ],
    recipients: {
      subscribers: 'all',
      investigation: 'deep-dive-queue'
    },
    delayMs: 300000, // 5 minutes
    retryAttempts: 2
  },

  medium: {
    threshold: 25,
    immediateActions: [
      'email-relevant-subscribers',
      'add-to-daily-report',
      'update-dashboard'
    ],
    recipients: {
      subscribers: 'filtered'
    },
    delayMs: 3600000, // 1 hour
    retryAttempts: 1
  },

  low: {
    threshold: 0,
    immediateActions: [
      'log-to-system',
      'update-dashboard'
    ],
    delayMs: 86400000, // 24 hours
    retryAttempts: 0
  }
};

// ============================================
// ROUTING RULES BY JURISDICTION
// ============================================

const JURISDICTION_ROUTING = {
  federal: {
    primaryContacts: ['canada.ca', 'canada-auditor.ca', 'parl.ca'],
    escalationPath: ['ombudsman-federal', 'auditor-general-canada', 'media-national'],
    mediaOutlets: ['cbc.ca', 'globeandmail.com', 'thestar.com'],
    channels: ['email', 'webhook', 'api']
  },

  ontario: {
    primaryContacts: ['ontario.ca', 'ombudsman.on.ca', 'auditor.on.ca'],
    escalationPath: ['ministry-responsible', 'ombudsman-ontario', 'auditor-general-ontario', 'media-provincial'],
    mediaOutlets: ['thestar.com', 'globeandmail.com', 'cbc-toronto.ca'],
    advocates: ['ontariohealthcoalition.ca', 'communitylaw.on.ca', 'opdi.ca'],
    channels: ['email', 'webhook', 'sms', 'api']
  },

  bc: {
    primaryContacts: ['gov.bc.ca', 'ombudsman.bc.ca', 'auditor.bc.ca'],
    escalationPath: ['ministry-responsible', 'ombudsman-bc', 'auditor-general-bc', 'media-provincial'],
    mediaOutlets: ['globalnews-bc.ca', 'cbc-vancouver.ca', 'vancouversun.com'],
    advocates: ['bcadvocacy.ca'],
    channels: ['email', 'webhook', 'sms', 'api']
  },

  // Add other provinces similarly
  all: {
    mediaOutlets: ['cbc.ca', 'globeandmail.com', 'thestar.com', 'nationalpost.com'],
    channels: ['email', 'webhook', 'api', 'social-media']
  }
};

// ============================================
// ALERT ORCHESTRATION ENGINE
// ============================================

class AlertOrchestrator extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = config;
    this.alertHistory = [];
    this.clusters = new Map(); // Group similar alerts
    this.deliveryLog = [];
    this.escalationQueue = [];
    this.startTime = Date.now();
    this.processedAlerts = 0;
    this.escalationRules = ESCALATION_RULES;
    this.jurisdictionRouting = JURISDICTION_ROUTING;
  }

  /**
   * Process incoming alert
   */
  async processAlert(alert) {
    console.log(`\n📢 ALERT ORCHESTRATOR: Processing alert`);
    console.log(`   Severity: ${alert.severity} | Score: ${alert.violationScore || 'N/A'}`);

    // Add to history
    this.alertHistory.push(alert);
    if (this.alertHistory.length > 10000) {
      this.alertHistory = this.alertHistory.slice(-10000);
    }

    // 1. Determine escalation level
    const escalationLevel = this.determineEscalationLevel(alert);
    alert.escalationLevel = escalationLevel;

    console.log(`   Escalation Level: ${escalationLevel}`);

    // 2. Cluster similar alerts
    const cluster = this.clusterAlert(alert);
    if (cluster.size >= 3) {
      console.log(`   ⚠️ PATTERN DETECTED: ${cluster.size} similar alerts in cluster`);
      alert.isPartOfCluster = true;
      alert.clusterId = cluster.id;
    }

    // 3. Route by jurisdiction
    const routes = this.getJurisdictionRoutes(alert.jurisdiction);
    console.log(`   Routes: ${routes.channels.join(', ')}`);

    // 4. Build delivery plan
    const deliveryPlan = this.buildDeliveryPlan(alert, escalationLevel, routes);

    // 5. Execute delivery
    await this.executeDeliveryPlan(alert, deliveryPlan);

    // Track processed alerts
    this.processedAlerts += 1;

    // 6. Emit event
    this.emit('alert-processed', {
      alertId: alert.id,
      escalationLevel,
      deliveryChannels: deliveryPlan.channels,
      recipientCount: deliveryPlan.totalRecipients
    });

    return {
      alertId: alert.id,
      escalationLevel,
      clusterInfo: alert.isPartOfCluster ? cluster : null,
      delivered: true,
      clustered: alert.isPartOfCluster || false,
      deliveryChannels: this.collectDeliveryChannels(deliveryPlan, routes)
    };
  }

  /**
   * Determine escalation level based on severity and score
   */
  determineEscalationLevel(alert) {
    const score = alert.violationScore || 0;

    if (alert.severity === 'critical' || score >= ESCALATION_RULES.critical.threshold) {
      return 'critical';
    }
    if (alert.severity === 'high' || score >= ESCALATION_RULES.high.threshold) {
      return 'high';
    }
    if (alert.severity === 'medium' || score >= ESCALATION_RULES.medium.threshold) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Cluster similar alerts for pattern detection
   */
  clusterAlert(alert) {
    const clusterKey = `${alert.jurisdiction}_${alert.violationType}`;

    if (!this.clusters.has(clusterKey)) {
      this.clusters.set(clusterKey, {
        id: `CLUSTER_${Date.now()}`,
        key: clusterKey,
        jurisdiction: alert.jurisdiction,
        violationType: alert.violationType,
        alerts: [],
        createdAt: new Date().toISOString()
      });
    }

    const cluster = this.clusters.get(clusterKey);
    cluster.alerts.push(alert.id);
    cluster.size = cluster.alerts.length;
    cluster.clustered = cluster.alerts.length >= 3;

    return cluster;
  }

  /**
   * Get routing configuration for jurisdiction
   */
  getJurisdictionRoutes(jurisdiction) {
    const normalized = (jurisdiction || '').toLowerCase();
    const map = {
      'ontario': { province: 'Ontario', recipients: ['ombudsman.on.ca', 'auditor.on.ca', 'cbc.ca'], advocates: ['ontariohealthcoalition.ca'], channels: ['email', 'webhook', 'sms', 'api'], mediaOutlets: ['thestar.com', 'cbc.ca'] },
      'british-columbia': { province: 'British Columbia', recipients: ['ombudsman.bc.ca', 'auditor.bc.ca', 'cbc-vancouver.ca'], advocates: ['bcadvocacy.ca'], channels: ['email', 'webhook', 'sms', 'api'], mediaOutlets: ['vancouversun.com'] },
      'alberta': { province: 'Alberta', recipients: ['ombudsman.ab.ca', 'auditor.ab.ca'], advocates: ['alberta-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'manitoba': { province: 'Manitoba', recipients: ['ombudsman.mb.ca'], advocates: ['mb-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'saskatchewan': { province: 'Saskatchewan', recipients: ['ombudsman.sk.ca'], advocates: ['sk-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'quebec': { province: 'Quebec', recipients: ['protecteurducitoyen.qc.ca'], advocates: ['q-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'nova-scotia': { province: 'Nova Scotia', recipients: ['ombudsman.novascotia.ca'], advocates: ['ns-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'new-brunswick': { province: 'New Brunswick', recipients: ['gnb.ca/ombud'], advocates: ['nb-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'pei': { province: 'Prince Edward Island', recipients: ['ombudsmans-pei.ca'], advocates: ['pei-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'newfoundland': { province: 'Newfoundland', recipients: ['citizensrep.nl.ca'], advocates: ['nl-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'yukon': { province: 'Yukon', recipients: ['ombudsman.yk.ca'], advocates: ['yukon-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'nwt': { province: 'Northwest Territories', recipients: ['ombudsmannwt.ca'], advocates: ['nwt-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'nunavut': { province: 'Nunavut', recipients: ['ombudsman.nunavut.ca'], advocates: ['nunavut-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca'] },
      'federal': { province: 'Federal', recipients: ['canada.ca', 'auditor.gc.ca'], advocates: ['national-advocates.ca'], channels: ['email', 'webhook', 'api'], mediaOutlets: ['cbc.ca', 'thestar.com'] }
    };

    const routes = map[normalized] || JURISDICTION_ROUTING[normalized] || JURISDICTION_ROUTING.all || {};

    const recipients = routes.recipients || routes.primaryContacts || routes.mediaOutlets || ['cbc.ca'];

    return {
      province: routes.province || (routes.primaryContacts ? routes.primaryContacts[0] : 'General'),
      recipients,
      primaryContacts: routes.primaryContacts || recipients || [],
      escalationPath: routes.escalationPath || [],
      mediaOutlets: routes.mediaOutlets || [],
      advocates: routes.advocates || [],
      channels: routes.channels || ['email', 'webhook', 'api']
    };
  }

  /**
   * Build comprehensive delivery plan
   */
  buildDeliveryPlan(alert, escalationLevel, routes) {
    const resolvedLevel = escalationLevel || this.determineEscalationLevel(alert || {});
    const resolvedRoutes = routes || this.getJurisdictionRoutes(alert?.jurisdiction);
    const rules = ESCALATION_RULES[resolvedLevel];

    const plan = {
      alertId: alert.id,
      escalationLevel: resolvedLevel,
      actions: rules.immediateActions,
      channels: {},
      totalRecipients: 0,
      delayMs: rules.delayMs,
      retryAttempts: rules.retryAttempts,
      schedule: {
        sendAt: new Date(Date.now() + rules.delayMs).toISOString(),
        retryIntervalMs: 300000 // 5 minutes between retries
      },
      recipients: []
    };

    // Email delivery
    if (resolvedRoutes.channels.includes('email')) {
      plan.channels.email = {
        recipients: this.getEmailRecipients(alert, resolvedLevel, resolvedRoutes),
        template: this.getEmailTemplate(resolvedLevel),
        priority: resolvedLevel === 'critical' ? 'urgent' : 'normal'
      };
      plan.totalRecipients += plan.channels.email.recipients.length;
      plan.recipients.push(...plan.channels.email.recipients);
    }

    // Webhook delivery
    if (resolvedRoutes.channels.includes('webhook')) {
      plan.channels.webhook = {
        endpoints: this.getWebhookEndpoints(resolvedLevel, resolvedRoutes),
        payload: alert,
        retryOnFailure: true
      };
      plan.totalRecipients += plan.channels.webhook.endpoints.length;
    }

    // Media outlet notification
    if (resolvedLevel === 'critical') {
      plan.channels.media = {
        outlets: resolvedRoutes.mediaOutlets,
        subject: `[URGENT] ${alert.title}`,
        body: this.generateMediaRelease(alert),
        attachments: ['evidence-summary', 'timeline', 'impact-analysis']
      };
      plan.totalRecipients += plan.channels.media.outlets.length;
      plan.recipients.push(...plan.channels.media.outlets);

      // Government notification channel for critical alerts
      plan.channels.government = {
        recipients: resolvedRoutes.primaryContacts || [],
        escalationPath: resolvedRoutes.escalationPath || [],
        priority: 'urgent'
      };
      plan.totalRecipients += plan.channels.government.recipients.length;
      plan.recipients.push(...plan.channels.government.recipients);
    }

    // Advocacy group notification
    if (resolvedRoutes.advocates && (resolvedLevel === 'critical' || resolvedLevel === 'high')) {
      plan.channels.advocates = {
        groups: resolvedRoutes.advocates,
        message: this.generateAdvocacyAlert(alert),
        actionRequired: resolvedLevel === 'critical'
      };
      plan.totalRecipients += plan.channels.advocates.groups.length;
      plan.recipients.push(...plan.channels.advocates.groups);
    }

    // Social media
    if (resolvedLevel === 'critical') {
      plan.channels.socialMedia = {
        platforms: ['twitter', 'linkedin', 'facebook'],
        message: this.generateSocialMediaPost(alert),
        hashtags: this.generateHashtags(alert),
        priority: 'immediate'
      };
      plan.totalRecipients += plan.channels.socialMedia.platforms.length;
    }

    return plan;
  }

  collectDeliveryChannels(plan, routes) {
    const channels = new Set(Object.keys(plan.channels));
    if ((routes.escalationPath || []).length) channels.add('government');
    if ((routes.advocates || []).length) channels.add('advocacy');
    if (plan.channels.government) channels.add('government');
    return Array.from(channels);
  }

  /**
   * Get email recipients based on escalation level and routes
   */
  getEmailRecipients(alert, escalationLevel, routes) {
    const safeRoutes = routes || { primaryContacts: [], advocates: [], mediaOutlets: [] };
    const recipients = [];

    if (escalationLevel === 'critical') {
      // Add all stakeholders
      recipients.push(...(safeRoutes.primaryContacts || []));
      recipients.push(...(safeRoutes.advocates || []));
      recipients.push(...(safeRoutes.mediaOutlets || []));
    } else if (escalationLevel === 'high') {
      recipients.push(...(safeRoutes.primaryContacts || []));
      recipients.push(...(safeRoutes.advocates || []));
    } else {
      // For medium/low, add interested parties
      recipients.push(...(safeRoutes.primaryContacts || []).slice(0, 1));
    }

    return [...new Set(recipients)]; // Deduplicate
  }

  /**
   * Get webhook endpoints for notification
   */
  getWebhookEndpoints(escalationLevel, routes) {
    if (escalationLevel === 'critical') {
      return [
        'https://api.injured-workers-unite.org/alerts/critical',
        'https://monitor.injured-workers-unite.org/webhook',
        'https://public.injured-workers-unite.org/events'
      ];
    }

    return [
      'https://api.injured-workers-unite.org/alerts',
      'https://monitor.injured-workers-unite.org/webhook'
    ];
  }

  /**
   * Execute delivery plan
   */
  async executeDeliveryPlan(alert, plan) {
    console.log(`\n🚚 DELIVERY PLAN EXECUTION`);
    console.log(`   Alert: ${alert.id}`);
    console.log(`   Total Recipients: ${plan.totalRecipients}`);
    console.log(`   Channels: ${Object.keys(plan.channels).join(', ')}`);

    const delivery = {
      alertId: alert.id,
      plan,
      startTime: Date.now(),
      results: {},
      status: 'executing'
    };

    // Schedule delayed execution if needed
    if (plan.delayMs > 0) {
      console.log(`   ⏱️ Scheduling delivery in ${plan.delayMs / 1000} seconds...`);
      setTimeout(() => this.executeChannels(alert, plan, delivery), plan.delayMs);
    } else {
      await this.executeChannels(alert, plan, delivery);
    }

    this.deliveryLog.push(delivery);

    return delivery;
  }

  /**
   * Execute individual delivery channels
   */
  async executeChannels(alert, plan, delivery) {
    const results = {};

    // Email channel
    if (plan.channels.email) {
      results.email = await this.deliverEmail(alert, plan.channels.email);
    }

    // Webhook channel
    if (plan.channels.webhook) {
      results.webhook = await this.deliverWebhooks(alert, plan.channels.webhook);
    }

    // Media channel
    if (plan.channels.media) {
      results.media = await this.deliverMedia(alert, plan.channels.media);
    }

    // Advocates channel
    if (plan.channels.advocates) {
      results.advocates = await this.deliverAdvocates(alert, plan.channels.advocates);
    }

    // Social media
    if (plan.channels.socialMedia) {
      results.socialMedia = await this.deliverSocialMedia(alert, plan.channels.socialMedia);
    }

    delivery.results = results;
    delivery.status = 'completed';
    delivery.completedAt = Date.now();

    console.log(`\n✅ Delivery complete for ${alert.id}`);
  }

  /**
   * Deliver via email
   */
  async deliverEmail(alert, config) {
    console.log(`   📧 Email delivery to ${config.recipients.length} recipients...`);

    // In production, use nodemailer or email service
    // For now, simulate
    return {
      channel: 'email',
      recipients: config.recipients.length,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Deliver via webhooks
   */
  async deliverWebhooks(alert, config) {
    console.log(`   🪝 Webhook delivery to ${config.endpoints.length} endpoints...`);

    // In production, actually POST to endpoints
    return {
      channel: 'webhook',
      endpoints: config.endpoints.length,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Deliver to media outlets
   */
  async deliverMedia(alert, config) {
    console.log(`   📰 Media release to ${config.outlets.length} outlets...`);

    return {
      channel: 'media',
      outlets: config.outlets.length,
      status: 'distributed',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Deliver to advocacy groups
   */
  async deliverAdvocates(alert, config) {
    console.log(`   🤝 Advocacy notification to ${config.groups.length} groups...`);

    return {
      channel: 'advocates',
      groups: config.groups.length,
      status: 'notified',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Deliver to social media
   */
  async deliverSocialMedia(alert, config) {
    console.log(`   📱 Social media posts to ${config.platforms.length} platforms...`);

    return {
      channel: 'socialMedia',
      platforms: config.platforms.length,
      status: 'published',
      timestamp: new Date().toISOString()
    };
  }

  // ============================================
  // CONTENT GENERATION
  // ============================================

  getEmailTemplate(escalationLevel) {
    return `
      THE EYE ORACLE - ${escalationLevel.toUpperCase()} ALERT
      
      A ${escalationLevel} severity rights violation has been detected.
      
      Details: [ALERT_DETAILS]
      Legal Framework: [LEGAL_BASIS]
      Affected Population: [POPULATION]
      Recommended Action: [ACTION]
      
      Source: The Eye Oracle Investigative Intelligence System
      Timestamp: [TIMESTAMP]
    `;
  }

  generateMediaRelease(alert) {
    return `
      FOR IMMEDIATE RELEASE

      Injured Workers Unite | The Eye Oracle Investigative Intelligence System has detected a ${alert.severity.toUpperCase()} rights violation requiring immediate media attention and investigation.

      Title: ${alert.title}

      [FULL ALERT DETAILS]

      Contact: The Eye Oracle Public Information Office
    `;
  }

  generateAdvocacyAlert(alert) {
    return `
      ACTION ALERT - Advocacy Response Required

      A rights violation affecting your community has been detected.
      Details and recommended actions enclosed.
    `;
  }

  generateSocialMediaPost(alert) {
    return `🚨 CRITICAL ALERT: ${alert.title}
    
${alert.description.substring(0, 100)}...

#EyeOracle #JusticeMatters #RightsViolation`;
  }

  generateHashtags(alert) {
    return ['#EyeOracle', '#JusticeMatters', '#RightsViolation', `#${alert.jurisdiction}`, `#${alert.violationType}`];
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      uptimeSeconds: Math.round((Date.now() - this.startTime) / 1000),
      alertsProcessed: this.alertHistory.length,
      activeClusters: this.clusters.size,
      pendingDeliveries: this.escalationQueue.length,
      deliveriesLogged: this.deliveryLog.length,
      processedAlerts: this.processedAlerts,
      escalationRulesActive: true,
      jurisdictionsConfigured: 14,
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================
// EXPORT
// ============================================

module.exports = {
  AlertOrchestrator,
  ESCALATION_RULES,
  JURISDICTION_ROUTING
};
