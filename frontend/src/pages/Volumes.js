import React from 'react';

function Volumes() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '2rem' }}>
        SELAH Poetry Collection
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>SELAH - Volume 1: Thanksgiving</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>A collection of poems celebrating gratitude and God's faithfulness in our lives.</p>
          <div style={{
            background: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            fontStyle: 'italic',
            whiteSpace: 'pre-line'
          }}>
            {`In every breath I take today,
I find a reason to give praise.
For morning light that breaks the dawn,
For strength to face what lies beyond.

Selah - pause and reflect

Your faithfulness, O Lord, endures,
Through every storm, Your love ensures
That I am held, that I am known,
Never walking this path alone.`}
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>SELAH - Volume 2: Wonder</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Poems that capture the awe and wonder of God's creation and love.</p>
          <div style={{
            background: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            fontStyle: 'italic',
            whiteSpace: 'pre-line'
          }}>
            {`I stand beneath the starlit sky,
And wonder at Your majesty.
Each twinkling light, a testament
To power beyond what I can see.

Selah - pause and reflect

How can it be that You who made
The galaxies with just Your word,
Would bend Your ear to hear my prayer,
And call me precious, call me heard?`}
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>SELAH - Volume 3: Faith</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Reflections on faith, trust, and walking with God through life's journey.</p>
          <div style={{
            background: '#f9f9f9',
            padding: '1rem',
            borderRadius: '8px',
            fontStyle: 'italic',
            whiteSpace: 'pre-line'
          }}>
            {`When shadows fall and doubts arise,
And faith feels fragile in my chest,
I choose to trust what I cannot see,
To find in You my place of rest.

Selah - pause and reflect

For faith is not the absence of fear,
But courage to believe You're near.
In every valley, every height,
You are my anchor, You are my light.`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volumes;