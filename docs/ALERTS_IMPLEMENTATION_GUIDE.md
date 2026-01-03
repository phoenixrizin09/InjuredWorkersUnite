# Alert & Notification System - Implementation Guide

## 🚀 Quick Start

### 1. Install Dependencies

The system uses built-in Node.js modules and the `fetch` API. No additional npm packages required for core functionality.

**Optional (for production):**
```bash
npm install twilio  # For SMS retry logic
npm install web-push  # For production push notifications
npm install nodemailer  # For SMTP email fallback
```

### 2. Set Up Environment Variables

Copy the template and add your API keys:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your credentials:

```dotenv
# Required - At least one channel
TELEGRAM_BOT_TOKEN=your_token
RESEND_API_KEY=your_key
FROM_EMAIL=alerts@yourdomain.com

# Optional - Add as needed
SLACK_WEBHOOK_URL=your_webhook
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
VAPID_PUBLIC_KEY=your_key
VAPID_PRIVATE_KEY=your_key
```

### 3. Initialize Dispatcher

```javascript
// In your app initialization (e.g., pages/api/init.js or server.js)

const { EnhancedAlertDispatcher } = require('./utils/alert-delivery');

const dispatcher = new EnhancedAlertDispatcher({
  // Config is loaded from environment variables automatically
  dataDir: './data'
});

// Export for use throughout app
module.exports = { dispatcher };
```

### 4. Create API Routes

Copy routes from `alert-api-example.js` to your `pages/api/` folder:

```javascript
// pages/api/alerts/send.js
import { dispatcher } from '../../utils/alert-dispatcher';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, alert } = req.body;
    const result = await dispatcher.dispatchWithPreferences(alert, userId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

### 5. Send Your First Alert

```javascript
const response = await fetch('/api/alerts/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    alert: {
      id: 'alert_1',
      title: 'Test Alert',
      message: 'This is a test',
      severity: 'high',
      category: 'workers-rights',
      scope: 'ontario'
    }
  })
});

const result = await response.json();
console.log(result);
```

---

## 📋 Step-by-Step Setup for Each Channel

### ✉️ Email (Resend)

**Setup:**
1. Go to https://resend.com
2. Sign up for free account
3. Go to API Keys section
4. Copy your API key

**Configuration:**
```dotenv
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=alerts@injuredworkersunite.org
```

**Notes:**
- Free tier: 100 emails/day, 3000/month
- Must verify domain or use trial domain
- Perfect for testing and small deployments

**Test:**
```javascript
const result = await dispatcher.getChannel('email').send({
  title: 'Test Email',
  message: 'This is a test email',
  severity: 'high',
  category: 'test'
});
```

---

### 🤖 Telegram Bot

**Setup:**
1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Follow prompts to create bot
4. Copy the token provided
5. Create a channel (or use existing)
6. Add your bot as admin to channel
7. Get channel ID (format: `@channelname` or `-100123456789`)

**Configuration:**
```dotenv
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=@my_channel_name
# or for private channel:
TELEGRAM_CHAT_ID=-100123456789
```

**Test:**
```bash
# Send test message
curl -X POST "https://api.telegram.org/bot{TOKEN}/sendMessage" \
  -d "chat_id={CHAT_ID}" \
  -d "text=Test from Eye Oracle"
```

---

### 🎮 Discord Webhook

**Setup:**
1. Go to your Discord server
2. Server Settings → Integrations
3. Click "Create Webhook"
4. Name it "The Eye Oracle"
5. Copy the webhook URL

**Configuration:**
```dotenv
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxxxxxxxxxx/xxxxxxxxxxxxx
```

**Test:**
```bash
curl -X POST "https://discord.com/api/webhooks/{WEBHOOK_ID}/{WEBHOOK_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"content":"Test from Eye Oracle"}'
```

---

### 💬 Slack Webhook

**Setup:**
1. Go to https://api.slack.com/apps
2. Click "Create New App"
3. Choose "From scratch"
4. Name it "The Eye Oracle"
5. Select your workspace
6. Go to "Incoming Webhooks"
7. Toggle "Activate Incoming Webhooks"
8. Click "Add New Webhook to Workspace"
9. Select channel and authorize
10. Copy webhook URL

**Configuration:**
```dotenv
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WORKSPACE_ID/YOUR_CHANNEL_ID/YOUR_TOKEN
```

**Test:**
```bash
curl -X POST "https://hooks.slack.com/services/..." \
  -H "Content-Type: application/json" \
  -d '{"text":"Test from Eye Oracle"}'
