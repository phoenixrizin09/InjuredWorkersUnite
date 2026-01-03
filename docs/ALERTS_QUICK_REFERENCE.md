# Alert System - Quick Reference Card

## 🚀 Quick Start (5 Minutes)

### Step 1: Add Environment Variables
```bash
# .env.local
RESEND_API_KEY=re_xxxx
FROM_EMAIL=alerts@domain.com
TELEGRAM_BOT_TOKEN=xxxxx
DISCORD_WEBHOOK_URL=https://...
```

### Step 2: Initialize Dispatcher
```javascript
const { EnhancedAlertDispatcher } = require('./utils/alert-delivery');

const dispatcher = new EnhancedAlertDispatcher();
```

### Step 3: Send Alert
```javascript
await dispatcher.dispatchWithPreferences({
  id: 'alert_1',
  title: 'New Alert',
  message: 'Alert details',
  severity: 'high',
  category: 'workers-rights',
  scope: 'ontario'
}, 'user_123');
```

---

## 📋 API Cheat Sheet

### Send Alert
```javascript
const result = await dispatcher.dispatchWithPreferences(alert, userId);
// result.success, result.channels[], result.rateLimited
```

### Send Batched
```javascript
const result = await dispatcher.dispatchWithBatching(alert, userId);
// Automatically batches low-severity alerts
```

### Get History
```javascript
const history = dispatcher.getUserDeliveryHistory(userId, limit);
// Array of { id, timestamp, channel, status, ... }
```

### Get Stats
```javascript
const stats = dispatcher.getDeliveryStats(24); // Last 24h
// { total, byChannel{}, byStatus{}, successRate }
```

### Update Preferences
```javascript
dispatcher.updateUserPreferences(userId, {
  channels: { sms: { enabled: true } },
  quietHours: { enabled: true, startTime: '22:00', endTime: '08:00' }
});
```

### Get Preferences
```javascript
const prefs = dispatcher.getUserPreferences(userId);
// Full preferences object
```

---

## 🔌 Channel Configuration

| Channel | Setup Time | Limit | Free? |
|---------|-----------|-------|-------|
| **Email (Resend)** | 2 min | 100/day | ✅ |
| **Telegram** | 3 min | ∞ | ✅ |
| **Discord** | 1 min | ∞ | ✅ |
| **Slack** | 2 min | Limited | ✅ |
| **SMS (Twilio)** | 5 min | Trial | ⚠️ |
| **Push** | 5 min | ∞ | ✅ |

### Setup Commands

**Telegram:**
```bash
# Message @BotFather -> /newbot -> Copy token
TELEGRAM_BOT_TOKEN=token
TELEGRAM_CHAT_ID=@channel_name
```

**Discord:**
```bash
# Server Settings > Integrations > Webhooks > New Webhook > Copy URL
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

**Slack:**
```bash
# api.slack.com > Create App > Incoming Webhooks > Add to Workspace > Copy URL
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

**Twilio:**
```bash
# twilio.com > Dashboard > Account SID + Auth Token
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890
```

**VAPID (Push):**
```bash
npm install -g web-push && web-push generate-vapid-keys
VAPID_PUBLIC_KEY=BA...
VAPID_PRIVATE_KEY=...
```

---

## 🎯 Alert Object Structure

```javascript
{
  id: 'alert_123',              // Unique ID
  title: 'String',              // Alert title
  message: 'String',            // Alert description
  severity: 'critical|high|medium|low',
  category: 'workers-rights|wage-theft|...',
  scope: 'federal|ontario|bc|...',
  source: 'String',             // Source name
  source_url: 'URL',            // Source link
  affectedPopulation: 'String', // Who is affected
  recommendedAction: 'String|[]', // What to do
  createdAt: 'ISO8601',         // Timestamp
  status: 'active|resolved'     // Status
}
```

---

## ⚙️ Preference Structure (Key Fields)

```javascript
{
  channels: {
    email: { enabled: true },
    telegram: { enabled: true },
    sms: { enabled: false }
    // ... others
  },
  
  severityFilter: {
    critical: { enabled: true, immediate: true },
    high: { enabled: true, immediate: true },
    medium: { enabled: true, batchAfterMinutes: 30 },
    low: { enabled: false } // Disabled by default
  },
  
  rateLimit: {
    maxEmailsPerDay: 20,
    maxSMSPerDay: 5,
    batchNotifications: true
  },
  
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00'
  }
}
```

---

## 🔍 Delivery Status Reference

| Status | Meaning | Action |
|--------|---------|--------|
| `sent` | Queued/sent to service | Monitor |
| `delivered` | Confirmed by service | Success |
| `confirmed` | User opened/clicked | Success |
| `failed` | Delivery failed | Retry |
| `bounced` | Email bounced | Remove |
| `unsubscribed` | User unsubscribed | Remove |
| `retry-scheduled` | Scheduled for retry | Monitor |

---

## 📊 Example: Complete Flow

