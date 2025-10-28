import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { prayerAPI } from '../utils/api';
const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    request: '',
    is_anonymous: false,
    allow_sharing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      await prayerAPI.submitRequest(formData);
      setSubmitMessage('🙏 Your prayer request has been received. Our prayer team is lifting you up in prayer!');
      setFormData({
        name: '',
        email: '',
        category: '',
        request: '',
        is_anonymous: false,
        allow_sharing: false
      });
    } catch (error) {
      console.error('Prayer request submission error:', error);
      setSubmitMessage('There was an error submitting your prayer request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Prayer Request - Abbaswhispers | Submit Your Prayer Needs</title>
        <meta name="description" content="Submit your prayer requests to Abbaswhispers. Our prayer team is committed to lifting up your needs in prayer. All requests are kept confidential." />
      </Helmet>

      {/* Hero Section */}
      <section style={{
        background: 'url("/backgroundtextimage3.JPG") center/cover no-repeat',
        padding: '180px 2rem 120px 2rem',
        textAlign: 'center',
        color: '#ffffff',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'normal',
              marginBottom: '1.5rem',
              color: '#000000',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
            }}>Prayer</h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              fontWeight: 'normal',
              marginBottom: '0',
              color: '#DAA520',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>A sacred conversation between the heart and the divine, where burdens are lifted and grace is found.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '5rem 2rem'
      }}>
        
        {/* Introduction Section */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '4rem',
            alignItems: 'start'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1.2rem',
                lineHeight: '1.2'
              }}>The Sacred Act of Prayer</h2>
            </div>
            <div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                Prayer is the soul's sincere desire, uttered or unexpressed. It is the bridge between our human longing and divine love, a conversation that transforms both the speaker and the silence that follows.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                In this sacred space, we invite you to share the deepest concerns of your heart. Our prayer community stands ready to hold your intentions with reverence and love.
              </p>
            </div>
          </div>
        </section>

        {/* Prayer Form Section */}
        <section style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '5rem',
          marginBottom: '5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '4rem'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '0.8rem'
              }}>Share Your Prayer</h3>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#666666',
                marginBottom: '2rem'
              }}>
                Every prayer request is received with deep respect and held in complete confidence. Our prayer team commits to lifting your needs in prayer with compassion and faith.
              </p>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name (optional)"
                    style={{
                      fontFamily: 'Georgia, serif',
                      padding: '1rem 0',
                      border: 'none',
                      borderBottom: '1px solid #e8e8e8',
                      fontSize: '1rem',
                      fontWeight: 'normal',
                      width: '100%',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email for prayer updates (optional)"
                    style={{
                      fontFamily: 'Georgia, serif',
                      padding: '1rem 0',
                      border: 'none',
                      borderBottom: '1px solid #e8e8e8',
                      fontSize: '1rem',
                      fontWeight: 'normal',
                      width: '100%',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>

                <div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{
                      fontFamily: 'Georgia, serif',
                      padding: '1rem 0',
                      border: 'none',
                      borderBottom: '1px solid #e8e8e8',
                      fontSize: '1rem',
                      fontWeight: 'normal',
                      width: '100%',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  >
                    <option value="">Prayer intention</option>
                    <option value="healing">Healing & Restoration</option>
                    <option value="family">Family & Relationships</option>
                    <option value="guidance">Guidance & Wisdom</option>
                    <option value="grief">Grief & Comfort</option>
                    <option value="thanksgiving">Gratitude & Thanksgiving</option>
                    <option value="financial">Financial Needs</option>
                    <option value="salvation">Salvation & Spiritual Growth</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Share what is on your heart..."
                    style={{
                      fontFamily: 'Georgia, serif',
                      padding: '1rem 0',
                      border: 'none',
                      borderBottom: '1px solid #e8e8e8',
                      fontSize: '1rem',
                      fontWeight: 'normal',
                      width: '100%',
                      outline: 'none',
                      background: 'transparent',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  fontSize: '0.9rem',
                  color: '#666666'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="is_anonymous"
                      checked={formData.is_anonymous}
                      onChange={handleChange}
                    />
                    <span>Keep my prayer anonymous</span>
                  </label>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="allow_sharing"
                      checked={formData.allow_sharing}
                      onChange={handleChange}
                    />
                    <span>Share with prayer circle (anonymously)</span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    fontFamily: 'Georgia, serif',
                    padding: '1rem 2rem',
                    border: '1px solid #8b7355',
                    background: 'transparent',
                    color: '#8b7355',
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    alignSelf: 'flex-start'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#8b7355';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#8b7355';
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Prayer'}
                </button>

                {submitMessage && (
                  <div style={{ 
                    padding: '1rem',
                    backgroundColor: submitMessage.includes('error') ? '#ffebee' : '#f0f8f0',
                    color: submitMessage.includes('error') ? '#c62828' : '#2e7d32',
                    fontSize: '0.9rem'
                  }}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Prayer Wisdom Section */}
        <section style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '5rem',
          marginBottom: '5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '4rem'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1.5rem'
              }}>On Prayer</h3>
            </div>
            <div>
              <blockquote style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                lineHeight: '1.6',
                color: '#2c2c2c',
                fontStyle: 'italic',
                marginBottom: '2rem',
                borderLeft: '3px solid #8b7355',
                paddingLeft: '2rem'
              }}>
                "Prayer is not asking. It is a longing of the soul. It is daily admission of one's weakness. It is better in prayer to have a heart without words than words without a heart."
              </blockquote>
              <cite style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                color: '#8b7355',
                fontStyle: 'normal'
              }}>— Mahatma Gandhi</cite>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '5rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '4rem'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1.5rem'
              }}>Our Prayer Community</h3>
            </div>
            <div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                Our prayer team consists of dedicated individuals who understand the power of intercessory prayer. Each request is treated as sacred, held in confidence, and lifted up with genuine care and faith.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                We believe that prayer changes things—not always in the ways we expect, but always in the ways we need. Join us in this sacred practice of holding space for one another's deepest needs and highest hopes.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Prayer Stories Section */}
      <section style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/backgroundimage5.JPG") center/cover no-repeat',
        padding: '5rem 2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            fontWeight: 'normal',
            color: 'white',
            marginBottom: '2rem'
          }}>Stories of Answered Prayer</h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.2rem',
            lineHeight: '1.7',
            color: 'white',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            "I submitted a prayer request during the darkest season of my life. Not only did I feel the prayers 
            of this community lifting me up, but I also received a personal note that reminded me I was not alone. 
            That simple act of compassion changed everything."
          </p>
          <cite style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            color: '#DAA520'
          }}>— Maria, Community Member</cite>
        </div>
      </section>

      {/* Prayer Guidelines Section */}
      <section style={{ padding: '5rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '4rem'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1.5rem'
              }}>How We Pray</h3>
            </div>
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem'
                }}>With Reverence</h4>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666666'
                }}>Each prayer request is treated as sacred. We approach your needs with the same reverence we would bring to our own deepest concerns.</p>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem'
                }}>With Consistency</h4>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666666'
                }}>Our prayer team commits to lifting your requests in prayer for a minimum of seven days, with ongoing prayers for long-term needs.</p>
              </div>
              
              <div>
                <h4 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem'
                }}>With Confidentiality</h4>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666666'
                }}>Your privacy is sacred to us. Prayer requests are shared only with our dedicated prayer team and only with your explicit permission.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Types Section */}
      <section style={{ padding: '5rem 2rem', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            fontWeight: 'normal',
            color: '#2c2c2c',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>We Pray For All Seasons</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '3rem'
          }}>
            <div>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Seasons of Struggle</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '1rem'
              }}>Illness, loss, financial hardship, relationship challenges, depression, anxiety, addiction recovery, job loss, family conflicts.</p>
            </div>
            
            <div>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Seasons of Seeking</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '1rem'
              }}>Guidance for major decisions, spiritual direction, purpose and calling, wisdom in relationships, discernment in life transitions.</p>
            </div>
            
            <div>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Seasons of Gratitude</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '1rem'
              }}>Celebrations of healing, answered prayers, new beginnings, milestones, blessings received, spiritual breakthroughs.</p>
            </div>
            
            <div>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Seasons of Service</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '1rem'
              }}>Prayers for others, community needs, global concerns, mission work, ministry endeavors, acts of service and compassion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Encouragement Section */}
      <section style={{ padding: '5rem 2rem', background: '#ffffff', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.8rem',
            fontWeight: 'normal',
            color: '#2c2c2c',
            marginBottom: '2rem'
          }}>You Are Not Alone</h3>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.2rem',
            lineHeight: '1.7',
            color: '#666666',
            marginBottom: '2rem'
          }}>
            Whatever brings you to this sacred space of prayer, know that you are held in love. 
            Your burdens are not yours to carry alone, and your joys are multiplied when shared 
            with a community that cares.
          </p>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#666666'
          }}>
            In the words of the Psalmist: "Cast your cares on the Lord and he will sustain you; 
            he will never let the righteous be shaken." — Psalm 55:22
          </p>
        </div>
      </section>
    </>
  );
};

export default PrayerRequest;