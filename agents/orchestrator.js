/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - MULTI-AGENT ORCHESTRATION SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CORE MANDATE: Master Prompt requires "multi-agent" system
 * This provides the foundation for true independent agents
 * 
 * Agents:
 * 1. Master Orchestrator    - Central coordinator
 * 2. Evidence Sentinel      - Data collection & verification
 * 3. Analysis & Violations  - Rights framework analysis
 * 4. Targets & Accountability - Entity identification
 * 5. Alerts & Escalation    - Event management
 * 6. Investigations (Deep)  - FOI/analysis automation
 * 7. Legal & Rights Mapping - Framework maintenance
 * 8. Communications & Media - Output generation
 * 9. Social Media           - Viral content
 * 10. Templates & Advocacy  - Document generation
 * 11. Community Intake      - Tip management
 * 
 * Each agent:
 * - Runs independently
 * - Has defined responsibilities
 * - Communicates via event bus
 * - Can be deployed separately
 * - Self-healing on error
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);
const IS_TEST = process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;
const SYNC_SIMULATE = process.env.SYNC_SIMULATE === 'true';

// ============================================
// AGENT BASE CLASS
// ============================================

/**
 * Base class for all agents
 * All agents inherit from this
 */
class Agent extends EventEmitter {
  constructor(name, config = {}) {
    super();
    this.name = name;
    this.id = `AGENT_${name}_${Date.now()}`;
    this.status = 'initializing';
    this.config = config;
    this.startTime = Date.now();
    this.errorCount = 0;
    this.taskCount = 0;
    this.lastTask = null;
    this.logs = [];
    this.logHistory = [];
    this.errorLog = [];
    this.responsibilities = config.responsibilities || [];
  }

  /**
   * Initialize the agent
   */
  async initialize() {
    this.log('INFO', `🤖 Initializing agent: ${this.name}`);
    this.status = 'initialized';
    this.emit('initialized', { agent: this.name });
  }

  /**
   * Start the agent
   */
  async start() {
    this.log('INFO', `▶️ Starting agent: ${this.name}`);
    this.status = 'running';
    this.emit('started', { agent: this.name });
  }

  /**
   * Stop the agent
   */
  async stop() {
    this.log('INFO', `⏹️ Stopping agent: ${this.name}`);
    this.status = 'stopped';
    this.emit('stopped', { agent: this.name });
  }

  /**
   * Agent logging
   */
  log(arg1, arg2, arg3) {
    const knownLevels = ['INFO', 'ERROR', 'WARN', 'DEBUG'];
    let level;
    let message;
    let data = null;

    if (knownLevels.includes(String(arg1).toUpperCase())) {
      level = String(arg1).toUpperCase();
      message = arg2 || '';
      data = arg3 || null;
    } else {
      message = arg1;
      level = arg2 ? String(arg2).toUpperCase() : 'INFO';
      data = arg3 || null;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      agent: this.name,
      level,
      message,
      ...(data && { data })
    };

    this.logs.push(logEntry);
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    const logLine = `${logEntry.timestamp} [${level}] ${message}`;
    this.logHistory.push(logLine);
    if (this.logHistory.length > 100) {
      this.logHistory = this.logHistory.slice(-100);
    }

    console.log(`[${this.name}] ${level}: ${message}`, data ? data : '');
    this.emit('log', logEntry);
  }

  /**
   * Handle errors
   */
  handleError(error, context = {}) {
    this.errorCount++;
    this.errorLog.push({ timestamp: new Date().toISOString(), error: error.message });
    this.log('ERROR', error.message, { context });
    this.emit('error', {
      agent: this.name,
      error: error.message,
      context,
      errorCount: this.errorCount
    });
  }

  /**
   * Get agent status
   */
  getStatus() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      uptime: Math.round((Date.now() - this.startTime) / 1000),
      taskCount: this.taskCount,
      errorCount: this.errorCount,
      lastTask: this.lastTask,
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================
// AGENT MANAGER (ORCHESTRATOR)
// ============================================

/**
 * Manages all agents in the system
 * Central coordinator for multi-agent operations
 */
class AgentManager extends EventEmitter {
  constructor(config = {}) {
    super();
    this.agents = new Map();
    this.config = config;
    this.startTime = Date.now();
    this.eventBus = new EventEmitter();
    this.taskQueue = [];
    this.operationLog = [];
  }

