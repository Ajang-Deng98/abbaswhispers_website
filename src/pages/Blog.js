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
      console.log('Loading posts with params:', {
        search: searchTerm,
        category: selectedCategory,
        page: currentPage,
        limit: postsPerPage
      });
      const response = await blogAPI.getAllPosts({
        search: searchTerm,
        category: selectedCategory,
        page: currentPage,
        limit: postsPerPage
      });
      console.log('API response:', response);
      console.log('Posts data:', response.data);
      setPosts(response.data || []);
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

      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Inspirational Blog</h1>
            <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Dive deeper into the wisdom of the Psalms with reflections, insights, 
              and practical applications for modern Christian living.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            style={{ margin: '3rem 0' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '14px 20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '25px',
                  width: '100%',
                  maxWidth: '400px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fafafa'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-gold)';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
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
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      borderRadius: '20px',
                      border: selectedCategory === category.value ? 'none' : '1px solid var(--primary-gold)',
                      background: selectedCategory === category.value ? 'var(--primary-gold)' : 'transparent',
                      color: selectedCategory === category.value ? 'white' : 'var(--primary-gold)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.value) {
                        e.target.style.background = 'var(--primary-gold)';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.value) {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--primary-gold)';
                      }
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  padding: '1.5rem',
                  minHeight: '450px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {post.image && (
                  <img 
                    src={post.image.startsWith('http') ? post.image : `http://localhost:5003${post.image}`} 
                    alt={post.title}
                    style={{ 
                      width: '100%', 
                      height: '180px', 
                      objectFit: 'cover', 
                      borderRadius: '10px', 
                      marginBottom: '1rem' 
                    }}
                    onError={(e) => {
                      console.log('Image failed to load:', post.image);
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
                  lineHeight: '1.4'
                }}>
                  <Link to={`/blog/${post.id}`} style={{ 
                    color: 'var(--text-dark)',
                    textDecoration: 'none'
                  }}>
                    {post.title}
                  </Link>
                </h3>
                
                <p style={{ 
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--text-medium)',
                  marginBottom: 'auto',
                  flex: 1
                }}>{post.excerpt}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '1.5rem',
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
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, var(--primary-gold) 0%, var(--warm-gold) 100%)',
                      border: 'none',
                      color: 'white',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 3px 10px rgba(212, 175, 55, 0.3)',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 3px 10px rgba(212, 175, 55, 0.3)';
                    }}
                  >
                    Read More
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="text-center"
              style={{ marginTop: '3rem' }}
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
                      padding: '10px 15px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '8px',
                      border: currentPage === page ? 'none' : '1px solid var(--primary-gold)',
                      background: currentPage === page ? 'var(--primary-gold)' : 'transparent',
                      color: currentPage === page ? 'white' : 'var(--primary-gold)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.target.style.background = 'var(--primary-gold)';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--primary-gold)';
                      }
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
              className="text-center"
              style={{ marginTop: '3rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>No posts found matching your search criteria. Please try different keywords or categories.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;