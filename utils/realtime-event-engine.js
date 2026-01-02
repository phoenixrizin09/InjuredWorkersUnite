/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - REAL-TIME EVENT ENGINE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Enables real-time communication between:
 * 1. Daemon (task execution)
 * 2. Backend API (state management)
 * 3. Frontend (live updates)
 * 4. Multi-agent system (inter-agent communication)
 * 
 * Features:
 * - WebSocket support for live dashboard
 * - Event emitter for inter-component communication
 * - Event persistence (for recovery)
 * - Event replay (for new subscribers)
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

// ============================================
// EVENT TYPES & SEVERITY LEVELS
// ============================================

const EVENT_TYPES = {
  DAEMON: 'daemon',
  TASK: 'task',
  ALERT: 'alert',
  INVESTIGATION: 'investigation',
  EVIDENCE: 'evidence',
  VIOLATION: 'violation',
  ESCALATION: 'escalation',
  AGENT: 'agent',
  DATA: 'data',
  SYSTEM: 'system'
};

const EVENT_SEVERITY = {
  CRITICAL: 'critical',    // System is broken or critical violation detected
  HIGH: 'high',             // Major issue requiring immediate attention
  MEDIUM: 'medium',         // Moderate issue, important but not critical
  LOW: 'low',               // Minor issue, FYI only
  INFO: 'info'              // Informational only
};

// ============================================
// REAL-TIME EVENT ENGINE
// ============================================

