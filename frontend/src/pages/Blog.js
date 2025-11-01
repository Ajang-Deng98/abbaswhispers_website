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
      <section style={{
        background: 'url("/backgroundimage5.JPG") center/cover no-repeat',
        padding: '180px 2rem 120px 2rem',
        textAlign: 'center',
        color: '#ffffff',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'normal',
              marginBottom: '1.5rem',
              color: '#000000',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>Writings</h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              fontWeight: 'normal',
              marginBottom: '0',
              color: '#8B4513',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>Reflections on the sacred journey through grief and grace, and the whispers that heal.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '5rem 2rem 5rem 2rem'
      }}>
        
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '5rem',
            borderBottom: '1px solid #e8e8e8',
            paddingBottom: '3rem'
          }}
        >
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    fontFamily: 'Georgia, serif',
                    padding: '0',
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    border: 'none',
                    background: 'none',
                    color: selectedCategory === category.value ? '#2c2c2c' : '#999999',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    borderBottom: selectedCategory === category.value ? '1px solid #2c2c2c' : 'none'
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search writings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontFamily: 'Georgia, serif',
                padding: '0.5rem 0',
                border: 'none',
                borderBottom: '1px solid #e8e8e8',
                width: '250px',
                fontSize: '1rem',
                outline: 'none',
                background: 'transparent',
                fontWeight: 'normal'
              }}
            />
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
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
              }}>
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      borderBottom: index < currentPosts.length - 1 ? '1px solid #f0f0f0' : 'none',
                      padding: '3rem 0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      maxWidth: '700px'
                    }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: '#999999',
                        marginBottom: '1rem',
                        fontFamily: 'Georgia, serif',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}>
                        {new Date(post.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      
                      <h2 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.2rem',
                        fontWeight: 'normal',
                        marginBottom: '0.8rem',
                        lineHeight: '1.2',
                        color: '#2c2c2c',
                        letterSpacing: '-0.01em'
                      }}>
                        <Link to={`/blog/${post.id}`} style={{
                          color: 'inherit',
                          textDecoration: 'none'
                        }}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.9rem',
                        lineHeight: '1.7',
                        color: '#666666',
                        marginBottom: '1.2rem',
                        fontWeight: 'normal'
                      }}>
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        to={`/blog/${post.id}`}
                        style={{
                          fontFamily: 'Georgia, serif',
                          color: '#8b7355',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 'normal',
                          borderBottom: '1px solid #8b7355',
                          paddingBottom: '2px'
                        }}
                      >
                        Continue reading
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 0',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.8rem',
                  fontWeight: 'normal',
                  marginBottom: '1.5rem',
                  color: '#2c2c2c'
                }}>Coming Soon</h3>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#666666',
                  marginBottom: '2rem'
                }}>We're preparing thoughtful reflections for you. Each piece is crafted with care and intention, waiting for the right moment to be shared.</p>
                <Link 
                  to="/contact"
                  style={{
                    fontFamily: 'Georgia, serif',
                    padding: '1rem 2rem',
                    border: '1px solid #8b7355',
                    background: 'transparent',
                    color: '#8b7355',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#8b7355';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#8b7355';
                  }}
                >
                  Stay Connected
                </Link>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '3rem',
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  fontFamily: 'Georgia, serif',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  border: 'none',
                  background: 'none',
                  color: currentPage === page ? '#2c2c2c' : '#999999',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  borderBottom: currentPage === page ? '1px solid #2c2c2c' : 'none'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>



      {/* Subscribe Section */}
      <section style={{ padding: '5rem 2rem', background: '#f8f9fa', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.8rem',
            fontWeight: 'normal',
            color: '#2c2c2c',
            marginBottom: '1.5rem'
          }}>Stay Connected</h3>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#666666',
            marginBottom: '2.5rem'
          }}>
            Receive new reflections and gentle reminders that you are held in love. 
            No spam, just thoughtful words delivered to your inbox.
          </p>
          <div style={{
            display: 'flex',
            gap: '10px',
            maxWidth: '400px',
            margin: '0 auto',
            flexDirection: window.innerWidth <= 480 ? 'column' : 'row'
          }}>
            <input 
              type="email" 
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
                fontFamily: 'Georgia, serif',
                fontSize: '1rem'
              }}
            />
            <button style={{
              padding: '12px 24px',
              background: '#8b7355',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;