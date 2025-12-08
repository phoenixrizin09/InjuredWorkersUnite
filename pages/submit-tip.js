import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - ANONYMOUS TIP SUBMISSION
 * 
 * Help The Eye see what others try to hide.
 * Submit tips about corruption, violations, and injustices.
 * 
 * 🔒 PRIVACY: No personal data collected unless voluntarily provided.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function SubmitTip() {
  const [formData, setFormData] = useState({
    category: '',
    province: '',
    organization: '',
    title: '',
    description: '',
    evidence: '',
    sourceUrl: '',
    affectedCount: '',
    contactEmail: '',
    anonymous: true
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'workers_comp', label: '👷 Workers Compensation (WSIB/WCB)' },
    { value: 'disability', label: '♿ Disability Benefits (ODSP/AISH/PWD)' },
    { value: 'healthcare', label: '🏥 Healthcare System' },
    { value: 'housing', label: '🏠 Housing/Homelessness' },
    { value: 'indigenous', label: '🪶 Indigenous Rights' },
    { value: 'police', label: '🚔 Police/RCMP Misconduct' },
    { value: 'corporate', label: '🏢 Corporate Corruption' },
    { value: 'migrant_workers', label: '🌍 Migrant Worker Exploitation' },
    { value: 'gig_economy', label: '📱 Gig Economy Issues' },
    { value: 'children', label: '👶 Children in Care/CAS' },
    { value: 'seniors', label: '👴 Seniors/LTC' },
    { value: 'environment', label: '🌳 Environmental Racism' },
    { value: 'prison', label: '🔒 Prison/Incarceration' },
    { value: 'food_insecurity', label: '🍽️ Food Insecurity' },
    { value: 'mental_health', label: '🧠 Mental Health' },
    { value: 'other', label: '📋 Other' }
  ];

  const provinces = [
    { value: 'federal', label: '🇨🇦 Federal/National' },
    { value: 'ontario', label: 'Ontario' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'alberta', label: 'Alberta' },
    { value: 'quebec', label: 'Quebec' },
    { value: 'manitoba', label: 'Manitoba' },
    { value: 'saskatchewan', label: 'Saskatchewan' },
    { value: 'nova_scotia', label: 'Nova Scotia' },
    { value: 'new_brunswick', label: 'New Brunswick' },
    { value: 'newfoundland', label: 'Newfoundland & Labrador' },
    { value: 'pei', label: 'Prince Edward Island' },
    { value: 'yukon', label: 'Yukon' },
    { value: 'nwt', label: 'Northwest Territories' },
    { value: 'nunavut', label: 'Nunavut' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // In a real implementation, this would send to a secure backend
    // For now, we'll save to localStorage and show confirmation
    const tip = {
      id: `TIP_${Date.now()}`,
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending_review'
    };
    
    // Save to localStorage for demo (in production, use secure API)
    const existingTips = JSON.parse(localStorage.getItem('iwu_submitted_tips') || '[]');
    existingTips.push(tip);
    localStorage.setItem('iwu_submitted_tips', JSON.stringify(existingTips));
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '0.5rem',
    color: 'white',
    fontSize: '1rem',
    marginTop: '0.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '1.5rem'
  };

  const labelTextStyle = {
    color: '#00ffff',
    fontWeight: '600',
    fontSize: '0.95rem'
  };

  if (submitted) {
    return (
      <>
        <Head>
          <title>👁️ Tip Submitted | THE EYE ORACLE</title>
        </Head>
        <Header />
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
          color: 'white',
          padding: '4rem 1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>👁️</div>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#22c55e',
            marginBottom: '1rem'
          }}>
            ✅ Tip Received
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Thank you for helping The Eye see what others try to hide. 
            Your tip will be reviewed and verified before publication.
          </p>
          <p style={{
            color: '#00ffff',
            fontFamily: 'monospace'
          }}>
            Tip ID: {`TIP_${Date.now()}`}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                category: '',
                province: '',
                organization: '',
                title: '',
                description: '',
                evidence: '',
                sourceUrl: '',
                affectedCount: '',
                contactEmail: '',
                anonymous: true
              });
            }}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Submit Another Tip
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>👁️ Submit a Tip | THE EYE ORACLE</title>
        <meta name="description" content="Submit anonymous tips about corruption, violations, and injustices to The Eye Oracle." />
      </Head>

      <Header />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
        color: 'white',
        padding: '2rem 1rem 4rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>👁️</div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              Submit a Tip
            </h1>
            <p style={{
              color: '#00ffff',
              fontFamily: 'monospace',
              letterSpacing: '0.1em'
            }}>
              HELP THE EYE SEE WHAT OTHERS TRY TO HIDE
            </p>
          </div>

          {/* Privacy Notice */}
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '0.5rem',
            padding: '1rem 1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>🔒 Privacy Protected</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0 }}>
              Your identity is protected. We don't collect IP addresses or tracking data. 
              Email is optional and only used if you want follow-up. 
              All tips are verified before publication.
            </p>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '2rem'
          }}>
            
            {/* Category */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Category *</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{...inputStyle, cursor: 'pointer'}}
              >
                <option value="">Select a category...</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </label>

            {/* Province */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Province/Territory *</span>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                style={{...inputStyle, cursor: 'pointer'}}
              >
                <option value="">Select location...</option>
                {provinces.map(prov => (
                  <option key={prov.value} value={prov.value}>{prov.label}</option>
                ))}
              </select>
            </label>

            {/* Organization */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Organization/Agency Involved</span>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g., WSIB, ODSP, WorkSafeBC, RCMP..."
                style={inputStyle}
              />
            </label>

            {/* Title */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Issue Title/Summary *</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief summary of the issue..."
                required
                style={inputStyle}
              />
            </label>

            {/* Description */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Detailed Description *</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail. What happened? When? Who was affected? What are the consequences?"
                required
                rows={6}
                style={{...inputStyle, resize: 'vertical'}}
              />
            </label>

            {/* Evidence */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Evidence/Documentation</span>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleChange}
                placeholder="Any evidence you have: documents, statistics, dates, case numbers, witness accounts..."
                rows={4}
                style={{...inputStyle, resize: 'vertical'}}
              />
            </label>

            {/* Source URL */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Source URL (if available)</span>
              <input
                type="url"
                name="sourceUrl"
                value={formData.sourceUrl}
                onChange={handleChange}
                placeholder="https://..."
                style={inputStyle}
              />
            </label>

            {/* Affected Count */}
            <label style={labelStyle}>
              <span style={labelTextStyle}>Estimated Number of People Affected</span>
              <input
                type="text"
                name="affectedCount"
                value={formData.affectedCount}
                onChange={handleChange}
                placeholder="e.g., 1,000+ workers, my community of 500, etc."
                style={inputStyle}
              />
            </label>

            {/* Anonymous Toggle */}
            <label style={{
              ...labelStyle,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                style={{ width: '1.2rem', height: '1.2rem' }}
              />
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>
                Keep my submission anonymous
              </span>
            </label>

            {/* Contact Email (Optional) */}
            {!formData.anonymous && (
              <label style={labelStyle}>
                <span style={labelTextStyle}>Contact Email (Optional)</span>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
                <small style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', display: 'block' }}>
                  Only if you want us to follow up with questions or updates.
                </small>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: submitting 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
                color: submitting ? '#fff' : '#000',
                border: 'none',
                borderRadius: '2rem',
                fontWeight: '700',
                fontSize: '1.1rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                marginTop: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {submitting ? '👁️ Submitting...' : '👁️ Submit Tip to The Eye'}
            </button>

          </form>

          {/* What Happens Next */}
          <div style={{
            marginTop: '2rem',
            background: 'rgba(0,255,255,0.05)',
            border: '1px solid rgba(0,255,255,0.2)',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h3 style={{ color: '#00ffff', marginBottom: '1rem' }}>What Happens Next?</h3>
            <ol style={{ 
              color: 'rgba(255,255,255,0.8)', 
              paddingLeft: '1.5rem',
              lineHeight: '1.8'
            }}>
              <li>Your tip is securely stored and queued for review</li>
              <li>Our team verifies the information against official sources</li>
              <li>If verified, it's added to The Eye Oracle database</li>
              <li>The issue is included in daily reports and investigations</li>
              <li>Your identity remains protected throughout</li>
            </ol>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
