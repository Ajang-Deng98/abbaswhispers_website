import React from 'react';
import { Helmet } from 'react-helmet';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Abba's Whispers</title>
        <meta name="description" content="Privacy Policy for Abba's Whispers - How we protect and handle your personal information." />
      </Helmet>

      {/* Hero Section */}
      <section style={{
        padding: '150px 2rem 80px 2rem',
        textAlign: 'center',
        background: '#ffffff',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ScrollAnimatedSection animation="fade-up">
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2rem',
              fontWeight: 'normal',
              marginBottom: '1rem',
              color: '#2c2c2c',
              lineHeight: '1.2'
            }}>Privacy Policy</h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              color: '#666666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Your privacy is sacred to us. This policy explains how we collect, use, and protect your information.
            </p>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '60px 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <ScrollAnimatedSection animation="fade-up">
            <div style={{
              background: '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              borderLeft: '4px solid #c9a96e'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Information We Collect</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                We collect information you provide directly to us, such as when you:
              </p>
              <ul style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                paddingLeft: '1.5rem'
              }}>
                <li>Subscribe to our newsletter</li>
                <li>Submit a contact form or prayer request</li>
                <li>Sign up for volume updates</li>
                <li>Interact with our website</li>
              </ul>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={100}>
            <div style={{
              background: '#ffffff',
              padding: '2rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              border: '1px solid #e8e8e8'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>How We Use Your Information</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                We use the information we collect to:
              </p>
              <ul style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                paddingLeft: '1.5rem'
              }}>
                <li>Send you newsletters and updates about new poetry volumes</li>
                <li>Respond to your inquiries and prayer requests</li>
                <li>Improve our website and services</li>
                <li>Communicate with you about our ministry</li>
              </ul>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={200}>
            <div style={{
              background: '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              borderLeft: '4px solid #c9a96e'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Information Sharing</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                We do not sell, trade, or otherwise transfer your personal information to third parties. 
                Your information is kept confidential and is only used for the purposes outlined in this policy. 
                We may share information only when required by law or to protect our rights.
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={300}>
            <div style={{
              background: '#ffffff',
              padding: '2rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              border: '1px solid #e8e8e8'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Data Security</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={400}>
            <div style={{
              background: '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px',
              marginBottom: '3rem',
              borderLeft: '4px solid #c9a96e'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Your Rights</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                You have the right to:
              </p>
              <ul style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                paddingLeft: '1.5rem'
              }}>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Unsubscribe from our communications at any time</li>
              </ul>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={500}>
            <div style={{
              background: '#ffffff',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #e8e8e8',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Contact Us</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#c9a96e',
                fontWeight: '500'
              }}>
                info@abbawhispers.com
              </p>
            </div>
          </ScrollAnimatedSection>

        </div>
      </section>
    </>
  );
};

export default Privacy;