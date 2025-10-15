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
        background: 'var(--gradient-whisper)',
        minHeight: '100vh',
        fontFamily: 'Source Serif Pro, serif',
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        
        {/* Full Width Hero Section */}
        <div style={{
          padding: '150px 0 5rem 0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center'
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
                fontFamily: 'Crimson Pro, serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)', 
                marginBottom: '2rem', 
                color: 'var(--text-primary)',
                fontWeight: '300',
                letterSpacing: '0.2px',
                lineHeight: '1.1'
              }}>Abba's Whispers</h1>

              <p style={{ 
                fontFamily: 'Crimson Pro, serif',
                fontSize: '1.4rem', 
                color: 'var(--text-secondary)', 
                fontWeight: '300',
                fontStyle: 'italic',
                width: '100%',
                margin: '0',
                lineHeight: '1.8',
                maxWidth: '800px'
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
              fontFamily: 'Crimson Text, serif',
              fontSize: '2.2rem',
              fontWeight: '600',
              margin: '0 0 1rem 0',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
            }}>Founder, Resident Poet</h2>
            <p style={{
              fontFamily: 'Source Serif Pro, serif',
              fontSize: '1.1rem',
              opacity: 0.9,
              margin: 0,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
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
                fontFamily: 'Crimson Text, serif',
                fontSize: '2.2rem', 
                marginBottom: '1.5rem', 
                color: 'var(--soft-blue)',
                fontWeight: '600'
              }}>Founder, Resident Poet</h2>
              <p style={{ 
                fontFamily: 'Source Serif Pro, serif',
                fontSize: '1.3rem', 
                lineHeight: '1.8',
                color: 'var(--text-gentle)',
                margin: '0',
                width: '100%'
              }}>
                My name is Uzo and I am the founder of <strong style={{color: 'var(--primary-soft)'}}>Abba's Whispers</strong>. I am also a mum, a singer-songwriter and an education leader.
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
                fontFamily: 'Crimson Text, serif',
                fontSize: '2.2rem', 
                marginBottom: '2rem', 
                color: 'var(--soft-blue)',
                fontWeight: '600',
                textAlign: 'center'
              }}>The SELAH Journey</h2>
              <div style={{ lineHeight: '1.8', width: '100%', margin: '0' }}>
                <p style={{ fontFamily: 'Source Serif Pro, serif', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-gentle)', textAlign: 'justify', lineHeight: '1.8' }}>
                  My poetry series is called <strong style={{color: 'var(--primary-soft)'}}>SELAH</strong>. This series played a pivotal role in 
                  helping me grow from grief. I lost my beloved husband in 2015 from a devastating illness. 
                  I was in shock for a very long time. I went into a space of denial and closed up my 
                  feelings for everything.
                </p>
                <p style={{ fontFamily: 'Source Serif Pro, serif', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-gentle)', textAlign: 'justify', lineHeight: '1.8' }}>
                  The only things that kept me going were looking after our children and speaking to God, 
                  who I call 'Abba,' meaning Father. Though for a couple of years, I'm not sure I was 
                  speaking — I raged and cried and shouted at Him for many years. He listened…He held me…
                  He shouted back occasionally…Most importantly…He let me be.
                </p>
                <p style={{ fontFamily: 'Source Serif Pro, serif', fontSize: '1.1rem', marginBottom: 0, color: 'var(--text-gentle)', textAlign: 'justify', lineHeight: '1.8' }}>
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
                fontFamily: 'Crimson Text, serif',
                fontSize: '2.2rem', 
                marginBottom: '2rem', 
                color: 'var(--soft-blue)',
                fontWeight: '600',
                textAlign: 'center'
              }}>From Pain to Purpose</h2>
              <div style={{ lineHeight: '1.8', width: '100%', margin: '0' }}>
                <p style={{ fontFamily: 'Source Serif Pro, serif', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-gentle)', textAlign: 'justify', lineHeight: '1.8' }}>
                  These writings come from time with myself and Abba. I realized that whenever I 
                  stepped into moments of despair, anguish and pain... I would fall into writing to 
                  express my heart. The early writings were influenced by reading the Psalms of the 
                  Bible and then very soon, I found my own voice of expression.
                </p>
                <p style={{ fontFamily: 'Source Serif Pro, serif', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-gentle)', textAlign: 'justify', lineHeight: '1.8' }}>
                  You will find the word <strong style={{color: 'var(--primary-soft)'}}>"selah"</strong> sprinkled throughout these poems…
                  Use those moments to pause and reflect on your feelings.
                </p>
                <p style={{ fontFamily: 'Source Serif Pro, serif', fontSize: '1.1rem', marginBottom: 0, color: 'var(--text-gentle)', textAlign: 'justify', lineHeight: '1.8' }}>
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
          background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.08) 0%, rgba(250, 248, 245, 0.9) 100%)',
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
                fontFamily: 'Crimson Text, serif',
                fontSize: '1.6rem', 
                fontStyle: 'italic', 
                color: 'var(--soft-blue)',
                marginBottom: '2rem',
                lineHeight: '1.8',
                fontWeight: '400',
                width: '100%',
                margin: '0 0 2rem 0'
              }}>
                "My wish for anyone who reads these words is that it brings you to a 
                grace-filled encounter with God. A moment to experience His presence 
                in your life everyday."
              </blockquote>
              <p style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.1rem', 
                fontWeight: '500', 
                color: 'var(--primary-soft)',
                marginBottom: '3rem'
              }}>- Uzo, Founder</p>
              
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap'
              }}>
                <a href="/volumes" style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'var(--primary-soft)',
                  color: 'white',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 3px 12px var(--shadow-gentle)'
                }}>Explore SELAH Series</a>
                <a href="/prayer-request" style={{
                  fontFamily: 'Inter, sans-serif',
                  border: '1px solid var(--primary-soft)',
                  color: 'var(--primary-soft)',
                  background: 'transparent',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
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