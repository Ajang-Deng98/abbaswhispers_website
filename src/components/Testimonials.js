import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Cape Town, South Africa",
      text: "Uzo's SELAH poems have been a beacon of hope during my darkest moments. Her words speak directly to the heart and remind me that I'm not alone in my struggles.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael K.",
      location: "Lagos, Nigeria",
      text: "The authenticity in Uzo's writing is incredible. You can feel the pain, the healing, and the hope in every line. These poems have helped me process my own grief.",
      rating: 5
    },
    {
      id: 3,
      name: "Grace O.",
      location: "Nairobi, Kenya",
      text: "I listen to the audio recordings every morning. Uzo's voice brings such peace and comfort. It's like having a friend who truly understands your journey.",
      rating: 5
    },
    {
      id: 4,
      name: "David L.",
      location: "Johannesburg, South Africa",
      text: "As a pastor, I've shared these poems with my congregation. They resonate with people from all walks of life. Truly inspired by the Holy Spirit.",
      rating: 5
    },
    {
      id: 5,
      name: "Ruth A.",
      location: "Accra, Ghana",
      text: "The SELAH series helped me find my voice again after losing my husband. Uzo's journey from grief to grace gives me hope for my own healing.",
      rating: 5
    },
    {
      id: 6,
      name: "James T.",
      location: "London, UK",
      text: "These aren't just poems - they're prayers, they're conversations with God. The 'selah' moments truly make you pause and reflect on God's goodness.",
      rating: 5
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--warm-cream)' }}>
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            color: 'var(--primary-gold)'
          }}>
            Hearts Touched by SELAH
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            maxWidth: '600px', 
            margin: '0 auto 3rem',
            color: 'var(--text-medium)'
          }}>
            Hear from readers whose lives have been transformed by Uzo's heartfelt poetry and authentic journey of faith.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 8px 30px var(--shadow-warm)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Quote decoration */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '20px',
                fontSize: '3rem',
                color: 'rgba(212, 175, 55, 0.2)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1
              }}>
                "
              </div>

              {/* Stars */}
              <div style={{ 
                display: 'flex', 
                gap: '3px', 
                marginBottom: '1rem',
                justifyContent: 'center'
              }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ 
                    color: 'var(--primary-gold)', 
                    fontSize: '1.2rem' 
                  }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial text */}
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.7',
                color: 'var(--text-dark)',
                fontStyle: 'italic',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1
              }}>
                {testimonial.text}
              </p>

              {/* Author info */}
              <div style={{ 
                textAlign: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <h4 style={{ 
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--primary-gold)',
                  marginBottom: '0.25rem'
                }}>
                  {testimonial.name}
                </h4>
                <p style={{ 
                  fontSize: '0.85rem',
                  color: 'var(--text-light)',
                  margin: 0
                }}>
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          style={{ marginTop: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p style={{ 
            fontSize: '1rem',
            color: 'var(--text-medium)',
            marginBottom: '1.5rem'
          }}>
            Join thousands of readers finding hope and healing through the SELAH series
          </p>
          <a 
            href="/volumes" 
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              fontSize: '0.95rem',
              fontWeight: '500',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, var(--primary-gold) 0%, var(--warm-gold) 100%)',
              border: 'none',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
            }}
          >
            Experience SELAH Poetry
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;