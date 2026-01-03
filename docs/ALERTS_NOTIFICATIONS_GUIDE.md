# Alert & Notification System - Complete Documentation

## 🎯 Overview

The enhanced alert and notification system provides a comprehensive, modular, and extensible platform for delivering alerts to users across multiple channels with intelligent preferences, rate limiting, and delivery tracking.

### Key Features

✅ **Multi-Channel Delivery**
- Email (Resend or SMTP)
- Telegram Bot
- Discord Webhooks
- Slack Webhooks
- SMS (Twilio)
- Browser Push Notifications
- Custom Webhooks

✅ **User Preferences**
- Channel selection per user
- Severity-based filtering
- Category filtering
- Geographic/jurisdiction filtering
- Quiet hours support
- Rate limiting controls

✅ **Smart Delivery**
- Automatic batching for lower-severity alerts
- Rate limiting to prevent alert fatigue
- Delivery confirmation & tracking
- Retry logic for failed deliveries
- Quiet hours enforcement

✅ **Professional Templates**
- HTML email templates for each severity level
- Daily digest emails
- Rich Slack/Discord formatting
- SMS-optimized messages

✅ **Delivery Tracking**
- Complete delivery history per user
- Delivery status monitoring
- Success rate analytics
- Failed delivery retry queue

---

## 📦 New Modules Created

### 1. **notification-preferences.js**
Manages user notification preferences with granular control.

**Classes:**
- `NotificationPreferencesManager` - Handles all preference operations

**Key Methods:**
```javascript
getPreferences(userId)           // Get user preferences
updatePreferences(userId, updates) // Update settings
shouldReceiveViaChannel(userId, alert, channel) // Check if user wants alert
getChannelsForAlert(userId, alert) // Get active channels for alert
checkRateLimit(userId, channel)  // Verify rate limits
```

### 2. **email-templates.js**
Professional HTML email templates for all alert severities.

**Classes:**
- `EmailTemplateFactory` - Creates formatted emails

**Methods:**
```javascript
createEmailFromAlert(alert, preferences)  // Auto-select template
templateCritical(alert, prefs)   // Critical severity template
templateHigh(alert, prefs)       // High severity template
templateMedium(alert, prefs)     // Medium severity template
templateLow(alert, prefs)        // Low severity template
templateDigest(alerts, prefs)    // Daily digest template
```

### 3. **advanced-channels.js**
Slack, SMS (Twilio), and Push notification channels.

**Classes:**
- `SlackDelivery` - Slack webhook integration
- `SMSDelivery` - Twilio SMS delivery
- `PushNotificationDelivery` - Browser/mobile push notifications

### 4. **delivery-confirmation.js**
Delivery tracking and rate limiting.

**Classes:**
- `DeliveryTracker` - Tracks all deliveries
- `AlertRateLimiter` - Smart rate limiting with batching

**Key Methods:**
```javascript
recordDelivery(deliveryInfo)     // Track delivery
getAlertDeliveryHistory(alertId) // Get alert delivery status
getDeliveryStats(timeframeHours) // Get statistics
addToBatch(userId, alert, options) // Batch alerts
```

### 5. **alert-delivery.js** (Enhanced)
Now includes `EnhancedAlertDispatcher` that ties everything together.

**New Methods:**
```javascript
dispatchWithPreferences(alert, userId)     // Smart dispatch
dispatchWithBatching(alert, userId)        // Batch delivery
updateUserPreferences(userId, updates)     // Manage prefs
getUserDeliveryHistory(userId)             // Get history
getDeliveryStats(timeframeHours)          // Analytics
```

---

## 🔧 Configuration

### Environment Variables

```dotenv
# ============= TELEGRAM =============
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_CHAT_ID=@your_channel_or_chat_id

# ============= DISCORD =============
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK

# ============= SLACK =============
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# ============= EMAIL (RESEND) =============
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=alerts@injuredworkersunite.org

# ============= SMS (TWILIO) =============
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# ============= PUSH NOTIFICATIONS =============
VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
VAPID_SUBJECT=mailto:admin@injuredworkersunite.org

# ============= GENERAL =============
SITE_URL=https://injuredworkersunite.pages.dev
```

### How to Get API Keys

