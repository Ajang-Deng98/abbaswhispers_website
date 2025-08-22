import React from 'react';

const MinimalBlog = () => {
  const posts = [
    {
      id: 1,
      title: 'Finding Peace in Psalms',
      excerpt: 'Discover how the ancient words of David can bring comfort to modern hearts.',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Grace in Grief',
      excerpt: 'A journey through loss and the healing power of faith.',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Selah Moments',
      excerpt: 'Pausing to reflect on God\'s goodness in our daily lives.',
      date: '2024-01-05'
    }
  ];

  return (
    <div>
      <section style={{
        background: 'linear-gradient(135deg, #2C3E50 0%, #9CAF88 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Blog</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Inspirational writings and reflections on faith, healing, and spiritual growth
        </p>
      </section>

      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {posts.map(post => (
              <div key={post.id} style={{
                background: '#F5F5DC',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #D4AF37'
              }}>
                <h3 style={{ color: '#D4AF37', marginBottom: '1rem' }}>{post.title}</h3>
                <p style={{ color: '#2C3E50', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {post.excerpt}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  <span>{post.date}</span>
                  <span style={{ color: '#D4AF37', fontWeight: '600' }}>Read More</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalBlog;