import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import { blogAPI, volumeAPI, testimonialAPI } from '../utils/api';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredVolumes, setFeaturedVolumes] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      const postsResponse = await blogAPI.getAllPosts({ limit: 3 });
      const posts = postsResponse.data;
      if (Array.isArray(posts)) {
        setFeaturedPosts(posts);
      } else if (posts?.results && Array.isArray(posts.results)) {
        setFeaturedPosts(posts.results);
      }

      const volumesResponse = await volumeAPI.getAllVolumes({ limit: 3 });
      const volumes = volumesResponse.data;
      if (Array.isArray(volumes)) {
        setFeaturedVolumes(volumes);
      } else if (volumes?.results && Array.isArray(volumes.results)) {
        setFeaturedVolumes(volumes.results);
      }

      const testimonialsResponse = await testimonialAPI.getAllTestimonials({ limit: 3 });
      const testimonialsData = testimonialsResponse.data;
      if (Array.isArray(testimonialsData)) {
        setTestimonials(testimonialsData);
      } else if (testimonialsData?.results && Array.isArray(testimonialsData.results)) {
        setTestimonials(testimonialsData.results);
      }
    } catch (error) {
      console.error('Error loading featured content:', error);
      setFeaturedPosts([]);
      setFeaturedVolumes([]);
      setTestimonials([]);
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
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-badge">Inspirational Poetry & Faith</div>
              <h1>Abba's Whispers</h1>
              <p>My debut poetry series SELAH - a powerful collection of Christian poetry inspired by the Psalms. Journey from grief to grace and discover God's unfailing love through words that speak directly to your soul.</p>
              <div className="hero-actions">
                <Link to="/volumes" className="btn-hero-primary">Explore Collections</Link>
                <Link to="/about" className="btn-hero-secondary">Our Story</Link>
              </div>
            </motion.div>
            
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="stat-card">
                <span className="stat-number">{featuredVolumes.length}</span>
                <span className="stat-label">SELAH Volumes</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{featuredPosts.length}</span>
                <span className="stat-label">Blog Posts</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">Audio</span>
                <span className="stat-label">Included</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="home-quote">
        <div className="container">
          <motion.div
            className="quote-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <blockquote>
              "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul."
            </blockquote>
            <cite>- Psalm 23:1-3</cite>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="home-collections">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Featured Collections</h2>
            <p>Discover our most beloved poetry collections</p>
          </motion.div>

          <div className="collections-grid">
            {Array.isArray(featuredVolumes) && featuredVolumes.slice(0, 3).map((volume, index) => (
              <motion.div
                key={volume.id}
                className="collection-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="collection-content">
                  <h3>{volume.title}</h3>
                  <p>{volume.description}</p>
                  <Link to="/volumes" className="collection-link">Read Collection</Link>
                </div>
              </motion.div>
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
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Latest Inspirations</h2>
            <p>Fresh insights and reflections from our recent writings</p>
          </motion.div>

          <div className="blog-grid">
            {Array.isArray(featuredPosts) && featuredPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {post.image && (
                  <div className="blog-image" style={{ height: '200px', overflow: 'hidden', borderRadius: '8px 8px 0 0', marginBottom: '1rem' }}>
                    <img 
                      src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      onError={(e) => e.target.parentElement.style.display = 'none'}
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
              </motion.div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/blog" className="btn-section">View All Posts</Link>
          </div>
        </div>
      </section>





      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="home-testimonials">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Voices of Transformation</h2>
              <p>Stories from our community of faith and healing</p>
            </motion.div>

            <div className="testimonials-grid">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="testimonial-content">
                    <div className="quote-mark">"</div>
                    <p>{testimonial.quote}</p>
                    <div className="testimonial-author">
                      <strong>{testimonial.author_name}</strong>
                      {testimonial.author_role && <span>{testimonial.author_role}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="home-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;