```javascript
// 1. Create alert
const alert = {
  id: 'alert_urgent_123',
  title: 'Critical Wage Theft Detected',
  message: 'Employer X owes $50K to 100 workers',
  severity: 'critical',
  category: 'wage-theft',
  scope: 'ontario'
};

// 2. Send to user
const result = await dispatcher.dispatchWithPreferences(alert, 'user_456');
console.log(result);
// {
//   success: true,
//   channels: [
//     { name: 'email', success: true },
//     { name: 'telegram', success: true },
//     { name: 'sms', success: false, error: 'Rate limit' } // Batched instead
//   ]
// }

// 3. Get delivery history
const history = dispatcher.getUserDeliveryHistory('user_456', 10);
console.log(history[0]);
// {
//   id: 'delivery_xxx',
//   timestamp: '2024-01-03T10:00:00Z',
//   alertId: 'alert_urgent_123',
//   channel: 'email',
//   status: 'sent',
//   externalId: 'msg_123'
// }

// 4. Get stats
const stats = dispatcher.getDeliveryStats(24);
// { total: 342, byChannel: {...}, successRate: 96 }
```

---

## 🧠 Smart Routing Logic

```
Alert received
   ↓
Is user subscribed to channel? → No → Skip
   ↓ Yes
Is severity enabled for user? → No → Skip
   ↓ Yes
Is category enabled for user? → No → Skip
   ↓ Yes
Is jurisdiction enabled for user? → No → Skip
   ↓ Yes
Is user in quiet hours? → Yes (non-critical) → Batch
   ↓ No or critical
Did user hit rate limit? → Yes → Batch
   ↓ No
Send immediately via all active channels
   ↓
Log delivery → Return results
```

---

## 🔧 Common Operations

### Enable SMS for Critical Only
```javascript
dispatcher.updateUserPreferences('user_123', {
  channels: { sms: { enabled: true } },
  severityFilter: {
    critical: { enabled: true, channels: ['sms'] },
    high: { enabled: false },
    medium: { enabled: false },
    low: { enabled: false }
  }
});
```

### Disable All Notifications
```javascript
dispatcher.updateUserPreferences('user_123', {
  channels: {
    email: { enabled: false },
    telegram: { enabled: false },
    sms: { enabled: false },
    // ... all false
  }
});
```

### Set Quiet Hours (No Alerts 10PM-8AM)
```javascript
dispatcher.updateUserPreferences('user_123', {
  quietHours: {
    enabled: true,
    startTime: '22:00',
    endTime: '08:00',
    timezone: 'America/Toronto'
  }
});
```

### Get Daily Digest Instead of Individual Emails
```javascript
dispatcher.updateUserPreferences('user_123', {
  severityFilter: {
    critical: { immediate: true },
    high: { batchAfterMinutes: 60 },
    medium: { batchAfterMinutes: 1440 }, // 1 day
    low: { enabled: false }
  },
  digest: {
    enabled: true,
    frequency: 'daily',
    time: '09:00'
  }
});
```

---

## 📞 Support Quick Links

| Issue | Solution |
|-------|----------|
| Email not sending | Check RESEND_API_KEY + FROM_EMAIL |
| Telegram no message | Check TELEGRAM_BOT_TOKEN + CHAT_ID |
| Discord webhook invalid | Regenerate webhook in server settings |
| SMS not working | Check Twilio account (trial limitations) |
| Push not subscribing | Check VAPID keys + service worker |
| Alerts being batched | Check severity + rate limits + quiet hours |

---

## 📈 Monitoring

### Check System Health
```javascript
const stats = dispatcher.getDeliveryStats(24);
const failureRate = 100 - stats.successRate;

if (failureRate > 5) {
  console.warn('⚠️ High failure rate:', failureRate + '%');
}
```

### Find Failed Deliveries
```javascript
const failed = dispatcher.deliveryTracker.getFailedDeliveriesForRetry();
console.log(`${failed.length} deliveries need retry`);
```

### Get User Engagement
```javascript
const history = dispatcher.getUserDeliveryHistory(userId, 100);
const confirmed = history.filter(h => h.status === 'confirmed').length;
const rate = (confirmed / history.length) * 100;
console.log(`User confirmation rate: ${rate.toFixed(1)}%`);
```

---

## ⚡ Performance Tips

1. **Use Batching for Non-Critical:** Set `batchAfterMinutes` for medium/low severity
2. **Set Rate Limits:** Prevent alert fatigue with `maxEmailsPerDay`
3. **Implement Quiet Hours:** Reduce notifications during night
4. **Monitor Failures:** Check stats regularly, retry failed deliveries
5. **Cache Preferences:** Load once per request, don't reload frequently

---

## 🔒 Security Checklist

- [ ] Never commit `.env.local` files
- [ ] Use GitHub secrets for CI/CD
- [ ] Rotate API keys quarterly
- [ ] Monitor delivery logs for abuse
- [ ] Validate all alert inputs
- [ ] Use HTTPS for all webhooks
- [ ] Audit user preference changes
- [ ] Rate limit API endpoints

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [ALERTS_NOTIFICATIONS_GUIDE.md](ALERTS_NOTIFICATIONS_GUIDE.md) | Complete feature reference |
| [ALERTS_IMPLEMENTATION_GUIDE.md](ALERTS_IMPLEMENTATION_GUIDE.md) | Step-by-step setup |
| [ALERTS_ENHANCEMENT_SUMMARY.md](ALERTS_ENHANCEMENT_SUMMARY.md) | What was built |
| [alert-api-example.js](../utils/alert-api-example.js) | API implementation |
| [alert-delivery.js](../utils/alert-delivery.js) | Core module |

---

## 🎓 Learn More

Start with: [ALERTS_IMPLEMENTATION_GUIDE.md](ALERTS_IMPLEMENTATION_GUIDE.md)

---

**Version:** 2.0.0 | **Status:** ✅ Production Ready | **Date:** January 2026