```

---

### 📱 SMS (Twilio)

**Setup:**
1. Go to https://www.twilio.com/try-twilio
2. Sign up for free trial account
3. Verify your phone number
4. Go to Account → Keys & credentials
5. Copy Account SID and Auth Token
6. Get a Twilio phone number (or use trial restrictions)

**Configuration:**
```dotenv
TWILIO_ACCOUNT_SID=AC1234567890abcdef
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1415555012345
```

**Limitations:**
- Free trial: Limited to verified numbers only
- Production: Need to upgrade account
- Cost: ~$0.0075 per SMS in US

**Test:**
```javascript
const sms = dispatcher.getChannel('sms');
if (sms) {
  const result = await sms.sendSMS('+1234567890', '🚨 Test alert from Eye Oracle');
  console.log(result);
}
```

---

### 🔔 Push Notifications

**Setup:**
1. Generate VAPID keys:
```bash
npm install web-push -g
web-push generate-vapid-keys
# Outputs:
# Public Key: BA...
# Private Key: ...
```

2. Set environment variables:
```dotenv
VAPID_PUBLIC_KEY=BA...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@injuredworkersunite.org
```

3. Register service worker on frontend:
```javascript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker registered'))
    .catch(err => console.log('SW registration failed', err));
}

// Request notification permission
Notification.requestPermission()
  .then(permission => {
    if (permission === 'granted') {
      subscribeToPush();
    }
  });

// Subscribe to push
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const publicKey = await fetch('/api/push/public-key').then(r => r.json());
  
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicKey.publicKey
  });

  // Send subscription to server
  await fetch('/api/push/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      userId: 'user123',
      subscription: subscription.toJSON()
    })
  });
}
```

4. Create service worker (`public/sw.js`):
```javascript
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    data: data.data
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.notification.data.url) {
    clients.openWindow(event.notification.data.url);
  }
});
```

---

## 🎯 Common Use Cases

### Use Case 1: Send Alert to Specific User

```javascript
const alert = {
  id: 'alert_' + Date.now(),
  title: 'New Case Documentation',
  message: 'A new case has been published in your region',
  severity: 'medium',
  category: 'case-updates',
  jurisdiction: 'ontario'
};

const result = await dispatcher.dispatchWithPreferences(alert, 'user_123');
console.log(`Delivered to ${result.channels.filter(c => c.success).length} channels`);
```

### Use Case 2: Batch Multiple Alerts

```javascript
const alerts = [
  { id: '1', title: 'Alert 1', severity: 'low', ... },
  { id: '2', title: 'Alert 2', severity: 'low', ... },
  { id: '3', title: 'Alert 3', severity: 'low', ... }
];

// User receives digest email instead of 3 separate messages
for (const alert of alerts) {
  await dispatcher.dispatchWithBatching(alert, 'user_123');
}
```

### Use Case 3: Send to Slack Channel for Admin Alerts

```javascript
// Send critical alerts to Slack for immediate action
if (alert.severity === 'critical') {
  const slack = dispatcher.getChannel('slack');
  if (slack) {
    await slack.sendRichMessage(alert);
  }
}
```

### Use Case 4: Get User's Delivery Statistics

```javascript
const history = dispatcher.getUserDeliveryHistory('user_123', 100);
const stats = dispatcher.getDeliveryStats(24);

console.log(`Total alerts: ${stats.total}`);
console.log(`Success rate: ${stats.successRate}%`);
console.log(`By channel:`, stats.byChannel);
```

### Use Case 5: Update User Quiet Hours

```javascript
dispatcher.updateUserPreferences('user_123', {
  quietHours: {
    enabled: true,
    startTime: '22:00',
    endTime: '08:00',
    timezone: 'America/Toronto'
  }
});

// Now critical alerts only, no medium/low during quiet hours
```

---

## 🔧 Configuration Reference

### Severity Levels

```javascript
{
  'critical': 'Immediate action required (emergencies, urgent rights violations)',
  'high': 'Requires attention (major violations, important updates)',
  'medium': 'Informational (case updates, blog posts)',
  'low': 'FYI (news, community updates)'
}
```

### Categories

```javascript
{
  'workers-rights': 'General workers rights issues',
  'wage-theft': 'Unpaid wages, improper deductions',
  'occupational-health': 'Workplace safety, injuries',
  'discrimination': 'Discrimination based on protected grounds',
  'retaliation': 'Employer retaliation',
  'legislation': 'New laws, regulation changes',
  'case-updates': 'Updates on published cases',
  'policy-changes': 'Platform/organizational policy changes',
  'community-news': 'Community-related news'
}
```

### Channels

| Channel | Free? | Limit | Best For |
|---------|-------|-------|----------|
| Email | Yes | 100/day | Primary notification |
| Telegram | Yes | Unlimited | Developer/admin alerts |
| Discord | Yes | Unlimited | Team channels |
| Slack | Yes | Limited | Workspace integration |
| SMS | No | Trial only | Urgent alerts |
| Push | Yes | Unlimited | Web app users |
| Webhook | Yes | Unlimited | Custom integrations |

---

## 📊 Monitoring & Analytics

### Get Delivery Report

```javascript
const dispatcher = require('./utils/alert-dispatcher');

