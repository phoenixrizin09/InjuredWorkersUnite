import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Social links
  const socialLinks = {
    twitter: 'https://twitter.com/Phoenixrizin09',
    bluesky: 'https://bsky.app/profile/injuredworkersunite.bsky.social',
    email: 'injuredworkersunite@proton.me'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Use Formspree for form handling (free tier: 50 submissions/month)
      // Replace with your Formspree form ID or use mailto fallback
      const formspreeEndpoint = 'https://formspree.io/f/xpzvqvvr'; // Replace with actual ID when set up
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contact from InjuredWorkersUnite',
          message: formData.message,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback to mailto
        const mailtoLink = `mailto:${socialLinks.email}?subject=${encodeURIComponent(formData.subject || 'Contact from Website')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        setSubmitted(true);
      }
    } catch (err) {
      // Fallback to mailto on error
      const mailtoLink = `mailto:${socialLinks.email}?subject=${encodeURIComponent(formData.subject || 'Contact from Website')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
    <Header />
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#667eea', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get In Touch</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Have a story to share? Want to collaborate? Reach out to us.
        </p>

        {/* Direct Contact Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <a href={`mailto:${socialLinks.email}`} style={{
            padding: '1rem',
            background: 'rgba(102, 126, 234, 0.2)',
            border: '1px solid #667eea',
            borderRadius: '10px',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📧</div>
            <div style={{ fontWeight: '600' }}>Email</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{socialLinks.email}</div>
          </a>
          
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem',
            background: 'rgba(29, 161, 242, 0.2)',
            border: '1px solid #1DA1F2',
            borderRadius: '10px',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🐦</div>
            <div style={{ fontWeight: '600' }}>Twitter/X</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>@Phoenixrizin09</div>
          </a>
          
          <a href={socialLinks.bluesky} target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem',
            background: 'rgba(0, 133, 255, 0.2)',
            border: '1px solid #0085FF',
            borderRadius: '10px',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🦋</div>
            <div style={{ fontWeight: '600' }}>Bluesky</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>@injuredworkersunite</div>
          </a>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '15px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#667eea' }}>Or Send a Message</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={inputStyle}
              >
                <option value="">Select a topic...</option>
                <option value="Share My Story">Share My Story</option>
                <option value="Report Corruption">Report Corruption / Tip</option>
                <option value="Collaboration">Collaboration / Partnership</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                required
                placeholder="Your message..."
              />
            </div>

            {error && (
              <div style={{ 
                background: 'rgba(255,0,0,0.2)', 
                border: '1px solid #ff6b6b', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1rem',
                color: '#ff6b6b'
              }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} style={{
              padding: '1rem 2rem',
              background: isSubmitting 
                ? 'rgba(102, 126, 234, 0.5)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              width: '100%'
            }}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            <p style={{ 
              fontSize: '0.8rem', 
              opacity: 0.6, 
              textAlign: 'center', 
              marginTop: '1rem' 
            }}>
              Your privacy matters. We don't store your data or share with third parties.
            </p>
          </form>
        ) : (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#667eea' }}>Message Sent!</h2>
            <p style={{ marginBottom: '1rem' }}>Thank you for reaching out. We'll get back to you soon.</p>
            <p style={{ opacity: 0.8 }}>In solidarity. ✊</p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(102, 126, 234, 0.3)',
                border: '1px solid #667eea',
                borderRadius: '25px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: '#0f3460',
  border: '2px solid #667eea',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1rem',
};
