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
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="Abbaswhispers Logo" />
              <h3>Abbaswhispers</h3>
            </div>
            <p>Poetry and reflective conversations inspired by faith. The SELAH series - a journey from grief to grace.</p>
            <div className="footer-social">
              <a href="https://facebook.com/abbaswhispers" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com/abbaswhispers" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com/abbaswhispers" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://youtube.com/@abbaswhispers" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <h4>Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/volumes">Volumes</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Support Links */}
          <div className="footer-links">
            <h4>Support</h4>
            <Link to="/prayer-request">Prayer Request</Link>
            <a href="mailto:info@abbaswhispers.com">info@abbaswhispers.com</a>
            <a href="mailto:prayer@abbaswhispers.com">prayer@abbaswhispers.com</a>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p>Get weekly inspirations delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <div className={`newsletter-message ${message.includes('Error') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Abbaswhispers. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;