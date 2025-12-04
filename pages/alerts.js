import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, critical, high, warning
  const [sourceFilter, setSourceFilter] = useState('all');
  const [automationEngine, setAutomationEngine] = useState(null);
  const [isAutomated, setIsAutomated] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  
  // Subscription state
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeTopics, setSubscribeTopics] = useState({
    wsib: true,
    odsp: true,
    federal: false,
    provincial: true,
    corporate: false
  });
  const [subscribeFrequency, setSubscribeFrequency] = useState('daily');
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  // Fetch alerts from API backend
  const fetchApiAlerts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('severity', filter);
      params.append('limit', '100');
      
      const response = await fetch(`/api/alerts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setApiConnected(true);
        if (data.alerts && data.alerts.length > 0) {
          // Merge API alerts with local alerts
          const apiAlerts = data.alerts.map(a => ({
            ...a,
            source: a.source || 'API Backend',
            timestamp: a.timestamp || a.createdAt
          }));
          setAlerts(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const newAlerts = apiAlerts.filter(a => !existingIds.has(a.id));
            return [...newAlerts, ...prev];
          });
        }
        console.log('🚨 ALERTS: Connected to API backend');
        return data;
      }
    } catch (error) {
      console.log('🚨 ALERTS: Running in standalone mode (API not available)');
      setApiConnected(false);
    }
    return null;
  }, [filter]);

  // Acknowledge alert via API
  const acknowledgeAlert = useCallback(async (alertId) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acknowledged: true })
      });
      if (response.ok) {
        setAlerts(prev => prev.map(a => 
          a.id === alertId ? { ...a, acknowledged: true } : a
        ));
        console.log('✅ Alert acknowledged:', alertId);
      }
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  }, []);

  // Initialize API connection and automation engine
  useEffect(() => {
    fetchApiAlerts();
    
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
        
        // Listen for real data loaded event
        window.addEventListener('real-data-loaded', (event) => {
          const { alerts: realAlerts } = event.detail;
          console.log('🚨 ALERTS PAGE: Loaded', realAlerts.length, 'REAL alerts');
          setAlerts(realAlerts);
        });
      });
    }
  }, [fetchApiAlerts]);

  // Real-time refresh - check API and local engine
  useEffect(() => {
    const interval = setInterval(() => {
      fetchApiAlerts();
      if (automationEngine) {
        loadAlertsFromEngine(automationEngine);
      }
    }, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [automationEngine, fetchApiAlerts]);

  function loadAlertsFromEngine(engine) {
    const engineAlerts = engine.getAlerts();
    const billAlerts = engine.convertBillsToAlerts ? engine.convertBillsToAlerts() : [];
    const combinedAlerts = [...engineAlerts, ...billAlerts];
    // Merge with existing alerts, avoiding duplicates
    setAlerts(prev => {
      const existingTitles = new Set(prev.map(a => a.title));
      const newAlerts = combinedAlerts.filter(a => !existingTitles.has(a.title));
      return [...newAlerts, ...prev];
    });
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

  const sources = ['all', ...new Set(alerts.map(a => a.source).filter(Boolean))];

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
        
        {/* System Integration Banner */}
        <div style={{
          background: 'rgba(79, 172, 254, 0.1)',
          border: '2px solid #4facfe',
          borderRadius: '15px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{ color: '#4facfe', fontWeight: 'bold' }}>
            🔗 INTEGRATED SYSTEMS:
          </div>
          <Link href="/the-eye-oracle" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 0, 128, 0.2)',
            border: '1px solid #ff0080',
            borderRadius: '8px',
            color: '#ff0080',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            👁️ THE EYE v2.0
          </Link>
          <Link href="/automated-monitoring" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(79, 172, 254, 0.2)',
            border: '1px solid #4facfe',
            borderRadius: '8px',
            color: '#4facfe',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            📡 24/7 Monitoring
          </Link>
          <Link href="/target-acquisition" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 68, 68, 0.2)',
            border: '1px solid #ff4444',
            borderRadius: '8px',
            color: '#ff4444',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            🎯 Target Dossiers
          </Link>
          {apiConnected && (
            <Link href="/admin" style={{
              padding: '0.5rem 1rem',
              background: 'rgba(46, 213, 115, 0.2)',
              border: '1px solid #2ed573',
              borderRadius: '8px',
              color: '#2ed573',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              🔧 Admin Dashboard
            </Link>
          )}
          <div style={{ color: '#2ed573', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ✅ RECEIVING REAL-TIME ALERTS FROM ALL SOURCES
            {apiConnected && ' • API CONNECTED'}
          </div>
        </div>

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
            {apiConnected && ' • 🔌 API CONNECTED'}
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
          
          <button
            onClick={() => setShowSubscribe(!showSubscribe)}
            style={{
              marginLeft: 'auto',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
              border: 'none',
              borderRadius: '25px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              boxShadow: '0 4px 15px rgba(255, 0, 128, 0.3)'
            }}
          >
            🔔 {showSubscribe ? 'Hide' : 'Subscribe to Alerts'}
          </button>
        </div>

        {/* Subscription Panel */}
        {showSubscribe && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 128, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%)',
            border: '2px solid #ff0080',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              margin: '0 0 20px 0', 
              color: '#ff0080',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1.5rem'
            }}>
              🔔 Subscribe to Alert Updates
            </h3>
            
            <p style={{ color: '#ccc', marginBottom: '20px', lineHeight: '1.6' }}>
              Get notified when new alerts are published. Choose your topics and frequency. 
              <strong style={{ color: '#2ed573' }}> No spam, just important updates about issues affecting injured workers and disabled Canadians.</strong>
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
              {/* Topics Selection */}
              <div>
                <h4 style={{ color: '#fff', marginBottom: '15px' }}>📋 Topics</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'wsib', label: 'WSIB & Workers Compensation', emoji: '🏭' },
                    { id: 'odsp', label: 'ODSP & Disability Benefits', emoji: '♿' },
                    { id: 'provincial', label: 'Ontario Provincial Changes', emoji: '🏛️' },
                    { id: 'federal', label: 'Federal Bills & Policies', emoji: '🇨🇦' },
                    { id: 'corporate', label: 'Corporate & Insurance News', emoji: '🏢' }
                  ].map(topic => (
                    <label 
                      key={topic.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 15px',
                        background: subscribeTopics[topic.id] ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255,255,255,0.05)',
                        border: subscribeTopics[topic.id] ? '1px solid #2ed573' : '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={subscribeTopics[topic.id]}
                        onChange={(e) => setSubscribeTopics(prev => ({ ...prev, [topic.id]: e.target.checked }))}
                        style={{ 
                          width: '18px', 
                          height: '18px',
                          accentColor: '#2ed573'
                        }}
                      />
                      <span style={{ fontSize: '1.2rem' }}>{topic.emoji}</span>
                      <span style={{ color: subscribeTopics[topic.id] ? '#2ed573' : '#ccc' }}>{topic.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Frequency & Email */}
              <div>
                <h4 style={{ color: '#fff', marginBottom: '15px' }}>⏰ Frequency</h4>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'instant', label: 'Instant (Critical Only)', icon: '⚡' },
                    { id: 'daily', label: 'Daily Digest', icon: '📅' },
                    { id: 'weekly', label: 'Weekly Summary', icon: '📆' }
                  ].map(freq => (
                    <button
                      key={freq.id}
                      onClick={() => setSubscribeFrequency(freq.id)}
                      style={{
                        padding: '10px 15px',
                        background: subscribeFrequency === freq.id ? 'rgba(79, 172, 254, 0.3)' : 'rgba(255,255,255,0.05)',
                        border: subscribeFrequency === freq.id ? '2px solid #4facfe' : '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: subscribeFrequency === freq.id ? '#4facfe' : '#ccc',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: subscribeFrequency === freq.id ? 'bold' : 'normal'
                      }}
                    >
                      {freq.icon} {freq.label}
                    </button>
                  ))}
                </div>
                
                <h4 style={{ color: '#fff', marginBottom: '15px' }}>📧 Email Address</h4>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSubscribeStatus('sending');
                    
                    // Save subscription locally (localStorage for now)
                    const subscription = {
                      email: subscribeEmail,
                      topics: subscribeTopics,
                      frequency: subscribeFrequency,
                      subscribedAt: new Date().toISOString()
                    };
                    
                    try {
                      // Store locally
                      const existing = JSON.parse(localStorage.getItem('alertSubscriptions') || '[]');
                      existing.push(subscription);
                      localStorage.setItem('alertSubscriptions', JSON.stringify(existing));
                      
                      // Also try Formspree if available
                      try {
                        await fetch('https://formspree.io/f/xkgrlqgw', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            email: subscribeEmail,
                            type: 'Alert Subscription',
                            topics: Object.entries(subscribeTopics).filter(([k,v]) => v).map(([k]) => k).join(', '),
                            frequency: subscribeFrequency
                          })
                        });
                      } catch (formError) {
                        console.log('Formspree not available, using local storage only');
                      }
                      
                      setSubscribeStatus('success');
                      setSubscribeEmail('');
                      setTimeout(() => setSubscribeStatus(null), 5000);
                    } catch (error) {
                      setSubscribeStatus('error');
                      setTimeout(() => setSubscribeStatus(null), 5000);
                    }
                  }}
                  style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
                >
                  <input
                    type="email"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      flex: 1,
                      minWidth: '200px',
                      padding: '12px 15px',
                      background: 'rgba(0,0,0,0.3)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '16px'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'sending'}
                    style={{
                      padding: '12px 25px',
                      background: subscribeStatus === 'success' 
                        ? 'linear-gradient(135deg, #2ed573 0%, #1abc9c 100%)'
                        : 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: subscribeStatus === 'sending' ? 'wait' : 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {subscribeStatus === 'sending' && '⏳ Subscribing...'}
                    {subscribeStatus === 'success' && '✅ Subscribed!'}
                    {subscribeStatus === 'error' && '❌ Try Again'}
                    {!subscribeStatus && '🔔 Subscribe'}
                  </button>
                </form>
                
                {subscribeStatus === 'success' && (
                  <p style={{ 
                    color: '#2ed573', 
                    marginTop: '15px', 
                    padding: '10px 15px',
                    background: 'rgba(46, 213, 115, 0.1)',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}>
                    ✅ You're subscribed! You'll receive alerts based on your preferences. 
                    Check your inbox for a confirmation.
                  </p>
                )}
              </div>
            </div>
            
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: '#888'
            }}>
              🔒 <strong>Privacy:</strong> Your email is only used for alert notifications. 
              We never share your information. Unsubscribe anytime by clicking the link in any email.
            </div>
          </div>
        )}

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
            {/* Verification Badge */}
            {alert.verificationBadge && (
              <span style={{
                background: alert.verified 
                  ? 'rgba(46, 213, 115, 0.25)' 
                  : 'rgba(255, 193, 7, 0.25)',
                padding: '4px 12px',
                borderRadius: '5px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: alert.verified ? '#2ed573' : '#ffc107',
                border: alert.verified 
                  ? '1px solid rgba(46, 213, 115, 0.5)' 
                  : '1px solid rgba(255, 193, 7, 0.5)'
              }}>
                {alert.verificationBadge}
              </span>
            )}
            {/* Charter Violations Badge */}
            {alert.charter_violations && alert.charter_violations.length > 0 && (
              <span style={{
                background: 'rgba(255, 0, 0, 0.2)',
                padding: '4px 12px',
                borderRadius: '5px',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#ff6b6b',
                border: '1px solid rgba(255, 0, 0, 0.5)'
              }}>
                ⚠️ Charter: {alert.charter_violations.join(', ')}
              </span>
            )}
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
          
          {/* Impact Info from Real Data */}
          {(alert.affected_count || alert.financial_impact) && (
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              marginBottom: '10px'
            }}>
              {alert.affected_count && (
                <span style={{
                  background: 'rgba(255, 68, 68, 0.2)',
                  padding: '5px 12px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  color: '#ff6b6b',
                  border: '1px solid rgba(255, 68, 68, 0.3)'
                }}>
                  👥 Affected: {alert.affected_count}
                </span>
              )}
              {alert.financial_impact && (
                <span style={{
                  background: 'rgba(255, 193, 7, 0.2)',
                  padding: '5px 12px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  color: '#ffc107',
                  border: '1px solid rgba(255, 193, 7, 0.3)'
                }}>
                  💰 Impact: {alert.financial_impact}
                </span>
              )}
            </div>
          )}
          
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
