import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EyeDemo() {
  const [input, setInput] = useState('');
  const [sourceType, setSourceType] = useState('news');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('input');

  const sampleInputs = {
    news: `TORONTO - A Toronto Star investigation has revealed that the Workplace Safety and Insurance Board (WSIB) has increased denials of mental health claims by 31% since 2020, according to the organization's own annual reports.

The investigation found that workers suffering from post-traumatic stress disorder and depression are now 42% more likely to have their claims rejected compared to physical injury claims. Internal documents obtained through Freedom of Information requests show that adjudicators received new "guidelines" in 2021 that emphasize cost reduction.

Sarah Mitchell, who worked as a paramedic for 15 years before developing PTSD, had her claim denied three times. "They told me my condition wasn't severe enough, even though my psychiatrist said I can't work," she said. Mitchell's appeal to the Workplace Safety and Insurance Appeals Tribunal (WSIAT) was eventually successful, with the tribunal ruling that WSIB's initial decision "ignored substantial medical evidence."

Statistics from WSIAT show that 42% of mental health claim denials are overturned on appeal, suggesting systematic problems with initial adjudication. The WSIB has a $4.2 billion surplus and recently paid executive bonuses totaling $2.1 million.

WSIB spokesperson declined to comment on specific cases but stated that "all claims are reviewed fairly and consistently according to policy."

Dr. James Chen, a psychiatrist who has treated over 200 injured workers, said "The pattern is clear - WSIB systematically denies legitimate mental health claims, forcing workers into lengthy appeal processes that often worsen their conditions."`,

    foi: `FREEDOM OF INFORMATION RESPONSE
Request #FOI-2024-0847
Date: November 15, 2024
Ministry: Ministry of Labour, Immigration, Training and Skills Development

RE: WSIB Executive Compensation 2022-2024

Documents Released:

1. Executive Compensation Summary 2023
   - CEO Total Compensation: $847,500 (Base: $575,000, Performance Bonus: $272,500)
   - VP Operations Total: $523,000
   - VP Claims: $498,000
   
2. Performance Metrics for Executive Bonuses
   - Metric 1: Claims Cost Reduction (40% weight)
   - Metric 2: Reserve Fund Growth (30% weight)
   - Metric 3: Customer Satisfaction (20% weight)
   - Metric 4: Digital Transformation (10% weight)

3. Email: Chief Financial Officer to Board (Sept 12, 2023)
   "Our actuarial projections show we can reduce claim reserves by $850M over 24 months if we maintain current denial trends in mental health and chronic pain categories. This would significantly improve our balance sheet and trigger executive performance bonuses."

4. Training Materials Update (Jan 2024)
   New adjudicator training emphasizes "thorough documentation of non-compensable factors" in mental health claims. Supervisors instructed to flag claims with "excessive psychiatrist reports" for additional review.

Documents Severed: 23 pages withheld under solicitor-client privilege.`,

    report: `ONTARIO AUDITOR GENERAL - SPECIAL REPORT 2024
Systemic Review: Ontario Disability Support Program Administration

EXECUTIVE SUMMARY

Our review found significant deficiencies in ODSP administration affecting 380,000 vulnerable Ontarians.

KEY FINDINGS:

1. RATES BELOW POVERTY LINE
   - Current ODSP rate: $1,368/month for single adults
   - Statistics Canada Market Basket Measure poverty line: $2,284/month
   - Gap: $916/month (40% below poverty)
   - No increase in 2024 budget despite 3.9% inflation
   - Real income loss: $636/year per recipient

2. PROCESSING DELAYS
   - Average application processing: 147 days (policy standard: 90 days)
   - 23% of applications exceed 200 days
   - Medical documentation repeatedly requested despite submission
   - Electronic system flags certain diagnoses for "enhanced review"

3. DISABILITY ADJUDICATION CONCERNS
   - Mental health/chronic pain applications denied at 2.3x rate of physical disabilities
   - 34% of denials overturned on internal review
   - Adjudicators receive 15 minutes average per application review
   - No specialized training in complex conditions

4. FINANCIAL IMPACT
   - Recipients forced to food banks (78% increase since 2020)
   - Eviction rates among ODSP recipients: 4x general population
   - Emergency department usage 2.5x higher
   - Estimated healthcare cost increase: $340M annually due to inadequate support

RECOMMENDATIONS:

1. Increase ODSP rates to at minimum the poverty line
2. Improve processing times through additional staff
3. Provide specialized training for mental health adjudication
4. Independent review of denial patterns
5. Automatic inflation indexing

MINISTRY RESPONSE:

The Ministry acknowledges the findings but cites "fiscal constraints" and states rate increases are "subject to budget priorities." (See Appendix C for full response)

Our office will follow up in 12 months to assess implementation of recommendations.`,

    social: `Reddit r/legaladvicecanada - Posted 3 hours ago by u/throwaway_wsib_2024

Title: WSIB denied my PTSD claim - therapist says I can't work

I'm a former construction worker in Ontario who developed PTSD after a workplace fatality I witnessed. My therapist and psychiatrist both say I have severe PTSD and can't work around construction sites or loud noises.

WSIB denied my claim saying "insufficient objective medical evidence." But I've submitted:
- 2 psychiatrist reports
- 6 months of therapy notes
- Letter from family doctor
- Evidence I haven't worked in 9 months

They keep saying my PTSD "isn't severe enough" even though I can't sleep, have panic attacks, and can't be around my former workplace.

I filed an appeal but it's been 4 months with no response. I've burned through my savings and might lose my apartment next month. My wife had to take a second job.

Anyone else dealt with this? What can I do?

EDIT: Holy shit, thank you all. 47 comments and most say they had the same experience. Multiple people said their mental health claims were denied but won on appeal. This is clearly a pattern.

Top comment (gold x2, 127 upvotes):
"WSIB systematically denies mental health claims on first application. I'm a paralegal who handles WSIB appeals. In my experience, about 60% of mental health denials are overturned at WSIAT. They deny first, knowing most people won't appeal. It's a deliberate strategy. Get a lawyer or paralegal ASAP. Don't give up."`
  };

  const handleProcess = async () => {
    setProcessing(true);
    setActiveTab('processing');
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In production: import and use the-eye-processor.js
    // For demo: create realistic mock output
    const mockResult = generateMockResult(input, sourceType);
    
    setResult(mockResult);
    setProcessing(false);
    setActiveTab('output');
  };

  const loadSample = (type) => {
    setSourceType(type);
    setInput(sampleInputs[type]);
  };

  function generateMockResult(text, type) {
    const now = new Date().toISOString();
    
    return {
      id: `eye_${Date.now()}_demo`,
      title: type === 'news' ? 'WSIB Mental Health Claim Denials Investigation' :
             type === 'foi' ? 'WSIB Executive Compensation FOI Response' :
             type === 'report' ? 'Auditor General ODSP Review' :
             'Reddit: WSIB PTSD Claim Denial',
      date: now.split('T')[0],
      publication_date: now.split('T')[0],
      jurisdiction: { location: 'Ontario', level: 'province' },
      source_type: type,
      
      metadata: {
        author: type === 'news' ? 'Toronto Star Investigation Team' :
                type === 'report' ? 'Ontario Auditor General' : 'Unknown',
        word_count: text.split(/\s+/).length,
        language: 'en'
      },
      
      entities: {
        people: [
          { full_name: 'Sarah Mitchell', role: 'paramedic', context: 'injured worker with PTSD' },
          { full_name: 'James Chen', role: 'psychiatrist', context: 'expert witness' }
        ],
        organizations: [
          { name: 'WSIB', type: 'workers_comp', context: 'Workplace Safety Insurance Board' },
          { name: 'WSIAT', type: 'tribunal', context: 'Appeals Tribunal' }
        ],
        money: [
          { amount: '4.2', scale: 'billion', context: 'WSIB surplus' },
          { amount: '2.1', scale: 'million', context: 'executive bonuses' }
        ],
        dates: [
          { date: '2020', context: 'baseline year for comparison' },
          { date: '2021', context: 'new guidelines implemented' }
        ]
      },
      
      relationships: [
        {
          type: 'employment',
          from: 'Sarah Mitchell',
          to: 'Paramedic Services',
          confidence: 'high',
          evidence: 'worked as a paramedic for 15 years'
        }
      ],
      
      claims: [
        {
          claim_text: 'WSIB has increased denials of mental health claims by 31% since 2020',
          claim_type: 'denial',
          alleged_actor: 'WSIB',
          alleged_victim: 'injured workers',
          date_of_event: '2020-2024',
          supporting_evidence: {
            quote: 'mental health claims by 31% since 2020, according to the organization\'s own annual reports',
            source_snippet: 'WSIB own annual reports confirm denial increase'
          },
          evidence_strength: 'High'
        },
        {
          claim_text: '42% of mental health claim denials are overturned on appeal',
          claim_type: 'pattern',
          alleged_actor: 'WSIB',
          alleged_victim: 'claimants',
          date_of_event: null,
          supporting_evidence: {
            quote: 'Statistics from WSIAT show that 42% of mental health claim denials are overturned',
            source_snippet: 'WSIAT public data shows systematic overturn pattern'
          },
          evidence_strength: 'High'
        },
        {
          claim_text: 'Internal guidelines emphasize cost reduction over fair adjudication',
          claim_type: 'policy_failure',
          alleged_actor: 'WSIB',
          alleged_victim: 'workers',
          date_of_event: '2021',
          supporting_evidence: {
            quote: 'new "guidelines" in 2021 that emphasize cost reduction',
            source_snippet: 'FOI documents show policy changes'
          },
          evidence_strength: 'High'
        }
      ],
      
      corroboration: [
        {
          claim: 'WSIB has increased denials of mental health claims by 31% since 2020',
          claim_type: 'denial',
          corroborating_sources: [
            {
              source: 'WSIB Annual Reports',
              url: 'https://www.wsib.ca/en/annualreport',
              snippet: 'Annual report data shows mental health claim approval rates declined from 77% (2020) to 53% (2024)',
              confidence: 'high',
              last_checked: now
            },
            {
              source: 'WSIAT Appeals Database',
              url: 'https://www.tribunalsontario.ca/wsiat/',
              snippet: 'WSIAT decision database shows 847 mental health appeals in 2023-2024, with 42% overturn rate',
              confidence: 'high',
              last_checked: now
            }
          ],
          corroboration_level: 'strong',
          needs_further_investigation: false
        },
        {
          claim: 'Executive bonuses tied to claims cost reduction',
          claim_type: 'fraud',
          corroborating_sources: [
            {
              source: 'FOI Response #FOI-2024-0847',
              url: 'https://www.ontario.ca/foi',
              snippet: 'Performance metrics show 40% weight on "Claims Cost Reduction" for executive bonuses',
              confidence: 'high',
              last_checked: now
            }
          ],
          corroboration_level: 'moderate',
          needs_further_investigation: false
        }
      ],
      
      risk_score: 85,
      risk_explanation: '3 critical allegations; Significant financial amounts involved; 2 strongly corroborated claims; Indicates systematic pattern; Public safety implications',
      priority: 'CRITICAL',
      
      suggested_actions: [
        {
          action_type: 'foi_request',
          description: 'File Freedom of Information request for complete documentation',
          template: {
            subject: 'Freedom of Information Request - WSIB',
            request_body: `I am requesting the following records under Freedom of Information Act:

1. All documents related to: mental health claim denial policies 2020-2024; executive compensation metrics; adjudicator training materials 2021-2024

2. Time period: January 1, 2020 to Present

3. Format: Searchable PDF or CSV

4. Fee waiver requested on grounds of public interest.`,
            estimated_cost: '$0-$25',
            response_deadline: '30 days from submission'
          },
          target: 'WSIB Freedom of Information Office',
          priority: 'immediate'
        },
        {
          action_type: 'notify_oversight',
          description: 'Submit to Ombudsman/Auditor General',
          parties_to_notify: [
            {
              name: 'Ontario Ombudsman',
              url: 'https://www.ombudsman.on.ca/',
              complaint_type: 'Systemic investigation request'
            },
            {
              name: 'Provincial Auditor General',
              url: 'https://www.auditor.on.ca/',
              complaint_type: 'Value-for-money audit request'
            }
          ],
          priority: 'immediate'
        },
        {
          action_type: 'media_alert',
          description: 'Prepare media package for investigative journalists',
          recommended_outlets: ['CBC Marketplace', 'CTV W5', 'Globe & Mail'],
          public_release_language: 'BREAKING: Investigation reveals WSIB systematically denies mental health claims to reduce costs. 31% denial increase since 2020. Executive bonuses tied to claim reductions. 42% of denials overturned on appeal.',
          priority: 'high'
        },
        {
          action_type: 'evidence_checklist',
          description: 'Gather additional supporting documentation',
          checklist: [
            {
              item: 'Obtain primary source documents for weak claims',
              count: 0,
              priority: 'high'
            },
            {
              item: 'Obtain financial records, executive compensation details',
              priority: 'high'
            },
            {
              item: 'Collect witness testimonials from denied claimants',
              priority: 'medium'
            },
            {
              item: 'Seek legal review for potential class action',
              priority: 'high'
            }
          ]
        }
      ],
      
      provenance: [
        {
          source: 'Original Document',
          url: 'input',
          snippet: text.substring(0, 200) + '...',
          fetch_date: now,
          verification_method: 'Direct ingestion'
        },
        {
          source: 'WSIB Annual Reports',
          url: 'https://www.wsib.ca/en/annualreport',
          snippet: 'Corroborating statistics on denial rates',
          last_checked: now,
          verification_method: 'Official government database'
        },
        {
          source: 'WSIAT Decision Database',
          url: 'https://www.tribunalsontario.ca/wsiat/',
          snippet: 'Appeals overturn data confirms systematic pattern',
          last_checked: now,
          verification_method: 'Legal tribunal records'
        }
      ],
      
      privacy_check: {
        contains_personal_data: true,
        requires_redaction: false,
        redaction_notes: ['Names used with consent in public article']
      },
      
      legal_check: {
        potentially_privileged: false,
        requires_lawyer_review: true,
        lawyer_review_reason: 'High-risk allegations require legal review before publication'
      },
      
      explainability: {
        strongest_evidence: [
          {
            claim: 'WSIB has increased denials of mental health claims by 31% since 2020',
            sources: [
              {
                name: 'WSIB Annual Reports',
                url: 'https://www.wsib.ca/en/annualreport',
                quote: 'Annual data shows mental health approval decline from 77% to 53%'
              },
              {
                name: 'WSIAT Appeals Database',
                url: 'https://www.tribunalsontario.ca/wsiat/',
                quote: '847 appeals, 42% overturn rate confirms systematic issues'
              }
            ]
          }
        ],
        last_checked: now,
        methodology: 'Evidence-first investigative analysis with multi-source corroboration'
      },
      
      processing_time_ms: 2347,
      processed_at: now,
      version: '1.0.0'
    };
  }

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
        color: '#e0e0e0',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/the-eye" style={{
            display: 'inline-block',
            color: '#4facfe',
            textDecoration: 'none',
            marginBottom: '1rem'
          }}>
            ← Back to The Eye
          </Link>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👁️</div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '900',
              background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              THE EYE - LIVE DEMO
            </h1>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>
              Evidence-First Investigative AI • Process Any Document → JSON Intelligence Report
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid #333'
          }}>
            {['input', 'processing', 'output'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                disabled={tab === 'processing' && !processing}
                style={{
                  padding: '1rem 2rem',
                  background: activeTab === tab ? '#4facfe' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid #4facfe' : '3px solid transparent',
                  color: activeTab === tab ? 'white' : '#888',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: tab === 'processing' && !processing ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}
              >
                {tab === 'input' ? '📄 Input' : tab === 'processing' ? '⚙️ Processing' : '📊 Output'}
              </button>
            ))}
          </div>

          {/* INPUT TAB */}
          {activeTab === 'input' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {Object.keys(sampleInputs).map(type => (
                  <button
                    key={type}
                    onClick={() => loadSample(type)}
                    style={{
                      padding: '1rem',
                      background: sourceType === type ? 'rgba(79, 172, 254, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: `2px solid ${sourceType === type ? '#4facfe' : '#444'}`,
                      borderRadius: '10px',
                      color: sourceType === type ? '#4facfe' : '#ccc',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type === 'foi' ? 'FOI Response' : type}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4facfe', fontWeight: 'bold' }}>
                  Source Type:
                </label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  style={{
                    padding: '0.75rem',
                    background: '#1a1a3e',
                    border: '2px solid #4facfe',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    width: '100%',
                    maxWidth: '300px'
                  }}
                >
                  <option value="news">News Article</option>
                  <option value="FOI">FOI Response</option>
                  <option value="report">Government Report</option>
                  <option value="social">Social Media Post</option>
                  <option value="official">Official Document</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4facfe', fontWeight: 'bold' }}>
                  Paste Document Text or URL:
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste a news article, FOI response, report, social media post, or any document you want The Eye to analyze..."
                  style={{
                    width: '100%',
                    minHeight: '400px',
                    padding: '1rem',
                    background: '#1a1a3e',
                    border: '2px solid #4facfe',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontFamily: 'monospace',
                    lineHeight: '1.6',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                onClick={handleProcess}
                disabled={!input.trim()}
                style={{
                  padding: '1.25rem 3rem',
                  background: input.trim() ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : '#666',
                  border: 'none',
                  borderRadius: '50px',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  boxShadow: input.trim() ? '0 4px 20px rgba(79, 172, 254, 0.4)' : 'none'
                }}
              >
                🔍 PROCESS WITH THE EYE
              </button>
            </div>
          )}

          {/* PROCESSING TAB */}
          {activeTab === 'processing' && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{
                fontSize: '5rem',
                marginBottom: '2rem',
                animation: 'pulse 2s infinite'
              }}>
                👁️
              </div>
              <h2 style={{ color: '#4facfe', fontSize: '2rem', marginBottom: '1rem' }}>
                THE EYE IS ANALYZING...
              </h2>
              <div style={{ color: '#888', fontSize: '1.1rem', lineHeight: '2' }}>
                <div>✓ Extracting metadata...</div>
                <div>✓ Identifying entities & relationships...</div>
                <div>✓ Extracting claims & allegations...</div>
                <div>✓ Cross-referencing with authoritative sources...</div>
                <div>✓ Scoring credibility & risk...</div>
                <div>✓ Generating actionable intelligence...</div>
              </div>
            </div>
          )}

          {/* OUTPUT TAB */}
          {activeTab === 'output' && result && (
            <div>
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'rgba(79, 172, 254, 0.1)',
                border: '2px solid #4facfe',
                borderRadius: '15px'
              }}>
                <h2 style={{ color: '#4facfe', fontSize: '1.8rem', marginBottom: '1rem' }}>
                  📊 INVESTIGATION REPORT
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <strong style={{ color: '#888' }}>Risk Score:</strong>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: result.risk_score >= 70 ? '#ff4444' : result.risk_score >= 50 ? '#ff8844' : '#44ff88'
                    }}>
                      {result.risk_score}/100
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: '#888' }}>Priority:</strong>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: result.priority === 'CRITICAL' ? '#ff4444' : '#ff8844'
                    }}>
                      {result.priority}
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: '#888' }}>Claims Found:</strong>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4facfe' }}>
                      {result.claims.length}
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: '#888' }}>Processing Time:</strong>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#44ff88' }}>
                      {result.processing_time_ms}ms
                    </div>
                  </div>
                </div>
              </div>

              {/* JSON Output */}
              <div style={{
                background: '#0a0a1a',
                border: '2px solid #4facfe',
                borderRadius: '10px',
                padding: '1.5rem',
                maxHeight: '600px',
                overflowY: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#4facfe', margin: 0 }}>JSON Output (Copy & Use)</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                      alert('✅ Copied to clipboard!');
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#4facfe',
                      border: 'none',
                      borderRadius: '5px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}
                  >
                    📋 Copy JSON
                  </button>
                </div>
                <pre style={{
                  background: '#000',
                  padding: '1rem',
                  borderRadius: '5px',
                  color: '#00ff00',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>

              {/* Key Findings Highlight */}
              <div style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'rgba(255, 68, 68, 0.1)',
                border: '2px solid #ff4444',
                borderRadius: '15px'
              }}>
                <h3 style={{ color: '#ff4444', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  🚨 KEY FINDINGS
                </h3>
                {result.claims.slice(0, 3).map((claim, idx) => (
                  <div key={idx} style={{
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    borderLeft: '4px solid #ff4444'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: '#ff4444',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        marginRight: '0.5rem'
                      }}>
                        {claim.claim_type.toUpperCase()}
                      </span>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: claim.evidence_strength === 'High' ? '#44ff88' : '#ffcc44',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: '#000'
                      }}>
                        {claim.evidence_strength} Evidence
                      </span>
                    </div>
                    <p style={{ color: '#ccc', margin: '0.5rem 0', fontSize: '0.95rem' }}>
                      {claim.claim_text}
                    </p>
                    <p style={{ color: '#888', margin: '0.5rem 0', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      Actor: {claim.alleged_actor} • Victim: {claim.alleged_victim}
                    </p>
                  </div>
                ))}
              </div>

              {/* Suggested Actions */}
              <div style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'rgba(46, 213, 115, 0.1)',
                border: '2px solid #2ed573',
                borderRadius: '15px'
              }}>
                <h3 style={{ color: '#2ed573', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  ⚡ SUGGESTED ACTIONS
                </h3>
                {result.suggested_actions.map((action, idx) => (
                  <div key={idx} style={{
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    marginBottom: '1rem',
                    borderLeft: '4px solid #2ed573'
                  }}>
                    <h4 style={{ color: '#2ed573', margin: '0 0 0.5rem 0' }}>
                      {action.action_type.replace(/_/g, ' ').toUpperCase()}
                    </h4>
                    <p style={{ color: '#ccc', margin: '0.5rem 0' }}>{action.description}</p>
                    {action.priority && (
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: action.priority === 'immediate' ? '#ff4444' : '#ff8844',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        marginTop: '0.5rem'
                      }}>
                        Priority: {action.priority}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
