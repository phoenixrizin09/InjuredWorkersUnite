import Link from 'next/link';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 👁️ THE EYE ORACLE - UNIFIED SYSTEM NAVIGATION
 * 
 * Cross-links all interconnected systems:
 * - The Eye Oracle (analysis)
 * - Daily Reports (viral content)
 * - Monitoring (automated tracking)
 * - Alerts (real-time notifications)
 * - Target Acquisition (action packages)
 * - Violation Map (geographic view)
 * - Templates (ready-to-use letters)
 * - Legislative Tracking (bills)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const systemLinks = [
  { href: '/the-eye-oracle', icon: '👁️', name: 'Oracle', description: 'Analysis Dashboard' },
  { href: '/reports', icon: '📋', name: 'Reports', description: 'Daily Reports & Analysis' },
  { href: '/automated-monitoring', icon: '📡', name: 'Monitor', description: 'Live Tracking' },
  { href: '/alerts', icon: '🚨', name: 'Alerts', description: 'Notifications' },
  { href: '/target-acquisition', icon: '🎯', name: 'Targets', description: 'Action Packages' },
  { href: '/violation-map', icon: '🗺️', name: 'Map', description: 'Geographic View' },
  { href: '/template-letters', icon: '📝', name: 'Templates', description: 'Letters & Appeals' },
  { href: '/legislative-tracking', icon: '⚖️', name: 'Bills', description: 'Legislation' }
];

export default function SystemNavigation({ current, compact = false }) {
  const linkStyle = {
    padding: compact ? '0.5rem 0.75rem' : '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'all 0.2s',
    fontSize: compact ? '0.8rem' : '0.9rem'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
    border: '1px solid #667eea',
    boxShadow: '0 0 10px rgba(102,126,234,0.3)'
  };

  return (
    <div style={{
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '12px',
      padding: compact ? '0.75rem' : '1rem',
      marginBottom: compact ? '1rem' : '1.5rem'
    }}>
      {!compact && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          color: '#888',
          fontSize: '0.8rem'
        }}>
          <span>👁️</span>
          <span>THE EYE ORACLE UNIFIED SYSTEM</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)', marginLeft: '0.5rem' }} />
        </div>
      )}
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        justifyContent: 'center'
      }}>
        {systemLinks.map(link => {
          const isActive = current === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={isActive ? activeLinkStyle : linkStyle}
              title={link.description}
            >
              <span aria-hidden="true">{link.icon}</span> {link.name}
            </Link>
          );
        })}
      </div>
      
      {!compact && (
        <div style={{
          marginTop: '0.75rem',
          textAlign: 'center',
          color: '#666',
          fontSize: '0.75rem'
        }}>
          All systems interconnected • Data flows automatically • The Eye never sleeps
        </div>
      )}
    </div>
  );
}

// Export for use in other components
export { systemLinks };
