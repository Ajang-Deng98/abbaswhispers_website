import React, { useState } from 'react';

const SimpleVolumes = () => {
  const [selectedVolume, setSelectedVolume] = useState(null);

  const volumes = [
    {
      id: 1,
      title: "SELAH - Volume 1: Thanksgiving",
      description: "A collection of poems celebrating gratitude and God's faithfulness in our lives.",
      category: "thanksgiving",
      content: "In every breath I take today,\nI find a reason to give praise.\nFor morning light that breaks the dawn,\nFor strength to face what lies beyond.\n\nSelah - pause and reflect\n\nYour faithfulness, O Lord, endures,\nThrough every storm, Your love ensures\nThat I am held, that I am known,\nNever walking this path alone."
    },
    {
      id: 2,
      title: "SELAH - Volume 2: Wonder",
      description: "Poems that capture the awe and wonder of God's creation and love.",
      category: "wonder",
      content: "I stand beneath the starlit sky,\nAnd wonder at Your majesty.\nEach twinkling light, a testament\nTo power beyond what I can see.\n\nSelah - pause and reflect\n\nHow can it be that You who made\nThe galaxies with just Your word,\nWould bend Your ear to hear my prayer,\nAnd call me precious, call me heard?"
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>SELAH Poetry Series</h1>
      <p>Premium collection of inspirational poems</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        {volumes.map((volume) => (
          <div key={volume.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>{volume.title}</h3>
            <p>{volume.description}</p>
            <button 
              onClick={() => setSelectedVolume(volume)}
              style={{ 
                background: '#d4af37', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Read Poem
            </button>
          </div>
        ))}
      </div>

      {selectedVolume && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <button 
              onClick={() => setSelectedVolume(null)}
              style={{ float: 'right', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
            >
              ×
            </button>
            <h2>{selectedVolume.title}</h2>
            <pre style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{selectedVolume.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleVolumes;