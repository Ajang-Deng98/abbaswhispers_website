import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogAPI, volumeAPI } from '../utils/api';

const StableHome = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredVolumes, setFeaturedVolumes] = useState([]);

  useEffect(() => {
    // Set fallback data immediately
    setFeaturedPosts([
      { id: 1, title: 'Finding Peace in Psalms', excerpt: 'Discover how the ancient words of David can bring comfort to modern hearts.', created_at: new Date() },
      { id: 2, title: 'Grace in Grief', excerpt: 'A journey through loss and the healing power of faith.', created_at: new Date() },
      { id: 3, title: 'Selah Moments', excerpt: 'Pausing to reflect on God\'s goodness in our daily lives.', created_at: new Date() }
    ]);
    setFeaturedVolumes([
      { id: 1, title: 'SELAH Volume I', description: 'Poetry born from grief, transformed by grace.' },
      { id: 2, title: 'SELAH Volume II', description: 'Continuing the journey of faith and healing.' },
      { id: 3, title: 'SELAH Volume III', description: 'Finding hope in the darkest valleys.' }
    ]);
    
    // Try to load real data
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      const postsResponse = await blogAPI.getAllPosts({ limit: 3 });
      setFeaturedPosts(postsResponse.data?.posts || postsResponse.data || []);

      const volumesResponse = await volumeAPI.getAllVolumes({ limit: 3 });
      setFeaturedVolumes(volumesResponse.data || []);
    } catch (error) {
      console.error('Error loading featured content:', error);
      // Keep fallback data if API fails
    }
  };

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
              <h1>Welcome to Abbaswhispers</h1>
              <p>Poetry and reflective conversations inspired by faith. The SELAH series - writings born from a journey through grief into grace, inspired by the Psalms.</p>
              <div className="hero-actions">
                <Link to="/volumes" className="btn-hero-primary">Explore Collections</Link>
                <Link to="/about" className="btn-hero-secondary">Our Story</Link>
              </div>
            </div>
            
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-number">3+</span>
                <span className="stat-label">Poetry Collections</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">15+</span>
                <span className="stat-label">Blog Posts</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">Audio</span>
                <span className="stat-label">Narrations</span>
              </div>
            </div>
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

      {/* Featured Collections */}
      <section className="home-collections">
        <div className="container">
          <div className="section-header">
            <h2>Featured Collections</h2>
            <p>Discover our most beloved poetry collections</p>
          </div>

          <div className="collections-grid">
            {featuredVolumes.slice(0, 3).map((volume, index) => (
              <div key={volume.id} className="collection-card">
                <div className="collection-content">
                  <h3>{volume.title}</h3>
                  <p>{volume.description || 'A beautiful collection from the SELAH series exploring themes of faith and healing.'}</p>
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
            <h2>Latest Inspirations</h2>
            <p>Fresh insights and reflections from our recent writings</p>
          </div>

          <div className="blog-grid">
            {featuredPosts.slice(0, 3).map((post, index) => (
              <div key={post.id} className="blog-card">
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || 'Discover insights and reflections on faith, healing, and spiritual growth.'}</p>
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

      {/* Call to Action */}
      <section className="home-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community of Faith</h2>
            <p>Subscribe to our newsletter for weekly inspirations and be part of a community dedicated to spiritual growth and healing.</p>
            <div className="cta-actions">
              <a 
                href="https://abbaswhispers.substack.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-cta-primary"
              >
                Subscribe Newsletter
              </a>
              <Link to="/prayer-request" className="btn-cta-secondary">Submit Prayer Request</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StableHome;