import React from 'react';

function TestApp() {
  console.log('TestApp rendering...');
  
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      minHeight: '100vh',
      background: '#f0f0f0'
    }}>
      <h1 style={{ color: '#d4af37', fontSize: '3rem' }}>✅ Vite + React Working!</h1>
      <p style={{ fontSize: '1.5rem', margin: '2rem 0' }}>If you can see this, Vite is working correctly.</p>
      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={() => alert('Button clicked!')}
          style={{
            background: '#d4af37',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          Test Button - Click Me!
        </button>
      </div>
      <p style={{ marginTop: '2rem', color: '#666' }}>Server: http://localhost:3002</p>
    </div>
  );
}

export default TestApp;