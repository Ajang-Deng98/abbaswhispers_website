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
      <section style={{
        background: '#f8f9fa',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <blockquote style={{
            fontFamily: 'Georgia, serif',
            fontSize: '28px',
            fontStyle: 'italic',
            color: '#2c2c2c',
            maxWidth: '700px',
            margin: '0 auto 30px',
            lineHeight: '1.4',
            fontWeight: 'normal'
          }}>
            "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul."
          </blockquote>
          <cite style={{
            fontFamily: 'Georgia, serif',
            fontSize: '16px',
            color: '#8b7355'
          }}>— Psalm 23:1-3</cite>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '30px',
                lineHeight: '1.2'
              }}>A Journey Through Grief to Grace</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '25px'
              }}>
                My name is Uzo, and I am the founder of Abba's Whispers. This sacred space was born from a journey through profound loss and the healing power of divine conversation.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '30px'
              }}>
                After losing my beloved husband in 2015, I found myself in a wilderness of grief. It was through poetry inspired by the Psalms that I discovered a bridge between the seen and unseen, the spoken and unspoken.
              </p>
              <Link to="/about" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                color: '#8b7355',
                textDecoration: 'underline',
                borderBottom: '1px solid #8b7355'
              }}>Read My Story</Link>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '40px',
              borderRadius: '8px'
            }}>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '20px'
              }}>The SELAH Series</h3>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#666666',
                marginBottom: '20px'
              }}>
                SELAH—a Hebrew word meaning "pause and reflect"—became the foundation of my healing journey. This poetry series invites you to pause, breathe, and find your own sacred conversation with the divine.
              </p>
              <ul style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                color: '#666666',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Meditations on comfort and restoration</li>
                <li>Reflections on divine strength and courage</li>
                <li>Prayers for peace and tranquility</li>
                <li>Songs of gratitude and wonder</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        background: '#f8f9fa',
        padding: '80px 0'
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: 'normal',
            color: '#2c2c2c',
            textAlign: 'center',
            marginBottom: '60px'
          }}>Voices from Our Community</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            <div style={{
              background: '#ffffff',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)'
            }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: '#666666',
                marginBottom: '20px'
              }}>
                "These words found me in my darkest hour and reminded me that I am not alone. The poetry speaks directly to the soul."
              </p>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
                color: '#8b7355'
              }}>— Sarah M.</div>
            </div>
            <div style={{
              background: '#ffffff',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)'
            }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: '#666666',
                marginBottom: '20px'
              }}>
                "Uzo's journey through grief has become a beacon of hope for so many. Her words heal and inspire."
              </p>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
                color: '#8b7355'
              }}>— Michael R.</div>
            </div>
            <div style={{
              background: '#ffffff',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)'
            }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: '#666666',
                marginBottom: '20px'
              }}>
                "The SELAH series has transformed my prayer life. Each poem is a doorway to deeper communion with God."
              </p>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
                color: '#8b7355'
              }}>— Grace L.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: 'normal',
            color: '#2c2c2c',
            marginBottom: '20px'
          }}>Weekly Whispers</h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#666666',
            maxWidth: '500px',
            margin: '0 auto 40px'
          }}>
            Receive weekly poetry, reflections, and gentle reminders that you are held in love.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            maxWidth: '400px',
            margin: '0 auto'
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
                fontSize: '16px'
              }}
            />
            <button style={{
              padding: '12px 24px',
              background: '#8b7355',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              cursor: 'pointer'
            }}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: '#2c2c2c',
        color: '#ffffff',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: 'normal',
            marginBottom: '20px'
          }}>Begin Your Sacred Conversation</h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 40px',
            opacity: 0.9
          }}>
            Whether you're walking through grief, seeking deeper faith, or simply longing for words that speak to your soul, you're welcome here.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/volumes" style={{
              display: 'inline-block',
              padding: '15px 30px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid #ffffff',
              borderRadius: '4px',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>Explore Poetry</Link>
            <Link to="/prayer-request" style={{
              display: 'inline-block',
              padding: '15px 30px',
              background: '#8b7355',
              color: '#ffffff',
              border: '1px solid #8b7355',
              borderRadius: '4px',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>Share Your Prayer</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;