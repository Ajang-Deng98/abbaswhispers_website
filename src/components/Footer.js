import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
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
              <a href="https://facebook.com/abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://twitter.com/abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
              <a href="https://instagram.com/abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
              <a href="https://youtube.com/@abbawhispers" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
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
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address"
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  width: '100%'
                }}
              />
              <button type="submit" className="btn">Subscribe</button>
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