class RealTimeEventEngine extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = {
      eventHistorySize: config.eventHistorySize || 1000,
      persistEvents: config.persistEvents !== false,
      eventLogDir: config.eventLogDir || path.join(__dirname, '../logs/events'),
      ...config
    };

    this.eventHistory = [];
    this.subscribers = new Map(); // WebSocket connections
    this.filters = new Map(); // Per-subscriber filters
    this.eventCounts = {}; // Track event frequency

    // Ensure event log directory exists
    if (this.config.persistEvents && !fs.existsSync(this.config.eventLogDir)) {
      fs.mkdirSync(this.config.eventLogDir, { recursive: true });
    }
  }

  /**
   * Emit an event with full context
   */
  emitEvent(type, severity, data) {
    const event = {
      id: `EVENT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      timestamp: new Date().toISOString(),
      data,
      source: this.getCallerInfo()
    };

    // Add to history
    this.eventHistory.push(event);

    // Keep history bounded
    if (this.eventHistory.length > this.config.eventHistorySize) {
      this.eventHistory = this.eventHistory.slice(-this.config.eventHistorySize);
    }

    // Count event type
    this.eventCounts[type] = (this.eventCounts[type] || 0) + 1;

    // Persist to disk
    if (this.config.persistEvents) {
      this.persistEvent(event);
    }

    // Broadcast to subscribers
    this.broadcastEvent(event);

    // Emit on main event bus
    this.emit(`event:${type}`, event);
    this.emit(`event:${severity}`, event);
    this.emit('event', event);

    return event;
  }

  /**
   * Get caller information for debugging
   */
  getCallerInfo() {
    const stack = new Error().stack.split('\n');
    // Find first non-engine caller
    for (let i = 2; i < stack.length; i++) {
      if (!stack[i].includes('RealTimeEventEngine')) {
        return stack[i].trim();
      }
    }
    return 'unknown';
  }

  /**
   * Persist event to disk
   */
  persistEvent(event) {
    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const logFile = path.join(this.config.eventLogDir, `events-${dateStr}.jsonl`);
      fs.appendFileSync(logFile, JSON.stringify(event) + '\n');
    } catch (error) {
      console.error('Failed to persist event:', error.message);
    }
  }

  /**
   * Register a WebSocket subscriber
   */
  registerSubscriber(subscriberId, filters = {}) {
    this.subscribers.set(subscriberId, {
      id: subscriberId,
      connectedAt: new Date().toISOString(),
      lastHeartbeat: Date.now()
    });
    this.filters.set(subscriberId, filters);

    // Send recent event history (replay)
    this.replayEvents(subscriberId, filters);
  }

  /**
   * Unregister a subscriber
   */
  unregisterSubscriber(subscriberId) {
    this.subscribers.delete(subscriberId);
    this.filters.delete(subscriberId);
  }

  /**
   * Broadcast event to all subscribers
   */
  broadcastEvent(event) {
    for (const [subscriberId, subData] of this.subscribers) {
      // Update heartbeat
      subData.lastHeartbeat = Date.now();

      // Check if subscriber wants this event
      const filters = this.filters.get(subscriberId) || {};

      if (this.matchesFilter(event, filters)) {
        this.emit(`broadcast:${subscriberId}`, event);
      }
    }
  }

  /**
   * Check if event matches subscriber's filter
   */
  matchesFilter(event, filters) {
    if (!filters || Object.keys(filters).length === 0) {
      return true; // No filter = all events
    }

    // Type filter
    if (filters.types && !filters.types.includes(event.type)) {
      return false;
    }

    // Severity filter (only show >= this level)
    if (filters.minSeverity) {
      const severityOrder = ['info', 'low', 'medium', 'high', 'critical'];
      const eventSeverityIdx = severityOrder.indexOf(event.severity);
      const minSeverityIdx = severityOrder.indexOf(filters.minSeverity);
      if (eventSeverityIdx < minSeverityIdx) {
        return false;
      }
    }

    // Keyword search in data
    if (filters.keywords) {
      const eventStr = JSON.stringify(event).toLowerCase();
      const matches = filters.keywords.some(kw => eventStr.includes(kw.toLowerCase()));
      if (!matches) return false;
    }

    return true;
  }

  /**
   * Replay recent events to new subscriber
   */
  replayEvents(subscriberId, filters = {}) {
    const recentEvents = this.getHistory(filters, 50); // Last 50 events

    // Send as a batch
    this.emit(`broadcast:${subscriberId}`, {
      type: 'REPLAY_BATCH',
      timestamp: new Date().toISOString(),
      count: recentEvents.length,
      events: recentEvents
    });
  }

  /**
   * Get event history with filtering
   */
  getHistory(filters = {}, limit = 100) {
    let results = [...this.eventHistory];

    // Filter by type
    if (filters.types) {
      results = results.filter(e => filters.types.includes(e.type));
    }

    // Filter by severity
    if (filters.minSeverity) {
      const severityOrder = ['info', 'low', 'medium', 'high', 'critical'];
      const minIdx = severityOrder.indexOf(filters.minSeverity);
      results = results.filter(e => {
        const eIdx = severityOrder.indexOf(e.severity);
        return eIdx >= minIdx;
      });
    }

    // Filter by time range
    if (filters.sinceTimestamp) {
      results = results.filter(e => new Date(e.timestamp) > new Date(filters.sinceTimestamp));
    }

    // Return most recent
    return results.slice(-limit);
  }

  /**
   * Get event statistics
   */
  getStats() {
    return {
      totalEvents: this.eventHistory.length,
      eventCounts: this.eventCounts,
      subscribers: this.subscribers.size,
      oldestEvent: this.eventHistory.length > 0 ? this.eventHistory[0].timestamp : null,
      newestEvent: this.eventHistory.length > 0 ? this.eventHistory[this.eventHistory.length - 1].timestamp : null
    };
  }

  /**
   * Clean up inactive subscribers
   */
  cleanupInactiveSubscribers(timeoutMs = 5 * 60 * 1000) {
    const now = Date.now();
    const inactive = [];

    for (const [id, sub] of this.subscribers) {
      if (now - sub.lastHeartbeat > timeoutMs) {
        inactive.push(id);
      }
    }

    inactive.forEach(id => this.unregisterSubscriber(id));

    return inactive;
  }
}

// ============================================
// CONVENIENCE METHODS FOR DAEMON
// ============================================

const rtEngine = new RealTimeEventEngine();

// Daemon task events
rtEngine.emitTask = function(status, taskType, data = {}) {
  this.emitEvent(
    EVENT_TYPES.TASK,
    status === 'failed' ? EVENT_SEVERITY.HIGH : EVENT_SEVERITY.LOW,
    {
      status,
      taskType,
      ...data
    }
  );
};

// Alert events
rtEngine.emitAlert = function(severity, title, data = {}) {
  this.emitEvent(EVENT_TYPES.ALERT, severity, {
    title,
    ...data
  });
};

// Violation detection
rtEngine.emitViolation = function(violationType, jurisdiction, severity = EVENT_SEVERITY.HIGH, evidence = []) {
  this.emitEvent(EVENT_TYPES.VIOLATION, severity, {
    type: violationType,
    jurisdiction,
    evidence
  });
};

// Investigation update
rtEngine.emitInvestigation = function(status, investigationId, data = {}) {
  this.emitEvent(EVENT_TYPES.INVESTIGATION, EVENT_SEVERITY.MEDIUM, {
    status,
    investigationId,
    ...data
  });
};

// Data update
rtEngine.emitDataUpdate = function(dataType, source, updateCount = 1) {
  this.emitEvent(EVENT_TYPES.DATA, EVENT_SEVERITY.LOW, {
    dataType,
    source,
    updateCount
  });
};

// System status
rtEngine.emitSystemStatus = function(status, component, message = '') {
  const severity = status === 'error' ? EVENT_SEVERITY.CRITICAL :
                   status === 'warning' ? EVENT_SEVERITY.MEDIUM : EVENT_SEVERITY.LOW;

  this.emitEvent(EVENT_TYPES.SYSTEM, severity, {
    status,
    component,
    message
  });
};

// ============================================
// EXPORT
// ============================================

module.exports = {
  RealTimeEventEngine,
  rtEngine,
  EVENT_TYPES,
  EVENT_SEVERITY
};
