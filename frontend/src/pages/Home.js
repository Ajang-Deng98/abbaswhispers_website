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
    // Set fallback data immediately
    const fallbackPosts = [
      {
        id: 1,
        title: "Finding Peace in the Psalms",
        excerpt: "Discover how the ancient words of the Psalms can bring peace to our modern struggles.",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: "Gratitude in Every Season",
        excerpt: "Learning to cultivate a heart of thanksgiving through life's ups and downs.",
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: "Strength for the Journey",
        excerpt: "How God's promises provide strength and courage for life's difficult moments.",
        created_at: new Date().toISOString()
      }
    ];
    
    const fallbackVolumes = [
      {
        id: 1,
        title: "SELAH - Volume 1: Thanksgiving",
        description: "A collection of poems celebrating gratitude and God's faithfulness."
      },
      {
        id: 2,
        title: "SELAH - Volume 2: Wonder",
        description: "Poems that capture the awe and wonder of God's creation and love."
      },
      {
        id: 3,
        title: "SELAH - Volume 3: Faith",
        description: "Reflections on faith, trust, and walking with God through life's journey."
      }
    ];
    
    const fallbackTestimonials = [
      {
        id: 1,
        author_name: "Sarah M.",
        author_role: "Mother of Three",
        quote: "The SELAH series has been a source of comfort during my darkest moments. These poems speak directly to the heart."
      },
      {
        id: 2,
        author_name: "David K.",
        author_role: "Pastor",
        quote: "Uzo's poetry captures the essence of the Psalms in a contemporary voice. I often share these with my congregation."
      },
      {
        id: 3,
        author_name: "Maria L.",
        author_role: "Grief Counselor",
        quote: "These poems offer hope and healing. The SELAH moments provide space for reflection and peace."
      }
    ];
    
    // Set fallback data first
    setFeaturedPosts(fallbackPosts);
    setFeaturedVolumes(fallbackVolumes);
    setTestimonials(fallbackTestimonials);
    
    // Try to load from API in background
    try {
      const postsResponse = await blogAPI.getAllPosts({ limit: 3 });
      const posts = postsResponse.data;
      if (Array.isArray(posts) && posts.length > 0) {
        setFeaturedPosts(posts);
      } else if (posts?.results && Array.isArray(posts.results) && posts.results.length > 0) {
        setFeaturedPosts(posts.results);
      }

      const volumesResponse = await volumeAPI.getAllVolumes({ limit: 3 });
      const volumes = volumesResponse.data;
      if (Array.isArray(volumes) && volumes.length > 0) {
        setFeaturedVolumes(volumes);
      } else if (volumes?.results && Array.isArray(volumes.results) && volumes.results.length > 0) {
        setFeaturedVolumes(volumes.results);
      }

      const testimonialsResponse = await testimonialAPI.getAllTestimonials({ limit: 3 });
      const testimonialsData = testimonialsResponse.data;
      if (Array.isArray(testimonialsData) && testimonialsData.length > 0) {
        setTestimonials(testimonialsData);
      } else if (testimonialsData?.results && Array.isArray(testimonialsData.results) && testimonialsData.results.length > 0) {
        setTestimonials(testimonialsData.results);
      }
    } catch (error) {
      console.log('API failed, using fallback data:', error);
      // Fallback data already set above
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
                      src={post.image.startsWith('http') ? post.image : `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:8000'}${post.image}`}
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