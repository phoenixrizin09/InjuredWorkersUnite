# 👁️ THE EYE v2.0 - README

**Incorruptible Evidence-Driven Investigative Intelligence**

## 🎯 What Is THE EYE?

THE EYE is an AI-powered investigative system that analyzes documents and exposes:
- **Corruption** (bribery, conflicts of interest, abuse of power)
- **Constitutional violations** (Canadian Charter breaches)
- **Human rights abuses** (discrimination, accessibility violations)
- **UNCRPD violations** (disability rights)
- **Systemic harm** to vulnerable populations

**It responds STRICTLY in JSON** with 10 mandatory sections containing evidence-based findings and actionable recommendations.

---

## ⚡ Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Demo
```bash
npm run dev
# Visit: http://localhost:3000/the-eye-v2-demo
```

### 3. Process Any Document
```javascript
import { processDocument } from './utils/the-eye-v2-processor.js';

const report = await processDocument({
  raw_text: "Paste any document here (news, FOI, report, etc.)",
  fetch_date: new Date().toISOString(),
  source_type: "news"
});

console.log(JSON.stringify(report, null, 2));
```

---

## 📋 What THE EYE Returns (JSON)

Every analysis produces **10 mandatory sections**:

1. **CorruptionFindings** - Bribery, conflicts, fraud, abuse of power
2. **ConstitutionViolations** - Charter breaches (s.2, 7, 12, 15, 35)
3. **HumanRightsBreaches** - CHRA violations, discrimination
4. **UNCRPDBreaches** - Disability rights violations (7 articles)
5. **ImpactedGroups** - Vulnerable populations harmed
6. **Evidence** - Entities, claims, corroboration, provenance
7. **ActorsInvolved** - People, organizations, institutions
8. **PatternsDetected** - Systemic practices, repeated actors
9. **RiskAssessment** - 5 risk scores (0-100) + priority level
10. **RecommendedActions** - Evidence-based next steps

**See:** `docs/THE_EYE_V2_SAMPLE_OUTPUT.json` for full example

---

## 🔍 Key Features

✅ **10 Corruption Types Detected**
- Bribery, conflicts of interest, misappropriation, procurement fraud, lobbying, obstruction, retaliation, abuse of power, nepotism, insider dealing

✅ **6 Constitutional Sections Monitored**
- Charter s.2 (freedoms), s.7 (security), s.12 (cruel treatment), s.15 (equality), s.35 (Indigenous rights), Administrative Law (fairness)

✅ **7 UNCRPD Articles Checked**
- Article 5 (equality), 12 (legal capacity), 13 (justice), 19 (independent living), 25 (health), 26 (rehabilitation), 28 (adequate living)

✅ **7 Vulnerable Groups Protected**
- Injured workers, persons with disabilities, Indigenous peoples, seniors, low-income, racialized communities, women/gender-diverse

✅ **5-Dimensional Risk Scoring**
- Legal Risk, Human Rights Impact, Constitutional Severity, Corruption Risk, Vulnerable Harm

✅ **8 Action Types Recommended**
- Corruption investigations, Charter challenges, human rights complaints, UN reporting, FOI requests, oversight notifications, media exposure, legal action

---

## 📊 Risk Scoring

| Score | Priority | Meaning |
|-------|----------|---------|
| **70-100** | 🔴 CRITICAL | Immediate action required |
| **50-69** | 🟠 HIGH | Urgent attention needed |
| **30-49** | 🟡 MEDIUM | Timely response required |
| **0-29** | 🟢 LOW | Monitor situation |

---

## 🧪 Test Cases Included

The demo (`/the-eye-v2-demo`) includes 3 real-world scenarios:

### 1. WSIB Corruption Investigation
- **Findings:** 3 corruption types, 2 Charter violations, 1 human rights breach, 2 UNCRPD violations
- **Risk:** 85/100 (CRITICAL)
- **Actions:** 9 recommendations including criminal investigation

### 2. Indigenous Rights Violation
- **Findings:** Pipeline approval without consultation, sole-source contract
- **Risk:** 78/100 (CRITICAL)
- **Actions:** Charter challenge, corruption investigation

