/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🚨 ALERT ORCHESTRATION INTEGRATION TESTS
 * ═══════════════════════════════════════════════════════════════════════════
 */

const { AlertOrchestrator } = require('../utils/alert-orchestrator');

describe('Alert Orchestration System', () => {
  let orchestrator;

  beforeEach(() => {
    orchestrator = new AlertOrchestrator();
  });

  test('AlertOrchestrator initializes successfully', () => {
    expect(orchestrator).toBeDefined();
    expect(orchestrator.processedAlerts).toBeDefined();
    expect(orchestrator.escalationRules).toBeDefined();
  });

  test('Determine escalation level - CRITICAL', () => {
    const alert = {
      id: 'TEST_1',
      severity: 'critical',
      violationScore: 85,
      jurisdiction: 'ontario'
    };

    const level = orchestrator.determineEscalationLevel(alert);
    expect(level).toBe('critical');
  });

  test('Determine escalation level - HIGH', () => {
    const alert = {
      id: 'TEST_2',
      severity: 'high',
      violationScore: 65,
      jurisdiction: 'british-columbia'
    };

    const level = orchestrator.determineEscalationLevel(alert);
    expect(level).toBe('high');
  });

  test('Determine escalation level - MEDIUM', () => {
    const alert = {
      id: 'TEST_3',
      severity: 'medium',
      violationScore: 35,
      jurisdiction: 'Alberta'
    };

    const level = orchestrator.determineEscalationLevel(alert);
    expect(level).toBe('medium');
  });

  test('Determine escalation level - LOW', () => {
    const alert = {
      id: 'TEST_4',
      severity: 'low',
      violationScore: 15,
      jurisdiction: 'Manitoba'
    };

    const level = orchestrator.determineEscalationLevel(alert);
    expect(level).toBe('low');
  });

  test('Get jurisdiction routing for Ontario', () => {
    const routes = orchestrator.getJurisdictionRoutes('ontario');
    expect(routes).toBeDefined();
    expect(routes.province).toBe('Ontario');
    expect(routes.recipients).toBeDefined();
    expect(routes.recipients.length).toBeGreaterThan(0);
  });

  test('Get jurisdiction routing for British Columbia', () => {
    const routes = orchestrator.getJurisdictionRoutes('british-columbia');
    expect(routes).toBeDefined();
    expect(routes.province).toBe('British Columbia');
  });

  test('Get jurisdiction routing for Federal', () => {
    const routes = orchestrator.getJurisdictionRoutes('federal');
    expect(routes).toBeDefined();
    expect(routes.province).toBe('Federal');
  });

  test('Cluster similar alerts for pattern detection', async () => {
    const alert1 = {
      id: 'ALERT_1',
      severity: 'high',
      violationType: 'benefit-denial',
      jurisdiction: 'ontario',
      violationScore: 60,
      title: 'WSIB Denies Claim',
      description: 'Worker claim denied'
    };

    const alert2 = {
      id: 'ALERT_2',
      severity: 'high',
      violationType: 'benefit-denial',
      jurisdiction: 'ontario',
      violationScore: 62,
      title: 'WSIB Denies Similar Claim',
      description: 'Another worker claim denied'
    };

    const alert3 = {
      id: 'ALERT_3',
      severity: 'high',
      violationType: 'benefit-denial',
      jurisdiction: 'ontario',
      violationScore: 65,
      title: 'WSIB Denies Third Claim',
      description: 'Third worker claim denied'
    };

    // Process first alert
    await orchestrator.processAlert(alert1);
    await orchestrator.processAlert(alert2);
    const result = await orchestrator.processAlert(alert3);

    expect(result).toBeDefined();
    expect(result.clustered).toBeDefined();
  });

  test('Process CRITICAL alert - all channels', async () => {
    const alert = {
      id: 'CRIT_1',
      severity: 'critical',
      title: 'Major Rights Violation',
      description: 'Critical systemic violation detected',
      violationType: 'systemic-discrimination',
      jurisdiction: 'ontario',
      violationScore: 90,
      evidence: ['document1', 'document2']
    };

    const result = await orchestrator.processAlert(alert);
    expect(result).toBeDefined();
    expect(result.escalationLevel).toBe('critical');
    expect(result.deliveryChannels).toContain('media');
    expect(result.deliveryChannels).toContain('government');
    expect(result.deliveryChannels).toContain('advocacy');
  });

  test('Process HIGH alert - immediate channels', async () => {
    const alert = {
      id: 'HIGH_1',
      severity: 'high',
      title: 'Important Rights Issue',
      description: 'Important issue detected',
      violationType: 'procedural-error',
      jurisdiction: 'british-columbia',
      violationScore: 55,
      evidence: ['document1']
    };

    const result = await orchestrator.processAlert(alert);
    expect(result).toBeDefined();
    expect(result.escalationLevel).toBe('high');
  });

  test('Generate media release for critical alert', async () => {
    const alert = {
      id: 'MED_1',
      severity: 'critical',
      title: 'Systemic Violation',
      description: 'Widespread systemic violation',
      violationType: 'access-denial',
      jurisdiction: 'ontario',
      violationScore: 85
    };

    const release = orchestrator.generateMediaRelease(alert);
    expect(release).toBeDefined();
    expect(release).toContain('Injured Workers Unite');
    expect(release).toContain(alert.title);
  });

  test('Generate advocacy alert', async () => {
    const alert = {
      id: 'ADV_1',
      severity: 'high',
      title: 'Advocacy Needed',
      description: 'Issue requiring advocacy',
      violationType: 'policy-violation',
      jurisdiction: 'alberta',
      violationScore: 60
    };

    const advocacy = orchestrator.generateAdvocacyAlert(alert);
    expect(advocacy).toBeDefined();
    expect(advocacy).toContain('Advocacy');
  });

  test('Generate social media post', async () => {
    const alert = {
      id: 'SOC_1',
      severity: 'medium',
      title: 'Important Issue',
      description: 'Issue affecting workers',
      violationType: 'documentation-issue',
      jurisdiction: 'ontario',
      violationScore: 40
    };

    const post = orchestrator.generateSocialMediaPost(alert);
    expect(post).toBeDefined();
    expect(post.length).toBeGreaterThan(0);
    expect(post.length).toBeLessThanOrEqual(280); // Twitter length
  });

  test('Build delivery plan for alert', async () => {
    const alert = {
      id: 'DELIV_1',
      severity: 'high',
      title: 'Delivery Test',
      description: 'Test alert delivery',
      violationType: 'generic',
      jurisdiction: 'ontario',
      violationScore: 70
    };

    const plan = orchestrator.buildDeliveryPlan(alert);
    expect(plan).toBeDefined();
    expect(plan.channels).toBeDefined();
    expect(plan.recipients).toBeDefined();
  });

  test('Get orchestrator status', () => {
    const status = orchestrator.getStatus();
    expect(status).toBeDefined();
    expect(status.processedAlerts).toBe(0);
    expect(status.escalationRulesActive).toBe(true);
    expect(status.jurisdictionsConfigured).toBeGreaterThan(10);
  });

  test('Track processed alerts', async () => {
    const alert = {
      id: 'TRACK_1',
      severity: 'low',
      title: 'Tracking Test',
      description: 'Test alert tracking',
      violationType: 'generic',
      jurisdiction: 'ontario',
      violationScore: 20
    };

    await orchestrator.processAlert(alert);
    const status = orchestrator.getStatus();
    expect(status.processedAlerts).toBe(1);
  });

});

