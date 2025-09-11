import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '500px' }}>
            We're experiencing technical difficulties. Please refresh the page or try again later.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: 'var(--primary-gold)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Refresh Page
            </button>
            <a 
              href="/"
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: 'var(--primary-gold)',
                border: '2px solid var(--primary-gold)',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;