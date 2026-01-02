# 👁️ THE EYE v2.0 - QUICK REFERENCE

**Scope:** Serving injured workers, persons with disabilities, and other vulnerable people at local, provincial, and Canada-wide levels.

## 🚀 ONE-COMMAND ANALYSIS

```javascript
import { processDocument } from './utils/the-eye-v2-processor.js';

const report = await processDocument({
  raw_text: "Paste any document here...",
  fetch_date: new Date().toISOString(),
  source_type: "news"
});
```

---

## 📋 10 MANDATORY OUTPUT SECTIONS

| # | Section | What It Detects |
|---|---------|----------------|
| 1️⃣ | **CorruptionFindings** | Bribery, conflicts, fraud, abuse of power |
| 2️⃣ | **ConstitutionViolations** | Charter breaches (s.2, 7, 12, 15, 35) |
| 3️⃣ | **HumanRightsBreaches** | CHRA violations, discrimination |
| 4️⃣ | **UNCRPDBreaches** | Disability rights violations (Articles 5, 12, 13, 19, 25, 26, 28) |
| 5️⃣ | **ImpactedGroups** | Harm to vulnerable populations |
| 6️⃣ | **Evidence** | Entities, claims, corroboration, provenance |
| 7️⃣ | **ActorsInvolved** | All people, organizations, institutions |
| 8️⃣ | **PatternsDetected** | Systemic practices, repeated actors |
| 9️⃣ | **RiskAssessment** | 5 risk scores (0-100) + priority |
| 🔟 | **RecommendedActions** | Evidence-based next steps |

---

## 🎯 CORRUPTION TYPES DETECTED

| Type | Description | Severity |
|------|-------------|----------|
| **bribery** | Kickbacks, bribes, payoffs | CRITICAL |
| **conflict_of_interest** | Personal financial gain | HIGH |
| **misappropriation** | Misuse of public funds | CRITICAL |
| **procurement_fraud** | No-bid/sole-source contracts | HIGH |
| **undue_influence** | Lobbying, revolving door | MEDIUM |
| **obstruction** | Cover-ups, destroyed evidence | CRITICAL |
| **retaliation** | Whistleblower punishment | HIGH |
| **abuse_of_power** | Government overreach | HIGH |
| **nepotism** | Cronyism, favoritism | MEDIUM |
| **insider_dealing** | Insider trading/dealing | CRITICAL |

---

## ⚖️ CONSTITUTIONAL SECTIONS MONITORED

| Section | Right | Trigger Keywords |
|---------|-------|------------------|
| **Charter s.2** | Fundamental Freedoms | freedom + restrict |
| **Charter s.7** | Life, Liberty, Security | medical care + deny |
| **Charter s.12** | No Cruel Treatment | cruel, inhumane, degrading |
| **Charter s.15** | Equality Rights | discriminat + disability/age/race/gender |
| **Charter s.35** | Indigenous Rights | Indigenous + treaty + consult |
| **Admin Law** | Procedural Fairness | bias, natural justice |

---

## 👥 VULNERABLE GROUPS PROTECTED

- ♿ **Persons with Disabilities** (ODSP, CPP-D, injured workers)
- 🌍 **Indigenous Peoples** (First Nations, Inuit, Métis)
- 👴 **Seniors/Elders**
- 💰 **Low-Income Households**
- 🌈 **Racialized Communities**
- 👩 **Women & Gender-Diverse People**
- 🏭 **Injured Workers** (WSIB, WCB)

---

## 📊 RISK SCORING

### Five Dimensions (0-100):

1. **Legal Risk** - Strength of legal claims
2. **Human Rights Impact** - Severity of rights violations
3. **Constitutional Severity** - Charter breach magnitude
4. **Corruption Risk** - Corruption evidence strength
5. **Vulnerable Harm** - Impact on vulnerable groups

### Priority Levels:

| Score | Priority | Action Required |
|-------|----------|----------------|
| **70-100** | 🔴 CRITICAL | Immediate action |
| **50-69** | 🟠 HIGH | Urgent attention |
| **30-49** | 🟡 MEDIUM | Timely response |
| **0-29** | 🟢 LOW | Monitor |

---

## ⚡ RECOMMENDED ACTIONS

