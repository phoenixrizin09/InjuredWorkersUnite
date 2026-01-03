# 👁️ THE EYE ORACLE - CRITICAL FIXES IMPLEMENTATION GUIDE

## Overview

This guide implements the 3 CRITICAL FIX PRIORITIES to enable true 24/7 operation.

---

## FIX #1: Persistent Daemon (URGENT)

### Status
- ✅ **Code Ready:** `daemon/eye-oracle-daemon.js`
- ✅ **Docker Ready:** `Dockerfile` + `docker-compose.yml`
- ✅ **Deployment Guide:** `DAEMON_DEPLOYMENT.md`

### Implementation Steps

#### Step 1: Test Daemon Locally
```bash
# Make sure all dependencies are installed
npm install

# Run daemon directly (will start immediately)
node daemon/eye-oracle-daemon.js

# You should see output like:
# ╔═══════════════════════════════════════════════════════════════════════════╗
# ║  👁️ THE EYE ORACLE DAEMON INITIALIZING...                               ║
# ║  🚀 STARTING THE EYE ORACLE DAEMON                                        ║
# ║  💚 Health monitoring started                                            ║
# ║  🔄 Main event loop started - THE EYE NEVER SLEEPS                       ║
# ╚═══════════════════════════════════════════════════════════════════════════╝

# Let it run for 5 minutes to test
# Check logs: tail -f logs/daemon/daemon-YYYY-MM-DD.log
```

#### Step 2: Deploy with Docker (Recommended)
```bash
# Build Docker image
docker build -t the-eye-oracle:latest .

# Start with docker-compose
docker-compose up -d

# Verify it's running
docker ps -f name=the-eye-oracle
docker logs the-eye-oracle -f

# Check health
curl http://localhost:3001/api/health
```

#### Step 3: Monitor Logs
```bash
# Docker logs
docker logs -f the-eye-oracle

# Or check log file
tail -f logs/daemon/daemon-$(date +%Y-%m-%d).log
```

#### Step 4: Keep Running
Docker with `restart: always` will keep it running 24/7. If it crashes, it auto-restarts.

---

## FIX #2: Backend API (Required for Persistence)

### Status
- ✅ **Code Ready:** `api/core.js`
- ⚠️ **Dependencies needed:** Express, CORS, Helmet, Morgan

### Implementation Steps

#### Step 1: Install API Dependencies
```bash
npm install express cors helmet morgan body-parser --save
```

#### Step 2: Create API Entry Point
Create `server.js`:

```javascript
#!/usr/bin/env node

/**
 * THE EYE ORACLE - Server Entry Point
 * Starts both daemon and API
 */

const { TheEyeOracleDaemon } = require('./daemon/eye-oracle-daemon');
const { app: apiApp } = require('./api/core');

// Start API server
const API_PORT = process.env.API_PORT || 3001;
const apiServer = apiApp.listen(API_PORT, () => {
  console.log(`✅ API Server running on port ${API_PORT}`);
});

// Start daemon in background
const daemon = new TheEyeOracleDaemon();
daemon.initialize().then(() => {
  daemon.start().catch(error => {
    console.error('Daemon error:', error);
  });
}).catch(error => {
  console.error('Daemon init error:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM - Shutting down...');
  apiServer.close();
  daemon.shutdown('SIGTERM');
});
```

#### Step 3: Update package.json scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "daemon:only": "node daemon/eye-oracle-daemon.js",
    "api:only": "node api/core.js"
  }
}
```

#### Step 4: Test API
```bash
# Start server
npm start

# Test endpoints
curl http://localhost:3001/api/health
curl http://localhost:3001/api/status

# Create an alert
curl -X POST http://localhost:3001/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "severity": "high",
    "title": "WSIB Policy Change Detected",
    "description": "New benefit reduction policy",
    "source": "wsib.ca",
    "jurisdiction": "ontario"
  }'

