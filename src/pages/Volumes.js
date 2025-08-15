import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { volumeAPI } from '../utils/api';

const Volumes = () => {
  const [volumes, setVolumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadVolumes();
  }, [selectedCategory]);

  const loadVolumes = async () => {
    try {
      const response = await volumeAPI.getAllVolumes({ category: selectedCategory });
      setVolumes(response.data || []);
    } catch (error) {
      console.error('Error loading volumes:', error);
      setVolumes([]);
    }
  };

  const categories = [
    { value: 'all', label: 'All Poems' },
    { value: 'healing', label: 'Healing' },
    { value: 'empowerment', label: 'Empowerment' },
    { value: 'worship', label: 'Worship' },
    { value: 'faith', label: 'Faith' }
  ];

  const filteredVolumes = selectedCategory === 'all' 
    ? volumes 
    : volumes.filter(volume => volume.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>SELAH Poetry Series - Abba Whispers | Poems with Audio by Uzo</title>
        <meta name="description" content="Experience Uzo's SELAH poetry series with audio recordings. Listen to heartfelt poems from a journey through grief into grace, inspired by the Psalms." />
      </Helmet>

      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>SELAH Poetry Series</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              Experience Uzo's heartfelt poems from the SELAH series - writings born from 
              a journey through grief into grace. Read the poems and listen to Uzo's own voice 
              bringing these powerful words to life.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="text-center"
            style={{ margin: '3rem 0' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`btn ${selectedCategory === category.value ? '' : 'btn-secondary'}`}
                  style={{ minWidth: '120px' }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Volumes Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {filteredVolumes.map((volume, index) => (
              <motion.div
                key={volume.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ 
                  padding: '2rem',
                  textAlign: 'center',
                  minHeight: '420px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {volume.image && (
                  <img 
                    src={volume.image.startsWith('http') ? volume.image : `http://localhost:5003${volume.image}`} 
                    alt={volume.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <h3 style={{ 
                  color: 'var(--primary-gold)', 
                  marginBottom: '1rem',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>{volume.title}</h3>
                
                <div style={{ 
                  fontSize: '0.95rem', 
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  whiteSpace: 'pre-line',
                  color: 'var(--text-medium)',
                  marginBottom: 'auto',
                  padding: '1.5rem',
                  background: 'rgba(249, 247, 244, 0.6)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  fontFamily: 'Georgia, serif',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {volume.content ? 
                    volume.content.replace(/<[^>]*>/g, '').split('\n').slice(0, 8).join('\n') + '...' :
                    (volume.fullText || volume.description || '').split('\n').slice(0, 8).join('\n') + '...'
                  }
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '1.5rem'
                }}>
                  <button 
                    onClick={() => {
                      const modal = document.getElementById(`modal-${volume.id}`);
                      if (modal) modal.style.display = 'block';
                    }}
                    style={{ 
                      width: '100%',
                      padding: '12px 24px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '25px',
                      background: 'linear-gradient(135deg, var(--primary-gold) 0%, var(--warm-gold) 100%)',
                      border: 'none',
                      color: 'white',
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
                    Read Full Poem
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      const audio = document.getElementById(`audio-${volume.id}`);
                      const button = e.target;
                      const audioUrl = volume.audio_url || volume.audioUrl;
                      
                      if (!audioUrl) {
                        alert('No audio file available for this volume.');
                        return;
                      }
                      
                      if (audio) {
                        if (audio.paused) {
                          document.querySelectorAll('audio').forEach(a => {
                            if (a !== audio) {
                              a.pause();
                              a.currentTime = 0;
                            }
                          });
                          document.querySelectorAll('button').forEach(btn => {
                            if (btn.textContent.includes('⏸️')) {
                              btn.textContent = '🎵 Listen to Audio';
                            }
                          });
                          
                          // Load the audio first
                          audio.load();
                          
                          // Wait a moment for loading then play
                          setTimeout(() => {
                            audio.play().then(() => {
                              button.textContent = '⏸️ Pause Audio';
                            }).catch((error) => {
                              console.error('Audio play error:', error);
                              console.log('Audio URL:', audioUrl);
                              console.log('Audio readyState:', audio.readyState);
                              console.log('Audio networkState:', audio.networkState);
                              
                              // Try direct browser navigation to test
                              const testUrl = volume.audio_url ? `http://localhost:5003${volume.audio_url}` : audioUrl;
                              console.log('Test this URL directly in browser:', testUrl);
                              
                              alert(`Audio playback failed. Try opening this URL directly: ${testUrl}`);
                            });
                          }, 100);
                        } else {
                          audio.pause();
                          audio.currentTime = 0;
                          button.textContent = '🎵 Listen to Audio';
                        }
                      }
                    }}
                    style={{ 
                      width: '100%',
                      padding: '12px 24px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '25px',
                      background: 'transparent',
                      border: '2px solid var(--primary-gold)',
                      color: 'var(--primary-gold)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--primary-gold)';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--primary-gold)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Listen to Audio
                  </button>
                </div>

                <audio 
                  id={`audio-${volume.id}`}
                  preload="none"
                  style={{ display: 'none' }}
                  crossOrigin="anonymous"
                  onEnded={() => {
                    const buttons = document.querySelectorAll('button');
                    buttons.forEach(btn => {
                      if (btn.textContent.includes('⏸️')) {
                        btn.textContent = '🎵 Listen to Audio';
                      }
                    });
                  }}
                  onError={(e) => {
                    console.error('Audio element error:', e);
                  }}
                  onLoadStart={() => {
                    console.log('Audio loading started');
                  }}
                >
                  <source src={
                    volume.audio_url ? `http://localhost:5003${volume.audio_url}` : 
                    volume.audioUrl ? (volume.audioUrl.startsWith('http') ? volume.audioUrl : `http://localhost:5003${volume.audioUrl}`) :
                    null
                  } type="audio/mpeg" />
                </audio>

                {/* Modal */}
                <div 
                  id={`modal-${volume.id}`}
                  style={{
                    display: 'none',
                    position: 'fixed',
                    zIndex: 1000,
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)'
                  }}
                  onClick={(e) => {
                    if (e.target.id === `modal-${volume.id}`) {
                      e.target.style.display = 'none';
                    }
                  }}
                >
                  <div style={{
                    backgroundColor: 'white',
                    margin: '5% auto',
                    padding: '40px',
                    borderRadius: '15px',
                    width: '90%',
                    maxWidth: '700px',
                    maxHeight: '80%',
                    overflowY: 'auto',
                    position: 'relative'
                  }}>
                    <button 
                      onClick={() => document.getElementById(`modal-${volume.id}`).style.display = 'none'}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        background: 'none',
                        border: 'none',
                        fontSize: '30px',
                        cursor: 'pointer',
                        color: 'var(--text-light)'
                      }}
                    >
                      ×
                    </button>
                    <h2 style={{ 
                      marginBottom: '40px', 
                      color: 'var(--primary-gold)', 
                      textAlign: 'center',
                      fontSize: '1.6rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}>{volume.title}</h2>
                    <div style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.8',
                      whiteSpace: 'pre-line',
                      fontFamily: 'Georgia, serif',
                      color: 'var(--text-dark)',
                      textAlign: 'center',
                      maxWidth: '600px',
                      margin: '0 auto'
                    }}>
                      {volume.content ? 
                        <div dangerouslySetInnerHTML={{ __html: volume.content }} /> :
                        (volume.fullText || volume.description || 'Content not available')
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredVolumes.length === 0 && (
            <motion.div
              className="text-center"
              style={{ marginTop: '3rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>No poems found in this category. Please try another category.</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Complete SELAH Collection Coming Soon</h2>
            <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Experience the full journey through dozens more poems, professional audio recordings, 
              and beautiful illustrations in the complete SELAH book.
            </p>
            <a href="/contact" className="btn">Get Notified When Available</a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Volumes;