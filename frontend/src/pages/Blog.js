import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { blogAPI } from '../utils/api';
import { useRealTimeData } from '../hooks/useRealTimeData';
import LoadingSpinner from '../components/LoadingSpinner';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  const loadPosts = useCallback(async () => {
    setLoading(true);
    
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== 'all') params.category = selectedCategory;
      
      const response = await blogAPI.getAllPosts(params);
      
      if (response && response.data) {
        const postsData = Array.isArray(response.data) ? response.data : response.data.results || [];
        setPosts(postsData);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useRealTimeData(loadPosts, [searchTerm, selectedCategory], 30000);

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'peace', label: 'Peace' },
    { value: 'gratitude', label: 'Gratitude' },
    { value: 'strength', label: 'Strength' },
    { value: 'worship', label: 'Worship' },
    { value: 'faithfulness', label: 'Faithfulness' },
    { value: 'guidance', label: 'Guidance' }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.tags && (typeof post.tags === 'string' ? post.tags : post.tags.join(',')).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* Hero Section */}
      <section className="blog-hero" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&w=2000&q=80") center/cover no-repeat',
        padding: '150px 0 5rem 0',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '1rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em'
            }}>Reflections & Insights</h1>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: '300',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>Thoughtful reflections and spiritual insights for daily living.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '3rem',
            textAlign: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Search reflections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              fontFamily: 'Inter, sans-serif',
              padding: '12px 20px',
              border: '1px solid #eeeeee',
              width: '100%',
              maxWidth: '400px',
              fontSize: '0.9rem',
              outline: 'none',
              marginBottom: '2rem',
              transition: 'border-color 0.3s ease',
              borderRadius: '0'
            }}
          />
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setCurrentPage(1);
                }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  padding: '8px 20px',
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  border: selectedCategory === category.value ? 'none' : '1px solid var(--text-primary)',
                  background: selectedCategory === category.value ? 'var(--text-primary)' : 'transparent',
                  color: selectedCategory === category.value ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.3px'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts */}
        {loading ? (
          <LoadingSpinner message="Loading reflections..." />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {currentPosts.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem'
              }}>
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      background: '#ffffff',
                      border: 'none',
                      borderBottom: '1px solid #eeeeee',
                      padding: '2rem 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      borderRadius: '0'
                    }}
                    whileHover={{ borderBottomColor: '#000000' }}
                  >
                    {post.image && (
                      <img 
                        src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`} 
                        alt={post.title}
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover', 
                          marginBottom: '1.5rem'
                        }}
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-light)',
                      marginBottom: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '0.5px'
                    }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    
                    <h3 style={{
                      fontFamily: 'Crimson Pro, serif',
                      fontSize: '1.5rem',
                      fontWeight: '400',
                      marginBottom: '1rem',
                      lineHeight: '1.3',
                      color: 'var(--text-primary)'
                    }}>
                      <Link to={`/blog/${post.id}`} style={{
                        color: 'inherit',
                        textDecoration: 'none'
                      }}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p style={{
                      fontFamily: 'Crimson Pro, serif',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      color: 'var(--text-secondary)',
                      marginBottom: '1.5rem',
                      fontWeight: '300'
                    }}>
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${post.id}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--accent-gold)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        letterSpacing: '0.5px',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--accent-gold)'}
                      onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                    >
                      READ MORE
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--text-secondary)'
              }}>
                <h3 style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)'
                }}>Coming Soon</h3>
                <p style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  maxWidth: '500px',
                  margin: '0 auto 2rem'
                }}>We're preparing thoughtful reflections for you. Subscribe to be notified when new posts are published.</p>
                <Link 
                  to="/contact"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    display: 'inline-block',
                    padding: '12px 24px',
                    border: '1px solid var(--text-primary)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--text-primary)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text-primary)';
                  }}
                >
                  SUBSCRIBE FOR UPDATES
                </Link>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '3rem'
          }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  border: currentPage === page ? 'none' : '1px solid var(--text-primary)',
                  background: currentPage === page ? 'var(--text-primary)' : 'transparent',
                  color: currentPage === page ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;