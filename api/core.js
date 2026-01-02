/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - BACKEND API CORE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Provides REST API for:
 * 1. Daemon health & status monitoring
 * 2. Task management & queue
 * 3. Alert delivery & subscription
 * 4. Investigation data persistence
 * 5. Real-time event coordination
 * 6. Multi-agent orchestration
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

// Import new systems
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
const { AlertOrchestrator } = require('../utils/alert-orchestrator');
const { TRANSP7Framework } = require('../utils/transp7-framework');

// ============================================
// EXPRESS APPLICATION SETUP
// ============================================

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_TEST = NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logging
const logsDir = path.join(__dirname, '../logs/api');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logStream = fs.createWriteStream(
  path.join(logsDir, `api-${new Date().toISOString().split('T')[0]}.log`),
  { flags: 'a' }
);

app.use(Morgan('combined', { stream: logStream }));
app.use(Morgan('dev')); // Also log to console in dev

// ============================================
// CORE STATE MANAGEMENT
// ============================================

class EyeOracleAPI extends EventEmitter {
  constructor() {
    super();
    this.daemonStatus = {
      isRunning: false,
      uptime: 0,
      health: {},
      lastHealthCheck: null
    };
    this.alerts = [];
    this.subscriptions = [];
    this.investigations = [];
    this.taskQueue = [];
    this.startTime = Date.now();
    
    // Initialize new systems
    this.agentManager = new AgentManager();
    this.alertOrchestrator = new AlertOrchestrator();
    this.transp7 = new TRANSP7Framework();
    
    this.registerAgents();
  }
  
  /**
   * Register all agents with the manager
   */
  registerAgents() {
    try {
      this.agentManager.registerAgent(new MasterOrchestratorAgent());
      this.agentManager.registerAgent(new EvidenceSentinelAgent());
      this.agentManager.registerAgent(new AnalysisViolationsAgent());
      this.agentManager.registerAgent(new AlertsEscalationAgent());
      this.agentManager.registerAgent(new CommunicationsMediaAgent());
      this.agentManager.registerAgent(new TemplatesAdvocacyAgent());
      this.agentManager.registerAgent(new CommunityIntakeAgent());
    } catch (error) {
      console.error('Failed to register agents:', error.message);
    }
  }

  getStatus() {
    return {
      api: {
        uptime: Math.round((Date.now() - this.startTime) / 1000),
        environment: NODE_ENV,
        alerts: this.alerts.length,
        subscriptions: this.subscriptions.length,
        investigations: this.investigations.length,
        taskQueueLength: this.taskQueue.length
      },
      daemon: this.daemonStatus,
      timestamp: new Date().toISOString()
    };
  }
}

const eyeAPI = new EyeOracleAPI();

// ============================================
// DAEMON HEALTH ENDPOINT
// ============================================

/**
 * POST /api/daemon/health
 * Receive health updates from daemon
 */