#### Telegram Bot
1. Message @BotFather on Telegram
2. Use `/newbot` command
3. Follow instructions to create bot
4. Copy the token provided

#### Discord Webhook
1. Go to your Discord server settings
2. Integrations → Webhooks → New Webhook
3. Copy the webhook URL

#### Slack Webhook
1. Go to https://api.slack.com/apps
2. Create New App → From scratch
3. Incoming Webhooks → Add to workspace
4. Copy webhook URL

#### Twilio SMS
1. Sign up at https://www.twilio.com
2. Get your Account SID and Auth Token from dashboard
3. Get a phone number or use your trial number
4. (Note: Free trial has limitations)

#### Email (Resend)
1. Sign up at https://resend.com
2. Free tier: 100 emails/day
3. Copy your API key

#### Push Notifications
Generate VAPID keys (for production):
```bash
npm install web-push -g
web-push generate-vapid-keys
```

---

## 📱 Usage Examples

### 1. Send Alert with User Preferences

```javascript
const { EnhancedAlertDispatcher } = require('./utils/alert-delivery');

const dispatcher = new EnhancedAlertDispatcher({
  // ... config
});

// Send alert (respects user preferences)
const result = await dispatcher.dispatchWithPreferences({
  id: 'alert_123',
  title: 'Critical Rights Violation',
  message: 'Details here...',
  severity: 'critical',
  category: 'wage-theft',
  jurisdiction: 'ontario'
}, 'user_123');

console.log(result);
// {
//   alertId: 'alert_123',
//   userId: 'user_123',
//   success: true,
//   channels: [
//     { name: 'email', success: true },
//     { name: 'telegram', success: true },
//     { name: 'discord', success: true }
//   ]
// }
```

### 2. Send with Batching/Throttling

```javascript
// Lower severity alerts get batched
const result = await dispatcher.dispatchWithBatching({
  id: 'alert_124',
  title: 'New Blog Post',
  severity: 'low',
  category: 'community-news'
}, 'user_123');

// Returns: { batched: true, batchSize: 3 }
// When batch reaches max size or timeout, user gets digest email
```

### 3. Update User Preferences

```javascript
dispatcher.updateUserPreferences('user_123', {
  channels: {
    sms: { enabled: true },
    push: { enabled: false }
  },
  quietHours: {
    enabled: true,
    startTime: '22:00',
    endTime: '08:00'
  },
  rateLimit: {
    maxEmailsPerDay: 15
  }
});
```

### 4. Get Delivery History

```javascript
const history = dispatcher.getUserDeliveryHistory('user_123', 50);
// [
//   {
//     id: 'delivery_...',
//     timestamp: '2024-01-03T10:00:00Z',
//     alertId: 'alert_123',
//     channel: 'email',
//     status: 'sent',
//     externalId: 'msg_id_from_service'
//   },
//   ...
// ]
```

### 5. Get Statistics

```javascript
const stats = dispatcher.getDeliveryStats(24); // Last 24 hours
// {
//   total: 342,
//   byChannel: { email: 150, telegram: 100, discord: 92 },
//   byStatus: { sent: 330, failed: 12 },
//   successRate: 96
// }
```

---

## 🌐 API Endpoints

The system includes a complete API example (see `alert-api-example.js`).

### Send Alert
```
POST /api/alerts/send
Content-Type: application/json

{
  "userId": "user123",
  "alert": {
    "id": "alert_123",
    "title": "Alert Title",
    "message": "Message",
    "severity": "high",
    "category": "workers-rights",
    "scope": "ontario"
  }
}

Response:
{
  "alertId": "alert_123",
  "userId": "user123",
  "success": true,
  "channels": [...]
}
```

### Get User Preferences
```
GET /api/preferences/user123

Response: { full user preferences object }
```

### Update Preferences
```
PUT /api/preferences/user123
Content-Type: application/json

{
  "channels": {
    "sms": { "enabled": true }
  },
  "quietHours": { "enabled": true, ... }
}
```

### Get Delivery History
```
GET /api/alerts/history/user123?limit=50

Response:
{
  "history": [...],
  "count": 50
}
```

### Get Statistics
```
GET /api/alerts/stats?timeframe=24

Response: { statistics object }
```

