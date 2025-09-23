import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Simple components without complex dependencies
const SimpleHeader = () => (
  <header style={{ padding: '1rem', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ margin: 0, color: '#d4af37' }}>Abba Whispers</h1>
    </div>
  </header>
);

const SimpleHome = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Welcome to Abba Whispers</h1>
    <p>Christian poetry and inspirational writings</p>
  </div>
);

const SimpleFooter = () => (
  <footer style={{ padding: '1rem', background: '#333', color: 'white', textAlign: 'center' }}>
    <p>&copy; 2024 Abba Whispers. All rights reserved.</p>
  </footer>
);

function SimpleApp() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SimpleHeader />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SimpleFooter />
      </div>
    </Router>
  );
}

export default SimpleApp;