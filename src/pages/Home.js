import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredVolumes, setFeaturedVolumes] = useState([]);

  useEffect(() => {
    // Fetch featured content
    setFeaturedPosts([
      {
        id: 1,
        title: "Finding Peace in Psalm 23",
        excerpt: "Discover the profound comfort and guidance found in the shepherd's psalm...",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
        date: "2024-01-15"
      },
      {
        id: 2,
        title: "The Power of Gratitude in Psalm 100",
        excerpt: "Learn how thanksgiving transforms our hearts and minds...",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=200&fit=crop&crop=center",
        date: "2024-01-10"
      }
    ]);

    setFeaturedVolumes([
      {
        id: 1,
        title: "SELAH: Sample Poems",
        description: "Experience Uzo's heartfelt poetry with audio - preview of the full collection",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=300&fit=crop&crop=center"
      },
      {
        id: 2,
        title: "Audio Poetry Experience",
        description: "Listen to Uzo's voice bringing the SELAH poems to life",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=300&fit=crop&crop=center"
      }
    ]);
  }, []);

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

          <div className="grid grid-2">
            {featuredVolumes.map((volume, index) => (
              <motion.div
                key={volume.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src={volume.image} 
                  alt={volume.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '1rem' }}
                />
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

          <div className="grid grid-2">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '1rem' }}
                />
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{post.date}</span>
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
              Subscribe to receive weekly inspirations and be part of a community 
              dedicated to spiritual growth and healing.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn">Subscribe Now</Link>
              <Link to="/prayer-request" className="btn btn-secondary">Submit Prayer Request</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;