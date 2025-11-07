import React from 'react';
import { Helmet } from 'react-helmet';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Abba's Whispers</title>
        <meta name="description" content="Terms of Service for Abba's Whispers website. Read our terms and conditions for using our services." />
      </Helmet>

      <div style={{ padding: '150px 2rem 80px 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2.5rem',
          fontWeight: 'normal',
          color: '#2c2c2c',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>Terms of Service</h1>

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
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Abba's Whispers website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Disclaimer</h2>
            <p>The materials on Abba's Whispers website are provided on an 'as is' basis. Abba's Whispers makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Limitations</h2>
            <p>In no event shall Abba's Whispers or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Abba's Whispers website.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p><strong>Email:</strong> info@abbaswhispers.com</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms;