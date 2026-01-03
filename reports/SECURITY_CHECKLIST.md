# 🔐 SECURITY VERIFICATION CHECKLIST

## ✅ DEPLOYMENT VERIFICATION

Run these checks after every deployment to ensure security remains intact:

---

### 1. **Security Headers Test** (Critical)

**Tool**: https://securityheaders.com/

**Expected Result**: **A+ Grade**

**Check for**:
- ✅ Strict-Transport-Security
- ✅ Content-Security-Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

**Command Line Test**:
```bash
curl -I https://injuredworkersunite.pages.dev/ | grep -i "strict-transport\|x-frame\|x-content\|x-xss\|content-security\|referrer-policy\|permissions-policy"
```

---

### 2. **Mozilla Observatory** (Critical)

**Tool**: https://observatory.mozilla.org/

**Expected Result**: **A+ Grade** (90+ score)

**Check for**:
- ✅ HTTPS enforcement
- ✅ CSP implemented
- ✅ Cookies (should show "No cookies")
- ✅ Cross-origin resource sharing
- ✅ HTTP headers score

---

### 3. **SSL/TLS Test** (Critical)

**Tool**: https://www.ssllabs.com/ssltest/

**Expected Result**: **A+ Grade**

**Check for**:
- ✅ TLS 1.3 support
- ✅ Strong cipher suites
- ✅ HSTS preload
- ✅ Certificate validity

---

### 4. **CSP Evaluator** (High Priority)

**Tool**: https://csp-evaluator.withgoogle.com/

**Check for**:
- ⚠️ Note: Will show warnings for 'unsafe-inline' (required by Next.js)
- ✅ No high/critical issues beyond Next.js requirements
- ✅ frame-ancestors set correctly
- ✅ base-uri restricted

---

### 5. **Privacy Check** (Critical)

**Tools**:
- Browser DevTools → Network tab
- https://webbkoll.dataskydd.net/

**Expected Result**:
- ❌ No Google Analytics
- ❌ No Facebook Pixel
- ❌ No third-party trackers
- ✅ Only: static.cloudflareinsights.com (minimal analytics)
- ❌ No cookies for tracking
- ❌ No localStorage with personal data

**Manual Test**:
```javascript
// Open browser console on site:
console.log(document.cookie); // Should be empty or minimal
console.log(Object.keys(localStorage)); // Should be empty or minimal
console.log(Object.keys(sessionStorage)); // Should be empty
```

---

### 6. **XSS Test** (High Priority)

**Manual Tests** (try on contact form if any):

```javascript
// Try these in form fields (should all be blocked):
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')
"><script>alert('XSS')</script>
```

**Expected Result**: All blocked by CSP, nothing executes

---

### 7. **Clickjacking Test** (High Priority)

**Manual Test**:
Create HTML file with:
```html
<!DOCTYPE html>
<html>
<body>
<iframe src="https://injuredworkersunite.pages.dev/"></iframe>
</body>
</html>
```

**Expected Result**: Iframe should be BLOCKED (X-Frame-Options: DENY)

---

### 8. **Mixed Content Test** (High Priority)

**Tool**: Browser DevTools → Console

**Expected Result**:
- ❌ No "Mixed Content" warnings
- ✅ All resources loaded over HTTPS
- ✅ CSP blocks any HTTP attempts

**Manual Check**:
```bash
# View page source and check for http:// (not https://)
curl https://injuredworkersunite.pages.dev/ | grep "http://"
# Should only show comments/text, no actual resources
```

---

### 9. **Dependency Vulnerabilities** (Critical)

**Command**:
```bash
npm audit
```

**Expected Result**: 
```
found 0 vulnerabilities
```

**If vulnerabilities found**:
```bash
npm audit fix
npm audit fix --force  # Only if necessary
```

---

### 10. **Open Ports Scan** (Medium Priority)

**Tool**: https://www.yougetsignal.com/tools/open-ports/

**Expected Result**:
- ✅ Only ports 80 (HTTP) and 443 (HTTPS) open
- ✅ Port 80 should redirect to 443
- ❌ No other ports (22, 21, 3306, etc.)

---

### 11. **Subdomain Takeover Check** (Low Priority)

