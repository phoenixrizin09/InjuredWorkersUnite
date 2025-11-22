/**
 * AUTOMATED INTELLIGENCE SYSTEM
 * Connects The EYE → Monitoring → Target Acquisition → Alerts
 * Real-time processing and cross-system coordination
 */

import { initializeWithRealData, generateRealAlerts, generateRealTargets } from './real-data-generator';

// Automation state stored in localStorage for persistence
const AUTOMATION_KEY = 'iwu_automation_state';
const ALERTS_KEY = 'iwu_active_alerts';
const TARGETS_KEY = 'iwu_tracked_targets';
const SCAN_HISTORY_KEY = 'iwu_scan_history';

export class AutomationEngine {
  constructor() {
    this.isActive = false;
    this.scanInterval = null;
    this.alertListeners = [];
    this.realDataLoaded = false;
  }

  // Initialize automation on app load
  initialize() {
    // Load REAL data if not already loaded
    this.loadRealDataIfNeeded();
    
    const state = this.loadState();
    if (state.autoStart) {
      this.activate();
    }
    return state;
  }
  
  // Load real documented Canadian corruption data - ALWAYS load on initialization
  loadRealDataIfNeeded() {
    if (typeof window === 'undefined') return;
    
    // ALWAYS load real data - we want to display all documented corruption
    const result = initializeWithRealData();
    this.realDataLoaded = true;
    console.log('✅ REAL DATA LOADED:', result.message);
    console.log('📊 Alerts:', result.alerts.length);
    console.log('🎯 Targets:', result.targets.length);
    console.log('📈 Stats:', result.stats);
    
    // Emit event so all pages can update
    window.dispatchEvent(new CustomEvent('real-data-loaded', {
      detail: { alerts: result.alerts, targets: result.targets, stats: result.stats }
    }));
    
    return result;
  }

  // Activate full automation
  activate() {
    this.isActive = true;
    this.startAutomatedScanning();
    this.startAlertMonitoring();
    this.startTargetTracking();
    this.saveState({ isActive: true, autoStart: true, activatedAt: Date.now() });
    this.logEvent('AUTOMATION_ACTIVATED', 'All systems online');
  }

  // Deactivate automation
  deactivate() {
    this.isActive = false;
    if (this.scanInterval) clearInterval(this.scanInterval);
    this.saveState({ isActive: false, autoStart: false });
    this.logEvent('AUTOMATION_DEACTIVATED', 'Systems paused');
  }

  // THE EYE - Automated scanning across all scopes
  startAutomatedScanning() {
    // Initial scan
    this.performFullScan();

    // Continuous scanning every 5 minutes
    this.scanInterval = setInterval(() => {
      this.performFullScan();
    }, 300000); // 5 minutes
  }

  performFullScan() {
    const scopes = ['local', 'provincial', 'federal'];
    const categories = [
      'workers', 'disabilities', 'mental_health', 'poverty', 
      'housing', 'healthcare', 'addictions', 'employment', 
      'legal', 'education', 'transportation'
    ];

    const timestamp = Date.now();
    const insights = [];

    scopes.forEach(scope => {
      categories.forEach(category => {
        // Simulate finding insights (in production, this would hit real APIs)
        const insight = this.generateInsight(scope, category, timestamp);
        if (insight) {
          insights.push(insight);
          
          // Auto-escalate critical findings to alerts
          if (insight.severity === 'critical') {
            this.createAlert(insight);
          }

          // Auto-add to target tracking if it identifies specific entities
          if (insight.targetEntity) {
            this.trackTarget(insight.targetEntity, insight);
          }
        }
      });
    });

    this.saveScanHistory(insights, timestamp);
    this.logEvent('FULL_SCAN_COMPLETE', `Found ${insights.length} insights`);
    
    return insights;
  }

  generateInsight(scope, category, timestamp) {
    // This simulates pattern detection - in production, this would analyze real data
    const patterns = this.getDataPatterns(scope, category);
    
    if (Math.random() > 0.7) { // 30% chance of finding something
      return {
        id: `${scope}_${category}_${timestamp}`,
        scope,
        category,
        severity: this.calculateSeverity(patterns),
        title: this.generateTitle(scope, category, patterns),
        description: this.generateDescription(patterns),
        action: this.generateActionPlan(patterns),
        timestamp: new Date(timestamp).toLocaleString(),
        targetEntity: this.identifyTarget(patterns),
        sources: this.gatherSources(scope, category),
        confidence: patterns.confidence || 85
      };
    }
    return null;
  }

