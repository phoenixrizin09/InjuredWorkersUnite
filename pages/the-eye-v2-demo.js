import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * The Eye v2.0 - LIVE Document Analyzer
 * Real-time corruption and rights violation detection
 */
export default function TheEyeV2() {
  const [documentText, setDocumentText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeDocument = async () => {
    if (!documentText.trim()) {
      alert('Please paste document text to analyze');
      return;
    }

    setAnalyzing(true);
    setResults(null);

    try {
      // Call the Eye v2.0 API endpoint
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: documentText })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        // Fallback: client-side basic analysis
        const basicAnalysis = performBasicAnalysis(documentText);
        setResults(basicAnalysis);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback analysis
      const basicAnalysis = performBasicAnalysis(documentText);
      setResults(basicAnalysis);
    } finally {
      setAnalyzing(false);
    }
  };

  const performBasicAnalysis = (text) => {
    const lowerText = text.toLowerCase();
    
    // Basic keyword detection
    const corruptionKeywords = ['bribery', 'kickback', 'fraud', 'embezzlement', 'conflict of interest', 'nepotism'];
    const charterKeywords = ['charter', 'section 7', 'section 15', 'section 12', 'constitutional'];
    const rightsKeywords = ['discrimination', 'harassment', 'violation', 'breach', 'denied', 'refused'];
    
    const foundCorruption = corruptionKeywords.filter(k => lowerText.includes(k));
    const foundCharter = charterKeywords.filter(k => lowerText.includes(k));
    const foundRights = rightsKeywords.filter(k => lowerText.includes(k));
    
    return {
      RiskAssessment: {
        overall_risk_score: Math.min(100, (foundCorruption.length * 20) + (foundCharter.length * 15) + (foundRights.length * 10))
      },
      CorruptionFindings: foundCorruption.map(k => ({
        type: 'Potential corruption indicator',
        description: `Document mentions: "${k}"`
      })),
      ConstitutionViolations: foundCharter.map(k => ({
        section: 'Detected',
        violation: `Document references: "${k}"`
      })),
      HumanRightsBreaches: foundRights.map(k => ({
        right: 'Rights concern',
        breach: `Document mentions: "${k}"`
      })),
      RecommendedActions: [
        {
          action: 'Document and preserve evidence',
          priority: 'high',
          timeline: 'immediate'
        },
        {
          action: 'Consult with legal professional',
          priority: 'high',
          timeline: '24-48 hours'
        }
      ]
    };
  };

  return (
    <>
      <Head>
        <title>The Eye v2.0 - Live Document Analyzer</title>
        <meta name="description" content="Analyze documents in real-time for corruption, Charter violations, and human rights breaches" />
      </Head>

      <Header />

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        padding: '2rem 1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #00ffff 0%, #ff6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              👁️ The Eye v2.0
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#00ffff',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Real-time corruption and rights violation detector
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: '#aaa',
              marginTop: '1rem'
            }}>
              Paste any government document, policy, or news article. The Eye analyzes it instantly.
            </p>
          </div>

          {/* Input Area */}
          <div style={{
            background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)',
            border: '2px solid #00ffff',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ marginTop: 0, color: '#00ffff' }}>📄 Paste Document Text</h2>
            <textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Paste government document, policy text, news article, or any text you want analyzed for corruption, Charter violations, or human rights breaches..."
              style={{
                width: '100%',
                minHeight: '300px',
                padding: '1rem',
                fontSize: '1rem',
                background: '#0a0a0a',
                color: '#fff',
                border: '2px solid #333',
                borderRadius: '8px',
                fontFamily: 'monospace',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
            
            <button
              onClick={analyzeDocument}
              disabled={analyzing || !documentText.trim()}
              style={{
                marginTop: '1rem',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: analyzing ? '#666' : 'linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                cursor: analyzing ? 'wait' : 'pointer',
                width: '100%',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => !analyzing && (e.target.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {analyzing ? '👁️ Analyzing...' : '👁️ Analyze Document'}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div style={{
              background: 'linear-gradient(135deg, #0f0f1e 0%, #16213e 100%)',
              border: '2px solid #ff6b6b',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                marginTop: 0,
                color: '#ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                👁️ Analysis Results
                <span style={{
                  fontSize: '1.5rem',
                  background: results.RiskAssessment?.overall_risk_score > 70 ? '#ff0000' : 
                             results.RiskAssessment?.overall_risk_score > 40 ? '#ffa500' : '#00ff00',
                  color: '#000',
                  padding: '0.25rem 1rem',
                  borderRadius: '20px',
                  fontWeight: 'bold'
                }}>
                  Risk: {results.RiskAssessment?.overall_risk_score || 0}/100
                </span>
              </h2>

              {/* Corruption Findings */}
              {results.CorruptionFindings && results.CorruptionFindings.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#ffd93d' }}>🚨 Corruption Indicators Found: {results.CorruptionFindings.length}</h3>
                  {results.CorruptionFindings.map((finding, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(255, 217, 61, 0.1)',
                      border: '1px solid #ffd93d',
                      borderRadius: '6px',
                      padding: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <strong>{finding.type || 'Corruption'}</strong>
                      <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>{finding.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Charter Violations */}
              {results.ConstitutionViolations && results.ConstitutionViolations.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#ff6b6b' }}>⚖️ Charter Concerns: {results.ConstitutionViolations.length}</h3>
                  {results.ConstitutionViolations.map((violation, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(255, 107, 107, 0.1)',
                      border: '1px solid #ff6b6b',
                      borderRadius: '6px',
                      padding: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <strong>Section {violation.section}</strong>
                      <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>{violation.violation}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Human Rights */}
              {results.HumanRightsBreaches && results.HumanRightsBreaches.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#00ffff' }}>🛡️ Human Rights Concerns: {results.HumanRightsBreaches.length}</h3>
                  {results.HumanRightsBreaches.map((breach, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0, 255, 255, 0.1)',
                      border: '1px solid #00ffff',
                      borderRadius: '6px',
                      padding: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <strong>{breach.right}</strong>
                      <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>{breach.breach}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Recommended Actions */}
              {results.RecommendedActions && results.RecommendedActions.length > 0 && (
                <div>
                  <h3 style={{ color: '#00ff00' }}>✅ Recommended Actions</h3>
                  {results.RecommendedActions.map((action, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0, 255, 0, 0.1)',
                      border: '1px solid #00ff00',
                      borderRadius: '6px',
                      padding: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong>{action.action || action.description}</strong>
                        <span style={{
                          background: action.priority === 'high' ? '#ff0000' : '#ffa500',
                          color: '#fff',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem'
                        }}>
                          {action.priority?.toUpperCase()}
                        </span>
                      </div>
                      {action.timeline && (
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Timeline: {action.timeline}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* No Issues Found */}
              {(!results.CorruptionFindings || results.CorruptionFindings.length === 0) &&
               (!results.ConstitutionViolations || results.ConstitutionViolations.length === 0) &&
               (!results.HumanRightsBreaches || results.HumanRightsBreaches.length === 0) && (
                <div style={{
                  background: 'rgba(0, 255, 0, 0.1)',
                  border: '2px solid #00ff00',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#00ff00' }}>✅ No Major Issues Detected</h3>
                  <p style={{ color: '#ccc' }}>
                    The Eye did not detect obvious corruption indicators, Charter violations, or human rights concerns in this text.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid #00ffff',
            borderRadius: '8px',
            padding: '1.5rem',
            marginTop: '2rem'
          }}>
            <h3 style={{ marginTop: 0, color: '#00ffff' }}>ℹ️ How It Works</h3>
            <ul style={{ color: '#ccc', lineHeight: '1.8' }}>
              <li>Paste any document text (government policies, news, reports, etc.)</li>
              <li>The Eye v2.0 analyzes for corruption patterns, Charter violations, and rights breaches</li>
              <li>Results show risk score (0-100) and specific findings with evidence</li>
              <li>All analysis happens in real-time - no data is stored</li>
              <li>Use this to quickly assess any government document or policy</li>
            </ul>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
