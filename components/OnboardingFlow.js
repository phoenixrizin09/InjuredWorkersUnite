import { useState, useEffect } from 'react';

export default function OnboardingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('iwu_onboarding_completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const steps = [
    {
      title: "Welcome to Injured Workers Unite",
      icon: "👁️",
      content: (
        <div>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            THE EYE is an <strong>evidence-first investigative AI</strong> that exposes corruption affecting injured workers, disabled people, and vulnerable Canadians.
          </p>
          <div style={{ background: 'rgba(255, 0, 128, 0.1)', border: '2px solid #ff0080', borderRadius: '15px', padding: '1.5rem' }}>
            <div style={{ color: '#ff0080', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.1rem' }}>
              🎯 OUR MISSION:
            </div>
            <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
              <li>Expose systemic abuse by WSIB, ODSP, and government agencies</li>
              <li>Track corporate corruption and tax avoidance</li>
              <li>Document Charter and human rights violations</li>
              <li>Provide ready-to-deploy action packages</li>
              <li>Build a movement for justice</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "How THE EYE Works",
      icon: "🔍",
      content: (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(79, 172, 254, 0.1)', border: '2px solid #4facfe', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📡</div>
              <h4 style={{ color: '#4facfe', marginBottom: '0.5rem' }}>24/7 Monitoring</h4>
              <p style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Continuously scans government sources, court decisions, and public data for corruption
              </p>
            </div>
            <div style={{ background: 'rgba(255, 0, 128, 0.1)', border: '2px solid #ff0080', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👁️</div>
              <h4 style={{ color: '#ff0080', marginBottom: '0.5rem' }}>THE EYE Analysis</h4>
              <p style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.6' }}>
                AI processes documents for 10 types of corruption including Charter violations
              </p>
            </div>
            <div style={{ background: 'rgba(255, 204, 68, 0.1)', border: '2px solid #ffcc44', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>
              <h4 style={{ color: '#ffcc44', marginBottom: '0.5rem' }}>Live Alerts</h4>
              <p style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Critical findings trigger real-time alerts with evidence packages
              </p>
            </div>
            <div style={{ background: 'rgba(255, 68, 68, 0.1)', border: '2px solid #ff4444', borderRadius: '15px', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h4 style={{ color: '#ff4444', marginBottom: '0.5rem' }}>Target Acquisition</h4>
              <p style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Tracks corrupt entities and provides downloadable action packages
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Rights in Canada",
      icon: "⚖️",
      content: (
        <div>
          <div style={{ background: 'rgba(255, 0, 128, 0.1)', border: '2px solid #ff0080', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#ff0080', marginBottom: '1rem' }}>📜 CANADIAN CHARTER OF RIGHTS</h4>
            <ul style={{ lineHeight: '2', paddingLeft: '1.5rem', color: '#ddd' }}>
              <li><strong>Section 7:</strong> Right to life, liberty, and security of person</li>
              <li><strong>Section 15:</strong> Equal protection under the law (no discrimination)</li>
              <li><strong>Section 2(d):</strong> Freedom of association (union rights)</li>
            </ul>
          </div>
          <div style={{ background: 'rgba(79, 172, 254, 0.1)', border: '2px solid #4facfe', borderRadius: '15px', padding: '1.5rem' }}>
            <h4 style={{ color: '#4facfe', marginBottom: '1rem' }}>🌍 UN CONVENTION ON RIGHTS OF PERSONS WITH DISABILITIES</h4>
            <p style={{ color: '#ddd', lineHeight: '1.8' }}>
              Canada ratified the UNCRPD - disabled people have the right to adequate income, healthcare, and freedom from discrimination.
            </p>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 204, 68, 0.1)', border: '1px solid #ffcc44', borderRadius: '10px' }}>
            <strong style={{ color: '#ffcc44' }}>⚠️ KNOW THIS:</strong> When WSIB denies your claim, ODSP cuts your benefits, or government violates your rights - <strong>they are breaking the law</strong>.
          </div>
        </div>
      )
    },
    {
      title: "Take Action Now",
      icon: "✊",
      content: (
        <div>
          <h3 style={{ color: '#4facfe', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Choose your starting point:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="/the-eye" style={{
              display: 'block',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #ff0080 0%, #ff6600 100%)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              👁️ THE EYE - See All Corruption
            </a>
            <a href="/alerts" style={{
              display: 'block',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #ffcc44 0%, #ff6600 100%)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              🚨 Live Alerts - Latest Findings
            </a>
            <a href="/target-acquisition" style={{
              display: 'block',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              🎯 Action Packages - Fight Back
            </a>
            <a href="/legislative-tracking" style={{
              display: 'block',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              cursor: 'pointer'
            }}>
              📜 Legislative Tracking - Watch Bills
            </a>
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0, 255, 136, 0.1)', border: '2px solid #00ff88', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ color: '#00ff88', fontSize: '1.1rem', fontWeight: 'bold' }}>
              💡 TIP: Download action packages and share on social media to amplify the fight!
            </p>
          </div>
        </div>
      )
    }
  ];

  const completeOnboarding = () => {
    localStorage.setItem('iwu_onboarding_completed', 'true');
    setShowOnboarding(false);
    if (onComplete) onComplete();
  };

  if (!showOnboarding) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.95)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflow: 'auto'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)',
        border: '3px solid #4facfe',
        borderRadius: '20px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '3rem',
        boxShadow: '0 0 50px rgba(79, 172, 254, 0.5)',
        color: '#fff'
      }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            {steps.map((_, idx) => (
              <div key={idx} style={{
                flex: 1,
                height: '4px',
                background: idx <= currentStep ? '#4facfe' : 'rgba(255, 255, 255, 0.2)',
                marginRight: idx < steps.length - 1 ? '0.5rem' : '0',
                borderRadius: '2px'
              }}></div>
            ))}
          </div>
          <div style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Content */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '1rem' }}>
            {steps[currentStep].icon}
          </div>
          <h2 style={{
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {steps[currentStep].title}
          </h2>
          <div style={{ color: '#ddd' }}>
            {steps[currentStep].content}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ← Previous
            </button>
          )}
          
          {currentStep === 0 && (
            <button
              onClick={completeOnboarding}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: 'none',
                color: '#888',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Skip Tutorial
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={completeOnboarding}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
                border: 'none',
                borderRadius: '25px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Get Started! ✊
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
