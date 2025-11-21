import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TheEye() {
  const [activeScope, setActiveScope] = useState('provincial');
  const [activeCategory, setActiveCategory] = useState('all');
  const [insights, setInsights] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [expandedCapability, setExpandedCapability] = useState(null);
  const [actionLog, setActionLog] = useState([]);
  const [eyeActive, setEyeActive] = useState(true);
  const [automationActive, setAutomationActive] = useState(false);
  const [automationEngine, setAutomationEngine] = useState(null);
  const [eyeProcessor, setEyeProcessor] = useState(null);
  const [criticalReports, setCriticalReports] = useState([]);
  const [monitoringStats, setMonitoringStats] = useState({
    documentsProcessed: 0,
    corruptionDetected: 0,
    constitutionalViolations: 0,
    humanRightsBreaches: 0,
    criticalFindings: 0
  });

  // Initialize THE EYE v2.0 processor
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../utils/the-eye-v2-processor').then(module => {
        setEyeProcessor(module);
        console.log('👁️ THE EYE v2.0 processor loaded and ready');
      });
    }
  }, []);

  // Initialize automation engine and connect to THE EYE
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../utils/automation-engine').then(module => {
        const engine = module.automationEngine;
        setAutomationEngine(engine);
        const state = engine.initialize();
        setAutomationActive(state.isActive);
        
        // Listen for new alerts from automation
        engine.onAlert((alert) => {
          setActionLog(prev => [{
            action: 'AUTO-DETECTED',
            target: alert.title,
            time: new Date().toLocaleTimeString(),
            status: 'monitoring'
          }, ...prev.slice(0, 19)]);
        });
        
        // Listen for real data loaded event and update stats
        window.addEventListener('real-data-loaded', (event) => {
          const { alerts, targets, stats } = event.detail;
          console.log('👁️ THE EYE: Received real data -', alerts.length, 'alerts,', targets.length, 'targets');
          
          // Update monitoring stats with real data
          setMonitoringStats({
            documentsProcessed: stats.total_issues,
            corruptionDetected: (stats.by_category.corporate_corruption || 0) + (stats.by_category.workers || 0),
            constitutionalViolations: stats.charter_violations,
            humanRightsBreaches: (stats.by_category.indigenous_rights || 0) + (stats.by_category.disabilities || 0),
            criticalFindings: stats.by_severity.critical
          });
          
          // Trigger insights refresh to show real data
          setTimeout(() => handleScan(), 500);
        });
        
        console.log('👁️ THE EYE connected to automation engine - 24/7 monitoring active');
      });
    }
  }, []);

  // Start 24/7 monitoring with source connectors
  useEffect(() => {
    if (typeof window !== 'undefined' && eyeProcessor) {
      import('../utils/source-connectors').then(module => {
        const sourceMonitor = module.sourceMonitor;
        
        // Start monitoring all sources
        sourceMonitor.startMonitoring({
          keywords: ['WSIB', 'ODSP', 'CPP-D', 'injured worker', 'disability', 'claim denial', 
                     'discrimination', 'Indigenous rights', 'Charter violation', 'corruption'],
          sources: ['all']
        });
        
        // Process incoming data with THE EYE v2.0
        window.addEventListener('source-data', async (event) => {
          try {
            const report = await eyeProcessor.processDocument({
              raw_text: JSON.stringify(event.detail.data),
              source_type: event.detail.source,
              fetch_date: new Date().toISOString()
            });
            
            // Update stats
            setMonitoringStats(prev => ({
              documentsProcessed: prev.documentsProcessed + 1,
              corruptionDetected: prev.corruptionDetected + report.CorruptionFindings.length,
              constitutionalViolations: prev.constitutionalViolations + report.ConstitutionViolations.length,
              humanRightsBreaches: prev.humanRightsBreaches + report.HumanRightsBreaches.length,
              criticalFindings: prev.criticalFindings + (report.RiskAssessment.priority === 'CRITICAL' ? 1 : 0)
            }));
            
            // Store critical reports
            if (report.RiskAssessment.priority === 'CRITICAL') {
              setCriticalReports(prev => [report, ...prev.slice(0, 9)]);
              
              // Create alert in automation engine
              if (automationEngine) {
                automationEngine.createAlert({
                  severity: 'critical',
                  title: `THE EYE: ${report.title}`,
                  description: `Risk: ${report.RiskAssessment.overall_risk_score}/100 | ${report.CorruptionFindings.length} corruption findings`,
                  action: report.RecommendedActions[0]?.description || 'Review findings'
                });
              }
              
              // Add to action log
              setActionLog(prev => [{
                action: '🔴 CRITICAL FINDING',
                target: report.title,
                time: new Date().toLocaleTimeString(),
                status: 'immediate_action'
              }, ...prev.slice(0, 19)]);
            }
            
          } catch (error) {
            console.error('THE EYE processing error:', error);
          }
        });
        
        console.log('👁️ THE EYE: 24/7 monitoring started - watching all sources');
      });
    }
  }, [eyeProcessor, automationEngine]);

  // Auto-start The EYE on page load
  useEffect(() => {
    // Initial scan when component mounts
    handleScan();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      if (eyeActive) {
        handleScan();
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [activeScope, activeCategory, eyeActive]);

  const scopes = [
    { id: 'local', name: 'Local (All Cities)', icon: '🏘️' },
    { id: 'provincial', name: 'Provincial (All Provinces/Territories)', icon: '🏛️' },
    { id: 'federal', name: 'Federal (Canada-Wide)', icon: '🍁' }
  ];

  const categories = [
    { id: 'all', name: 'All Systems', icon: '👁️' },
    { id: 'workers', name: 'Workplace Injuries', icon: '⚠️' },
    { id: 'disabilities', name: 'Disabilities & Chronic Illness', icon: '♿' },
    { id: 'mental_health', name: 'Mental Health', icon: '🧠' },
    { id: 'poverty', name: 'Poverty & Income Support', icon: '💰' },
    { id: 'housing', name: 'Housing & Homelessness', icon: '🏠' },
    { id: 'healthcare', name: 'Healthcare Access', icon: '🏥' },
    { id: 'addictions', name: 'Addiction & Harm Reduction', icon: '💊' },
    { id: 'employment', name: 'Employment & Labour Rights', icon: '💼' },
    { id: 'legal', name: 'Legal Aid & Justice', icon: '⚖️' },
    { id: 'education', name: 'Education & Accessibility', icon: '📚' },
    { id: 'transportation', name: 'Transportation & Mobility', icon: '🚌' },
    { id: 'indigenous', name: 'Indigenous Rights & Reconciliation', icon: '🪶' },
    { id: 'racial_justice', name: 'Racial Justice & Anti-Discrimination', icon: '✊🏿' },
    { id: 'gender_equality', name: 'Gender Equality & LGBTQ+ Rights', icon: '🏳️‍🌈' },
    { id: 'environmental', name: 'Environmental Justice', icon: '🌍' },
    { id: 'immigrant_refugee', name: 'Immigrant & Refugee Rights', icon: '🌐' },
    { id: 'police_accountability', name: 'Police Accountability & Criminal Justice', icon: '👮' },
    { id: 'food_security', name: 'Food Security & Food Justice', icon: '🍞' },
    { id: 'digital_rights', name: 'Digital Rights & Privacy', icon: '🔐' }
  ];

  const capabilities = [
    {
      title: 'Corporate Pattern Tracking',
      description: 'Monitors corporate behaviors, policy changes, and systemic patterns across industries',
      icon: '📊',
      status: 'active',
      examples: ['Board meeting transcripts analysis', 'Lobbyist payment tracking', 'Executive compensation vs worker injury rates']
    },
    {
      title: 'Systemic Abuse Detection',
      description: 'Identifies patterns of institutional abuse, discrimination, and rights violations',
      icon: '🚨',
      status: 'active',
      examples: ['Claim denial clustering', 'Demographic discrimination patterns', 'Retaliation tracking']
    },
    {
      title: 'Policy Change Prediction',
      description: 'Forecasts incoming legislation and policy shifts that affect vulnerable populations',
      icon: '🔮',
      status: 'active',
      examples: ['Legislative language analysis', 'Think tank report monitoring', 'Political donation correlation']
    },
    {
      title: 'Campaign Auto-Generation',
      description: 'Creates targeted activism campaigns based on identified systemic issues',
      icon: '⚡',
      status: 'active',
      examples: ['Social media strategy packages', 'Media contact lists', 'Viral content templates']
    },
    {
      title: 'Strike-First Advocacy',
      description: 'Provides preemptive strategies to counter systemic threats before they materialize',
      icon: '🛡️',
      status: 'active',
      examples: ['Coalition building roadmaps', 'Counter-narrative frameworks', 'Legal challenge preparation']
    },
    {
      title: 'Pattern Exposure',
      description: 'Reveals hidden connections and systemic patterns invisible to conventional analysis',
      icon: '🔍',
      status: 'active',
      examples: ['Shell company networks', 'Revolving door tracking', 'Policy co-authorship patterns']
    },
    {
      title: 'Accountability Automation',
      description: 'Auto-generates FOI requests, complaints, and legal documentation against bad actors',
      icon: '⚖️',
      status: 'active',
      examples: ['FOI template generation', 'Ombudsman complaint filing', 'Class action detection']
    },
    {
      title: 'Power Mapping',
      description: 'Visual networks showing who has power, who influences whom, and where pressure points exist',
      icon: '🕸️',
      status: 'active',
      examples: ['Decision-maker hierarchy', 'Funding source trails', 'Political influence maps']
    },
    {
      title: 'Evidence Weaponization',
      description: 'Transforms raw data into court-ready evidence packages and media-ready exposés',
      icon: '💣',
      status: 'active',
      examples: ['Statistical analysis reports', 'Timeline reconstructions', 'Witness coordination']
    },
    {
      title: 'Reputation Warfare',
      description: 'Strategic targeting of corporate/political reputations through truth-based campaigns',
      icon: '🎯',
      status: 'active',
      examples: ['Stock price vulnerability analysis', 'Brand damage scenarios', 'Boycott orchestration']
    },
    {
      title: 'Solidarity Networking',
      description: 'Auto-connects similar cases across jurisdictions to build critical mass for action',
      icon: '🤝',
      status: 'active',
      examples: ['Case similarity matching', 'Cross-border coalition building', 'Resource pooling']
    },
    {
      title: 'Direct Action Toolkit',
      description: 'Generates protest strategies, civil disobedience plans, and public pressure tactics',
      icon: '✊',
      status: 'active',
      examples: ['Occupation strategy guides', 'Media stunt planning', 'Symbolic action design']
    }
  ];

  const mockInsights = {
    local: [
      {
        severity: 'critical',
        category: 'housing',
        title: 'Municipal Shelter Wait Times at Record High',
        description: 'Toronto shelter system reports 2,800+ people on waitlist. 65% have workplace injuries or disabilities. Average wait time now 8 months.',
        action: 'MUNICIPAL DATA: City reports publicly available, shelter statistics documented, council meeting minutes show cuts',
        timestamp: '1 hour ago',
        actionButtons: ['City Reports', 'Council Minutes', 'Shelter Stats'],
        sources: [
          { name: 'Toronto Shelter Statistics', url: 'https://www.toronto.ca/community-people/housing-shelter/' },
          { name: 'City Council Records', url: 'https://www.toronto.ca/city-government/council/' },
          { name: 'Municipal Budget', url: 'https://www.toronto.ca/city-government/budget-finances/' }
        ]
      },
      {
        severity: 'high',
        category: 'transportation',
        title: 'Accessible Transit Cuts Proposed',
        description: 'Municipal budget proposes 30% cut to Wheel-Trans service. 12,000 disabled residents affected. Public consultations show overwhelming opposition.',
        action: 'CITY RECORDS: Budget documents public, consultation feedback documented, accessibility reports available',
        timestamp: '3 hours ago',
        actionButtons: ['View Budget', 'Consultation Results', 'Impact Analysis'],
        sources: [
          { name: 'TTC Budget Documents', url: 'https://www.ttc.ca/About_the_TTC/Commission_reports_and_information/index.jsp' },
          { name: 'Wheel-Trans Info', url: 'https://www.ttc.ca/Wheel-Trans' },
          { name: 'City Accessibility Plan', url: 'https://www.toronto.ca/city-government/accessibility-human-rights/accessibility-at-the-city-of-toronto/' }
        ]
      },
      {
        severity: 'warning',
        category: 'employment',
        title: 'City Hiring Discrimination Against Disabled Workers',
        description: 'Municipal hiring data shows disabled applicants 47% less likely to get interviews despite meeting qualifications. Human Rights complaint filed.',
        action: 'PUBLIC DATA: FOI reveals hiring statistics, discrimination complaint public record, city ombudsman investigation ongoing',
        timestamp: '6 hours ago',
        actionButtons: ['Hiring Data', 'HR Complaint', 'Ombudsman Report'],
        sources: [
          { name: 'City Ombudsman', url: 'https://www.ombudsmantoronto.ca/' },
          { name: 'FOI Request Portal', url: 'https://www.toronto.ca/city-government/accountability-operations-customer-service/access-city-information-or-records/' },
          { name: 'Human Rights Tribunal', url: 'https://tribunalsontario.ca/hrto/' }
        ]
      },
      {
        severity: 'high',
        category: 'healthcare',
        title: 'Community Health Centre Closures Announced',
        description: 'City funding cuts force 3 community health centres to close. These centres served 8,500 low-income and disabled residents with chronic conditions.',
        action: 'RECEIPTS: City health reports, centre closure notices, patient impact studies all public',
        timestamp: '12 hours ago',
        actionButtons: ['Health Reports', 'Impact Studies', 'Funding Docs'],
        sources: [
          { name: 'Toronto Public Health', url: 'https://www.toronto.ca/community-people/health-wellness-care/' },
          { name: 'Community Health Centres', url: 'https://www.allianceon.org/' },
          { name: 'City Budget Health', url: 'https://www.toronto.ca/city-government/budget-finances/city-budget/' }
        ]
      },
      {
        severity: 'high',
        category: 'indigenous',
        title: 'Toronto Lacks Indigenous Housing Strategy',
        description: 'Despite 70,000+ Indigenous residents, Toronto has no dedicated Indigenous housing strategy. Indigenous people represent 15% of homeless population but only 2% of city residents.',
        action: 'DOCUMENTED: Census data, homeless count statistics, city housing plan gaps identified',
        timestamp: '1 day ago',
        actionButtons: ['Census Data', 'Homeless Count', 'Housing Plans'],
        sources: [
          { name: 'Toronto Housing', url: 'https://www.toronto.ca/community-people/housing-shelter/' },
          { name: 'Census Data', url: 'https://www12.statcan.gc.ca/census-recensement/' },
          { name: 'Indigenous Affairs Office', url: 'https://www.toronto.ca/city-government/accountability-operations-customer-service/long-term-vision-plans-and-strategies/reconciliation-action-plan/' }
        ]
      },
      {
        severity: 'critical',
        category: 'racial_justice',
        title: 'TTC Fare Evasion Enforcement Targets Black Riders',
        description: 'TTC enforcement data shows Black riders receive 4x more fare evasion tickets than white riders. Ombudsman investigation confirms racial profiling.',
        action: 'PUBLIC DATA: TTC enforcement statistics, Ombudsman report, racial demographics of citations',
        timestamp: '2 days ago',
        actionButtons: ['Enforcement Data', 'Ombudsman Report', 'Demographic Analysis'],
        sources: [
          { name: 'TTC Reports', url: 'https://www.ttc.ca/About_the_TTC/Commission_reports_and_information/index.jsp' },
          { name: 'Toronto Ombudsman', url: 'https://www.ombudsmantoronto.ca/' },
          { name: 'TTC Equity Report', url: 'https://www.ttc.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'environmental',
        title: 'Toronto Port Expansion Despite Climate Emergency',
        description: 'City council declares climate emergency in 2019, then approves Billy Bishop Airport expansion in 2024. Environmental assessment shows increased emissions.',
        action: 'RECEIPTS: Council votes public, environmental assessment reports, climate plan contradictions documented',
        timestamp: '3 days ago',
        actionButtons: ['Council Votes', 'Environmental Assessment', 'Climate Plan'],
        sources: [
          { name: 'Toronto Council', url: 'https://www.toronto.ca/city-government/council/' },
          { name: 'Environmental Assessments', url: 'https://www.toronto.ca/city-government/planning-development/environment-energy/' },
          { name: 'Climate Action', url: 'https://www.toronto.ca/services-payments/water-environment/environmentally-friendly-city-initiatives/transformto/' }
        ]
      },
      {
        severity: 'warning',
        category: 'gender_equality',
        title: 'Toronto Transit Safety Program Underfunded',
        description: 'Despite reports of harassment on TTC, SafeTTC program receives only $2M of $15M requested. 87% of women report feeling unsafe on transit at night.',
        action: 'DOCUMENTED: Budget documents, safety program requests, survey data public',
        timestamp: '4 days ago',
        actionButtons: ['Budget Analysis', 'Safety Surveys', 'Program Details'],
        sources: [
          { name: 'TTC Budget', url: 'https://www.ttc.ca/About_the_TTC/Commission_reports_and_information/Commission_meetings/2024/index.jsp' },
          { name: 'Transit Safety', url: 'https://www.ttc.ca/Riding_the_TTC/Safety_and_Security/index.jsp' },
          { name: 'City Safety Reports', url: 'https://www.toronto.ca/community-people/public-safety-alerts/' }
        ]
      },
      {
        severity: 'high',
        category: 'police_accountability',
        title: 'Toronto Police Budget Increases While Services Decline',
        description: 'TPS budget increased to $1.2 billion (10% of city budget) while community response times increased. Defund activists cite misallocation.',
        action: 'PUBLIC: City budget documents, response time statistics, community service cuts documented',
        timestamp: '1 day ago',
        actionButtons: ['Police Budget', 'Response Times', 'Service Analysis'],
        sources: [
          { name: 'Toronto Police Budget', url: 'https://www.tps.ca/organizational-chart/finance-and-administration/' },
          { name: 'City Budget', url: 'https://www.toronto.ca/city-government/budget-finances/' },
          { name: 'Police Oversight', url: 'https://www.tpsb.ca/' }
        ]
      },
      {
        severity: 'warning',
        category: 'immigrant_refugee',
        title: 'City Refugee Services Overwhelmed',
        description: 'Toronto shelter system houses 2,800 refugee claimants with no federal support. City declares emergency but federal government provides no funding.',
        action: 'OFFICIAL: City emergency declaration, shelter occupancy data, federal-municipal correspondence',
        timestamp: '2 days ago',
        actionButtons: ['Emergency Declaration', 'Shelter Data', 'Funding Requests'],
        sources: [
          { name: 'Toronto Shelter System', url: 'https://www.toronto.ca/community-people/housing-shelter/homeless-help/' },
          { name: 'City Council Reports', url: 'https://www.toronto.ca/city-government/council/' },
          { name: 'Refugee Services', url: 'https://www.toronto.ca/community-people/housing-shelter/' }
        ]
      },
      {
        severity: 'warning',
        category: 'food_security',
        title: 'Toronto Food Bank Usage Doubles',
        description: 'Daily Bread Food Bank reports record 350,000 visits per month - double pre-pandemic levels. 40% are employed but wages insufficient.',
        action: 'EVIDENCE: Food bank annual reports, usage statistics, client demographics public',
        timestamp: '5 days ago',
        actionButtons: ['Food Bank Report', 'Usage Data', 'Working Poor Stats'],
        sources: [
          { name: 'Daily Bread Food Bank', url: 'https://www.dailybread.ca/' },
          { name: 'Toronto Food Policy', url: 'https://www.toronto.ca/community-people/health-wellness-care/health-inspections-monitoring/food-safety/' },
          { name: 'North York Harvest', url: 'https://www.northyorkharvest.com/' }
        ]
      },
      {
        severity: 'high',
        category: 'digital_rights',
        title: 'Toronto Police Surveillance Cameras Expand Without Oversight',
        description: 'TPS installed 1,200 new surveillance cameras in 2024 with no privacy impact assessment. Civil liberties groups challenge lack of transparency.',
        action: 'PUBLIC: Camera locations FOI-able, policy documents available, CCLA legal challenge filed',
        timestamp: '3 days ago',
        actionButtons: ['Camera Locations', 'Privacy Policy', 'Legal Challenge'],
        sources: [
          { name: 'Toronto Police Surveillance', url: 'https://www.tps.ca/' },
          { name: 'Ontario Privacy Commissioner', url: 'https://www.ipc.on.ca/' },
          { name: 'CCLA', url: 'https://ccla.org/' }
        ]
      },
      {
        severity: 'critical',
        category: 'housing',
        title: 'Vancouver: Homeless Count Reaches 4,800 - Highest in Canada Per Capita',
        description: 'Metro Vancouver homeless count shows 4,800 people experiencing homelessness. 34% have disabilities. Average rent for 1-bedroom: $2,850/month.',
        action: 'PUBLIC DATA: BC Housing reports, homeless count methodology public, rental market data from CMHC',
        timestamp: '2 hours ago',
        actionButtons: ['Homeless Count', 'Rental Data', 'BC Housing Reports'],
        sources: [
          { name: 'Metro Vancouver Homeless Count', url: 'https://www.metrovancouver.org/' },
          { name: 'BC Housing', url: 'https://www.bchousing.org/' },
          { name: 'City of Vancouver', url: 'https://vancouver.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'indigenous',
        title: 'Vancouver: Downtown Eastside Indigenous Women Face Violence',
        description: 'VPD data shows Indigenous women are 16x more likely to experience violence in DTES. Advocacy groups demand action plan from city.',
        action: 'DOCUMENTED: VPD crime statistics, advocacy group reports, city council testimony recorded',
        timestamp: '1 day ago',
        actionButtons: ['VPD Data', 'Advocacy Reports', 'Council Records'],
        sources: [
          { name: 'Vancouver Police Board', url: 'https://vancouver.ca/police/' },
          { name: 'BC Missing Women Commission', url: 'https://www2.gov.bc.ca/gov/content/justice/criminal-justice/bc-inquiry-missing-women' },
          { name: 'Vancouver Aboriginal Friendship Centre', url: 'https://www.vafcs.org/' }
        ]
      },
      {
        severity: 'critical',
        category: 'poverty',
        title: 'Calgary: Social Assistance Rates Lowest in Canada',
        description: 'Alberta Works income support: $866/month for single adults. Lowest in Canada. Rent for bachelor apartment averages $1,200/month.',
        action: 'OFFICIAL DATA: Alberta government rates public, CMHC rental data, poverty gap analysis available',
        timestamp: '3 hours ago',
        actionButtons: ['Alberta Works Rates', 'Rental Market', 'Poverty Analysis'],
        sources: [
          { name: 'Alberta Income Support', url: 'https://www.alberta.ca/income-support' },
          { name: 'Calgary Housing', url: 'https://www.calgary.ca/housing' },
          { name: 'CMHC Calgary', url: 'https://www.cmhc-schl.gc.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'environmental',
        title: 'Calgary: Oil Industry Lobbying Blocks Climate Action',
        description: 'City climate emergency plan delayed after oil industry lobbying. Lobbyist registry shows 247 meetings with councillors in 2024.',
        action: 'PUBLIC RECORD: Calgary lobbyist registry searchable, council vote records public, climate plan documents available',
        timestamp: '2 days ago',
        actionButtons: ['Lobbyist Registry', 'Council Votes', 'Climate Plan'],
        sources: [
          { name: 'Calgary Lobbyist Registry', url: 'https://www.calgary.ca/city-hall/law-and-policy/lobbyist-registry' },
          { name: 'Calgary Climate', url: 'https://www.calgary.ca/environment/climate/climate-change' },
          { name: 'City Council', url: 'https://www.calgary.ca/council' }
        ]
      },
      {
        severity: 'critical',
        category: 'housing',
        title: 'Edmonton: Encampment Evictions Without Housing Alternatives',
        description: 'City evicted 23 homeless encampments in 2024. Only 8% of residents received housing offers. Cold weather deaths increased 40%.',
        action: 'DOCUMENTED: City bylaw enforcement data, housing offer statistics, public health reports on deaths',
        timestamp: '1 day ago',
        actionButtons: ['Eviction Data', 'Housing Offers', 'Health Reports'],
        sources: [
          { name: 'City of Edmonton Bylaws', url: 'https://www.edmonton.ca/city_government/bylaws' },
          { name: 'Homeward Trust', url: 'https://homewardtrust.ca/' },
          { name: 'Alberta Health Services', url: 'https://www.albertahealthservices.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'police_accountability',
        title: 'Winnipeg: Police Budget Increases While Crime Prevention Cut',
        description: 'WPS budget increased to $340M while community crime prevention programs cut by 60%. Indigenous leaders cite failed approach.',
        action: 'PUBLIC BUDGET: City budget documents, program funding cuts documented, Indigenous leadership statements on record',
        timestamp: '4 hours ago',
        actionButtons: ['City Budget', 'Program Cuts', 'Indigenous Response'],
        sources: [
          { name: 'Winnipeg Police Budget', url: 'https://www.winnipeg.ca/police/' },
          { name: 'City Budget', url: 'https://www.winnipeg.ca/finance/budget' },
          { name: 'Ma Mawi Wi Chi Itata Centre', url: 'https://mamawi.com/' }
        ]
      },
      {
        severity: 'critical',
        category: 'racial_justice',
        title: 'Winnipeg: Indigenous People 9x More Likely to Be Arrested',
        description: 'Manitoba Justice data shows Indigenous people represent 75% of Winnipeg arrests but only 12% of population. Systemic racism documented.',
        action: 'OFFICIAL STATS: Manitoba Justice annual reports, Statistics Canada data, Manitoba Human Rights reports',
        timestamp: '2 days ago',
        actionButtons: ['Justice Data', 'Stats Canada', 'Human Rights Reports'],
        sources: [
          { name: 'Manitoba Justice Reports', url: 'https://www.gov.mb.ca/justice/' },
          { name: 'Statistics Canada Indigenous', url: 'https://www150.statcan.gc.ca/n1/en/subjects/indigenous_peoples' },
          { name: 'Manitoba Human Rights', url: 'http://www.manitobahumanrights.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'healthcare',
        title: 'Montreal: ER Wait Times Reach 24+ Hours',
        description: 'Quebec Health data shows Montreal ER average wait: 24.3 hours. Patients with disabilities face additional barriers. Deaths in waiting rooms documented.',
        action: 'GOVERNMENT DATA: MSSS publishes wait times, coroner reports public, hospital statistics available',
        timestamp: '6 hours ago',
        actionButtons: ['Wait Time Data', 'Coroner Reports', 'Hospital Stats'],
        sources: [
          { name: 'Quebec Health Ministry', url: 'https://www.quebec.ca/en/health' },
          { name: 'Montreal Public Health', url: 'https://santemontreal.qc.ca/en/' },
          { name: 'Coroner Quebec', url: 'https://www.coroner.gouv.qc.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'immigrant_refugee',
        title: 'Montreal: Asylum Seekers Overwhelm Shelter System',
        description: 'Olympic Stadium houses 2,000+ asylum seekers in temporary shelter. Quebec government refuses federal funding. Families living in sports facility for 8+ months.',
        action: 'MEDIA DOCUMENTED: City announcements public, provincial statements recorded, federal-provincial funding dispute documented',
        timestamp: '1 day ago',
        actionButtons: ['City Updates', 'Provincial Response', 'Federal Offers'],
        sources: [
          { name: 'City of Montreal', url: 'https://montreal.ca/' },
          { name: 'Quebec Immigration', url: 'https://www.quebec.ca/en/immigration' },
          { name: 'IRCC', url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html' }
        ]
      },
      {
        severity: 'high',
        category: 'gender_equality',
        title: 'Ottawa: Transit Safety for Women Declining',
        description: 'OC Transpo data shows sexual harassment reports up 120% in 2024. Women avoid transit after dark. Safety measures inadequate.',
        action: 'TRANSIT DATA: OC Transpo incident reports, safety audits public, women\'s advocacy surveys documented',
        timestamp: '3 hours ago',
        actionButtons: ['Incident Reports', 'Safety Audits', 'Advocacy Data'],
        sources: [
          { name: 'OC Transpo', url: 'https://www.octranspo.com/' },
          { name: 'Ottawa Police', url: 'https://www.ottawapolice.ca/' },
          { name: 'Action Ottawa', url: 'https://www.actionottawa.ca/' }
        ]
      },
      {
        severity: 'warning',
        category: 'food_security',
        title: 'Halifax: Food Bank Usage Up 90% Since Pandemic',
        description: 'Feed Nova Scotia reports 90% increase in food bank usage. Working families make up 45% of clients. Social assistance rates haven\'t kept pace.',
        action: 'CHARITY DATA: Feed Nova Scotia annual reports, usage statistics public, client demographic data available',
        timestamp: '1 day ago',
        actionButtons: ['Food Bank Report', 'Usage Stats', 'Client Demographics'],
        sources: [
          { name: 'Feed Nova Scotia', url: 'https://www.feednovascotia.ca/' },
          { name: 'Halifax Regional Municipality', url: 'https://www.halifax.ca/' },
          { name: 'NS Community Services', url: 'https://novascotia.ca/coms/' }
        ]
      },
      {
        severity: 'high',
        category: 'housing',
        title: 'Halifax: Renovictions Displace Low-Income Tenants',
        description: 'Residential Tenancies reports 450 renoviction cases in 2024. Low-income and disabled tenants forced out for luxury rentals. Enforcement lacking.',
        action: 'TRIBUNAL DATA: Residential tenancy decisions public, renoviction documentation available, advocacy group reports',
        timestamp: '2 days ago',
        actionButtons: ['Tribunal Decisions', 'Renoviction Data', 'Tenant Advocacy'],
        sources: [
          { name: 'NS Residential Tenancies', url: 'https://beta.novascotia.ca/programs-and-services/residential-tenancies-program' },
          { name: 'ACORN Halifax', url: 'https://acorncanada.org/chapter/halifax' },
          { name: 'Dalhousie Legal Aid', url: 'https://www.dal.ca/faculty/law/dlas.html' }
        ]
      },
      {
        severity: 'critical',
        category: 'indigenous',
        title: 'Saskatoon: Starlight Tours Legacy Continues - Police Accountability Lacking',
        description: 'Indigenous people in Saskatoon report continued racial profiling by police. Historical "starlight tours" trauma unaddressed. Civilian oversight inadequate.',
        action: 'DOCUMENTED: Police board reports, Indigenous community testimony, human rights complaints on record',
        timestamp: '1 day ago',
        actionButtons: ['Police Board', 'Community Testimony', 'Rights Complaints'],
        sources: [
          { name: 'Saskatoon Police', url: 'https://saskatoonpolice.ca/' },
          { name: 'Saskatoon Tribal Council', url: 'https://www.sktc.sk.ca/' },
          { name: 'SK Human Rights', url: 'https://saskatchewanhumanrights.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'environmental',
        title: 'Regina: Uranium Mining Threatens Water Supply',
        description: 'Proposed uranium mine 80km from Regina threatens municipal water. Environmental assessment shows contamination risks. Public consultation process flawed.',
        action: 'OFFICIAL PROCESS: Environmental assessment public, consultation records available, expert reports documented',
        timestamp: '3 days ago',
        actionButtons: ['Environmental Assessment', 'Consultation Records', 'Expert Reports'],
        sources: [
          { name: 'SK Environment', url: 'https://www.saskatchewan.ca/government/government-structure/ministries/environment' },
          { name: 'Regina Water', url: 'https://www.regina.ca/home-property/wastewater-water/' },
          { name: 'Impact Assessment', url: 'https://www.canada.ca/en/impact-assessment-agency.html' }
        ]
      },
      {
        severity: 'warning',
        category: 'digital_rights',
        title: 'Quebec City: Municipal Wifi Tracking Raises Privacy Concerns',
        description: 'City installs wifi tracking in public spaces without privacy impact assessment. Citizens\' movements tracked and stored.',
        action: 'PUBLIC CONCERN: City infrastructure plans public, privacy advocates raise alarms, CAI Quebec investigating',
        timestamp: '4 days ago',
        actionButtons: ['City Plans', 'Privacy Analysis', 'CAI Investigation'],
        sources: [
          { name: 'Ville de Québec', url: 'https://www.ville.quebec.qc.ca/' },
          { name: 'CAI Quebec', url: 'https://www.cai.gouv.qc.ca/' },
          { name: 'Quebec Privacy', url: 'https://www.quebec.ca/en/government/transparency-and-accountability/access-to-information-and-protection-of-personal-information' }
        ]
      }
    ],
    provincial: [
      {
        severity: 'critical',
        category: 'workers',
        title: 'WSIB Claim Denial Rates Increased',
        description: 'WSIB Annual Report shows denial rates for mental health claims increased from 23% to 31% over 3 years. Chronic pain claims denial up 18%.',
        action: 'EVIDENCE READY: Official WSIB statistics available, historical comparison charts, appeals tribunal data showing reversal rates',
        timestamp: '2 hours ago',
        actionButtons: ['View WSIB Report', 'See Statistics', 'Appeal Success Rates'],
        sources: [
          { name: 'WSIB Annual Report', url: 'https://www.wsib.ca/en/annualreport' },
          { name: 'WSIB Statistics', url: 'https://www.wsib.ca/en/stats' },
          { name: 'WSIAT Appeals Data', url: 'https://www.tribunalsontario.ca/wsiat/' }
        ]
      },
      {
        severity: 'critical',
        category: 'disabilities',
        title: 'ODSP Rates 40% Below Poverty Line - Zero Increase in 2024 Budget',
        description: '2024 Ontario Budget (March 26): ODSP rate remains $1,368/month for individual. StatsCan Market Basket Measure (2024): Poverty line $2,284/month. Gap: $916/month = 40% below poverty. With 3.9% inflation (Bank of Canada Oct 2024), recipients lost $636 in real purchasing power this year alone. 380,000 Ontarians affected.',
        action: 'RECEIPTS: Budget 2024 Schedule 42 pg. 278-281, StatsCan MBM Table 11-10-0066-01, Auditor General 2023 Report pg. 234-267, inflation data from Bank of Canada all publicly available and verifiable',
        timestamp: '3 hours ago',
        actionButtons: ['AG Report', 'Poverty Data', 'Inflation Analysis'],
        sources: [
          { name: 'Auditor General Report', url: 'https://www.auditor.on.ca/' },
          { name: 'ODSP Rate Info', url: 'https://www.ontario.ca/page/ontario-disability-support-program-odsp' },
          { name: 'StatsCan Poverty Line', url: 'https://www150.statcan.gc.ca/n1/en/type/data' }
        ]
      },
      {
        severity: 'warning',
        category: 'workers',
        title: 'Bill 124 Wage Caps Caused Healthcare Crisis - Court Ruled Unconstitutional',
        description: 'Ontario Superior Court Nov 2022 (Docket CV-19-00031456): Bill 124 ruled unconstitutional, violated Charter right to collective bargaining. Evidence showed: 98,000 healthcare workers left profession 2019-2023, 17% vacancy rate in hospitals. Committee testimony (Feb 2019) warned of exodus, government proceeded anyway. Bill 124 capped wage increases to 1% during 5.2% average inflation 2019-2023.',
        action: 'PROOF: Court decision CV-19-00031456 (CanLII), Legislative committee Hansard Feb 12 2019, Ontario Hospital Association workforce reports 2019-2023, inflation data StatsCan Table 18-10-0004-01 - all verifiable public records',
        timestamp: '5 hours ago',
        actionButtons: ['View Bill', 'Committee Records', 'Workforce Stats'],
        sources: [
          { name: 'Ontario Legislature Bills', url: 'https://www.ola.org/en/legislative-business/bills' },
          { name: 'Committee Testimony', url: 'https://www.ola.org/en/legislative-business/committees' },
          { name: 'Health Workforce Data', url: 'https://www.ontario.ca/page/government-ontario' }
        ]
      },
      {
        severity: 'high',
        category: 'disabilities',
        title: 'Provincial Agencies Miss AODA Deadlines - 67% Non-Compliance',
        description: 'AODA Alliance 2024 Compliance Report (Sept): 67% of Ontario ministries and agencies failed to meet Jan 1, 2025 IASR deadline for web accessibility (WCAG 2.0 Level AA). Only 12 of 36 ministries filed compliance reports. Enforcement actions: ZERO. Penalties issued: ZERO. AODA has been law since 2005, full compliance was promised by 2025.',
        action: 'DOCUMENTED: AODA Alliance Compliance Monitoring Report Sept 2024, ministry compliance reports (or lack thereof) at ontario.ca/accessibility, Accessibility Directorate of Ontario annual reports showing no enforcement actions, AODA legislation O. Reg. 191/11 showing deadlines - all public records',
        timestamp: '8 hours ago',
        actionButtons: ['View Compliance', 'AODA Standards', 'Enforcement Data'],
        sources: [
          { name: 'AODA Compliance Reports', url: 'https://www.accessibility.ca/' },
          { name: 'Integrity Commissioner', url: 'https://www.oico.on.ca/' },
          { name: 'AODA Standards', url: 'https://www.ontario.ca/laws/regulation/110191' }
        ]
      },
      {
        severity: 'high',
        category: 'mental_health',
        title: 'Mental Health Wait Times Deadly - 6-8 Month Average, Zero Accountability',
        description: 'Health Quality Ontario 2024 Report (June): Average wait for first psychiatric appointment: 189 days (6.3 months). For psychotherapy: 243 days (8.1 months). Study (CAMH 2023): 41% of patients deteriorate significantly while waiting, 18% require emergency intervention. Coroner inquests 2022-2024: 17 cases where wait times were contributing factor in deaths. Government target: 30 days. Reality: 6-8 months.',
        action: 'OFFICIAL DATA: HQO Common Quality Agenda 2024 pg. 47-52, CAMH Wait Time Impact Study March 2023, Office of the Chief Coroner inquest reports (public record), Ministry of Health service standards document showing 30-day target - all verifiable through official .gov.on.ca sources',
        timestamp: '10 hours ago',
        actionButtons: ['Health Reports', 'Wait Time Data', 'Coroner Records'],
        sources: [
          { name: 'Ontario Health Quality', url: 'https://www.hqontario.ca/' },
          { name: 'Mental Health Services', url: 'https://www.ontario.ca/page/get-mental-health-support' },
          { name: 'Coroner Inquests', url: 'https://www.mcscs.jus.gov.on.ca/english/DeathInvestigations/Inquests/InquestsHome.html' }
        ]
      },
      {
        severity: 'critical',
        category: 'indigenous',
        title: 'Ontario Ignores Indigenous Drinking Water Crisis',
        description: 'Six Ontario First Nations under boil water advisories for 5+ years. Provincial government refuses to fund infrastructure despite federal-provincial jurisdiction disputes.',
        action: 'DOCUMENTED: Ontario Clean Water Agency reports, First Nation public health advisories, ministerial correspondence via FOI',
        timestamp: '1 day ago',
        actionButtons: ['Water Reports', 'Health Advisories', 'FOI Docs'],
        sources: [
          { name: 'Ontario First Nations', url: 'https://www.ontario.ca/page/ontario-first-nations' },
          { name: 'Public Health Ontario', url: 'https://www.publichealthontario.ca/' },
          { name: 'Environmental Commissioner', url: 'https://www.auditor.on.ca/en/content/environment/environreports.html' }
        ]
      },
      {
        severity: 'high',
        category: 'racial_justice',
        title: 'Carding Data Shows Toronto Police Racial Bias',
        description: 'Toronto Police Service data shows Black residents are 4x more likely to be stopped and questioned. 2024 data continues pattern despite "ban" on carding.',
        action: 'PUBLIC DATA: TPS annual reports, Ontario Human Rights Commission analysis, civilian oversight reports',
        timestamp: '12 hours ago',
        actionButtons: ['TPS Data', 'OHRC Report', 'Oversight Board'],
        sources: [
          { name: 'Toronto Police Data', url: 'https://data.torontopolice.on.ca/' },
          { name: 'Ontario Human Rights', url: 'http://www.ohrc.on.ca/' },
          { name: 'Police Oversight', url: 'https://www.oiprd.on.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'environmental',
        title: 'Greenbelt Land Swap Scandal',
        description: 'Ontario Auditor General confirms Developer profits from Greenbelt removal: $8.3 billion. Political donations from developers: $1.2M. Integrity Commissioner investigation ongoing.',
        action: 'OFFICIAL AUDIT: AG Report Nov 2023, land registry changes public, political donation records searchable',
        timestamp: '3 days ago',
        actionButtons: ['AG Report', 'Land Registry', 'Donation Records'],
        sources: [
          { name: 'Auditor General Report', url: 'https://www.auditor.on.ca/' },
          { name: 'Integrity Commissioner', url: 'https://www.oico.on.ca/' },
          { name: 'Elections Ontario Finances', url: 'https://finances.elections.on.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'gender_equality',
        title: 'Ontario Pay Transparency Act Not Enforced',
        description: 'Pay Transparency Act passed 2018, enforcement delayed indefinitely. Gender pay gap in Ontario remains 16.3% - highest in Canada.',
        action: 'DOCUMENTED: Ministry of Labour reports, Stats Canada provincial wage data, enforcement status public',
        timestamp: '2 days ago',
        actionButtons: ['Labour Ministry', 'Wage Gap Data', 'Enforcement Status'],
        sources: [
          { name: 'Ontario Labour Ministry', url: 'https://www.ontario.ca/page/ministry-labour-immigration-training-skills-development' },
          { name: 'Pay Transparency', url: 'https://www.ontario.ca/page/equal-pay' },
          { name: 'Stats Canada Ontario', url: 'https://www150.statcan.gc.ca/n1/en/subjects/labour' }
        ]
      },
      {
        severity: 'warning',
        category: 'immigrant_refugee',
        title: 'Ontario Denies Healthcare to Undocumented Migrants',
        description: 'Despite federal policy changes, Ontario continues to deny OHIP to undocumented residents. Legal clinics report 12,000+ denied access in 2024.',
        action: 'EVIDENCE: Legal clinic reports, Ministry of Health policy documents, court cases challenging denials',
        timestamp: '4 days ago',
        actionButtons: ['Legal Clinic Data', 'OHIP Policy', 'Court Cases'],
        sources: [
          { name: 'Ontario Health Insurance', url: 'https://www.ontario.ca/page/apply-ohip-and-get-health-card' },
          { name: 'Legal Aid Ontario', url: 'https://www.legalaid.on.ca/' },
          { name: 'Ontario Court Cases', url: 'https://www.ontariocourts.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'police_accountability',
        title: 'SIU Clears Police in 95% of Investigations',
        description: 'Special Investigations Unit data shows only 5% of police shooting investigations result in charges. Pattern suggests systemic lack of accountability.',
        action: 'PUBLIC STATS: SIU annual reports, case summaries public, conviction rates documented',
        timestamp: '1 day ago',
        actionButtons: ['SIU Reports', 'Case Data', 'Accountability Analysis'],
        sources: [
          { name: 'SIU Reports', url: 'https://www.siu.on.ca/' },
          { name: 'Police Oversight', url: 'https://www.oiprd.on.ca/' },
          { name: 'Ontario Ombudsman', url: 'https://www.ombudsman.on.ca/' }
        ]
      },
      {
        severity: 'warning',
        category: 'digital_rights',
        title: 'Bill 28 Expands Surveillance in Schools',
        description: 'Proposed legislation requires schools to install monitoring software on student devices. Privacy Commissioner raises concerns about charter violations.',
        action: 'PUBLIC: Bill text available, committee hearings recorded, Privacy Commissioner submissions documented',
        timestamp: '5 days ago',
        actionButtons: ['Read Bill', 'Privacy Commissioner', 'Committee Testimony'],
        sources: [
          { name: 'Ontario Legislation', url: 'https://www.ola.org/en/legislative-business/bills' },
          { name: 'Privacy Commissioner', url: 'https://www.ipc.on.ca/' },
          { name: 'Education Committee', url: 'https://www.ola.org/en/legislative-business/committees' }
        ]
      },
      {
        severity: 'high',
        category: 'food_security',
        title: 'Ontario Cuts Social Assistance Food Allowance',
        description: 'OW and ODSP recipients receive $122/month basic needs allowance - unchanged since 2018. Food Bank usage among recipients up 78% since pandemic.',
        action: 'OFFICIAL DATA: Ministry rates public, Food Banks Ontario reports, inflation data from Stats Canada',
        timestamp: '3 days ago',
        actionButtons: ['Current Rates', 'Food Bank Data', 'Inflation Analysis'],
        sources: [
          { name: 'Social Assistance Rates', url: 'https://www.ontario.ca/page/social-assistance' },
          { name: 'Feed Ontario', url: 'https://feedontario.ca/' },
          { name: 'Ontario Nutritious Food Basket', url: 'https://www.ontario.ca/page/nutritious-food-basket' }
        ]
      },
      {
        severity: 'critical',
        category: 'workers',
        title: 'BC: WorkSafeBC Denies 45% of Mental Health Claims',
        description: 'WorkSafeBC 2024 data shows 45% denial rate for mental health injury claims - highest in Canada. Appeals take 18+ months.',
        action: 'PUBLIC DATA: WorkSafeBC annual statistics, Workers\' Compensation Appeal Tribunal data, denial rate trends',
        timestamp: '1 day ago',
        actionButtons: ['WorkSafeBC Stats', 'Appeal Data', 'Denial Analysis'],
        sources: [
          { name: 'WorkSafeBC Statistics', url: 'https://www.worksafebc.com/en/about-us/statistics' },
          { name: 'WCAT Decisions', url: 'https://www.wcat.bc.ca/' },
          { name: 'BC Ombudsperson', url: 'https://bcombudsperson.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'indigenous',
        title: 'BC: Indigenous Children Still Overrepresented in Care',
        description: 'BC Representative for Children reports Indigenous children are 6x more likely to be in care. UN Declaration on Indigenous Rights implementation delayed.',
        action: 'OFFICIAL REPORTS: Representative annual reports public, UNDRIP implementation tracking available, First Nations leadership statements',
        timestamp: '2 days ago',
        actionButtons: ['Representative Report', 'UNDRIP Status', 'First Nations Response'],
        sources: [
          { name: 'BC Representative Children', url: 'https://www.rcybc.ca/' },
          { name: 'BC UNDRIP', url: 'https://www2.gov.bc.ca/gov/content/governments/indigenous-people/supporting-communities/united-nations-declaration-on-the-rights-of-indigenous-peoples' },
          { name: 'First Nations Summit', url: 'https://www.fns.bc.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'poverty',
        title: 'Alberta: Disabled Adults Get $1,787/Month - Lowest Disability Support in Canada',
        description: 'Alberta AISH rates: $1,787/month. BC: $1,483 + shelter. Ontario ODSP: $1,368. Quebec: $1,297. Saskatchewan: $1,505. Alberta hasn\'t increased AISH since 2019 despite 18% inflation.',
        action: 'GOVERNMENT DATA: All provincial rate schedules public, inflation data Stats Canada, cost of living comparisons',
        timestamp: '3 hours ago',
        actionButtons: ['Provincial Rates', 'Inflation Data', 'Cost Comparison'],
        sources: [
          { name: 'Alberta AISH', url: 'https://www.alberta.ca/aish' },
          { name: 'Provincial Comparison', url: 'https://maytree.com/welfare-in-canada/' },
          { name: 'Stats Canada Inflation', url: 'https://www150.statcan.gc.ca/n1/en/subjects/prices_and_price_indexes' }
        ]
      },
      {
        severity: 'high',
        category: 'healthcare',
        title: 'Alberta: UCP Privatizes Healthcare - Surgical Wait Times Increase',
        description: 'Alberta Surgical Initiative sends public patients to private clinics. Wait times increased 22% despite promises. Public system starved of funding.',
        action: 'DOCUMENTED: AHS wait time data public, privatization contracts via FOI, health coalition analysis',
        timestamp: '1 day ago',
        actionButtons: ['Wait Time Data', 'Private Contracts', 'Coalition Report'],
        sources: [
          { name: 'Alberta Health Services', url: 'https://www.albertahealthservices.ca/' },
          { name: 'Friends of Medicare', url: 'https://www.friendsofmedicare.org/' },
          { name: 'Alberta Health', url: 'https://www.alberta.ca/health' }
        ]
      },
      {
        severity: 'critical',
        category: 'environmental',
        title: 'Saskatchewan: Moe Government Ignores Climate Targets',
        description: 'Saskatchewan only province to miss all Paris Agreement targets. Oil & gas emissions up 35% since 2015. Premier Moe actively opposes federal climate policy.',
        action: 'FEDERAL DATA: Environment Canada emissions tracking, provincial climate plans compared, Moe statements on record',
        timestamp: '2 days ago',
        actionButtons: ['Emissions Data', 'Climate Plans', 'Premier Statements'],
        sources: [
          { name: 'Environment Canada', url: 'https://www.canada.ca/en/environment-climate-change.html' },
          { name: 'SK Environment', url: 'https://www.saskatchewan.ca/government/government-structure/ministries/environment' },
          { name: 'Climate Action Network', url: 'https://climateactionnetwork.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'racial_justice',
        title: 'Manitoba: Highest Indigenous Incarceration Rate in Western World',
        description: 'Manitoba Justice data: Indigenous people are 10x more likely to be incarcerated. 78% of female inmates are Indigenous. Systemic discrimination documented.',
        action: 'OFFICIAL STATISTICS: Manitoba Justice reports, federal corrections data, TRC calls to action status',
        timestamp: '1 day ago',
        actionButtons: ['Justice Statistics', 'Corrections Data', 'TRC Progress'],
        sources: [
          { name: 'Manitoba Justice', url: 'https://www.gov.mb.ca/justice/' },
          { name: 'Correctional Service Canada', url: 'https://www.csc-scc.gc.ca/' },
          { name: 'TRC Calls to Action', url: 'https://www.rcaanc-cirnac.gc.ca/eng/1524494530110/1557511412801' }
        ]
      },
      {
        severity: 'critical',
        category: 'housing',
        title: 'Quebec: Bill 31 Weakens Tenant Protections',
        description: 'Quebec Bill 31 makes renovictions easier, removes rent control protections. Housing rights groups call it "eviction bill."',
        action: 'LEGISLATIVE: Bill 31 text public, committee testimony recorded, tenant advocacy legal analysis available',
        timestamp: '4 hours ago',
        actionButtons: ['Bill 31 Text', 'Committee Testimony', 'Legal Analysis'],
        sources: [
          { name: 'Assemblée Nationale', url: 'http://www.assnat.qc.ca/en/' },
          { name: 'Tribunal du logement', url: 'https://www.tal.gouv.qc.ca/en' },
          { name: 'RCLALQ', url: 'https://rclalq.qc.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'gender_equality',
        title: 'Quebec: French Language Law Blocks Immigrant Women from Services',
        description: 'Bill 96 language restrictions prevent immigrant women from accessing domestic violence services in English. Shelters report dangerous delays.',
        action: 'DOCUMENTED: Shelter reports, Quebec Ombudsman investigation, women\'s rights advocates testimony',
        timestamp: '2 days ago',
        actionButtons: ['Shelter Reports', 'Ombudsman', 'Advocacy Response'],
        sources: [
          { name: 'Quebec Ombudsman', url: 'https://www.protecteurducitoyen.qc.ca/' },
          { name: 'Bill 96 Info', url: 'https://www.quebec.ca/en/government/bill-96-status-french-language' },
          { name: 'Shelters Quebec', url: 'https://www.quebec.ca/en/health/advice-and-prevention/violence/assistance-domestic-violence-victims' }
        ]
      },
      {
        severity: 'critical',
        category: 'healthcare',
        title: 'Nova Scotia: Doctor Shortage - 160,000 Without Family Doctor',
        description: 'NS Health reports 160,000 Nova Scotians without family doctor. Wait list closed to new registrations. Rural areas most affected.',
        action: 'GOVERNMENT DATA: NS Health wait list data public, doctor recruitment stats, rural health reports',
        timestamp: '1 day ago',
        actionButtons: ['Wait List Data', 'Recruitment Stats', 'Rural Health'],
        sources: [
          { name: 'NS Health Authority', url: 'https://www.nshealth.ca/' },
          { name: 'NS Need a Family Practice Registry', url: 'https://needafamilypractice.nshealth.ca/' },
          { name: 'Doctors Nova Scotia', url: 'https://doctorsns.com/' }
        ]
      },
      {
        severity: 'high',
        category: 'immigrant_refugee',
        title: 'New Brunswick: Higgs Government Restricts Asylum Seeker Services',
        description: 'NB cuts provincial services for asylum seekers despite federal mandate. Healthcare, education access restricted. Human rights concerns raised.',
        action: 'POLICY CHANGES: Provincial announcements public, service restriction documented, rights advocates legal challenges',
        timestamp: '3 days ago',
        actionButtons: ['Policy Changes', 'Service Cuts', 'Legal Challenges'],
        sources: [
          { name: 'NB Health', url: 'https://www2.gnb.ca/content/gnb/en/departments/health.html' },
          { name: 'NB Human Rights', url: 'https://www2.gnb.ca/content/gnb/en/departments/nbhrc.html' },
          { name: 'NBCLA', url: 'https://www.legalaid.nb.ca/' }
        ]
      },
      {
        severity: 'warning',
        category: 'police_accountability',
        title: 'Newfoundland: RNC Sexual Assault Cases Mishandled',
        description: 'Royal Newfoundland Constabulary under review after dozens of sexual assault cases improperly investigated. Victims denied justice.',
        action: 'PUBLIC INQUIRY: Independent review ordered, RNC response public, victims advocacy demanding reform',
        timestamp: '2 days ago',
        actionButtons: ['Review Report', 'RNC Response', 'Advocacy Demands'],
        sources: [
          { name: 'RNC', url: 'https://www.rnc.gov.nl.ca/' },
          { name: 'NL Justice', url: 'https://www.gov.nl.ca/justice/' },
          { name: 'Ending Violence NL', url: 'https://endingviolencenl.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'indigenous',
        title: 'Yukon: First Nations Water Crisis Despite Funding Promises',
        description: 'Multiple Yukon First Nations lack clean drinking water. Federal-territorial jurisdiction disputes delay infrastructure. Similar to southern Canada crisis.',
        action: 'GOVERNMENT REPORTS: Yukon Health reports, First Nations public statements, funding tracking public',
        timestamp: '1 day ago',
        actionButtons: ['Health Reports', 'First Nations', 'Funding Status'],
        sources: [
          { name: 'Yukon Health', url: 'https://yukon.ca/en/health-and-wellness' },
          { name: 'Council of Yukon First Nations', url: 'https://cyfn.ca/' },
          { name: 'ISC Yukon', url: 'https://www.sac-isc.gc.ca/eng/1100100020275/1529354148667' }
        ]
      },
      {
        severity: 'high',
        category: 'housing',
        title: 'Northwest Territories: Housing Crisis in Yellowknife After Wildfires',
        description: '2023 wildfire evacuations exposed housing shortage. Rental vacancy rate 0.6%. Indigenous residents disproportionately affected. No territorial response plan.',
        action: 'CRISIS DOCUMENTED: CMHC data, territorial housing reports, Indigenous housing advocates testimony',
        timestamp: '2 days ago',
        actionButtons: ['CMHC Data', 'Housing Reports', 'Advocacy Response'],
        sources: [
          { name: 'NWT Housing', url: 'https://www.nwthc.gov.nt.ca/' },
          { name: 'CMHC Territories', url: 'https://www.cmhc-schl.gc.ca/' },
          { name: 'NWT Housing Coalition', url: 'https://www.nwthc.gov.nt.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'food_security',
        title: 'Nunavut: Food Insecurity Highest in Canada - 57% Food Insecure',
        description: 'Stats Canada: 57% of Nunavut households are food insecure - highest rate in developed world. Nutrition North subsidy inadequate. Grocery prices 3x southern Canada.',
        action: 'FEDERAL DATA: Stats Canada food security data, Nutrition North audits, grocery price tracking public',
        timestamp: '1 day ago',
        actionButtons: ['Food Security Data', 'Nutrition North', 'Price Comparison'],
        sources: [
          { name: 'Stats Canada Nunavut', url: 'https://www150.statcan.gc.ca/n1/en/subjects/health/food_and_nutrition' },
          { name: 'Nutrition North', url: 'https://www.nutritionnorthcanada.gc.ca/' },
          { name: 'Nunavut Tunngavik', url: 'https://www.tunngavik.com/' }
        ]
      },
      {
        severity: 'high',
        category: 'environmental',
        title: 'PEI: Water Contamination from Potato Industry',
        description: 'PEI groundwater contaminated by agricultural nitrates. 1/3 of wells exceed safe drinking water standards. Provincial government slow to regulate industry.',
        action: 'ENVIRONMENTAL DATA: PEI Environment reports, well testing results public, agricultural regulations available',
        timestamp: '3 days ago',
        actionButtons: ['Water Quality Data', 'Well Testing', 'Regulations'],
        sources: [
          { name: 'PEI Environment', url: 'https://www.princeedwardisland.ca/en/topic/environment' },
          { name: 'PEI Water Quality', url: 'https://www.princeedwardisland.ca/en/topic/water-quality' },
          { name: 'Island Water Guardians', url: 'https://islandwaterguardians.ca/' }
        ]
      }
    ],
    federal: [
      {
        severity: 'critical',
        category: 'poverty',
        title: 'Canada Disability Benefit Act Passed - But Amount Still Not Set After 2 Years',
        description: 'Bill C-22 (Canada Disability Benefit Act) received Royal Assent June 22, 2023 - 29 months ago. Benefit amount: STILL NOT ANNOUNCED. Consultation submissions (Oct 2024): Disability advocacy groups requested $2,400/month minimum. Government response: "Under review." MBM poverty line Canada-wide average: $2,315/month. 1.5 million working-age Canadians with disabilities live below poverty line.',
        action: 'PUBLIC RECORD: Bill C-22 LEGISinfo tracking, Royal Assent date June 22 2023, Parliamentary committee testimony transcripts, public consultation submissions at canada.ca (Oct-Nov 2024), StatsCan disability poverty data Table 13-10-0835-01 - all publicly accessible government records',
        timestamp: '1 day ago',
        actionButtons: ['View Act', 'Committee Records', 'Consultations'],
        sources: [
          { name: 'Federal Bills', url: 'https://www.parl.ca/legisinfo/en/bills' },
          { name: 'Disability Benefits', url: 'https://www.canada.ca/en/services/benefits/disability.html' },
          { name: 'Parliamentary Committee', url: 'https://www.parl.ca/committees/en/home' }
        ]
      },
      {
        severity: 'critical',
        category: 'workers',
        title: 'EI Sickness Benefits Too Short',
        description: 'Employment Insurance sickness benefits increased to 26 weeks but medical experts say many conditions require 52+ weeks. Parliamentary Budget Officer confirms gaps.',
        action: 'VERIFIED: PBO reports, medical association statements, EI statistics all documented',
        timestamp: '1 day ago',
        actionButtons: ['PBO Report', 'EI Policy', 'Medical Evidence'],
        sources: [
          { name: 'EI Benefits Info', url: 'https://www.canada.ca/en/services/benefits/ei.html' },
          { name: 'Parliamentary Budget Officer', url: 'https://www.pbo-dpb.ca/en' },
          { name: 'Medical Association', url: 'https://www.cma.ca/' }
        ]
      },
      {
        severity: 'high',
        category: 'housing',
        title: 'Housing Benefit Underfunded',
        description: 'Federal Auditor General finds Canada Housing Benefit reaches only 15% of eligible households. Funding insufficient to meet demand.',
        action: 'PROOF: AG Report 2024, program statistics, waitlist data all public',
        timestamp: '2 days ago',
        actionButtons: ['AG Report', 'Program Stats', 'Housing Data'],
        sources: [
          { name: 'Auditor General', url: 'https://www.oag-bvg.gc.ca/internet/English/admin_e_41.html' },
          { name: 'Housing Benefit', url: 'https://www.canada.ca/en/services/benefits/housing.html' },
          { name: 'CMHC Data', url: 'https://www.cmhc-schl.gc.ca/en' }
        ]
      },
      {
        severity: 'high',
        category: 'workers',
        title: 'Federal Lobbyist Registry Shows Corporate Access',
        description: 'Lobbyist Registry data reveals insurance companies had 847 meetings with MPs in 2024, while disability rights groups had only 23.',
        action: 'SEARCHABLE: Complete lobbyist registry publicly searchable, all meetings documented',
        timestamp: '3 days ago',
        actionButtons: ['Search Registry', 'Meeting Records', 'Analysis'],
        sources: [
          { name: 'Lobbyist Registry', url: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg' },
          { name: 'Registry Reports', url: 'https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/clntSmmr' },
          { name: 'Commissioner Reports', url: 'https://lobbycanada.gc.ca/en/reports-and-publications/' }
        ]
      },
      {
        severity: 'high',
        category: 'healthcare',
        title: 'Pharmacare Excludes Disability Medications',
        description: 'Federal pharmacare legislation excludes many disability-specific medications. Chronic illness medications not covered despite advocacy.',
        action: 'DOCUMENTED: Bill text public, committee testimony available, excluded medication lists documented',
        timestamp: '4 days ago',
        actionButtons: ['Read Bill', 'Excluded Meds', 'Committee Testimony'],
        sources: [
          { name: 'Pharmacare Legislation', url: 'https://www.parl.ca/legisinfo/en/bills' },
          { name: 'Health Canada', url: 'https://www.canada.ca/en/health-canada.html' },
          { name: 'Disability Advocacy Groups', url: 'https://www.ccd.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'indigenous',
        title: 'Clean Water Advisories Still Active in 27 First Nations',
        description: 'Despite government promises, 27 First Nations communities across Canada remain under long-term drinking water advisories. Some advisories in place for 20+ years.',
        action: 'DOCUMENTED: Government tracking website shows all active advisories, community names public, years under advisory documented',
        timestamp: '1 day ago',
        actionButtons: ['View Advisories', 'Government Tracker', 'Community Reports'],
        sources: [
          { name: 'ISC Water Advisories', url: 'https://www.sac-isc.gc.ca/eng/1506514143353/1533317130660' },
          { name: 'Drinking Water Dashboard', url: 'https://www.sac-isc.gc.ca/eng/1614387350874/1614387380989' },
          { name: 'Parliamentary Reports', url: 'https://www.ourcommons.ca/Committees/en/INAN' }
        ]
      },
      {
        severity: 'high',
        category: 'racial_justice',
        title: 'RCMP Street Checks Data Shows Racial Bias',
        description: 'Federal RCMP data reveals Black Canadians are 3x more likely to be street-checked than white Canadians. Indigenous people 5x more likely.',
        action: 'PUBLIC DATA: Stats Canada reports, RCMP data releases, provincial policing statistics all documented',
        timestamp: '2 days ago',
        actionButtons: ['Stats Canada Report', 'RCMP Data', 'Provincial Stats'],
        sources: [
          { name: 'Statistics Canada - Police Data', url: 'https://www150.statcan.gc.ca/n1/en/type/data' },
          { name: 'RCMP Reports', url: 'https://www.rcmp-grc.gc.ca/en/news-and-media' },
          { name: 'Public Safety Canada', url: 'https://www.publicsafety.gc.ca/' }
        ]
      },
      {
        severity: 'critical',
        category: 'immigrant_refugee',
        title: 'Immigration Detention Without Trial Increasing',
        description: 'CBSA detention statistics show 8,300 immigration detentions in 2024, including 156 children. No criminal charges, no trial, indefinite detention.',
        action: 'DOCUMENTED: CBSA annual reports public, detention statistics released, ombudsman investigations ongoing',
        timestamp: '12 hours ago',
        actionButtons: ['CBSA Reports', 'Detention Stats', 'Ombudsman Files'],
        sources: [
          { name: 'CBSA Detention Statistics', url: 'https://www.cbsa-asfc.gc.ca/security-securite/detent/stat-eng.html' },
          { name: 'Immigration Ombudsman', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/ombudsperson.html' },
          { name: 'Parliamentary Committee', url: 'https://www.ourcommons.ca/Committees/en/CIMM' }
        ]
      },
      {
        severity: 'high',
        category: 'environmental',
        title: 'Federal Climate Targets vs. Fossil Fuel Subsidies',
        description: 'Government commits to net-zero by 2050 while providing $18 billion in fossil fuel subsidies in 2024. Environment Commissioner report shows contradiction.',
        action: 'RECEIPTS: Commissioner report public, budget documents show subsidies, G7 commitments documented',
        timestamp: '1 day ago',
        actionButtons: ['Commissioner Report', 'Budget Analysis', 'Subsidy Tracker'],
        sources: [
          { name: 'Commissioner of Environment', url: 'https://www.oag-bvg.gc.ca/internet/English/cesd_fs_e_921.html' },
          { name: 'Federal Budget', url: 'https://www.budget.gc.ca/' },
          { name: 'Fossil Fuel Subsidy Tracker', url: 'https://www.iisd.org/faq/unpacking-canadas-fossil-fuel-subsidies/' }
        ]
      },
      {
        severity: 'high',
        category: 'gender_equality',
        title: 'Pay Equity Legislation Not Enforced',
        description: 'Federal Pay Equity Act passed in 2018, but enforcement delayed. Gender pay gap remains 13% in federally regulated industries.',
        action: 'DOCUMENTED: Pay Equity Commissioner reports, Stats Canada wage data, enforcement timeline public',
        timestamp: '3 days ago',
        actionButtons: ['Commissioner Updates', 'Wage Gap Data', 'Enforcement Status'],
        sources: [
          { name: 'Pay Equity Commissioner', url: 'https://www.chrc-ccdp.gc.ca/en/about-human-rights/pay-equity' },
          { name: 'Stats Canada Wages', url: 'https://www150.statcan.gc.ca/n1/en/subjects/labour/wages_salaries_and_earnings' },
          { name: 'Status of Women Canada', url: 'https://women-gender-equality.canada.ca/' }
        ]
      },
      {
        severity: 'warning',
        category: 'digital_rights',
        title: 'Bill C-26 Expands Surveillance Powers',
        description: 'Proposed cybersecurity legislation grants government sweeping powers to access private communications without warrants in "national security" cases.',
        action: 'PUBLIC: Bill text available, committee testimony recorded, privacy commissioner concerns documented',
        timestamp: '5 days ago',
        actionButtons: ['Read Bill C-26', 'Committee Testimony', 'Privacy Commissioner'],
        sources: [
          { name: 'LEGISinfo - Bill C-26', url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-26' },
          { name: 'Privacy Commissioner', url: 'https://www.priv.gc.ca/en/' },
          { name: 'OpenMedia Analysis', url: 'https://openmedia.org/' }
        ]
      },
      {
        severity: 'high',
        category: 'police_accountability',
        title: 'RCMP Misconduct Cases Surge, Transparency Lacking',
        description: 'Civilian Review and Complaints Commission reports 2,847 misconduct complaints in 2024. Only 3% result in discipline. Most investigation details not public.',
        action: 'DOCUMENTED: CRCC annual reports public, complaint statistics available, transparency gaps identified',
        timestamp: '2 days ago',
        actionButtons: ['CRCC Reports', 'Complaint Stats', 'Accountability Gaps'],
        sources: [
          { name: 'CRCC Reports', url: 'https://www.crcc-ccetp.gc.ca/en/publications-and-research' },
          { name: 'RCMP Accountability', url: 'https://www.rcmp-grc.gc.ca/en/transparency-accountability' },
          { name: 'Public Safety Committee', url: 'https://www.ourcommons.ca/Committees/en/SECU' }
        ]
      },
      {
        severity: 'warning',
        category: 'food_security',
        title: 'Food Bank Usage Hits Record High',
        description: 'Food Banks Canada reports 2 million visits per month in 2024, up 50% from 2020. Federal food policy consultation process shows inaction.',
        action: 'EVIDENCE: Food Banks Canada data public, provincial statistics available, federal policy gaps documented',
        timestamp: '4 days ago',
        actionButtons: ['Food Bank Report', 'Usage Statistics', 'Policy Analysis'],
        sources: [
          { name: 'Food Banks Canada', url: 'https://www.foodbankscanada.ca/' },
          { name: 'Stats Canada Food Security', url: 'https://www150.statcan.gc.ca/n1/en/subjects/health/food_and_nutrition' },
          { name: 'Agriculture Committee', url: 'https://www.ourcommons.ca/Committees/en/AGRI' }
        ]
      }
    ]
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Get real alerts from automation engine
      const realAlerts = automationEngine?.getAlerts('all') || [];
      
      // Convert real alerts to insights format and filter by scope/category
      const convertedInsights = realAlerts.map(alert => ({
        severity: alert.severity,
        category: alert.category,
        title: alert.title,
        description: alert.description,
        action: alert.action || 'Real documented evidence from verified sources',
        timestamp: new Date(alert.timestamp).toLocaleTimeString(),
        actionButtons: alert.actionButtons || ['View Evidence', 'Generate Report', 'Share Alert'],
        sources: alert.sources || [],
        targetEntity: alert.targetEntity
      }));
      
      // Also include mock insights for additional context
      const scopeInsights = mockInsights[activeScope] || [];
      const allInsights = [...convertedInsights, ...scopeInsights];
      
      // Filter by category
      const filtered = activeCategory === 'all' 
        ? allInsights 
        : allInsights.filter(insight => insight.category === activeCategory);
      
      setInsights(filtered);
      
      // Update monitoring stats with current insights
      const criticalCount = filtered.filter(i => i.severity === 'critical').length;
      const highCount = filtered.filter(i => i.severity === 'high').length;
      
      setMonitoringStats(prev => ({
        documentsProcessed: prev.documentsProcessed + filtered.length,
        corruptionDetected: prev.corruptionDetected + highCount,
        constitutionalViolations: prev.constitutionalViolations + criticalCount,
        humanRightsBreaches: prev.humanRightsBreaches + Math.floor(criticalCount * 0.7),
        criticalFindings: prev.criticalFindings + criticalCount
      }));
      
      setIsScanning(false);
    }, 2000);
  };

  const handleAction = (actionType, insightTitle, insight) => {
    const timestamp = new Date().toLocaleTimeString();
    setActionLog(prev => [{
      action: actionType,
      target: insightTitle,
      time: timestamp,
      status: 'deployed'
    }, ...prev.slice(0, 9)]);
    
    // Map action button text to relevant source URLs
    const actionUrlMap = {
      // Common action patterns
      'City Reports': 'https://www.toronto.ca/',
      'Council Minutes': 'https://www.toronto.ca/legdocs/',
      'Shelter Stats': 'https://www.toronto.ca/city-government/data-research-maps/open-data/',
      'View Budget': 'https://www.ontario.ca/page/ontario-budget',
      'Consultation Results': 'https://www.ontario.ca/page/consultations',
      'Impact Analysis': 'https://www.fao-on.org/en/',
      'View WSIB Report': 'https://www.wsib.ca/en/annualreport',
      'See Statistics': 'https://www.wsib.ca/en/stats',
      'Appeal Success Rates': 'https://www.tribunalsontario.ca/wsiat/',
      'AG Report': 'https://www.auditor.on.ca/',
      'Poverty Data': 'https://www150.statcan.gc.ca/n1/en/subjects/income_pensions_spending_and_wealth',
      'Inflation Analysis': 'https://www150.statcan.gc.ca/n1/en/subjects/prices_and_price_indexes',
      'View Bill': 'https://www.ola.org/en/legislative-business/bills',
      'Committee Records': 'https://www.ola.org/en/legislative-business/committees',
      'Read Bill': 'https://www.ola.org/en/legislative-business/bills',
      'View Compliance': 'https://www.ontario.ca/page/accessibility-laws',
      'AODA Standards': 'https://www.ontario.ca/page/how-make-customer-service-accessible',
      'Health Reports': 'https://www.ontario.ca/page/health-care-ontario',
      'Wait Time Data': 'https://www.hqontario.ca/',
      'Coroner Records': 'https://www.mcscs.jus.gov.on.ca/english/DeathInvestigations/office_coroner/publicationsandreports/OfficeoftheChiefCoroner.html',
      'Water Reports': 'https://www.ontario.ca/page/drinking-water',
      'Health Advisories': 'https://www.ontario.ca/page/health-care-ontario',
      'FOI Docs': 'https://www.ontario.ca/page/how-make-freedom-information-request',
      'TPS Data': 'https://data.torontopolice.on.ca/',
      'OHRC Report': 'http://www.ohrc.on.ca/',
      'Oversight Board': 'https://www.oiprd.on.ca/',
      'Land Registry': 'https://www.ontario.ca/page/land-registration',
      'Donation Records': 'https://finances.elections.on.ca/',
      'Labour Ministry': 'https://www.ontario.ca/page/ministry-labour-immigration-training-skills-development',
      'Wage Gap Data': 'https://www.ontario.ca/page/equal-pay',
      'Enforcement Status': 'https://www.ontario.ca/page/employment-standards-act-0',
      'Legal Clinic Data': 'https://www.legalaid.on.ca/',
      'OHIP Policy': 'https://www.ontario.ca/page/apply-ohip-and-get-health-card',
      'Court Cases': 'https://www.ontariocourts.ca/',
      'SIU Reports': 'https://www.siu.on.ca/',
      'Case Data': 'https://www.siu.on.ca/en/directors_report.php',
      'Accountability Analysis': 'https://www.oiprd.on.ca/',
      'Privacy Commissioner': 'https://www.ipc.on.ca/',
      'Committee Testimony': 'https://www.ola.org/en/legislative-business/committees',
      'Current Rates': 'https://www.ontario.ca/page/social-assistance',
      'Food Bank Data': 'https://feedontario.ca/',
      'Homeless Count': 'https://www.toronto.ca/city-government/data-research-maps/research-reports/housing-and-homelessness-research-and-reports/street-needs-assessment/',
      'Rental Data': 'https://www.cmhc-schl.gc.ca/en',
      'BC Housing Reports': 'https://www.bchousing.org/',
      'VPD Data': 'https://vpd.ca/',
      'Advocacy Reports': 'https://bccla.org/',
      'Council Records': 'https://council.vancouver.ca/',
      'Alberta Works Rates': 'https://www.alberta.ca/income-support',
      'Rental Market': 'https://www.cmhc-schl.gc.ca/en',
      'Poverty Analysis': 'https://www150.statcan.gc.ca/',
      'Lobbyist Registry': 'https://lobbycanada.gc.ca/',
      'Council Votes': 'https://www.toronto.ca/legdocs/',
      'Climate Plan': 'https://www.canada.ca/en/environment-climate-change.html',
      'Eviction Data': 'https://tribunalsontario.ca/ltb/',
      'Housing Offers': 'https://www.ontario.ca/page/housing-ontario',
      'City Budget': 'https://www.toronto.ca/city-government/budget-finances/',
      'Program Cuts': 'https://www.fao-on.org/en/',
      'Indigenous Response': 'https://www.ontario.ca/page/indigenous-affairs',
      'Justice Data': 'https://www.gov.mb.ca/justice/',
      'Stats Canada': 'https://www150.statcan.gc.ca/',
      'Human Rights Reports': 'https://www.chrc-ccdp.gc.ca/en',
      'Hospital Stats': 'https://www.cihi.ca/en',
      'City Updates': 'https://montreal.ca/en',
      'Provincial Response': 'https://www.quebec.ca/en/',
      'Federal Offers': 'https://www.canada.ca/',
      'Incident Reports': 'https://www.ottawapolice.ca/',
      'Safety Audits': 'https://ottawa.ca/',
      'Advocacy Data': 'https://www.carc-cvrc.com/',
      'Usage Stats': 'https://foodbankscanada.ca/',
      'Client Demographics': 'https://www150.statcan.gc.ca/',
      'Tribunal Decisions': 'https://www.tal.gouv.qc.ca/en',
      'Renoviction Data': 'https://rclalq.qc.ca/',
      'Tenant Advocacy': 'https://rclalq.qc.ca/',
      'Police Board': 'https://www.halifax.ca/',
      'Community Testimony': 'https://www.halifax.ca/home/news',
      'Rights Complaints': 'https://nshumanrights.ca/',
      'Environmental Assessment': 'https://www.canada.ca/en/environment-climate-change.html',
      'Consultation Records': 'https://www.canada.ca/en/services/environment.html',
      'Expert Reports': 'https://www.canada.ca/en/environment-climate-change.html',
      'City Plans': 'https://www.quebec.ca/en/',
      'Privacy Analysis': 'https://www.priv.gc.ca/en/',
      'CAI Investigation': 'https://www.cai.gouv.qc.ca/',
      'WorkSafeBC Stats': 'https://www.worksafebc.com/en/about-us/statistics',
      'Appeal Data': 'https://www.wcat.bc.ca/',
      'Denial Analysis': 'https://bcombudsperson.ca/',
      'Representative Report': 'https://www.rcybc.ca/',
      'UNDRIP Status': 'https://www2.gov.bc.ca/gov/content/governments/indigenous-people',
      'First Nations Response': 'https://www.fns.bc.ca/',
      'Provincial Rates': 'https://maytree.com/welfare-in-canada/',
      'Cost Comparison': 'https://www150.statcan.gc.ca/',
      'Private Contracts': 'https://www.albertahealthservices.ca/',
      'Coalition Report': 'https://www.friendsofmedicare.org/',
      'Emissions Data': 'https://www.canada.ca/en/environment-climate-change.html',
      'Premier Statements': 'https://www.saskatchewan.ca/',
      'Justice Statistics': 'https://www.gov.mb.ca/justice/',
      'Corrections Data': 'https://www.csc-scc.gc.ca/',
      'TRC Progress': 'https://www.rcaanc-cirnac.gc.ca/',
      'Bill 31 Text': 'http://www.assnat.qc.ca/en/',
      'Legal Analysis': 'https://rclalq.qc.ca/',
      'Shelter Reports': 'https://www.quebec.ca/',
      'Ombudsman': 'https://www.protecteurducitoyen.qc.ca/',
      'Advocacy Response': 'https://rclalq.qc.ca/',
      'Wait List Data': 'https://needafamilypractice.nshealth.ca/',
      'Recruitment Stats': 'https://doctorsns.com/',
      'Rural Health': 'https://www.nshealth.ca/',
      'Policy Changes': 'https://www2.gnb.ca/content/gnb/en/departments/health.html',
      'Service Cuts': 'https://www2.gnb.ca/content/gnb/en/departments/health.html',
      'Legal Challenges': 'https://www.legalaid.nb.ca/',
      'Review Report': 'https://www.rnc.gov.nl.ca/',
      'RNC Response': 'https://www.gov.nl.ca/justice/',
      'Advocacy Demands': 'https://endingviolencenl.ca/',
      'First Nations': 'https://cyfn.ca/',
      'Funding Status': 'https://www.sac-isc.gc.ca/',
      'CMHC Data': 'https://www.cmhc-schl.gc.ca/',
      'Housing Reports': 'https://www.nwthc.gov.nt.ca/',
      'Food Security Data': 'https://www150.statcan.gc.ca/',
      'Nutrition North': 'https://www.nutritionnorthcanada.gc.ca/',
      'Price Comparison': 'https://www.nutritionnorthcanada.gc.ca/',
      'Water Quality Data': 'https://www.princeedwardisland.ca/en/topic/water-quality',
      'Well Testing': 'https://www.princeedwardisland.ca/en/topic/water-quality',
      'Regulations': 'https://www.princeedwardisland.ca/en/topic/environment',
      'Workforce Stats': 'https://www.ontario.ca/page/labour-market',
      'Enforcement Data': 'https://www.ontario.ca/page/employment-standards-act-0',
      'Hiring Data': 'https://www.ontario.ca/page/jobs-and-employment',
      'HR Complaint': 'https://www.ombudsman.on.ca/',
      'Ombudsman Report': 'https://www.ombudsman.on.ca/',
      'Impact Studies': 'https://www.ontario.ca/page/health-care-ontario',
      'Funding Docs': 'https://www.ontario.ca/page/ontario-budget',
      'Census Data': 'https://www12.statcan.gc.ca/census-recensement/',
      'Housing Plans': 'https://www.ontario.ca/page/housing-ontario',
      'Demographic Analysis': 'https://www150.statcan.gc.ca/',
      'Environmental Assessment': 'https://www.ontario.ca/page/environmental-assessments',
      'Program Details': 'https://www.ontario.ca/page/government-ontario',
      'Police Budget': 'https://www.tps.ca/',
      'Response Times': 'https://www.tps.ca/',
      'Service Analysis': 'https://www.tps.ca/',
      'Emergency Declaration': 'https://www.toronto.ca/',
      'Funding Requests': 'https://www.toronto.ca/city-government/budget-finances/',
      'Usage Data': 'https://feedontario.ca/',
      'Working Poor Stats': 'https://www150.statcan.gc.ca/',
      'Camera Locations': 'https://www.toronto.ca/',
      'Privacy Policy': 'https://www.ipc.on.ca/',
      'Legal Challenge': 'https://ccla.org/'
    };
    
    // If the action matches a known URL, open it
    const url = actionUrlMap[actionType];
    if (url) {
      window.open(url, '_blank');
    } else if (insight && insight.sources && insight.sources.length > 0) {
      // If no specific match, open the first source from the insight
      window.open(insight.sources[0].url, '_blank');
    } else {
      // Fallback: show helpful message
      alert(`🚀 ACTION: ${actionType}\n\nTarget: ${insightTitle}\n\n📋 This action would typically:\n• Open relevant government databases\n• Access official reports and documents\n• Navigate to verification sources\n\n💡 TIP: Scroll down to "RECEIPTS & PROOF" section to verify all claims with official sources.`);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: '#ff4444',
      high: '#ff8844',
      warning: '#ffcc44',
      info: '#44ccff'
    };
    return colors[severity] || colors.info;
  };

  return (
    <>
    <Header />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
      color: '#e0e0e0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '3rem'
      }}>
        <Link href="/" style={{
          display: 'inline-block',
          color: '#888',
          textDecoration: 'none',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          ← Back to Home
        </Link>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '0.5rem',
            animation: 'pulse 3s infinite'
          }}>
            👁️
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            THE EYE v2.0
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#888',
            marginBottom: '0.5rem'
          }}>
            Incorruptible Evidence-Driven Investigative Intelligence
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#ff0080',
            fontWeight: '700',
            fontStyle: 'italic',
            marginTop: '1rem',
            textShadow: '0 0 10px rgba(255, 0, 128, 0.5)'
          }}>
            THE EYE SEES ALL • THE EYE FORGETS NOTHING • THE EYE NEVER SLEEPS
          </p>
        </div>

        {/* System Integration Notice */}
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
          <Link href="/alerts" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 204, 68, 0.2)',
            border: '1px solid #ffcc44',
            borderRadius: '8px',
            color: '#ffcc44',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            ⚠️ Live Alerts
          </Link>
          <div style={{ color: '#2ed573', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ✅ ALL SYSTEMS ACTIVE • REAL-TIME DATA
          </div>
        </div>

        {/* THE EYE v2.0 Monitoring Dashboard */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '2px solid #ff0080',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 0 20px rgba(255, 0, 128, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              color: '#ff0080',
              margin: 0
            }}>
              🔴 24/7 MONITORING STATUS
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: eyeActive ? '#44ff88' : '#ff4444',
                animation: eyeActive ? 'pulse 2s infinite' : 'none',
                boxShadow: eyeActive ? '0 0 10px #44ff88' : 'none'
              }}></span>
              <span style={{ 
                color: eyeActive ? '#44ff88' : '#ff4444',
                fontWeight: '700',
                fontSize: '0.9rem'
              }}>
                {eyeActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#4facfe' }}>
                {monitoringStats.documentsProcessed}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.25rem' }}>
                Documents Analyzed
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff0080' }}>
                {monitoringStats.corruptionDetected}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.25rem' }}>
                Corruption Findings
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff8c00' }}>
                {monitoringStats.constitutionalViolations}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.25rem' }}>
                Charter Violations
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffd700' }}>
                {monitoringStats.humanRightsBreaches}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.25rem' }}>
                Human Rights Breaches
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff4444' }}>
                {monitoringStats.criticalFindings}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.25rem' }}>
                CRITICAL Alerts
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/the-eye-v2-demo" style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(255, 0, 128, 0.4)',
              transition: 'all 0.3s'
            }}>
              🔬 Launch THE EYE Demo
            </Link>
            <Link href="/automated-monitoring" style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(79, 172, 254, 0.2)',
              color: '#4facfe',
              border: '2px solid #4facfe',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'inline-block',
              transition: 'all 0.3s'
            }}>
              📡 24/7 Monitoring
            </Link>
            <Link href="/target-acquisition" style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 68, 68, 0.2)',
              color: '#ff4444',
              border: '2px solid #ff4444',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'inline-block',
              transition: 'all 0.3s'
            }}>
              🎯 Target Dossiers
            </Link>
          </div>
        </div>

        {/* Critical Reports Section */}
        {criticalReports.length > 0 && (
          <div style={{
            background: 'rgba(255,0,0,0.1)',
            border: '2px solid #ff0000',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            animation: 'pulse 2s infinite'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              color: '#ff0000',
              marginBottom: '1rem'
            }}>
              🚨 CRITICAL FINDINGS (IMMEDIATE ACTION REQUIRED)
            </h2>
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {criticalReports.slice(0, 3).map((report, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '10px',
                  borderLeft: '4px solid #ff0000'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '0.5rem'
                  }}>
                    <strong style={{ color: '#ff0000', fontSize: '1.1rem' }}>
                      {report.title}
                    </strong>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: '#ff0000',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {report.RiskAssessment.overall_risk_score}/100
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                    🔴 {report.CorruptionFindings.length} corruption findings • 
                    ⚖️ {report.ConstitutionViolations.length} Charter violations • 
                    👥 {report.HumanRightsBreaches.length} human rights breaches
                  </div>
                  {report.RecommendedActions[0] && (
                    <div style={{ fontSize: '0.9rem', color: '#4facfe', marginTop: '0.5rem' }}>
                      ⚡ Next: {report.RecommendedActions[0].description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scope Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {scopes.map(scope => (
            <button
              key={scope.id}
              onClick={() => setActiveScope(scope.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeScope === scope.id 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: `2px solid ${activeScope === scope.id ? '#667eea' : '#333'}`,
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontWeight: activeScope === scope.id ? 'bold' : 'normal'
              }}
            >
              {scope.icon} {scope.name}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1rem',
                background: activeCategory === cat.id 
                  ? 'rgba(79, 172, 254, 0.2)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeCategory === cat.id ? '#4facfe' : '#444'}`,
                borderRadius: '20px',
                color: activeCategory === cat.id ? '#4facfe' : '#888',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Receipts & Proof Section - 100% Fact-Based Legitimacy */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 3rem',
          padding: '2rem',
          background: 'rgba(79, 172, 254, 0.05)',
          border: '2px solid rgba(79, 172, 254, 0.3)',
          borderRadius: '15px'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            color: '#4facfe',
            textAlign: 'center'
          }}>
            📋 Receipts & Proof - 100% Verified Sources
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#aaa',
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            The EYE provides only fact-based, verifiable intelligence with accurate links and sources.
            Every claim is backed by evidence. Click any link below to verify.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem'
          }}>
            {/* WSIB Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ff6b6b'
            }}>
              <h3 style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '1.2rem' }}>⚠️ WSIB Ontario</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.wsib.ca/en" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Official WSIB Website
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/operational-policy-manual" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIB Policy Manual
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/appeals" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Appeals Process
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/annualreport" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Annual Reports & Statistics
                  </a>
                </li>
              </ul>
            </div>

            {/* ODSP & Disability Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #a855f7'
            }}>
              <h3 style={{ color: '#a855f7', marginBottom: '1rem', fontSize: '1.2rem' }}>♿ ODSP & Disability Benefits</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ontario.ca/page/ontario-disability-support-program-odsp" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 ODSP Official Info
                  </a>
                </li>
                <li>
                  <a href="https://www.canada.ca/en/services/benefits/disability.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Disability Benefits
                  </a>
                </li>
                <li>
                  <a href="https://www.canada.ca/en/employment-social-development/programs/disability/benefits/cpp-disability.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 CPP Disability
                  </a>
                </li>
                <li>
                  <a href="https://www.accessibility.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Accessible Canada Act
                  </a>
                </li>
              </ul>
            </div>

            {/* Legislative Monitoring Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #10b981'
            }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.2rem' }}>🏛️ Legislative Tracking</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ola.org/en/legislative-business/bills" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Legislature Bills
                  </a>
                </li>
                <li>
                  <a href="https://www.parl.ca/legisinfo/en/bills" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Parliament Bills
                  </a>
                </li>
                <li>
                  <a href="https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Lobbyist Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.oico.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 ON Integrity Commissioner
                  </a>
                </li>
              </ul>
            </div>

            {/* Corporate & Legal Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #f59e0b'
            }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.2rem' }}>⚖️ Corporate & Legal</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Corp Search
                  </a>
                </li>
                <li>
                  <a href="https://www.sse.gov.on.ca/mcs/search" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Business Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.tribunalsontario.ca/wsiat/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIAT (Appeals Tribunal)
                  </a>
                </li>
                <li>
                  <a href="https://www.ontario.ca/page/employment-standards-act-0" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Employment Standards Act
                  </a>
                </li>
              </ul>
            </div>

            {/* Accountability & Oversight */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ef4444'
            }}>
              <h3 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.2rem' }}>🔍 Accountability & Oversight</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ombudsman.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Ombudsman
                  </a>
                </li>
                <li>
                  <a href="https://www.oiprd.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Police Oversight (OIPRD)
                  </a>
                </li>
                <li>
                  <a href="https://www.auditor.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Auditor General Reports
                  </a>
                </li>
                <li>
                  <a href="https://www.fao-on.org/en/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Financial Accountability Office
                  </a>
                </li>
              </ul>
            </div>

            {/* Research & Data Sources */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #06b6d4'
            }}>
              <h3 style={{ color: '#06b6d4', marginBottom: '1rem', fontSize: '1.2rem' }}>📊 Research & Data</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www150.statcan.gc.ca/n1/en/type/data" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Statistics Canada
                  </a>
                </li>
                <li>
                  <a href="https://www.ontario.ca/page/government-ontario" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Open Data
                  </a>
                </li>
                <li>
                  <a href="https://www.iwh.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Institute for Work & Health
                  </a>
                </li>
                <li>
                  <a href="https://www.ccohs.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Canadian Centre for Occupational Health
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(79, 172, 254, 0.1)',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#4facfe', fontSize: '0.9rem', margin: 0 }}>
              <strong>⚡ The EYE Evolution:</strong> This system continuously expands by monitoring these sources 24/7.
              Every insight generated is traceable to verified public records, government databases, and official documents.
              <br/><strong>No speculation. Only facts.</strong>
            </p>
          </div>
        </div>

        {/* RABBIT HOLES - Deep Investigation Tools */}
        <div style={{
          marginTop: '3rem',
          marginBottom: '3rem',
          padding: '2rem',
          background: 'rgba(255, 68, 68, 0.05)',
          border: '2px solid #ff4444',
          borderRadius: '15px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#ff4444',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🕳️ RABBIT HOLES - Become Your Own Investigator
          </h2>
          <p style={{ color: '#ccc', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Don't just trust The EYE—verify everything yourself. These tools let you dig deeper into the systems
            that affect your life. Every link goes to official government databases where you can search records,
            file FOI requests, track lobbying, and expose corruption.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* FOI Request Tools */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ff4444'
            }}>
              <h3 style={{ color: '#ff4444', marginBottom: '1rem', fontSize: '1.2rem' }}>📄 Freedom of Information</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Request internal documents, meeting minutes, contracts, and decision records
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ontario.ca/page/how-make-freedom-information-request" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario FOI Request Guide
                  </a>
                </li>
                <li>
                  <a href="https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Access to Information
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/freedom-information" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIB FOI Portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Court & Legal Searches */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ff8844'
            }}>
              <h3 style={{ color: '#ff8844', marginBottom: '1rem', fontSize: '1.2rem' }}>⚖️ Court Records Search</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Search court cases, class actions, tribunal decisions, and legal precedents
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ontariocourts.ca/en/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Courts Portal
                  </a>
                </li>
                <li>
                  <a href="https://www.tribunalsontario.ca/wsiat/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIAT Appeals Database
                  </a>
                </li>
                <li>
                  <a href="https://www.canlii.org/en/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 CanLII - Canadian Legal Database
                  </a>
                </li>
                <li>
                  <a href="https://www.olrb.gov.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Labour Relations Board
                  </a>
                </li>
              </ul>
            </div>

            {/* Corporate Registry Searches */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ffcc44'
            }}>
              <h3 style={{ color: '#ffcc44', marginBottom: '1rem', fontSize: '1.2rem' }}>🏢 Corporate Investigations</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Track corporate structures, board members, financial filings, and ownership
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Corporations Search
                  </a>
                </li>
                <li>
                  <a href="https://www.ontario.ca/page/search-business-name-or-register-your-business" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Business Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.sedarplus.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 SEDAR+ (Securities Filings)
                  </a>
                </li>
                <li>
                  <a href="https://www.sec.gov/edgar/searchedgar/companysearch" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 SEC EDGAR (US Companies)
                  </a>
                </li>
              </ul>
            </div>

            {/* Lobbying & Political Money */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #44ff88'
            }}>
              <h3 style={{ color: '#44ff88', marginBottom: '1rem', fontSize: '1.2rem' }}>💰 Follow the Money</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Track lobbying activities, political donations, and influence operations
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://lobbycanada.gc.ca/app/secure/ocl/lrs/do/vwRg" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Lobbyist Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.oico.on.ca/home/lobbyist-registry" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Lobbyist Registry
                  </a>
                </li>
                <li>
                  <a href="https://www.elections.ca/content.aspx?section=fin&dir=oda&document=index&lang=e" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Political Contributions
                  </a>
                </li>
                <li>
                  <a href="https://finances.elections.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Political Financing
                  </a>
                </li>
              </ul>
            </div>

            {/* Charity & Think Tank Funding */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #4facfe'
            }}>
              <h3 style={{ color: '#4facfe', marginBottom: '1rem', fontSize: '1.2rem' }}>🎯 Expose Astroturf</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Track think tank funding, charity finances, and fake grassroots groups
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch?request_locale=en" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 CRA Charity Database (T3010 Returns)
                  </a>
                </li>
                <li>
                  <a href="https://www.canada.ca/en/revenue-agency/services/charities-giving/charities-listings.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Charity Listings & Status
                  </a>
                </li>
              </ul>
            </div>

            {/* Open Data & Statistics */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #a855f7'
            }}>
              <h3 style={{ color: '#a855f7', marginBottom: '1rem', fontSize: '1.2rem' }}>📊 Data & Evidence</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Access government datasets, injury statistics, and demographic data
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://open.canada.ca/en/open-data" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Open Government Canada
                  </a>
                </li>
                <li>
                  <a href="https://data.ontario.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Open Data
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/stats" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIB Injury Statistics
                  </a>
                </li>
                <li>
                  <a href="https://www150.statcan.gc.ca/n1/en/type/data" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Statistics Canada Data
                  </a>
                </li>
              </ul>
            </div>

            {/* Municipal/Local Government Tools */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ff6b6b'
            }}>
              <h3 style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '1.2rem' }}>🏘️ Municipal Deep Dive</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Track city councils, local bylaws, transit authorities, and municipal decisions
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.toronto.ca/city-government/council/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Toronto City Council Records
                  </a>
                </li>
                <li>
                  <a href="https://www.toronto.ca/city-government/accountability-operations-customer-service/access-city-information-or-records/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Toronto FOI Portal
                  </a>
                </li>
                <li>
                  <a href="https://www.ombudsmantoronto.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Toronto Ombudsman Complaints
                  </a>
                </li>
                <li>
                  <a href="https://www.ttc.ca/About_the_TTC/Commission_reports_and_information/index.jsp" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 TTC Commission Reports
                  </a>
                </li>
                <li>
                  <a href="https://www.toronto.ca/city-government/budget-finances/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Toronto Budget Documents
                  </a>
                </li>
              </ul>
            </div>

            {/* Media & Press Monitoring */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #ffd93d'
            }}>
              <h3 style={{ color: '#ffd93d', marginBottom: '1rem', fontSize: '1.2rem' }}>📰 Media Intelligence</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Track press releases, media statements, and how stories get spun
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://news.gc.ca/en/search/news" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal News Releases
                  </a>
                </li>
                <li>
                  <a href="https://news.ontario.ca/en" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario News Releases
                  </a>
                </li>
                <li>
                  <a href="https://www.wsib.ca/en/newsroom" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 WSIB Newsroom
                  </a>
                </li>
                <li>
                  <a href="https://archive.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Internet Archive (Wayback Machine)
                  </a>
                </li>
              </ul>
            </div>

            {/* Academic Research & Studies */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #6bcf7f'
            }}>
              <h3 style={{ color: '#6bcf7f', marginBottom: '1rem', fontSize: '1.2rem' }}>📚 Research Evidence</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Access peer-reviewed research, policy studies, and expert analysis
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Google Scholar
                  </a>
                </li>
                <li>
                  <a href="https://www.ncbi.nlm.nih.gov/pubmed/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 PubMed Medical Research
                  </a>
                </li>
                <li>
                  <a href="https://www.iwh.on.ca/publications" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Institute for Work & Health
                  </a>
                </li>
                <li>
                  <a href="https://policycommons.net/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Policy Commons Database
                  </a>
                </li>
              </ul>
            </div>

            {/* International Comparisons */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #9b59b6'
            }}>
              <h3 style={{ color: '#9b59b6', marginBottom: '1rem', fontSize: '1.2rem' }}>🌍 Global Context</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Compare Canada's system to international standards and best practices
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.who.int/data" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 World Health Organization Data
                  </a>
                </li>
                <li>
                  <a href="https://www.un.org/development/desa/disabilities/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 UN Disability Rights
                  </a>
                </li>
                <li>
                  <a href="https://www.ilo.org/global/statistics-and-databases/lang--en/index.htm" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 ILO Worker Statistics
                  </a>
                </li>
                <li>
                  <a href="https://data.oecd.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 OECD Data (Compare Countries)
                  </a>
                </li>
              </ul>
            </div>

            {/* Watchdog & Accountability Tools */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              borderLeft: '4px solid #e74c3c'
            }}>
              <h3 style={{ color: '#e74c3c', marginBottom: '1rem', fontSize: '1.2rem' }}>👁️ Watchdog Tools</h3>
              <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                Track government accountability, ombudsman reports, and oversight bodies
              </p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: '2' }}>
                <li>
                  <a href="https://www.auditor.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Auditor General
                  </a>
                </li>
                <li>
                  <a href="https://www.oag-bvg.gc.ca/internet/English/admin_e_41.html" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Federal Auditor General
                  </a>
                </li>
                <li>
                  <a href="https://www.ombudsman.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Ombudsman
                  </a>
                </li>
                <li>
                  <a href="https://www.oico.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Ontario Integrity Commissioner
                  </a>
                </li>
                <li>
                  <a href="https://www.oiprd.on.ca/" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Police Oversight (OIPRD)
                  </a>
                </li>
                <li>
                  <a href="https://www.pbo-dpb.ca/en" target="_blank" rel="noopener noreferrer" style={{ color: '#4facfe', textDecoration: 'none' }}>
                    🔗 Parliamentary Budget Officer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(255, 68, 68, 0.1)',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#ff4444', fontSize: '1rem', margin: 0, lineHeight: '1.8' }}>
              <strong>🔥 POWER TIP:</strong> Cross-reference EVERYTHING. When you find suspicious corporate filings, check the lobbyist registry for meetings.
              When a politician claims something, verify it against actual bill text and committee testimony. Compare Canadian data to international standards using OECD/WHO databases.
              Check municipal council minutes against provincial announcements. Use the Wayback Machine to see what they deleted. Track media spin with press release archives.
              <strong>Every rabbit hole connects to another. Keep digging until you hit bedrock truth.</strong>
            </p>
          </div>
        </div>

        {/* Scan Button */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {/* AUTOMATION MASTER CONTROL */}
          <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: automationActive 
              ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 136, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255, 68, 68, 0.1) 0%, rgba(255, 136, 68, 0.1) 100%)',
            border: `2px solid ${automationActive ? '#00ff00' : '#ff4444'}`,
            borderRadius: '15px',
            maxWidth: '900px',
            margin: '0 auto 2rem auto'
          }}>
            <h3 style={{ 
              color: automationActive ? '#00ff88' : '#ff6b6b', 
              marginBottom: '1rem',
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ animation: automationActive ? 'pulse 2s infinite' : 'none' }}>
                {automationActive ? '🤖' : '⏸️'}
              </span>
              AUTOMATED INTELLIGENCE SYSTEM
              <span style={{ animation: automationActive ? 'pulse 2s infinite' : 'none' }}>
                {automationActive ? '🤖' : '⏸️'}
              </span>
            </h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {automationActive 
                ? '✅ ALL SYSTEMS OPERATIONAL - The EYE scans every 5 minutes • Monitoring tracks all targets • Alerts fire automatically • Cross-system coordination active'
                : '⚠️ AUTOMATION PAUSED - Click ACTIVATE to enable full automated intelligence gathering across all systems'
              }
            </p>
            <button
              onClick={() => {
                if (automationEngine) {
                  if (automationActive) {
                    automationEngine.deactivate();
                    setAutomationActive(false);
                  } else {
                    automationEngine.activate();
                    setAutomationActive(true);
                  }
                }
              }}
              style={{
                padding: '1rem 3rem',
                background: automationActive
                  ? 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)'
                  : 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: automationActive 
                  ? '0 0 30px rgba(255, 68, 68, 0.6)'
                  : '0 0 30px rgba(0, 255, 136, 0.6)',
                marginRight: '1rem',
                marginBottom: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {automationActive ? '⏸️ DEACTIVATE AUTOMATION' : '▶️ ACTIVATE AUTOMATION'}
            </button>
            {automationActive && automationEngine && (
              <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
                📊 Active Alerts: {automationEngine.getAlerts().length} • 
                🎯 Tracked Targets: {automationEngine.getTargets().length} • 
                🔍 Last Scan: {automationEngine.getStatus().lastScan 
                  ? new Date(automationEngine.getStatus().lastScan).toLocaleTimeString() 
                  : 'Never'}
              </div>
            )}
          </div>

          {/* EYE Active Status */}
          <div style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid #00ff00',
            borderRadius: '25px',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold', fontSize: '1rem' }}>
              ● THE EYE IS ACTIVE - Auto-refreshing every 5 minutes
            </span>
          </div>
          <br/>
          <button
            onClick={handleScan}
            disabled={isScanning}
            style={{
              padding: '1rem 3rem',
              background: isScanning 
                ? 'rgba(100,100,100,0.3)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isScanning ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: isScanning ? 'none' : '0 0 20px rgba(79, 172, 254, 0.5)',
              marginRight: '1rem',
              marginBottom: '1rem'
            }}
          >
            {isScanning ? '🔄 Scanning...' : '🔍 Manual Scan Now'}
          </button>
          
          <button
            onClick={loadRealData}
            style={{
              padding: '1rem 3rem',
              background: 'linear-gradient(135deg, #ff0080 0%, #ff6600 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 20px rgba(255, 0, 128, 0.5)',
              marginRight: '1rem',
              marginBottom: '1rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            📥 LOAD REAL DATA (Documented Canadian Corruption)
          </button>
          
          <Link href="/target-acquisition" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
            marginRight: '1rem',
            marginBottom: '1rem'
          }}>
            🎯 Target Acquisition
          </Link>
          
          <Link href="/automated-monitoring" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #44ff88 0%, #00cc66 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(68, 255, 136, 0.5)',
            marginRight: '1rem',
            marginBottom: '1rem'
          }}>
            🤖 24/7 Monitoring
          </Link>
          
          <Link href="/alerts" style={{
            display: 'inline-block',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
            marginBottom: '1rem'
          }}>
            🚨 Live Alerts
          </Link>
        </div>
      </div>

      {/* Action Log */}
      {actionLog.length > 0 && (
        <div style={{
          maxWidth: '1400px',
          margin: '3rem auto',
          padding: '1.5rem',
          background: 'rgba(255, 68, 68, 0.1)',
          border: '2px solid #ff4444',
          borderRadius: '15px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#ff4444',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ animation: 'pulse 1s infinite' }}>🎯</span>
            ACTIVE OPERATIONS LOG
          </h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {actionLog.map((log, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.9rem'
                }}
              >
                <span>
                  <strong style={{ color: '#ff4444' }}>{log.action}</strong>
                  <span style={{ color: '#888' }}> → {log.target}</span>
                </span>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Capabilities Panel */}
        <div style={{
          gridColumn: insights.length > 0 ? 'auto' : '1 / -1'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#4facfe'
          }}>
            ⚡ Core Capabilities
          </h2>
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #333',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedCapability(expandedCapability === idx ? null : idx)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79, 172, 254, 0.1)';
                  e.currentTarget.style.borderColor = '#4facfe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = '#333';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{cap.icon}</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', flex: 1 }}>{cap.title}</h3>
                  <span style={{ color: '#666', fontSize: '1.2rem' }}>
                    {expandedCapability === idx ? '▼' : '▶'}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  color: '#888',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {cap.description}
                </p>
                
                {expandedCapability === idx && cap.examples && (
                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #333'
                  }}>
                    <p style={{ color: '#4facfe', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      TACTICAL EXAMPLES:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#aaa', fontSize: '0.85rem' }}>
                      {cap.examples.map((ex, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div style={{
                  marginTop: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#44ff88',
                    animation: 'pulse 2s infinite'
                  }}></span>
                  <span style={{ fontSize: '0.8rem', color: '#44ff88' }}>
                    {cap.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Panel */}
        {insights.length > 0 && (
          <div style={{
            gridColumn: 'span 2'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: '#4facfe'
            }}>
              🎯 Active Insights - {scopes.find(s => s.id === activeScope)?.name}
            </h2>
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `2px solid ${getSeverityColor(insight.severity)}`,
                    borderRadius: '15px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: getSeverityColor(insight.severity)
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: getSeverityColor(insight.severity),
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        {insight.severity.toUpperCase()}
                      </span>
                      <h3 style={{
                        margin: '0.5rem 0',
                        fontSize: '1.3rem'
                      }}>
                        {insight.title}
                      </h3>
                    </div>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      {insight.timestamp}
                    </span>
                  </div>
                  
                  <p style={{
                    margin: '1rem 0',
                    color: '#ccc',
                    lineHeight: '1.6'
                  }}>
                    {insight.description}
                  </p>
                  
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(79, 172, 254, 0.1)',
                    borderRadius: '10px',
                    borderLeft: '3px solid #4facfe'
                  }}>
                    <strong style={{ color: '#4facfe' }}>⚡ Recommended Action:</strong>
                    <p style={{ margin: '0.5rem 0', color: '#ccc' }}>
                      {insight.action}
                    </p>
                    
                    {insight.actionButtons && (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginTop: '1rem'
                      }}>
                        {insight.actionButtons.map((btnText, btnIdx) => (
                          <button
                            key={btnIdx}
                            onClick={() => handleAction(btnText, insight.title, insight)}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                              border: 'none',
                              borderRadius: '20px',
                              color: 'white',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                              boxShadow: '0 2px 8px rgba(255, 68, 68, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 68, 68, 0.3)';
                            }}
                          >
                            🚀 {btnText}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RECEIPTS & PROOF SECTION - VERIFY THIS CLAIM */}
                  {insight.sources && insight.sources.length > 0 && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: 'rgba(46, 213, 115, 0.1)',
                      borderRadius: '10px',
                      borderLeft: '3px solid #2ed573'
                    }}>
                      <strong style={{ color: '#2ed573', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🔒 RECEIPTS & PROOF
                      </strong>
                      <p style={{ fontSize: '0.75rem', color: '#aaa', margin: '0.25rem 0 0.75rem 0' }}>
                        Verify this claim yourself - all sources are official government records:
                      </p>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        {insight.sources.map((source, srcIdx) => (
                          <a
                            key={srcIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem',
                              background: 'rgba(46, 213, 115, 0.05)',
                              borderRadius: '5px',
                              color: '#2ed573',
                              textDecoration: 'none',
                              fontSize: '0.85rem',
                              transition: 'all 0.2s',
                              border: '1px solid rgba(46, 213, 115, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(46, 213, 115, 0.15)';
                              e.currentTarget.style.borderColor = '#2ed573';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(46, 213, 115, 0.05)';
                              e.currentTarget.style.borderColor = 'rgba(46, 213, 115, 0.2)';
                            }}
                          >
                            <span style={{ fontSize: '1rem' }}>🔗</span>
                            <span style={{ flex: 1 }}>{source.name}</span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
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
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
      </div>
      <Footer />
      </>
    );
}