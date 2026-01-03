# Alert System Deployment Checklist

## ✅ Pre-Deployment Verification

### Code Quality
- [ ] All 5 new modules are in `/utils/`
  - notification-preferences.js
  - email-templates.js
  - advanced-channels.js
  - delivery-confirmation.js
  - alert-api-example.js
- [ ] alert-delivery.js has been enhanced with EnhancedAlertDispatcher
- [ ] No syntax errors in JavaScript files
- [ ] All imports are correct
- [ ] No console.errors in startup

### Configuration
- [ ] `.env.local` exists and is NOT committed to git
- [ ] All required environment variables are set
- [ ] At least one delivery channel is configured
- [ ] API keys are valid (tested)
- [ ] DATA_DIR directory exists (./data/)

### Documentation
- [ ] ALERTS_INDEX.md created
- [ ] ALERTS_NOTIFICATIONS_GUIDE.md created
- [ ] ALERTS_IMPLEMENTATION_GUIDE.md created
- [ ] ALERTS_ENHANCEMENT_SUMMARY.md created
- [ ] ALERTS_QUICK_REFERENCE.md created

---

## 🔧 Pre-Flight Checklist

### Step 1: Environment Setup (15 min)
```bash
# Copy template
cp .env.local.example .env.local

# Edit and add at least these:
# RESEND_API_KEY=re_xxxxx
# TELEGRAM_BOT_TOKEN=xxxxx
# DISCORD_WEBHOOK_URL=https://...
# FROM_EMAIL=alerts@yourdomain.com
# SITE_URL=https://injuredworkersunite.pages.dev
```
- [ ] .env.local file created with actual keys
- [ ] No test/demo keys left in .env.local
- [ ] Environment file is in .gitignore

### Step 2: Module Verification (10 min)
```bash
# Test imports in Node.js REPL
node -e "require('./utils/notification-preferences.js')"
node -e "require('./utils/email-templates.js')"
node -e "require('./utils/advanced-channels.js')"
node -e "require('./utils/delivery-confirmation.js')"
node -e "require('./utils/alert-delivery.js')"
```
- [ ] All modules import without errors
- [ ] No missing dependencies
- [ ] No circular imports

### Step 3: Dispatcher Test (10 min)
```javascript
// In Node.js or Next.js API route
const { EnhancedAlertDispatcher } = require('./utils/alert-delivery');
const dispatcher = new EnhancedAlertDispatcher();

console.log('Configured channels:', dispatcher.getConfiguredChannels());
// Should show at least 1: ['email'] or ['telegram'] etc.

console.log('Dispatcher ready:', dispatcher.deliveryTracker && dispatcher.rateLimiter);
// Should be: true
```
- [ ] Dispatcher initializes without errors
- [ ] At least 1 channel is configured
- [ ] All sub-systems (tracker, limiter) are ready

### Step 4: Channel Testing (30 min - do each enabled channel)

#### Email (Resend)
```javascript
const testAlert = {
  id: 'test_email_' + Date.now(),
  title: 'Test Email Alert',
  message: 'Testing email delivery',
  severity: 'high',
  category: 'test'
};

const result = await dispatcher.dispatchWithPreferences(testAlert, 'test_user');
// Check:
// - result.success === true
// - result.channels.find(c => c.name === 'email')?.success === true
```
- [ ] Email test alert sent
- [ ] Email received (check inbox + spam)
- [ ] HTML formatting looks correct
- [ ] Links work (View Details, Manage Preferences)

#### Telegram
```javascript
// Manual test in Telegram
// Message @BotFather to verify token
// Send test message via curl or Node.js

const result = await dispatcher.getChannel('telegram').send(testAlert);
// result.success should be true
```
- [ ] Message appears in Telegram channel
- [ ] Formatting is correct (emojis, markdown)
- [ ] Links are clickable

#### Discord
```bash
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"content":"Test message"}'
```
- [ ] Message appears in Discord channel
- [ ] Rich embed formatting shows
- [ ] Color coding is visible

