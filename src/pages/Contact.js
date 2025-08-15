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
    
    try {
      await contactAPI.submitForm(formData);
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      console.error('Contact form error:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Abba Whispers | Get in Touch</title>
        <meta name="description" content="Contact Abba Whispers for questions, prayer requests, or to learn more about our Christian writings inspired by the Psalms. We'd love to hear from you." />
      </Helmet>

      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contact Us</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              We'd love to hear from you! Whether you have questions, feedback, or just want to 
              share how our writings have touched your heart, please don't hesitate to reach out.
            </p>
          </motion.div>

          <div className="grid grid-2" style={{ marginTop: '4rem', gap: '4rem' }}>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="card">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#fafafa',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-gold)';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.backgroundColor = '#fafafa';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#fafafa',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-gold)';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.backgroundColor = '#fafafa';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        backgroundColor: '#fafafa',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-gold)';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.backgroundColor = '#fafafa';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="prayer">Prayer Request</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="technical">Technical Support</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#fafafa',
                        fontFamily: 'Inter, sans-serif',
                        minHeight: '120px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-gold)';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.backgroundColor = '#fafafa';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn"
                    disabled={isSubmitting}
                    style={{ 
                      width: '100%',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-gold)' }}>Get in Touch</h2>
                
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--warm-cream)', borderRadius: '8px' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem', fontSize: '1rem' }}>Email</h3>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.95rem' }}>info@abbawhispers.com</p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.95rem' }}>prayer@abbawhispers.com</p>
                </div>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--warm-cream)', borderRadius: '8px' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem', fontSize: '1rem' }}>Phone</h3>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.95rem' }}>+1 (555) 123-4567</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: '0.25rem 0' }}>
                    Available Monday - Friday, 9 AM - 5 PM EST
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--warm-cream)', borderRadius: '8px' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem', fontSize: '1rem' }}>Social Media</h3>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href="https://facebook.com/abbawhispers" target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'inline-block',
                      padding: '8px 12px',
                      background: '#1877F2',
                      borderRadius: '6px',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'transform 0.3s ease',
                      marginRight: '8px',
                      marginBottom: '8px'
                    }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>Facebook</a>
                    <a href="https://twitter.com/abbawhispers" target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'inline-block',
                      padding: '8px 12px',
                      background: '#1DA1F2',
                      borderRadius: '6px',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'transform 0.3s ease',
                      marginRight: '8px',
                      marginBottom: '8px'
                    }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>Twitter</a>
                    <a href="https://instagram.com/abbawhispers" target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'inline-block',
                      padding: '8px 12px',
                      background: 'linear-gradient(45deg, #F56040, #E1306C, #C13584)',
                      borderRadius: '6px',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'transform 0.3s ease',
                      marginRight: '8px',
                      marginBottom: '8px'
                    }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>Instagram</a>
                    <a href="https://youtube.com/@abbawhispers" target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'inline-block',
                      padding: '8px 12px',
                      background: '#FF0000',
                      borderRadius: '6px',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'transform 0.3s ease',
                      marginRight: '8px',
                      marginBottom: '8px'
                    }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>YouTube</a>
                  </div>
                </div>

                <div style={{ padding: '1rem', backgroundColor: 'var(--warm-cream)', borderRadius: '8px' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem', fontSize: '1rem' }}>Response Time</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>We typically respond within 24-48 hours during business days.</p>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, var(--warm-cream) 0%, var(--cream) 100%)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--primary-gold)' }}>Newsletter</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Receive weekly inspirations and updates.</p>
                <form style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      backgroundColor: 'white'
                    }}
                  />
                  <button type="submit" className="btn" style={{ fontSize: '0.85rem', padding: '12px 20px' }}>Subscribe</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          </motion.div>

          <div style={{ maxWidth: '800px', margin: '3rem auto 0' }}>
            {[
              {
                question: "How often do you publish new content?",
                answer: "We publish new blog posts weekly and release new volumes monthly. Subscribe to our newsletter to stay updated!"
              },
              {
                question: "Are your volumes available in print?",
                answer: "Currently, our volumes are available as digital downloads. We're exploring print options for the future."
              },
              {
                question: "Can I request prayer for specific situations?",
                answer: "Absolutely! Visit our Prayer Request page to submit your prayer needs. All requests are kept confidential."
              },
              {
                question: "Do you offer speaking engagements?",
                answer: "Yes, we're available for speaking at churches, conferences, and retreats. Please contact us for more information."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="card"
                style={{ marginBottom: '1rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                  {faq.question}
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;