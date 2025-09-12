import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SimpleBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const posts = [
    {
      id: 1,
      title: "Finding Peace in the Psalms",
      excerpt: "Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties.",
      category: "peace",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Gratitude in Every Season",
      excerpt: "Learning to cultivate a heart of thanksgiving through life's ups and downs, inspired by Psalm 23.",
      category: "gratitude",
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "Strength for the Journey",
      excerpt: "How God's promises in the Psalms provide strength and courage for life's difficult moments.",
      category: "strength",
      date: "2024-01-05"
    }
  ];

  const categories = ['all', 'peace', 'gratitude', 'strength', 'worship', 'faithfulness'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Abba's Whispers Blog</h1>
      <p>Dive deeper into the wisdom of the Psalms with reflections and insights.</p>
      
      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>{post.title}</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{post.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#999' }}>{post.date}</span>
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

export default SimpleBlog;