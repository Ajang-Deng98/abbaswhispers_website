import React from 'react';

function MinimalApp() {
  console.log('MinimalApp rendering...');
  
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🎉 Abba Whispers
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
          Vite + React Working Successfully!
        </h2>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '2rem', 
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h3>✅ What's Working:</h3>
          <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '1rem auto' }}>
            <li>Vite Dev Server</li>
            <li>React Components</li>
            <li>JavaScript Modules</li>
            <li>CSS Styling</li>
          </ul>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            <h4>🚀 Performance</h4>
            <p>Lightning fast dev server</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            <h4>⚡ Hot Reload</h4>
            <p>Instant updates</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            <h4>📦 Optimized</h4>
            <p>Smaller bundles</p>
          </div>
        </div>

        <p style={{ marginTop: '2rem', opacity: 0.8 }}>
          Server running on: <strong>http://localhost:3002</strong>
        </p>
      </div>
    </div>
  );
}

export default MinimalApp;