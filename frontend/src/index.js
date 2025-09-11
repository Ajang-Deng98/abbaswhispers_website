import React from 'react';
import ReactDOM from 'react-dom/client';

function MinimalApp() {
  return React.createElement('div', { style: { padding: '2rem', fontFamily: 'Arial' } }, [
    React.createElement('h1', { key: 'title', style: { color: '#d4af37' } }, 'Abbaswhispers'),
    React.createElement('h2', { key: 'subtitle' }, 'SELAH Poetry Collection'),
    React.createElement('div', { key: 'content', style: { margin: '2rem 0' } }, [
      React.createElement('h3', { key: 'vol1' }, 'Volume 1: Thanksgiving'),
      React.createElement('p', { key: 'desc1' }, 'A collection of poems celebrating gratitude and God\'s faithfulness.'),
      React.createElement('div', { key: 'poem1', style: { background: '#f9f9f9', padding: '1rem', margin: '1rem 0', fontStyle: 'italic' } }, [
        'In every breath I take today,', React.createElement('br', { key: 'br1' }),
        'I find a reason to give praise.', React.createElement('br', { key: 'br2' }),
        'For morning light that breaks the dawn,', React.createElement('br', { key: 'br3' }),
        'For strength to face what lies beyond.', React.createElement('br', { key: 'br4' }),
        React.createElement('br', { key: 'br5' }),
        'Selah - pause and reflect'
      ])
    ]),
    React.createElement('div', { key: 'nav', style: { margin: '2rem 0' } }, [
      React.createElement('a', { key: 'home', href: '/', style: { margin: '0 1rem', color: '#d4af37' } }, 'Home'),
      React.createElement('a', { key: 'about', href: '/about', style: { margin: '0 1rem', color: '#d4af37' } }, 'About'),
      React.createElement('a', { key: 'contact', href: '/contact', style: { margin: '0 1rem', color: '#d4af37' } }, 'Contact')
    ])
  ]);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(MinimalApp));