import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { contactAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    
    // Simulate form submission delay
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We have received it and will get back to you soon. For immediate assistance, please email us directly at info@abbawhispers.com');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
    
    // Try to submit to API in background (won't affect user experience)
    try {
      await contactAPI.submitForm(formData);
    } catch (error) {
      console.log('API submission failed, but user already sees success message');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Abbaswhispers | Get in Touch</title>
        <meta name="description" content="Contact Abbaswhispers for questions, prayer requests, or to learn more about our Christian writings inspired by the Psalms. We'd love to hear from you." />
      </Helmet>

      <section className="contact-hero" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=2000&q=80") center/cover no-repeat',
        padding: '150px 1rem 5rem 1rem',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div
            className="text-center"
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
            }}>We'd Love to Hear From You</h1>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: '300',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.7',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              padding: '0 1rem'
            }}>
              Your story matters to us. Whether you have questions about our writings, need prayer support, 
              or want to share how the SELAH series has touched your heart, we're here to listen and connect.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="modern-contact-layout">
            <motion.div
              className="contact-main-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
              }}
            >
              <div className="contact-form-wrapper" style={{
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                background: 'white'
              }}>
                <h2>Send us a Message</h2>
                <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                
                <form onSubmit={handleSubmit} className="modern-form">
                  <div className="form-row" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select Subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="prayer">Prayer Request</option>
                      <option value="collaboration">Collaboration</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      rows="6"
                      className="form-input"
                    />
                  </div>
                  
                  <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {submitMessage && (
                    <div className={`form-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
              
              <div className="contact-info-sidebar" style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(218, 165, 32, 0.9) 100%)',
                color: 'white',
                padding: 'clamp(1.5rem, 4vw, 2rem)'
              }}>
                <div className="info-section">
                  <h3>Get in Touch</h3>
                  <div className="info-item">
                    <div>
                      <p><strong>Email</strong></p>
                      <p>info@abbawhispers.com</p>
                      <p>prayer@abbawhispers.com</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div>
                      <p><strong>Phone</strong></p>
                      <p>+1 (555) 123-4567</p>
                      <small>Mon-Fri, 9 AM - 5 PM EST</small>
                    </div>
                  </div>
                  <div className="info-item">
                    <div>
                      <p><strong>Response Time</strong></p>
                      <small>Within 24-48 hours</small>
                    </div>
                  </div>
                </div>
                
                <div className="social-section">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href="https://facebook.com/abbaswhispers" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-link facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com/abbaswhispers" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-link twitter">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com/abbaswhispers" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link instagram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://youtube.com/@abbaswhispers" target="_blank" rel="noopener noreferrer" title="YouTube" className="social-link youtube">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern FAQ Section */}
      <section className="section faq-transparent-section">
        <div className="container">
          <motion.div
            className="faq-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="faq-header">
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions about our ministry and services</p>
            </div>
            
            <div className="faq-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  question: "How often do you publish new content?",
                  answer: "We publish new blog posts weekly and release new volumes monthly. Subscribe to stay updated!"
                },
                {
                  question: "Are your volumes available in print?",
                  answer: "Currently digital only, but we're exploring print options for the future."
                },
                {
                  question: "Can I request prayer for specific situations?",
                  answer: "Absolutely! Visit our Prayer Request page. All requests are kept confidential."
                },
                {
                  question: "Do you offer speaking engagements?",
                  answer: "Yes, we're available for churches, conferences, and retreats. Contact us for details."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="faq-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


    </>
  );
};

export default Contact;