describe('Alert Escalation Workflow', () => {
  test('Complete workflow: Low -> Medium -> High -> Critical', async () => {
    const orchestrator = new AlertOrchestrator();

    // Low severity alert
    const lowAlert = {
      id: 'LOW_TEST',
      severity: 'low',
      violationScore: 20,
      jurisdiction: 'ontario'
    };

    const lowResult = orchestrator.determineEscalationLevel(lowAlert);
    expect(lowResult).toBe('low');

    // Medium severity alert
    const medAlert = {
      id: 'MED_TEST',
      severity: 'medium',
      violationScore: 40,
      jurisdiction: 'ontario'
    };

    const medResult = orchestrator.determineEscalationLevel(medAlert);
    expect(medResult).toBe('medium');

    // High severity alert
    const highAlert = {
      id: 'HIGH_TEST',
      severity: 'high',
      violationScore: 65,
      jurisdiction: 'ontario'
    };

    const highResult = orchestrator.determineEscalationLevel(highAlert);
    expect(highResult).toBe('high');

    // Critical severity alert
    const critAlert = {
      id: 'CRIT_TEST',
      severity: 'critical',
      violationScore: 90,
      jurisdiction: 'ontario'
    };

    const critResult = orchestrator.determineEscalationLevel(critAlert);
    expect(critResult).toBe('critical');
  });

  test('Jurisdiction routing across all provinces', () => {
    const orchestrator = new AlertOrchestrator();
    const provinces = [
      'ontario', 'british-columbia', 'alberta', 'manitoba',
      'saskatchewan', 'quebec', 'nova-scotia', 'new-brunswick',
      'pei', 'newfoundland', 'yukon', 'nwt', 'nunavut', 'federal'
    ];

    provinces.forEach(province => {
      const routes = orchestrator.getJurisdictionRoutes(province);
      expect(routes).toBeDefined();
      expect(routes.recipients).toBeDefined();
      expect(routes.recipients.length).toBeGreaterThan(0);
    });
  });
});
