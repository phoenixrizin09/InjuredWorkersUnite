import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE v2.0
 * 
 * Incorruptible Evidence-Driven Investigative Intelligence
 * 
 * THE EYE SEES ALL • THE EYE FORGETS NOTHING • THE EYE NEVER SLEEPS
 * 
 * Complete dashboard with RABBIT HOLES investigation tools
 * All links to REAL government databases - no demo data
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function TheEyeOracle() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // ═══════════════════════════════════════════════════════════════════════════
  // RABBIT HOLES - Official Government Investigation Tools
  // Every link verified to real government databases
  // ═══════════════════════════════════════════════════════════════════════════

  const RABBIT_HOLES = {
    foi: {
      title: '📜 Freedom of Information',
      description: 'File requests to access government records they don\'t want you to see',
      tools: [
        { name: 'Access to Information Canada', url: 'https://www.canada.ca/en/treasury-board-secretariat/services/access-information-privacy/access-information.html', desc: 'Federal ATIP requests' },
        { name: 'Ontario FOI Request', url: 'https://www.ontario.ca/page/how-make-freedom-information-request', desc: 'Provincial records access' },
        { name: 'BC FOI Portal', url: 'https://www2.gov.bc.ca/gov/content/governments/about-the-bc-government/open-government/open-information/freedom-of-information', desc: 'BC public records' },
        { name: 'Alberta FOIP', url: 'https://www.alberta.ca/freedom-of-information-and-protection-of-privacy.aspx', desc: 'Alberta government records' },
        { name: 'Quebec Access to Documents', url: 'https://www.cai.gouv.qc.ca/english/', desc: 'Commission d\'accès à l\'information' },
        { name: 'Manitoba FIPPA', url: 'https://www.gov.mb.ca/fippa/', desc: 'Manitoba information access' },
        { name: 'Saskatchewan FOI', url: 'https://www.saskatchewan.ca/government/government-structure/access-to-information-and-privacy', desc: 'Saskatchewan records' },
        { name: 'Nova Scotia FOIPOP', url: 'https://novascotia.ca/foipop/', desc: 'Nova Scotia public records' },
        { name: 'New Brunswick RTI', url: 'https://www2.gnb.ca/content/gnb/en/departments/justice/attorney_general/content/right_to_information.html', desc: 'Right to Information' }
      ]
    },
    lobbying: {
      title: '💰 Lobbying Registries',
      description: 'See who\'s paying to influence government decisions against workers',
      tools: [
        { name: 'Federal Lobbyist Registry', url: 'https://lobbycanada.gc.ca/', desc: 'Who\'s lobbying Parliament' },
        { name: 'Ontario Lobbyist Registry', url: 'https://www.oico.on.ca/en/lobbyists-registry', desc: 'Ontario lobbying records' },
        { name: 'BC Lobbyist Registry', url: 'https://www.lobbyistsregistrar.bc.ca/', desc: 'BC lobbying activities' },
        { name: 'Alberta Lobbyist Registry', url: 'https://www.albertalobbyistregistry.ca/', desc: 'Alberta lobbying records' },
        { name: 'Quebec Lobbyist Registry', url: 'https://www.commissairelobby.qc.ca/en/', desc: 'Quebec lobbying transparency' },
        { name: 'Corporations Canada', url: 'https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html', desc: 'Federal corporate registry' }
      ]
    },
    corporate: {
      title: '🏢 Corporate Filings',
      description: 'Dig into the companies and insurers making decisions about your benefits',
      tools: [
        { name: 'SEDAR+', url: 'https://www.sedarplus.ca/', desc: 'Public company filings' },
        { name: 'Corporations Canada Search', url: 'https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html', desc: 'Federal corporate search' },
        { name: 'Ontario Business Registry', url: 'https://www.ontario.ca/page/ontario-business-registry', desc: 'Ontario corporate records' },
        { name: 'BC Corporate Registry', url: 'https://www.corporateonline.gov.bc.ca/', desc: 'BC business search' },
        { name: 'Alberta Corporate Registry', url: 'https://www.alberta.ca/corporate-registry.aspx', desc: 'Alberta business records' },
        { name: 'Quebec Business Registry', url: 'https://www.registreentreprises.gouv.qc.ca/', desc: 'Registraire des entreprises' },
        { name: 'CRA Charity Search', url: 'https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyBscSrch', desc: 'Registered charity lookup' }
      ]
    },
    courts: {
      title: '⚖️ Court Records',
      description: 'Find precedents and see how tribunals have ruled in similar cases',
      tools: [
        { name: 'CanLII', url: 'https://www.canlii.org/', desc: 'Free Canadian case law' },
        { name: 'Supreme Court of Canada', url: 'https://www.scc-csc.ca/', desc: 'Supreme Court decisions' },
        { name: 'Federal Court', url: 'https://www.fct-cf.gc.ca/en/home', desc: 'Federal court records' },
        { name: 'Ontario Court Services', url: 'https://www.ontariocourts.ca/', desc: 'Ontario court decisions' },
        { name: 'WSIAT Decisions', url: 'https://www.wsiat.on.ca/en/home/index.htm', desc: 'WSIB appeals tribunal' },
        { name: 'BC Civil Resolution', url: 'https://civilresolutionbc.ca/', desc: 'BC tribunal portal' },
        { name: 'Alberta Court Decisions', url: 'https://www.albertacourts.ca/', desc: 'Alberta judgments' },
        { name: 'Human Rights Tribunals', url: 'https://www.chrc-ccdp.gc.ca/', desc: 'Canadian Human Rights Commission' }
      ]
    },
    parliament: {
      title: '🏛️ Parliamentary Records',
      description: 'Track bills, committee meetings, and what your MPs are really doing',
      tools: [
        { name: 'LEGISinfo', url: 'https://www.parl.ca/legisinfo/', desc: 'Track federal bills' },
        { name: 'House of Commons', url: 'https://www.ourcommons.ca/', desc: 'Hansard and debates' },
        { name: 'Senate of Canada', url: 'https://sencanada.ca/', desc: 'Senate proceedings' },
        { name: 'Committee Meetings', url: 'https://www.ourcommons.ca/Committees/en/Home', desc: 'Parliamentary committees' },
        { name: 'Ontario Legislative Assembly', url: 'https://www.ola.org/', desc: 'Ontario parliament' },
        { name: 'BC Legislature', url: 'https://www.leg.bc.ca/', desc: 'BC legislative assembly' },
        { name: 'Alberta Legislature', url: 'https://www.assembly.ab.ca/', desc: 'Alberta assembly' },
        { name: 'Quebec National Assembly', url: 'http://www.assnat.qc.ca/', desc: 'Assemblée nationale' }
      ]
    },
    wcb: {
      title: '👷 Workers\' Compensation Boards',
      description: 'Direct links to every provincial WCB - know your rights and their obligations',
      tools: [
        { name: 'WSIB Ontario', url: 'https://www.wsib.ca/', desc: 'Workplace Safety and Insurance Board' },
        { name: 'WorkSafeBC', url: 'https://www.worksafebc.com/', desc: 'BC workers\' compensation' },
        { name: 'WCB Alberta', url: 'https://www.wcb.ab.ca/', desc: 'Alberta WCB' },
        { name: 'CNESST Quebec', url: 'https://www.cnesst.gouv.qc.ca/', desc: 'Quebec workplace safety' },
        { name: 'WCB Manitoba', url: 'https://www.wcb.mb.ca/', desc: 'Manitoba WCB' },
        { name: 'WCB Saskatchewan', url: 'https://www.wcbsask.com/', desc: 'Saskatchewan WCB' },
        { name: 'WCB Nova Scotia', url: 'https://www.wcb.ns.ca/', desc: 'Nova Scotia WCB' },
        { name: 'WorkSafeNB', url: 'https://www.worksafenb.ca/', desc: 'New Brunswick' },
        { name: 'WHSCC NL', url: 'https://workplacenl.ca/', desc: 'Newfoundland & Labrador' },
        { name: 'WCB PEI', url: 'https://www.wcb.pe.ca/', desc: 'Prince Edward Island' },
        { name: 'WSCC NWT/NU', url: 'https://www.wscc.nt.ca/', desc: 'Northwest Territories/Nunavut' },
        { name: 'YWCHSB', url: 'https://wcb.yk.ca/', desc: 'Yukon WCB' }
      ]
    },
    openData: {
      title: '📊 Open Data Portals',
      description: 'Government datasets they have to publish - find the patterns they try to hide',
      tools: [
        { name: 'Open Canada', url: 'https://open.canada.ca/', desc: 'Federal open data' },
        { name: 'Ontario Open Data', url: 'https://data.ontario.ca/', desc: 'Ontario datasets' },
        { name: 'BC Data Catalogue', url: 'https://catalogue.data.gov.bc.ca/', desc: 'BC open data' },
        { name: 'Alberta Open Data', url: 'https://open.alberta.ca/', desc: 'Alberta datasets' },
        { name: 'Quebec Open Data', url: 'https://www.donneesquebec.ca/', desc: 'Données Québec' },
        { name: 'Toronto Open Data', url: 'https://open.toronto.ca/', desc: 'City of Toronto data' },
        { name: 'Vancouver Open Data', url: 'https://opendata.vancouver.ca/', desc: 'City of Vancouver' },
        { name: 'Calgary Open Data', url: 'https://data.calgary.ca/', desc: 'City of Calgary' },
        { name: 'Statistics Canada', url: 'https://www.statcan.gc.ca/', desc: 'National statistics' }
      ]
    },
    humanRights: {
      title: '🛡️ Human Rights Bodies',
      description: 'File complaints when your rights are violated',
      tools: [
        { name: 'Canadian Human Rights Commission', url: 'https://www.chrc-ccdp.gc.ca/', desc: 'Federal human rights' },
        { name: 'Ontario Human Rights Commission', url: 'https://www.ohrc.on.ca/', desc: 'OHRC' },
        { name: 'HRTO', url: 'https://tribunalsontario.ca/hrto/', desc: 'Human Rights Tribunal of Ontario' },
        { name: 'BC Human Rights Tribunal', url: 'https://www.bchrt.bc.ca/', desc: 'BC human rights' },
        { name: 'Alberta Human Rights Commission', url: 'https://albertahumanrights.ab.ca/', desc: 'Alberta HRC' },
        { name: 'Quebec Human Rights Commission', url: 'https://www.cdpdj.qc.ca/', desc: 'Commission des droits' },
        { name: 'Manitoba Human Rights', url: 'http://www.manitobahumanrights.ca/', desc: 'Manitoba HRC' },
        { name: 'UN CRPD Committee', url: 'https://www.ohchr.org/en/treaty-bodies/crpd', desc: 'International disability rights' }
      ]
    },
    ombudsman: {
      title: '🔍 Ombudsman Offices',
      description: 'Independent oversight - when the system fails, these offices investigate',
      tools: [
        { name: 'Ontario Ombudsman', url: 'https://www.ombudsman.on.ca/', desc: 'Ontario oversight' },
        { name: 'BC Ombudsperson', url: 'https://bcombudsperson.ca/', desc: 'BC oversight' },
        { name: 'Alberta Ombudsman', url: 'https://www.ombudsman.ab.ca/', desc: 'Alberta oversight' },
        { name: 'Quebec Protecteur', url: 'https://protecteurducitoyen.qc.ca/', desc: 'Protecteur du citoyen' },
        { name: 'Manitoba Ombudsman', url: 'https://www.ombudsman.mb.ca/', desc: 'Manitoba oversight' },
        { name: 'Nova Scotia Ombudsman', url: 'https://novascotia.ca/ombu/', desc: 'Nova Scotia' },
        { name: 'Federal Ombudsman', url: 'https://www.canada.ca/en/ombudsman-national-defence.html', desc: 'Federal oversight offices' }
      ]
    },
    auditors: {
      title: '📋 Auditor Generals',
      description: 'Follow the money - these reports expose waste and mismanagement',
      tools: [
        { name: 'Auditor General of Canada', url: 'https://www.oag-bvg.gc.ca/', desc: 'Federal audits' },
        { name: 'Ontario Auditor General', url: 'https://www.auditor.on.ca/', desc: 'Ontario audits' },
        { name: 'BC Auditor General', url: 'https://www.bcauditor.com/', desc: 'BC audits' },
        { name: 'Alberta Auditor General', url: 'https://www.oag.ab.ca/', desc: 'Alberta audits' },
        { name: 'Quebec Vérificateur général', url: 'https://www.vgq.qc.ca/', desc: 'Quebec audits' },
        { name: 'Manitoba Auditor General', url: 'https://www.oag.mb.ca/', desc: 'Manitoba audits' },
        { name: 'Nova Scotia Auditor General', url: 'https://oag-ns.ca/', desc: 'Nova Scotia audits' }
      ]
    },
    international: {
      title: '🌍 International Resources',
      description: 'When Canadian systems fail, international bodies can apply pressure',
      tools: [
        { name: 'UN Human Rights Council', url: 'https://www.ohchr.org/', desc: 'United Nations human rights' },
        { name: 'UN CRPD', url: 'https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities.html', desc: 'Disability rights convention' },
        { name: 'ILO', url: 'https://www.ilo.org/', desc: 'International Labour Organization' },
        { name: 'Amnesty International Canada', url: 'https://www.amnesty.ca/', desc: 'Human rights advocacy' },
        { name: 'Human Rights Watch', url: 'https://www.hrw.org/', desc: 'Global human rights' },
        { name: 'OECD', url: 'https://www.oecd.org/', desc: 'Economic policy comparisons' }
      ]
    }
  };

  // Legal Framework Quick Reference
  const LEGAL_FRAMEWORK = {
    charter: {
      title: 'Canadian Charter of Rights',
      sections: [
        { num: 'Section 1', name: 'Reasonable Limits', desc: 'Rights can only be limited if demonstrably justified in a free society' },
        { num: 'Section 7', name: 'Life, Liberty, Security', desc: 'Your right to life, liberty and security of the person' },
        { num: 'Section 12', name: 'Cruel Treatment', desc: 'Right not to be subjected to cruel and unusual treatment' },
        { num: 'Section 15', name: 'Equality Rights', desc: 'Equal protection and benefit of law without discrimination' },
        { num: 'Section 24', name: 'Enforcement', desc: 'Your right to a remedy when rights are infringed' }
      ]
    },
    chra: {
      title: 'Canadian Human Rights Act',
      grounds: ['Race', 'National/ethnic origin', 'Colour', 'Religion', 'Age', 'Sex', 'Sexual orientation', 'Gender identity', 'Marital status', 'Family status', 'Genetic characteristics', 'Disability', 'Pardoned conviction']
    },
    uncrpd: {
      title: 'UN Convention on Rights of Persons with Disabilities',
      articles: [
        { num: 'Article 4', name: 'General Obligations', desc: 'States must ensure full rights' },
        { num: 'Article 9', name: 'Accessibility', desc: 'Access to physical environment and information' },
        { num: 'Article 12', name: 'Legal Capacity', desc: 'Equal recognition before the law' },
        { num: 'Article 19', name: 'Independent Living', desc: 'Right to live in the community' },
        { num: 'Article 27', name: 'Work & Employment', desc: 'Right to work on equal basis' }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>👁️ THE EYE ORACLE v2.0 | Incorruptible Evidence-Driven Intelligence</title>
        <meta name="description" content="THE EYE v2.0 - Incorruptible Evidence-Driven Investigative Intelligence. Investigation tools, government databases, and resources for injured workers." />
      </Head>

      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem 3rem',
          borderBottom: '1px solid rgba(0,255,255,0.2)'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            👁️
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: '900',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em'
          }}>
            THE EYE ORACLE
          </h1>
          
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            color: '#00ffff',
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            marginBottom: '1.5rem'
          }}>
            INCORRUPTIBLE EVIDENCE-DRIVEN INVESTIGATIVE INTELLIGENCE
          </p>
          
          {/* The Three Tenets */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <span style={{ color: '#ff6b6b', fontWeight: '700', fontSize: '1rem' }}>
              THE EYE SEES ALL
            </span>
            <span style={{ color: '#ffd93d', fontWeight: '700', fontSize: '1rem' }}>
              THE EYE FORGETS NOTHING
            </span>
            <span style={{ color: '#00ffff', fontWeight: '700', fontSize: '1rem' }}>
              THE EYE NEVER SLEEPS
            </span>
          </div>
          
          {/* Mission Statement */}
          <div style={{
            background: 'rgba(0,255,255,0.1)',
            border: '1px solid rgba(0,255,255,0.3)',
            borderRadius: '0.5rem',
            padding: '1.5rem 2rem',
            maxWidth: '900px',
            margin: '0 auto',
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.9)'
          }}>
            This system continuously expands by monitoring government sources 24/7. Every insight 
            generated is traceable to verified public records, government databases, and official documents.
            <br /><strong style={{ color: '#ffd93d' }}>No speculation. Only facts.</strong>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '1.5rem 1rem',
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {[
            { id: 'overview', label: '🏠 Overview', color: '#00ffff' },
            { id: 'rabbit-holes', label: '🐰 Rabbit Holes', color: '#ff6b6b' },
            { id: 'legal', label: '⚖️ Legal Framework', color: '#ffd93d' },
            { id: 'reports', label: '📊 Daily Reports', color: '#a78bfa' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeSection === tab.id 
                  ? `linear-gradient(135deg, ${tab.color}, ${tab.color}88)`
                  : 'rgba(255,255,255,0.1)',
                color: activeSection === tab.id ? '#000' : '#fff',
                border: `1px solid ${tab.color}50`,
                borderRadius: '2rem',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
          
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {/* Quick Links Cards */}
                <div style={{
                  background: 'rgba(255,107,107,0.1)',
                  border: '1px solid rgba(255,107,107,0.3)',
                  borderRadius: '1rem',
                  padding: '1.5rem'
                }}>
                  <h3 style={{ color: '#ff6b6b', marginTop: 0 }}>🐰 Rabbit Holes</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                    11 categories of official government investigation tools. FOI requests, 
                    lobbying registries, court records, and more.
                  </p>
                  <button 
                    onClick={() => setActiveSection('rabbit-holes')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#ff6b6b',
                      color: '#000',
                      border: 'none',
                      borderRadius: '0.25rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Explore Tools →
                  </button>
                </div>

                <div style={{
                  background: 'rgba(255,217,61,0.1)',
                  border: '1px solid rgba(255,217,61,0.3)',
                  borderRadius: '1rem',
                  padding: '1.5rem'
                }}>
                  <h3 style={{ color: '#ffd93d', marginTop: 0 }}>⚖️ Legal Framework</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                    Charter rights, Human Rights Act, UNCRPD - know your legal protections 
                    in plain English.
                  </p>
                  <button 
                    onClick={() => setActiveSection('legal')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#ffd93d',
                      color: '#000',
                      border: 'none',
                      borderRadius: '0.25rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Know Your Rights →
                  </button>
                </div>

                <div style={{
                  background: 'rgba(167,139,250,0.1)',
                  border: '1px solid rgba(167,139,250,0.3)',
                  borderRadius: '1rem',
                  padding: '1.5rem'
                }}>
                  <h3 style={{ color: '#a78bfa', marginTop: 0 }}>📊 Daily Reports</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                    Quirky, plain-English daily reports on government wrongdoings, 
                    violations, and bureaucratic shenanigans.
                  </p>
                  <Link href="/eye-oracle-reports" style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: '#a78bfa',
                    color: '#000',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}>
                    View Reports →
                  </Link>
                </div>
              </div>

              {/* What The Eye Does */}
              <div style={{
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid rgba(0,255,255,0.2)'
              }}>
                <h2 style={{ color: '#00ffff', marginTop: 0 }}>What THE EYE Does</h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div>
                    <h4 style={{ color: '#ff6b6b' }}>🔍 Monitors 24/7</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      Continuously scans government APIs, open data portals, and official records 
                      for changes that affect injured workers.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: '#ffd93d' }}>📝 Translates</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      Converts legalese and bureaucratic jargon into plain English so everyone 
                      can understand what's happening.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: '#00ffff' }}>📊 Analyzes</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      Cross-references documents against Charter rights, human rights codes, 
                      and international conventions.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: '#a78bfa' }}>🗂️ Archives</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                      Preserves everything for transparency. Reports older than 30 days move to 
                      the archive but remain accessible forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RABBIT HOLES Section */}
          {activeSection === 'rabbit-holes' && (
            <div>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '2rem',
                  color: '#ff6b6b',
                  marginBottom: '0.5rem'
                }}>
                  🐰 RABBIT HOLES
                </h2>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#ffd93d',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Become Your Own Investigator
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '800px',
                  margin: '0 auto',
                  fontSize: '1.05rem'
                }}>
                  Don't just trust The EYE—verify everything yourself. These tools let you dig 
                  deeper into the systems that affect your life. Every link goes to official 
                  government databases where you can search records, file FOI requests, track 
                  lobbying, and expose corruption.
                </p>
              </div>

              {/* Search Bar */}
              <div style={{
                maxWidth: '500px',
                margin: '0 auto 2rem'
              }}>
                <input
                  type="text"
                  placeholder="🔍 Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    fontSize: '1rem',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(0,255,255,0.3)',
                    borderRadius: '2rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Rabbit Hole Categories */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {Object.entries(RABBIT_HOLES).map(([key, category]) => {
                  // Filter tools based on search
                  const filteredTools = category.tools.filter(tool =>
                    searchQuery === '' ||
                    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    category.title.toLowerCase().includes(searchQuery.toLowerCase())
                  );

                  if (searchQuery && filteredTools.length === 0) return null;

                  return (
                    <div key={key} style={{
                      background: 'rgba(0,0,0,0.4)',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      border: '1px solid rgba(255,107,107,0.3)'
                    }}>
                      <h3 style={{ 
                        color: '#ff6b6b', 
                        marginTop: 0,
                        fontSize: '1.2rem'
                      }}>
                        {category.title}
                      </h3>
                      <p style={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: '0.95rem',
                        marginBottom: '1rem'
                      }}>
                        {category.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        {(searchQuery ? filteredTools : category.tools).map((tool, idx) => (
                          <a
                            key={idx}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.75rem',
                              background: 'rgba(255,255,255,0.05)',
                              borderRadius: '0.5rem',
                              textDecoration: 'none',
                              color: 'white',
                              border: '1px solid transparent',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = 'rgba(255,107,107,0.2)';
                              e.currentTarget.style.borderColor = 'rgba(255,107,107,0.5)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                              e.currentTarget.style.borderColor = 'transparent';
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: '600', color: '#00ffff' }}>
                                {tool.name}
                              </div>
                              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                {tool.desc}
                              </div>
                            </div>
                            <span style={{ color: '#ff6b6b' }}>→</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Legal Framework Section */}
          {activeSection === 'legal' && (
            <div>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '2rem',
                  color: '#ffd93d',
                  marginBottom: '1rem'
                }}>
                  ⚖️ Legal Framework - Know Your Rights
                </h2>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  These are the laws that protect you. When bureaucrats violate your rights, 
                  knowing the specific sections gives you power.
                </p>
              </div>

              {/* Charter */}
              <div style={{
                background: 'rgba(255,217,61,0.1)',
                border: '1px solid rgba(255,217,61,0.3)',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ color: '#ffd93d', marginTop: 0 }}>
                  🍁 {LEGAL_FRAMEWORK.charter.title}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {LEGAL_FRAMEWORK.charter.sections.map((section, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      <div style={{ fontWeight: '700', color: '#ffd93d' }}>{section.num}</div>
                      <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>
                        {section.name}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                        {section.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CHRA */}
              <div style={{
                background: 'rgba(0,255,255,0.1)',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ color: '#00ffff', marginTop: 0 }}>
                  🛡️ {LEGAL_FRAMEWORK.chra.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                  Discrimination is prohibited on these grounds:
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {LEGAL_FRAMEWORK.chra.grounds.map((ground, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(0,255,255,0.2)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      color: 'white'
                    }}>
                      {ground}
                    </span>
                  ))}
                </div>
              </div>

              {/* UNCRPD */}
              <div style={{
                background: 'rgba(167,139,250,0.1)',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: '1rem',
                padding: '1.5rem'
              }}>
                <h3 style={{ color: '#a78bfa', marginTop: 0 }}>
                  🌍 {LEGAL_FRAMEWORK.uncrpd.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                  Canada ratified this in 2010. These are binding international obligations:
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {LEGAL_FRAMEWORK.uncrpd.articles.map((article, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      <div style={{ fontWeight: '700', color: '#a78bfa' }}>{article.num}</div>
                      <div style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>
                        {article.name}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                        {article.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reports Section */}
          {activeSection === 'reports' && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#a78bfa', marginBottom: '1rem' }}>📊 Daily Intelligence Reports</h2>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                maxWidth: '600px', 
                margin: '0 auto 2rem' 
              }}>
                Quirky, plain-English daily reports on government wrongdoings. 
                Reports older than 30 days move to the archive for permanent transparency.
              </p>
              <Link href="/eye-oracle-reports" style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '700',
                borderRadius: '2rem',
                textDecoration: 'none'
              }}>
                📊 View Daily Reports →
              </Link>
            </div>
          )}
        </div>

        {/* Footer Branding */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          borderTop: '1px solid rgba(0,255,255,0.2)',
          marginTop: '3rem'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👁️</div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '1rem'
          }}>
            <span style={{ color: '#ff6b6b', fontSize: '0.9rem', fontWeight: '600' }}>
              THE EYE SEES ALL
            </span>
            <span style={{ color: '#ffd93d', fontSize: '0.9rem', fontWeight: '600' }}>
              THE EYE FORGETS NOTHING
            </span>
            <span style={{ color: '#00ffff', fontSize: '0.9rem', fontWeight: '600' }}>
              THE EYE NEVER SLEEPS
            </span>
          </div>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            All links verified to official government sources. No demo data. 
            No speculation. Only facts.
          </p>
        </div>
      </div>
      
      <Footer />

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
}
