import { processDocument } from '../utils/the-eye-v2-processor.js';
import { useState } from 'react';

export default function TheEyeV2Demo() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSample, setSelectedSample] = useState('wsib_corruption');

  const sampleDocuments = {
    wsib_corruption: {
      title: 'WSIB Corruption Investigation',
      raw_text: `WSIB Slashed Benefits While Sitting on $4.2 Billion Surplus

By Sarah Mitchell, Investigative Reporter
Published: November 20, 2024

The Workplace Safety and Insurance Board (WSIB) has denied 31% more injury claims since 2020 while accumulating a massive $4.2 billion surplus, according to the organization's own annual reports.

Sarah Mitchell, a paramedic who developed PTSD after 15 years on the job, had her benefits terminated in 2023 despite ongoing medical evidence from three independent psychiatrists confirming her disability.

"They cut me off without warning," Mitchell said. "I went from receiving support to being told I'm fine, even though I can't work and my doctors say I'm severely disabled."

Internal WSIB documents obtained through Freedom of Information reveal a secret policy directive from 2020 instructing adjudicators to "prioritize cost containment" and "apply stricter interpretation of eligibility criteria."

Dr. James Chen, a workers' compensation expert at York University, called the practice "systemic discrimination against injured workers, particularly those with mental health disabilities."

The policy appears to violate Section 7 of the Canadian Charter (security of person), Section 15 (equality rights), and Article 28 of the UN Convention on the Rights of Persons with Disabilities (adequate standard of living).

At least 12,000 injured workers have had benefits denied or terminated since the directive was implemented, forcing many into poverty and homelessness.

WSIB CEO Thomas Bradford, who earns $450,000 annually, defended the denials: "We must balance our fiscal responsibility with our mandate to support injured workers."

Bradford previously worked as VP of Claims at a major insurance company and has close ties to lobbying groups representing employers.

The Ontario Ombudsman has received over 800 complaints about WSIB denials in the past two years but has not launched a systemic investigation.

Injured workers' advocates are calling for a public inquiry, criminal investigation into the policy directive, and a Charter challenge.`,
      source_type: 'news',
      source_url: 'https://example.com/wsib-investigation',
      fetch_date: '2024-11-20T10:00:00Z'
    },

    indigenous_rights: {
      title: 'Indigenous Land Rights Violation',
      raw_text: `Federal Government Approves Pipeline Without Consultation

Six Nations of the Grand River leaders condemn federal approval of natural gas pipeline through unceded territory without proper consultation as required under Section 35 of the Constitution Act.

Chief Mary Longboat: "This is a blatant violation of our treaty rights and the duty to consult. They didn't even notify us before approving the project."

The $2.3 billion pipeline project was awarded to TransCanada Corp in a sole-source contract without competitive bidding. 

Environmental assessments were fast-tracked, and concerns about sacred burial grounds were ignored.

Court documents show the Minister of Natural Resources has financial ties to pipeline investors through a family trust.

The project will cross 15 kilometers of Six Nations traditional territory and threaten water supplies for 12,000 Indigenous residents.

UN Special Rapporteur on Indigenous Rights condemned the approval as violating the UN Declaration on the Rights of Indigenous Peoples (UNDRIP), which Canada adopted in 2016.`,
      source_type: 'report',
      source_url: 'https://example.com/indigenous-pipeline',
      fetch_date: '2024-11-21T09:00:00Z'
    },

    disability_discrimination: {
      title: 'ODSP Forces Disabled into Poverty',
      raw_text: `Ontario Disability Support Program Keeps 500,000 People Below Poverty Line

The Ontario Disability Support Program (ODSP) provides $1,308 per month to people with severe disabilities while average rent in Ontario is $2,200.

This systematic impoverishment violates Article 28 of the UNCRPD (adequate standard of living), Section 7 of the Charter (security of person), and the Canadian Human Rights Act.

Maria Gonzalez, who uses a wheelchair due to cerebral palsy, lives on $1,308 monthly ODSP while paying $1,400 rent. "I have to choose between medication and food every month. The government is forcing disabled people into homelessness."

Internal Ministry of Children, Community and Social Services emails obtained via FOI show officials were warned that ODSP rates cause "cruel and unusual treatment" prohibited by Section 12 of the Charter, but Minister Jane Stevens ordered rates frozen anyway.

Stevens accepted $45,000 in donations from landlord associations and real estate developers in the past two years.

Between 2018-2024, ODSP denial rates increased 41% while the program accumulated $380 million in unspent funds.

Dr. Ahmed Hassan, disability rights lawyer: "This is deliberate discrimination. They're denying assistance to force people with disabilities to accept any job, even if it harms their health."

Class action lawsuit filed by Disability Rights Alliance seeks $2 billion in damages and judicial review of ODSP policies as unconstitutional.`,
      source_type: 'news',
      source_url: 'https://example.com/odsp-poverty',
      fetch_date: '2024-11-21T14:30:00Z'
    }
  };

  const processSample = async () => {
    setProcessing(true);
    setResult(null);

    try {
      const sample = sampleDocuments[selectedSample];
      const report = await processDocument({
        raw_text: sample.raw_text,
        source_type: sample.source_type,
        source_url: sample.source_url,
        fetch_date: sample.fetch_date,
        raw_metadata: {
          title: sample.title
        }
      });

      setResult(report);
    } catch (error) {
      console.error('Processing error:', error);
      alert('Error processing document: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    alert('Report copied to clipboard!');
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `the-eye-report-${result.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #000 0%, #1a0033 100%)',
      color: '#fff',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            margin: '0 0 20px',
            background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900'
          }}>
            👁️ THE EYE v2.0
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Incorruptible Evidence-Driven Investigative Intelligence
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.7, marginTop: '10px' }}>
            Exposing corruption, constitutional violations, human rights abuses
          </p>
        </div>

        {/* Sample Selection */}
        <div style={{ 
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '40px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.5rem' }}>
            Select Investigation Case:
          </h2>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
            <button
              onClick={() => setSelectedSample('wsib_corruption')}
              style={{
                padding: '15px 25px',
                background: selectedSample === 'wsib_corruption' ? '#ff0080' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: selectedSample === 'wsib_corruption' ? '2px solid #ff0080' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              🔴 WSIB Corruption
            </button>

            <button
              onClick={() => setSelectedSample('indigenous_rights')}
              style={{
                padding: '15px 25px',
                background: selectedSample === 'indigenous_rights' ? '#ff0080' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: selectedSample === 'indigenous_rights' ? '2px solid #ff0080' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              ⚖️ Indigenous Rights Violation
            </button>

            <button
              onClick={() => setSelectedSample('disability_discrimination')}
              style={{
                padding: '15px 25px',
                background: selectedSample === 'disability_discrimination' ? '#ff0080' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: selectedSample === 'disability_discrimination' ? '2px solid #ff0080' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              ♿ Disability Discrimination
            </button>
          </div>

          <button
            onClick={processSample}
            disabled={processing}
            style={{
              padding: '18px 40px',
              background: processing ? '#666' : 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              cursor: processing ? 'not-allowed' : 'pointer',
              fontSize: '1.1rem',
              fontWeight: '700',
              width: '100%',
              transition: 'all 0.3s'
            }}
          >
            {processing ? '👁️ ANALYZING...' : '👁️ RUN THE EYE ANALYSIS'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ 
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <button onClick={copyToClipboard} style={{
                padding: '12px 25px',
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                📋 Copy JSON
              </button>
              <button onClick={downloadJSON} style={{
                padding: '12px 25px',
                background: '#2196F3',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                💾 Download Report
              </button>
            </div>

            {/* Risk Dashboard */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <RiskCard 
                title="Overall Risk"
                score={result.RiskAssessment.overall_risk_score}
                priority={result.RiskAssessment.priority}
              />
              <RiskCard 
                title="Legal Risk"
                score={result.RiskAssessment.legal_risk}
              />
              <RiskCard 
                title="Constitutional Severity"
                score={result.RiskAssessment.constitutional_violation_severity}
              />
              <RiskCard 
                title="Corruption Risk"
                score={result.RiskAssessment.corruption_exposure_risk}
              />
              <RiskCard 
                title="Human Rights Impact"
                score={result.RiskAssessment.human_rights_impact}
              />
              <RiskCard 
                title="Vulnerable Harm"
                score={result.RiskAssessment.vulnerable_population_harm_level}
              />
            </div>

            {/* Key Findings Tabs */}
            <KeyFindings result={result} />

            {/* Full JSON Output */}
            <details style={{ marginTop: '40px' }}>
              <summary style={{ 
                fontSize: '1.3rem', 
                fontWeight: '700', 
                cursor: 'pointer',
                padding: '15px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                📄 View Full JSON Report
              </summary>
              <pre style={{ 
                background: '#000',
                padding: '20px',
                borderRadius: '10px',
                overflow: 'auto',
                maxHeight: '600px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

function RiskCard({ title, score, priority }) {
  const getColor = (score) => {
    if (score >= 70) return '#ff0080';
    if (score >= 50) return '#ff8c00';
    if (score >= 30) return '#ffd700';
    return '#4CAF50';
  };

  return (
    <div style={{
      background: 'rgba(0,0,0,0.3)',
      border: `2px solid ${getColor(score)}`,
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '10px' }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '2.5rem', 
        fontWeight: '900',
        color: getColor(score)
      }}>
        {score}
      </div>
      {priority && (
        <div style={{ 
          marginTop: '10px',
          padding: '5px 15px',
          background: getColor(score),
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '0.85rem'
        }}>
          {priority}
        </div>
      )}
    </div>
  );
}

function KeyFindings({ result }) {
  const [activeTab, setActiveTab] = useState('corruption');

  const tabs = [
    { id: 'corruption', label: '🔴 Corruption', data: result.CorruptionFindings },
    { id: 'constitution', label: '⚖️ Constitution', data: result.ConstitutionViolations },
    { id: 'humanrights', label: '👥 Human Rights', data: result.HumanRightsBreaches },
    { id: 'uncrpd', label: '♿ UNCRPD', data: result.UNCRPDBreaches },
    { id: 'impacted', label: '🆘 Impacted Groups', data: result.ImpactedGroups },
    { id: 'actions', label: '⚡ Actions', data: result.RecommendedActions }
  ];

  const activeData = tabs.find(t => t.id === activeTab)?.data || [];

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Key Findings</h2>
      
      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '25px',
        flexWrap: 'wrap',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
        paddingBottom: '10px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab.id ? '#ff0080' : 'transparent',
              color: '#fff',
              border: activeTab === tab.id ? '2px solid #ff0080' : '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '700' : '500',
              fontSize: '0.95rem',
              transition: 'all 0.3s'
            }}
          >
            {tab.label} ({tab.data?.length || 0})
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: '300px' }}>
        {activeData.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            opacity: 0.6,
            fontSize: '1.1rem'
          }}>
            No findings in this category
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeData.map((item, idx) => (
              <FindingCard key={idx} item={item} type={activeTab} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FindingCard({ item, type }) {
  const renderContent = () => {
    switch (type) {
      case 'corruption':
        return (
          <>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff0080', marginBottom: '10px' }}>
              {item.corruption_type?.toUpperCase().replace(/_/g, ' ')}
            </div>
            <div style={{ marginBottom: '10px' }}>{item.description}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', marginBottom: '10px' }}>
              "{item.evidence_snippet?.substring(0, 200)}..."
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ 
                padding: '5px 12px', 
                background: item.severity === 'critical' ? '#ff0080' : '#ff8c00',
                borderRadius: '15px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {item.severity?.toUpperCase()}
              </span>
              {item.entities_involved?.slice(0, 3).map((entity, i) => (
                <span key={i} style={{ 
                  padding: '5px 12px', 
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '15px',
                  fontSize: '0.85rem'
                }}>
                  {entity}
                </span>
              ))}
            </div>
          </>
        );

      case 'constitution':
        return (
          <>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff8c00', marginBottom: '10px' }}>
              {item.section} - {item.right}
            </div>
            <div style={{ marginBottom: '10px' }}>{item.description}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '10px' }}>
              Legal Basis: {item.legal_basis}
            </div>
            <span style={{ 
              padding: '5px 12px', 
              background: item.severity === 'critical' ? '#ff0080' : '#ff8c00',
              borderRadius: '15px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              {item.severity?.toUpperCase()}
            </span>
          </>
        );

      case 'humanrights':
        return (
          <>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#4CAF50', marginBottom: '10px' }}>
              {item.legislation}
            </div>
            <div style={{ marginBottom: '10px' }}>
              Ground: <strong>{item.ground_of_discrimination?.replace(/_/g, ' ').toUpperCase()}</strong>
            </div>
            <div style={{ marginBottom: '10px' }}>{item.description}</div>
            {item.complaint_deadline && (
              <div style={{ fontSize: '0.9rem', color: '#ff8c00', fontWeight: '600' }}>
                ⏰ Complaint Deadline: {item.complaint_deadline}
              </div>
            )}
          </>
        );

      case 'uncrpd':
        return (
          <>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#2196F3', marginBottom: '10px' }}>
              {item.article} - {item.right}
            </div>
            <div style={{ marginBottom: '10px' }}>{item.description}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
              {item.canada_obligations}
            </div>
          </>
        );

      case 'impacted':
        return (
          <>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffd700', marginBottom: '10px' }}>
              {item.group}
            </div>
            <div style={{ marginBottom: '10px' }}>
              Harm Type: <strong>{item.harm_type}</strong>
            </div>
            {item.intersectionality && (
              <div style={{ marginBottom: '10px' }}>
                Intersectionality: {item.intersectionality.join(', ')}
              </div>
            )}
            <span style={{ 
              padding: '5px 12px', 
              background: '#ff0080',
              borderRadius: '15px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              REQUIRES PROTECTION
            </span>
          </>
        );

      case 'actions':
        return (
          <>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ff0080', marginBottom: '10px' }}>
              {item.action_type?.toUpperCase().replace(/_/g, ' ')}
            </div>
            <div style={{ marginBottom: '10px' }}>{item.description}</div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Target:</strong> {item.target}
            </div>
            {item.next_steps && (
              <div style={{ 
                marginTop: '15px',
                padding: '15px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                borderLeft: '3px solid #ff8c00'
              }}>
                <strong>Next Steps:</strong><br/>
                {item.next_steps}
              </div>
            )}
            <span style={{ 
              padding: '5px 12px', 
              background: item.priority === 'immediate' ? '#ff0080' : '#ff8c00',
              borderRadius: '15px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'inline-block',
              marginTop: '10px'
            }}>
              {item.priority?.toUpperCase()}
            </span>
          </>
        );

      default:
        return <pre>{JSON.stringify(item, null, 2)}</pre>;
    }
  };

  return (
    <div style={{
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '20px'
    }}>
      {renderContent()}
    </div>
  );
}
