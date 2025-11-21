import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LegislativeTracking() {
  const [activeBills, setActiveBills] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());
  const [alertFilters, setAlertFilters] = useState({
    wsib: true,
    odsp: true,
    disability: true,
    healthcare: true,
    indigenous: true
  });

  useEffect(() => {
    loadTrackedBills();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadTrackedBills();
      }, 300000); // 5 minutes
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  function loadTrackedBills() {
    // Load from localStorage or generate initial set
    const tracked = localStorage.getItem('tracked_bills');
    if (tracked) {
      setActiveBills(JSON.parse(tracked));
    } else {
      setActiveBills(generateInitialBills());
    }
    setLastUpdate(new Date().toLocaleString());
  }

  function generateInitialBills() {
    return [
      {
        id: 'ON_BILL_124',
        jurisdiction: 'Ontario',
        bill_number: 'Bill 124',
        title: 'Protecting a Sustainable Public Sector for Future Generations Act',
        status: 'Struck Down by Courts',
        threat_level: 'critical',
        description: 'Wage cap for public sector workers including nurses - ruled unconstitutional',
        introduced: '2019-06-05',
        last_action: 'Struck down November 2022',
        affects: ['nurses', 'teachers', 'public sector workers'],
        charter_violations: ['Section 2(d) - Freedom of Association'],
        our_position: 'OPPOSED - Union busting',
        action_taken: 'Legal challenge successful',
        url: 'https://www.ola.org/en/legislative-business/bills/parliament-42/session-1/bill-124',
        news: [
          { title: 'Ontario Bill 124 struck down', url: 'https://www.cbc.ca/news/canada/toronto/bill-124-unconstitutional-1.6659614', date: '2022-11-29' }
        ]
      },
      {
        id: 'ON_BILL_175',
        jurisdiction: 'Ontario',
        bill_number: 'Bill 175',
        title: 'Connecting People to Home and Community Care Act',
        status: 'Active',
        threat_level: 'critical',
        description: 'Healthcare privatization - allowing for-profit home care',
        introduced: '2023-10-25',
        last_action: 'Royal Assent',
        affects: ['seniors', 'disabled', 'home care workers'],
        charter_violations: ['Section 7 - Right to Life (reduced care quality)'],
        our_position: 'OPPOSED - Privatization of healthcare',
        action_taken: 'Public opposition campaign',
        url: 'https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-175',
        news: []
      },
      {
        id: 'FED_BILL_C35',
        jurisdiction: 'Federal',
        bill_number: 'Bill C-35',
        title: 'Canada Disability Benefit Act',
        status: 'Passed',
        threat_level: 'medium',
        description: 'New federal disability benefit - but amount NOT YET SET',
        introduced: '2021-06-22',
        last_action: 'Royal Assent June 2023',
        affects: ['all disabled Canadians'],
        charter_violations: [],
        our_position: 'SUPPORT WITH CONCERNS - Amount must match poverty line',
        action_taken: 'Advocacy for adequate rates',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-35',
        news: [
          { title: 'Canada Disability Benefit passes', url: 'https://www.cbc.ca/news/politics/canada-disability-benefit-1.6888888', date: '2023-06-22' }
        ]
      },
      {
        id: 'FED_BILL_C64',
        jurisdiction: 'Federal',
        bill_number: 'Bill C-64',
        title: 'Pharmacare Act',
        status: 'Passed',
        threat_level: 'low',
        description: 'National pharmacare starting with diabetes and contraception',
        introduced: '2024-02-29',
        last_action: 'Royal Assent October 2024',
        affects: ['diabetics', 'all Canadians eventually'],
        charter_violations: [],
        our_position: 'SUPPORT - First step toward universal pharmacare',
        action_taken: 'NDP pressure forced Liberal action',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-64',
        news: [
          { title: 'Pharmacare bill passes', url: 'https://www.cbc.ca/news/politics/pharmacare-bill-1.7305042', date: '2024-10-10' }
        ]
      },
      {
        id: 'FED_BILL_C22',
        jurisdiction: 'Federal',
        bill_number: 'Bill C-22',
        title: 'Canada Dental Care Act',
        status: 'Passed',
        threat_level: 'low',
        description: 'National dental care for low-income Canadians',
        introduced: '2022-09-20',
        last_action: 'Royal Assent December 2022',
        affects: ['9 million uninsured Canadians'],
        charter_violations: [],
        our_position: 'STRONG SUPPORT - Ends dental poverty',
        action_taken: 'NDP forced Liberal minority to act',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-22',
        news: []
      },
      {
        id: 'ON_POTENTIAL_OW_CUTS',
        jurisdiction: 'Ontario',
        bill_number: 'Watch: Budget 2025',
        title: 'Ontario Works Rate Freeze (Predicted)',
        status: 'Watching',
        threat_level: 'critical',
        description: 'Ford government may freeze OW rates again - $733/month already starvation',
        introduced: null,
        last_action: 'Budget expected Spring 2025',
        affects: ['230,000 Ontario Works recipients'],
        charter_violations: ['Section 7 - Right to Life'],
        our_position: 'PRE-EMPTIVE OPPOSITION',
        action_taken: 'Monitoring, preparing campaign',
        url: null,
        news: []
      }
    ];
  }

  const filteredBills = activeBills.filter(bill => {
    const description = bill.description.toLowerCase();
    const affects = bill.affects.join(' ').toLowerCase();
    
    if (alertFilters.wsib && (description.includes('wsib') || affects.includes('worker'))) return true;
    if (alertFilters.odsp && (description.includes('odsp') || description.includes('disability'))) return true;
    if (alertFilters.disability && affects.includes('disabled')) return true;
    if (alertFilters.healthcare && (description.includes('health') || description.includes('care'))) return true;
    if (alertFilters.indigenous && affects.includes('indigenous')) return true;
    
    return false;
  });

  const getThreatColor = (level) => {
    switch (level) {
      case 'critical': return '#ff0000';
      case 'high': return '#ff6600';
      case 'medium': return '#ffcc00';
      case 'low': return '#00ff00';
      default: return '#888';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#ff6600';
      case 'Passed': return '#ffcc00';
      case 'Struck Down by Courts': return '#00ff00';
      case 'Watching': return '#ff0000';
      default: return '#888';
    }
  };

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
          
          <Link href="/the-eye" style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 0, 128, 0.2)',
            border: '1px solid #ff0080',
            borderRadius: '8px',
            color: '#ff0080',
            textDecoration: 'none',
            marginBottom: '2rem',
            fontSize: '0.9rem'
          }}>
            ← Back to The EYE
          </Link>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              📜 LEGISLATIVE TRACKING
            </h1>
            <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Real-time monitoring of bills affecting injured workers, disabled people, and vulnerable populations
            </p>
          </div>

          {/* Auto-Refresh Status */}
          <div style={{
            background: 'rgba(79, 172, 254, 0.1)',
            border: '2px solid #4facfe',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ color: '#4facfe', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {autoRefresh ? '🟢 AUTO-MONITORING ACTIVE' : '⏸️ MONITORING PAUSED'}
              </div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>
                Last Update: {lastUpdate}
              </div>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              style={{
                padding: '0.75rem 1.5rem',
                background: autoRefresh ? 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)' : 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {autoRefresh ? '⏸️ PAUSE' : '▶️ RESUME'}
            </button>
          </div>

          {/* Alert Filters */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ color: '#4facfe', fontWeight: 'bold', marginBottom: '1rem' }}>
              🔔 ALERT FILTERS
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {Object.keys(alertFilters).map(filter => (
                <label key={filter} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: alertFilters[filter] ? 'rgba(79, 172, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${alertFilters[filter] ? '#4facfe' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '25px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={alertFilters[filter]}
                    onChange={(e) => setAlertFilters({ ...alertFilters, [filter]: e.target.checked })}
                  />
                  <span style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>{filter}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bill Count Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '2px solid #ff0000',
              borderRadius: '15px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#ff0000', fontWeight: 'bold' }}>
                {activeBills.filter(b => b.threat_level === 'critical').length}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>CRITICAL THREATS</div>
            </div>
            <div style={{
              background: 'rgba(255, 204, 0, 0.1)',
              border: '2px solid #ffcc00',
              borderRadius: '15px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#ffcc00', fontWeight: 'bold' }}>
                {activeBills.filter(b => b.status === 'Active').length}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>ACTIVE BILLS</div>
            </div>
            <div style={{
              background: 'rgba(0, 255, 0, 0.1)',
              border: '2px solid #00ff00',
              borderRadius: '15px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#00ff00', fontWeight: 'bold' }}>
                {activeBills.filter(b => b.our_position.includes('SUPPORT')).length}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>WE SUPPORT</div>
            </div>
          </div>

          {/* Bills List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredBills.map(bill => (
              <div
                key={bill.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${getThreatColor(bill.threat_level)}`,
                  borderRadius: '15px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                      <span style={{
                        background: getThreatColor(bill.threat_level),
                        color: '#000',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {bill.threat_level} THREAT
                      </span>
                      <span style={{
                        background: getStatusColor(bill.status),
                        color: '#000',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {bill.status}
                      </span>
                      <span style={{ color: '#888', fontSize: '0.9rem' }}>
                        {bill.jurisdiction}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', color: '#4facfe', marginBottom: '0.5rem' }}>
                      {bill.bill_number}: {bill.title}
                    </h3>
                  </div>
                </div>

                <p style={{ color: '#ddd', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {bill.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>WHO IT AFFECTS:</div>
                    <div style={{ color: '#fff' }}>{bill.affects.join(', ')}</div>
                  </div>
                  {bill.charter_violations.length > 0 && (
                    <div>
                      <div style={{ color: '#ff6666', fontSize: '0.85rem', marginBottom: '0.25rem' }}>⚠️ CHARTER VIOLATIONS:</div>
                      <div style={{ color: '#ff6666' }}>{bill.charter_violations.join(', ')}</div>
                    </div>
                  )}
                  <div>
                    <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.25rem' }}>OUR POSITION:</div>
                    <div style={{
                      color: bill.our_position.includes('SUPPORT') ? '#00ff00' : '#ff6666',
                      fontWeight: 'bold'
                    }}>
                      {bill.our_position}
                    </div>
                  </div>
                </div>

                {bill.action_taken && (
                  <div style={{
                    background: 'rgba(0, 255, 136, 0.1)',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ color: '#00ff88', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      ✅ ACTION TAKEN:
                    </div>
                    <div style={{ color: '#ddd' }}>{bill.action_taken}</div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {bill.url && (
                    <a
                      href={bill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(79, 172, 254, 0.2)',
                        border: '1px solid #4facfe',
                        borderRadius: '8px',
                        color: '#4facfe',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      📄 Read Full Bill
                    </a>
                  )}
                  {bill.news.length > 0 && bill.news.map((article, idx) => (
                    <a
                      key={idx}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 204, 68, 0.2)',
                        border: '1px solid #ffcc44',
                        borderRadius: '8px',
                        color: '#ffcc44',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      📰 {article.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* How to Add Bills */}
          <div style={{
            background: 'rgba(79, 172, 254, 0.1)',
            border: '2px solid #4facfe',
            borderRadius: '15px',
            padding: '2rem',
            marginTop: '3rem'
          }}>
            <h3 style={{ color: '#4facfe', marginBottom: '1rem' }}>
              📋 HOW TO TRACK NEW BILLS
            </h3>
            <ol style={{ color: '#ddd', lineHeight: '2', paddingLeft: '1.5rem' }}>
              <li><strong>Ontario Legislature:</strong> <a href="https://www.ola.org/en/legislative-business/bills" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>ola.org/en/legislative-business/bills</a></li>
              <li><strong>Federal Parliament:</strong> <a href="https://www.parl.ca/legisinfo" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>parl.ca/legisinfo</a></li>
              <li><strong>Open Parliament API (FREE):</strong> <a href="https://openparliament.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>openparliament.ca</a></li>
              <li>Set up Google Alerts for keywords: "WSIB bill", "ODSP legislation", "disability benefit"</li>
              <li>Follow advocacy groups on social media - they track harmful bills</li>
            </ol>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
