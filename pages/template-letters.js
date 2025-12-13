import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SystemNavigation from '../components/SystemNavigation';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - TEMPLATE LETTERS & APPEALS
 * 
 * Pre-written templates to help workers fight back against the system.
 * Every letter is designed to invoke specific legal rights.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function TemplatLetters() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      id: 'wsib-appeal',
      category: 'workers_comp',
      title: 'WSIB Claim Denial Appeal',
      description: 'Appeal a denied WSIB claim citing proper legal grounds',
      province: 'Ontario',
      template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, PROVINCE, POSTAL CODE]
[DATE]

Workplace Safety and Insurance Board
Appeals Services Division
200 Front Street West
Toronto, ON M5V 3J1

RE: Notice of Intent to Appeal - Claim #[YOUR CLAIM NUMBER]
Worker Name: [YOUR NAME]
Date of Injury: [DATE OF INJURY]

Dear Appeals Services,

I am writing to formally appeal the decision dated [DECISION DATE] which denied my claim for [TYPE OF CLAIM - e.g., "benefits for chronic mental stress" / "loss of earnings" / "non-economic loss"].

GROUNDS FOR APPEAL:

1. FACTUAL ERRORS IN THE DECISION
[Describe specific factual errors in the original decision]

2. FAILURE TO CONSIDER MEDICAL EVIDENCE
The decision failed to properly consider the medical evidence from [DOCTOR NAME], dated [DATE], which clearly states [SUMMARIZE KEY MEDICAL FINDINGS].

3. MISAPPLICATION OF WSIB POLICY
The decision incorrectly applied Policy [POLICY NUMBER] because [EXPLAIN HOW POLICY WAS MISAPPLIED].

4. VIOLATION OF PROCEDURAL FAIRNESS
[If applicable - describe any procedural issues]

LEGAL BASIS FOR APPEAL:

Under Section 123 of the Workplace Safety and Insurance Act, 1997, I have the right to appeal decisions that affect my entitlement to benefits. The Ontario Ombudsman has documented systemic issues with WSIB claim denials, particularly for mental health claims (2023 Report).

REQUESTED REMEDY:
I request that the Appeals Services:
1. Overturn the original decision
2. Grant full entitlement to [SPECIFIC BENEFITS REQUESTED]
3. Provide retroactive benefits from [DATE]

I have attached the following supporting documents:
• [LIST ALL ATTACHED DOCUMENTS]

I request an oral hearing to present my case in person.

Please confirm receipt of this appeal within 14 days.

Sincerely,

[YOUR SIGNATURE]
[YOUR NAME]
[PHONE NUMBER]
[EMAIL]

