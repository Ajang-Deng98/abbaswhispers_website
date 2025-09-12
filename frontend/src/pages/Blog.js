import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set fallback data immediately
    const fallbackPosts = [
      {
        id: 1,
        title: "Finding Peace in the Psalms",
        excerpt: "Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties.",
        category: "peace",
        created_at: "2024-01-15"
      },
      {
        id: 2,
        title: "Gratitude in Every Season",
        excerpt: "Learning to cultivate a heart of thanksgiving through life's ups and downs, inspired by Psalm 23.",
        category: "gratitude",
        created_at: "2024-01-10"
      },
      {
        id: 3,
        title: "Strength for the Journey",
        excerpt: "How God's promises in the Psalms provide strength and courage for life's difficult moments.",
        category: "strength",
        created_at: "2024-01-05"
      },
      {
        id: 4,
        title: "Walking in His Faithfulness",
        excerpt: "Exploring the unwavering faithfulness of God through the lens of the Psalms and personal testimony.",
        category: "faithfulness",
        created_at: "2024-01-01"
      }
    ];
    
    setPosts(fallbackPosts);
    setLoading(false);
  }, []);

  const categories = ['all', 'peace', 'gratitude', 'strength', 'faithfulness', 'worship', 'guidance'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '1rem' }}>
          Abba's Whispers Blog
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Dive deeper into the wisdom of the Psalms with reflections and insights
        </p>
      </div>
      
      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            minWidth: '200px'
          }}
        />
        
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredPosts.map((post) => (
          <div key={post.id} style={{ 
            border: '1px solid #ddd', 
            padding: '1.5rem', 
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>{post.title}</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{post.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#999' }}>{post.created_at}</span>
              <Link 
                to={`/blog/${post.id}`}
                style={{ 
                  background: '#d4af37', 
                  color: 'white', 
                  padding: '8px 16px', 
                  textDecoration: 'none',
                  borderRadius: '5px'
                }}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;