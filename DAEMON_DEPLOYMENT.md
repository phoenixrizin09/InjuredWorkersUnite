# 👁️ THE EYE ORACLE - DAEMON DEPLOYMENT GUIDE

## Overview

The Eye Oracle Daemon enables **true 24/7 continuous operation** instead of scheduled GitHub Actions.

---

## Deployment Options

### Option 1: Docker (Recommended for Production)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY . .

# Create logs directory
RUN mkdir -p logs/daemon

# Run daemon (never exits)
CMD ["node", "daemon/eye-oracle-daemon.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const d = require('./daemon/eye-oracle-daemon'); console.log('healthy')"
```

**Build and Run:**
```bash
docker build -t the-eye-oracle .
docker run -d \
  --name the-eye-oracle \
  --restart always \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/public/data:/app/public/data \
  the-eye-oracle
```

---

### Option 2: systemd Service (Linux VPS/Server)

Create `/etc/systemd/system/the-eye-oracle.service`:

```ini
[Unit]
Description=The Eye Oracle - Permanent Investigative Intelligence System
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/the-eye-oracle
ExecStart=/usr/bin/node /var/www/the-eye-oracle/daemon/eye-oracle-daemon.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

# Resource limits
MemoryLimit=2G
CPUQuota=50%

[Install]
WantedBy=multi-user.target
```

**Deploy:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable the-eye-oracle
sudo systemctl start the-eye-oracle
sudo systemctl status the-eye-oracle

# View logs
sudo journalctl -u the-eye-oracle -f
```

---

### Option 3: PM2 Process Manager (Easy Setup)

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'the-eye-oracle',
    script: './daemon/eye-oracle-daemon.js',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '2G',
    error_file: './logs/daemon/pm2-error.log',
    out_file: './logs/daemon/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start daemon
pm2 start ecosystem.config.js

# Setup auto-start on reboot
pm2 startup
pm2 save

# View logs
pm2 logs the-eye-oracle

# Monitor
pm2 monit
```

---

### Option 4: Windows Service

```bash
# Install NSSM (Non-Sucking Service Manager)
# Download from: https://nssm.cc/download

# Install service
nssm install THE-EYE-ORACLE "C:\Program Files\nodejs\node.exe" "C:\path\to\daemon\eye-oracle-daemon.js"

# Set working directory
nssm set THE-EYE-ORACLE AppDirectory "C:\path\to\project"

# Set auto-restart
nssm set THE-EYE-ORACLE AppExit Default Restart
nssm set THE-EYE-ORACLE AppRestartDelay 10000

# Start service
nssm start THE-EYE-ORACLE

# View status
nssm status THE-EYE-ORACLE
```

---

## Monitoring the Daemon

### Check Status
```bash
# Docker
docker ps -f name=the-eye-oracle
docker logs the-eye-oracle

# systemd
systemctl status the-eye-oracle
journalctl -u the-eye-oracle -f

# PM2
pm2 status
pm2 logs the-eye-oracle
```

### View Logs
Logs are written to: `logs/daemon/daemon-YYYY-MM-DD.log`

```bash
# View today's log
tail -f logs/daemon/daemon-$(date +%Y-%m-%d).log

# View all recent logs
ls -la logs/daemon/
```

---

## Configuration

Edit `daemon/eye-oracle-daemon.js`:

```javascript
const DAEMON_CONFIG = {
  heartbeatInterval: 30000,        // Check daemon health every 30s
  healthCheckInterval: 60000,      // Full health check every 60s
  maxFailedHealthChecks: 3,        // Restart after 3 failed checks
  autoRestart: true,               // Auto-restart on failure
  restartDelay: 10000,             // Wait 10s before restart
  maxRestarts: 10,                 // Max 10 restarts per hour
  restartWindow: 3600000           // 1 hour window
};
```

---

## Integration with Backend API

Once backend API is running (see next section), the daemon will:

1. **Report health status** to the API
2. **Receive task commands** from the API
3. **Store results** in the database
4. **Notify** the frontend of task completion

```javascript
// In daemon/eye-oracle-daemon.js (future)

// Every health check, report to API
async performHealthCheck() {
  // ... existing checks ...
  
  // Report to API
  await fetch('http://localhost:3001/api/daemon/health', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.getStatus())
  });
}
```

---

## Transitioning from GitHub Actions

Once daemon is running:

1. **Keep GitHub Actions disabled** (avoid duplicate runs)
2. **Remove old cron triggers**
3. **Archive GitHub Actions workflows**
4. **Monitor daemon logs** for any issues

```bash
# Disable GitHub Actions workflow
# In .github/workflows/eye-oracle-automation.yml
on:
  # Remove schedule
  # schedule:
  #   - cron: '0 11 * * *'
  
  # Keep only manual trigger
  workflow_dispatch:
```

---

## Troubleshooting

### Daemon Not Starting
```bash
# Check for errors
node daemon/eye-oracle-daemon.js

# Check for port conflicts
lsof -i :3001  # (if API is also running)
```

### High Memory Usage
The daemon includes memory monitoring:
- Logs warning if heap > 90% used
- Attempts automatic garbage collection
- Restarts if memory exceeds limits

### Tasks Not Running
Check `logs/daemon/daemon-YYYY-MM-DD.log` for:
- Task scheduling messages
- Task execution logs
- Error messages

### Restart Loop
If daemon keeps restarting:
1. Check logs for the underlying error
2. Fix the error in `scripts/eye-oracle-automation.js`
3. Manually restart daemon: `systemctl restart the-eye-oracle`

---

## Metrics & Monitoring

The daemon provides status via:

```javascript
const { createDaemon } = require('./daemon/eye-oracle-daemon');
const daemon = createDaemon();
const status = daemon.getStatus();

// Returns:
{
  isRunning: true,
  uptime: 86400,              // Seconds
  health: {
    isHealthy: true,
    failedChecks: 0,
    lastCheck: '2026-01-02T...',
    uptime: 86400
  },
  pendingTasks: [...],
  restartAttempts: 0,
  timestamp: '2026-01-02T...'
}
```

---

## Production Checklist

- [ ] Choose deployment option (Docker recommended)
- [ ] Configure environment variables
- [ ] Set up log rotation (important for 24/7 operation)
- [ ] Configure monitoring/alerting
- [ ] Test graceful shutdown
- [ ] Test auto-restart on failure
- [ ] Document restart procedures
- [ ] Set up backup of logs
- [ ] Monitor resource usage
- [ ] Plan for updates (zero-downtime deployment)

---

## Log Rotation

Important for long-running daemon!

### Using logrotate (Linux):
```bash
# /etc/logrotate.d/the-eye-oracle
/var/www/the-eye-oracle/logs/daemon/*.log {
  daily
  rotate 30
  compress
  delaycompress
  missingok
  notifempty
  create 0640 www-data www-data
}
```

---

## Next Steps

1. **Deploy daemon** using one of the options above
2. **Monitor logs** for first 24 hours
3. **Create backend API** (see next file)
4. **Set up real-time event system** (see next file)
5. **Disable GitHub Actions** once stable

---

**The Eye Never Sleeps** 👁️
