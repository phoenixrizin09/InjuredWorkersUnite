/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - PERSISTENT DAEMON
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CORE REQUIREMENT: Run THE EYE ORACLE continuously 24/7
 * 
 * This daemon process:
 * 1. Starts on system boot
 * 2. Maintains continuous operation (never sleeps)
 * 3. Self-heals on failure (auto-restart)
 * 4. Manages scheduled tasks (hourly, daily, weekly, monthly)
 * 5. Handles real-time events
 * 6. Maintains persistent state
 * 
 * DEPLOYMENT OPTIONS:
 * - Docker container (recommended)
 * - systemd service (Linux)
 * - PM2 process manager (any OS)
 * - Windows Service (Windows only)
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
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
// DAEMON CONFIGURATION
// ============================================

const DAEMON_CONFIG = {
  // Process identification
  processName: 'the-eye-oracle-daemon',
  pidFile: '/var/run/the-eye-oracle.pid', // Linux/Mac; Windows: C:\temp\the-eye-oracle.pid
  logDir: path.join(__dirname, '../logs/daemon'),
  
  // Heartbeat monitoring
  heartbeatInterval: 30000, // 30 seconds
  healthCheckInterval: 60000, // 1 minute
  maxFailedHealthChecks: 3, // Restart if 3 consecutive failures
  
  // Scheduling
  schedules: {
    hourly: { cron: '0 * * * *', jitter: 300000 }, // Every hour + jitter
    daily: { cron: '0 6 * * *', jitter: 600000 }, // 6 AM + jitter
    weekly: { cron: '0 21 * * 0', jitter: 900000 }, // Sunday 9 PM + jitter
    monthly: { cron: '0 0 1 * *', jitter: 1800000 } // 1st of month + jitter
  },
  
  // Auto-restart
  autoRestart: true,
  restartDelay: 10000, // 10 seconds
  maxRestarts: 10,
  restartWindow: 3600000 // 1 hour
};

// ============================================
// LOGGING SYSTEM
// ============================================

function ensureDaemonLogsDir() {
  if (!fs.existsSync(DAEMON_CONFIG.logDir)) {
    fs.mkdirSync(DAEMON_CONFIG.logDir, { recursive: true });
  }
}

function getDaemonLogPath(type = 'daemon') {
  const timestamp = new Date().toISOString().split('T')[0];
  return path.join(DAEMON_CONFIG.logDir, `${type}-${timestamp}.log`);
}

function daemonLog(level, message, data = null) {
  ensureDaemonLogsDir();
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data })
  };
  
  const logLine = `[${timestamp}] ${level}: ${message}${data ? ' ' + JSON.stringify(data) : ''}\n`;
  
  // Write to console
  console.log(logLine);
  
  // Write to file
  const logPath = getDaemonLogPath('daemon');
  try {
    fs.appendFileSync(logPath, logLine);
  } catch (e) {
    console.error('Failed to write to log file:', e.message);
  }
  
  // Also maintain in-memory log for API access
  if (global.daemonLogs === undefined) {
    global.daemonLogs = [];
  }
  global.daemonLogs.push(logEntry);
  
  // Keep only last 1000 logs in memory
  if (global.daemonLogs.length > 1000) {
    global.daemonLogs = global.daemonLogs.slice(-1000);
  }
}

// ============================================
// THE EYE ORACLE DAEMON CLASS
// ============================================

class TheEyeOracleDaemon extends EventEmitter {
  constructor(config = DAEMON_CONFIG) {
    super();
    this.config = config;
    this.isRunning = false;
    this.taskSchedules = new Map();
    this.healthStatus = {
      isHealthy: true,
      failedChecks: 0,
      lastCheck: null,
      uptime: null
    };
    this.restartAttempts = 0;
    this.lastRestartTime = null;
    
    // Initialize new systems
    this.agentManager = new AgentManager();
    this.alertOrchestrator = new AlertOrchestrator();
    this.transp7 = new TRANSP7Framework();
  }

