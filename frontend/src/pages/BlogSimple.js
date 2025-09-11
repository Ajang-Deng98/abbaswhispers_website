import React from 'react';

const BlogSimple = () => {
  const posts = [
    {
      id: 1,
      title: "Finding Peace in the Psalms",
      excerpt: "Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties. When David wrote 'The Lord is my shepherd,' he was declaring a truth that transcends time.",
      date: "December 15, 2024"
    },
    {
      id: 2,
      title: "Gratitude in Every Season",
      excerpt: "Learning to cultivate a heart of thanksgiving through life's ups and downs, inspired by Psalm 23. Even in difficult seasons, we can find reasons to praise.",
      date: "December 10, 2024"
    },
    {
      id: 3,
      title: "Strength for the Journey",
      excerpt: "How God's promises in the Psalms provide strength and courage for life's difficult moments. His strength is made perfect in our weakness.",
      date: "December 5, 2024"
    },
    {
      id: 4,
      title: "Walking in His Faithfulness",
      excerpt: "Exploring the unwavering faithfulness of God through the lens of the Psalms and personal testimony.",
      date: "November 30, 2024"
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#d4af37' }}>
        Abba's Whispers Blog
      </h1>
      
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {posts.map(post => (
          <div key={post.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#fff'
          }}>
            <h2 style={{ color: '#d4af37', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
              {post.title}
            </h2>
            <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {post.date}
            </p>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSimple;