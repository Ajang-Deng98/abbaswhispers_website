import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { contactAPI } from '../utils/api';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const submitData = {
        ...formData,
        subject: 'Contact Form Message'
      };
      await contactAPI.submitForm(submitData);
      setSubmitMessage('Thank you for your message! We have received it and will get back to you soon. For immediate assistance, please email us directly at info@abbawhispers.com');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('There was an error sending your message. Please try again or email us directly at info@abbawhispers.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Abbaswhispers | Get in Touch</title>
        <meta name="description" content="Contact Abbaswhispers for questions, prayer requests, or to learn more about our Christian writings inspired by the Psalms. We'd love to hear from you." />
      </Helmet>

      {/* Hero Section */}
      <section style={{
        background: 'url("/backgroundtextimage2.JPG") center/cover no-repeat',
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
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>Connect</h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              fontWeight: 'normal',
              marginBottom: '0',
              color: '#000000',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>We welcome your thoughts, questions, and the stories that shape your spiritual journey.</p>
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
              }}>Let's Begin a Conversation</h2>
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
                Every message that arrives here is received as a gift. Whether you're sharing how these writings have touched your life, seeking guidance on your spiritual journey, or simply wanting to connect, we welcome your words.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                In a world that often moves too quickly for meaningful exchange, we believe in the power of thoughtful correspondence and genuine human connection.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
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
              }}>Send a Message</h3>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#666666',
                marginBottom: '2rem'
              }}>
                We read every message personally and respond with care. Please allow 24-48 hours for a thoughtful reply.
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
                    placeholder="Your name"
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
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
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
                  />
                </div>



                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    rows="6"
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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

        {/* Contact Information Section */}
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
              }}>Other Ways to Connect</h3>
            </div>
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem'
                }}>Email</h4>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  color: '#666666',
                  marginBottom: '0.5rem'
                }}>General inquiries: <a href="mailto:info@abbawhispers.com" style={{ color: '#8b7355', textDecoration: 'none', borderBottom: '1px solid #8b7355' }}>info@abbawhispers.com</a></p>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  color: '#666666'
                }}>Prayer requests: <a href="mailto:prayer@abbawhispers.com" style={{ color: '#8b7355', textDecoration: 'none', borderBottom: '1px solid #8b7355' }}>prayer@abbawhispers.com</a></p>
              </div>
              
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem'
                }}>Response Time</h4>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  color: '#666666'
                }}>We typically respond within 24-48 hours. For urgent prayer requests, please use our dedicated prayer request form.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
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
              }}>Our Approach</h3>
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
                We believe that every person who reaches out is seeking something sacred—whether it's understanding, connection, or simply the comfort of being heard. Our responses are crafted with the same care and intention that we bring to our writings.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#666666',
                fontWeight: 'normal'
              }}>
                In this digital age, we remain committed to the ancient art of meaningful correspondence, treating each exchange as an opportunity for genuine human connection and spiritual growth.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Community Section */}
      <section style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/backgroundimage4.JPG") center/cover no-repeat',
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
          }}>Join Our Community</h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.2rem',
            lineHeight: '1.7',
            color: 'white',
            marginBottom: '2rem'
          }}>
            You are invited into a community of seekers, dreamers, and believers who understand 
            that the spiritual journey is both deeply personal and beautifully communal.
          </p>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: 'white'
          }}>
            Whether you're walking through a season of joy or navigating the valleys of grief, 
            you'll find companions here who honor both the questions and the quiet revelations 
            that shape our faith.
          </p>
        </div>
      </section>

      {/* Ways to Connect Section */}
      <section style={{ padding: '5rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2rem',
            fontWeight: 'normal',
            color: '#2c2c2c',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>Ways to Connect</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : '1fr',
            gap: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Share Your Story</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Tell us how these writings have touched your life or share your own journey of faith and healing.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Ask Questions</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Bring your spiritual questions, your doubts, your wonderings. All sincere seekers are welcome here.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h4 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1rem'
              }}>Collaborate</h4>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Interested in speaking engagements, writing collaborations, or community partnerships? Let's explore together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{ padding: '5rem 2rem', background: '#f8f9fa', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <blockquote style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: '#2c2c2c',
            lineHeight: '1.5',
            marginBottom: '2rem'
          }}>
            "We are all just walking each other home."
          </blockquote>
          <cite style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            color: '#8b7355'
          }}>— Ram Dass</cite>
        </div>
      </section>
    </>
  );
};

export default Contact;