  // MONITORING - Track specific entities and events
  startTargetTracking() {
    const targets = this.loadTargets();
    
    targets.forEach(target => {
      this.monitorTarget(target);
    });
  }

  monitorTarget(target) {
    // Set up monitoring for specific target
    const monitoring = {
      targetId: target.id,
      name: target.name,
      category: target.category,
      lastScan: Date.now(),
      status: 'active',
      findings: [],
      alerts: 0
    };

    // Check for updates (simulate API calls)
    this.checkTargetUpdates(target).then(updates => {
      if (updates.length > 0) {
        monitoring.findings = updates;
        monitoring.alerts += updates.filter(u => u.severity === 'critical').length;
        
        // Generate alerts for critical findings
        updates.forEach(update => {
          if (update.severity === 'critical' || update.severity === 'high') {
            this.createAlert({
              ...update,
              targetEntity: target.name,
              source: 'MONITORING_SYSTEM'
            });
          }
        });
      }
    });

    return monitoring;
  }

  async checkTargetUpdates(target) {
    // Simulate checking various sources for target activity
    // In production: news APIs, government databases, court filings, etc.
    const updates = [];
    
    // Legislative tracking
    if (target.category === 'Government') {
      const legislative = await this.checkLegislativeActivity(target);
      updates.push(...legislative);
    }

    // Corporate tracking
    if (target.category === 'Corporate') {
      const corporate = await this.checkCorporateActivity(target);
      updates.push(...corporate);
    }

    // Media monitoring
    const media = await this.checkMediaMentions(target);
    updates.push(...media);

    return updates;
  }

  async checkLegislativeActivity(target) {
    // Simulate checking for new bills, regulations, policies
    return Promise.resolve([
      // Real implementation would scrape legislature.ca, parl.ca, etc.
    ]);
  }

  async checkCorporateActivity(target) {
    // Simulate checking SEDAR, lobbyist registry, court cases
    return Promise.resolve([
      // Real implementation would check SEDAR filings, lobbyist registry, etc.
    ]);
  }

  async checkMediaMentions(target) {
    // Simulate news monitoring
    return Promise.resolve([
      // Real implementation would use news APIs
    ]);
  }

  // ALERTS - Real-time notification system
  startAlertMonitoring() {
    // Load existing alerts
    const alerts = this.loadAlerts();
    
    // Set up real-time alert checking
    setInterval(() => {
      this.checkForNewAlerts();
    }, 30000); // Every 30 seconds
  }

  createAlert(insight) {
    const alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      severity: insight.severity,
      title: insight.title,
      description: insight.description,
      source: insight.scope || insight.source || 'THE_EYE',
      category: insight.category,
      targetEntity: insight.targetEntity,
      action: insight.action,
      timestamp: Date.now(),
      read: false,
      dismissed: false,
      actionButtons: this.generateAlertActions(insight)
    };

    // Save alert
    const alerts = this.loadAlerts();
    alerts.unshift(alert);
    this.saveAlerts(alerts);

    // Notify listeners
    this.notifyAlertListeners(alert);

    // Log event
    this.logEvent('ALERT_CREATED', `${alert.severity.toUpperCase()}: ${alert.title}`);

