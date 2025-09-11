import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Static data - loads immediately
    const staticPosts = [
      {
        id: 1,
        title: "Finding Peace in the Psalms",
        excerpt: "Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties.",
        category: "peace",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: "Gratitude in Every Season",
        excerpt: "Learning to cultivate a heart of thanksgiving through life's ups and downs, inspired by Psalm 23.",
        category: "gratitude",
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: "Strength for the Journey",
        excerpt: "How God's promises in the Psalms provide strength and courage for life's difficult moments.",
        category: "strength",
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        title: "Walking in His Faithfulness",
        excerpt: "Exploring the unwavering faithfulness of God through the lens of the Psalms and personal testimony.",
        category: "faithfulness",
        created_at: new Date().toISOString()
      }
    ];
    setPosts(staticPosts);
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - Abba Whispers</title>
      </Helmet>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#d4af37', marginBottom: '2rem' }}>
          Abba's Whispers Blog
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              <h3 style={{ color: '#d4af37', marginBottom: '1rem' }}>{post.title}</h3>
              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#999' }}>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <Link 
                  to={`/blog/${post.id}`}
                  style={{
                    background: '#d4af37',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;