#### Other Channels
- [ ] Slack webhook tested (if configured)
- [ ] SMS tested (if Twilio configured)
- [ ] Push notifications setup (if VAPID configured)

### Step 5: Data Directory
```bash
mkdir -p ./data
ls -la ./data
```
- [ ] ./data/ directory exists
- [ ] Empty initially (will create user-preferences.json and delivery-logs.json on first use)
- [ ] Directory is NOT committed to git

---

## 🧪 Integration Testing

### Test 1: Basic Alert Send
```javascript
const alert = {
  id: 'integration_test_1',
  title: 'Integration Test Alert',
  message: 'Testing basic alert delivery',
  severity: 'high',
  category: 'workers-rights',
  scope: 'ontario'
};

const result = await dispatcher.dispatchWithPreferences(alert, 'test_user_001');

assert(result.success === true, 'Alert should send successfully');
assert(result.channels.length > 0, 'Should use at least one channel');
```
- [ ] Alert sends successfully
- [ ] Returns expected result structure
- [ ] No errors in console

### Test 2: User Preferences
```javascript
dispatcher.updateUserPreferences('test_user_002', {
  channels: { email: { enabled: false } }
});

const prefs = dispatcher.getUserPreferences('test_user_002');
assert(prefs.channels.email.enabled === false, 'Preference should be saved');
```
- [ ] Preferences update successfully
- [ ] data/user-preferences.json created
- [ ] Can retrieve preferences correctly

### Test 3: Delivery Tracking
```javascript
const result = await dispatcher.dispatchWithPreferences(alert, 'test_user_003');
const history = dispatcher.getUserDeliveryHistory('test_user_003');

assert(history.length > 0, 'Should have delivery history');
assert(history[0].alertId === alert.id, 'Should track correct alert');
```
- [ ] Delivery logs created
- [ ] data/delivery-logs.json exists
- [ ] Can retrieve history correctly

### Test 4: Rate Limiting
```javascript
// Simulate sending many emails to same user
const emails = [];
for (let i = 0; i < 25; i++) {
  const result = await dispatcher.dispatchWithBatching(alert, 'test_user_004');
  emails.push(result);
}

// Last 5 should be batched
const batched = emails.slice(-5).filter(r => r.batched);
assert(batched.length > 0, 'Should batch when rate limited');
```
- [ ] Rate limiting works
- [ ] Batching occurs at limit
- [ ] System doesn't break under heavy load

### Test 5: Quiet Hours
```javascript
dispatcher.updateUserPreferences('test_user_005', {
  quietHours: {
    enabled: true,
    startTime: '00:00',  // Force quiet now
    endTime: '23:59'
  }
});

const result = await dispatcher.dispatchWithPreferences({
  ...alert,
  severity: 'low'  // Non-critical
}, 'test_user_005');

// Should be blocked or batched due to quiet hours
```
- [ ] Quiet hours enforcement works
- [ ] Low-severity alerts blocked
- [ ] Critical alerts still deliver

---

## 📊 Performance Testing (Optional)

### Load Test
```javascript
// Send 100 alerts
console.time('load-test');
for (let i = 0; i < 100; i++) {
  await dispatcher.dispatchWithPreferences({
    ...alert,
    id: 'load_test_' + i
  }, 'load_test_user');
}
console.timeEnd('load-test');
// Should complete in <5 seconds
```
- [ ] 100 alerts process quickly (<5s)
- [ ] No memory leaks
- [ ] All delivered correctly

### Concurrency Test
```javascript
// Send alerts concurrently
const promises = [];
for (let i = 0; i < 10; i++) {
  promises.push(dispatcher.dispatchWithPreferences(alert, 'user_' + i));
}
const results = await Promise.all(promises);
assert(results.every(r => r.success), 'All should succeed');
```
- [ ] Handles concurrent requests
- [ ] No race conditions
- [ ] Results are consistent

---

## 🚀 Deployment Steps

