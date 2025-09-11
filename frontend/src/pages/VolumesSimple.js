import React from 'react';

const VolumesSimple = () => {
  const volumes = [
    {
      id: 1,
      title: "SELAH - Volume 1: Thanksgiving",
      description: "A collection of poems celebrating gratitude and God's faithfulness in our lives.",
      content: "In every breath I take today,\nI find a reason to give praise.\nFor morning light that breaks the dawn,\nFor strength to face what lies beyond.\n\nSelah - pause and reflect\n\nYour faithfulness, O Lord, endures,\nThrough every storm, Your love ensures\nThat I am held, that I am known,\nNever walking this path alone."
    },
    {
      id: 2,
      title: "SELAH - Volume 2: Wonder",
      description: "Poems that capture the awe and wonder of God's creation and love.",
      content: "I stand beneath the starlit sky,\nAnd wonder at Your majesty.\nEach twinkling light, a testament\nTo power beyond what I can see.\n\nSelah - pause and reflect\n\nHow can it be that You who made\nThe galaxies with just Your word,\nWould bend Your ear to hear my prayer,\nAnd call me precious, call me heard?"
    },
    {
      id: 3,
      title: "SELAH - Volume 3: Faith",
      description: "Reflections on faith, trust, and walking with God through life's journey.",
      content: "When shadows fall and doubts arise,\nAnd faith feels fragile in my chest,\nI choose to trust what I cannot see,\nTo find in You my place of rest.\n\nSelah - pause and reflect\n\nFor faith is not the absence of fear,\nBut courage to believe You're near.\nIn every valley, every height,\nYou are my anchor, You are my light."
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#d4af37' }}>
        SELAH Poetry Collection
      </h1>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        {volumes.map(volume => (
          <div key={volume.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '2rem',
            backgroundColor: '#fff'
          }}>
            <h2 style={{ color: '#d4af37', marginBottom: '1rem' }}>
              {volume.title}
            </h2>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
              {volume.description}
            </p>
            <div style={{
              backgroundColor: '#f9f9f9',
              padding: '1.5rem',
              borderRadius: '4px',
              whiteSpace: 'pre-line',
              fontStyle: 'italic',
              lineHeight: '1.6'
            }}>
              {volume.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolumesSimple;