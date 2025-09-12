import React, { useState, useEffect } from 'react';

const Volumes = () => {
  const [volumes, setVolumes] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set fallback data immediately
    const fallbackVolumes = [
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
      },
      {
        id: 3,
        title: "SELAH - Volume 3: Faith",
        description: "Reflections on faith, trust, and walking with God through life's journey.",
        category: "faith",
        content: "When shadows fall and doubts arise,\nAnd faith feels fragile in my chest,\nI choose to trust what I cannot see,\nTo find in You my place of rest.\n\nSelah - pause and reflect\n\nFor faith is not the absence of fear,\nBut courage to believe You're near.\nIn every valley, every height,\nYou are my anchor, You are my light."
      }
    ];
    
    setVolumes(fallbackVolumes);
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '1rem' }}>
          SELAH Poetry Series
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Premium collection of inspirational poems
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {volumes.map((volume) => (
          <div key={volume.id} style={{ 
            border: '1px solid #ddd', 
            padding: '1.5rem', 
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>{volume.title}</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>{volume.description}</p>
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

export default Volumes;