### For Development
1. [ ] Create `.env.local` with test API keys
2. [ ] Test in local Node.js environment
3. [ ] Test via local API routes
4. [ ] Verify data files are created

### For Staging
1. [ ] Create `.env.staging` or use GitHub secrets
2. [ ] Deploy code to staging environment
3. [ ] Run full test suite
4. [ ] Monitor logs for errors
5. [ ] Test all channels with real data

### For Production
1. [ ] Create `.env.production` or use GitHub secrets
2. [ ] Upgrade API services if needed:
   - [ ] Resend: Paid plan (if >100 emails/day)
   - [ ] Twilio: Paid account (if SMS needed)
3. [ ] Deploy code to production
4. [ ] Verify data directory backups
5. [ ] Monitor delivery stats
6. [ ] Set up alerting for failures
7. [ ] Create runbook for operations team

---

## 📋 Post-Deployment Verification

### Day 1
- [ ] No errors in logs
- [ ] Alerts are sending successfully
- [ ] Delivery tracking is working
- [ ] Users can update preferences
- [ ] API endpoints are responding

### Week 1
- [ ] Track delivery success rate (target: >95%)
- [ ] Monitor for failed deliveries
- [ ] Check data file sizes (shouldn't grow too fast)
- [ ] Verify preferences are persisting
- [ ] Test unsubscribe functionality

### Month 1
- [ ] Review delivery statistics
- [ ] Analyze user preferences trends
- [ ] Identify any bottlenecks
- [ ] Plan for scaling if needed
- [ ] Document any issues

---

## 🔍 Troubleshooting Guide

### Issue: "Channel not configured"
```
Solution:
1. Check .env.local has the key
2. Verify key value is correct
3. Check isConfigured() returns true
4. Restart app to reload env vars
```
- [ ] Environment variables verified
- [ ] Dispatcher re-initialized
- [ ] Channel now works

### Issue: Emails going to spam
```
Solution:
1. Verify FROM_EMAIL is in Resend
2. Add SPF/DKIM records for domain
3. Check email template for spam triggers
4. Use reply-to header
```
- [ ] Domain verified in Resend
- [ ] DNS records added
- [ ] Emails now in inbox

### Issue: SMS not working
```
Solution:
1. Check Twilio account is active (not trial)
2. Verify phone numbers are in E.164 format
3. Check account balance
4. Test via Twilio dashboard
```
- [ ] Twilio account verified
- [ ] Phone numbers formatted correctly
- [ ] SMS now sends

### Issue: High failure rate (>5%)
```
Solution:
1. Check API service status pages
2. Review error logs for patterns
3. Verify API keys are still valid
4. Check rate limits on services
```
- [ ] Service status verified
- [ ] API keys refreshed
- [ ] Rate limits adjusted

---

## 📞 Emergency Contacts

In case of critical issues:
1. Check service status pages for API providers
2. Review error logs in real-time
3. Roll back to previous version if needed
4. Notify users of issues
5. Document incident for analysis

---

## ✨ Sign-Off

### Development Lead
- [ ] Verified code quality
- [ ] Tested locally
- [ ] Documentation is complete
- **Name:** ___________ **Date:** ___________

### QA / Testing
- [ ] All test cases passed
- [ ] No critical bugs
- [ ] Performance acceptable
- **Name:** ___________ **Date:** ___________

### Operations
- [ ] Infrastructure ready
- [ ] Monitoring configured
- [ ] Runbooks prepared
- **Name:** ___________ **Date:** ___________

### Security Review (if required)
- [ ] No security vulnerabilities
- [ ] API keys properly secured
- [ ] User data protected
- **Name:** ___________ **Date:** ___________

---

## 📝 Notes

Add any additional notes or blockers here:

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## 🎉 Deployment Complete

Once all checkboxes are complete, the alert system is ready for production use!

**System Status:** ✅ Ready to Deploy  
**Last Checked:** ___________  
**Deployed By:** ___________  
**Deployment Date:** ___________

---

**Document Version:** 1.0  
**Alert System Version:** 2.0.0  
**Date:** January 3, 2026