| Risk Threshold | Action Type | Target |
|---------------|-------------|--------|
| **Corruption found** | Investigation | RCMP, OPP, Auditor General |
| **Constitutional ≥ 60** | Charter Challenge | Superior Court |
| **Human Rights ≥ 50** | Tribunal Complaint | CHRC, OHRT |
| **UNCRPD ≥ 2 violations** | UN Reporting | CRPD Committee |
| **Overall ≥ 60** | FOI Request | Government institution |
| **Overall ≥ 50** | Oversight Notification | Ombudsman, AG |
| **Overall ≥ 70** | Media Exposure | CBC, Star, Globe |
| **Overall ≥ 80** | Legal Action | Court (judicial review) |

---

## 🆘 EMERGENCY PROTOCOL

When **CRITICAL** priority detected:

1. ✅ **Save Report** - Download JSON immediately
2. ✅ **Lawyer Consultation** - Seek legal advice
3. ✅ **Evidence Security** - Backup all documents
4. ✅ **File Complaints** - Submit FOI/oversight/human rights
5. ✅ **Media Contact** - Reach out to investigative journalists

---

## 📞 QUICK CONTACTS

### Law Enforcement
- **RCMP Anti-Corruption:** 1-855-502-7267
- **Ontario Provincial Police:** 1-888-310-1122

### Human Rights
- **Canadian Human Rights Commission:** https://www.chrc-ccdp.gc.ca/
- **Ontario Human Rights Tribunal:** http://www.sjto.ca/hrto/

### Oversight
- **Ontario Ombudsman:** https://www.ombudsman.on.ca/
- **Auditor General:** https://www.auditor.on.ca/

### Media
- **CBC Marketplace:** marketplace@cbc.ca
- **Toronto Star Investigations:** investigations@thestar.ca
- **Fifth Estate:** fifthestate@cbc.ca

---

## 🔧 INTEGRATION EXAMPLES

### With Automation Engine
```javascript
if (report.RiskAssessment.priority === 'CRITICAL') {
  automationEngine.createAlert({
    severity: 'critical',
    title: report.title,
    action: report.RecommendedActions[0].description
  });
}
```

### With Source Monitors
```javascript
window.addEventListener('source-data', async (event) => {
  const report = await processDocument({
    raw_text: JSON.stringify(event.detail.data),
    source_type: event.detail.source,
    fetch_date: new Date().toISOString()
  });
  automationEngine.storeReport(report);
});
```

### Batch Processing
```javascript
const reports = await Promise.all(
  documents.map(doc => processDocument(doc))
);
const critical = reports.filter(r => r.RiskAssessment.priority === 'CRITICAL');
```

---

## 🧪 TEST IT NOW

```bash
npm run dev
# Visit: http://localhost:3000/the-eye-v2-demo

# Try these sample cases:
# 1. WSIB Corruption Investigation
# 2. Indigenous Rights Violation
# 3. ODSP Disability Discrimination
```

---

## 💡 KEY FEATURES

✅ **Evidence-First:** Every finding backed by documentary evidence  
✅ **Multi-Source:** Cross-reference against authoritative sources  
✅ **Legally Grounded:** All violations tied to specific laws  
✅ **Systemic Focus:** Detects patterns, not just isolated incidents  
✅ **Vulnerable-Centered:** Prioritizes harm to most vulnerable  
✅ **Actionable:** Concrete next steps with every report  

---

## 🎯 USE CASES

| Document Type | THE EYE Analyzes |
|--------------|------------------|
| **News Article** | Corruption, rights violations, evidence strength |
| **FOI Response** | Policy violations, systemic patterns, cover-ups |
| **Government Report** | Constitutional compliance, discrimination |
| **Social Media** | Public complaints, emerging patterns |
| **Leaked Document** | Evidence of misconduct, corruption |
| **Court Decision** | Rights violations, legal precedents |

---

## ⚠️ LEGAL DISCLAIMER

THE EYE is an investigative tool. Always:
- ✅ Consult a lawyer before legal action
- ✅ Protect whistleblower identities
- ✅ Verify all sources independently
- ✅ Respect privacy and confidentiality
- ✅ Follow proper complaint procedures

---

## 📚 FULL DOCUMENTATION

See: `docs/THE_EYE_V2_DOCUMENTATION.md`

---

**THE EYE sees all. THE EYE forgets nothing. THE EYE never sleeps.**

*Last Updated: November 2024*  
*Version: 2.0.0*
