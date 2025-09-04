import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { blogAPI } from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    loadPosts();
  }, [searchTerm, selectedCategory, currentPage]);

  const loadPosts = async () => {
    try {
      const response = await blogAPI.getAllPosts({
        search: searchTerm,
        category: selectedCategory,
        page: currentPage,
        limit: postsPerPage
      });
      if (response.data) {
        setPosts(Array.isArray(response.data) ? response.data : response.data.results || []);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'peace', label: 'Peace' },
    { value: 'gratitude', label: 'Gratitude' },
    { value: 'strength', label: 'Strength' },
    { value: 'worship', label: 'Worship' },
    { value: 'faithfulness', label: 'Faithfulness' },
    { value: 'guidance', label: 'Guidance' }
  ];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.tags && (typeof post.tags === 'string' ? post.tags : post.tags.join(',')).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>Blog - Abba Whispers | Christian Inspiration and Psalm Reflections</title>
        <meta name="description" content="Read our latest blog posts featuring Christian inspiration, psalm reflections, and spiritual insights for daily living and faith growth." />
      </Helmet>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 2rem',
        background: 'rgba(255, 255, 255, 0.8)',
        minHeight: '100vh',
        fontFamily: 'Space Grotesk, sans-serif'
      }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            padding: '2rem 0 1rem 0',
            borderBottom: '2px solid var(--primary-gold)'
          }}
        >

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            color: '#000',
            marginBottom: '0.5rem'
          }}>Abba's Whispers</h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Dive deeper into the wisdom of the Psalms with reflections and insights.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        >

          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '12px 20px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '25px',
                width: '100%',
                maxWidth: '400px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '20px',
                    border: selectedCategory === category.value ? 'none' : '1px solid var(--primary-gold)',
                    background: selectedCategory === category.value ? 'var(--primary-gold)' : 'white',
                    color: selectedCategory === category.value ? 'white' : 'var(--primary-gold)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginBottom: '2rem'
          }}
        >

          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {post.image && (
                  <img 
                    src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`} 
                    alt={post.title}
                    style={{ 
                      width: '100%', 
                      height: '180px', 
                      objectFit: 'cover', 
                      borderRadius: '10px', 
                      marginBottom: '1rem' 
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                
                {post.tags && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {(typeof post.tags === 'string' ? post.tags.split(',') : post.tags).slice(0, 2).map(tag => (
                      <span 
                        key={tag}
                        style={{
                          background: 'rgba(212, 175, 55, 0.1)',
                          color: 'var(--primary-gold)',
                          padding: '4px 10px',
                          borderRadius: '15px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4',
                  fontWeight: '600'
                }}>
                  <Link to={`/blog/${post.id}`} style={{
                    color: 'var(--text-dark)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>
                    {post.title}
                  </Link>
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--text-medium)',
                  marginBottom: 'auto',
                  flex: 1
                }}>{post.excerpt}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(212, 175, 55, 0.1)'
                }}>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-light)'
                  }}>
                    <div>{new Date(post.created_at).toLocaleDateString()}</div>
                    <div>Category: {post.category}</div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '20px',
                      background: 'var(--primary-gold)',
                      border: 'none',
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                  >
                    Read More
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              padding: '1rem'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    minWidth: '40px',
                    padding: '8px 12px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: '8px',
                    border: currentPage === page ? 'none' : '1px solid var(--primary-gold)',
                    background: currentPage === page ? 'var(--primary-gold)' : 'white',
                    color: currentPage === page ? 'white' : 'var(--primary-gold)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        {filteredPosts.length === 0 && (
          <motion.div
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              padding: '2rem'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>No Articles Found</h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-medium)' }}>
              No posts found. Try different keywords or categories.
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Blog;