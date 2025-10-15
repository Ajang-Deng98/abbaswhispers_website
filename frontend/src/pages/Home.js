import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { blogAPI, volumeAPI } from '../utils/api';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([
    {
      id: 1,
      title: "Finding Peace in Psalm 23",
      excerpt: "Discover the profound comfort and guidance found in the shepherd's psalm.",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "The Power of Gratitude",
      excerpt: "Learn how thanksgiving transforms our hearts and minds.",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Walking in Faith",
      excerpt: "Steps to strengthen your spiritual journey through daily practice.",
      created_at: new Date().toISOString()
    }
  ]);
  const [featuredVolumes, setFeaturedVolumes] = useState([
    {
      id: 1,
      title: "Whispers of Hope",
      description: "A collection of healing meditations inspired by Psalms of comfort and restoration."
    },
    {
      id: 2,
      title: "Songs of Strength",
      description: "Empowering writings drawn from Psalms of courage and divine strength."
    },
    {
      id: 3,
      title: "Prayers of Peace",
      description: "Gentle reflections on finding tranquility in God's presence."
    }
  ]);

  const loadFeaturedContent = async () => {
    try {
      const [postsResponse, volumesResponse] = await Promise.all([
        blogAPI.getAllPosts({ limit: 3 }),
        volumeAPI.getAllVolumes({ limit: 3 })
      ]);
      
      // Handle posts
      const posts = postsResponse.data;
      if (Array.isArray(posts) && posts.length > 0) {
        setFeaturedPosts(posts.slice(0, 3));
      } else if (posts?.results && Array.isArray(posts.results) && posts.results.length > 0) {
        setFeaturedPosts(posts.results.slice(0, 3));
      }

      // Handle volumes
      const volumes = volumesResponse.data;
      if (Array.isArray(volumes) && volumes.length > 0) {
        setFeaturedVolumes(volumes.slice(0, 3));
      } else if (volumes?.results && Array.isArray(volumes.results) && volumes.results.length > 0) {
        setFeaturedVolumes(volumes.results.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading featured content:', error);
      // Keep fallback data on error
    }
  };

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  return (
    <>
      <Helmet>
        <title>Abbaswhispers - Healing Through Faith | Christian Inspirational Writings</title>
        <meta name="description" content="Find healing and empowerment through Christian writings inspired by the Book of Psalms. Join our community of faith and discover peace through God's word." />
        <meta name="keywords" content="Christian faith, Psalms, healing, inspiration, spiritual growth, Bible study" />
      </Helmet>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">

              <h1 style={{
                fontFamily: 'Crimson Pro, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '400',
                marginBottom: '1rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}>Abba's Whispers</h1>
              <p style={{
                fontFamily: 'Crimson Pro, serif',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: '300',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                lineHeight: '1.6',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>Poetry inspired by the Psalms. A journey from grief to grace through words that speak to the soul.</p>
              <div className="hero-actions">
                <Link to="/volumes" style={{
                  fontFamily: 'Inter, sans-serif',
                  display: 'inline-block',
                  padding: '12px 24px',
                  border: '1px solid white',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  marginRight: '1rem',
                  transition: 'all 0.3s ease'
                }}>EXPLORE COLLECTIONS</Link>
                <Link to="/about" style={{
                  fontFamily: 'Inter, sans-serif',
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  border: '1px solid rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease'
                }}>OUR STORY</Link>
              </div>
            </div>
            

          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="home-collections">
        <div className="container">
          <div className="section-header">
            <h2 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '2rem',
              fontWeight: '400',
              marginBottom: '1rem',
              color: '#000000',
              letterSpacing: '-0.02em'
            }}>Featured Collections</h2>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '1rem',
              fontWeight: '300',
              color: '#666666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Discover our most beloved poetry collections</p>
          </div>

          <div className="collections-grid">
            {featuredVolumes.slice(0, 3).map((volume) => (
              <div key={volume.id} className="collection-card">
                <div className="collection-content">
                  <h3>{volume.title}</h3>
                  <p>{volume.description}</p>
                  <Link to="/volumes" className="collection-link">Read Collection</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/volumes" className="btn-section">View All Collections</Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="home-blog">
        <div className="container">
          <div className="section-header">
            <h2 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '2rem',
              fontWeight: '400',
              marginBottom: '1rem',
              color: '#000000',
              letterSpacing: '-0.02em'
            }}>Latest Inspirations</h2>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '1rem',
              fontWeight: '300',
              color: '#666666',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Fresh insights and reflections from our recent writings</p>
          </div>

          <div className="blog-grid">
            {featuredPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="blog-card">
                {post.image && (
                  <div className="blog-image" style={{ height: '200px', overflow: 'hidden', borderRadius: '8px 8px 0 0', marginBottom: '1rem' }}>
                    <img 
                      src={post.image.startsWith('http') ? post.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}${post.image}`}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.style.cssText = 'width: 100%; height: 200px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); display: flex; align-items: center; justify-content: center; color: #6b7280; font-size: 14px; border-radius: 8px;';
                        fallback.textContent = 'Image not available';
                        e.target.parentElement.appendChild(fallback);
                      }}
                    />
                  </div>
                )}
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-date">{new Date(post.created_at).toLocaleDateString()}</span>
                    <Link to={`/blog/${post.id}`} className="blog-link">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/blog" className="btn-section">View All Posts</Link>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="home-quote">
        <div className="container">
          <div className="quote-content">
            <blockquote>
              "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul."
            </blockquote>
            <cite>- Psalm 23:1-3</cite>
          </div>
        </div>
      </section>









      {/* Call to Action */}
      <section className="home-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community of Faith</h2>
            <p>Subscribe to our newsletter for weekly inspirations and be part of a community dedicated to spiritual growth and healing.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-cta-primary">Get In Touch</Link>
              <Link to="/prayer-request" className="btn-cta-secondary">Submit Prayer Request</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;