CC: Ontario Ombudsman
    Office of the Worker Adviser`,
      tips: [
        'Submit within 30 days of the decision date',
        'Keep copies of everything you send',
        'Contact the Office of the Worker Adviser for free legal help',
        'Request an oral hearing - you have the right to present in person',
        'Cite specific WSIB policies that support your case'
      ]
    },
    {
      id: 'odsp-internal-review',
      category: 'disability',
      title: 'ODSP Decision Internal Review Request',
      description: 'Request internal review of ODSP denial or reduction',
      province: 'Ontario',
      template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, ON, POSTAL CODE]
[DATE]

Social Benefits Tribunal
Internal Review Unit
Ministry of Children, Community and Social Services
[LOCAL ODSP OFFICE ADDRESS]

RE: Request for Internal Review
ODSP Case #: [YOUR CASE NUMBER]
Member Name: [YOUR NAME]

Dear Internal Review Unit,

I am writing to request an Internal Review of the decision dated [DECISION DATE] regarding [DESCRIBE DECISION - e.g., "denial of income support" / "reduction of benefits" / "denial of disability status"].

I am requesting this review within the required 10 business days.

REASONS FOR REQUESTING REVIEW:

1. The decision is based on incorrect or incomplete information because:
[Explain what information was wrong or missing]

2. New information is available that was not considered:
[Describe any new medical evidence, changed circumstances, etc.]

3. The decision misapplied ODSP policy because:
[Explain how the policy was incorrectly applied]

RELEVANT FACTS:

• My disability is: [DESCRIBE YOUR DISABILITY]
• I have been unable to work since: [DATE]
• My medical condition is documented by: [DOCTOR NAME, CLINIC]
• The impact on my daily life includes: [DESCRIBE LIMITATIONS]

LEGAL RIGHTS:

Under the Ontario Disability Support Program Act, 1997, I have the right to an internal review of any decision affecting my benefits. The ODSP rates of $1,308/month are already below the poverty line (Ontario Poverty Measure: $2,500+/month), making any denial or reduction a threat to my health and safety.

Section 7 of the Canadian Charter of Rights and Freedoms protects my right to life, liberty, and security of the person.

DOCUMENTS ATTACHED:
• [LIST ATTACHED DOCUMENTS - medical records, letters, etc.]

Please confirm receipt of this request within 5 business days.

Respectfully,

[YOUR SIGNATURE]
[YOUR NAME]
[PHONE NUMBER]

CC: Ontario Ombudsman
    ARCH Disability Law Centre
    Income Security Advocacy Centre`,
      tips: [
        'You have only 10 BUSINESS DAYS to request internal review',
        'If internal review fails, you can appeal to the Social Benefits Tribunal',
        'Contact ARCH Disability Law Centre for free legal help',
        'Get updated medical documentation supporting your disability',
        'Document how the denial affects your health and safety'
      ]
    },
    {
      id: 'human-rights-complaint',
      category: 'discrimination',
      title: 'Human Rights Tribunal Complaint (Disability)',
      description: 'File a disability discrimination complaint with HRTO',
      province: 'Ontario',
      template: `HUMAN RIGHTS TRIBUNAL OF ONTARIO
Application Under Section 34 of the Human Rights Code

APPLICANT INFORMATION:
Name: [YOUR NAME]
Address: [YOUR ADDRESS]
Phone: [YOUR PHONE]
Email: [YOUR EMAIL]

RESPONDENT (Who discriminated against you):
Name: [ORGANIZATION/EMPLOYER NAME]
Address: [THEIR ADDRESS]

PROTECTED GROUND: Disability

SOCIAL AREA: [Employment / Services / Housing - choose one]

DESCRIPTION OF DISCRIMINATION:

I. WHAT HAPPENED:

On or about [DATE], [DESCRIBE WHAT HAPPENED IN DETAIL].

[Provide a clear, chronological account of the discrimination]

II. HOW I WAS TREATED DIFFERENTLY:

I was treated differently because of my disability in the following ways:
• [SPECIFIC EXAMPLE 1]
• [SPECIFIC EXAMPLE 2]
• [SPECIFIC EXAMPLE 3]

III. FAILURE TO ACCOMMODATE:

The Respondent failed to accommodate my disability by:
• [DESCRIBE ACCOMMODATION REQUESTED]
• [DESCRIBE HOW THEY REFUSED OR FAILED]

I requested accommodation on [DATE] by [HOW YOU REQUESTED].

The Respondent's response was: [DESCRIBE RESPONSE]

IV. IMPACT ON ME:

This discrimination has caused me:
• Financial harm: [DESCRIBE - lost wages, benefits, etc.]
• Physical/health harm: [DESCRIBE - worsening condition, stress, etc.]
• Emotional harm: [DESCRIBE - dignity, self-worth, etc.]

V. REMEDY REQUESTED:

I am seeking:
1. Monetary compensation of $[AMOUNT] for injury to dignity
2. Lost wages/income of $[AMOUNT]
3. Reinstatement / service provision / [OTHER SPECIFIC REMEDY]
4. Policy changes to prevent future discrimination
5. Training for Respondent's staff

VI. LEGAL BASIS:

Sections 1, 5, and 9 of the Ontario Human Rights Code prohibit discrimination based on disability in [employment/services/housing].

The duty to accommodate is a legal requirement under the Code, up to the point of undue hardship.

DOCUMENTS ATTACHED:
• [LIST ALL SUPPORTING DOCUMENTS]

I affirm that the information in this application is true.

Date: [DATE]
Signature: [YOUR SIGNATURE]`,
      tips: [
        'You have 1 YEAR from the date of discrimination to file',
        'HRTO is free to use - no lawyers required',
        'The Human Rights Legal Support Centre offers free help',
        'Keep ALL documentation: emails, letters, medical records',
        'Describe the emotional impact - injury to dignity is compensable'
      ]
    },
    {
      id: 'foi-request',
      category: 'foi',
      title: 'Freedom of Information Request',
      description: 'Request your personal file or government records',
      province: 'Ontario',
      template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, PROVINCE, POSTAL CODE]
[DATE]

Freedom of Information and Privacy Coordinator
[MINISTRY/ORGANIZATION NAME]
[ADDRESS]

RE: Request for Access to Records Under the Freedom of Information and Protection of Privacy Act

Dear Coordinator,

Pursuant to the Freedom of Information and Protection of Privacy Act (FIPPA), I am requesting access to the following records:

RECORDS REQUESTED:

1. All records, documents, emails, notes, and correspondence relating to:
   [DESCRIBE SPECIFICALLY WHAT YOU WANT]

2. My complete personal file including:
   • All case notes and internal memos
   • All correspondence about my file
   • All decisions and reasons for decisions
   • All medical assessments and reports
   • Any surveillance records or investigation reports

3. Time period: [START DATE] to [END DATE]

