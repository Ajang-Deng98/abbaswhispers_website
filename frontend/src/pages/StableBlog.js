import React from 'react';
import { Helmet } from 'react-helmet';

const StableBlog = () => {
  const posts = [
    {
      id: 1,
      title: 'Finding Peace in Psalms',
      excerpt: 'Discover how the ancient words of David can bring comfort to modern hearts in times of trouble and uncertainty.',
      date: '2024-01-15',
      category: 'Peace'
    },
    {
      id: 2,
      title: 'Grace in Grief',
      excerpt: 'A journey through loss and the healing power of faith, exploring how God meets us in our darkest moments.',
      date: '2024-01-10',
      category: 'Healing'
    },
    {
      id: 3,
      title: 'Selah Moments',
      excerpt: 'Pausing to reflect on God\'s goodness in our daily lives and finding sacred moments in ordinary days.',
      date: '2024-01-05',
      category: 'Reflection'
    },
    {
      id: 4,
      title: 'Songs of Deliverance',
      excerpt: 'How the Psalms teach us to cry out to God and trust in His faithful deliverance.',
      date: '2024-01-01',
      category: 'Faith'
    },
    {
      id: 5,
      title: 'Walking Through Valleys',
      excerpt: 'Finding hope and strength when life takes us through difficult seasons and challenging circumstances.',
      date: '2023-12-28',
      category: 'Hope'
    },
    {
      id: 6,
      title: 'Praise in the Storm',
      excerpt: 'Learning to worship God not just in good times, but especially when storms rage around us.',
      date: '2023-12-25',
      category: 'Worship'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Blog - Abbaswhispers</title>
      </Helmet>
      
      <div style={{ minHeight: '100vh' }}>
        {/* Header */}
        <section style={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #9CAF88 100%)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Inspirational Blog</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Dive deeper into the wisdom of the Psalms with reflections, insights, and practical applications for modern Christian living.
          </p>
        </section>

        {/* Blog Posts */}
        <section style={{ padding: '4rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {posts.map(post => (
                <article key={post.id} style={{
                  background: '#F5F5DC',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #D4AF37'
                }}>
                  <div style={{
                    background: '#D4AF37',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {post.category}
                  </div>
                  
                  <h3 style={{ 
                    color: '#2C3E50', 
                    marginBottom: '1rem',
                    fontSize: '1.2rem'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#2C3E50', 
                    marginBottom: '1.5rem', 
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
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
                    <span style={{ 
                      color: '#D4AF37', 
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Read More →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          background: '#9CAF88',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Stay Connected</h2>
          <p style={{ marginBottom: '2rem', opacity: '0.9' }}>
            Subscribe to our newsletter for weekly inspirations and updates on new content.
          </p>
          <button style={{
            background: 'white',
            color: '#9CAF88',
            padding: '1rem 2rem',
            borderRadius: '30px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Subscribe Now
          </button>
        </section>
      </div>
    </>
  );
};

export default StableBlog;