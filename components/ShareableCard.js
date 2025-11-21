import { useState } from 'react';

export default function ShareableCard({ data, type = 'alert' }) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const generateCardText = () => {
    switch (type) {
      case 'alert':
        return `🚨 ${data.title}

📊 Source: ${data.source}
${data.affected_count ? `👥 Affected: ${data.affected_count}` : ''}
${data.financial_impact ? `💰 Impact: ${data.financial_impact}` : ''}

${data.evidence}

🔗 Injured Workers Unite
#CanadianCorruption #DisabilityRights #WSIB #ODSP`;

      case 'target':
        return `🎯 TARGET IDENTIFIED: ${data.name}

Type: ${data.type}
Jurisdiction: ${data.jurisdiction}
${data.evidence_count ? `📄 Evidence Count: ${data.evidence_count}` : ''}

🚨 Corruption Indicators:
${data.corruption_indicators?.slice(0, 3).map(c => `• ${c}`).join('\n')}

🔗 Injured Workers Unite
#Accountability #Corruption`;

      case 'stat':
        return `📊 CORRUPTION STAT:

${data.title}

${data.description}

Source: ${data.source}

🔗 Injured Workers Unite - The Eye Sees All
#FactsMatter #SystemicAbuse`;

      default:
        return JSON.stringify(data, null, 2);
    }
  };

  const copyToClipboard = () => {
    const text = generateCardText();
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Copied to clipboard! Paste into social media.');
    });
  };

  const shareToTwitter = () => {
    const text = generateCardText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  const shareToReddit = () => {
    const text = generateCardText();
    const url = window.location.href;
    const shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text.split('\n')[0])}`;
    window.open(shareUrl, '_blank');
  };

  const downloadAsImage = async () => {
    // For now, download as text file
    // In production, could use html2canvas to generate actual image
    const text = generateCardText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IWU_${type}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        style={{
          padding: '0.5rem 1rem',
          background: 'linear-gradient(135deg, #ff0080 0%, #ff6600 100%)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span>📤</span>
        <span>SHARE</span>
      </button>

      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowShareMenu(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              zIndex: 999
            }}
          ></div>

          {/* Share Menu */}
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            background: '#1a1a2e',
            border: '2px solid #4facfe',
            borderRadius: '15px',
            padding: '1rem',
            minWidth: '250px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}>
            <div style={{ color: '#4facfe', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.95rem' }}>
              SHARE THIS CORRUPTION:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(79, 172, 254, 0.1)',
                  border: '1px solid #4facfe',
                  borderRadius: '8px',
                  color: '#4facfe',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>📋</span>
                <span>Copy to Clipboard</span>
              </button>

              <button
                onClick={shareToTwitter}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(29, 161, 242, 0.1)',
                  border: '1px solid #1DA1F2',
                  borderRadius: '8px',
                  color: '#1DA1F2',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>🐦</span>
                <span>Share on Twitter/X</span>
              </button>

              <button
                onClick={shareToFacebook}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(66, 103, 178, 0.1)',
                  border: '1px solid #4267B2',
                  borderRadius: '8px',
                  color: '#4267B2',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>📘</span>
                <span>Share on Facebook</span>
              </button>

              <button
                onClick={shareToReddit}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 69, 0, 0.1)',
                  border: '1px solid #FF4500',
                  borderRadius: '8px',
                  color: '#FF4500',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>🤖</span>
                <span>Share on Reddit</span>
              </button>

              <button
                onClick={downloadAsImage}
                style={{
                  padding: '0.75rem',
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid #00ff88',
                  borderRadius: '8px',
                  color: '#00ff88',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>💾</span>
                <span>Download as File</span>
              </button>
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(255, 204, 68, 0.1)',
              border: '1px solid #ffcc44',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#ffcc44',
              lineHeight: '1.4'
            }}>
              💡 Sharing exposes corruption! Every share helps build public pressure for change.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Pre-formatted card generator for specific corruption stats
export function CorruptionStatCard({ title, value, source, description }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff0080 0%, #ff6600 100%)',
      borderRadius: '15px',
      padding: '2rem',
      color: 'white',
      minWidth: '300px',
      maxWidth: '500px'
    }}>
      <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>
        🚨 CANADIAN CORRUPTION STAT
      </div>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1.2' }}>
        {value}
      </div>
      <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {title}
      </div>
      <div style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem', opacity: 0.95' }}>
        {description}
      </div>
      <div style={{ fontSize: '0.85rem', opacity: 0.8, borderTop: '1px solid rgba(255, 255, 255, 0.3)', paddingTop: '0.75rem' }}>
        📊 Source: {source}
      </div>
      <div style={{ fontSize: '0.9rem', marginTop: '1rem', fontWeight: 'bold' }}>
        🔗 InjuredWorkersUnite.ca
      </div>
    </div>
  );
}
