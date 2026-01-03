# Security Policy

## 🔒 Security Commitment

InjuredWorkersUnite takes security seriously. This platform contains sensitive activist infrastructure and must be protected against all threats.

## 🛡️ Security Measures

### 1. **Static Site Architecture**
- **No backend** = No server-side vulnerabilities
- **No database** = No SQL injection possible
- **No user authentication** = No credential theft possible
- **No file uploads** = No malware upload vectors
- **No server-side processing** = No remote code execution

### 2. **HTTP Security Headers**
All pages protected with:
- `Strict-Transport-Security` (HSTS with preload)
- `Content-Security-Policy` (CSP - blocks unauthorized scripts)
- `X-Frame-Options: DENY` (prevents clickjacking)
- `X-Content-Type-Options: nosniff` (prevents MIME-sniffing)
- `X-XSS-Protection` (enables browser XSS filters)
- `Cross-Origin-Embedder-Policy: require-corp`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Referrer-Policy: no-referrer` (privacy protection)
- `Permissions-Policy` (disables unnecessary browser APIs)

### 3. **Cloudflare Protection**
- DDoS mitigation (automatic)
- Bot protection and filtering
- Web Application Firewall (WAF)
- Rate limiting
- TLS 1.3 encryption
- DNSSEC enabled

### 4. **Content Security**
- All external resources loaded over HTTPS only
- Subresource Integrity (SRI) where applicable
- No inline scripts from untrusted sources
- No eval() or Function() constructors
- Strict CSP preventing code injection

### 5. **Privacy = Security**
- **Zero data collection** = Nothing to steal
- **No cookies for tracking** = No session hijacking
- **No user accounts** = No account takeover
- **No personal information stored** = No data breaches

## 🚨 Reporting Security Vulnerabilities

We take all security reports seriously.

### DO NOT:
❌ Open a public GitHub issue for security vulnerabilities
❌ Disclose vulnerabilities publicly before we've had time to fix them
❌ Attempt to exploit vulnerabilities beyond proof-of-concept

### DO:
✅ **Report privately via GitHub Security Advisories**: https://github.com/phoenixrizin09/InjuredWorkersUnite/security/advisories/new
✅ **Or email**: injuredworker34@gmail.com with subject "SECURITY VULNERABILITY"

### What to Include:
1. **Description** of the vulnerability
2. **Steps to reproduce** (detailed)
3. **Potential impact** assessment
4. **Suggested fix** (if you have one)
5. **Your contact info** (for follow-up)

### Response Timeline:
- **Initial Response**: Within 48 hours
- **Severity Assessment**: Within 72 hours
- **Critical Issues**: Fixed within 7 days
- **High/Medium Issues**: Fixed within 30 days
- **Low Issues**: Fixed in next regular update

### Disclosure Policy:
- We will work with you on responsible disclosure
- Public disclosure only after fix is deployed
- Credit given to security researchers (if desired)
- No legal action against good-faith security research

## 🎯 Scope

### IN SCOPE:
✅ All pages on injuredworkersunite.pages.dev
✅ Client-side code execution vulnerabilities
✅ XSS, CSRF, clickjacking attempts
✅ Security header bypasses
✅ CSP violations that could lead to exploitation
✅ Privacy leaks or tracking mechanisms
✅ Authentication/authorization bypasses (if any exist)
✅ Content injection vulnerabilities

### OUT OF SCOPE:
❌ Social engineering attacks
❌ Physical attacks on infrastructure
❌ DDoS attacks (handled by Cloudflare)
❌ Attacks on third-party sites we link to
❌ Attacks requiring physical access to user devices
❌ Browser or OS-level vulnerabilities
❌ Issues in third-party dependencies (report to them directly)

## 🔍 Known Limitations

We acknowledge these limitations:

1. **Client-Side Rendering**: Next.js static export means everything runs in the browser. Users should trust their own devices.

2. **External Links**: We link to government sites, media, etc. We cannot control their security.

3. **Cloudflare Analytics**: Basic analytics token in code. No personal data, but does make requests to Cloudflare.

4. **'unsafe-inline' CSP**: Required for Next.js inline styles. We mitigate with other headers.

5. **No Rate Limiting**: Static site means no server-side rate limiting. Cloudflare provides this.

## 🛠️ Security Checklist

### For Contributors:
- [ ] No secrets/credentials in code
- [ ] All dependencies up to date (`npm audit`)
- [ ] No `eval()` or `Function()` constructors
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] External resources loaded over HTTPS
- [ ] Security headers maintained in next.config.js
- [ ] No new tracking or analytics added
- [ ] Accessibility maintained (security through inclusivity)

### For Deployers:
- [ ] HTTPS enabled (automatic on Cloudflare Pages)
- [ ] Security headers verified at securityheaders.com
- [ ] Cloudflare WAF enabled
- [ ] DNSSEC enabled
- [ ] Auto-minify enabled
- [ ] Brotli compression enabled
- [ ] No sensitive data in environment variables
- [ ] GitHub repository security settings reviewed

## 🔐 Security Best Practices for Users

### When Visiting:
1. **Use HTTPS** (enforced automatically)
2. **Keep browser updated** (we support latest versions)
3. **Use VPN** if you want additional privacy (optional)
4. **Verify URL** (injuredworkersunite.pages.dev)
5. **No downloads** (we don't offer any - if you see any, it's fake)

### When Using Information:
1. **Verify sources** (all linked to official sites)
2. **Use Signal/ProtonMail** for sensitive communications
3. **Don't share personal info** (we never ask for any)
4. **Be cautious with linked sites** (some may track you)

## 📊 Security Monitoring

### Automated:
- GitHub Dependabot alerts (enabled)
- npm audit on every install
- Cloudflare security monitoring
- Security headers validation

### Manual:
- Weekly security header checks
- Monthly dependency audits
- Quarterly comprehensive security review
- Immediate response to vulnerability reports

## 🏆 Security Hall of Fame

We recognize security researchers who help us improve:

| Date | Researcher | Vulnerability | Severity |
|------|-----------|---------------|----------|
| -    | -         | -             | -        |

(No vulnerabilities reported yet)

## 📚 Security Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CSP Guide: https://content-security-policy.com/
- Security Headers: https://securityheaders.com/
- Mozilla Observatory: https://observatory.mozilla.org/

## 🤝 Contact

- **Security Issues**: GitHub Security Advisories or injuredworker34@gmail.com
- **General Security Questions**: Open a GitHub Discussion
- **Urgent/Critical**: Email with "URGENT SECURITY" in subject

## 📜 Legal

Security research conducted in good faith will not result in legal action. We support responsible disclosure and will work with researchers to understand and fix issues.

---

**Last Updated**: November 15, 2025  
**Next Security Audit**: December 15, 2025  
**Security Contact**: injuredworker34@gmail.com
