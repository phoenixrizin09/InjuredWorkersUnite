/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🚀 API INTEGRATION TESTS - NEW ENDPOINTS
 * ═══════════════════════════════════════════════════════════════════════════
 */

const request = require('supertest');
const { app, eyeAPI } = require('../api/core');

describe('Multi-Agent Orchestration API Endpoints', () => {
  
  test('GET /api/agents/status - Returns agent status', async () => {
    const response = await request(app)
      .get('/api/agents/status')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.totalAgents).toBeDefined();
  });

  test('POST /api/agents/:name/task - Send task to agent', async () => {
    const response = await request(app)
      .post('/api/agents/Evidence%20Sentinel/task')
      .send({
        taskType: 'collect-evidence',
        taskData: {
          source: 'open.canada.ca',
          topic: 'disability'
        }
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('Task sent');
  });

  test('GET /api/agents/:name/logs - Get agent logs', async () => {
    const response = await request(app)
      .get('/api/agents/Evidence%20Sentinel/logs')
      .expect(200);

    expect(response.body.agent).toBeDefined();
    expect(response.body.logs).toBeDefined();
  });

  test('GET /api/agents/:name/logs - Not found for invalid agent', async () => {
    const response = await request(app)
      .get('/api/agents/Invalid%20Agent/logs')
      .expect(404);

    expect(response.body.error).toBeDefined();
  });

});

describe('Alert Orchestration API Endpoints', () => {
  
  test('POST /api/alerts/orchestrated - Process alert', async () => {
    const response = await request(app)
      .post('/api/alerts/orchestrated')
      .send({
        id: 'TEST_ALERT_1',
        severity: 'high',
        title: 'Test Alert',
        description: 'Testing alert orchestration',
        violationType: 'benefit-denial',
        jurisdiction: 'ontario',
        violationScore: 65
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.alertId).toBe('TEST_ALERT_1');
    expect(response.body.escalationLevel).toBeDefined();
  });

  test('POST /api/alerts/orchestrated - CRITICAL alert', async () => {
    const response = await request(app)
      .post('/api/alerts/orchestrated')
      .send({
        id: 'CRIT_ALERT_1',
        severity: 'critical',
        title: 'Critical Violation',
        description: 'Systemic rights violation',
        violationType: 'systemic-discrimination',
        jurisdiction: 'federal',
        violationScore: 85
      })
      .expect(201);

    expect(response.body.escalationLevel).toBe('critical');
    expect(response.body.deliveryChannels).toContain('media');
  });

  test('GET /api/alerts/orchestrator/status - Get orchestrator status', async () => {
    const response = await request(app)
      .get('/api/alerts/orchestrator/status')
      .expect(200);

    expect(response.body.processedAlerts).toBeDefined();
    expect(response.body.escalationRulesActive).toBe(true);
  });

});

describe('TRANSP7 Transparency API Endpoints', () => {
  
  test('GET /api/transparency/dashboard - Public TRANSP7 dashboard', async () => {
    const response = await request(app)
      .get('/api/transparency/dashboard')
      .expect(200);

    expect(response.body.title).toContain('TRANSP7');
    expect(response.body.components).toBeDefined();
    expect(response.body.components.length).toBe(7);
  });

  test('GET /api/transparency/corrections - Corrections log', async () => {
    const response = await request(app)
      .get('/api/transparency/corrections')
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test('GET /api/transparency/methodology - Public methodology', async () => {
    const response = await request(app)
      .get('/api/transparency/methodology')
      .expect(200);

    expect(response.body.intro).toBeDefined();
    expect(response.body.methodologies).toBeDefined();
  });

  test('GET /api/transparency/ai-usage - AI disclosure report', async () => {
    const response = await request(app)
      .get('/api/transparency/ai-usage')
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test('GET /api/transparency/conflicts - Conflict declarations', async () => {
    const response = await request(app)
      .get('/api/transparency/conflicts')
      .expect(200);

    expect(response.body).toBeDefined();
  });

  test('GET /api/transparency/community-protection - Community protection policy', async () => {
    const response = await request(app)
      .get('/api/transparency/community-protection')
      .expect(200);

    expect(response.body).toBeDefined();
  });

});

describe('Integration: Agents + Alerts + TRANSP7', () => {
  
  test('Complete workflow: Create alert via API, processes through all systems', async () => {
    // Step 1: Create alert through API
    const alertResponse = await request(app)
      .post('/api/alerts/orchestrated')
      .send({
        id: 'COMPLETE_TEST_1',
        severity: 'high',
        title: 'Complete Workflow Test',
        description: 'Testing complete integration',
        violationType: 'procedural-error',
        jurisdiction: 'british-columbia',
        violationScore: 55
      })
      .expect(201);

    expect(alertResponse.body.success).toBe(true);

    // Step 2: Verify alert was orchestrated
    const orchestratorStatus = await request(app)
      .get('/api/alerts/orchestrator/status')
      .expect(200);

    expect(orchestratorStatus.body.processedAlerts).toBeGreaterThan(0);

    // Step 3: Send task to agent for follow-up
    const agentResponse = await request(app)
      .post('/api/agents/Analysis%20%26%20Violations/task')
      .send({
        taskType: 'analyze-violation',
        taskData: {
          alertId: 'COMPLETE_TEST_1',
          violationType: 'procedural-error'
        }
      })
      .expect(201);

    expect(agentResponse.body.success).toBe(true);

    // Step 4: Verify transparency dashboard is public
    const dashboard = await request(app)
      .get('/api/transparency/dashboard')
      .expect(200);

    expect(dashboard.body.public).toBe(true);
  });

  test('Critical alert triggers multi-channel alert through all systems', async () => {
    // Create critical alert
    const alertResponse = await request(app)
      .post('/api/alerts/orchestrated')
      .send({
        id: 'CRITICAL_WORKFLOW',
        severity: 'critical',
        title: 'Systemic Violation Detected',
        description: 'Pattern of denial across multiple jurisdictions',
        violationType: 'systemic-discrimination',
        jurisdiction: 'federal',
        violationScore: 88
      })
      .expect(201);

    // Verify critical escalation
    expect(alertResponse.body.escalationLevel).toBe('critical');
    expect(alertResponse.body.deliveryChannels).toContain('media');
    expect(alertResponse.body.deliveryChannels).toContain('government');
    expect(alertResponse.body.deliveryChannels).toContain('advocacy');

    // Verify agents are ready
    const agentStatus = await request(app)
      .get('/api/agents/status')
      .expect(200);

    expect(agentStatus.body.totalAgents).toBe(7);

    // Verify transparency tracking
    const dashboard = await request(app)
      .get('/api/transparency/dashboard')
      .expect(200);

    expect(dashboard.body.components).toBeDefined();
  });

});

describe('API Error Handling', () => {
  
  test('POST /api/agents/:name/task - Missing required fields', async () => {
    const response = await request(app)
      .post('/api/agents/Evidence%20Sentinel/task')
      .send({
        taskType: 'collect-evidence'
        // Missing taskData
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('GET /api/agents/:name/logs - Invalid agent name', async () => {
    const response = await request(app)
      .get('/api/agents/NonExistent%20Agent/logs')
      .expect(404);

    expect(response.body.error).toBeDefined();
  });

  test('POST /api/alerts/orchestrated - Invalid jurisdiction', async () => {
    const response = await request(app)
      .post('/api/alerts/orchestrated')
      .send({
        id: 'BAD_ALERT',
        severity: 'high',
        title: 'Bad Alert',
        jurisdiction: 'invalid-jurisdiction',
        violationScore: 50
      });

    // Should either auto-correct or be handled gracefully
    expect([201, 400]).toContain(response.status);
  });

});

describe('API Response Format', () => {
  
  test('All responses are JSON', async () => {
    const endpoints = [
      '/api/agents/status',
      '/api/alerts/orchestrator/status',
      '/api/transparency/dashboard'
    ];

    for (const endpoint of endpoints) {
      const response = await request(app).get(endpoint);
      expect(response.type).toBe('application/json');
    }
  });

  test('Error responses include error message', async () => {
    const response = await request(app)
      .get('/api/agents/Invalid/logs');

    expect(response.body.error).toBeDefined();
    expect(typeof response.body.error).toBe('string');
  });

  test('Success responses include success flag', async () => {
    const response = await request(app)
      .post('/api/alerts/orchestrated')
      .send({
        id: 'FORMAT_TEST',
        severity: 'low',
        title: 'Format Test',
        jurisdiction: 'ontario',
        violationScore: 20
      })
      .expect(201);

    expect(response.body.success).toBe(true);
  });

});