**Tool**: https://github.com/projectdiscovery/nuclei

**Expected Result**:
- ✅ No dangling DNS records
- ✅ Cloudflare properly configured

---

### 12. **Git Secrets Scan** (Critical)

**Check for accidentally committed secrets**:

```bash
# Search for common secret patterns
git log --all --full-history --source --remotes -- "**/*.env" "**/*.key" "**/*.pem"

# Search commit history for API keys
git log -S "api_key" --all
git log -S "password" --all
git log -S "secret" --all
```

**Expected Result**: No sensitive files or strings in history

---

### 13. **CORS Configuration** (Medium Priority)

**Test**:
```bash
curl -H "Origin: https://evil.com" -I https://injuredworkersunite.pages.dev/
```

**Expected Result**:
- ❌ No `Access-Control-Allow-Origin: *` header
- ✅ No CORS headers (or strict CORS only)

---

### 14. **Robots.txt & Sitemap** (Low Priority)

**Check**:
- https://injuredworkersunite.pages.dev/robots.txt
- https://injuredworkersunite.pages.dev/sitemap.xml

**Expected Result**:
- ✅ robots.txt exists and blocks AI scrapers
- ✅ sitemap.xml exists and lists all pages
- ✅ Both served with correct content-type

---

### 15. **Error Page Enumeration** (Low Priority)

**Test 404 page**:
```bash
curl -I https://injuredworkersunite.pages.dev/nonexistent-page
```

**Expected Result**:
- ✅ Returns 404 status
- ❌ No server version information leaked
- ❌ No stack traces exposed

---

## 🚨 CRITICAL ISSUES - IMMEDIATE ACTION REQUIRED

If any of these fail, **STOP DEPLOYMENT**:

❌ Security headers missing or downgraded  
❌ HTTPS not enforced  
❌ XSS possible  
❌ Clickjacking possible  
❌ High/Critical npm vulnerabilities  
❌ Secrets exposed in Git history  

---

## ⚠️ HIGH PRIORITY - FIX WITHIN 24 HOURS

❌ Mixed content warnings  
❌ Weak SSL/TLS configuration  
❌ Privacy leaks detected  
❌ Medium npm vulnerabilities  

---

## 📊 SCORING

| Check | Weight | Pass | Fail |
|-------|--------|------|------|
| Security Headers | 20 | ✅ | ❌ |
| Mozilla Observatory | 15 | ✅ | ❌ |
| SSL/TLS Test | 15 | ✅ | ❌ |
| Privacy Check | 15 | ✅ | ❌ |
| XSS Test | 10 | ✅ | ❌ |
| Clickjacking Test | 10 | ✅ | ❌ |
| Dependencies | 10 | ✅ | ❌ |
| Git Secrets | 5 | ✅ | ❌ |

**Minimum Passing Score**: 85/100

---

## 📅 AUDIT SCHEDULE

- **After Every Deployment**: Run checks 1, 2, 3, 5
- **Weekly**: Run all checks
- **Monthly**: Full security review + dependency updates
- **Quarterly**: External security assessment (if budget)
- **Annually**: Comprehensive penetration test (if budget)

---

## 🔧 QUICK FIX COMMANDS

### Update Dependencies:
```bash
npm update
npm audit fix
```

### Test Security Headers Locally:
```bash
npm run build
npm run start
curl -I http://localhost:3000/
```

### Clear Build Cache:
```bash
rm -rf .next out node_modules
npm install
npm run build
```

### Verify Deployment:
```bash
git status
git log --oneline -5
curl -I https://injuredworkersunite.pages.dev/
```

---

## ✅ CURRENT STATUS

**Last Full Audit**: November 15, 2025  
**Next Scheduled Audit**: December 15, 2025  
**Security Grade**: A+  
**Vulnerabilities**: 0 known  

**Status**: 🟢 **SECURE** - All checks passing

---

## 📞 EMERGENCY CONTACTS

**Security Issue**: GitHub Security Advisories  
**Cloudflare Issues**: Cloudflare Dashboard  
**Code Issues**: GitHub Issues  
**Urgent**: injuredworker34@gmail.com

---

**Last Updated**: November 15, 2025  
**Version**: 1.0  
**Maintained By**: @PhoenixRizin09
