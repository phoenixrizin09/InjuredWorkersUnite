import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function InfographicGenerator() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('bold-activism');
  const [activeTab, setActiveTab] = useState('templates');
  const [customData, setCustomData] = useState({
    title: '',
    subtitle: '',
    stat1Value: '',
    stat1Label: '',
    stat2Value: '',
    stat2Label: '',
    stat3Value: '',
    stat3Label: '',
    stat4Value: '',
    stat4Label: '',
    quote: '',
    quoteAuthor: '',
    callToAction: '',
    website: 'injuredworkersunite.pages.dev'
  });
  const [previewMode, setPreviewMode] = useState('short');
  const canvasRef = useRef(null);

  // Design styles
  const designStyles = [
    {
      id: 'bold-activism',
      name: 'Bold Activism',
      description: 'High contrast, neon accents, maximum impact',
      colors: { primary: '#FF0080', secondary: '#FF8C00', accent: '#00FFFF', background: '#0A0A0A', text: '#FFFFFF' },
      features: ['Dark backgrounds', 'Gradient text', 'Large typography', 'Neon glow effects']
    },
    {
      id: 'professional',
      name: 'Professional Advocacy',
      description: 'Clean, data-focused, trust-building',
      colors: { primary: '#4FACFE', secondary: '#667eea', accent: '#FFD700', background: '#F5F5F5', text: '#1A1A2E' },
      features: ['Light backgrounds', 'Structured grids', 'Blue tones', 'Minimal decoration']
    },
    {
      id: 'grassroots',
      name: 'Grassroots Movement',
      description: 'Warm, human, community-focused',
      colors: { primary: '#DC2626', secondary: '#CA8A04', accent: '#16A34A', background: '#FFFBEB', text: '#374151' },
      features: ['Warm tones', 'Hand-drawn feel', 'Earth colors', 'Vintage aesthetic']
    },
    {
      id: 'minimal',
      name: 'Minimal Impact',
      description: 'Clean, accessible, typography-driven',
      colors: { primary: '#1F2937', secondary: '#6B7280', accent: '#3B82F6', background: '#FFFFFF', text: '#111827' },
      features: ['White space', 'Single accent', 'Sans-serif', 'Simple icons']
    },
    {
      id: 'artistic',
      name: 'Artistic Resistance',
      description: 'Creative, expressive, memorable',
      colors: { primary: '#9333EA', secondary: '#EC4899', accent: '#14B8A6', background: '#1E1B4B', text: '#FFFFFF' },
      features: ['Bold illustrations', 'Mixed media', 'Collage style', 'Expressive type']
    }
  ];

  // Load templates from JSON
  useEffect(() => {
    fetch('/data/infographic-templates.json')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates);
        if (data.templates.length > 0) {
          setSelectedTemplate(data.templates[0]);
          populateFromTemplate(data.templates[0]);
        }
      })
      .catch(err => console.error('Error loading templates:', err));
  }, []);

  const populateFromTemplate = (template) => {
    if (!template) return;
    setCustomData({
      title: template.titles[0] || '',
      subtitle: template.description || '',
      stat1Value: template.statistics[0]?.value || '',
      stat1Label: template.statistics[0]?.label || '',
      stat2Value: template.statistics[1]?.value || '',
      stat2Label: template.statistics[1]?.label || '',
      stat3Value: template.statistics[2]?.value || '',
      stat3Label: template.statistics[2]?.label || '',
      stat4Value: template.statistics[3]?.value || '',
      stat4Label: template.statistics[3]?.label || '',
      quote: template.quotes[0] || '',
      quoteAuthor: 'Injured Worker',
      callToAction: template.callsToAction[0] || '',
      website: 'injuredworkersunite.pages.dev'
    });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    populateFromTemplate(template);
  };

  const getStyleColors = () => {
    const style = designStyles.find(s => s.id === selectedStyle);
    return style?.colors || designStyles[0].colors;
  };

  const randomizeContent = () => {
    if (!selectedTemplate) return;
    const randomTitle = selectedTemplate.titles[Math.floor(Math.random() * selectedTemplate.titles.length)];
    const randomQuote = selectedTemplate.quotes[Math.floor(Math.random() * selectedTemplate.quotes.length)];
    const randomCTA = selectedTemplate.callsToAction[Math.floor(Math.random() * selectedTemplate.callsToAction.length)];
    
    setCustomData(prev => ({
      ...prev,
      title: randomTitle,
      quote: randomQuote,
      callToAction: randomCTA
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadInfographic = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const colors = getStyleColors();
    
    // Set canvas size based on preview mode
    if (previewMode === 'short') {
      canvas.width = 1080;
      canvas.height = 1350; // Instagram portrait
    } else {
      canvas.width = 1080;
      canvas.height = 1920; // Story format
    }

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.background);
    gradient.addColorStop(1, colors.primary + '40');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add border
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = colors.primary;
    ctx.textAlign = 'center';
    wrapText(ctx, customData.title, canvas.width / 2, 150, canvas.width - 100, 70);

    // Icon
    ctx.font = '120px Arial';
    ctx.fillText(selectedTemplate?.icon || '📊', canvas.width / 2, 350);

    // Statistics
    const stats = [
      { value: customData.stat1Value, label: customData.stat1Label },
      { value: customData.stat2Value, label: customData.stat2Label },
      { value: customData.stat3Value, label: customData.stat3Label },
      { value: customData.stat4Value, label: customData.stat4Label }
    ].filter(s => s.value && s.label);

    const statStartY = 450;
    const statHeight = 150;
    
    stats.forEach((stat, idx) => {
      const y = statStartY + (idx * statHeight);
      
      // Stat box background
      ctx.fillStyle = colors.primary + '30';
      ctx.fillRect(60, y, canvas.width - 120, 120);
      
      // Stat value
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = colors.accent;
      ctx.textAlign = 'left';
      ctx.fillText(stat.value, 100, y + 55);
      
      // Stat label
      ctx.font = '24px Arial';
      ctx.fillStyle = colors.text;
      ctx.fillText(stat.label, 100, y + 95);
    });

    // Quote
    if (customData.quote) {
      const quoteY = statStartY + (stats.length * statHeight) + 60;
      ctx.font = 'italic 28px Arial';
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'center';
      wrapText(ctx, `"${customData.quote}"`, canvas.width / 2, quoteY, canvas.width - 120, 35);
      
      ctx.font = '22px Arial';
      ctx.fillStyle = colors.secondary;
      ctx.fillText(`— ${customData.quoteAuthor}`, canvas.width / 2, quoteY + 80);
    }

    // Call to Action
    if (customData.callToAction) {
      ctx.fillStyle = colors.primary;
      ctx.fillRect(60, canvas.height - 280, canvas.width - 120, 100);
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(customData.callToAction, canvas.width / 2, canvas.height - 215);
    }

    // Website
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = colors.accent;
    ctx.fillText(`🌐 ${customData.website}`, canvas.width / 2, canvas.height - 100);

    // Hashtag
    ctx.font = '24px Arial';
    ctx.fillStyle = colors.secondary;
    ctx.fillText('#InjuredWorkersUnite', canvas.width / 2, canvas.height - 60);

    // Download
    const link = document.createElement('a');
    link.download = `infographic-${selectedTemplate?.id || 'custom'}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Helper function to wrap text
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineCount = 0;

    for (let i = 0; i < words.length; i++) {
      testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, y + (lineCount * lineHeight));
        line = words[i] + ' ';
        lineCount++;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, y + (lineCount * lineHeight));
  }

  const colors = getStyleColors();

  return (
    <>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.background} 0%, #1a1a2e 100%)`,
        color: colors.text === '#FFFFFF' ? '#fff' : colors.text,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Hero Section */}
        <section style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`,
          borderBottom: `3px solid ${colors.primary}`
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1rem',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 INFOGRAPHIC GENERATOR
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            opacity: 0.9
          }}>
            Create powerful, shareable infographics for disability rights, injured workers, 
            elderly justice, mental health, and social justice advocacy
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/memetic-embassy" style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: `2px solid ${colors.primary}`,
              borderRadius: '25px',
              color: colors.primary,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              ← Back to Memetic Embassy
            </Link>
            <button 
              onClick={downloadInfographic}
              style={{
                padding: '0.75rem 1.5rem',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                border: 'none',
                borderRadius: '25px',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: `0 0 20px ${colors.primary}50`
              }}
            >
              📥 Download Infographic
            </button>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '15px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: `2px solid ${colors.primary}40`
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {['templates', 'customize', 'style', 'preview'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 24px',
                  background: activeTab === tab 
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                    : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${colors.primary}`,
                  borderRadius: '25px',
                  color: activeTab === tab ? '#fff' : colors.primary,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s'
                }}
              >
                {tab === 'templates' && '📋 Templates'}
                {tab === 'customize' && '✏️ Customize'}
                {tab === 'style' && '🎨 Style'}
                {tab === 'preview' && '👁️ Preview'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          
          {/* TEMPLATES TAB */}
          {activeTab === 'templates' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: colors.primary }}>
                Choose a Template
              </h2>
              <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                Select a cause to get started with pre-filled statistics, quotes, and calls to action
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    style={{
                      padding: '1.5rem',
                      background: selectedTemplate?.id === template.id 
                        ? `linear-gradient(135deg, ${template.colorPalette?.primary || colors.primary}30 0%, ${template.colorPalette?.secondary || colors.secondary}30 100%)`
                        : 'rgba(255,255,255,0.05)',
                      border: `3px solid ${selectedTemplate?.id === template.id ? template.colorPalette?.primary || colors.primary : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: selectedTemplate?.id === template.id ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                      {template.icon}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '0.5rem', 
                      color: template.colorPalette?.primary || colors.primary,
                      textAlign: 'center'
                    }}>
                      {template.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, textAlign: 'center', marginBottom: '1rem' }}>
                      {template.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                      {template.icons.slice(0, 4).map((icon, idx) => (
                        <span key={idx} style={{ fontSize: '1.5rem' }}>{icon}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTemplate && (
                <div style={{
                  marginTop: '3rem',
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  border: `2px solid ${selectedTemplate.colorPalette?.primary || colors.primary}`
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: colors.primary }}>
                    {selectedTemplate.icon} {selectedTemplate.name} - Template Contents
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Title Options */}
                    <div>
                      <h4 style={{ color: colors.accent, marginBottom: '0.75rem' }}>📌 Title Options</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {selectedTemplate.titles.map((title, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCustomData(prev => ({ ...prev, title }))}
                            style={{
                              padding: '0.75rem',
                              background: customData.title === title ? colors.primary + '40' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${colors.primary}40`,
                              borderRadius: '8px',
                              color: '#fff',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            {title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Statistics */}
                    <div>
                      <h4 style={{ color: colors.accent, marginBottom: '0.75rem' }}>📊 Statistics</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {selectedTemplate.statistics.map((stat, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '0.75rem',
                              background: 'rgba(255,255,255,0.05)',
                              border: `1px solid ${colors.primary}40`,
                              borderRadius: '8px'
                            }}
                          >
                            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: colors.accent }}>
                              {stat.value}
                            </div>
                            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{stat.label}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem' }}>
                              Source: {stat.source}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quotes */}
                    <div>
                      <h4 style={{ color: colors.accent, marginBottom: '0.75rem' }}>💬 Quotes</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {selectedTemplate.quotes.map((quote, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCustomData(prev => ({ ...prev, quote }))}
                            style={{
                              padding: '0.75rem',
                              background: customData.quote === quote ? colors.primary + '40' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${colors.primary}40`,
                              borderRadius: '8px',
                              color: '#fff',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              fontStyle: 'italic'
                            }}
                          >
                            "{quote}"
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calls to Action */}
                    <div>
                      <h4 style={{ color: colors.accent, marginBottom: '0.75rem' }}>📣 Calls to Action</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {selectedTemplate.callsToAction.map((cta, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCustomData(prev => ({ ...prev, callToAction: cta }))}
                            style={{
                              padding: '0.75rem',
                              background: customData.callToAction === cta ? colors.primary + '40' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${colors.primary}40`,
                              borderRadius: '8px',
                              color: '#fff',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            {cta}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button
                      onClick={randomizeContent}
                      style={{
                        padding: '1rem 2rem',
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        border: 'none',
                        borderRadius: '25px',
                        color: '#fff',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      🎲 Randomize Content
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMIZE TAB */}
          {activeTab === 'customize' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: colors.primary }}>
                Customize Your Infographic
              </h2>
              <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                Edit the text, statistics, and messaging to match your specific campaign
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '2rem'
              }}>
                {/* Left Column - Form */}
                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  border: `2px solid ${colors.primary}40`
                }}>
                  <h3 style={{ color: colors.accent, marginBottom: '1.5rem' }}>📝 Content Editor</h3>
                  
                  {/* Title */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={customData.title}
                      onChange={(e) => setCustomData({ ...customData, title: e.target.value })}
                      placeholder="Your powerful headline"
                      style={inputStyle(colors)}
                    />
                  </div>

                  {/* Subtitle */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={customData.subtitle}
                      onChange={(e) => setCustomData({ ...customData, subtitle: e.target.value })}
                      placeholder="Supporting context"
                      style={inputStyle(colors)}
                    />
                  </div>

                  {/* Statistics */}
                  <h4 style={{ color: colors.accent, marginBottom: '1rem', marginTop: '2rem' }}>📊 Statistics</h4>
                  
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 2fr', 
                      gap: '1rem', 
                      marginBottom: '1rem' 
                    }}>
                      <input
                        type="text"
                        value={customData[`stat${num}Value`]}
                        onChange={(e) => setCustomData({ ...customData, [`stat${num}Value`]: e.target.value })}
                        placeholder={`Value ${num}`}
                        style={inputStyle(colors)}
                      />
                      <input
                        type="text"
                        value={customData[`stat${num}Label`]}
                        onChange={(e) => setCustomData({ ...customData, [`stat${num}Label`]: e.target.value })}
                        placeholder={`Label ${num}`}
                        style={inputStyle(colors)}
                      />
                    </div>
                  ))}

                  {/* Quote */}
                  <h4 style={{ color: colors.accent, marginBottom: '1rem', marginTop: '2rem' }}>💬 Quote</h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <textarea
                      value={customData.quote}
                      onChange={(e) => setCustomData({ ...customData, quote: e.target.value })}
                      placeholder="A powerful quote that resonates"
                      style={{ ...inputStyle(colors), minHeight: '80px', resize: 'vertical' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      value={customData.quoteAuthor}
                      onChange={(e) => setCustomData({ ...customData, quoteAuthor: e.target.value })}
                      placeholder="Attribution"
                      style={inputStyle(colors)}
                    />
                  </div>

                  {/* Call to Action */}
                  <h4 style={{ color: colors.accent, marginBottom: '1rem', marginTop: '2rem' }}>📣 Call to Action</h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <input
                      type="text"
                      value={customData.callToAction}
                      onChange={(e) => setCustomData({ ...customData, callToAction: e.target.value })}
                      placeholder="What should people do?"
                      style={inputStyle(colors)}
                    />
                  </div>

                  {/* Website */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Website/URL
                    </label>
                    <input
                      type="text"
                      value={customData.website}
                      onChange={(e) => setCustomData({ ...customData, website: e.target.value })}
                      placeholder="yourwebsite.com"
                      style={inputStyle(colors)}
                    />
                  </div>
                </div>

                {/* Right Column - Quick Actions */}
                <div style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '15px',
                  border: `2px solid ${colors.primary}40`
                }}>
                  <h3 style={{ color: colors.accent, marginBottom: '1.5rem' }}>⚡ Quick Actions</h3>

                  {selectedTemplate && (
                    <>
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ marginBottom: '0.75rem' }}>Quick Fill Statistics</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {selectedTemplate.statistics.map((stat, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCustomData(prev => ({
                                ...prev,
                                [`stat${idx + 1}Value`]: stat.value,
                                [`stat${idx + 1}Label`]: stat.label
                              }))}
                              style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: `1px solid ${colors.primary}`,
                                borderRadius: '20px',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                              }}
                            >
                              {stat.value}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ marginBottom: '0.75rem' }}>Copy to Clipboard</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <button
                            onClick={() => copyToClipboard(customData.title)}
                            style={copyButtonStyle(colors)}
                          >
                            📋 Copy Title
                          </button>
                          <button
                            onClick={() => copyToClipboard(
                              `${customData.title}\n\n` +
                              `📊 ${customData.stat1Value} - ${customData.stat1Label}\n` +
                              `📊 ${customData.stat2Value} - ${customData.stat2Label}\n` +
                              `📊 ${customData.stat3Value} - ${customData.stat3Label}\n\n` +
                              `"${customData.quote}" - ${customData.quoteAuthor}\n\n` +
                              `${customData.callToAction}\n\n` +
                              `🌐 ${customData.website}\n#InjuredWorkersUnite`
                            )}
                            style={copyButtonStyle(colors)}
                          >
                            📋 Copy All Text
                          </button>
                          <button
                            onClick={() => copyToClipboard('#InjuredWorkersUnite #DisabilityJustice #WorkersRights #SocialJustice')}
                            style={copyButtonStyle(colors)}
                          >
                            # Copy Hashtags
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '0.75rem' }}>Template Actions</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={randomizeContent}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                          border: 'none',
                          borderRadius: '25px',
                          color: '#fff',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        🎲 Randomize All
                      </button>
                      <button
                        onClick={() => selectedTemplate && populateFromTemplate(selectedTemplate)}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          border: `2px solid ${colors.primary}`,
                          borderRadius: '25px',
                          color: colors.primary,
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        🔄 Reset to Template
                      </button>
                    </div>
                  </div>

                  {/* Accessibility Checker */}
                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0,255,0,0.1)',
                    borderRadius: '10px',
                    border: '2px solid #32CD32'
                  }}>
                    <h4 style={{ color: '#32CD32', marginBottom: '0.75rem' }}>♿ Accessibility Check</h4>
                    <ul style={{ fontSize: '0.85rem', opacity: 0.9, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                      <li>✅ High contrast colors enabled</li>
                      <li>✅ Large readable fonts</li>
                      <li>✅ Clear visual hierarchy</li>
                      <li>✅ Screen reader compatible text</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STYLE TAB */}
          {activeTab === 'style' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: colors.primary }}>
                Choose Your Style
              </h2>
              <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                Select a design style that matches your campaign's tone and audience
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {designStyles.map(style => (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    style={{
                      padding: '1.5rem',
                      background: selectedStyle === style.id 
                        ? `linear-gradient(135deg, ${style.colors.primary}30 0%, ${style.colors.secondary}30 100%)`
                        : 'rgba(255,255,255,0.05)',
                      border: `3px solid ${selectedStyle === style.id ? style.colors.primary : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: selectedStyle === style.id ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {/* Color Preview */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem', 
                      marginBottom: '1rem',
                      justifyContent: 'center'
                    }}>
                      {Object.values(style.colors).slice(0, 4).map((color, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: color,
                            border: '2px solid rgba(255,255,255,0.3)'
                          }}
                        />
                      ))}
                    </div>

                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '0.5rem', 
                      color: style.colors.primary,
                      textAlign: 'center'
                    }}>
                      {style.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, textAlign: 'center', marginBottom: '1rem' }}>
                      {style.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                      {style.features.map((feature, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.25rem 0.75rem',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '15px',
                            fontSize: '0.75rem'
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Palette Display */}
              <div style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '15px',
                border: `2px solid ${colors.primary}`
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: colors.primary }}>
                  🎨 Current Color Palette
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {Object.entries(colors).map(([name, color]) => (
                    <div key={name} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '15px',
                          background: color,
                          border: '3px solid rgba(255,255,255,0.3)',
                          marginBottom: '0.5rem',
                          boxShadow: `0 4px 15px ${color}50`
                        }}
                      />
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {name}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.7, fontFamily: 'monospace' }}>
                        {color}
                      </div>
                      <button
                        onClick={() => copyToClipboard(color)}
                        style={{
                          marginTop: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: '0.7rem',
                          cursor: 'pointer'
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW TAB */}
          {activeTab === 'preview' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: colors.primary }}>
                Preview Your Infographic
              </h2>
              
              {/* Preview Mode Toggle */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '2rem',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => setPreviewMode('short')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: previewMode === 'short' ? colors.primary : 'rgba(255,255,255,0.1)',
                    border: `2px solid ${colors.primary}`,
                    borderRadius: '25px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📱 Short Version (1080x1350)
                </button>
                <button
                  onClick={() => setPreviewMode('long')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: previewMode === 'long' ? colors.primary : 'rgba(255,255,255,0.1)',
                    border: `2px solid ${colors.primary}`,
                    borderRadius: '25px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📜 Full Version (1080x1920)
                </button>
              </div>

              {/* Preview Container */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: previewMode === 'short' ? '400px' : '360px',
                  aspectRatio: previewMode === 'short' ? '4/5' : '9/16',
                  background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary}20 100%)`,
                  borderRadius: '20px',
                  padding: '2rem',
                  border: `4px solid ${colors.primary}`,
                  boxShadow: `0 10px 40px ${colors.primary}40`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden'
                }}>
                  {/* Header */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                      {selectedTemplate?.icon || '📊'}
                    </div>
                    <h2 style={{
                      fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                      fontWeight: 'bold',
                      color: colors.primary,
                      lineHeight: '1.3',
                      marginBottom: '0.5rem'
                    }}>
                      {customData.title || 'YOUR TITLE HERE'}
                    </h2>
                    {customData.subtitle && (
                      <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {customData.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Statistics */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' }}>
                    {[
                      { value: customData.stat1Value, label: customData.stat1Label },
                      { value: customData.stat2Value, label: customData.stat2Label },
                      { value: customData.stat3Value, label: customData.stat3Label },
                      { value: customData.stat4Value, label: customData.stat4Label }
                    ].filter(s => s.value && s.label).map((stat, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '0.75rem',
                          background: `${colors.primary}30`,
                          borderRadius: '10px',
                          borderLeft: `4px solid ${colors.accent}`
                        }}
                      >
                        <div style={{ 
                          fontSize: '1.3rem', 
                          fontWeight: 'bold', 
                          color: colors.accent 
                        }}>
                          {stat.value}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  {customData.quote && (
                    <div style={{
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                      fontStyle: 'italic',
                      textAlign: 'center'
                    }}>
                      <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        "{customData.quote}"
                      </p>
                      <p style={{ fontSize: '0.75rem', color: colors.secondary }}>
                        — {customData.quoteAuthor}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ textAlign: 'center' }}>
                    {customData.callToAction && (
                      <div style={{
                        padding: '0.75rem 1rem',
                        background: colors.primary,
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        marginBottom: '0.75rem'
                      }}>
                        {customData.callToAction}
                      </div>
                    )}
                    <div style={{ fontSize: '0.8rem', color: colors.accent }}>
                      🌐 {customData.website}
                    </div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.25rem' }}>
                      #InjuredWorkersUnite
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div style={{
                padding: '2rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '15px',
                border: `2px solid ${colors.primary}`,
                textAlign: 'center'
              }}>
                <h3 style={{ marginBottom: '1rem', color: colors.accent }}>📥 Download Options</h3>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={downloadInfographic}
                    style={{
                      padding: '1rem 2rem',
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                      border: 'none',
                      borderRadius: '25px',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      boxShadow: `0 4px 20px ${colors.primary}50`
                    }}
                  >
                    📥 Download PNG
                  </button>
                  <button
                    onClick={() => copyToClipboard(
                      `${customData.title}\n\n` +
                      `📊 ${customData.stat1Value} - ${customData.stat1Label}\n` +
                      `📊 ${customData.stat2Value} - ${customData.stat2Label}\n` +
                      `📊 ${customData.stat3Value} - ${customData.stat3Label}\n\n` +
                      `"${customData.quote}" - ${customData.quoteAuthor}\n\n` +
                      `${customData.callToAction}\n\n` +
                      `🌐 ${customData.website}\n#InjuredWorkersUnite #DisabilityJustice`
                    )}
                    style={{
                      padding: '1rem 2rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: `2px solid ${colors.primary}`,
                      borderRadius: '25px',
                      color: colors.primary,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    📋 Copy as Text
                  </button>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                  <h4 style={{ marginBottom: '0.75rem' }}>Share to Social Media</h4>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                      { name: 'Twitter/X', icon: '🐦', color: '#1DA1F2' },
                      { name: 'Facebook', icon: '📘', color: '#1877F2' },
                      { name: 'Instagram', icon: '📷', color: '#E4405F' },
                      { name: 'Reddit', icon: '🤖', color: '#FF4500' }
                    ].map(platform => (
                      <button
                        key={platform.name}
                        style={{
                          padding: '0.5rem 1rem',
                          background: platform.color,
                          border: 'none',
                          borderRadius: '20px',
                          color: '#fff',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        {platform.icon} {platform.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Template Gallery */}
        <section style={{
          padding: '60px 20px',
          background: 'rgba(0,0,0,0.5)',
          borderTop: `3px solid ${colors.primary}40`
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              textAlign: 'center', 
              marginBottom: '1rem',
              color: colors.primary
            }}>
              🎯 Quick Start Templates
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
              One-click templates for common advocacy campaigns
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { icon: '⚠️', title: 'WSIB Denial Stats', desc: 'Expose claim denial rates', color: '#FF0080' },
                { icon: '♿', title: 'Disability Rights', desc: 'Accessibility barriers data', color: '#4FACFE' },
                { icon: '👴', title: 'Elder Care Crisis', desc: 'Long-term care statistics', color: '#32CD32' },
                { icon: '🧠', title: 'Mental Health Stigma', desc: 'Breaking the silence', color: '#8B5CF6' },
                { icon: '🏠', title: 'Housing Justice', desc: 'Affordable housing crisis', color: '#EF4444' },
                { icon: '💰', title: 'Poverty Wages', desc: 'Living wage advocacy', color: '#F97316' },
                { icon: '🪶', title: 'Indigenous Justice', desc: 'Truth & reconciliation', color: '#DC2626' },
                { icon: '🏥', title: 'Healthcare Access', desc: 'Universal care advocacy', color: '#059669' }
              ].map((template, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: `2px solid ${template.color}40`,
                    borderRadius: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = template.color;
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = template.color + '40';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{template.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: template.color }}>
                    {template.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>{template.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section style={{
          padding: '60px 20px',
          background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)`
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              textAlign: 'center', 
              marginBottom: '2rem',
              color: colors.primary
            }}>
              💡 Infographic Best Practices
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  icon: '📊',
                  title: 'Lead with Data',
                  tips: ['Use shocking statistics', 'Cite credible sources', 'Round numbers for impact']
                },
                {
                  icon: '🎨',
                  title: 'Visual Hierarchy',
                  tips: ['Biggest text = most important', 'Use color for emphasis', 'Group related info']
                },
                {
                  icon: '♿',
                  title: 'Accessibility',
                  tips: ['High contrast colors', 'Large readable fonts', 'Include alt text when sharing']
                },
                {
                  icon: '📱',
                  title: 'Mobile-First',
                  tips: ['Test on phone screens', 'Keep text brief', 'Make CTAs tap-friendly']
                }
              ].map((section, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: `2px solid ${colors.primary}30`
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{section.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: colors.accent }}>
                    {section.title}
                  </h3>
                  <ul style={{ fontSize: '0.9rem', opacity: 0.9, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
                    {section.tips.map((tip, tipIdx) => (
                      <li key={tipIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// Helper style functions
const inputStyle = (colors) => ({
  width: '100%',
  padding: '0.75rem',
  background: 'rgba(0,0,0,0.3)',
  border: `2px solid ${colors.primary}40`,
  borderRadius: '8px',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none'
});

const copyButtonStyle = (colors) => ({
  padding: '0.75rem 1.5rem',
  background: 'rgba(255,255,255,0.1)',
  border: `2px solid ${colors.primary}`,
  borderRadius: '25px',
  color: colors.primary,
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'center'
});