### Register Push Subscription
```
POST /api/push/subscribe
Content-Type: application/json

{
  "userId": "user123",
  "subscription": {
    "endpoint": "https://...",
    "keys": { "p256dh": "...", "auth": "..." }
  }
}
```

### Get VAPID Public Key
```
GET /api/push/public-key

Response: { "publicKey": "..." }
```

### Unsubscribe
```
POST /api/unsubscribe
Content-Type: application/json

{
  "token": "unsubscribe_token_from_email"
}
```

---

## 📊 Default User Preferences

When a user is first created, they get these defaults:

```javascript
{
  // All channels enabled by default
  channels: {
    email: { enabled: true },
    telegram: { enabled: true },
    slack: { enabled: false },
    discord: { enabled: true },
    sms: { enabled: false },
    push: { enabled: true },
    webhook: { enabled: false }
  },

  // Severity-based rules
  severityFilter: {
    critical: {
      enabled: true,
      channels: ['email', 'telegram', 'discord', 'sms', 'push'],
      immediate: true
    },
    high: {
      enabled: true,
      channels: ['email', 'telegram', 'discord', 'push'],
      immediate: true
    },
    medium: {
      enabled: true,
      channels: ['email', 'discord', 'push'],
      batchAfterMinutes: 30
    },
    low: {
      enabled: false  // Disabled by default
    }
  },

  // Category filtering
  categoryFilter: {
    'workers-rights': { enabled: true },
    'wage-theft': { enabled: true },
    'occupational-health': { enabled: true },
    // ... etc
  },

  // Jurisdiction filtering
  jurisdictionFilter: {
    'ontario': { enabled: true },
    'federal': { enabled: true },
    // ... others
  },

  // Quiet hours
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00'
  },

  // Rate limiting
  rateLimit: {
    maxEmailsPerDay: 20,
    maxSMSPerDay: 5,
    maxPushPerDay: 50,
    batchNotifications: true
  }
}
```

---

## 🔄 Delivery Flow

```
Alert Created
    ↓
Check User Preferences
    ↓
Apply Severity Filter
    ├─ Critical/High: Deliver immediately
    ├─ Medium: Check if should batch
    └─ Low: Only if enabled, usually batch
    ↓
Apply Category Filter
    ├─ If disabled for category: Skip
    └─ If enabled: Continue
    ↓
Apply Jurisdiction Filter
    ├─ If disabled for region: Skip
    └─ If enabled: Continue
    ↓
Check Quiet Hours
    ├─ In quiet hours + not critical: Batch
    └─ Not in quiet hours: Deliver
    ↓
Check Rate Limits
    ├─ Exceeded: Batch or hold
    └─ OK: Continue
    ↓
Get Active Channels
    ├─ Email, Telegram, Discord, etc.
    └─ Only those enabled + above thresholds
    ↓
Send via Each Channel
    ├─ Record delivery attempt
    ├─ Update status
    └─ Log for retry if failed
    ↓
Return Results
    ├─ Success: Mark as delivered
    └─ Failed: Schedule retry
```

---

## 🚀 Advanced Features

### Smart Batching

Lower-severity alerts are automatically batched together:

```javascript
// User receives 5 medium-severity alerts within 30 minutes
// Instead of 5 separate emails, they get 1 digest email

const digestEmail = EmailTemplateFactory.templateDigest([
  alert1, alert2, alert3, alert4, alert5
], userPreferences);

// Shows summary + links to each alert
```

### Rate Limiting

Prevents alert fatigue:

```javascript
// User can't receive more than 20 emails per day
// If limit reached: remaining alerts get batched for next day

if (!rateLimiter.canSendAlert(userId, 'email')) {
  // Add to batch instead
  await dispatcher.dispatchWithBatching(alert, userId);
}
```

### Delivery Confirmation

Track whether alerts were actually received:

```javascript
// Record delivery
const delivery = deliveryTracker.recordDelivery({
  alertId: 'alert_123',
  userId: 'user_123',
  channel: 'email',
  status: 'sent'
});

// Later, when email is opened/clicked
deliveryTracker.confirmDelivery(delivery.id, {
  openedAt: new Date().toISOString(),
  clicked: true
});
```

### Unsubscribe Links

Every email includes personalized unsubscribe link:

