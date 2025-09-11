import React from 'react';

function DebugApp() {
  console.log('DebugApp is rendering');
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#d4af37' }}>Debug Mode - Abbaswhispers</h1>
      <p>If you see this, React is working!</p>
      
      <div style={{ margin: '2rem 0' }}>
        <h2>Test Links:</h2>
        <div>
          <a href="/volumes" style={{ display: 'block', margin: '0.5rem 0', color: '#d4af37' }}>
            Volumes Page
          </a>
          <a href="/blog" style={{ display: 'block', margin: '0.5rem 0', color: '#d4af37' }}>
            Blog Page
          </a>
          <a href="/contact" style={{ display: 'block', margin: '0.5rem 0', color: '#d4af37' }}>
            Contact Page
          </a>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', marginTop: '2rem' }}>
        <h3>Debug Info:</h3>
        <p>Environment: {process.env.NODE_ENV}</p>
        <p>API URL: {process.env.REACT_APP_API_URL || 'Not set'}</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  );
}

export default DebugApp;