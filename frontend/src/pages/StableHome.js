import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const StableHome = () => {
  return (
    <>
      <Helmet>
        <title>Abbaswhispers - Healing Through Faith</title>
      </Helmet>
      
      <div style={{ minHeight: '100vh' }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #F5F5DC 0%, #9CAF88 100%)',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '3rem',
              color: '#2C3E50',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif'
            }}>
              Welcome to Abbaswhispers
            </h1>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#2C3E50',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Poetry and reflective conversations inspired by faith. The SELAH series - writings born from a journey through grief into grace, inspired by the Psalms.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to="/volumes" 
                style={{
                  background: '#D4AF37',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Explore Collections
              </Link>
              <Link 
                to="/about" 
                style={{
                  background: 'transparent',
                  color: '#2C3E50',
                  border: '2px solid #2C3E50',
                  padding: '1rem 2rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section style={{ padding: '3rem 2rem', background: 'white', textAlign: 'center' }}>
          <blockquote style={{
            fontSize: '1.3rem',
            fontStyle: 'italic',
            color: '#2C3E50',
            maxWidth: '800px',
            margin: '0 auto 1rem',
            lineHeight: '1.6'
          }}>
            "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."
          </blockquote>
          <cite style={{ color: '#D4AF37', fontWeight: '600' }}>- Psalm 23:1-2</cite>
        </section>

        {/* Navigation Cards */}
        <section style={{ padding: '3rem 2rem', background: '#F5F5DC' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#2C3E50', marginBottom: '2rem' }}>Explore Our Content</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <Link to="/about" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#2C3E50',
                border: '1px solid #D4AF37',
                display: 'block'
              }}>
                <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>About Us</h3>
                <p>Learn about our mission and story of faith</p>
              </Link>
              
              <Link to="/volumes" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#2C3E50',
                border: '1px solid #D4AF37',
                display: 'block'
              }}>
                <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Poetry Collections</h3>
                <p>Explore our SELAH series and other writings</p>
              </Link>
              
              <Link to="/blog" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#2C3E50',
                border: '1px solid #D4AF37',
                display: 'block'
              }}>
                <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Blog</h3>
                <p>Read our latest inspirations and reflections</p>
              </Link>
              
              <Link to="/contact" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#2C3E50',
                border: '1px solid #D4AF37',
                display: 'block'
              }}>
                <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Contact</h3>
                <p>Get in touch with us</p>
              </Link>
              
              <Link to="/prayer-request" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#2C3E50',
                border: '1px solid #D4AF37',
                display: 'block'
              }}>
                <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Prayer Request</h3>
                <p>Submit your prayer requests</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StableHome;