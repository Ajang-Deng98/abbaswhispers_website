import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

console.log('Starting React app...');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log('Root created successfully');
  
  root.render(
    <React.StrictMode>
      <App />
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