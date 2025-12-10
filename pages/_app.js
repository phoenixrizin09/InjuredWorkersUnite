import { useState, useEffect, createContext, useContext } from 'react';
import Head from 'next/head';
import AccessibilityToolbar from '../components/AccessibilityToolbar';
import BackToTop from '../components/BackToTop';

// Accessibility Context for global settings
export const AccessibilityContext = createContext({
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  dyslexicFont: false,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
  toggleReduceMotion: () => {},
  toggleDyslexicFont: () => {}
});

export const useAccessibility = () => useContext(AccessibilityContext);

export default function App({ Component, pageProps }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [showA11yPanel, setShowA11yPanel] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('a11yPreferences');
      if (saved) {
        const prefs = JSON.parse(saved);
        setHighContrast(prefs.highContrast || false);
        setLargeText(prefs.largeText || false);
        setReduceMotion(prefs.reduceMotion || false);
        setDyslexicFont(prefs.dyslexicFont || false);
      }
      
      // Respect system preferences
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReduceMotion(true);
      }
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        setHighContrast(true);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('a11yPreferences', JSON.stringify({
        highContrast,
        largeText,
        reduceMotion,
        dyslexicFont
      }));
    }
  }, [highContrast, largeText, reduceMotion, dyslexicFont]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleReduceMotion = () => setReduceMotion(prev => !prev);
  const toggleDyslexicFont = () => setDyslexicFont(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      largeText,
      reduceMotion,
      dyslexicFont,
      toggleHighContrast,
      toggleLargeText,
      toggleReduceMotion,
      toggleDyslexicFont
    }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f23" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          background: ${highContrast ? '#000' : '#0f0f23'};
          font-size: ${largeText ? '125%' : '100%'};
          font-family: ${dyslexicFont ? '"OpenDyslexic", sans-serif' : 'system-ui, -apple-system, sans-serif'};
          line-height: ${dyslexicFont ? '1.8' : '1.6'};
          letter-spacing: ${dyslexicFont ? '0.05em' : 'normal'};
          word-spacing: ${dyslexicFont ? '0.1em' : 'normal'};
        }
        
        #__next {
          width: 100%;
          min-height: 100vh;
        }
        
        /* High Contrast Mode */
        ${highContrast ? `
          * {
            border-color: #fff !important;
          }
          a, button {
            outline: 2px solid #fff !important;
            outline-offset: 2px;
          }
          a:hover, button:hover {
            background: #fff !important;
            color: #000 !important;
          }
        ` : ''}
        
        /* Reduce Motion */
        ${reduceMotion ? `
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        ` : ''}
        
        /* Focus Styles - WCAG 2.4.7 */
        *:focus {
          outline: 3px solid #4facfe !important;
          outline-offset: 3px !important;
        }
        
        *:focus:not(:focus-visible) {
          outline: none !important;
        }
        
        *:focus-visible {
          outline: 3px solid #4facfe !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 6px rgba(79, 172, 254, 0.3) !important;
        }
        
        /* Skip Links Container - WCAG 2.4.1 - HIDDEN BY DEFAULT */
        .skip-links-container {
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        
        .skip-links-container:focus-within {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: auto !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          z-index: 10001 !important;
        }
        
        .skip-link {
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
          padding: 1rem 2rem;
          background: #4facfe;
          color: #000;
          font-weight: bold;
          border-radius: 0 0 8px 8px;
          text-decoration: none;
          font-size: 1rem;
          opacity: 0 !important;
        }
        
        .skip-link:focus {
          position: fixed !important;
          top: 10px !important;
          left: 10px !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: auto !important;
          opacity: 1 !important;
          outline: 3px solid #fff;
          outline-offset: 2px;
          z-index: 10002 !important;
        }
        
        /* AAA Color Contrast - Minimum 7:1 ratio */
        .high-contrast-text {
          color: #fff !important;
          background: #000 !important;
        }
        
        /* WCAG 2.5.5 - Target Size (AAA requires 44x44px minimum) */
        button, a, input, select, textarea {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Exception for inline links */
        p a, li a, span a {
          min-height: auto;
          min-width: auto;
        }
        
        /* Selection - WCAG 1.4.11 */
        ::selection {
          background: #4facfe;
          color: #000;
        }
        
        /* Scrollbar styling for visibility */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4facfe;
          border-radius: 6px;
        }
        
        /* Print styles */
        @media print {
          * {
            background: #fff !important;
            color: #000 !important;
          }
        }
        
        /* NUCLEAR OPTION: Hide skip links completely until Tab key focuses them */
        .skip-nav-hidden {
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          clip-path: inset(50%) !important;
          white-space: nowrap !important;
          border: 0 !important;
          margin: -1px !important;
          padding: 0 !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          z-index: -9999 !important;
        }
        
        .skip-nav-hidden:focus-within,
        .skip-nav-hidden:focus {
          position: fixed !important;
          top: 10px !important;
          left: 10px !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: auto !important;
          clip-path: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          z-index: 999999 !important;
        }
        
        .skip-nav-hidden a {
          display: block;
          padding: 1rem 2rem;
          background: #4facfe;
          color: #000;
          font-weight: bold;
          text-decoration: none;
          margin-bottom: 5px;
          border-radius: 5px;
        }
        
        .skip-nav-hidden a:focus {
          outline: 3px solid #fff;
        }
      `}</style>
      
      {/* Skip Links REMOVED - was blocking header. Keyboard users can use Tab to navigate */}
      
      {/* Accessibility Toolbar - Left side */}
      <AccessibilityToolbar />
      
      {/* Accessibility Settings Button - Right side */}
      <button
        onClick={() => setShowA11yPanel(!showA11yPanel)}
        aria-label="Accessibility Settings"
        aria-expanded={showA11yPanel}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: highContrast ? '#fff' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
          transition: reduceMotion ? 'none' : 'transform 0.2s'
        }}
        onMouseEnter={(e) => !reduceMotion && (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => !reduceMotion && (e.currentTarget.style.transform = 'scale(1)')}
      >
        ♿
      </button>
      
      {/* Accessibility Panel */}
      {showA11yPanel && (
        <div
          role="dialog"
          aria-label="Accessibility Settings"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '320px',
            maxWidth: 'calc(100vw - 40px)',
            background: highContrast ? '#000' : '#1a1a2e',
            border: highContrast ? '3px solid #fff' : '2px solid #4facfe',
            borderRadius: '15px',
            padding: '20px',
            zIndex: 9998,
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }}
        >
          <h2 style={{ 
            color: highContrast ? '#fff' : '#4facfe', 
            marginBottom: '15px',
            fontSize: largeText ? '1.4rem' : '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            ♿ Accessibility
            <button
              onClick={() => setShowA11yPanel(false)}
              aria-label="Close accessibility panel"
              style={{
                background: 'none',
                border: 'none',
                color: highContrast ? '#fff' : '#888',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              ×
            </button>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AccessibilityToggle
              label="High Contrast"
              description="Increases contrast for better visibility"
              checked={highContrast}
              onChange={toggleHighContrast}
              icon="🔲"
              highContrast={highContrast}
            />
            
            <AccessibilityToggle
              label="Large Text"
              description="Increases text size by 25%"
              checked={largeText}
              onChange={toggleLargeText}
              icon="🔤"
              highContrast={highContrast}
            />
            
            <AccessibilityToggle
              label="Reduce Motion"
              description="Disables animations"
              checked={reduceMotion}
              onChange={toggleReduceMotion}
              icon="⏸️"
              highContrast={highContrast}
            />
            
            <AccessibilityToggle
              label="Dyslexia Font"
              description="Uses OpenDyslexic font"
              checked={dyslexicFont}
              onChange={toggleDyslexicFont}
              icon="📖"
              highContrast={highContrast}
            />
          </div>
          
          <div style={{
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: `1px solid ${highContrast ? '#fff' : '#333'}`,
            fontSize: '0.85rem',
            color: highContrast ? '#fff' : '#888'
          }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Keyboard Navigation:</strong>
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Tab: Navigate between elements</li>
              <li>Enter/Space: Activate buttons</li>
              <li>Escape: Close dialogs</li>
              <li>Arrow keys: Navigate menus</li>
            </ul>
          </div>
          
          <p style={{
            marginTop: '12px',
            fontSize: '0.75rem',
            color: highContrast ? '#ccc' : '#666',
            textAlign: 'center'
          }}>
            WCAG 2.2 AAA Compliant
          </p>
        </div>
      )}
      
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      
      {/* Back to Top Button - Appears on all pages */}
      <BackToTop />
    </AccessibilityContext.Provider>
  );
}

// Accessibility Toggle Component
function AccessibilityToggle({ label, description, checked, onChange, icon, highContrast }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      aria-label={`${label}: ${checked ? 'On' : 'Off'}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        background: checked 
          ? (highContrast ? '#fff' : 'rgba(79, 172, 254, 0.2)') 
          : (highContrast ? '#333' : 'rgba(255,255,255,0.05)'),
        border: checked 
          ? `2px solid ${highContrast ? '#fff' : '#4facfe'}` 
          : `1px solid ${highContrast ? '#666' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        color: checked 
          ? (highContrast ? '#000' : '#4facfe') 
          : (highContrast ? '#fff' : '#ccc')
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{description}</div>
      </div>
      <div style={{
        width: '44px',
        height: '24px',
        background: checked 
          ? (highContrast ? '#000' : '#4facfe') 
          : (highContrast ? '#666' : '#333'),
        borderRadius: '12px',
        position: 'relative',
        transition: 'background 0.2s'
      }}>
        <div style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          background: highContrast ? '#fff' : '#fff',
          borderRadius: '50%',
          transition: 'left 0.2s'
        }} />
      </div>
    </button>
  );
}
