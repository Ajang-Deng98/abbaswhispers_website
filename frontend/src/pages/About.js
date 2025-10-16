import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const aboutImage = '/about.jpg';
const img1 = '/GCQ28997-Edit.jpg';
const img2 = '/GCQ28999-Edit.jpg';
const img3 = '/GCQ29003-Edit.jpg';
const img4 = '/GCQ29069-Edit.jpg';
const img5 = '/GCQ29078-Edit.jpg';
const img6 = '/GCQ29088-Edit.jpg';
const img7 = '/GCQ29179-Edit.jpg';
const img8 = '/GCQ29182-Edit.jpg';
const img9 = '/GCQ29192-Edit.jpg';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slideImages = [aboutImage, img1, img2, img3, img4, img5, img6, img7, img8, img9];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  return (
    <>
      <Helmet>
        <title>About Uzo - Abbaswhispers | From Grief to Grace Through Poetry</title>
        <meta name="description" content="Meet Uzo, founder of Abbaswhispers and creator of the SELAH poetry series. A journey from devastating loss to finding purpose through faith and reflective writing." />
      </Helmet>

      <div style={{
        backgroundColor: '#fefefe',
        minHeight: '100vh',
        fontFamily: 'Georgia, serif',
        color: '#5a5a5a'
      }}>
        
        {/* Hero Section */}
        <section style={{
          padding: isMobile ? '100px 0 60px 0' : '120px 0 80px 0',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '300',
              color: '#4a4a4a',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em',
              lineHeight: '1.2'
            }}
          >
            About Uzo
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: '#777',
              lineHeight: '1.6',
              fontStyle: 'italic',
              marginBottom: '2.5rem',
              fontWeight: '300'
            }}
          >
            Founder of Abba's Whispers, poet, mother, and seeker of sacred conversations
          </motion.p>
        </section>

        {/* Main Content with Image Slider */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem 60px 1rem' : '0 2rem 80px 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '450px 1fr',
              gap: isMobile ? '2rem' : '4rem',
              alignItems: 'start'
            }}
          >
            {/* Image Slider */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
              }}>
                <img 
                  src={slideImages[currentSlide]}
                  alt={`Uzo - Image ${currentSlide + 1}`}
                  style={{
                    width: '100%',
                    height: isMobile ? '300px' : '520px',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease'
                  }}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: isMobile ? '40px' : '50px',
                    height: isMobile ? '40px' : '50px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '18px' : '22px',
                    color: '#555',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ‹
                </button>
                
                <button
                  onClick={nextSlide}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: isMobile ? '40px' : '50px',
                    height: isMobile ? '40px' : '50px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '18px' : '22px',
                    color: '#555',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ›
                </button>
              </div>
              
              {/* Dots Indicator */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '15px'
              }}>
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      background: currentSlide === index ? '#666' : '#ddd',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
              
              {/* Small Gallery Preview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginTop: '20px'
              }}>
                {slideImages.slice(1, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index + 1}`}
                    onClick={() => setCurrentSlide(index + 1)}
                    style={{
                      width: '100%',
                      height: isMobile ? '60px' : '90px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      opacity: currentSlide === index + 1 ? 1 : 0.7,
                      transition: 'all 0.3s ease',
                      border: currentSlide === index + 1 ? '2px solid #666' : '2px solid transparent'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div>
              <p style={{
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                My name is Uzo and I am the founder of <em>Abba's Whispers</em>. I am also a mother, 
                a singer-songwriter, and an education leader.
              </p>
              
              <p style={{
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                This space was born from a journey through grief and grace, a testament to the 
                healing power of words and the sacred conversations that emerge when we dare 
                to speak our truth.
              </p>

              <h2 style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                fontWeight: '300',
                color: '#555',
                marginBottom: '1.5rem'
              }}>
                The SELAH Journey
              </h2>
              
              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                My poetry series is called <em>SELAH</em>. This series played a pivotal role in 
                helping me grow from grief. I lost my beloved husband in 2015 from a devastating illness. 
                I was in shock for a very long time. I went into a space of denial and closed up my 
                feelings for everything.
              </p>
              
              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                The only things that kept me going were looking after our children and speaking to God, 
                who I call 'Abba,' meaning Father. Though for a couple of years, I'm not sure I was 
                speaking — I raged and cried and shouted at Him for many years. He listened… He held me… 
                He shouted back occasionally… Most importantly… He let me be.
              </p>
              
              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                In 2021, my Abba asked me to come out of the shadows… to begin once again to live a 
                life of purpose and destiny. I have wondered for a long time what this message meant to me. 
                I have always wrestled with my identity… Who am I? What am I? What am I called to do 
                in this world? What do I have to offer to my fellow human beings?
              </p>

              <h2 style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                fontWeight: '300',
                color: '#555',
                marginBottom: '1.5rem'
              }}>
                From Pain to Purpose
              </h2>
              
              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                Through the darkness of loss, I discovered that poetry could be a bridge between 
                the seen and unseen, the spoken and unspoken. Each word became a step toward healing, 
                each verse a conversation with the divine.
              </p>
              
              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '1.5rem',
                fontWeight: '300'
              }}>
                <em>Abba's Whispers</em> is more than a collection of poems—it is an invitation to join 
                a sacred conversation, to find your own voice in the silence, and to discover that 
                even in our deepest grief, we are never truly alone.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Quote Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 1rem' : '80px 2rem',
          textAlign: 'center'
        }}>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontStyle: 'italic',
              color: '#777',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '300'
            }}
          >
            "In the silence between words, we find the space where healing begins."
          </motion.blockquote>
        </section>
      </div>
    </>
  );
};

export default About;