import React from 'react';

const TestPage = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#d4af37' }}>Test Page</h1>
      <p>If you can see this, React is working!</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/volumes" style={{ margin: '0 1rem', color: '#d4af37' }}>Volumes</a>
        <a href="/blog" style={{ margin: '0 1rem', color: '#d4af37' }}>Blog</a>
        <a href="/contact" style={{ margin: '0 1rem', color: '#d4af37' }}>Contact</a>
      </div>
    </div>
  );
};

export default TestPage;