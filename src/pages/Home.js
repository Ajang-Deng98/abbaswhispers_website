import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Testimonials from '../components/Testimonials';
import { blogAPI, volumeAPI } from '../utils/api';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredVolumes, setFeaturedVolumes] = useState([]);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      // Load featured posts
      const postsResponse = await blogAPI.getAllPosts({ limit: 3 });
      setFeaturedPosts(postsResponse.data?.posts || postsResponse.data || []);

      // Load featured volumes
      const volumesResponse = await volumeAPI.getAllVolumes({ limit: 3 });
      setFeaturedVolumes(volumesResponse.data || []);
    } catch (error) {
      console.error('Error loading featured content:', error);
      // Fallback to empty arrays
      setFeaturedPosts([]);
      setFeaturedVolumes([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Abba Whispers - Healing Through Faith | Christian Inspirational Writings</title>
        <meta name="description" content="Find healing and empowerment through Christian writings inspired by the Book of Psalms. Join our community of faith and discover peace through God's word." />
        <meta name="keywords" content="Christian faith, Psalms, healing, inspiration, spiritual growth, Bible study" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img 
              src="/logo.png" 
              alt="Abba Whispers Logo" 
              style={{ 
                height: '80px', 
                width: 'auto', 
                marginBottom: '1rem',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }}
            />
            <h1>Welcome to Abba Whispers</h1>
            <p>
              An online space for poetry and reflective conversations. Experience the SELAH series - 
              writings born from a journey through grief into grace, inspired by the Psalms.
            </p>
            <Link to="/volumes" className="btn">Explore Our Volumes</Link>
          </motion.div>

          <motion.div
            className="verse-highlight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. 
            He leads me beside still waters. He restores my soul."
            <br />
            <strong>- Psalm 23:1-3</strong>
          </motion.div>
        </div>
      </section>

      {/* Featured Volumes Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Featured Volumes</h2>
            <p>Inspirational collections that speak to the heart and soul</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {featuredVolumes.slice(0, 3).map((volume, index) => (
              <motion.div
                key={volume.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {volume.image && (
                  <img 
                    src={volume.image.startsWith('http') ? volume.image : `http://localhost:5003${volume.image}`} 
                    alt={volume.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '1rem' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <h3>{volume.title}</h3>
                <p>{volume.description}</p>
                <Link to="/volumes" className="btn">Read More</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Latest Inspirations</h2>
            <p>Fresh insights and reflections from our recent writings</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {featuredPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {post.image && (
                  <img 
                    src={post.image.startsWith('http') ? post.image : `http://localhost:5003${post.image}`} 
                    alt={post.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '1rem' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{new Date(post.created_at).toLocaleDateString()}</span>
                  <Link to={`/blog/${post.id}`} className="btn">Read More</Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/blog" className="btn btn-secondary">View All Posts</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="section">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Join Our Community of Faith</h2>
            <p>
              Subscribe to our Substack newsletter for weekly inspirations and be part of a community 
              dedicated to spiritual growth and healing.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a 
                href="https://abbawhispers.substack.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
              >
                Subscribe on Substack
              </a>
              <Link to="/prayer-request" className="btn btn-secondary">Submit Prayer Request</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;