# List alerts
curl http://localhost:3001/api/alerts
```

---

## FIX #3: Real-Time Events System

### Status
- ✅ **Code Ready:** `utils/realtime-event-engine.js`
- ⚠️ **WebSocket integration:** TODO

### Implementation Steps

#### Step 1: Add WebSocket Support to API
Install dependency:
```bash
npm install ws --save
```

Create `api/websocket.js`:

```javascript
const WebSocket = require('ws');
const { rtEngine } = require('../utils/realtime-event-engine');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    const subscriberId = `SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🔌 WebSocket subscriber connected: ${subscriberId}`);
    
    // Register subscriber
    rtEngine.registerSubscriber(subscriberId);
    
    // Send events to this client
    rtEngine.on(`broadcast:${subscriberId}`, (event) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(event));
      }
    });
    
    // Handle messages from client
    ws.on('message', (message) => {
      try {
        const { type, filters } = JSON.parse(message);
        
        if (type === 'SET_FILTERS') {
          rtEngine.filters.set(subscriberId, filters);
        } else if (type === 'GET_HISTORY') {
          const history = rtEngine.getHistory(filters, filters.limit || 100);
          ws.send(JSON.stringify({
            type: 'HISTORY',
            events: history
          }));
        } else if (type === 'GET_STATS') {
          ws.send(JSON.stringify({
            type: 'STATS',
            data: rtEngine.getStats()
          }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    // Handle disconnect
    ws.on('close', () => {
      console.log(`❌ WebSocket subscriber disconnected: ${subscriberId}`);
      rtEngine.unregisterSubscriber(subscriberId);
    });
  });
}

module.exports = { setupWebSocket };
```

#### Step 2: Update server.js
```javascript
// Add to server.js
const { setupWebSocket } = require('./api/websocket');

const server = http.createServer(apiApp);
const API_PORT = process.env.API_PORT || 3001;

// Setup WebSocket
setupWebSocket(server);

server.listen(API_PORT, () => {
  console.log(`✅ Server with WebSocket running on port ${API_PORT}`);
});
```

#### Step 3: Update Daemon to Emit Events
In `daemon/eye-oracle-daemon.js`, add event emission:

```javascript
const { rtEngine } = require('../utils/realtime-event-engine');

// In executeTask methods:
async executeDailyTask() {
  rtEngine.emitTask('started', 'daily', { taskId: 'daily_' + Date.now() });
  
  try {
    const result = await runDailyTasks();
    rtEngine.emitTask('completed', 'daily', { result });
    return result;
  } catch (error) {
    rtEngine.emitTask('failed', 'daily', { error: error.message });
    throw error;
  }
}
```

#### Step 4: Test Real-Time Events
```bash
# In one terminal, start the server
npm start

# In another terminal, test WebSocket
node -e "
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3001/ws');

ws.on('open', () => {
  console.log('Connected to WebSocket');
  ws.send(JSON.stringify({ type: 'GET_STATS' }));
});

ws.on('message', (data) => {
  console.log('Received:', data);
});

ws.on('error', (e) => console.error(e));
"
```

---

## DEPLOYMENT CHECKLIST

### Before Production:

#### Phase 1: Daemon (Days 1-2)
- [ ] Daemon code reviewed
- [ ] Tested locally for 24 hours
- [ ] Docker build successful
- [ ] Logs rotating properly
- [ ] Auto-restart working
- [ ] Health checks passing

#### Phase 2: API (Days 2-3)
- [ ] API code reviewed
- [ ] All endpoints tested
- [ ] Error handling working
- [ ] CORS configured for frontend
- [ ] Database connection (when added) working
- [ ] Rate limiting configured

#### Phase 3: Real-Time (Days 3-4)
- [ ] WebSocket connections stable
- [ ] Event emission working
- [ ] History replay functional
- [ ] Frontend subscribes correctly
- [ ] No memory leaks on long connection

#### Phase 4: Integration (Days 4-5)
- [ ] Daemon → API communication working
- [ ] API → Frontend communication working
- [ ] Full end-to-end alert flow tested
- [ ] Multi-agent coordin working
- [ ] Load testing passed

#### Phase 5: Production (Day 5+)
- [ ] Disable old GitHub Actions
- [ ] Deploy to production infrastructure
- [ ] Monitor for 24 hours
- [ ] Setup backup systems
- [ ] Document runbooks
- [ ] Team trained on operations

---

## FOLDER STRUCTURE AFTER FIXES

```
injured-workers-unite/
├── daemon/
│   └── eye-oracle-daemon.js          ✅ NEW
├── api/
│   ├── core.js                       ✅ NEW
│   └── websocket.js                  ✅ NEW (in progress)
├── utils/
│   ├── realtime-event-engine.js      ✅ NEW
│   ├── eye-oracle-automation.js      (existing)
│   └── ... (other utils)
├── scripts/
│   ├── eye-oracle-automation.js      (existing, use daemon instead)
│   └── ... (other scripts)
├── logs/
│   ├── daemon/                       📁 NEW
│   ├── api/                          📁 NEW
│   └── events/                       📁 NEW
├── Dockerfile                         ✅ NEW
├── docker-compose.yml                ✅ NEW
├── DAEMON_DEPLOYMENT.md              ✅ NEW
├── server.js                         ✅ NEW (to create)
├── package.json                      (update)
└── ... (existing files)
```

---

## QUICK START AFTER FIXES

### Local Development
```bash
npm install
npm start
# Daemon and API both running
# Browse to http://localhost:3000 (frontend)
# API at http://localhost:3001
# WebSocket at ws://localhost:3001/ws
```

### Docker Production
```bash
docker-compose up -d
# Runs 24/7 automatically
# All logs in ./logs/daemon/
# Access API at http://localhost:3001
```

---

## MONITORING COMMANDS

### Check Daemon Health
```bash
curl http://localhost:3001/api/daemon/status | jq

# Or via logs
tail -f logs/daemon/daemon-$(date +%Y-%m-%d).log | grep "HEALTH\|HOURLY\|DAILY"
```

### Check Alerts
```bash
curl http://localhost:3001/api/alerts?severity=critical
```

### Monitor in Real-Time
```bash
# Watch daemon
docker logs -f the-eye-oracle

# Watch API (if separate container)
docker logs -f the-eye-api
```

---

## NEXT STEPS AFTER FIXES

Once these 3 fixes are deployed:

1. ✅ **24/7 Operation**: Daemon runs permanently
2. ✅ **Persistent Storage**: API stores data
3. ✅ **Real-Time Events**: Dashboard gets live updates

Then build:
4. **Multi-Agent Architecture** (refactor code into agents)
5. **TRANSP7 Framework** (add transparency features)
6. **Community Protections** (encryption, anonymization)
7. **Database** (PostgreSQL for permanent history)

---

## SUPPORT

- Daemon logs: `logs/daemon/daemon-YYYY-MM-DD.log`
- API logs: `logs/api/api-YYYY-MM-DD.log`
- Event logs: `logs/events/events-YYYY-MM-DD.jsonl`
- Docker logs: `docker logs the-eye-oracle`

---

**The Eye Never Sleeps** 👁️
