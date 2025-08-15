import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscriberAPI } from '../utils/api';

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
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img 
                src="/logo.png" 
                alt="Abba Whispers Logo" 
                style={{ height: '30px', width: 'auto' }}
              />
              <h3 style={{ margin: 0 }}>Abba Whispers</h3>
            </div>
            <p>An online space for poetry and reflective conversations. The SELAH series - a journey from grief to grace.</p>
            <div className="social-links">
              <a href="https://facebook.com/abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
              <a href="https://twitter.com/abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
              <a href="https://instagram.com/abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://youtube.com/@abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
            </div>
          </div>
          
          <div>
            <h3>Quick Links</h3>
            <Link to="/about">About Us</Link>
            <Link to="/volumes">Volumes</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div>
            <h3>Support</h3>
            <Link to="/prayer-request">Prayer Request</Link>
            <a href="mailto:info@abbawhispers.com">Email Us</a>
            <a href="tel:+1234567890">Call Us</a>
          </div>
          
          <div>
            <h3>Newsletter</h3>
            <p>Subscribe to receive our latest inspirational content.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  width: '100%'
                }}
              />
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <div style={{ 
                  marginTop: '10px', 
                  fontSize: '0.8rem',
                  color: message.includes('Error') ? '#ff4444' : '#44ff44'
                }}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Abba Whispers. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;