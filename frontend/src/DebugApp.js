import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components one by one to test
import Header from './components/Header';
import Footer from './components/Footer';

// Simple placeholder components
const SimplePage = ({ title }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This is the {title} page.</p>
  </div>
);

import './styles/App.css';
import './styles/Mobile.css';

function DebugApp() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<SimplePage title="Home" />} />
            <Route path="/about" element={<SimplePage title="About" />} />
            <Route path="/volumes" element={<SimplePage title="Volumes" />} />
            <Route path="/blog" element={<SimplePage title="Blog" />} />
            <Route path="/contact" element={<SimplePage title="Contact" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default DebugApp;