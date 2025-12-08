import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - INTERACTIVE VIOLATION MAP
 * 
 * Visual map of documented violations across Canada
 * Click on provinces/territories to see issues affecting that region
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function ViolationMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({});

  // Region data with documented issues
  const regionData = {
    'ontario': {
      name: 'Ontario',
      abbreviation: 'ON',
      issues: [
        { title: 'WSIB Mental Health Claim Denial Rate: 67%', severity: 'critical', category: 'workers' },
        { title: 'ODSP Rates Below Poverty Line: $1,308/month', severity: 'critical', category: 'disabilities' },
        { title: 'Toronto Housing Crisis: 98,000+ on Waitlist', severity: 'critical', category: 'housing' },
        { title: 'Bill 124 Wage Suppression: Nurses Underpaid', severity: 'critical', category: 'healthcare' },
        { title: 'LTC Deaths: 4,000+ COVID Deaths in For-Profit Homes', severity: 'critical', category: 'seniors' },
        { title: 'SIU: 98% of Police Shootings - No Charges', severity: 'critical', category: 'accountability' }
      ],
      totalAffected: '2,000,000+',
      color: '#ff6b6b'
    },
    'bc': {
      name: 'British Columbia',
      abbreviation: 'BC',
      issues: [
        { title: 'WorkSafeBC Mental Health Claims: 70% Denied', severity: 'critical', category: 'workers' },
        { title: 'Opioid Crisis: 2,511 Deaths in 2023', severity: 'critical', category: 'healthcare' },
        { title: 'BC Housing Crisis: Average Rent $2,500+', severity: 'critical', category: 'housing' }
      ],
      totalAffected: '500,000+',
      color: '#ffd93d'
    },
    'alberta': {
      name: 'Alberta',
      abbreviation: 'AB',
      issues: [
        { title: 'Alberta WCB: 40% of Claims Denied', severity: 'critical', category: 'workers' },
        { title: 'Healthcare Cuts: 11,000+ Positions Eliminated', severity: 'critical', category: 'healthcare' },
        { title: 'Oil Worker Deaths: 37 Workplace Fatalities 2023', severity: 'critical', category: 'workers' }
      ],
      totalAffected: '400,000+',
      color: '#a78bfa'
    },
    'quebec': {
      name: 'Quebec',
      abbreviation: 'QC',
      issues: [
        { title: 'CNESST Language Barriers: 35% Higher Denial for Non-Francophones', severity: 'critical', category: 'workers' },
        { title: 'Construction Deaths: 47 Fatalities 2023', severity: 'critical', category: 'workers' }
      ],
      totalAffected: '200,000+',
      color: '#00ffff'
    },
    'nova_scotia': {
      name: 'Nova Scotia',
      abbreviation: 'NS',
      issues: [
        { title: 'Healthcare Crisis: 140,000 Without Family Doctor', severity: 'critical', category: 'healthcare' }
      ],
      totalAffected: '140,000+',
      color: '#22c55e'
    },
    'new_brunswick': {
      name: 'New Brunswick',
      abbreviation: 'NB',
      issues: [
        { title: 'EI Dependency: 15% of Workforce on EI Annually', severity: 'critical', category: 'workers' }
      ],
      totalAffected: '60,000+',
      color: '#f59e0b'
    },
    'federal': {
      name: 'Federal/National',
      abbreviation: 'CAN',
      issues: [
        { title: 'First Nations Water Crisis: 33 Long-Term Advisories', severity: 'critical', category: 'indigenous_rights' },
        { title: 'CPP-D: 66% Denial Rate on First Application', severity: 'critical', category: 'disabilities' },
        { title: 'Migrant Farm Worker Deaths: 57 Deaths 2020-2023', severity: 'critical', category: 'workers' },
        { title: 'RCMP Indigenous Deaths in Custody: 71 Deaths', severity: 'critical', category: 'indigenous_rights' },
        { title: 'National Homeless Count: 235,000+ Canadians', severity: 'critical', category: 'housing' },
        { title: 'Food Bank Usage: 2 Million Visits Per Month', severity: 'critical', category: 'poverty' },
        { title: 'Children in Care: 62,000 Kids in Government Custody', severity: 'critical', category: 'children' },
        { title: 'Indigenous Incarceration: 32% of Inmates Despite 5% Population', severity: 'critical', category: 'indigenous_rights' },
        { title: 'Gig Workers: 1.7 Million With Zero Protections', severity: 'critical', category: 'workers' }
      ],
      totalAffected: '5,000,000+',
      color: '#ef4444'
    }
  };

  // Calculate total stats
  useEffect(() => {
    let totalIssues = 0;
    let totalAffected = 0;
    Object.values(regionData).forEach(region => {
      totalIssues += region.issues.length;
    });
    setStats({ totalIssues, regions: Object.keys(regionData).length });
  }, []);

  const categoryEmojis = {
    workers: '👷',
    disabilities: '♿',
    housing: '🏠',
    healthcare: '🏥',
    indigenous_rights: '🪶',
    seniors: '👴',
    accountability: '🚔',
    poverty: '💸',
    children: '👶'
  };

  return (
    <>
      <Head>
        <title>👁️ Violation Map | THE EYE ORACLE</title>
        <meta name="description" content="Interactive map of documented rights violations across Canada. See issues affecting each province and territory." />
      </Head>

      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        padding: '2rem 1rem 4rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🗺️</div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              Violation Map of Canada
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.1rem'
            }}>
              Click on a region to see documented violations affecting that area
            </p>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255,107,107,0.2)',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#ff6b6b' }}>
                {stats.totalIssues || 0}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Documented Violations
              </div>
            </div>
            <div style={{
              background: 'rgba(0,255,255,0.2)',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#00ffff' }}>
                {stats.regions || 0}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Regions Tracked
              </div>
            </div>
            <div style={{
              background: 'rgba(255,217,61,0.2)',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#ffd93d' }}>
                5M+
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                Canadians Affected
              </div>
            </div>
          </div>

          {/* Interactive Map Area */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {Object.entries(regionData).map(([key, region]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                style={{
                  padding: '1.5rem 1rem',
                  background: selectedRegion === key 
                    ? `linear-gradient(135deg, ${region.color}40, ${region.color}20)`
                    : 'rgba(255,255,255,0.03)',
                  border: selectedRegion === key 
                    ? `2px solid ${region.color}` 
                    : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  color: region.color,
                  marginBottom: '0.5rem'
                }}>
                  {region.abbreviation}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem'
                }}>
                  {region.name}
                </div>
                <div style={{
                  background: `${region.color}30`,
                  color: region.color,
                  padding: '0.25rem 0.5rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {region.issues.length} issues
                </div>
              </button>
            ))}
          </div>

          {/* Selected Region Details */}
          {selectedRegion && regionData[selectedRegion] && (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${regionData[selectedRegion].color}40`,
              borderRadius: '1rem',
              padding: '2rem',
              marginTop: '1rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h2 style={{
                    color: regionData[selectedRegion].color,
                    fontSize: '1.8rem',
                    marginBottom: '0.25rem'
                  }}>
                    {regionData[selectedRegion].name}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                    {regionData[selectedRegion].totalAffected} people affected
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕ Close
                </button>
              </div>

              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {regionData[selectedRegion].issues.map((issue, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>
                      {categoryEmojis[issue.category] || '👁️'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'white', fontWeight: '600' }}>
                        {issue.title}
                      </div>
                      <div style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.85rem',
                        marginTop: '0.25rem'
                      }}>
                        Category: {issue.category.replace('_', ' ')}
                      </div>
                    </div>
                    <span style={{
                      background: issue.severity === 'critical' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                      color: issue.severity === 'critical' ? '#ef4444' : '#f59e0b',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {issue.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>📊 Categories</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {Object.entries(categoryEmojis).map(([cat, emoji]) => (
                <span key={cat} style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {emoji} {cat.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(0,255,255,0.1))',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>
              Know of a violation not on this map?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              Help The Eye see what others try to hide.
            </p>
            <a
              href="/submit-tip"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '2rem',
                fontWeight: '700'
              }}
            >
              👁️ Submit a Tip
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