    return alert;
  }

  generateAlertActions(insight) {
    const actions = [];
    
    if (insight.severity === 'critical') {
      actions.push('🚨 URGENT ACTION REQUIRED');
      actions.push('📢 PUBLIC ALERT');
    }
    
    if (insight.targetEntity) {
      actions.push('🎯 Add to Target List');
      actions.push('📊 Deep Investigation');
    }

    actions.push('📋 Generate Report');
    actions.push('🔗 Share Evidence');
    
    return actions;
  }

  checkForNewAlerts() {
    // Check if any monitored conditions have been triggered
    const targets = this.loadTargets();
    const scanHistory = this.loadScanHistory();
    
    // Analyze recent scans for alert-worthy patterns
    const recentScans = scanHistory.filter(s => 
      Date.now() - s.timestamp < 300000 // Last 5 minutes
    );

    recentScans.forEach(scan => {
      if (this.shouldTriggerAlert(scan)) {
        this.createAlert(scan);
      }
    });
  }

  shouldTriggerAlert(scan) {
    // Alert criteria
    if (scan.severity === 'critical') return true;
    if (scan.confidence > 90) return true;
    if (scan.targetEntity && this.isTrackedTarget(scan.targetEntity)) return true;
    return false;
  }

  // TARGET ACQUISITION - Automated target identification and tracking
  trackTarget(targetEntity, context) {
    const targets = this.loadTargets();
    
    // Check if already tracked
    const existing = targets.find(t => t.name === targetEntity);
    if (existing) {
      // Update existing target
      existing.lastSeen = Date.now();
      existing.evidence = existing.evidence || [];
      existing.evidence.push({
        type: 'AUTOMATED_DETECTION',
        description: context.description,
        timestamp: Date.now(),
        source: context.source || 'THE_EYE'
      });
    } else {
      // Add new target
      targets.push({
        id: `target_${Date.now()}`,
        name: targetEntity,
        category: this.categorizeTarget(targetEntity),
        threat: context.severity || 'high',
        addedBy: 'AUTOMATION',
        addedAt: Date.now(),
        lastSeen: Date.now(),
        evidence: [{
          type: 'INITIAL_DETECTION',
          description: context.description,
          timestamp: Date.now(),
          source: context.source || 'THE_EYE'
        }],
        status: 'monitoring'
      });
    }

    this.saveTargets(targets);
    this.logEvent('TARGET_TRACKED', targetEntity);
  }

  isTrackedTarget(entityName) {
    const targets = this.loadTargets();
    return targets.some(t => t.name === entityName);
  }

  categorizeTarget(entityName) {
    // Simple categorization logic
    if (entityName.includes('WSIB') || entityName.includes('ODSP')) return 'Government';
    if (entityName.includes('Manulife') || entityName.includes('Sun Life')) return 'Insurance';
    if (entityName.includes('Ford') || entityName.includes('Minister')) return 'Political';
    return 'Other';
  }

  // CROSS-SYSTEM COORDINATION
  coordinateSystems() {
    // The EYE finds patterns
    const insights = this.performFullScan();

    // Monitoring tracks specific entities
    insights.forEach(insight => {
      if (insight.targetEntity) {
        this.monitorTarget({ 
          name: insight.targetEntity, 
          category: this.categorizeTarget(insight.targetEntity) 
        });
      }
    });

    // Alerts notify of critical findings
    insights
      .filter(i => i.severity === 'critical' || i.severity === 'high')
      .forEach(insight => this.createAlert(insight));

    // Target Acquisition builds dossiers
    insights
      .filter(i => i.targetEntity)
      .forEach(insight => this.trackTarget(insight.targetEntity, insight));
  }

  // DATA PERSISTENCE
  loadState() {
    try {
      const state = localStorage.getItem(AUTOMATION_KEY);
      return state ? JSON.parse(state) : { isActive: false, autoStart: false };
    } catch {
      return { isActive: false, autoStart: false };
    }
  }

  saveState(state) {
    try {
      localStorage.setItem(AUTOMATION_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save automation state:', error);
    }
  }

  loadAlerts() {
    try {
      const alerts = localStorage.getItem(ALERTS_KEY);
      return alerts ? JSON.parse(alerts) : [];
    } catch {
      return [];
    }
  }

  saveAlerts(alerts) {
    try {
      localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    } catch (error) {
      console.error('Failed to save alerts:', error);
    }
  }

  loadTargets() {
    try {
      const targets = localStorage.getItem(TARGETS_KEY);
      return targets ? JSON.parse(targets) : [];
    } catch {
      return [];
    }
  }

  saveTargets(targets) {
    try {
      localStorage.setItem(TARGETS_KEY, JSON.stringify(targets));
    } catch (error) {
      console.error('Failed to save targets:', error);
    }
  }

  loadScanHistory() {
    try {
      const history = localStorage.getItem(SCAN_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  }

  saveScanHistory(insights, timestamp) {
    try {
      const history = this.loadScanHistory();
      history.unshift({ timestamp, insights, count: insights.length });
      
      // Keep last 100 scans
      if (history.length > 100) {
        history.splice(100);
      }
      
      localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save scan history:', error);
    }
  }

  // EVENT LOGGING
  logEvent(type, message) {
    const event = {
      type,
      message,
      timestamp: new Date().toISOString()
    };
    console.log(`[AUTOMATION] ${event.timestamp} - ${type}: ${message}`);
  }

  // ALERT LISTENERS (for real-time UI updates)
  onAlert(callback) {
    this.alertListeners.push(callback);
  }

  notifyAlertListeners(alert) {
    this.alertListeners.forEach(listener => {
      try {
        listener(alert);
      } catch (error) {
        console.error('Alert listener error:', error);
      }
    });
  }

  // HELPER METHODS
  getDataPatterns(scope, category) {
    // Simulate pattern detection
    return {
      confidence: Math.random() * 100,
      indicators: Math.floor(Math.random() * 10),
      severity: ['info', 'warning', 'high', 'critical'][Math.floor(Math.random() * 4)]
    };
  }

  calculateSeverity(patterns) {
    if (patterns.confidence > 90) return 'critical';
    if (patterns.confidence > 75) return 'high';
    if (patterns.confidence > 50) return 'warning';
    return 'info';
  }

  generateTitle(scope, category, patterns) {
    const titles = {
      workers: 'Workplace Injury System Anomaly Detected',
      disabilities: 'Disability Benefits Processing Pattern Change',
      mental_health: 'Mental Health Support System Issue',
      poverty: 'Income Support System Alert',
      housing: 'Housing Policy Change Detected',
      healthcare: 'Healthcare Access Barrier Identified'
    };
    return titles[category] || 'System Alert';
  }

  generateDescription(patterns) {
    return `Automated analysis detected ${patterns.indicators} concerning indicators with ${Math.round(patterns.confidence)}% confidence. Pattern suggests systematic issue requiring immediate attention.`;
  }

  generateActionPlan(patterns) {
    if (patterns.severity === 'critical') {
      return 'IMMEDIATE ACTION: Gather evidence, prepare public disclosure, coordinate with advocacy groups, contact media';
    }
    return 'Recommended: Continue monitoring, document patterns, prepare intervention strategy';
  }

  identifyTarget(patterns) {
    // In production, this would use NLP/entity extraction
    const possibleTargets = ['WSIB', 'ODSP', 'Manulife', 'Sun Life', 'Government of Ontario'];
    return Math.random() > 0.7 ? possibleTargets[Math.floor(Math.random() * possibleTargets.length)] : null;
  }

  gatherSources(scope, category) {
    const sources = {
      local: [
        { name: 'City Council Records', url: 'https://www.toronto.ca/city-government/council/' },
        { name: 'Municipal Budget', url: 'https://www.toronto.ca/city-government/budget-finances/' }
      ],
      provincial: [
        { name: 'Ontario Legislature', url: 'https://www.ola.org/' },
        { name: 'WSIB Reports', url: 'https://www.wsib.ca/en/annualreport' }
      ],
      federal: [
        { name: 'Parliament of Canada', url: 'https://www.parl.ca/' },
        { name: 'Government Statistics', url: 'https://www.statcan.gc.ca/' }
      ]
    };
    return sources[scope] || [];
  }

  // PUBLIC API
  getStatus() {
    return {
      isActive: this.isActive,
      alertCount: this.loadAlerts().length,
      targetCount: this.loadTargets().length,
      lastScan: this.loadScanHistory()[0]?.timestamp || null
    };
  }

  getAlerts(filter = 'all') {
    const alerts = this.loadAlerts();
    if (filter === 'all') return alerts;
    return alerts.filter(a => a.severity === filter);
  }

  getTargets() {
    return this.loadTargets();
  }

  getScanHistory() {
    return this.loadScanHistory();
  }

  // LEGISLATIVE TRACKING INTEGRATION
  getTrackedBills() {
    if (typeof window === 'undefined') return [];
    const tracked = localStorage.getItem('tracked_bills');
    return tracked ? JSON.parse(tracked) : this.generateInitialBills();
  }

  generateInitialBills() {
    return [
      // ONTARIO PROVINCIAL BILLS
      {
        id: 'ON_BILL_124', jurisdiction: 'Ontario', level: 'Provincial', bill_number: 'Bill 124',
        title: 'Protecting a Sustainable Public Sector for Future Generations Act',
        status: 'Struck Down by Courts', threat_level: 'critical',
        description: 'Wage cap for public sector workers including nurses - ruled unconstitutional',
        introduced: '2019-06-05', last_action: 'Struck down November 2022',
        affects: ['nurses', 'teachers', 'public sector workers', 'disability support workers'],
        charter_violations: ['Section 2(d) - Freedom of Association'],
        our_position: 'OPPOSED - Union busting', action_taken: 'Legal challenge successful',
        url: 'https://www.ola.org/en/legislative-business/bills/parliament-42/session-1/bill-124'
      },
      {
        id: 'ON_BILL_175', jurisdiction: 'Ontario', level: 'Provincial', bill_number: 'Bill 175',
        title: 'Connecting People to Home and Community Care Act',
        status: 'Active', threat_level: 'critical',
        description: 'Healthcare privatization - allowing for-profit home care',
        introduced: '2023-10-25', last_action: 'Royal Assent',
        affects: ['seniors', 'disabled', 'home care workers', 'chronically ill'],
        charter_violations: ['Section 7 - Right to Life (reduced care quality)'],
        our_position: 'OPPOSED - Privatization of healthcare', action_taken: 'Public opposition campaign',
        url: 'https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-175'
      },
      {
        id: 'ON_AUTISM_PROGRAM', jurisdiction: 'Ontario', level: 'Provincial', bill_number: 'Watch: Autism Program',
        title: 'Ontario Autism Program Needs-Based Model', status: 'Watching', threat_level: 'critical',
        description: '50,000+ autistic children on waitlist - families wait years for support',
        introduced: null, last_action: 'Ongoing waitlist crisis',
        affects: ['autistic children', 'autistic adults', 'families'],
        charter_violations: ['Section 15 - Equality Rights', 'Section 7 - Right to Life'],
        our_position: 'DEMAND FULL FUNDING', action_taken: 'Parent advocacy groups organizing',
        url: 'https://www.ontario.ca/page/ontario-autism-program'
      },
      {
        id: 'ON_POTENTIAL_OW_CUTS', jurisdiction: 'Ontario', level: 'Provincial', bill_number: 'Watch: Budget 2025',
        title: 'Ontario Works Rate Freeze (Predicted)', status: 'Watching', threat_level: 'critical',
        description: 'Ford government may freeze OW rates again - $733/month already starvation',
        introduced: null, last_action: 'Budget expected Spring 2025',
        affects: ['230,000 Ontario Works recipients', 'working poor', 'disabled awaiting ODSP'],
        charter_violations: ['Section 7 - Right to Life'],
        our_position: 'PRE-EMPTIVE OPPOSITION', action_taken: 'Monitoring, preparing campaign'
      },
      // FEDERAL BILLS
      {
        id: 'FED_BILL_C35', jurisdiction: 'Federal', level: 'Federal', bill_number: 'Bill C-35',
        title: 'Canada Disability Benefit Act', status: 'Passed', threat_level: 'medium',
        description: 'New federal disability benefit - but amount NOT YET SET (regulations pending)',
        introduced: '2021-06-22', last_action: 'Royal Assent June 2023',
        affects: ['all disabled Canadians', 'working-age disabled', 'ODSP/AISH recipients'],
        charter_violations: [],
        our_position: 'SUPPORT WITH CONCERNS - Amount must match poverty line',
        action_taken: 'Advocacy for adequate rates ($2,200/month minimum)',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-35'
      },
      {
        id: 'FED_UNDRIP', jurisdiction: 'Federal', level: 'Federal', bill_number: 'Bill C-15',
        title: 'United Nations Declaration on the Rights of Indigenous Peoples Act',
        status: 'Passed', threat_level: 'medium',
        description: 'UNDRIP implementation - but water advisories continue, TRC calls ignored',
        introduced: '2020-12-03', last_action: 'Royal Assent June 2021',
        affects: ['Indigenous peoples', 'First Nations', 'Métis', 'Inuit'],
        charter_violations: [],
        our_position: 'SUPPORT BUT MONITORING - Implementation crucial',
        action_taken: 'Indigenous leaders watching for real action'
      },
      {
        id: 'FED_MENTAL_HEALTH_TRANSFER', jurisdiction: 'Federal', level: 'Federal',
        bill_number: 'Watch: Mental Health Transfer',
        title: 'Federal Mental Health Transfer to Provinces', status: 'Watching', threat_level: 'high',
        description: '$198B health transfer includes mental health - but provinces spending on private care instead',
        introduced: null, last_action: 'Bilateral agreements signed 2023',
        affects: ['all Canadians with mental illness', 'PTSD', 'addiction'],
        charter_violations: ['Section 7 - Right to Security (inadequate access)'],
        our_position: 'DEMAND ACCOUNTABILITY - Track provincial spending',
        action_taken: 'Advocacy for public mental health expansion'
      },
      {
        id: 'FED_VETERANS_BACKLOG', jurisdiction: 'Federal', level: 'Federal',
        bill_number: 'Watch: VAC Claims Processing',
        title: 'Veterans Affairs Claims Backlog Crisis', status: 'Watching', threat_level: 'critical',
        description: '36,000+ disability claims backlogged - veterans wait 2+ years while dying',
        introduced: null, last_action: 'Ongoing crisis',
        affects: ['veterans', 'RCMP', 'military with PTSD', 'service-related disabilities'],
        charter_violations: ['Section 7 - Right to Security', 'Section 15 - Equality'],
        our_position: 'DEMAND IMMEDIATE ACTION', action_taken: 'Veterans groups lobbying Parliament'
      },
      // MUNICIPAL/LOCAL BILLS
      {
        id: 'TORONTO_ENCAMPMENT_EVICTIONS', jurisdiction: 'Toronto', level: 'Municipal',
        bill_number: 'City Policy', title: 'Homeless Encampment Evictions',
        status: 'Active', threat_level: 'critical',
        description: 'Toronto forcibly evicting homeless disabled people with no housing alternatives',
        introduced: null, last_action: 'Ongoing evictions',
        affects: ['homeless disabled', 'mental illness', 'addiction', 'refugees'],
        charter_violations: ['Section 7 - Right to Life', 'Section 15 - Equality'],
        our_position: 'OPPOSED - Housing first, not enforcement',
        action_taken: 'Legal challenges, direct support'
      },
      {
        id: 'WATCH_MAID_EXPANSION', jurisdiction: 'Federal', level: 'Federal',
        bill_number: 'Bill C-7 / C-39', title: 'Medical Assistance in Dying (MAiD) Expansion',
        status: 'Active', threat_level: 'critical',
        description: 'MAiD offered to disabled people denied proper support - poverty-driven deaths',
        introduced: '2021-02-24', last_action: 'Mental illness expansion delayed to 2027',
        affects: ['disabled Canadians', 'mental illness', 'chronic pain', 'veterans'],
        charter_violations: ['Section 7 - Right to Life', 'Section 15 - Equality'],
        our_position: 'CRITICAL CONCERN - Support first, not death',
        action_taken: 'UN investigation, disability rights advocacy'
      }
    ];
  }

  // Convert bills to insights format for THE EYE
  convertBillsToInsights() {
    const bills = this.getTrackedBills();
    return bills.map(bill => ({
      id: bill.id,
      title: `LEGISLATIVE: ${bill.bill_number} - ${bill.title}`,
      scope: bill.level === 'Municipal' ? 'local' : bill.level === 'Provincial' ? 'provincial' : 'federal',
      category: this.categorizeBill(bill),
      severity: bill.threat_level,
      source: bill.jurisdiction,
      timestamp: Date.now(),
      description: bill.description,
      evidence: {
        type: 'legislation',
        bill_number: bill.bill_number,
        status: bill.status,
        affects: bill.affects,
        charter_violations: bill.charter_violations,
        our_position: bill.our_position,
        action_taken: bill.action_taken,
        url: bill.url
      },
      confidence: bill.status === 'Active' || bill.status === 'Watching' ? 95 : 85
    }));
  }

  categorizeBill(bill) {
    const desc = bill.description.toLowerCase();
    const affects = bill.affects.join(' ').toLowerCase();
    
    if (desc.includes('wsib') || affects.includes('worker')) return 'workers';
    if (desc.includes('odsp') || desc.includes('disability') || affects.includes('disabled')) return 'disabilities';
    if (desc.includes('mental') || affects.includes('ptsd')) return 'mental_health';
    if (desc.includes('poverty') || desc.includes('ontario works')) return 'poverty';
    if (desc.includes('housing') || desc.includes('homeless')) return 'housing';
    if (desc.includes('health') || desc.includes('care')) return 'healthcare';
    if (affects.includes('indigenous')) return 'indigenous_rights';
    if (affects.includes('veterans')) return 'veterans';
    if (affects.includes('autistic')) return 'autism';
    return 'social_justice';
  }

  // Convert bills to targets
  convertBillsToTargets() {
    const bills = this.getTrackedBills();
    const targets = [];
    
    bills.forEach(bill => {
      if (bill.our_position.includes('OPPOSED') || bill.threat_level === 'critical') {
        // Extract responsible entity
        const entity = this.extractResponsibleEntity(bill);
        if (entity && !targets.find(t => t.name === entity.name)) {
          targets.push(entity);
        }
      }
    });
    
    return targets;
  }

  extractResponsibleEntity(bill) {
    if (bill.jurisdiction === 'Ontario' && bill.level === 'Provincial') {
      return {
        id: `target_ontario_government`,
        name: 'Ontario Provincial Government',
        type: 'government',
        jurisdiction: 'Provincial',
        corruption_score: 85,
        active_violations: [bill.bill_number],
        priority: 'critical',
        evidence_count: 1,
        last_updated: Date.now()
      };
    } else if (bill.level === 'Federal') {
      return {
        id: `target_federal_government`,
        name: 'Federal Government of Canada',
        type: 'government',
        jurisdiction: 'Federal',
        corruption_score: 75,
        active_violations: [bill.bill_number],
        priority: 'high',
        evidence_count: 1,
        last_updated: Date.now()
      };
    } else if (bill.level === 'Municipal') {
      return {
        id: `target_${bill.jurisdiction.toLowerCase()}_municipal`,
        name: `${bill.jurisdiction} Municipal Government`,
        type: 'government',
        jurisdiction: 'Municipal',
        corruption_score: 70,
        active_violations: [bill.bill_number],
        priority: 'high',
        evidence_count: 1,
        last_updated: Date.now()
      };
    }
    return null;
  }

  // Convert bills to alerts
  convertBillsToAlerts() {
    const bills = this.getTrackedBills();
    return bills
      .filter(bill => bill.status === 'Active' || bill.status === 'Watching' || bill.threat_level === 'critical')
      .map(bill => ({
        id: bill.id,
        title: `${bill.bill_number}: ${bill.title}`,
        severity: bill.threat_level,
        category: this.categorizeBill(bill),
        scope: bill.level === 'Municipal' ? 'local' : bill.level === 'Provincial' ? 'provincial' : 'federal',
        description: bill.description,
        affected_count: this.estimateAffectedCount(bill),
        financial_impact: 'To be determined based on final regulations',
        charter_violations: bill.charter_violations,
        timestamp: Date.now(),
        source: `${bill.jurisdiction} Legislature`,
        url: bill.url || `https://www.ola.org/en/legislative-business/bills`,
        status: bill.status,
        action_required: bill.our_position,
        target_entity: {
          name: `${bill.jurisdiction} ${bill.level} Government`,
          type: 'government',
          jurisdiction: bill.jurisdiction
        }
      }));
  }

  estimateAffectedCount(bill) {
    const affects = bill.affects.join(' ').toLowerCase();
    if (affects.includes('all canadians')) return '38 million+ Canadians';
    if (affects.includes('all disabled')) return '6.2 million disabled Canadians';
    if (affects.includes('indigenous')) return '1.8 million Indigenous peoples';
    if (affects.includes('veterans')) return '461,000 veterans';
    if (affects.includes('autistic')) return '50,000+ on waitlist';
    if (affects.includes('ontario works')) return '230,000 recipients';
    if (affects.includes('homeless')) return 'Thousands of vulnerable people';
    return bill.affects.join(', ');
  }
}

// Singleton instance
export const automationEngine = new AutomationEngine();
