import React from 'react';

function Blog() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '2rem' }}>
        Abba's Whispers Blog
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>Finding Peace in the Psalms</h3>
          <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
            Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties. 
            When David wrote "The Lord is my shepherd," he was declaring a truth that transcends time.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#999' }}>December 15, 2024</span>
            <span style={{
              background: '#d4af37',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              Read More
            </span>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>Gratitude in Every Season</h3>
          <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
            Learning to cultivate a heart of thanksgiving through life's ups and downs, inspired by Psalm 23. 
            Even in difficult seasons, we can find reasons to praise.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#999' }}>December 10, 2024</span>
            <span style={{
              background: '#d4af37',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              Read More
            </span>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>Strength for the Journey</h3>
          <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
            How God's promises in the Psalms provide strength and courage for life's difficult moments. 
            His strength is made perfect in our weakness.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#999' }}>December 5, 2024</span>
            <span style={{
              background: '#d4af37',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              Read More
            </span>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>Walking in His Faithfulness</h3>
          <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
            Exploring the unwavering faithfulness of God through the lens of the Psalms and personal testimony. 
            His promises never fail.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#999' }}>November 30, 2024</span>
            <span style={{
              background: '#d4af37',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              Read More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;