app.post('/api/daemon/health', (req, res) => {
  try {
    const { isRunning, uptime, health, pendingTasks } = req.body;
    
    eyeAPI.daemonStatus = {
      isRunning,
      uptime,
      health,
      pendingTasks,
      lastHealthCheck: new Date().toISOString()
    };
    
    // Emit health update event
    eyeAPI.emit('daemon-health-update', eyeAPI.daemonStatus);
    
    res.json({
      success: true,
      message: 'Health status received',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/daemon/status
 * Get daemon status
 */
app.get('/api/daemon/status', (req, res) => {
  res.json(eyeAPI.daemonStatus);
});

/**
 * GET /api/daemon/logs
 * Get recent daemon logs
 */
app.get('/api/daemon/logs', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const type = req.query.type || 'daemon';
    const logsFile = path.join(__dirname, `../logs/${type}/${type}-${new Date().toISOString().split('T')[0]}.log`);
    
    if (!fs.existsSync(logsFile)) {
      return res.json({ logs: [] });
    }
    
    const content = fs.readFileSync(logsFile, 'utf-8');
    const logs = content.split('\n').filter(l => l.trim()).slice(-limit);
    
    res.json({ logs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================
// ALERTS ENDPOINTS
// ============================================

/**
 * POST /api/alerts
 * Create a new alert
 */
app.post('/api/alerts', (req, res) => {
  try {
    const {
      severity, // critical, high, medium, warning
      title,
      description,
      source,
      evidence,
      relatedInvestigation,
      targetEntities,
      jurisdiction,
      autoEscalate
    } = req.body;

    const alert = {
      id: `ALERT_${Date.now()}`,
      severity,
      title,
      description,
      source,
      evidence,
      relatedInvestigation,
      targetEntities,
      jurisdiction,
      autoEscalate: autoEscalate !== false,
      status: 'active',
      createdAt: new Date().toISOString(),
      triggeredEscalations: []
    };

    eyeAPI.alerts.push(alert);

    // Emit alert event
    eyeAPI.emit('alert-created', alert);

    // Check escalation thresholds
    if (alert.autoEscalate && alert.severity === 'critical') {
      eyeAPI.emit('alert-escalate', alert);
    }

    // Notify subscribers
    eyeAPI.notifySubscribers(alert);

    res.status(201).json(alert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/alerts
 * Get alerts with filtering
 */
app.get('/api/alerts', (req, res) => {
  try {
    const {
      severity,
      jurisdiction,
      source,
      limit = 100,
      offset = 0,
      status = 'active'
    } = req.query;

    let filtered = eyeAPI.alerts.filter(a => a.status === status);

    if (severity) filtered = filtered.filter(a => a.severity === severity);
    if (jurisdiction) filtered = filtered.filter(a => a.jurisdiction === jurisdiction);
    if (source) filtered = filtered.filter(a => a.source === source);

    const paginated = filtered.slice(offset, offset + parseInt(limit));

    res.json({
      total: filtered.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
      alerts: paginated
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/alerts/subscribe
 * Subscribe to alerts
 */
app.post('/api/alerts/subscribe', (req, res) => {
  try {
    const {
      email,
      webhookUrl,
      filters = {} // { severity: ['critical', 'high'], jurisdiction: ['ontario'] }
    } = req.body;

    if (!email && !webhookUrl) {
      return res.status(400).json({ error: 'Email or webhook URL required' });
    }

    const subscription = {
      id: `SUB_${Date.now()}`,
      email,
      webhookUrl,
      filters,
      createdAt: new Date().toISOString(),
      active: true
    };

    eyeAPI.subscriptions.push(subscription);

    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================
// INVESTIGATIONS ENDPOINTS
// ============================================

/**
 * POST /api/investigations
 * Create a new investigation
 */
app.post('/api/investigations', (req, res) => {
  try {
    const {
      title,
      description,
      type, // policy_impact, enforcement_failure, benefit_denial, access_to_justice, discrimination
      jurisdiction,
      targetEntities,
      affectedPopulation,
      legalBasis,
      evidence = [],
      status = 'open'
    } = req.body;

    const investigation = {
      id: `INV_${Date.now()}`,
      title,
      description,
      type,
      jurisdiction,
      targetEntities,
      affectedPopulation,
      legalBasis,
      evidence,
      status,
      timeline: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      relatedAlerts: [],
      recommendations: []
    };

    eyeAPI.investigations.push(investigation);

    // Emit investigation created event
    eyeAPI.emit('investigation-created', investigation);

    res.status(201).json(investigation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/investigations
 * Get investigations
 */
app.get('/api/investigations', (req, res) => {
  try {
    const { jurisdiction, status, type, limit = 50, offset = 0 } = req.query;

    let filtered = eyeAPI.investigations;

    if (jurisdiction) filtered = filtered.filter(i => i.jurisdiction === jurisdiction);
    if (status) filtered = filtered.filter(i => i.status === status);
    if (type) filtered = filtered.filter(i => i.type === type);

    const paginated = filtered.slice(offset, offset + parseInt(limit));

    res.json({
      total: filtered.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
      investigations: paginated
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/investigations/:id
 * Update investigation
 */
app.put('/api/investigations/:id', (req, res) => {
  try {
    const investigation = eyeAPI.investigations.find(i => i.id === req.params.id);

    if (!investigation) {
      return res.status(404).json({ error: 'Investigation not found' });
    }

    Object.assign(investigation, req.body, {
      updatedAt: new Date().toISOString()
    });

    // Emit update event
    eyeAPI.emit('investigation-updated', investigation);

    res.json(investigation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ============================================
// TASK QUEUE ENDPOINTS
// ============================================

/**
 * POST /api/tasks
 * Enqueue a task
 */
app.post('/api/tasks', (req, res) => {
  try {
    const { type, priority = 'normal', params = {} } = req.body;

    const task = {
      id: `TASK_${Date.now()}`,
      type,
      priority,
      params,
      status: 'pending',
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      result: null,
      error: null
    };

    eyeAPI.taskQueue.push(task);

    // Emit task enqueued event
    eyeAPI.emit('task-enqueued', task);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/tasks
 * Get task queue status
 */
app.get('/api/tasks', (req, res) => {
  const { status = 'pending' } = req.query;
  const filtered = eyeAPI.taskQueue.filter(t => t.status === status);

  res.json({
    total: filtered.length,
    tasks: filtered
  });
});

// ============================================
// SYSTEM STATUS ENDPOINT
// ============================================

/**
 * GET /api/status
 * Get full system status
 */
app.get('/api/status', (req, res) => {
  res.json({
    system: eyeAPI.getStatus(),
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/health
 * Health check (for uptime monitors)
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: Math.round((Date.now() - eyeAPI.startTime) / 1000),
    timestamp: new Date().toISOString()
  });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

EyeOracleAPI.prototype.notifySubscribers = function(alert) {
  const relevantSubs = this.subscriptions.filter(sub => {
    if (!sub.active) return false;

    // Check severity filter
    if (sub.filters.severity && !sub.filters.severity.includes(alert.severity)) {
      return false;
    }

    // Check jurisdiction filter
    if (sub.filters.jurisdiction && !sub.filters.jurisdiction.includes(alert.jurisdiction)) {
      return false;
    }

    return true;
  });

  relevantSubs.forEach(sub => {
    if (sub.webhookUrl) {
      // Send webhook
      this.sendWebhook(sub.webhookUrl, alert);
    }

    if (sub.email) {
      // Send email
      this.sendEmail(sub.email, alert);
    }
  });
};

EyeOracleAPI.prototype.sendWebhook = async function(url, data) {
  try {
    // Simulate webhook delivery
    console.log(`📨 Webhook would be sent to: ${url}`);
    // In production: await fetch(url, { method: 'POST', body: JSON.stringify(data) });
  } catch (error) {
    console.error('Webhook delivery failed:', error);
  }
};

EyeOracleAPI.prototype.sendEmail = async function(email, alert) {
  try {
    // Simulate email delivery
    console.log(`📧 Email would be sent to: ${email}`);
    // In production: use nodemailer or email service
  } catch (error) {
    console.error('Email delivery failed:', error);
  }
};

// ============================================
// MULTI-AGENT ORCHESTRATION ENDPOINTS
// ============================================

/**
 * GET /api/agents/status
 * Get status of all registered agents
 */
app.get('/api/agents/status', (req, res) => {
  try {
    const status = eyeAPI.agentManager.getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/agents/:name/task
 * Send a task to a specific agent
 */
app.post('/api/agents/:name/task', async (req, res) => {
  try {
    const { name } = req.params;
    const { taskType, taskData } = req.body;

    if (!taskType || !taskData) {
      return res.status(400).json({ error: 'taskType and taskData are required' });
    }
    
    const result = await eyeAPI.agentManager.sendTaskToAgent(name, taskType, taskData);
    res.status(201).json({
      success: true,
      message: `Task sent to ${name}`,
      result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/agents/:name/logs
 * Get logs from a specific agent
 */
app.get('/api/agents/:name/logs', (req, res) => {
  try {
    const { name } = req.params;
    const agent = eyeAPI.agentManager.getAgent(name);
    if (!agent) {
      return res.status(404).json({ error: `Agent ${name} not found` });
    }
    res.json({ agent: name, logs: agent.logs || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ALERT ORCHESTRATION ENDPOINTS
// ============================================

/**
 * POST /api/alerts/orchestrated
 * Process alert through advanced orchestration system
 */
app.post('/api/alerts/orchestrated', async (req, res) => {
  try {
    const alert = req.body;
    
    // Tag with TRANSP7 transparency
    const tagged = eyeAPI.transp7.tagWithSource(alert, {
      name: 'API Alert Endpoint',
      url: req.originalUrl,
      accessedAt: new Date()
    });
    
    // Process through alert orchestrator
    const result = await eyeAPI.alertOrchestrator.processAlert(tagged);
    
    res.status(201).json({
      success: true,
      message: 'Alert processed through orchestration',
      alertId: alert.id,
      escalationLevel: result.escalationLevel,
      routing: result.routing,
      deliveryChannels: result.deliveryChannels
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/alerts/orchestrator/status
 * Get alert orchestrator status and statistics
 */
app.get('/api/alerts/orchestrator/status', (req, res) => {
  try {
    const status = eyeAPI.alertOrchestrator.getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// TRANSP7 TRANSPARENCY ENDPOINTS
// ============================================

/**
 * GET /api/transparency/dashboard
 * Public transparency dashboard showing TRANSP7 compliance
 */
app.get('/api/transparency/dashboard', (req, res) => {
  try {
    const dashboard = eyeAPI.transp7.generateTransp7Dashboard();
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/transparency/corrections
 * Public log of all corrections made
 */
app.get('/api/transparency/corrections', (req, res) => {
  try {
    const corrections = eyeAPI.transp7.generateCorrectionsLog();
    res.json(corrections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/transparency/methodology
 * Public methodology guide
 */
app.get('/api/transparency/methodology', (req, res) => {
  try {
    const methodology = eyeAPI.transp7.generatePublicMethodologyGuide();
    res.json(methodology);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/transparency/ai-usage
 * AI transparency report
 */
app.get('/api/transparency/ai-usage', (req, res) => {
  try {
    const report = eyeAPI.transp7.generateAITransparencyReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/transparency/conflicts
 * Conflict of interest and limitations declarations
 */
app.get('/api/transparency/conflicts', (req, res) => {
  try {
    const conflicts = eyeAPI.transp7.generateConflictStatement();
    res.json(conflicts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/transparency/community-protection
 * Community data protection policy
 */
app.get('/api/transparency/community-protection', (req, res) => {
  try {
    const policy = eyeAPI.transp7.generateCommunityProtectionPolicy();
    res.json(policy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ============================================
// SERVER START
// ============================================

let server = null;

// Avoid binding a real port during tests to prevent open handle warnings
if (!IS_TEST) {
  server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║  👁️ THE EYE ORACLE - BACKEND API                ║
║  Permanent Investigative Intelligence System     ║
╚═══════════════════════════════════════════════════╝

Environment: ${NODE_ENV}
Port: ${PORT}
Started: ${new Date().toISOString()}

Endpoints:
  GET  /api/health              - Health check
  GET  /api/status              - Full system status
  GET  /api/daemon/status       - Daemon status
  GET  /api/daemon/logs         - Daemon logs
  POST /api/daemon/health       - Daemon health report
  GET  /api/alerts              - List alerts
  POST /api/alerts              - Create alert
  POST /api/alerts/subscribe    - Subscribe to alerts
  GET  /api/investigations      - List investigations
  POST /api/investigations      - Create investigation
  PUT  /api/investigations/:id  - Update investigation
  GET  /api/tasks               - Task queue status
  POST /api/tasks               - Enqueue task

THE EYE NEVER SLEEPS 👁️
    `);
  });
}

// Graceful shutdown
if (server) {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received - shutting down gracefully');
    server.close(() => {
      console.log('API server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received - shutting down gracefully');
    server.close(() => {
      console.log('API server closed');
      process.exit(0);
    });
  });
}

module.exports = { app, eyeAPI, server };