  /**
   * Register an agent with the manager
   */
  registerAgent(agent) {
    if (!(agent instanceof Agent)) {
      throw new Error('Must register an Agent instance');
    }

    this.agents.set(agent.name, agent);
    console.log(`✅ Registered agent: ${agent.name}`);

    // Forward agent events to manager
    agent.on('error', (err) => this.handleAgentError(err));
    agent.on('log', (log) => this.logOperation(log));
    agent.on('agent-event', (payload) => this.emit('agent-event', payload));

    return this;
  }

  /**
   * Get an agent by name
   */
  getAgent(name) {
    return this.agents.get(name);
  }

  /**
   * Start all agents
   */
  async startAll() {
    console.log(`🚀 Starting ${this.agents.size} agents...`);

    const promises = Array.from(this.agents.values()).map(agent =>
      agent.initialize().then(() => agent.start()).catch(e => {
        console.error(`Failed to start ${agent.name}:`, e.message);
      })
    );

    await Promise.all(promises);
    console.log(`✅ All agents started`);
    this.emit('all-agents-started');
  }

  /**
   * Stop all agents
   */
  async stopAll() {
    console.log(`🛑 Stopping ${this.agents.size} agents...`);

    const promises = Array.from(this.agents.values()).map(agent =>
      agent.stop().catch(e => {
        console.error(`Failed to stop ${agent.name}:`, e.message);
      })
    );

    await Promise.all(promises);
    console.log(`✅ All agents stopped`);
    this.emit('all-agents-stopped');
  }

  /**
   * Send task to an agent
   */
  async sendTaskToAgent(agentName, taskType, taskData) {
    const agent = this.getAgent(agentName);

    if (!agent) {
      throw new Error(`Agent not found: ${agentName}`);
    }

    if (!taskType || !taskData) {
      throw new Error('taskType and taskData are required');
    }

    if (agent.status !== 'running') {
      await agent.initialize();
      await agent.start();
    }

    const task = {
      id: `TASK_${Date.now()}`,
      type: taskType,
      data: taskData,
      sentAt: new Date().toISOString()
    };

    console.log(`📤 Sending task to ${agentName}: ${taskType}`);

    // Emit task to agent
    agent.emit(`task:${taskType}`, task);
    agent.taskCount++;
    agent.lastTask = task;

    this.logOperation({
      type: 'task_sent',
      agent: agentName,
      taskType,
      timestamp: new Date().toISOString()
    });

    return { success: true, data: taskData, task };
  }

  /**
   * Broadcast event to all agents
   */
  broadcastEvent(eventType, data) {
    console.log(`📢 Broadcasting event: ${eventType}`);

    this.agents.forEach(agent => {
      agent.emit(`event:${eventType}`, data);
      agent.emit(eventType, data);
    });

    this.eventBus.emit(eventType, data);
  }

  /**
   * Log operation for audit trail
   */
  logOperation(operation) {
    this.operationLog.push(operation);

    // Keep last 1000 operations
    if (this.operationLog.length > 1000) {
      this.operationLog = this.operationLog.slice(-1000);
    }
  }

  /**
   * Handle agent errors
   */
  handleAgentError(errorInfo) {
    console.error(`❌ Agent error: ${errorInfo.agent}`, errorInfo.error);

    this.logOperation({
      type: 'agent_error',
      agent: errorInfo.agent,
      error: errorInfo.error,
      errorCount: errorInfo.errorCount,
      timestamp: new Date().toISOString()
    });

    // Escalate if error count is high
    if (errorInfo.errorCount >= 5) {
      console.warn(`⚠️ Agent ${errorInfo.agent} has ${errorInfo.errorCount} errors - consider restart`);
      this.emit('agent-restart-required', { agent: errorInfo.agent });
    }
  }

