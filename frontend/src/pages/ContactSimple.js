import React, { useState } from 'react';

const ContactSimple = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#d4af37' }}>
        Contact Us
      </h1>
      
      {submitted ? (
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#155724', margin: '0 0 0.5rem 0' }}>Thank You!</h3>
          <p style={{ color: '#155724', margin: 0 }}>
            Your message has been received. We'll get back to you soon at info@abbawhispers.com
          </p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
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
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
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
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
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
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            backgroundColor: '#d4af37',
            color: 'white',
            padding: '0.75rem 2rem',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3 style={{ color: '#d4af37' }}>Other Ways to Reach Us</h3>
        <p>Email: info@abbawhispers.com</p>
        <p>Prayer Requests: prayer@abbawhispers.com</p>
      </div>
    </div>
  );
};

export default ContactSimple;