```javascript
const unsubscribeLink = dispatcher.getUnsubscribeLink(userId);
// https://injuredworkersunite.pages.dev/unsubscribe?token=abc123...

// When user clicks it:
dispatcher.processUnsubscribe('abc123...');
// All channels disabled for that user
```

---

## 📈 Monitoring

### Get Statistics

```javascript
const stats = dispatcher.getDeliveryStats(24);

console.log(stats);
// {
//   total: 1250,
//   byChannel: {
//     email: 500,
//     telegram: 400,
//     discord: 300,
//     sms: 50
//   },
//   byStatus: {
//     sent: 1200,
//     failed: 50
//   },
//   successRate: 96
// }
```

### Monitor Failed Deliveries

```javascript
const failed = deliveryTracker.getFailedDeliveriesForRetry('email');

// Retry failed deliveries
for (const delivery of failed) {
  // Retry logic...
  deliveryTracker.scheduleRetry(delivery.id, 5); // Retry in 5 min
}
```

---

## ⚠️ Error Handling

All delivery methods return consistent error format:

```javascript
{
  success: false,
  error: "Error description",
  errorCode: "OPTIONAL_CODE"
}
```

Handle errors gracefully:

```javascript
const result = await dispatcher.dispatchWithPreferences(alert, userId);

for (const channel of result.channels) {
  if (!channel.success) {
    console.error(`Failed to deliver via ${channel.name}: ${channel.error}`);
    // Log for monitoring/alerting
    // Schedule retry
    // Notify admin if critical
  }
}
```

---

## 🧪 Testing

### Test Alert Delivery

```javascript
const testAlert = {
  id: 'test_123',
  title: 'Test Alert',
  message: 'This is a test',
  severity: 'high',
  category: 'workers-rights',
  jurisdiction: 'ontario',
  source: 'Test Source'
};

const result = await dispatcher.dispatchWithPreferences(testAlert, 'test_user_123');
console.log(result);
```

### Test Preferences

```javascript
// Set user to receive only critical emails
dispatcher.updateUserPreferences('test_user', {
  severityFilter: {
    critical: { enabled: true },
    high: { enabled: false },
    medium: { enabled: false },
    low: { enabled: false }
  },
  channels: {
    email: { enabled: true },
    telegram: { enabled: false },
    discord: { enabled: false }
  }
});

// Now medium/low severity alerts won't be delivered
```

---

## 🔐 Security Considerations

1. **API Key Protection**: Never commit `.env` files with real keys
2. **Rate Limiting**: Prevents abuse - configured per user
3. **Unsubscribe Tokens**: Single-use, time-limited tokens
4. **Input Validation**: All alert properties validated
5. **Error Logging**: Don't expose sensitive info in errors
6. **HTTPS Only**: All external API calls use HTTPS

---

## 📋 Troubleshooting

### Emails Not Sending

- Check `RESEND_API_KEY` is valid
- Check `FROM_EMAIL` is verified in Resend
- Check `TO_EMAIL` in user preferences
- Check rate limits not exceeded

### Telegram Not Working

- Verify `TELEGRAM_BOT_TOKEN` is correct
- Verify bot is added to channel as admin
- Verify `TELEGRAM_CHAT_ID` is correct format

### Slack Not Delivering

- Check webhook URL is valid
- Check webhook hasn't been revoked
- Check message format is correct

### SMS Not Sending

- Verify Twilio credentials
- Check phone number format (+1234567890)
- Check SMS limit not exceeded for day
- Note: Twilio free trial is limited

### Push Notifications Not Working

- Check VAPID keys are generated and set
- Check service worker is registered on frontend
- Check push subscription endpoint is valid

---

## 📚 Additional Resources

- [Alert Orchestrator](./alert-orchestrator.js) - Main orchestration logic
- [Alert Delivery](./alert-delivery.js) - Core delivery classes
- [API Example](./alert-api-example.js) - Complete API implementation
- [Tests](../__tests__/integration.alerts.test.js) - Test examples

---

## 🎓 Next Steps

1. **Update `.env.local`** with your API keys
2. **Implement API routes** using examples in `alert-api-example.js`
3. **Create frontend UI** for preference management
4. **Set up monitoring/alerting** for delivery failures
5. **Test with real channels** (start with Telegram free tier)
6. **Monitor delivery stats** and adjust rate limits as needed

---

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Status:** ✅ Production Ready