  /**
   * Get system status
   */
  getStatus() {
    const agentStatuses = {};
    this.agents.forEach((agent, name) => {
      agentStatuses[name] = agent.getStatus();
    });

    return {
      uptime: Math.round((Date.now() - this.startTime) / 1000),
      agentCount: this.agents.size,
      totalAgents: this.agents.size,
      agents: agentStatuses,
      operationLogSize: this.operationLog.length,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get operation audit log
   */
  getAuditLog(limit = 100) {
    return this.operationLog.slice(-limit);
  }
}

// ============================================
// CONCRETE AGENTS
// ============================================

/**
 * Master Orchestrator Agent
 * Central coordinator, orchestrates all other agents
 */
class MasterOrchestratorAgent extends Agent {
  constructor(config = {}) {
    super('Master Orchestrator', {
      responsibilities: ['Central coordination', 'Agent oversight'],
      ...config
    });
  }

  async start() {
    await super.start();

    // Listen for events from other agents
    this.on('event:evidence-collected', this.onEvidenceCollected.bind(this));
    this.on('event:violation-detected', this.onViolationDetected.bind(this));
    this.on('event:investigation-complete', this.onInvestigationComplete.bind(this));
  }

  async onEvidenceCollected(data) {
    this.log('INFO', 'Evidence collected, triggering analysis', { source: data.source });
    // Coordinate next steps
  }

  async onViolationDetected(data) {
    this.log('INFO', 'Violation detected, escalating to alerts', { violation: data.type });
  }

  async onInvestigationComplete(data) {
    this.log('INFO', 'Investigation complete, generating report', { investigation: data.id });
  }
}

/**
 * Evidence Sentinel Agent
 * Responsible for collecting and verifying evidence
 */
class EvidenceSentinelAgent extends Agent {
  constructor(config = {}) {
    super('Evidence Sentinel', {
      responsibilities: ['Data collection', 'Source verification'],
      ...config
    });
  }

  async start() {
    await super.start();

    // Listen for collection tasks
    this.on('task:collect-evidence', this.collectEvidence.bind(this));
    this.on('task:verify-source', this.verifySource.bind(this));
  }

  async collectEvidence(task) {
    this.log('INFO', 'Collecting evidence', { source: task.data.source });
    // Implement evidence collection
    this.emit('event:evidence-collected', {
      source: task.data.source,
      count: Math.floor(Math.random() * 10) + 1
    });
  }

  async verifySource(task) {
    this.log('INFO', 'Verifying source', { url: task.data.url });
    // Implement source verification
  }
}

/**
 * Analysis & Violations Agent
 * Analyzes evidence against legal frameworks
 */
class AnalysisViolationsAgent extends Agent {
  constructor(config = {}) {
    super('Analysis & Violations', {
      responsibilities: ['Legal framework analysis', 'Pattern detection'],
      ...config
    });
  }

  async start() {
    await super.start();

    this.on('task:analyze-evidence', this.analyzeEvidence.bind(this));
    this.on('task:detect-violations', this.detectViolations.bind(this));
  }

  async analyzeEvidence(task) {
    this.log('INFO', 'Analyzing evidence', { evidenceCount: task.data.count });
    // Implement analysis
  }

  async detectViolations(task) {
    this.log('INFO', 'Detecting violations', { framework: task.data.framework });
    // Implement violation detection
    this.emit('event:violation-detected', {
      type: 'rights-violation',
      severity: 'high',
      framework: task.data.framework
    });
  }
}

/**
 * Alerts & Escalation Agent
 * Manages alerts and escalation workflows
 */
class AlertsEscalationAgent extends Agent {
  constructor(config = {}) {
    super('Alerts & Escalation', {
      responsibilities: ['Event escalation', 'Alert routing'],
      ...config
    });
  }

  async start() {
    await super.start();

    this.on('task:create-alert', this.createAlert.bind(this));
    this.on('event:violation-detected', this.onViolationDetected.bind(this));
  }

  async createAlert(task) {
    this.log('INFO', 'Creating alert', { severity: task.data.severity });
    // Implement alert creation
  }

  async onViolationDetected(data) {
    this.log('INFO', 'Processing violation as alert', { severity: data.severity });
    // Auto-escalate violations to alerts
  }
}

/**
 * Communications & Media Agent
 * Generates blog posts, reports, viral content
 */
class CommunicationsMediaAgent extends Agent {
  constructor(config = {}) {
    super('Communications & Media', {
      responsibilities: ['Report generation', 'Media communications'],
      ...config
    });
  }

  async start() {
    await super.start();

    this.on('task:generate-report', this.generateReport.bind(this));
    this.on('task:create-blog-post', this.createBlogPost.bind(this));
  }

  async generateReport(task) {
    try {
      const reportType = task.data.reportType || 'daily-eye-oracle';
      this.log('INFO', 'Generating report', { type: reportType });

      if (reportType === 'daily-eye-oracle') {
        // Generate Eye Oracle daily investigative report and blog package
        const { generateEyeOracleDaily } = require('../scripts/generate-eye-oracle-daily');
        const result = await generateEyeOracleDaily();
        this.log('INFO', 'Report generated', { title: result?.title, date: result?.date });
        this.emit('agent-event', {
          agent: this.name,
          type: 'report-generated',
          reportType,
          title: result?.title,
          date: result?.date || new Date().toISOString().split('T')[0],
          receivedAt: new Date().toISOString()
        });
      } else {
        this.log('WARN', 'Unknown report type requested', { reportType });
      }
    } catch (error) {
      this.handleError(error, { task: 'generate-report' });
      this.emit('agent-event', {
        agent: this.name,
        type: 'report-generation-failed',
        error: error.message,
        receivedAt: new Date().toISOString()
      });
    }
  }

  async createBlogPost(task) {
    try {
      this.log('INFO', 'Creating daily blog post');
      const { generateDailyPost } = require('../scripts/generate-daily-blog-post');
      const post = generateDailyPost();

      this.emit('agent-event', {
        agent: this.name,
        type: 'blog-post-created',
        postDate: post?.date,
        title: post?.title,
        category: post?.category,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      this.handleError(error, { task: 'create-blog-post' });
      this.emit('agent-event', {
        agent: this.name,
        type: 'blog-post-failed',
        error: error.message,
        receivedAt: new Date().toISOString()
      });
    }
  }
}

/**
 * Templates & Advocacy Agent
 * Manages letter templates, FOI templates, advocacy guides
 */
class TemplatesAdvocacyAgent extends Agent {
  constructor(config = {}) {
    super('Templates & Advocacy', {
      responsibilities: ['Document generation', 'Advocacy templates'],
      ...config
    });
  }

  async start() {
    await super.start();

    this.on('task:generate-foi-letter', this.generateFOILetter.bind(this));
    this.on('task:generate-complaint-letter', this.generateComplaintLetter.bind(this));
  }

  async generateFOILetter(task) {
    this.log('INFO', 'Generating FOI letter', { jurisdiction: task.data.jurisdiction });
    // Implement FOI letter generation
  }

  async generateComplaintLetter(task) {
    this.log('INFO', 'Generating complaint letter', { target: task.data.target });
    // Implement complaint letter generation
  }
}

/**
 * Community Intake Agent
 * Manages anonymous tips and community submissions
 */
class CommunityIntakeAgent extends Agent {
  constructor(config = {}) {
    super('Community Intake', {
      responsibilities: ['Tip processing', 'Community intake'],
      ...config
    });
  }

  async start() {
    await super.start();

    this.on('task:process-tip', this.processTip.bind(this));
    this.on('task:verify-submission', this.verifySubmission.bind(this));
  }

  async processTip(task) {
    this.log('INFO', 'Processing tip', { category: task.data.category });
    // Implement tip processing
  }

  async verifySubmission(task) {
    this.log('INFO', 'Verifying submission', { id: task.data.submissionId });
    // Implement verification
  }
}

/**
 * Sync Sentinel Agent
 * Maintains repository sync health, integrity checks, and webhook ingest
 */
class SyncSentinelAgent extends Agent {
  constructor(config = {}) {
    super('Sync Sentinel', {
      responsibilities: ['Repository sync', 'Integrity verification', 'Webhook ingest'],
      ...config
    });
    this.repoPath = config.repoPath || process.cwd();
    this.defaultRemote = config.defaultRemote || process.env.SYNC_REMOTE_URL || 'origin';
    this.defaultBranch = config.defaultBranch || process.env.SYNC_BRANCH || 'master';
    this.recentEvents = [];
    this.lastSync = null;
    this.lastVerification = null;
  }

  async start() {
    await super.start();

    this.on('task:sync-repo', this.syncRepo.bind(this));
    this.on('task:verify-integrity', this.verifyIntegrity.bind(this));
    this.on('task:sync-webhook', this.handleWebhook.bind(this));
  }

  addEvent(event) {
    this.recentEvents.push(event);
    if (this.recentEvents.length > 50) {
      this.recentEvents = this.recentEvents.slice(-50);
    }
    this.emit('agent-event', event);
  }

  async syncRepo(task) {
    try {
      const data = task.data || {};
      const remote = data.remote || this.defaultRemote;
      let branch = data.branch || this.defaultBranch || 'master';
      const mode = data.mode || 'manual';
      const startedAt = new Date().toISOString();
      const doPull = data.pull !== false;

      this.log('INFO', 'Starting repository sync', {
        remote,
        branch,
        mode,
        pull: doPull,
        repoPath: this.repoPath
      });

      if (IS_TEST || SYNC_SIMULATE) {
        const simulated = {
          status: 'simulated',
          remote,
          branch,
          mode,
          pullAttempted: doPull,
          repoPath: this.repoPath,
          startedAt,
          completedAt: new Date().toISOString(),
          conflicts: [],
          filesChecked: data.filesChecked || 0,
          isClean: true,
          head: 'SIMULATED_HEAD',
          currentBranch: branch,
          pullOutput: 'simulation'
        };

        this.lastSync = simulated;
        this.addEvent({
          agent: this.name,
          type: 'sync-completed',
          result: simulated,
          receivedAt: new Date().toISOString()
        });
        return;
      }

        const currentBranchResult = await execAsync('git rev-parse --abbrev-ref HEAD', { cwd: this.repoPath, windowsHide: true });
        branch = branch || currentBranchResult.stdout.trim();

      // Fetch latest refs
      await execAsync(`git fetch ${remote} ${branch}`, { cwd: this.repoPath, windowsHide: true });

      // Check working tree cleanliness
      const statusResult = await execAsync('git status --porcelain', { cwd: this.repoPath, windowsHide: true });
      const isClean = statusResult.stdout.trim().length === 0;

      let pullResult = null;
      if (doPull && isClean) {
        // Fast-forward only to avoid destructive updates
        pullResult = await execAsync(`git pull --ff-only ${remote} ${branch}`, { cwd: this.repoPath, windowsHide: true });
      }

      const head = await execAsync('git rev-parse HEAD', { cwd: this.repoPath, windowsHide: true });

      const result = {
        status: 'success',
        remote,
        branch,
        mode,
        pullAttempted: doPull,
        repoPath: this.repoPath,
        startedAt,
        completedAt: new Date().toISOString(),
        conflicts: [],
        filesChecked: data.filesChecked || 0,
        isClean,
        head: head.stdout.trim(),
        currentBranch: currentBranchResult.stdout.trim(),
        pullOutput: pullResult?.stdout || null
      };

      this.lastSync = result;
      this.addEvent({
        agent: this.name,
        type: 'sync-completed',
        result,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      this.handleError(error, { task: 'sync-repo' });
      this.addEvent({
        agent: this.name,
        type: 'sync-failed',
        error: error.message,
        receivedAt: new Date().toISOString()
      });
    }
  }

  async verifyIntegrity(task) {
    try {
      const data = task.data || {};
      const startedAt = new Date().toISOString();

      this.log('INFO', 'Verifying repository integrity', {
        repoPath: this.repoPath,
        scope: data.scope || 'working-tree'
      });

      if (IS_TEST || SYNC_SIMULATE) {
        const simulated = {
          status: 'clean',
          repoPath: this.repoPath,
          scope: data.scope || 'working-tree',
          checkedAt: new Date().toISOString(),
          startedAt,
          issues: [],
          head: 'SIMULATED_HEAD',
          fsckOutput: null
        };
        this.lastVerification = simulated;
        this.addEvent({
          agent: this.name,
          type: 'verification-completed',
          result: simulated,
          receivedAt: new Date().toISOString()
        });
        return;
      }

      const issues = [];
      const statusResult = await execAsync('git status --porcelain', { cwd: this.repoPath, windowsHide: true });
      if (statusResult.stdout.trim().length > 0) {
        issues.push('Working tree has uncommitted changes');
      }

      const head = await execAsync('git rev-parse HEAD', { cwd: this.repoPath, windowsHide: true });
      let fsckOutput = null;
      try {
        const fsckResult = await execAsync('git fsck --no-dangling', { cwd: this.repoPath, windowsHide: true });
        fsckOutput = fsckResult.stdout.trim();
      } catch (fsckError) {
        issues.push(`git fsck reported issues: ${fsckError.message}`);
      }

      const result = {
        status: issues.length === 0 ? 'clean' : 'issues-found',
        repoPath: this.repoPath,
        scope: data.scope || 'working-tree',
        checkedAt: new Date().toISOString(),
        startedAt,
        issues,
        head: head.stdout.trim(),
        fsckOutput
      };

      this.lastVerification = result;
      this.addEvent({
        agent: this.name,
        type: 'verification-completed',
        result,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      this.handleError(error, { task: 'verify-integrity' });
      this.addEvent({
        agent: this.name,
        type: 'verification-failed',
        error: error.message,
        receivedAt: new Date().toISOString()
      });
    }
  }

  async handleWebhook(task) {
    try {
      const data = task.data || {};
      this.log('INFO', 'Processing sync webhook', {
        event: data.event || 'unknown',
        branch: data.branch,
        remote: data.remote || this.defaultRemote
      });

      this.addEvent({
        agent: this.name,
        type: 'webhook-received',
        event: data.event,
        branch: data.branch,
        remote: data.remote || this.defaultRemote,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      this.handleError(error, { task: 'sync-webhook' });
    }
  }
}

// ============================================
// EXPORT
// ============================================

module.exports = {
  Agent,
  AgentManager,
  MasterOrchestratorAgent,
  EvidenceSentinelAgent,
  AnalysisViolationsAgent,
  AlertsEscalationAgent,
  CommunicationsMediaAgent,
  TemplatesAdvocacyAgent,
  CommunityIntakeAgent,
  SyncSentinelAgent
};
