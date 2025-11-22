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
    indigenous: true,
    mental_health: true,
    autism: true,
    veterans: true,
    social_justice: true,
    housing: true,
    poverty: true,
    local: true
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
      // ONTARIO PROVINCIAL BILLS
      {
        id: 'ON_BILL_124',
        jurisdiction: 'Ontario',
        level: 'Provincial',
        bill_number: 'Bill 124',
        title: 'Protecting a Sustainable Public Sector for Future Generations Act',
        status: 'Struck Down by Courts',
        threat_level: 'critical',
        description: 'Wage cap for public sector workers including nurses - ruled unconstitutional',
        introduced: '2019-06-05',
        last_action: 'Struck down November 2022',
        affects: ['nurses', 'teachers', 'public sector workers', 'disability support workers'],
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
        level: 'Provincial',
        bill_number: 'Bill 175',
        title: 'Connecting People to Home and Community Care Act',
        status: 'Active',
        threat_level: 'critical',
        description: 'Healthcare privatization - allowing for-profit home care',
        introduced: '2023-10-25',
        last_action: 'Royal Assent',
        affects: ['seniors', 'disabled', 'home care workers', 'chronically ill'],
        charter_violations: ['Section 7 - Right to Life (reduced care quality)'],
        our_position: 'OPPOSED - Privatization of healthcare',
        action_taken: 'Public opposition campaign',
        url: 'https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-175',
        news: []
      },
      {
        id: 'ON_AUTISM_PROGRAM',
        jurisdiction: 'Ontario',
        level: 'Provincial',
        bill_number: 'Watch: Autism Program',
        title: 'Ontario Autism Program Needs-Based Model',
        status: 'Watching',
        threat_level: 'critical',
        description: '50,000+ autistic children on waitlist - families wait years for support',
        introduced: null,
        last_action: 'Ongoing waitlist crisis',
        affects: ['autistic children', 'autistic adults', 'families'],
        charter_violations: ['Section 15 - Equality Rights', 'Section 7 - Right to Life'],
        our_position: 'DEMAND FULL FUNDING',
        action_taken: 'Parent advocacy groups organizing',
        url: 'https://www.ontario.ca/page/ontario-autism-program',
        news: []
      },
      {
        id: 'ON_POTENTIAL_OW_CUTS',
        jurisdiction: 'Ontario',
        level: 'Provincial',
        bill_number: 'Watch: Budget 2025',
        title: 'Ontario Works Rate Freeze (Predicted)',
        status: 'Watching',
        threat_level: 'critical',
        description: 'Ford government may freeze OW rates again - $733/month already starvation',
        introduced: null,
        last_action: 'Budget expected Spring 2025',
        affects: ['230,000 Ontario Works recipients', 'working poor', 'disabled awaiting ODSP'],
        charter_violations: ['Section 7 - Right to Life'],
        our_position: 'PRE-EMPTIVE OPPOSITION',
        action_taken: 'Monitoring, preparing campaign',
        url: null,
        news: []
      },

      // FEDERAL BILLS
      {
        id: 'FED_BILL_C35',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Bill C-35',
        title: 'Canada Disability Benefit Act',
        status: 'Passed',
        threat_level: 'medium',
        description: 'New federal disability benefit - but amount NOT YET SET (regulations pending)',
        introduced: '2021-06-22',
        last_action: 'Royal Assent June 2023',
        affects: ['all disabled Canadians', 'working-age disabled', 'ODSP/AISH recipients'],
        charter_violations: [],
        our_position: 'SUPPORT WITH CONCERNS - Amount must match poverty line',
        action_taken: 'Advocacy for adequate rates ($2,200/month minimum)',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-35',
        news: [
          { title: 'Canada Disability Benefit passes', url: 'https://www.cbc.ca/news/politics/canada-disability-benefit-1.6888888', date: '2023-06-22' }
        ]
      },
      {
        id: 'FED_BILL_C64',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Bill C-64',
        title: 'Pharmacare Act',
        status: 'Passed',
        threat_level: 'low',
        description: 'National pharmacare starting with diabetes medications and contraception',
        introduced: '2024-02-29',
        last_action: 'Royal Assent October 2024',
        affects: ['diabetics', 'chronic illness', 'all Canadians eventually'],
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
        level: 'Federal',
        bill_number: 'Bill C-22',
        title: 'Canada Dental Care Act',
        status: 'Passed',
        threat_level: 'low',
        description: 'National dental care for low-income Canadians',
        introduced: '2022-09-20',
        last_action: 'Royal Assent December 2022',
        affects: ['9 million uninsured Canadians', 'seniors', 'disabled on fixed income'],
        charter_violations: [],
        our_position: 'STRONG SUPPORT - Ends dental poverty',
        action_taken: 'NDP forced Liberal minority to act',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-22',
        news: []
      },
      {
        id: 'FED_UNDRIP',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Bill C-15',
        title: 'United Nations Declaration on the Rights of Indigenous Peoples Act',
        status: 'Passed',
        threat_level: 'medium',
        description: 'UNDRIP implementation - but water advisories continue, TRC calls ignored',
        introduced: '2020-12-03',
        last_action: 'Royal Assent June 2021',
        affects: ['Indigenous peoples', 'First Nations', 'Métis', 'Inuit'],
        charter_violations: [],
        our_position: 'SUPPORT BUT MONITORING - Implementation crucial',
        action_taken: 'Indigenous leaders watching for real action',
        url: 'https://www.parl.ca/legisinfo/en/bill/43-2/c-15',
        news: [
          { title: '33 long-term water advisories remain', url: 'https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660', date: '2024-ongoing' }
        ]
      },
      {
        id: 'FED_MENTAL_HEALTH_TRANSFER',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Watch: Mental Health Transfer',
        title: 'Federal Mental Health Transfer to Provinces',
        status: 'Watching',
        threat_level: 'high',
        description: '$198B health transfer includes mental health - but provinces spending on private care instead',
        introduced: null,
        last_action: 'Bilateral agreements signed 2023',
        affects: ['all Canadians with mental illness', 'PTSD', 'addiction'],
        charter_violations: ['Section 7 - Right to Security (inadequate access)'],
        our_position: 'DEMAND ACCOUNTABILITY - Track provincial spending',
        action_taken: 'Advocacy for public mental health expansion',
        url: 'https://www.canada.ca/en/health-canada/news/2023/02/working-together-to-improve-health-care-for-canadians.html',
        news: []
      },
      {
        id: 'FED_VETERANS_BACKLOG',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Watch: VAC Claims Processing',
        title: 'Veterans Affairs Claims Backlog Crisis',
        status: 'Watching',
        threat_level: 'critical',
        description: '36,000+ disability claims backlogged - veterans wait 2+ years while dying',
        introduced: null,
        last_action: 'Ongoing crisis',
        affects: ['veterans', 'RCMP', 'military with PTSD', 'service-related disabilities'],
        charter_violations: ['Section 7 - Right to Security', 'Section 15 - Equality'],
        our_position: 'DEMAND IMMEDIATE ACTION',
        action_taken: 'Veterans groups lobbying Parliament',
        url: 'https://www.veterans.gc.ca/eng',
        news: []
      },

      // MUNICIPAL/LOCAL BILLS
      {
        id: 'TORONTO_ENCAMPMENT_EVICTIONS',
        jurisdiction: 'Toronto',
        level: 'Municipal',
        bill_number: 'City Policy',
        title: 'Homeless Encampment Evictions',
        status: 'Active',
        threat_level: 'critical',
        description: 'Toronto forcibly evicting homeless disabled people with no housing alternatives',
        introduced: null,
        last_action: 'Ongoing evictions',
        affects: ['homeless disabled', 'mental illness', 'addiction', 'refugees'],
        charter_violations: ['Section 7 - Right to Life', 'Section 15 - Equality'],
        our_position: 'OPPOSED - Housing first, not enforcement',
        action_taken: 'Legal challenges, direct support',
        url: 'https://www.toronto.ca/community-people/community-partners/emergency-shelter-operators/homelessness-help-for-agencies-workers/encampment-support/',
        news: []
      },
      {
        id: 'OTTAWA_ACCESSIBLE_TRANSIT',
        jurisdiction: 'Ottawa',
        level: 'Municipal',
        bill_number: 'Watch: LRT Accessibility',
        title: 'OC Transpo LRT Elevator Failures',
        status: 'Watching',
        threat_level: 'high',
        description: 'Chronic elevator breakdowns trap wheelchair users - AODA violations',
        introduced: null,
        last_action: 'Ongoing accessibility crisis',
        affects: ['wheelchair users', 'mobility disabilities', 'seniors'],
        charter_violations: ['Section 15 - Equality Rights'],
        our_position: 'DEMAND COMPLIANCE - AODA enforcement',
        action_taken: 'Disability advocacy complaints',
        url: 'https://www.octranspo.com/en/plan-your-trip/accessibility/',
        news: []
      },
      {
        id: 'HAMILTON_SOCIAL_HOUSING',
        jurisdiction: 'Hamilton',
        level: 'Municipal',
        bill_number: 'Watch: Social Housing Waitlist',
        title: 'Hamilton Social Housing 10-Year Wait',
        status: 'Watching',
        threat_level: 'critical',
        description: '6,500+ families waiting for affordable housing - disabled prioritized but still wait years',
        introduced: null,
        last_action: 'Waitlist growing',
        affects: ['disabled on ODSP', 'families', 'seniors', 'working poor'],
        charter_violations: ['Section 7 - Right to Life'],
        our_position: 'DEMAND FUNDING - Build public housing',
        action_taken: 'Housing advocacy coalition',
        url: 'https://www.hamilton.ca/home-property-and-development/housing/social-housing-wait-list',
        news: []
      },

      // CROSS-JURISDICTIONAL ISSUES
      {
        id: 'WATCH_DISABILITY_TAX_CREDIT',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Watch: DTC Rejections',
        title: 'Disability Tax Credit 40% Denial Rate',
        status: 'Watching',
        threat_level: 'high',
        description: 'CRA rejecting 40% of legitimate DTC applications - systemic barrier to benefits',
        introduced: null,
        last_action: 'Ongoing crisis',
        affects: ['all disabled Canadians', 'chronic illness', 'mental health conditions'],
        charter_violations: ['Section 15 - Equality Rights'],
        our_position: 'DEMAND REFORM - Auto-approve from doctors',
        action_taken: 'Advocacy for legislative change',
        url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html',
        news: []
      },
      {
        id: 'WATCH_MAID_EXPANSION',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Bill C-7 / C-39',
        title: 'Medical Assistance in Dying (MAiD) Expansion',
        status: 'Active',
        threat_level: 'critical',
        description: 'MAiD offered to disabled people denied proper support - poverty-driven deaths',
        introduced: '2021-02-24',
        last_action: 'Mental illness expansion delayed to 2027',
        affects: ['disabled Canadians', 'mental illness', 'chronic pain', 'veterans'],
        charter_violations: ['Section 7 - Right to Life', 'Section 15 - Equality'],
        our_position: 'CRITICAL CONCERN - Support first, not death',
        action_taken: 'UN investigation, disability rights advocacy',
        url: 'https://www.justice.gc.ca/eng/cj-jp/ad-am/bk-di.html',
        news: [
          { title: 'UN investigates Canada MAiD deaths', url: 'https://www.ohchr.org/en/press-releases/2023/01/un-experts-alarmed-normalisation-medically-assisted-dying-persons', date: '2023-01' }
        ]
      },
      {
        id: 'WATCH_INDIGENOUS_CHILD_WELFARE',
        jurisdiction: 'Federal',
        level: 'Federal',
        bill_number: 'Bill C-92',
        title: 'Act respecting First Nations, Inuit and Métis children, youth and families',
        status: 'Passed',
        threat_level: 'medium',
        description: 'Indigenous child welfare reform - but underfunding continues, kids still apprehended',
        introduced: '2019-02-28',
        last_action: 'Royal Assent June 2019',
        affects: ['Indigenous children', 'Indigenous families', 'survivors of Sixties Scoop'],
        charter_violations: [],
        our_position: 'SUPPORT BUT MONITORING - Full funding required',
        action_taken: 'Indigenous communities demanding resources',
        url: 'https://www.parl.ca/legisinfo/en/bill/42-1/c-92',
        news: []
      }
    ];
  }

  const filteredBills = activeBills.filter(bill => {
    const description = bill.description.toLowerCase();
    const affects = bill.affects.join(' ').toLowerCase();
    const title = bill.title.toLowerCase();
    
    if (alertFilters.wsib && (description.includes('wsib') || affects.includes('worker') || affects.includes('workplace'))) return true;
    if (alertFilters.odsp && (description.includes('odsp') || description.includes('ontario works'))) return true;
    if (alertFilters.disability && (affects.includes('disabled') || description.includes('disability') || affects.includes('chronic illness') || affects.includes('wheelchair'))) return true;
    if (alertFilters.healthcare && (description.includes('health') || description.includes('care') || description.includes('hospital') || description.includes('pharmacare') || description.includes('dental'))) return true;
    if (alertFilters.indigenous && (affects.includes('indigenous') || affects.includes('first nations') || affects.includes('métis') || affects.includes('inuit'))) return true;
    if (alertFilters.mental_health && (affects.includes('mental illness') || affects.includes('ptsd') || affects.includes('addiction') || description.includes('mental health'))) return true;
    if (alertFilters.autism && (affects.includes('autistic') || description.includes('autism'))) return true;
    if (alertFilters.veterans && (affects.includes('veterans') || affects.includes('military') || affects.includes('rcmp'))) return true;
    if (alertFilters.social_justice && (description.includes('poverty') || description.includes('eviction') || affects.includes('homeless') || affects.includes('working poor'))) return true;
    if (alertFilters.housing && (description.includes('housing') || description.includes('shelter') || affects.includes('homeless'))) return true;
    if (alertFilters.poverty && (description.includes('poverty') || description.includes('low-income') || description.includes('waitlist'))) return true;
    if (alertFilters.local && bill.level === 'Municipal') return true;
    
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
            <div style={{
              background: 'rgba(138, 43, 226, 0.1)',
              border: '2px solid #8a2be2',
              borderRadius: '15px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#8a2be2', fontWeight: 'bold' }}>
                {activeBills.filter(b => b.level === 'Municipal').length}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>LOCAL ISSUES</div>
            </div>
            <div style={{
              background: 'rgba(255, 105, 180, 0.1)',
              border: '2px solid #ff69b4',
              borderRadius: '15px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#ff69b4', fontWeight: 'bold' }}>
                {activeBills.filter(b => b.affects.some(a => a.includes('Indigenous') || a.includes('First Nations') || a.includes('Métis') || a.includes('Inuit'))).length}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>INDIGENOUS RIGHTS</div>
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
                        {bill.jurisdiction} • {bill.level}
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
              📋 HOW TO TRACK NEW BILLS - ALL LEVELS OF GOVERNMENT
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#00ff88', marginBottom: '0.75rem' }}>🏛️ FEDERAL LEVEL</h4>
              <ul style={{ color: '#ddd', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li><strong>Federal Parliament Bills:</strong> <a href="https://www.parl.ca/legisinfo" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>parl.ca/legisinfo</a></li>
                <li><strong>Open Parliament API (FREE):</strong> <a href="https://openparliament.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>openparliament.ca</a></li>
                <li><strong>Indigenous Services Canada:</strong> <a href="https://www.sac-isc.gc.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>sac-isc.gc.ca</a></li>
                <li><strong>Veterans Affairs:</strong> <a href="https://www.veterans.gc.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>veterans.gc.ca</a></li>
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#00ff88', marginBottom: '0.75rem' }}>🏛️ PROVINCIAL LEVEL (Ontario)</h4>
              <ul style={{ color: '#ddd', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li><strong>Ontario Legislature:</strong> <a href="https://www.ola.org/en/legislative-business/bills" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>ola.org/en/legislative-business/bills</a></li>
                <li><strong>ODSP Policy Updates:</strong> <a href="https://www.mcss.gov.on.ca/en/mcss/programs/social/odsp/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>mcss.gov.on.ca/odsp</a></li>
                <li><strong>WSIB Policy Changes:</strong> <a href="https://www.wsib.ca/en/law-and-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>wsib.ca/law-and-policy</a></li>
                <li><strong>Ontario Autism Program:</strong> <a href="https://www.ontario.ca/page/ontario-autism-program" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>ontario.ca/page/ontario-autism-program</a></li>
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#00ff88', marginBottom: '0.75rem' }}>🏛️ MUNICIPAL/LOCAL LEVEL</h4>
              <ul style={{ color: '#ddd', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li><strong>Toronto City Council:</strong> <a href="https://www.toronto.ca/city-government/council/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>toronto.ca/city-government/council</a></li>
                <li><strong>Ottawa City Council:</strong> <a href="https://ottawa.ca/en/city-hall/city-council" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>ottawa.ca/city-hall/city-council</a></li>
                <li><strong>Hamilton City Council:</strong> <a href="https://www.hamilton.ca/city-council" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe' }}>hamilton.ca/city-council</a></li>
                <li><strong>Your Municipal Website:</strong> Search "[your city] council meetings agenda"</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#00ff88', marginBottom: '0.75rem' }}>🔔 MONITORING STRATEGIES</h4>
              <ul style={{ color: '#ddd', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li>Set up <strong>Google Alerts</strong> for keywords: "WSIB bill", "ODSP legislation", "disability benefit", "autism funding", "Indigenous rights", "homeless evictions"</li>
                <li>Follow advocacy groups on social media: <strong>ODSP Action Coalition</strong>, <strong>ARCH Disability Law Centre</strong>, <strong>Income Security Advocacy Centre</strong></li>
                <li>Join Reddit communities: <strong>r/ODSP</strong>, <strong>r/Disability_Survey</strong>, <strong>r/OntarioWorks</strong>, <strong>r/IndigenousCanada</strong></li>
                <li>Attend local city council meetings (most have accessibility accommodations and virtual options)</li>
                <li>Subscribe to <strong>Ontario Hansard</strong> email alerts for legislative transcripts</li>
                <li>Monitor <strong>CanLII</strong> for court decisions striking down discriminatory laws</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
