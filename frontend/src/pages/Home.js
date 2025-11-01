import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';
import { blogAPI, volumeAPI, subscriberAPI } from '../utils/api';
const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredVolumes, setFeaturedVolumes] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const loadFeaturedContent = async () => {
    try {
      const [postsResponse, volumesResponse] = await Promise.all([
        blogAPI.getAllPosts({ limit: 3 }),
        volumeAPI.getAllVolumes({ limit: 3 })
      ]);
      
      const posts = postsResponse.data;
      if (Array.isArray(posts) && posts.length > 0) {
        setFeaturedPosts(posts.slice(0, 3));
      } else if (posts?.results && Array.isArray(posts.results) && posts.results.length > 0) {
        setFeaturedPosts(posts.results.slice(0, 3));
      }

      const volumes = volumesResponse.data;
      if (Array.isArray(volumes) && volumes.length > 0) {
        setFeaturedVolumes(volumes.slice(0, 3));
      } else if (volumes?.results && Array.isArray(volumes.results) && volumes.results.length > 0) {
        setFeaturedVolumes(volumes.results.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading featured content:', error);
    }
  };

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  return (
    <>
      <Helmet>
        <title>Abba's Whispers - Christian Poetry & Spiritual Healing | SELAH Series</title>
        <meta name="description" content="Discover healing through poetry inspired by the Psalms. Join Uzo's transformative journey from grief to grace with the acclaimed SELAH series." />
        <meta name="keywords" content="Christian poetry, Psalms inspiration, spiritual healing, grief recovery, faith poetry, SELAH series" />
      </Helmet>

      {/* Hero Section */}
      <section style={{
        background: `url('/hero-image-homepage.JPG')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
          maxWidth: '800px',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'normal',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: '#000000',
            textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
          }}>Abba's Whispers</h1>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 'normal',
            lineHeight: '1.5',
            marginBottom: '3rem',
            color: '#8B4513',
            textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
          }}>Poetry inspired by the Psalms</p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '120px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <ScrollAnimatedSection animation="fade-up" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 'normal',
              color: '#2c2c2c',
              marginBottom: '2rem',
              lineHeight: '1.2'
            }}>A Journey Through Grief and Grace</h2>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              lineHeight: '1.7',
              color: '#666666',
              marginBottom: '2rem'
            }}>
              My name is Uzo, and I am the founder of Abba's Whispers. This sacred space was born from a journey through profound loss and the healing power of divine conversation.
            </p>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              lineHeight: '1.7',
              color: '#666666',
              marginBottom: '2.5rem'
            }}>
              After losing my beloved husband in 2015, I found myself in a wilderness of grief. It was through poetry inspired by the Psalms that I discovered a bridge between the seen and unseen.
            </p>
            <Link to="/about" style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              color: '#8b7355',
              textDecoration: 'none',
              borderBottom: '1px solid #8b7355',
              paddingBottom: '2px'
            }}>Read More</Link>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Poetry Collections */}
      <section style={{ padding: '120px 0', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
            gap: '80px',
            alignItems: 'start'
          }}>
            <ScrollAnimatedSection animation="fade-right" style={{ paddingTop: '40px' }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '2rem',
                lineHeight: '1.2'
              }}>The SELAH Series</h2>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem'
              }}>
                SELAH—a Hebrew word meaning "pause and reflect"—became the foundation of my healing journey. This poetry series invites you to pause, breathe, and find your own sacred conversation with the divine.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2.5rem'
              }}>
                Each collection represents a unique facet of the spiritual journey, offering comfort, hope, and spiritual nourishment for every season of life.
              </p>
              <Link to="/volumes" style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                color: '#8b7355',
                textDecoration: 'none',
                borderBottom: '1px solid #8b7355',
                paddingBottom: '2px'
              }}>Explore Collections</Link>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animation="fade-left">
              <img 
                src="/newimage3.JPG" 
                alt="Christian woman in peaceful prayer and meditation, representing spiritual healing and divine connection through Abba's Whispers poetry"
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
                loading="lazy"
              />
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Latest Writings */}
      <section style={{ padding: '120px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <ScrollAnimatedSection animation="fade-up">
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 'normal',
              color: '#2c2c2c',
              marginBottom: '3rem',
              textAlign: 'center',
              lineHeight: '1.2'
            }}>Check out our latest writing on our blog</h2>
          </ScrollAnimatedSection>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '40px'
          }}>
            {featuredPosts.length > 0 ? featuredPosts.slice(0, 3).map((post, index) => (
              <ScrollAnimatedSection key={post.id} animation="fade-up" delay={index * 100} style={{
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.1rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>{post.title}</h3>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#666666',
                  marginBottom: '1.5rem'
                }}>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '0.9rem',
                  color: '#8b7355',
                  textDecoration: 'none',
                  borderBottom: '1px solid #8b7355',
                  paddingBottom: '2px'
                }}>Read More</Link>
              </ScrollAnimatedSection>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.1rem',
                  color: '#666666',
                  fontStyle: 'italic'
                }}>New writings coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Quote Section */}
      <section style={{
        background: '#ffffff',
        padding: '120px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <ScrollAnimatedSection animation="scale-up">
            <blockquote style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontStyle: 'italic',
              color: '#2c2c2c',
              lineHeight: '1.4',
              fontWeight: 'normal',
              marginBottom: '2rem'
            }}>
              "In the silence between words, we find the space where healing begins."
            </blockquote>
            <cite style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              color: '#8b7355',
              fontStyle: 'normal'
            }}>— Uzo, Founder of Abba's Whispers</cite>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ 
        padding: '120px 0', 
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/backgroundtextimage1.JPG") center/cover no-repeat',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <ScrollAnimatedSection animation="fade-up">
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 'normal',
              color: 'white',
              marginBottom: '3rem',
              textAlign: 'center',
              lineHeight: '1.2'
            }}>Voices from Our Community</h2>
          </ScrollAnimatedSection>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)',
            gap: '60px'
          }}>
            <ScrollAnimatedSection animation="fade-right" style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: 'white',
                marginBottom: '1.5rem'
              }}>
                "These words found me in my darkest hour and reminded me that I am not alone. 
                The poetry speaks directly to the soul."
              </p>
              <cite style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#DAA520'
              }}>— Sarah M.</cite>
            </ScrollAnimatedSection>
            <ScrollAnimatedSection animation="fade-left" style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: 'white',
                marginBottom: '1.5rem'
              }}>
                "The SELAH series has transformed my prayer life. Each poem is a doorway 
                to deeper communion with God."
              </p>
              <cite style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.9rem',
                color: '#DAA520'
              }}>— Grace L.</cite>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '120px 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <ScrollAnimatedSection animation="fade-up">
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1.8rem',
              fontWeight: 'normal',
              color: '#2c2c2c',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>Weekly Whispers</h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: '#666666',
            marginBottom: '2.5rem'
          }}>
            Receive weekly poetry, reflections, and gentle reminders that you are held in love.
          </p>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubscribing(true);
            setSubscribeMessage('');
            
            try {
              const response = await subscriberAPI.subscribe({ email: newsletterEmail });
              if (response.data.message && response.data.message.includes('already subscribed')) {
                setSubscribeMessage('📬 You are already subscribed! Thank you for your continued support.');
              } else {
                setSubscribeMessage('🎉 Success! Thank you for subscribing to Weekly Whispers. You\'ll receive inspiring poetry and reflections in your inbox.');
              }
              setNewsletterEmail('');
            } catch (error) {
              console.error('Newsletter subscription error:', error);
              if (error.response?.data?.message?.includes('already subscribed')) {
                setSubscribeMessage('📬 You are already subscribed! Thank you for your continued support.');
                setNewsletterEmail('');
              } else {
                setSubscribeMessage('There was an error with your subscription. Please try again.');
              }
            } finally {
              setIsSubscribing(false);
            }
          }} style={{
            display: 'flex',
            gap: '10px',
            maxWidth: '400px',
            margin: '0 auto',
            flexDirection: window.innerWidth <= 480 ? 'column' : 'row'
          }}>
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
                fontFamily: 'Georgia, serif',
                fontSize: '1rem'
              }}
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              style={{
                padding: '12px 24px',
                background: isSubscribing ? '#999999' : '#8b7355',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                cursor: isSubscribing ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSubscribing ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubscribing) {
                  e.target.style.background = '#6d5a42';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubscribing) {
                  e.target.style.background = '#8b7355';
                }
              }}
            >{isSubscribing ? 'Subscribing...' : 'Subscribe'}</button>
          </form>
          {subscribeMessage && (
            <div style={{ 
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: subscribeMessage.includes('error') ? '#ffebee' : '#f0f8f0',
              color: subscribeMessage.includes('error') ? '#c62828' : '#2e7d32',
              fontSize: '0.9rem',
              borderRadius: '4px'
            }}>
              {subscribeMessage}
            </div>
          )}
          </ScrollAnimatedSection>
        </div>
      </section>


    </>
  );
};

export default Home;