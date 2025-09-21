import React from 'react';
import { Link } from 'react-router-dom';

function SimpleHeader() {
  return (
    <header style={{
      background: '#d4af37',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Abba Whispers
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
          <Link to="/volumes" style={{ color: 'white', textDecoration: 'none' }}>Volumes</Link>
          <Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>Blog</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
          <Link to="/prayer-request" style={{ color: 'white', textDecoration: 'none' }}>Prayer</Link>
        </nav>
      </div>
    </header>
  );
}

export default SimpleHeader;