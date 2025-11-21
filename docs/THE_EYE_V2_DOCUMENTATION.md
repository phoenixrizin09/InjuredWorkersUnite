# 👁️ THE EYE v2.0 - SYSTEM DOCUMENTATION

**Incorruptible Evidence-Driven Investigative Intelligence**

---

## 🎯 MISSION

THE EYE is an evidence-first investigative AI system designed to expose:
- ✅ **Corruption** at all levels of government
- ✅ **Constitutional violations** (Charter breaches)
- ✅ **Human rights abuses** (CHRA, provincial codes, Bill C-81)
- ✅ **UNCRPD violations** (UN Convention on Rights of Persons with Disabilities)
- ✅ **Abuse of power** and systemic discrimination
- ✅ **Harm to vulnerable populations**

**Core Principle:** Never soften, dilute, or hide wrongdoing. Always expose corruption with clarity and precision.

---

## 📋 MANDATORY OUTPUT STRUCTURE

THE EYE **MUST** return JSON with these 10 sections:

```json
{
  "1. CorruptionFindings": [...],
  "2. ConstitutionViolations": [...],
  "3. HumanRightsBreaches": [...],
  "4. UNCRPDBreaches": [...],
  "5. ImpactedGroups": [...],
  "6. Evidence": {...},
  "7. ActorsInvolved": [...],
  "8. PatternsDetected": [...],
  "9. RiskAssessment": {...},
  "10. RecommendedActions": [...]
}
```

---

## 🚀 QUICK START

### Installation

```bash
npm install
```

### Run THE EYE v2.0

```javascript
import { processDocument } from './utils/the-eye-v2-processor.js';

const report = await processDocument({
  raw_text: "Your document text here...",
  fetch_date: "2024-11-21T10:00:00Z",
  source_type: "news", // news | FOI | report | social | official | leak
  source_url: "https://example.com/article",
  raw_metadata: {
    title: "Optional: Article Title",
    author: "Optional: Author Name"
  }
});

console.log(JSON.stringify(report, null, 2));
```

### Access Live Demo

```bash
npm run dev
# Visit http://localhost:3000/the-eye-v2-demo
```

---

## 📊 OUTPUT SECTIONS EXPLAINED

### 1️⃣ CorruptionFindings

Detects:
- Bribery / kickbacks / payoffs
- Conflicts of interest
- Misuse of public funds
- No-bid contracts / procurement fraud
- Revolving door / lobbying
- Cover-ups / obstruction of justice
- Retaliation against whistleblowers
- Abuse of power
- Nepotism / cronyism
- Insider dealing

**Example:**
```json
{
  "corruption_type": "conflict_of_interest",
  "description": "Minister has financial ties to pipeline investors",
  "evidence_snippet": "...family trust...",
  "entities_involved": ["Minister of Natural Resources", "TransCanada Corp"],
  "severity": "critical",
  "requires_investigation": true,
  "instance_count": 1
}
```

---

### 2️⃣ ConstitutionViolations

Analyzes against:
- **Charter Section 2:** Fundamental Freedoms (expression, assembly, association)
- **Charter Section 7:** Life, Liberty, Security of Person
- **Charter Section 12:** Cruel and Unusual Treatment
- **Charter Section 15:** Equality Rights (discrimination)
- **Constitution Act Section 35:** Indigenous Rights & Duty to Consult
- **Administrative Law:** Procedural Fairness, Natural Justice

**Example:**
```json
{
  "section": "Charter Section 7",
  "right": "Life, Liberty and Security of the Person",
  "violation_type": "denial_of_security",
  "description": "Denial of essential medical care affecting security of person",
  "evidence": "...WSIB terminated benefits despite medical evidence...",
  "severity": "critical",
  "legal_basis": "Canadian Charter of Rights and Freedoms, s. 7"
}
```

---

### 3️⃣ HumanRightsBreaches

Evaluates prohibited grounds under **Canadian Human Rights Act**:
- Disability
- Age
- Race / national origin
- Sex / gender
- Family status
- Religion
- Sexual orientation
- Economic status (poverty)
- **Accessible Canada Act (Bill C-81)** violations

