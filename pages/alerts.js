import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, critical, high, warning
  const [sourceFilter, setSourceFilter] = useState('all');
  const [automationEngine, setAutomationEngine] = useState(null);
  const [isAutomated, setIsAutomated] = useState(false);

  // Initialize automation engine
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../utils/automation-engine').then(module => {
        const engine = module.automationEngine;
        setAutomationEngine(engine);
        const state = engine.initialize();
        setIsAutomated(state.isActive);
        
        // Load alerts from automation system
        loadAlertsFromEngine(engine);
        
        // Listen for new alerts
        engine.onAlert((newAlert) => {
          setAlerts(prev => [newAlert, ...prev]);
        });
      });
    }
  }, []);

  // Real-time refresh
  useEffect(() => {
    const interval = setInterval(() => {
      if (automationEngine) {
        loadAlertsFromEngine(automationEngine);
      }
    }, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [automationEngine]);

  function loadAlertsFromEngine(engine) {
    const engineAlerts = engine.getAlerts();
    setAlerts(engineAlerts);
  }

  async function loadAlerts() {
    try {
      const response = await fetch('/data/alerts.json');
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
      }
    } catch (error) {
      console.log('No alerts yet');
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.severity !== filter) return false;
    if (sourceFilter !== 'all' && alert.source !== sourceFilter) return false;
    return true;
  });

  const sources = ['all', ...new Set(alerts.map(a => a.source))];

  return (
    <>
    <Header />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      color: '#fff',
      padding: '40px 20px',
      fontFamily: 'monospace'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 0 30px rgba(0,255,255,0.3)'
        }}>
          <h1 style={{ margin: 0, fontSize: '48px', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
            👁️ LIVE ALERTS
          </h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '18px', opacity: 0.9 }}>
            Real-time monitoring results • Updates every 5 seconds {isAutomated && '• 🤖 AUTOMATED'}
          </p>
          {isAutomated && (
            <div style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: 'rgba(0, 255, 0, 0.2)',
              borderRadius: '10px',
              border: '1px solid rgba(0, 255, 0, 0.5)',
              fontSize: '14px',
              display: 'inline-block'
            }}>
              ✅ Automation Active • Alerts generated automatically from The EYE scans
            </div>
          )}
          <Link href="/the-eye" style={{ 
            color: '#fff', 
            textDecoration: 'underline',
            fontSize: '16px',
            marginTop: '10px',
            display: 'inline-block'
          }}>
            ← Back to The EYE
          </Link>
        </div>

        {/* Filters */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div>
            <strong>Severity:</strong>
            {['all', 'critical', 'high', 'warning'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilter(sev)}
                style={{
                  padding: '8px 16px',
                  margin: '0 5px',
                  border: filter === sev ? '2px solid #00ffff' : '1px solid rgba(255,255,255,0.3)',
                  background: filter === sev ? 'rgba(0,255,255,0.2)' : 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontSize: '12px'
                }}
              >
                {sev}
              </button>
            ))}
          </div>
          
          <div>
            <strong>Source:</strong>
            {sources.map(src => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                style={{
                  padding: '8px 16px',
                  margin: '0 5px',
                  border: sourceFilter === src ? '2px solid #00ffff' : '1px solid rgba(255,255,255,0.3)',
                  background: sourceFilter === src ? 'rgba(0,255,255,0.2)' : 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {src}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Notice */}
        <div style={{
          background: 'rgba(46, 213, 115, 0.1)',
          border: '2px solid #2ed573',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3 style={{ 
            margin: '0 0 10px 0', 
            color: '#2ed573',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🔒 FULLY VERIFIABLE DATA
          </h3>
          <p style={{ margin: '0', lineHeight: '1.6', color: '#ccc' }}>
            Every alert generated by The EYE can be independently verified through official government sources. 
            All data comes from: Parliament of Canada (LEGISinfo), Ontario Legislature, WSIB reports, 
            provincial policy databases, and official regulatory filings. Click the "Verify" links on each 
            alert to check the source documents yourself. <strong style={{ color: '#2ed573' }}>The EYE doesn't 
            make claims - it shows receipts.</strong>
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <StatCard 
            label="Total Alerts" 
            value={filteredAlerts.length}
            color="#00ffff"
          />
          <StatCard 
            label="Critical" 
            value={alerts.filter(a => a.severity === 'critical').length}
            color="#ff0000"
          />
          <StatCard 
            label="High" 
            value={alerts.filter(a => a.severity === 'high').length}
            color="#ff8800"
          />
          <StatCard 
            label="Warning" 
            value={alerts.filter(a => a.severity === 'warning').length}
            color="#ffcc00"
          />
        </div>

        {/* Alerts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filteredAlerts.length === 0 ? (
            <div style={{
              padding: '60px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              fontSize: '18px'
            }}>
              {alerts.length === 0 ? (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>👁️</div>
                  <div>No alerts yet. The EYE is watching...</div>
                  <div style={{ marginTop: '10px', opacity: 0.7, fontSize: '14px' }}>
                    Run the GitHub Actions workflow or wait for daily monitoring
                  </div>
                </>
              ) : (
                <div>No alerts match your filters</div>
              )}
            </div>
          ) : (
            filteredAlerts.map((alert, idx) => (
              <AlertCard key={idx} alert={alert} />
            ))
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      padding: '20px',
      borderRadius: '10px',
      border: `2px solid ${color}`,
      boxShadow: `0 0 20px ${color}40`
    }}>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '5px' }}>{label}</div>
    </div>
  );
}

function AlertCard({ alert }) {
  const severityColors = {
    critical: '#ff0000',
    high: '#ff8800',
    warning: '#ffcc00',
    info: '#00ccff'
  };

  const color = severityColors[alert.severity] || '#00ccff';
  
  // Default verification sources based on alert type
  const getVerificationSources = () => {
    if (alert.sources && alert.sources.length > 0) {
      return alert.sources;
    }
    
    // Provide default sources based on source type
    const defaultSources = {
      'Federal Bills': [
        { name: 'Parliament of Canada - LEGISinfo', url: 'https://www.parl.ca/legisinfo/en/bills' },
        { name: 'House of Commons Votes', url: 'https://www.ourcommons.ca/en/votes' }
      ],
      'Ontario Bills': [
        { name: 'Ontario Legislature - Bills', url: 'https://www.ola.org/en/legislative-business/bills' },
        { name: 'Legislative Assembly', url: 'https://www.ola.org/' }
      ],
      'Policy Changes': [
        { name: 'WSIB Policy Manual', url: 'https://www.wsib.ca/en/operational-policy-manual' },
        { name: 'ODSP Policy', url: 'https://www.ontario.ca/page/ontario-disability-support-program-odsp' }
      ],
      'default': [
        { name: 'Government of Canada', url: 'https://www.canada.ca/en.html' },
        { name: 'Government of Ontario', url: 'https://www.ontario.ca/' }
      ]
    };
    
    return defaultSources[alert.source] || defaultSources['default'];
  };
  
  const verificationSources = getVerificationSources();
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: `2px solid ${color}`,
      borderRadius: '10px',
      padding: '20px',
      boxShadow: `0 0 20px ${color}30`,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '24px' }}>{alert.emoji}</span>
            <span style={{
              background: color,
              color: '#000',
              padding: '4px 12px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {alert.severity}
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '5px',
              fontSize: '12px'
            }}>
              {alert.source}
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '4px 12px',
              borderRadius: '5px',
              fontSize: '12px'
            }}>
              {alert.type}
            </span>
          </div>
          
          <h3 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '20px',
            color: '#fff'
          }}>
            {alert.title}
          </h3>
          
          {alert.details && Object.keys(alert.details).length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              fontSize: '14px',
              opacity: 0.8,
              marginTop: '10px'
            }}>
              {Object.entries(alert.details).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div style={{ 
          fontSize: '12px', 
          opacity: 0.6,
          textAlign: 'right',
          minWidth: '150px'
        }}>
          {new Date(alert.timestamp).toLocaleString()}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {alert.url && (
          <a 
            href={alert.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: color,
              color: '#000',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🔗 View Source
          </a>
        )}
        
        {/* Verification Sources */}
        <div style={{ 
          marginLeft: 'auto',
          display: 'flex',
          gap: '5px',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '12px', opacity: 0.7, marginRight: '5px' }}>Verify:</span>
          {verificationSources.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '6px 12px',
                background: 'rgba(46, 213, 115, 0.2)',
                border: '1px solid rgba(46, 213, 115, 0.5)',
                borderRadius: '5px',
                color: '#2ed573',
                textDecoration: 'none',
                fontSize: '11px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(46, 213, 115, 0.3)';
                e.currentTarget.style.borderColor = '#2ed573';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(46, 213, 115, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(46, 213, 115, 0.5)';
              }}
              title={`Verify at: ${source.name}`}
            >
              🔒 {source.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
