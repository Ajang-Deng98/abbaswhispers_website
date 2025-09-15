import React from 'react';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = '40px', 
  fullScreen = false,
  overlay = false 
}) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `3px solid rgba(212, 175, 55, 0.3)`,
    borderTop: `3px solid #d4af37`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: fullScreen ? '0' : '3rem',
    textAlign: 'center',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: overlay ? 'rgba(255, 255, 255, 0.9)' : 'white',
      zIndex: 9999
    })
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={spinnerStyle}></div>
        <p style={{
          color: '#666',
          fontSize: '1rem',
          fontFamily: 'Space Grotesk, sans-serif'
        }}>{message}</p>
      </div>
    </>
  );
};

export default LoadingSpinner;