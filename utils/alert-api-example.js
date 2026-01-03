/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ALERT API ROUTES - Example Integration
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * API endpoints for sending alerts and managing notification preferences
 * 
 * Usage: Add these routes to your Next.js API or Express server
 * 
 * VERSION: 1.0.0
 * ═══════════════════════════════════════════════════════════════════════════
 */

const { EnhancedAlertDispatcher } = require('../utils/alert-delivery');

// Initialize dispatcher (do this once at app startup)
const dispatcher = new EnhancedAlertDispatcher({
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,
  discordWebhook: process.env.DISCORD_WEBHOOK_URL,
  email: {
    resendApiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.FROM_EMAIL || 'alerts@injuredworkersunite.org',
  },
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
  },
  sms: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  push: {
    vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
    vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
  },
  dataDir: './data',
});

/**
 * POST /api/alerts/send
 * Send an alert to a user
 * 
 * Body:
 * {
 *   "userId": "user123",
 *   "alert": {
 *     "id": "alert_123",
 *     "title": "Alert Title",
 *     "message": "Alert message",
 *     "severity": "high|medium|low|critical",
 *     "category": "workers-rights",
 *     "scope": "ontario",
 *     "source": "Government source",
 *     "source_url": "https://..."
 *   }
 * }
 */
async function handleSendAlert(req, res) {
  try {
    const { userId, alert } = req.body;

    if (!userId || !alert) {
      return res.status(400).json({ error: 'Missing userId or alert' });
    }

    // Send with preferences and rate limiting
    const result = await dispatcher.dispatchWithPreferences(alert, userId);

    return res.json(result);
  } catch (error) {
    console.error('Error sending alert:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/alerts/batch
 * Send alerts with batching/throttling
 */
async function handleBatchAlert(req, res) {
  try {
    const { userId, alert } = req.body;

    if (!userId || !alert) {
      return res.status(400).json({ error: 'Missing userId or alert' });
    }

    const result = await dispatcher.dispatchWithBatching(alert, userId);

    return res.json(result);
  } catch (error) {
    console.error('Error batching alert:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/alerts/history/:userId
 * Get user's delivery history
 */
function handleGetHistory(req, res) {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    const history = dispatcher.getUserDeliveryHistory(userId, limit);

    return res.json({ history, count: history.length });
  } catch (error) {
    console.error('Error getting history:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/alerts/stats
 * Get delivery statistics
 */
function handleGetStats(req, res) {
  try {
    const timeframeHours = parseInt(req.query.timeframe) || 24;
    const stats = dispatcher.getDeliveryStats(timeframeHours);

    return res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/preferences/:userId
 * Get user notification preferences
 */
function handleGetPreferences(req, res) {
  try {
    const { userId } = req.params;
    const prefs = dispatcher.getUserPreferences(userId);

    return res.json(prefs);
  } catch (error) {
    console.error('Error getting preferences:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * PUT /api/preferences/:userId
 * Update user notification preferences
 * 
 * Body (partial update):
 * {
 *   "channels": {
 *     "sms": { "enabled": true }
 *   },
 *   "severityFilter": {
 *     "low": { "enabled": false }
 *   },
 *   "quietHours": {
 *     "enabled": true,
 *     "startTime": "22:00",
 *     "endTime": "08:00"
 *   }
 * }
 */
function handleUpdatePreferences(req, res) {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const prefs = dispatcher.updateUserPreferences(userId, updates);

    return res.json({ success: true, preferences: prefs });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/push-subscription
 * Register push notification subscription
 * 
 * Body:
 * {
 *   "userId": "user123",
 *   "subscription": {
 *     "endpoint": "https://...",
 *     "keys": {
 *       "p256dh": "...",
 *       "auth": "..."
 *     }
 *   }
 * }
 */
function handleRegisterPushSubscription(req, res) {
  try {
    const { userId, subscription } = req.body;

    if (!userId || !subscription) {
      return res.status(400).json({ error: 'Missing userId or subscription' });
    }

    const pushChannel = dispatcher.getChannel('push');
    if (!pushChannel) {
      return res.status(503).json({ error: 'Push notifications not configured' });
    }

    const result = pushChannel.registerSubscription(userId, subscription);

    return res.json(result);
  } catch (error) {
    console.error('Error registering push subscription:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/push-public-key
 * Get VAPID public key for push subscription
 */
function handleGetPushPublicKey(req, res) {
  try {
    const pushChannel = dispatcher.getChannel('push');
    if (!pushChannel) {
      return res.status(503).json({ error: 'Push notifications not configured' });
    }

    const publicKey = pushChannel.getVAPIDPublicKey();
    if (!publicKey) {
      return res.status(503).json({ error: 'VAPID keys not configured' });
    }

    return res.json({ publicKey });
  } catch (error) {
    console.error('Error getting push key:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/unsubscribe
 * Process unsubscribe request
 * 
 * Body:
 * {
 *   "token": "unsubscribe_token"
 * }
 */
function handleUnsubscribe(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Missing token' });
    }

    const result = dispatcher.processUnsubscribe(token);

    if (result.success) {
      return res.json({ success: true, message: 'Unsubscribed successfully' });
    } else {
      return res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * NEXT.JS API ROUTES
 * Add these to your pages/api/ folder:
 */

// pages/api/alerts/send.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handleSendAlert(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/alerts/batch.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handleBatchAlert(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/alerts/history/[userId].js
export default function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetHistory(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/alerts/stats.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetStats(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/preferences/[userId].js
export default function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetPreferences(req, res);
  }
  if (req.method === 'PUT') {
    return handleUpdatePreferences(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/push/subscribe.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    return handleRegisterPushSubscription(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/push/public-key.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetPushPublicKey(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

// pages/api/unsubscribe.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    return handleUnsubscribe(req, res);
  }
  res.status(405).json({ error: 'Method not allowed' });
}

module.exports = {
  dispatcher,
  handleSendAlert,
  handleBatchAlert,
  handleGetHistory,
  handleGetStats,
  handleGetPreferences,
  handleUpdatePreferences,
  handleRegisterPushSubscription,
  handleGetPushPublicKey,
  handleUnsubscribe,
};