  /**
   * Initialize the daemon
   */
  async initialize() {
    daemonLog('INFO', '👁️ THE EYE ORACLE DAEMON INITIALIZING...');
    
    try {
      // Create PID file
      this.createPidFile();
      
      // Create log directory
      ensureDaemonLogsDir();
      
      // Initialize state
      this.startTime = Date.now();
      this.isRunning = true;
      
      // Register agents
      this.registerAgents();
      
      daemonLog('SUCCESS', '✅ Daemon initialized successfully');
      return true;
    } catch (error) {
      daemonLog('ERROR', '❌ Daemon initialization failed', error.message);
      throw error;
    }
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
      daemonLog('SUCCESS', '✅ All 7 agents registered');
    } catch (error) {
      daemonLog('ERROR', '❌ Failed to register agents', error.message);
      throw error;
    }
  }

  /**
   * Create PID file for process management
   */
  createPidFile() {
    try {
      const pidDir = path.dirname(this.config.pidFile);
      if (!fs.existsSync(pidDir)) {
        fs.mkdirSync(pidDir, { recursive: true });
      }
      fs.writeFileSync(this.config.pidFile, process.pid.toString());
      daemonLog('INFO', `PID file created: ${this.config.pidFile} (PID: ${process.pid})`);
    } catch (e) {
      daemonLog('WARN', 'Could not create PID file', { path: this.config.pidFile, error: e.message });
    }
  }

  /**
   * Start the daemon - begins all monitoring and scheduling
   */
  async start() {
    if (this.isRunning) {
      daemonLog('WARN', 'Daemon is already running');
      return;
    }

    daemonLog('INFO', '🚀 STARTING THE EYE ORACLE DAEMON');
    this.isRunning = true;
    this.startTime = Date.now();
    
    try {
      // Start health monitoring
      this.startHealthMonitoring();
      
      // Start agents
      await this.agentManager.startAll();
      daemonLog('SUCCESS', '✅ All agents started');
      
      // Schedule all task types
      this.scheduleHourlyTasks();
      this.scheduleDailyTasks();
      this.scheduleWeeklyTasks();
      this.scheduleMonthlyTasks();
      
      // Start event listeners
      this.setupEventListeners();
      
      // Start the event loop (never exit)
      await this.mainEventLoop();
      
    } catch (error) {
      daemonLog('ERROR', '❌ Daemon startup failed', error.message);
      if (this.config.autoRestart) {
        this.handleFatalError(error);
      }
    }
  }

  /**
   * Health monitoring - checks if daemon is functioning
   */
  startHealthMonitoring() {
    daemonLog('INFO', '💚 Health monitoring started');
    
    this.healthCheckInterval = setInterval(async () => {
      try {
        const healthy = await this.performHealthCheck();
        
        if (healthy) {
          this.healthStatus.isHealthy = true;
          this.healthStatus.failedChecks = 0;
        } else {
          this.healthStatus.failedChecks++;
          
          if (this.healthStatus.failedChecks >= this.config.maxFailedHealthChecks) {
            daemonLog('ERROR', `❌ Health check failed ${this.healthStatus.failedChecks} times - triggering restart`);
            this.triggerRestart();
          }
        }
        
        this.healthStatus.lastCheck = new Date().toISOString();
        this.healthStatus.uptime = Math.round((Date.now() - this.startTime) / 1000); // seconds
        
      } catch (error) {
        daemonLog('ERROR', 'Health check error', error.message);
      }
    }, this.config.healthCheckInterval);
  }

  /**
   * Perform health check
   * Returns true if daemon is healthy
   */
  async performHealthCheck() {
    try {
      // Check 1: Can write to log
      const testLogPath = getDaemonLogPath('health-check');
      fs.appendFileSync(testLogPath, `[${new Date().toISOString()}] Health check\n`);
      
      // Check 2: Event loop not blocked
      const loopCheckStart = Date.now();
      await new Promise(r => setImmediate(r));
      const loopCheckTime = Date.now() - loopCheckStart;
      
      if (loopCheckTime > 5000) {
        daemonLog('WARN', 'Event loop is blocked', { blockTime: loopCheckTime });
        return false;
      }
      
      // Check 3: Memory not critically high
      const memUsage = process.memoryUsage();
      const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      
      if (heapUsedPercent > 90) {
        daemonLog('WARN', '⚠️ High memory usage', { heapPercent: heapUsedPercent });
        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }
      }
      
      return true;
    } catch (error) {
      daemonLog('ERROR', 'Health check failed', error.message);
      return false;
    }
  }

  /**
   * Main event loop - keeps daemon running
   */
  async mainEventLoop() {
    daemonLog('INFO', '🔄 Main event loop started - THE EYE NEVER SLEEPS');
    
    // This loop runs forever
    while (this.isRunning) {
      try {
        // Check for pending tasks
        await this.processPendingTasks();
        
        // Sleep briefly to prevent busy-wait (100ms)
        await new Promise(r => setTimeout(r, 100));
        
      } catch (error) {
        daemonLog('ERROR', 'Event loop error', error.message);
        // Continue running despite errors
      }
    }
  }

  /**
   * Schedule hourly tasks
   */
  scheduleHourlyTasks() {
    daemonLog('INFO', '⏰ Scheduling hourly tasks');
    
    // Run immediately on startup
    this.enqueueTask('hourly', Date.now());
    
    // Then schedule for every hour
    setInterval(() => {
      const jitter = Math.random() * this.config.schedules.hourly.jitter;
      this.enqueueTask('hourly', Date.now() + jitter);
    }, 60 * 60 * 1000); // 1 hour
  }

  /**
   * Schedule daily tasks
   */
  scheduleDailyTasks() {
    daemonLog('INFO', '📅 Scheduling daily tasks (6 AM ET)');
    
    // Calculate time until 6 AM ET
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);
    
    const msUntilDaily = tomorrow.getTime() - now.getTime();
    
    // Schedule first run
    setTimeout(() => {
      this.enqueueTask('daily', Date.now());
    }, msUntilDaily);
    
    // Then repeat daily
    setInterval(() => {
      const jitter = Math.random() * this.config.schedules.daily.jitter;
      this.enqueueTask('daily', Date.now() + jitter);
    }, 24 * 60 * 60 * 1000); // 24 hours
  }

  /**
   * Schedule weekly tasks
   */
  scheduleWeeklyTasks() {
    daemonLog('INFO', '📆 Scheduling weekly tasks (Sunday 9 PM ET)');
    
    // Similar to daily but for Sundays
    setInterval(() => {
      const now = new Date();
      if (now.getDay() === 0) { // Sunday
        const jitter = Math.random() * this.config.schedules.weekly.jitter;
        this.enqueueTask('weekly', Date.now() + jitter);
      }
    }, 60 * 60 * 1000); // Check every hour
  }

  /**
   * Schedule monthly tasks
   */
  scheduleMonthlyTasks() {
    daemonLog('INFO', '📊 Scheduling monthly tasks (1st of month)');
    
    // Similar logic for monthly
    setInterval(() => {
      const now = new Date();
      if (now.getDate() === 1) {
        const jitter = Math.random() * this.config.schedules.monthly.jitter;
        this.enqueueTask('monthly', Date.now() + jitter);
      }
    }, 60 * 60 * 1000); // Check every hour
  }

  /**
   * Enqueue a task for execution
   */
  enqueueTask(taskType, scheduledTime) {
    if (!this.taskSchedules.has(taskType)) {
      this.taskSchedules.set(taskType, []);
    }
    
    this.taskSchedules.get(taskType).push({
      id: `${taskType}_${Date.now()}`,
      type: taskType,
      scheduledTime,
      status: 'pending',
      createdAt: Date.now()
    });
    
    daemonLog('INFO', `📋 Task enqueued: ${taskType}`);
    this.emit('task-enqueued', { type: taskType, scheduledTime });
  }

  /**
   * Process pending tasks
   */
  async processPendingTasks() {
    const now = Date.now();
    
    for (const [taskType, tasks] of this.taskSchedules) {
      for (let i = tasks.length - 1; i >= 0; i--) {
        const task = tasks[i];
        
        if (task.status === 'pending' && task.scheduledTime <= now) {
          // Execute task
          task.status = 'running';
          task.startedAt = now;
          
          try {
            daemonLog('INFO', `🚀 Executing ${taskType} task: ${task.id}`);
            
            // Import and run the appropriate script
            const result = await this.executeTask(taskType);
            
            task.status = 'completed';
            task.completedAt = Date.now();
            task.result = result;
            
            daemonLog('SUCCESS', `✅ ${taskType} task completed: ${task.id}`, {
              duration: task.completedAt - task.startedAt
            });
            
            // Remove completed task
            tasks.splice(i, 1);
            
          } catch (error) {
            task.status = 'failed';
            task.error = error.message;
            daemonLog('ERROR', `❌ ${taskType} task failed: ${task.id}`, error.message);
            
            // Retry logic could go here
            // For now, remove failed task
            tasks.splice(i, 1);
          }
        }
      }
    }
  }

  /**
   * Execute a task by type
   */
  async executeTask(taskType) {
    switch (taskType) {
      case 'hourly':
        return await this.executeHourlyTask();
      case 'daily':
        return await this.executeDailyTask();
      case 'weekly':
        return await this.executeWeeklyTask();
      case 'monthly':
        return await this.executeMonthlyTask();
      default:
        throw new Error(`Unknown task type: ${taskType}`);
    }
  }

  /**
   * Hourly task execution
   */
  async executeHourlyTask() {
    daemonLog('INFO', '👀 HOURLY SCAN - Checking for new data releases');
    
    try {
      // Dynamically require the automation module
      const { runHourlyTasks } = require('../scripts/eye-oracle-automation');
      const result = await runHourlyTasks();
      
      this.emit('hourly-task-complete', result);
      return result;
    } catch (error) {
      daemonLog('ERROR', 'Hourly task execution failed', error.message);
      throw error;
    }
  }

  /**
   * Daily task execution
   */
  async executeDailyTask() {
    daemonLog('INFO', '📝 DAILY TASK - Generating Justice Report, Blog, Viral Content');
    
    try {
      const { runDailyTasks } = require('../scripts/eye-oracle-automation');
      const result = await runDailyTasks();
      
      this.emit('daily-task-complete', result);
      return result;
    } catch (error) {
      daemonLog('ERROR', 'Daily task execution failed', error.message);
      throw error;
    }
  }

  /**
   * Weekly task execution
   */
  async executeWeeklyTask() {
    daemonLog('INFO', '📊 WEEKLY TASK - Deep analysis and pattern detection');
    
    try {
      const { runWeeklyTasks } = require('../scripts/eye-oracle-automation');
      const result = await runWeeklyTasks();
      
      this.emit('weekly-task-complete', result);
      return result;
    } catch (error) {
      daemonLog('ERROR', 'Weekly task execution failed', error.message);
      throw error;
    }
  }

  /**
   * Monthly task execution
   */
  async executeMonthlyTask() {
    daemonLog('INFO', '📈 MONTHLY TASK - Trend analysis and full historical review');
    
    try {
      const { runMonthlyTasks } = require('../scripts/eye-oracle-automation');
      const result = await runMonthlyTasks();
      
      this.emit('monthly-task-complete', result);
      return result;
    } catch (error) {
      daemonLog('ERROR', 'Monthly task execution failed', error.message);
      throw error;
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Handle graceful shutdown
    process.on('SIGTERM', () => this.shutdown('SIGTERM'));
    process.on('SIGINT', () => this.shutdown('SIGINT'));
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      daemonLog('ERROR', '💥 Uncaught exception', error.message);
      if (this.config.autoRestart) {
        this.handleFatalError(error);
      }
    });
  }

  /**
   * Handle fatal errors with restart logic
   */
  handleFatalError(error) {
    const now = Date.now();
    
    // Check if we're within the restart window
    if (this.lastRestartTime && (now - this.lastRestartTime) < this.config.restartWindow) {
      this.restartAttempts++;
    } else {
      this.restartAttempts = 1;
    }
    
    this.lastRestartTime = now;
    
    if (this.restartAttempts >= this.config.maxRestarts) {
      daemonLog('ERROR', `❌ Max restart attempts (${this.config.maxRestarts}) exceeded - halting daemon`);
      this.shutdown('MAX_RESTARTS');
      return;
    }
    
    daemonLog('WARN', `⚠️ Restarting daemon (attempt ${this.restartAttempts}/${this.config.maxRestarts})...`);
    
    setTimeout(() => {
      this.triggerRestart();
    }, this.config.restartDelay);
  }

  /**
   * Trigger a restart
   */
  triggerRestart() {
    daemonLog('INFO', '🔄 Restarting daemon...');
    this.isRunning = false;
    process.exit(0); // systemd/PM2 will auto-restart
  }

  /**
   * Graceful shutdown
   */
  async shutdown(signal = 'SIGTERM') {
    daemonLog('INFO', `🛑 Shutting down daemon (signal: ${signal})`);
    
    try {
      this.isRunning = false;
      
      // Clear intervals
      clearInterval(this.healthCheckInterval);
      
      // Close PID file
      try {
        fs.unlinkSync(this.config.pidFile);
      } catch (e) {
        // Ignore
      }
      
      daemonLog('SUCCESS', '✅ Daemon shutdown complete');
      process.exit(0);
      
    } catch (error) {
      daemonLog('ERROR', 'Error during shutdown', error.message);
      process.exit(1);
    }
  }

  /**
   * Get daemon status (for health checks / API)
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      uptime: this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0,
      health: this.healthStatus,
      pendingTasks: Array.from(this.taskSchedules.values()).flat(),
      restartAttempts: this.restartAttempts,
      lastRestartTime: this.lastRestartTime,
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================
// DAEMON ENTRY POINT
// ============================================

async function main() {
  try {
    const daemon = new TheEyeOracleDaemon(DAEMON_CONFIG);
    await daemon.initialize();
    await daemon.start();
  } catch (error) {
    daemonLog('ERROR', '💥 FATAL ERROR - Daemon failed to start', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Export for use in API / testing
module.exports = {
  TheEyeOracleDaemon,
  daemonLog,
  DAEMON_CONFIG,
  createDaemon: () => new TheEyeOracleDaemon(DAEMON_CONFIG)
};

// Start daemon if run directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