PERSONAL INFORMATION:
Name: [YOUR NAME]
Date of Birth: [YOUR DOB]
File/Case Number (if known): [YOUR CASE NUMBER]

I am requesting access to my own personal information under Section 47 of FIPPA.

Please note that under FIPPA:
• You must respond within 30 days
• The $5.00 application fee is attached
• Personal information requests cannot be denied based on volume

If any records are withheld, please provide a detailed explanation citing the specific exemption under FIPPA.

I prefer to receive records in: [ELECTRONIC / PAPER] format.

Please contact me if you have any questions.

Sincerely,

[YOUR SIGNATURE]
[YOUR NAME]
[PHONE NUMBER]
[EMAIL]`,
      tips: [
        'Include the $5.00 fee (cheque payable to Minister of Finance)',
        'Be as specific as possible about what records you want',
        'They MUST respond within 30 days (extensions possible)',
        'If denied, you can appeal to the Information and Privacy Commissioner',
        'Ask for surveillance files - WSIB and welfare often conduct surveillance'
      ]
    },
    {
      id: 'mp-letter',
      category: 'advocacy',
      title: 'Letter to MP/MPP Demanding Action',
      description: 'Template to demand action from your elected representative',
      province: 'Federal/Ontario',
      template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, PROVINCE, POSTAL CODE]
[DATE]

[MP/MPP NAME]
[CONSTITUENCY OFFICE ADDRESS]

RE: Urgent Action Required on [ISSUE]

Dear [MP/MPP NAME],

As your constituent in [RIDING NAME], I am writing to demand immediate action on [ISSUE].

THE PROBLEM:

[DESCRIBE THE ISSUE AND HOW IT AFFECTS YOU/YOUR COMMUNITY]

I am one of [NUMBER] Canadians affected by this issue. [DESCRIBE PERSONAL IMPACT]

WHAT I NEED YOU TO DO:

1. Raise this issue in [Parliament/the Legislature]
2. [SPECIFIC ACTION REQUESTED]
3. Meet with affected constituents, including myself
4. Advocate for [SPECIFIC POLICY CHANGE]

THE FACTS:

• [STATISTIC 1 - e.g., "67% of WSIB mental health claims are denied"]
• [STATISTIC 2]
• [STATISTIC 3]

This violates our rights under:
• Section [NUMBER] of the Canadian Charter of Rights and Freedoms
• [OTHER RELEVANT LEGISLATION]

WHAT THE GOVERNMENT SHOULD DO:

[DESCRIBE THE SOLUTION YOU WANT]

I expect a written response within 14 days outlining what actions you will take.

I am available to meet at your constituency office to discuss this further. I can be reached at [PHONE] or [EMAIL].

Respectfully,

[YOUR SIGNATURE]
[YOUR NAME]

CC: [OTHER RELEVANT OFFICIALS]
    [ADVOCACY ORGANIZATIONS]
    [LOCAL MEDIA - optional]`,
      tips: [
        'Find your MP at ourcommons.ca, MPP at ola.org',
        'Constituency office meetings are more effective than Ottawa/Queen\'s Park',
        'CC advocacy organizations and media to increase pressure',
        'Follow up with a phone call if no response in 14 days',
        'Share your letter on social media and tag your MP/MPP'
      ]
    },
    {
      id: 'ombudsman-complaint',
      category: 'oversight',
      title: 'Ontario Ombudsman Complaint',
      description: 'File a complaint about provincial government agencies',
      province: 'Ontario',
      template: `Ontario Ombudsman
483 Bay Street, 10th Floor, South Tower
Toronto, ON M5G 2C9
Toll-free: 1-800-263-1830
Online: ombudsman.on.ca

COMPLAINT FORM

YOUR INFORMATION:
Name: [YOUR NAME]
Address: [YOUR ADDRESS]
Phone: [YOUR PHONE]
Email: [YOUR EMAIL]

ORGANIZATION YOU ARE COMPLAINING ABOUT:
Name: [e.g., WSIB, ODSP, Ontario Works, Social Benefits Tribunal, etc.]
Your File/Case Number: [YOUR CASE NUMBER]

WHAT HAPPENED:

[Provide a clear, chronological description of what happened]

• On [DATE], I [WHAT YOU DID - filed claim, applied, etc.]
• On [DATE], [WHAT THEY DID - denied, delayed, etc.]
• I have tried to resolve this by [STEPS YOU TOOK]
• The result was [OUTCOME]

WHY THIS IS UNFAIR:

[Explain why you believe the organization acted unfairly, unreasonably, or contrary to law]

• The decision was wrong because: [EXPLAIN]
• The process was unfair because: [EXPLAIN]
• This violates my rights because: [EXPLAIN]

WHAT RESOLUTION DO YOU WANT:

[Be specific about what you want the Ombudsman to help achieve]

1. [SPECIFIC REMEDY 1]
2. [SPECIFIC REMEDY 2]
3. [SPECIFIC REMEDY 3]

SUPPORTING DOCUMENTS:

I have attached the following:
• [LIST ALL ATTACHED DOCUMENTS]

Have you exhausted internal appeals? [YES/NO]
If no, explain why: [EXPLAIN]

Date: [DATE]
Signature: [YOUR SIGNATURE]`,
      tips: [
        'The Ombudsman is FREE and independent of government',
        'You must usually exhaust internal appeals first (exceptions exist)',
        'The Ombudsman can investigate WSIB, ODSP, and most provincial agencies',
        'They can\'t overturn decisions but can recommend changes and pressure agencies',
        'Include EVERYTHING - all letters, decisions, medical records'
      ]
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors = {
    workers_comp: '#ff6b6b',
    disability: '#a78bfa',
    discrimination: '#ffd93d',
    foi: '#00ffff',
    advocacy: '#22c55e',
    oversight: '#f59e0b'
  };

  return (
    <>
      <Head>
        <title>👁️ Template Letters & Appeals | THE EYE ORACLE</title>
        <meta name="description" content="Free template letters to fight WSIB, ODSP, and other government agencies. Pre-written appeals, human rights complaints, and FOI requests." />
      </Head>

      <Header />
      <SystemNavigation current="/template-letters" />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        padding: '2rem 1rem 4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>📝</div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              Template Letters & Appeals
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Fight back with pre-written templates designed by advocates. 
              Every letter invokes your legal rights.
            </p>
          </div>

          {/* Template Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {templates.map(template => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${categoryColors[template.category]}40`,
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    borderColor: categoryColors[template.category]
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = categoryColors[template.category];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${categoryColors[template.category]}40`;
                }}
              >
                <div style={{
                  display: 'inline-block',
                  background: `${categoryColors[template.category]}20`,
                  color: categoryColors[template.category],
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}>
                  {template.province}
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem'
                }}>
                  {template.title}
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {template.description}
                </p>
              </div>
            ))}
          </div>

          {/* Selected Template Modal */}
          {selectedTemplate && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              zIndex: 1000,
              overflow: 'auto',
              padding: '2rem'
            }}>
              <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                background: '#0f0f23',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {/* Modal Header */}
                <div style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h2 style={{ color: 'white', marginBottom: '0.25rem' }}>
                      {selectedTemplate.title}
                    </h2>
                    <span style={{
                      color: categoryColors[selectedTemplate.category],
                      fontSize: '0.9rem'
                    }}>
                      {selectedTemplate.province}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontSize: '2rem',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Tips */}
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(34, 197, 94, 0.1)',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>💡 Important Tips:</h4>
                  <ul style={{
                    color: 'rgba(255,255,255,0.8)',
                    paddingLeft: '1.5rem',
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {selectedTemplate.tips.map((tip, i) => (
                      <li key={i} style={{ marginBottom: '0.25rem' }}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Template Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    whiteSpace: 'pre-wrap',
                    color: 'rgba(255,255,255,0.9)',
                    maxHeight: '500px',
                    overflow: 'auto'
                  }}>
                    {selectedTemplate.template}
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  padding: '1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => copyToClipboard(selectedTemplate.template)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: copied 
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                        : 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
                      color: copied ? '#fff' : '#000',
                      border: 'none',
                      borderRadius: '2rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '2rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Legal Resources */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            marginTop: '2rem'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>🆓 Free Legal Help</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              <a href="https://www.archdisabilitylaw.ca/" target="_blank" rel="noopener noreferrer" style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                padding: '1rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '0.5rem'
              }}>
                <strong style={{ color: '#ffd93d' }}>ARCH Disability Law Centre</strong>
                <br />Free legal help for people with disabilities
              </a>
              <a href="https://www.owa.gov.on.ca/" target="_blank" rel="noopener noreferrer" style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                padding: '1rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '0.5rem'
              }}>
                <strong style={{ color: '#ff6b6b' }}>Office of the Worker Adviser</strong>
                <br />Free WSIB appeal help for injured workers
              </a>
              <a href="https://www.hrlsc.on.ca/" target="_blank" rel="noopener noreferrer" style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                padding: '1rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '0.5rem'
              }}>
                <strong style={{ color: '#a78bfa' }}>Human Rights Legal Support Centre</strong>
                <br />Free human rights complaint help
              </a>
              <a href="https://incomesecurity.org/" target="_blank" rel="noopener noreferrer" style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                padding: '1rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '0.5rem'
              }}>
                <strong style={{ color: '#22c55e' }}>Income Security Advocacy Centre</strong>
                <br />Free ODSP/OW appeal help
              </a>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
