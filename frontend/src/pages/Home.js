import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';

const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  // Sample featured posts
  const featuredPosts = [
    {
      id: 1,
      title: "Finding Peace in the Storm",
      excerpt: "When life's tempests rage around us, we can find solace in the eternal promises found within the Psalms...",
      date: "December 15, 2024",
      slug: "finding-peace-in-the-storm"
    },
    {
      id: 2,
      title: "The Language of Lament",
      excerpt: "David's raw honesty in the Psalms teaches us that it's okay to bring our deepest sorrows before God...",
      date: "December 10, 2024",
      slug: "the-language-of-lament"
    },
    {
      id: 3,
      title: "Selah: The Sacred Pause",
      excerpt: "In our hurried world, the Hebrew word 'Selah' invites us to pause, breathe, and reflect on God's goodness...",
      date: "December 5, 2024",
      slug: "selah-the-sacred-pause"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Abba's Whispers - Christian Poetry & Spiritual Healing | SELAH Series</title>
        <meta name="description" content="Discover healing through poetry inspired by the Psalms. Join Uzo's transformative journey from grief to grace with the acclaimed SELAH series." />
        <meta name="keywords" content="Abba's Whispers, abbaswhispers, Christian poetry, Psalms inspiration, spiritual healing, grief recovery, faith poetry, SELAH series, Uzo poet, Christian writer" />
        <meta property="og:title" content="Abba's Whispers - Christian Poetry & Spiritual Healing" />
        <meta property="og:description" content="Poetry inspired by the Psalms, born from a journey through grief and grace" />
        <meta property="og:url" content="https://abbaswhispers.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abbaswhispers.com/hero-image-homepage.JPG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Abba's Whispers - Christian Poetry & Spiritual Healing" />
        <meta name="twitter:description" content="Poetry inspired by the Psalms, born from a journey through grief and grace" />
        <meta name="twitter:image" content="https://abbaswhispers.com/hero-image-homepage.JPG" />
        <link rel="canonical" href="https://abbaswhispers.com" />
      </Helmet>

      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero-image-homepage.JPG')`,
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
          maxWidth: '900px',
          padding: '0 2rem'
        }}>

          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'normal',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            color: 'white'
          }}>Abba's Whispers</h1>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            fontWeight: 'normal',
            lineHeight: '1.5',
            marginBottom: '2.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontStyle: 'italic'
          }}>Poetry inspired by the Psalms</p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/volumes" style={{
              fontFamily: 'Inter, sans-serif',
              padding: '1rem 2.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}>Explore Poetry</a>
            <a href="/about" style={{
              fontFamily: 'Inter, sans-serif',
              padding: '1rem 2.5rem',
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}>Meet Uzo</a>
          </div>
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
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <ScrollAnimatedSection key={post.id} animation="fade-up">
                  <article style={{
                    background: '#f8f9fa',
                    padding: '2rem',
                    borderRadius: '8px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1.2rem',
                      color: '#2c2c2c',
                      marginBottom: '1rem',
                      lineHeight: '1.3'
                    }}>{post.title}</h3>
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.95rem',
                      color: '#666666',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      flex: 1
                    }}>{post.excerpt}</p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.85rem',
                        color: '#999999'
                      }}>{post.date}</span>
                      <Link 
                        to={`/blog/${post.slug}`}
                        style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '0.9rem',
                          color: '#8b7355',
                          textDecoration: 'none',
                          borderBottom: '1px solid #8b7355',
                          paddingBottom: '2px'
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                </ScrollAnimatedSection>
              ))
            ) : (
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
          <form onSubmit={(e) => {
            e.preventDefault();
            setIsSubscribing(true);
            setSubscribeMessage('🎉 Thank you for your interest! Newsletter functionality coming soon.');
            setNewsletterEmail('');
            setIsSubscribing(false);
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