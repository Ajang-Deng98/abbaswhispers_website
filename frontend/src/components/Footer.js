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
      const response = await subscriberAPI.subscribe({ email });
      if (response.data.message && response.data.message.includes('already subscribed')) {
        setMessage('📬 You are already subscribed! Thank you for your continued support.');
      } else {
        setMessage('🎉 Success! Thank you for subscribing to our newsletter.');
      }
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      if (error.response?.data?.message?.includes('already subscribed')) {
        setMessage('📬 You are already subscribed! Thank you for your continued support.');
        setEmail('');
      } else {
        setMessage('There was an error with your subscription. Please try again.');
      }
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
            
            {/* Social Media Icons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <a href="https://facebook.com/abbaswhispers" target="_blank" rel="noopener noreferrer" style={{ color: '#8b7355', fontSize: '1.5rem', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#3b5998'} onMouseLeave={(e) => e.target.style.color = '#8b7355'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/abbaswhispers" target="_blank" rel="noopener noreferrer" style={{ color: '#8b7355', fontSize: '1.5rem', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#E4405F'} onMouseLeave={(e) => e.target.style.color = '#8b7355'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a href="https://youtube.com/@abbaswhispers" target="_blank" rel="noopener noreferrer" style={{ color: '#8b7355', fontSize: '1.5rem', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#FF0000'} onMouseLeave={(e) => e.target.style.color = '#8b7355'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
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
                  background: isSubmitting ? '#999999' : '#8b7355',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = '#6d5a42';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = '#8b7355';
                  }
                }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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