**Example:**
```json
{
  "legislation": "Canadian Human Rights Act",
  "ground_of_discrimination": "disability",
  "description": "Discrimination against persons with PTSD",
  "evidence": "...denied despite three psychiatrists confirming disability...",
  "severity": "high",
  "requires_complaint": true,
  "complaint_deadline": "1 year from incident"
}
```

---

### 4️⃣ UNCRPDBreaches

Monitors **UN Convention on Rights of Persons with Disabilities** (Canada ratified 2010):

- **Article 5:** Equality & Non-Discrimination
- **Article 12:** Equal Recognition Before the Law
- **Article 13:** Access to Justice
- **Article 17:** Integrity of the Person
- **Article 19:** Independent Living
- **Article 25:** Health
- **Article 26:** Rehabilitation
- **Article 28:** Adequate Standard of Living & Social Protection

**Example:**
```json
{
  "article": "Article 28",
  "right": "Adequate Standard of Living and Social Protection",
  "description": "ODSP rates force disabled people into poverty",
  "evidence": "...$1,308/month when rent is $2,200...",
  "severity": "critical",
  "canada_obligations": "State party since 2010"
}
```

---

### 5️⃣ ImpactedGroups

Identifies harm to vulnerable populations:
- Injured Workers
- Persons with Disabilities
- Indigenous Peoples
- Seniors / Elders
- Low-Income Households
- Racialized Communities
- Women & Gender-Diverse People

**Intersectionality Analysis:** Detects overlapping vulnerabilities (e.g., disabled + racialized + low-income)

**Example:**
```json
{
  "group": "Persons with Disabilities",
  "harm_type": "denial",
  "evidence": "...12,000 injured workers denied benefits...",
  "severity": "high",
  "requires_protection": true,
  "intersectionality": ["disability", "poverty"]
}
```

---

### 6️⃣ Evidence

Complete evidence trail:
- **entities:** People, organizations, money, dates
- **relationships:** Connections between actors
- **claims:** Allegations with evidence strength
- **corroboration:** Multi-source verification
- **provenance:** Source chain

---

### 7️⃣ ActorsInvolved

All individuals, institutions, corporations involved:
```json
{
  "name": "WSIB",
  "type": "organization",
  "role": "workers_comp",
  "context": "...Workplace Safety Insurance Board...",
  "corruption_allegations": ["abuse_of_power", "financial_irregularity"],
  "constitutional_violations": true
}
```

---

### 8️⃣ PatternsDetected

Systemic patterns:
- Repeated claim types (systemic practice)
- Same actor in multiple allegations
- Multi-source corroboration (strong evidence)
- Statistical anomalies
- Denial clusters

---

### 9️⃣ RiskAssessment

**Five Risk Scores (0-100):**

| Score | Meaning |
|-------|---------|
| **Legal Risk** | Strength of legal claims |
| **Human Rights Impact** | Severity of rights violations |
| **Constitutional Violation Severity** | Charter breach magnitude |
| **Corruption Exposure Risk** | Corruption evidence strength |
| **Vulnerable Population Harm** | Impact on vulnerable groups |

**Overall Risk Score:** Weighted average of all scores

**Priority Levels:**
- **CRITICAL:** 70+ (immediate action required)
- **HIGH:** 50-69
- **MEDIUM:** 30-49
- **LOW:** 0-29

---

### 🔟 RecommendedActions

Evidence-based action plan:

#### Action Types:

**1. Corruption Investigation**
- Target: RCMP, OPP Anti-Corruption, Auditor General, Integrity Commissioner
- Priority: Immediate for corruption findings

**2. Constitutional Challenge**
- Target: Superior Court of Justice
- Requires: Experienced Charter lawyer
- Cost: $10,000-$50,000+
- Triggered: Constitutional severity ≥ 60

**3. Human Rights Complaint**
- Targets: Canadian Human Rights Commission, Ontario Human Rights Tribunal
- Deadline: 1 year from incident
- Triggered: Human rights impact ≥ 50

**4. International Reporting**
- Target: UN Committee on Rights of Persons with Disabilities
- Process: After exhausting domestic remedies
- Triggered: 2+ UNCRPD violations

