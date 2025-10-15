import React, { useState, useEffect } from 'react';
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
  const [prayerTestimonials] = useState([
    {
      id: 1,
      category: 'Healing',
      testimony: 'God answered my prayer for healing. I am now cancer-free and praising His name!',
      author_name: 'Sarah M.'
    },
    {
      id: 2,
      category: 'Financial',
      testimony: 'After months of unemployment, God provided the perfect job. His timing is perfect.',
      author_name: 'Michael R.'
    },
    {
      id: 3,
      category: 'Family',
      testimony: 'Our family was restored through prayer. God can heal any broken relationship.',
      author_name: 'Jennifer L.'
    }
  ]);

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
    
    try {
      // Try API first, fallback to local storage
      try {
        await prayerAPI.submitRequest(formData);
        setSubmitMessage('Your prayer request has been received. We are praying for you!');
      } catch (apiError) {
        // Fallback: Save to local storage
        const savedRequests = JSON.parse(localStorage.getItem('prayerRequests') || '[]');
        const newRequest = {
          ...formData,
          id: Date.now(),
          submitted_at: new Date().toISOString(),
          status: 'pending'
        };
        savedRequests.push(newRequest);
        localStorage.setItem('prayerRequests', JSON.stringify(savedRequests));
        setSubmitMessage('Your prayer request has been saved. We will pray for you! (Saved locally)');
      }
      
      setFormData({
        name: '',
        email: '',
        category: '',
        request: '',
        is_anonymous: false,
        allow_sharing: false
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error submitting your request. Please try again.');
      console.error('Prayer request error:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Prayer Request - Abbaswhispers | Submit Your Prayer Needs</title>
        <meta name="description" content="Submit your prayer requests to Abbaswhispers. Our prayer team is committed to lifting up your needs in prayer. All requests are kept confidential." />
      </Helmet>

      <section className="prayer-hero" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&w=2000&q=80") center/cover no-repeat',
        padding: '150px 1rem 5rem 1rem',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <motion.div
            className="prayer-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '400',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '1.5rem'
            }}>Share Your Heart with God</h1>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: '1.7',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              padding: '0 1rem'
            }}>Submit your prayer requests with confidence. Our dedicated prayer team stands ready to lift your needs before the throne of grace. Every prayer matters, every heart is heard.</p>
            <div className="prayer-stats" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Prayer Coverage</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Confidential</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Immediate</span>
                <span className="stat-label">Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="modern-prayer-layout" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'start'
          }}>
            <motion.div
              className="prayer-main-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="prayer-form-wrapper" style={{
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                background: 'white',
                borderRadius: '16px'
              }}>
                <h2>Submit Your Prayer Request</h2>
                <p>Share your heart with our prayer team. Every request is treated with love, respect, and complete confidentiality.</p>

                <form onSubmit={handleSubmit} className="modern-prayer-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name (Optional)"
                      className="prayer-input"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email for Updates (Optional)"
                      className="prayer-input"
                    />
                  </div>

                  <div className="form-group">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="prayer-input"
                    >
                      <option value="">Select Prayer Category</option>
                      <option value="healing">Healing & Health</option>
                      <option value="family">Family & Relationships</option>
                      <option value="financial">Financial Provision</option>
                      <option value="guidance">Guidance & Direction</option>
                      <option value="salvation">Salvation & Faith</option>
                      <option value="grief">Grief & Comfort</option>
                      <option value="thanksgiving">Thanksgiving & Praise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="request"
                      value={formData.request}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Share your prayer request with our team. Every word matters to us and to God."
                      className="prayer-input prayer-textarea"
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="is_anonymous"
                        checked={formData.is_anonymous}
                        onChange={handleChange}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>Keep my request anonymous</span>
                    </label>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="allow_sharing"
                        checked={formData.allow_sharing}
                        onChange={handleChange}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>Allow sharing for group prayer (anonymous)</span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="prayer-submit-btn"
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? 'Submitting Prayer...' : 'Submit Prayer Request'}
                  </button>

                  {submitMessage && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '1rem',
                      backgroundColor: submitMessage.includes('error') ? '#ffebee' : '#e8f5e8',
                      color: submitMessage.includes('error') ? '#c62828' : '#2e7d32',
                      borderRadius: '5px',
                      textAlign: 'center'
                    }}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            <motion.div
              className="prayer-info-sidebar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div className="prayer-info-card">
                <h3>Our Promise</h3>
                <div className="info-item">
                  <div>
                    <h4>Immediate Prayer</h4>
                    <p>We pray as soon as we receive your request</p>
                  </div>
                </div>
                <div className="info-item">
                  <div>
                    <h4>Complete Privacy</h4>
                    <p>All requests kept strictly confidential</p>
                  </div>
                </div>
                <div className="info-item">
                  <div>
                    <h4>Caring Team</h4>
                    <p>Dedicated prayer warriors lift you up</p>
                  </div>
                </div>
              </div>
              
              <div className="scripture-card">
                <h4>Scripture Promise</h4>
                <blockquote>
                  "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."
                </blockquote>
                <cite>- Matthew 7:7</cite>
              </div>
              
              <div className="urgent-card">
                <h4>Urgent Needs?</h4>
                <p>For urgent prayer requests, you can also call our prayer line at <strong>+1 (555) PRAY-NOW</strong> or email us directly at <strong>urgent@abbawhispers.com</strong></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Prayer Testimonials</h2>
            <p>See how God has answered prayers in our community</p>
          </motion.div>

          {prayerTestimonials.length > 0 ? (
            <div className="grid grid-3" style={{ 
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)'
            }}>
              {prayerTestimonials.slice(0, 3).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: 'var(--primary-gold)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    display: 'inline-block',
                    marginBottom: '1rem'
                  }}>
                    {testimonial.category}
                  </div>
                  <p style={{ fontStyle: 'italic', marginBottom: '1rem', lineHeight: '1.6' }}>
                    "{testimonial.testimony}"
                  </p>
                  <div style={{ textAlign: 'right', fontWeight: '500', color: 'var(--primary-gold)' }}>
                    - {testimonial.author_name}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <p>Prayer testimonials will appear here as they are shared by our community.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PrayerRequest;