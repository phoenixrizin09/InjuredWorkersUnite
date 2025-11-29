import { useState } from 'react';

export default function TransparencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)',
      color: '#000',
      padding: '1rem',
      textAlign: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      boxShadow: '0 4px 20px rgba(0,255,255,0.5)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <strong>🎯 100% REAL DATA:</strong> We fetch actual government data from free APIs every 6 hours. No mock data. No fabrication. Everything is verifiable.
          <div style={{ fontSize: '0.85rem', marginTop: '0.25rem', opacity: 0.9 }}>
            ✅ Open Canada Data • ✅ Ontario Open Data • ✅ OpenParliament • ✅ Reddit • 💰 Cost: $0.00
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss transparency banner"
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: '2px solid #000',
            borderRadius: '5px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          Got it ✓
        </button>
      </div>
    </div>
  );
}