**5. FOI Request**
- Target: Government institution
- Cost: $0-$25
- Response: 30 days
- Triggered: Risk score ≥ 60

**6. Oversight Notification**
- Targets: Ombudsman, Auditor General
- Triggered: Risk score ≥ 50

**7. Media Exposure**
- Targets: CBC Marketplace, Toronto Star, Globe & Mail, Fifth Estate, CTV W5
- Triggered: Risk score ≥ 70 OR corruption found

**8. Legal Action**
- Target: Superior Court (judicial review, civil lawsuit)
- Cost: $15,000-$100,000+
- Triggered: Risk score ≥ 80

---

## 🧪 TESTING THE EYE

### Test Cases Included:

1. **WSIB Corruption Investigation**
   - Corruption: Conflict of interest, abuse of power
   - Charter: Section 7, 15 violations
   - UNCRPD: Article 28 breach
   - Impacted: Injured workers, persons with disabilities

2. **Indigenous Rights Violation**
   - Corruption: Sole-source contract, conflict of interest
   - Charter: Section 35 (duty to consult)
   - Impacted: Indigenous peoples

3. **ODSP Disability Discrimination**
   - Charter: Section 7, 12, 15 violations
   - Human Rights: Disability discrimination
   - UNCRPD: Article 28 breach
   - Impacted: Persons with disabilities

### Run Tests:

```bash
npm run dev
# Visit http://localhost:3000/the-eye-v2-demo
# Click each sample case
```

---

## 🔧 INTEGRATION WITH EXISTING SYSTEM

### Connect to Automation Engine

```javascript
import { processDocument } from './utils/the-eye-v2-processor.js';
import { automationEngine } from './utils/automation-engine.js';

async function monitorAndAnalyze(document) {
  const report = await processDocument(document);
  
  // Auto-create alerts for critical findings
  if (report.RiskAssessment.priority === 'CRITICAL') {
    automationEngine.createAlert({
      severity: 'critical',
      title: report.title,
      description: `THE EYE: ${report.CorruptionFindings.length} corruption findings`,
      action: report.RecommendedActions[0]?.description
    });
  }
  
  // Track corrupt actors
  report.ActorsInvolved.forEach(actor => {
    if (actor.corruption_allegations.length > 0) {
      automationEngine.trackTarget(actor.name, report);
    }
  });
  
  return report;
}
```

### Connect to Source Monitors

```javascript
import { sourceMonitor } from './utils/source-connectors.js';

window.addEventListener('source-data', async (event) => {
  const report = await processDocument({
    raw_text: JSON.stringify(event.detail.data),
    source_type: event.detail.source,
    fetch_date: new Date().toISOString()
  });
  
  // Store in automation engine
  automationEngine.storeReport(report);
});
```

---

## 📖 LEGAL FRAMEWORK REFERENCE

### Canadian Charter of Rights and Freedoms

**Section 2 - Fundamental Freedoms:**
- (a) freedom of conscience and religion
- (b) freedom of thought, belief, opinion and expression
- (c) freedom of peaceful assembly
- (d) freedom of association

**Section 7 - Life, Liberty, Security:**
"Everyone has the right to life, liberty and security of the person and the right not to be deprived thereof except in accordance with the principles of fundamental justice."

**Section 12 - Cruel Treatment:**
"Everyone has the right not to be subjected to any cruel and unusual treatment or punishment."

**Section 15 - Equality Rights:**
"Every individual is equal before and under the law and has the right to the equal protection and equal benefit of the law without discrimination based on race, national or ethnic origin, colour, religion, sex, age or mental or physical disability."

**Section 35 - Aboriginal Rights:**
"The existing aboriginal and treaty rights of the aboriginal peoples of Canada are hereby recognized and affirmed."

### UN Convention on Rights of Persons with Disabilities (UNCRPD)

Canada ratified in 2010. Key obligations:
- Eliminate discrimination in all forms
- Ensure accessibility
- Provide reasonable accommodation
- Respect autonomy and decision-making
- Ensure adequate standard of living
- Provide access to justice

