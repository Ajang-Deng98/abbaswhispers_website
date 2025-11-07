import React from 'react';
import { Helmet } from 'react-helmet';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Abba's Whispers</title>
        <meta name="description" content="Privacy Policy for Abba's Whispers website. Learn how we protect and handle your personal information." />
      </Helmet>

      <div style={{ padding: '150px 2rem 80px 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2.5rem',
          fontWeight: 'normal',
          color: '#2c2c2c',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>Privacy Policy</h1>

        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1rem',
          lineHeight: '1.7',
          color: '#666666'
        }}>
          <p style={{ marginBottom: '2rem' }}>
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Subscribe to our newsletter</li>
              <li>Submit a contact form or prayer request</li>
              <li>Interact with our website</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and prayer requests</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p><strong>Email:</strong> info@abbaswhispers.com</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Privacy;