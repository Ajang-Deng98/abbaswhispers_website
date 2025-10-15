import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscriberAPI } from '../utils/api';
// import logoImage from '../assets/images/logo.jpg';
const logoImage = '/logo.jpg'; // Vite will serve from public folder

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setMessage('');
    
    try {
      await subscriberAPI.subscribe({ email });
      setMessage('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setMessage('Error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer style={{
      background: 'white',
      borderTop: '2px solid var(--primary-gold)',
      padding: '2rem 0 1rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.6rem',
          marginBottom: '1.6rem'
        }}>
          {/* Brand & About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img 
                src={logoImage} 
                alt="Abba's Whispers Logo" 
                style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#000',
                margin: 0
              }}>Abba's Whispers</h3>
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: '#000',
              lineHeight: '1.4',
              margin: '0 0 0.8rem 0'
            }}>
              An online space for poetry conversations, born from a journey through grief and grace.
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#666',
              margin: 0
            }}>
              "He restores my soul." - Psalm 23:3
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#000',
              marginBottom: '1rem'
            }}>Navigation</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <Link to="/" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
              <Link to="/about" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>About Uzo</Link>
              <Link to="/volumes" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>SELAH Volumes</Link>
              <Link to="/blog" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>Inspirational Blog</Link>
              <Link to="/contact" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#000',
              marginBottom: '1rem'
            }}>Support & Connect</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <Link to="/prayer-request" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>Prayer Requests</Link>
              <a href="mailto:info@abbaswhispers.com" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>General Inquiries</a>
              <a href="mailto:prayer@abbaswhispers.com" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>Prayer Team</a>
              <a href="https://abbaswhispers.substack.com" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', fontSize: '0.9rem' }}>Newsletter</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: '600',
              color: '#000',
              marginBottom: '0.8rem'
            }}>Newsletter</h4>
            <p style={{
              fontSize: '0.85rem',
              color: '#000',
              marginBottom: '0.8rem',
              lineHeight: '1.3'
            }}>
              Get weekly inspirations and new poetry releases.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  padding: '10px 20px',
                  background: 'var(--primary-gold)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #e9ecef',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: '#666',
            margin: 0
          }}>&copy; 2025 Abba's Whispers. All rights reserved.</p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/privacy" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy</Link>
            <Link to="/terms" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>Terms</Link>
          </div>
        </div>
        
        {message && (
          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: message.includes('Error') ? '#dc3545' : '#28a745'
          }}>
            {message}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;