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
    isAnonymous: false,
    allowSharing: false
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
    
    try {
      await prayerAPI.submitRequest(formData);
      setSubmitMessage('Your prayer request has been received. We are praying for you!');
      setFormData({
        name: '',
        email: '',
        category: '',
        request: '',
        isAnonymous: false,
        allowSharing: false
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
        <title>Prayer Request - Abba Whispers | Submit Your Prayer Needs</title>
        <meta name="description" content="Submit your prayer requests to Abba Whispers. Our prayer team is committed to lifting up your needs in prayer. All requests are kept confidential." />
      </Helmet>

      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Prayer Request</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              "Therefore I tell you, whatever you ask for in prayer, believe that you have 
              received it, and it will be yours." - Mark 11:24
            </p>
          </motion.div>

          <div className="grid grid-2" style={{ marginTop: '4rem', gap: '4rem' }}>
            {/* Prayer Request Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="card">
                <h2>Submit Your Prayer Request</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
                  We believe in the power of prayer and would be honored to pray for you. 
                  All requests are kept confidential and handled with care.
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name or 'Anonymous'"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid var(--cream)',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-gold)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--cream)'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="For prayer updates (optional)"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid var(--cream)',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-gold)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--cream)'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Prayer Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid var(--cream)',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        backgroundColor: 'white',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-gold)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--cream)'}
                    >
                      <option value="">Select a category</option>
                      <option value="healing">Healing & Health</option>
                      <option value="family">Family & Relationships</option>
                      <option value="financial">Financial Needs</option>
                      <option value="guidance">Guidance & Direction</option>
                      <option value="salvation">Salvation</option>
                      <option value="grief">Grief & Loss</option>
                      <option value="thanksgiving">Thanksgiving & Praise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Prayer Request *
                    </label>
                    <textarea
                      name="request"
                      value={formData.request}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Please share your prayer request. Be as specific or general as you feel comfortable."
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid var(--cream)',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        resize: 'vertical',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-gold)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--cream)'}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
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
                        name="allowSharing"
                        checked={formData.allowSharing}
                        onChange={handleChange}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>Allow sharing for group prayer (anonymous)</span>
                    </label>
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
                    {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
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

            {/* Prayer Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="card">
                <h2>Our Prayer Commitment</h2>
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>Dedicated Prayer Team</h3>
                  <p>
                    Our prayer team meets regularly to lift up every request we receive. 
                    Your needs become our prayers.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>Complete Confidentiality</h3>
                  <p>
                    All prayer requests are kept strictly confidential. Only our prayer 
                    team has access to your requests.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>Immediate Prayer</h3>
                  <p>
                    We begin praying for your request as soon as we receive it. 
                    God hears every prayer immediately.
                  </p>
                </div>

                <div>
                  <h3 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>Follow-up (Optional)</h3>
                  <p>
                    If you provide your email, we may send encouraging messages 
                    or prayer updates, but this is completely optional.
                  </p>
                </div>
              </div>

              {/* Scripture Encouragement */}
              <div className="card" style={{ marginTop: '2rem', background: 'var(--cream)' }}>
                <h3>Scripture Encouragement</h3>
                <blockquote style={{ 
                  fontStyle: 'italic', 
                  fontSize: '1.1rem',
                  color: 'var(--deep-blue)',
                  textAlign: 'center',
                  margin: '1rem 0'
                }}>
                  "Do not be anxious about anything, but in every situation, by prayer 
                  and petition, with thanksgiving, present your requests to God. And the 
                  peace of God, which transcends all understanding, will guard your hearts 
                  and your minds in Christ Jesus."
                  <br />
                  <strong>- Philippians 4:6-7</strong>
                </blockquote>
              </div>

              {/* Emergency Prayer */}
              <div className="card" style={{ marginTop: '2rem', background: 'var(--light-olive)', color: 'white' }}>
                <h3>Urgent Prayer Needs?</h3>
                <p>
                  For urgent prayer requests, you can also call our prayer line at 
                  <strong> +1 (555) PRAY-NOW</strong> or email us directly at 
                  <strong> urgent@abbawhispers.com</strong>
                </p>
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

          <div className="grid grid-3" style={{ marginTop: '3rem' }}>
            {[
              {
                text: "I submitted a prayer request for my job situation, and within two weeks, I received an unexpected job offer. God is faithful!",
                author: "Sarah M."
              },
              {
                text: "The prayer team prayed for my mother's healing, and her doctors were amazed at her recovery. Thank you for your faithful prayers.",
                author: "David L."
              },
              {
                text: "During my darkest hour, knowing that people were praying for me gave me hope and strength to continue. Prayer changes everything.",
                author: "Anonymous"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                  "{testimonial.text}"
                </p>
                <div style={{ textAlign: 'right', fontWeight: '500', color: 'var(--primary-gold)' }}>
                  - {testimonial.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PrayerRequest;