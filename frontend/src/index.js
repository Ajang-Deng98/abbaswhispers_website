import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

console.log('Starting React app...');

// Test if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 2rem; color: red;">Root element #root not found!</div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('Root created successfully');
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    document.body.innerHTML = `
      <div style="padding: 2rem; color: red; font-family: Arial;">
        <h1>Error Loading Website</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p>Check browser console for more details.</p>
      </div>
    `;
  }
}