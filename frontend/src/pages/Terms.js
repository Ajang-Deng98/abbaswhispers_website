import React from 'react';
import { Helmet } from 'react-helmet';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Abba's Whispers</title>
        <meta name="description" content="Terms of Service for Abba's Whispers - Guidelines for using our website and services." />
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
            }}>Terms of Service</h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              color: '#666666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              These terms govern your use of our website and services. By using our site, you agree to these terms.
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
              }}>Acceptance of Terms</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                By accessing and using the Abba's Whispers website, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
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
              }}>Use License</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Permission is granted to temporarily download one copy of the materials on Abba's Whispers 
                website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                paddingLeft: '1.5rem'
              }}>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
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
              }}>Content Ownership</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                All poetry, writings, and content on this website are the intellectual property of 
                Abba's Whispers and are protected by copyright laws. The content is provided for 
                personal inspiration and spiritual growth. Any unauthorized reproduction or distribution 
                is strictly prohibited.
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
              }}>User Conduct</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                When using our website, you agree to:
              </p>
              <ul style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                paddingLeft: '1.5rem'
              }}>
                <li>Use the website for lawful purposes only</li>
                <li>Respect the spiritual nature of our content</li>
                <li>Not engage in any activity that disrupts or interferes with our services</li>
                <li>Provide accurate information when submitting forms</li>
              </ul>
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
              }}>Prayer Requests</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                Prayer requests submitted through our website are treated with confidentiality and respect. 
                We commit to praying for your requests, but we cannot guarantee specific outcomes. 
                For urgent matters, please seek appropriate professional help.
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={500}>
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
              }}>Disclaimer</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                The materials on Abba's Whispers website are provided on an 'as is' basis. 
                Abba's Whispers makes no warranties, expressed or implied, and hereby disclaims 
                and negates all other warranties including without limitation, implied warranties 
                or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={600}>
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
              }}>Modifications</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6'
              }}>
                Abba's Whispers may revise these terms of service at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version 
                of these terms of service.
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fade-up" delay={700}>
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
              }}>Contact Information</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                If you have any questions about these Terms of Service, please contact us at:
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

export default Terms;