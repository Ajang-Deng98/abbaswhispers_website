import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#d4af37' }}>Abba Whispers - Home</h1>
      <p>Welcome to Abba Whispers website</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#d4af37' }}>About</h1>
      <p>About Abba Whispers</p>
    </div>
  );
}

function SimpleApp() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#fff' }}>
        <nav style={{ 
          background: '#d4af37', 
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <Link to="/" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>About</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default SimpleApp;