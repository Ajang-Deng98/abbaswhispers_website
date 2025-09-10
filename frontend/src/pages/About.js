import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import aboutImage from '../assets/images/about.jpg';
import img1 from '../assets/images/GCQ28997-Edit.jpg';
import img2 from '../assets/images/GCQ28999-Edit.jpg';
import img3 from '../assets/images/GCQ29003-Edit.jpg';
import img4 from '../assets/images/GCQ29069-Edit.jpg';
import img5 from '../assets/images/GCQ29078-Edit.jpg';
import img6 from '../assets/images/GCQ29088-Edit.jpg';
import img7 from '../assets/images/GCQ29179-Edit.jpg';
import img8 from '../assets/images/GCQ29182-Edit.jpg';
import img9 from '../assets/images/GCQ29192-Edit.jpg';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

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

      {/* Full Width Layout */}
      <div style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: 'Space Grotesk, sans-serif',
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        
        {/* Full Width Hero Section */}
        <div style={{
          padding: 0,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)'
        }}>
          <div style={{
            width: '100%',
            margin: 0,
            padding: '1rem 2rem',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5rem)', 
                marginBottom: '1rem', 
                color: '#000',
                fontWeight: '800',
                letterSpacing: '-0.02em'
              }}>Abba's Whispers</h1>
              <div style={{
                width: '120px',
                height: '6px',
                background: 'var(--primary-gold)',
                margin: '1rem auto',
                borderRadius: '3px'
              }} />
              <p style={{ 
                fontSize: '1.3rem', 
                color: '#6b7280', 
                fontWeight: '400',
                fontStyle: 'italic',
                width: '100%',
                margin: '0',
                lineHeight: '1.6'
              }}>
                An online space for poetry conversations, born from a journey through grief and grace.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Full Width Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            marginBottom: '3rem',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            overflow: 'hidden'
          }}
        >
          <img 
            src={aboutImage} 
            alt="Uzo - Founder of Abba's Whispers"
            style={{
              width: '100%',
              height: '150vh',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            padding: '3rem 2rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>Founder, Resident Poet</h2>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>Creating sacred spaces for healing through words</p>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          padding: 0
        }}>
          <div style={{
            width: '100%',
            margin: 0,
            padding: '1rem 2rem'
          }}>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ marginBottom: '4rem', textAlign: 'center' }}
            >
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1.5rem', 
                color: '#000',
                fontWeight: '700'
              }}>Founder, Resident Poet</h2>
              <p style={{ 
                fontSize: '1.4rem', 
                lineHeight: '1.8',
                color: '#374151',
                margin: '0',
                width: '100%'
              }}>
                My name is Uzo and I am the founder of <strong style={{color: 'var(--primary-gold)'}}>Abba's Whispers</strong>. I am also a mum, a singer-songwriter and an education leader.
              </p>
            </motion.div>

            {/* The SELAH Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ marginBottom: '4rem' }}
            >
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '2rem', 
                color: '#000',
                fontWeight: '700',
                textAlign: 'center'
              }}>The SELAH Journey</h2>
              <div style={{ lineHeight: '1.8', width: '100%', margin: '0' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#374151', textAlign: 'justify' }}>
                  My poetry series is called <strong style={{color: 'var(--primary-gold)'}}>SELAH</strong>. This series played a pivotal role in 
                  helping me grow from grief. I lost my beloved husband in 2015 from a devastating illness. 
                  I was in shock for a very long time. I went into a space of denial and closed up my 
                  feelings for everything.
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#374151', textAlign: 'justify' }}>
                  The only things that kept me going were looking after our children and speaking to God, 
                  who I call 'Abba,' meaning Father. Though for a couple of years, I'm not sure I was 
                  speaking — I raged and cried and shouted at Him for many years. He listened…He held me…
                  He shouted back occasionally…Most importantly…He let me be.
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: 0, color: '#374151', textAlign: 'justify' }}>
                  In 2021, my Abba asked me to come out of the shadows.. to begin once again to live a 
                  life of purpose and destiny. I have wondered for a long time what this message meant to me. 
                  I have always wrestled with my identity.. Who am I? What am I? What am I called to do 
                  in this world? What do I have to offer to my fellow human beings?
                </p>
              </div>
            </motion.div>

            {/* From Pain to Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ marginBottom: '4rem' }}
            >
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '2rem', 
                color: '#000',
                fontWeight: '700',
                textAlign: 'center'
              }}>From Pain to Purpose</h2>
              <div style={{ lineHeight: '1.8', width: '100%', margin: '0' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#374151', textAlign: 'justify' }}>
                  These writings come from time with myself and Abba. I realized that whenever I 
                  stepped into moments of despair, anguish and pain... I would fall into writing to 
                  express my heart. The early writings were influenced by reading the Psalms of the 
                  Bible and then very soon, I found my own voice of expression.
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#374151', textAlign: 'justify' }}>
                  You will find the word <strong style={{color: 'var(--primary-gold)'}}>"selah"</strong> sprinkled throughout these poems…
                  Use those moments to pause and reflect on your feelings.
                </p>
                <p style={{ fontSize: '1.2rem', marginBottom: 0, color: '#374151', textAlign: 'justify' }}>
                  Today, I am deeply grateful for these words of truth in my life. My wish for 
                  anyone who reads them is that it brings you to a grace-filled encounter with God. 
                  A moment to experience His presence in your life everyday.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full Width Modern Slideshow - Moved to second last */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ 
            margin: 0, 
            position: 'relative',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            overflow: 'hidden'
          }}
        >
          <img 
            src={slideImages[currentSlide]}
            alt={`Uzo ${currentSlide + 1}`}
            style={{
              width: '100%',
              height: '160vh',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              display: 'block'
            }}
          />
          <button 
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.9)',
              color: '#000',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
          >
            ‹
          </button>
          <button 
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.9)',
              color: '#000',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              fontSize: '20px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
          >
            ›
          </button>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 10
          }}>
            {slideImages.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(248, 249, 250, 0.8) 100%)',
          padding: 0
        }}>
          <div style={{
            width: '100%',
            margin: 0,
            padding: '2rem'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <blockquote style={{ 
                fontSize: '1.8rem', 
                fontStyle: 'italic', 
                color: '#1f2937',
                marginBottom: '2rem',
                lineHeight: '1.7',
                fontWeight: '500',
                width: '100%',
                margin: '0 0 2rem 0'
              }}>
                "My wish for anyone who reads these words is that it brings you to a 
                grace-filled encounter with God. A moment to experience His presence 
                in your life everyday."
              </blockquote>
              <p style={{ 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                color: 'var(--primary-gold)',
                marginBottom: '3rem'
              }}>- Uzo, Founder</p>
              
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap'
              }}>
                <a href="/volumes" style={{
                  background: 'var(--primary-gold)',
                  color: 'white',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}>Explore SELAH Series</a>
                <a href="/prayer-request" style={{
                  border: '2px solid var(--primary-gold)',
                  color: 'var(--primary-gold)',
                  background: 'transparent',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}>Share Your Heart</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;