import { useState, useEffect } from 'react';

/**
 * Back to Top Button Component
 * Appears when user scrolls down, provides smooth scroll to top
 * Accessible with keyboard navigation and screen reader support
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        onKeyDown={handleKeyPress}
        aria-label="Back to top of page"
        title="Back to top"
        role="button"
        tabIndex={isVisible ? 0 : -1}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: '3px solid rgba(255,255,255,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5), 0 0 15px rgba(118, 75, 162, 0.4)',
          transition: 'all 0.3s ease',
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
          zIndex: 9998
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.7), 0 0 25px rgba(118, 75, 162, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.5), 0 0 15px rgba(118, 75, 162, 0.4)';
        }}
      >
        {/* Up Arrow Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      <style jsx>{`
        button:focus-visible {
          outline: 3px solid #4facfe !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 6px rgba(79, 172, 254, 0.3), 0 4px 20px rgba(102, 126, 234, 0.4) !important;
        }

        @media (max-width: 768px) {
          button {
            bottom: 85px !important;
            right: 15px !important;
            width: 50px !important;
            height: 50px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          button {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