// Last 24 hours
const stats = dispatcher.getDeliveryStats(24);
console.log(`
Delivery Report (24h):
- Total: ${stats.total}
- Email: ${stats.byChannel.email || 0}
- Telegram: ${stats.byChannel.telegram || 0}
- Discord: ${stats.byChannel.discord || 0}
- Success Rate: ${stats.successRate}%
`);
```

### Monitor Failed Deliveries

```javascript
const failed = dispatcher.deliveryTracker.getFailedDeliveriesForRetry();
console.log(`${failed.length} failed deliveries need retry`);

// Retry them
for (const delivery of failed) {
  // Attempt retry...
  dispatcher.deliveryTracker.scheduleRetry(delivery.id, 5); // Retry in 5 min
}
```

### User Engagement

```javascript
const userHistory = dispatcher.getUserDeliveryHistory('user_123', 100);
const confirmed = userHistory.filter(h => h.status === 'confirmed').length;
const opened = userHistory.filter(h => h.metadata?.opened).length;

console.log(`User engagement: ${confirmed}/${userHistory.length} confirmed (${opened} opened)`);
```

---

## 🧪 Testing Checklist

- [ ] Set all required environment variables
- [ ] Test email delivery
- [ ] Test Telegram notification
- [ ] Test Discord webhook
- [ ] Test user preference updates
- [ ] Test rate limiting
- [ ] Test batching for low-severity alerts
- [ ] Test delivery history retrieval
- [ ] Test unsubscribe functionality
- [ ] Test quiet hours enforcement

---

## 🐛 Troubleshooting

### "Channel not configured"
**Solution:** Check environment variables and ensure `isConfigured()` returns true

### Emails going to spam
**Solution:**
- Verify sender email in Resend
- Add DKIM/SPF records for domain
- Use proper email templates

### Rate limits being hit
**Solution:**
- Lower `maxEmailsPerDay` in preferences
- Enable batching for non-critical alerts
- Check if same alert sent multiple times

### Delivery taking too long
**Solution:**
- Check if alert is being batched (lower severity)
- Remove quiet hours if testing
- Check service status pages for API providers

### Push notifications not working
**Solution:**
- Verify VAPID keys are set
- Check service worker is registered
- Verify subscription endpoint is valid
- Check browser console for errors

---

## 📈 Production Deployment

### Before Going Live

1. **Upgrade Services:**
   - Twilio: Upgrade account from trial for SMS
   - Resend: Subscribe to paid plan if >100 emails/day needed

2. **Set Up Monitoring:**
   - Track delivery success rates
   - Alert on >5% failure rate
   - Monitor rate limit consumption

3. **Test Thoroughly:**
   - Load test with multiple concurrent alerts
   - Test failover if one channel unavailable
   - Verify batching works correctly

4. **Document:**
   - Document all configured channels
   - Create runbook for adding new channels
   - Document API rate limits

5. **Secure:**
   - Rotate API keys quarterly
   - Use GitHub secrets for CI/CD
   - Enable audit logging
   - Rate limit API endpoints

---

## 🔄 Adding Custom Channels

To add a new channel:

1. **Create delivery class:**
```javascript
class MyChannelDelivery {
  constructor(config) {
    this.name = 'mychannel';
    // Initialize...
  }

  isConfigured() {
    return // true if ready to send
  }

  async send(alert) {
    // Send alert
    return { success: true/false, error?: 'msg' };
  }
}
```

2. **Add to EnhancedAlertDispatcher:**
```javascript
const myChannel = new MyChannelDelivery(config.mychannel);
if (myChannel.isConfigured()) {
  this.advancedChannels.push(myChannel);
}
```

3. **Add env variables:**
```dotenv
MY_CHANNEL_API_KEY=xxx
MY_CHANNEL_CONFIG=xxx
```

---

## 📞 Support & Resources

- **Telegram Bot Setup:** https://core.telegram.org/bots
- **Discord Webhooks:** https://discord.com/developers/docs/resources/webhook
- **Slack API:** https://api.slack.com/docs
- **Twilio SMS:** https://www.twilio.com/docs/sms
- **Resend Email:** https://resend.com/docs
- **Web Push API:** https://developer.mozilla.org/en-US/docs/Web/API/Push_API

---

**Last Updated:** January 2026  
**Version:** 2.0.0