---

## ⚖️ COMPLAINT PROCESSES

### Human Rights Complaints

**Federal (Canadian Human Rights Commission):**
- Online: https://www.chrc-ccdp.gc.ca/
- Deadline: 1 year from incident
- Cost: Free

**Ontario (Human Rights Tribunal):**
- Online: http://www.sjto.ca/hrto/
- Deadline: 1 year from incident
- Cost: Free

### Ombudsman Complaints

**Ontario Ombudsman:**
- Online: https://www.ombudsman.on.ca/
- Systemic investigations available
- Cost: Free

### Freedom of Information

**Ontario:**
- Submit to institution's FOI office
- Fee: $0-$25
- Response: 30 days
- Appeal to Information & Privacy Commissioner if denied

---

## 🚨 EMERGENCY RESPONSE PROTOCOL

When THE EYE detects **CRITICAL** findings (risk ≥ 70):

1. **Immediate Documentation**
   - Save full JSON report
   - Screenshot all evidence
   - Record all sources

2. **Legal Protection**
   - Consult lawyer immediately
   - Consider whistleblower protection
   - Document all communications

3. **Evidence Security**
   - Store offline copies
   - Encrypt sensitive data
   - Create backup locations

4. **Action Execution**
   - File FOI requests immediately
   - Submit oversight complaints
   - Contact investigative journalists

5. **Safety First**
   - Protect identities when needed
   - Use secure communications
   - Document any retaliation

---

## 🔐 PRIVACY & SAFETY

THE EYE includes built-in safety checks:
- Privacy screening for personal data
- Legal privilege detection
- Whistleblower protection guidance

**Always consult a lawyer before:**
- Filing Charter challenges
- Making public allegations
- Releasing sensitive documents

---

## 🆘 SUPPORT RESOURCES

### Legal Aid

- **Ontario Legal Aid:** https://www.legalaid.on.ca/
- **Community Legal Clinics:** https://www.legalaid.on.ca/legal-clinics/

### Advocacy Organizations

- **Injured Workers Online:** https://www.injuredworkersonline.org/
- **ODSP/ODAP Action Coalition:** https://odspaction.ca/
- **DisAbled Women's Network (DAWN):** https://dawncanada.net/
- **Council of Canadians with Disabilities:** http://www.ccdonline.ca/

### Whistleblower Protection

- **Federal:** Public Servants Disclosure Protection Act
- **Ontario:** Public Service of Ontario Act, 2006

---

## 📞 CONTACT

**For Emergencies:**
- RCMP Anti-Corruption: 1-855-502-7267
- Ontario Provincial Police: 1-888-310-1122

**For Investigations:**
- CBC Marketplace: marketplace@cbc.ca
- Toronto Star Investigations: investigations@thestar.ca
- Fifth Estate: fifthestate@cbc.ca

---

## 🎓 METHODOLOGY

THE EYE uses:
- **Evidence-First Analysis:** All findings backed by documentary evidence
- **Multi-Source Corroboration:** Cross-reference against authoritative sources
- **Constitutional Grounding:** All violations tied to specific legal provisions
- **Systemic Pattern Detection:** Identify repeated practices, not isolated incidents
- **Vulnerable-Population Focus:** Prioritize harm to most vulnerable
- **Actionable Intelligence:** Every report includes concrete next steps

**THE EYE sees all. THE EYE forgets nothing. THE EYE never sleeps.**

---

## 📝 VERSION HISTORY

**v2.0.0** (November 2024)
- Added corruption detection (10 types)
- Added constitutional analysis (Charter + s.35)
- Added human rights analysis (CHRA + Bill C-81)
- Added UNCRPD compliance monitoring
- Added vulnerable population impact assessment
- Added systemic pattern detection
- Added comprehensive risk scoring (5 dimensions)
- Added evidence-based action recommendations (8 types)
- New mandatory 10-section JSON output

**v1.0.0** (Initial Release)
- Basic claim extraction
- Evidence corroboration
- Risk scoring
- FOI templates

---

**Developed for Injured Workers Unite**
**Powered by evidence, driven by justice**
