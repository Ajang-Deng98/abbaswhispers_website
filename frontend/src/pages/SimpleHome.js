import React from 'react';

function SimpleHome() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to Abba Whispers
        </h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
          Christian faith-based writings inspired by the Book of Psalms
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#d4af37' }}>📖 SELAH Poetry</h3>
          <p>Discover our debut poetry collection with professional audio recordings</p>
        </div>
        <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#d4af37' }}>✍️ Blog</h3>
          <p>Read inspirational articles and faith-based writings</p>
        </div>
        <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#d4af37' }}>🙏 Prayer</h3>
          <p>Submit your prayer requests and find spiritual support</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleHome;