import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: 'white', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#667eea', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get In Touch</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>
          Have a story to share? Want to collaborate? Reach out to us.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '15px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                required
              />
            </div>

            <button type="submit" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}>
              Send Message
            </button>
          </form>
        ) : (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '3rem', borderRadius: '15px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#667eea' }}>Message Sent!</h2>
            <p>We'll get back to you soon. In solidarity.</p>
          </div>
        )}
      </div>
    </div>
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