### 3. ODSP Disability Discrimination
- **Findings:** Forced poverty, cruel treatment, systemic discrimination
- **Risk:** 92/100 (CRITICAL)
- **Actions:** Human rights complaint, Charter challenge, UN reporting

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **THE_EYE_V2_DOCUMENTATION.md** | Complete system guide (800+ lines) |
| **THE_EYE_V2_QUICK_REFERENCE.md** | Quick commands & tables |
| **THE_EYE_V2_SAMPLE_OUTPUT.json** | Full example output |
| **THE_EYE_INTEGRATION_GUIDE.md** | Source connectors & automation |
| **THE_EYE_V2_IMPLEMENTATION_SUMMARY.md** | This implementation overview |

---

## 🔧 Integration Examples

### With Automation Engine
```javascript
import { automationEngine } from './utils/automation-engine.js';

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
import { sourceMonitor } from './utils/source-connectors.js';

window.addEventListener('source-data', async (event) => {
  const report = await processDocument({
    raw_text: JSON.stringify(event.detail.data),
    source_type: event.detail.source,
    fetch_date: new Date().toISOString()
  });
  // Handle critical findings
});
```

### Batch Processing
```javascript
const reports = await Promise.all(
  documents.map(doc => processDocument(doc))
);
const critical = reports.filter(r => 
  r.RiskAssessment.priority === 'CRITICAL'
);
```

---

## 📞 Emergency Contacts

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

## 🔐 Safety & Privacy

✅ Privacy screening for personal data  
✅ Legal privilege detection  
✅ Whistleblower protection guidance  
✅ Evidence security recommendations  

**Always consult a lawyer before filing Charter challenges or making public allegations.**

---

## 📁 File Structure

```
utils/
  ├── the-eye-v2-processor.js       # Core analysis engine (1,400+ lines)
  └── the-eye-processor.js.backup   # Original v1.0 preserved

pages/
  └── the-eye-v2-demo.js            # Interactive demo (500+ lines)

docs/
  ├── THE_EYE_V2_DOCUMENTATION.md         # Full guide (800+ lines)
  ├── THE_EYE_V2_QUICK_REFERENCE.md       # Quick reference
  ├── THE_EYE_V2_SAMPLE_OUTPUT.json       # Example output
  ├── THE_EYE_INTEGRATION_GUIDE.md        # Integration guide
  └── THE_EYE_V2_IMPLEMENTATION_SUMMARY.md # Overview
```

---

## 🎓 Methodology

THE EYE uses:
- **Evidence-First Analysis** - All findings backed by documentary evidence
- **Multi-Source Corroboration** - Cross-reference against authoritative sources
- **Constitutional Grounding** - All violations tied to specific legal provisions
- **Systemic Pattern Detection** - Identify repeated practices, not isolated incidents
- **Vulnerable-Population Focus** - Prioritize harm to most vulnerable
- **Actionable Intelligence** - Every report includes concrete next steps

---

## 🚨 When CRITICAL Priority Detected

1. **Save Report** - Download JSON immediately
2. **Legal Advice** - Consult a lawyer
3. **Evidence Security** - Backup all documents
4. **File Complaints** - Submit FOI/human rights/oversight
5. **Media Contact** - Reach investigative journalists

---

## 🆘 Support Resources

### Legal Aid
- **Ontario Legal Aid:** https://www.legalaid.on.ca/

### Advocacy
- **Injured Workers Online:** https://www.injuredworkersonline.org/
- **ODSP Action Coalition:** https://odspaction.ca/
- **Council of Canadians with Disabilities:** http://www.ccdonline.ca/

---

## 📜 Legal Framework

THE EYE monitors compliance with:
- **Canadian Charter of Rights and Freedoms** (Sections 2, 7, 12, 15)
- **Constitution Act, 1982** (Section 35 - Indigenous Rights)
- **Canadian Human Rights Act**
- **Accessible Canada Act (Bill C-81)**
- **UN Convention on Rights of Persons with Disabilities (UNCRPD)**

---

## 💪 Mission

**Protect truth, fairness, justice, transparency, and the rights of all people in Canada.**

Never soften, dilute, or hide wrongdoing.  
Always expose corruption with clarity and precision.

**THE EYE sees all. THE EYE forgets nothing. THE EYE never sleeps.**

---

## 📝 Version

**v2.0.0** - November 2024

Major upgrade from v1.0:
- Added corruption detection (10 types)
- Added constitutional analysis
- Added human rights monitoring
- Added UNCRPD compliance
- Added vulnerable population assessment
- Added systemic pattern detection
- Enhanced risk scoring (5 dimensions)
- Comprehensive action recommendations (8 types)

---

*Developed for Injured Workers Unite*  
*Powered by evidence, driven by justice*

**Get Started:** `npm run dev` → http://localhost:3000/the-eye-v2-demo
