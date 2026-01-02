/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ MULTI-AGENT ORCHESTRATION INTEGRATION TESTS
 * ═══════════════════════════════════════════════════════════════════════════
 */

const {
  AgentManager,
  MasterOrchestratorAgent,
  EvidenceSentinelAgent,
  AnalysisViolationsAgent,
  AlertsEscalationAgent,
  CommunicationsMediaAgent,
  TemplatesAdvocacyAgent,
  CommunityIntakeAgent
} = require('../agents/orchestrator');

describe('Multi-Agent Orchestration System', () => {
  let agentManager;

  beforeEach(() => {
    agentManager = new AgentManager();
  });

  test('AgentManager initializes successfully', () => {
    expect(agentManager).toBeDefined();
    expect(agentManager.agents).toBeDefined();
    expect(agentManager.agents.size).toBe(0);
  });

  test('Register all 7 agents', () => {
    agentManager.registerAgent(new MasterOrchestratorAgent());
    agentManager.registerAgent(new EvidenceSentinelAgent());
    agentManager.registerAgent(new AnalysisViolationsAgent());
    agentManager.registerAgent(new AlertsEscalationAgent());
    agentManager.registerAgent(new CommunicationsMediaAgent());
    agentManager.registerAgent(new TemplatesAdvocacyAgent());
    agentManager.registerAgent(new CommunityIntakeAgent());

    expect(agentManager.agents.size).toBe(7);
  });

  test('Get agent by name', () => {
    const sentinel = new EvidenceSentinelAgent();
    agentManager.registerAgent(sentinel);

    const retrieved = agentManager.getAgent('Evidence Sentinel');
    expect(retrieved).toBeDefined();
    expect(retrieved.name).toBe('Evidence Sentinel');
  });

  test('Get status of all agents', () => {
    agentManager.registerAgent(new MasterOrchestratorAgent());
    agentManager.registerAgent(new EvidenceSentinelAgent());

    const status = agentManager.getStatus();
    expect(status).toBeDefined();
    expect(status.totalAgents).toBe(2);
    expect(status.agents).toBeDefined();
  });

  test('Send task to specific agent', async () => {
    const sentinel = new EvidenceSentinelAgent();
    agentManager.registerAgent(sentinel);

    const result = await agentManager.sendTaskToAgent(
      'Evidence Sentinel',
      'collect-evidence',
      { source: 'open.canada.ca', topic: 'disability' }
    );

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  test('Agent receives event broadcast', (done) => {
    const sentinel = new EvidenceSentinelAgent();
    agentManager.registerAgent(sentinel);

    // Listen for event in agent
    sentinel.on('test-event', (data) => {
      expect(data.message).toBe('Test broadcast');
      done();
    });

    // Broadcast event
    agentManager.broadcastEvent('test-event', { message: 'Test broadcast' });
  });

  test('Start and stop all agents', async () => {
    agentManager.registerAgent(new MasterOrchestratorAgent());
    agentManager.registerAgent(new EvidenceSentinelAgent());

    // Start all
    await agentManager.startAll();
    let status = agentManager.getStatus();
    expect(status.totalAgents).toBe(2);

    // Stop all
    await agentManager.stopAll();
    status = agentManager.getStatus();
    expect(status).toBeDefined();
  });

  test('Evidence Sentinel agent initializes', async () => {
    const agent = new EvidenceSentinelAgent();
    expect(agent.name).toBe('Evidence Sentinel');
    expect(agent.responsibilities).toContain('Data collection');
  });

  test('Analysis Violations agent initializes', async () => {
    const agent = new AnalysisViolationsAgent();
    expect(agent.name).toBe('Analysis & Violations');
    expect(agent.responsibilities).toContain('Legal framework analysis');
  });

  test('Alerts Escalation agent initializes', async () => {
    const agent = new AlertsEscalationAgent();
    expect(agent.name).toBe('Alerts & Escalation');
    expect(agent.responsibilities).toContain('Event escalation');
  });

  test('Communications Media agent initializes', async () => {
    const agent = new CommunicationsMediaAgent();
    expect(agent.name).toBe('Communications & Media');
    expect(agent.responsibilities).toContain('Report generation');
  });

  test('Templates Advocacy agent initializes', async () => {
    const agent = new TemplatesAdvocacyAgent();
    expect(agent.name).toBe('Templates & Advocacy');
    expect(agent.responsibilities).toContain('Document generation');
  });

  test('Community Intake agent initializes', async () => {
    const agent = new CommunityIntakeAgent();
    expect(agent.name).toBe('Community Intake');
    expect(agent.responsibilities).toContain('Tip processing');
  });

  test('Master Orchestrator coordinates agents', async () => {
    const orchestrator = new MasterOrchestratorAgent();
    expect(orchestrator.name).toBe('Master Orchestrator');
    expect(orchestrator.responsibilities).toContain('Central coordination');
  });

  test('Agent error handling works', async () => {
    const agent = new EvidenceSentinelAgent();
    const errorSpy = jest.fn();
    agent.on('error', errorSpy);

    // Simulate error
    try {
      agent.handleError(new Error('Test error'));
    } catch (e) {
      // Error expected
    }

    expect(agent.errorLog.length).toBeGreaterThan(0);
  });

  test('Agent logging captures messages', async () => {
    const agent = new EvidenceSentinelAgent();
    agent.log('Test message', 'info');

    expect(agent.logHistory.length).toBeGreaterThan(0);
    expect(agent.logHistory[0]).toContain('Test message');
  });

});

describe('Multi-Agent Workflow', () => {
  test('Complete workflow: Evidence -> Analysis -> Escalation', async () => {
    const manager = new AgentManager();
    manager.registerAgent(new EvidenceSentinelAgent());
    manager.registerAgent(new AnalysisViolationsAgent());
    manager.registerAgent(new AlertsEscalationAgent());

    // Step 1: Collect evidence
    const evidence = await manager.sendTaskToAgent(
      'Evidence Sentinel',
      'collect-evidence',
      { source: 'test-source', topic: 'disability-benefits' }
    );
    expect(evidence.success).toBe(true);

    // Step 2: Analyze evidence
    const analysis = await manager.sendTaskToAgent(
      'Analysis & Violations',
      'analyze-evidence',
      { evidence: evidence.data, framework: 'canadian-rights' }
    );
    expect(analysis.success).toBe(true);

    // Step 3: Escalate if needed
    const escalation = await manager.sendTaskToAgent(
      'Alerts & Escalation',
      'create-escalation',
      { analysis: analysis.data, violationScore: 75 }
    );
    expect(escalation.success).toBe(true);
  });

  test('Agent communication via events', (done) => {
    const manager = new AgentManager();
    const sentinel = new EvidenceSentinelAgent();
    manager.registerAgent(sentinel);

    let eventReceived = false;

    // Listen on manager
    manager.on('agent-event', (event) => {
      expect(event.from).toBe('Evidence Sentinel');
      eventReceived = true;
      done();
    });

    // Trigger agent to emit event
    sentinel.emit('agent-event', { from: 'Evidence Sentinel' });
  });
});
