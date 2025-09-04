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
  const slideImages = [img1, img2, img3, img4, img5];

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
        fontFamily: 'Space Grotesk, sans-serif'
      }}>
        
        {/* Hero Section */}
        <div style={{
          padding: '2rem 0',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                marginBottom: '0.5rem', 
                color: '#000',
                fontWeight: '800',
                letterSpacing: '-0.02em'
              }}>Abba's Whispers</h1>
              <div style={{
                width: '80px',
                height: '4px',
                background: 'var(--primary-gold)',
                margin: '0.8rem auto',
                borderRadius: '2px'
              }} />
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#6b7280', 
                fontWeight: '400',
                fontStyle: 'italic',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                An online space for poetry conversations, born from a journey through grief and grace.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.5rem 2rem'
        }}>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'relative',
              marginBottom: '2rem',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <img 
              src={aboutImage} 
              alt="Uzo - Founder of Abba's Whispers"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '60vh',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '2rem',
              color: 'white'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                margin: '0 0 0.5rem 0'
              }}>Founder, Resident Poet</h2>
              <p style={{
                fontSize: '1rem',
                opacity: 0.9,
                margin: 0
              }}>Creating sacred spaces for healing through words</p>
            </div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '2rem' }}
          >
            <h2 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem', 
              color: '#000',
              fontWeight: '700'
            }}>Founder, Resident Poet</h2>
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.7',
              color: '#374151',
              margin: 0
            }}>
              My name is Uzo and I am the founder of <strong style={{color: 'var(--primary-gold)'}}>Abba's Whispers</strong>. I am also a mum, a singer-songwriter and an education leader.
            </p>
          </motion.div>

          {/* Modern Slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ 
              marginBottom: '1.5rem', 
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
            }}
          >
            <img 
              src={slideImages[currentSlide]}
              alt={`Uzo ${currentSlide + 1}`}
              style={{
                width: '100%',
                height: '70vh',
                objectFit: 'cover'
              }}
            />
            <button 
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                color: '#000',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              ‹
            </button>
            <button 
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                color: '#000',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              ›
            </button>
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px'
            }}>
              {slideImages.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* The SELAH Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: '2rem' }}
          >
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1.2rem', 
              color: '#000',
              fontWeight: '700'
            }}>The SELAH Journey</h2>
            <div style={{ lineHeight: '1.7' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#374151' }}>
                My poetry series is called <strong style={{color: 'var(--primary-gold)'}}>SELAH</strong>. This series played a pivotal role in 
                helping me grow from grief. I lost my beloved husband in 2015 from a devastating illness. 
                I was in shock for a very long time. I went into a space of denial and closed up my 
                feelings for everything.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#374151' }}>
                The only things that kept me going were looking after our children and speaking to God, 
                who I call 'Abba,' meaning Father. Though for a couple of years, I'm not sure I was 
                speaking — I raged and cried and shouted at Him for many years. He listened…He held me…
                He shouted back occasionally…Most importantly…He let me be.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: 0, color: '#374151' }}>
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
            style={{ marginBottom: '2rem' }}
          >
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1.2rem', 
              color: '#000',
              fontWeight: '700'
            }}>From Pain to Purpose</h2>
            <div style={{ lineHeight: '1.7' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#374151' }}>
                These writings come from time with myself and Abba. I realized that whenever I 
                stepped into moments of despair, anguish and pain... I would fall into writing to 
                express my heart. The early writings were influenced by reading the Psalms of the 
                Bible and then very soon, I found my own voice of expression.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#374151' }}>
                You will find the word <strong style={{color: 'var(--primary-gold)'}}>"selah"</strong> sprinkled throughout these poems…
                Use those moments to pause and reflect on your feelings.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: 0, color: '#374151' }}>
                Today, I am deeply grateful for these words of truth in my life. My wish for 
                anyone who reads them is that it brings you to a grace-filled encounter with God. 
                A moment to experience His presence in your life everyday.
              </p>
            </div>
          </motion.div>



          {/* Closing Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ 
              textAlign: 'center', 
              padding: '2rem 0',
              marginBottom: '1rem'
            }}
          >
            <blockquote style={{ 
              fontSize: '1.4rem', 
              fontStyle: 'italic', 
              color: '#1f2937',
              marginBottom: '1.5rem',
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              "My wish for anyone who reads these words is that it brings you to a 
              grace-filled encounter with God. A moment to experience His presence 
              in your life everyday."
            </blockquote>
            <p style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: 'var(--primary-gold)',
              marginBottom: '2rem'
            }}>- Uzo, Founder</p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap'
            }}>
              <a href="/volumes" style={{
                background: 'var(--primary-gold)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}>Explore SELAH Series</a>
              <a href="/prayer-request" style={{
                border: '2px solid var(--primary-gold)',
                color: 'var(--primary-gold)',
                background: 'transparent',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}>Share Your Heart</a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;