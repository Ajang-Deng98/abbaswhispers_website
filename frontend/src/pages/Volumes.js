import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { volumeAPI } from '../utils/api';
import { useRealTimeData } from '../hooks/useRealTimeData';
import LoadingSpinner from '../components/LoadingSpinner';

const Volumes = () => {
  const [volumes, setVolumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [audioProgress, setAudioProgress] = useState({});
  const [audioDuration, setAudioDuration] = useState({});
  const [loading, setLoading] = useState(true);

  const loadVolumes = useCallback(async () => {
    setLoading(true);
    
    try {
      const params = selectedCategory === 'all' ? {} : { category: selectedCategory };
      console.log('Loading volumes with params:', params);
      const response = await volumeAPI.getAllVolumes(params);
      
      console.log('Volumes API response:', response);
      
      if (response && response.data) {
        const volumesData = Array.isArray(response.data) ? response.data : response.data.results || [];
        setVolumes(volumesData);
        console.log('Loaded', volumesData.length, 'volumes from database');
      } else {
        setVolumes([]);
      }
    } catch (error) {
      console.error('Error loading volumes:', error);
      // Set empty array on error to show "Coming Soon" message
      setVolumes([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadVolumes();
  }, [loadVolumes]);

  // Real-time updates every 30 seconds
  useRealTimeData(loadVolumes, [selectedCategory], 30000);

  const categories = [
    { value: 'all', label: 'All Collections' },
    { value: 'thanksgiving', label: 'Thanksgiving' },
    { value: 'wonder', label: 'Wonder' },
    { value: 'faith', label: 'Faith' },
    { value: 'contemplation', label: 'Contemplation' },
    { value: 'reflection', label: 'Reflection' }
  ];

  const getCategoryCount = (categoryValue) => {
    if (categoryValue === 'all') return volumes.length;
    return volumes.filter(v => v.category === categoryValue).length;
  };

  const filteredVolumes = selectedCategory === 'all' 
    ? volumes 
    : volumes.filter(volume => volume.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>SELAH Poetry Series - Abbaswhispers | Premium Poetry Collection</title>
        <meta name="description" content="Discover Uzo's acclaimed SELAH poetry series. Premium collection of inspirational poems with professional audio recordings, born from a journey of faith and healing." />
      </Helmet>

      {/* Hero Section */}
      <section className="volumes-hero" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&w=2071&q=80") center/cover no-repeat',
        color: '#ffffff',
        padding: '150px 1rem 5rem 1rem',
        textAlign: 'center',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <motion.div
            className="volumes-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '400',
              marginBottom: '1.5rem',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>SELAH - My Debut Poetry Series</h1>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: '1.7',
              padding: '0 1rem'
            }}>Immerse yourself in my debut collection of inspirational poetry, each piece carefully crafted from a journey through grief into grace. Experience the power of spoken word with professional audio narrations that bring every emotion to life.</p>
            <div className="volumes-stats" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: 'clamp(1rem, 3vw, 3rem)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <div className="stat-item">
                <span className="stat-number">{volumes.length}</span>
                <span className="stat-label">Poems</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Audio</span>
                <span className="stat-label">Included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="volumes-filter">
        <div className="container">
          <motion.div
            className="filter-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Browse Collections</h2>
            <div className="category-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`category-card ${selectedCategory === category.value ? 'active' : ''}`}
                >
                  <span className="category-label">{category.label}</span>
                  <span className="category-count">{getCategoryCount(category.value)}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volumes Grid */}
      <section className="volumes-content">
        <div className="container">
          {loading ? (
            <LoadingSpinner message="Loading poetry collections..." />
          ) : (
            filteredVolumes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <h3 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>Coming Soon</h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                  Our SELAH poetry collection is being prepared for you. Subscribe to our newsletter to be notified when new volumes are available.
                </p>
                <a href="/contact" style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '12px 24px',
                  background: 'var(--primary-gold)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  fontWeight: '500'
                }}>Get Notified</a>
              </div>
            ) : (
            <div className="volumes-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {filteredVolumes.map((volume, index) => (
              <motion.div
                key={volume.id}
                className="volume-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {volume.image && (
                  <div className="volume-image">
                    <img 
                      src={volume.image.startsWith('http') ? volume.image : `http://localhost:8000${volume.image}`}
                      alt={volume.title}
                      onError={(e) => {
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                    <div className="volume-overlay">
                      <button 
                        className="preview-btn"
                        onClick={() => setSelectedVolume(volume)}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                )}
                <div className="volume-content">
                  <h3 className="volume-title">{volume.title}</h3>
                  <div className="volume-description">
                    {volume.description}
                  </div>
                  <div className="volume-actions" style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    <button 
                      className="btn-primary"
                      onClick={() => setSelectedVolume(volume)}
                    >
                      Read Full Poem
                    </button>
                    <div className="audio-controls">
                      <button 
                        className="btn-secondary audio-btn"
                        onClick={() => {
                          const audio = document.getElementById(`audio-${volume.id}`);
                          
                          if (playingAudio && playingAudio !== volume.id) {
                            const otherAudio = document.getElementById(`audio-${playingAudio}`);
                            if (otherAudio) {
                              otherAudio.pause();
                              otherAudio.currentTime = 0;
                            }
                            setPlayingAudio(null);
                          }
                          
                          if (audio) {
                            if (audio.paused) {
                              audio.play().then(() => {
                                setPlayingAudio(volume.id);
                              }).catch((error) => {
                                console.error('Audio play error:', error);
                              });
                            } else {
                              audio.pause();
                              setPlayingAudio(null);
                            }
                          }
                        }}
                      >
                        {playingAudio === volume.id ? '⏸️ Pause' : '▶️ Listen'}
                      </button>
                      {playingAudio === volume.id && (
                        <div className="audio-progress" style={{
                          width: '100%',
                          height: '4px',
                          background: '#e0e0e0',
                          borderRadius: '2px',
                          marginTop: '0.5rem',
                          overflow: 'hidden'
                        }}>
                          <div 
                            className="progress-bar"
                            style={{
                              width: `${audioProgress[volume.id] || 0}%`,
                              height: '100%',
                              background: 'var(--primary-gold)',
                              transition: 'width 0.1s ease'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Audio Element */}
                <audio 
                  id={`audio-${volume.id}`}
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    setAudioDuration(prev => ({
                      ...prev,
                      [volume.id]: e.target.duration
                    }));
                  }}
                  onTimeUpdate={(e) => {
                    const progress = (e.target.currentTime / e.target.duration) * 100;
                    setAudioProgress(prev => ({
                      ...prev,
                      [volume.id]: progress
                    }));
                  }}
                  onEnded={() => {
                    setPlayingAudio(null);
                    setAudioProgress(prev => ({
                      ...prev,
                      [volume.id]: 0
                    }));
                  }}
                  onError={() => {
                    setPlayingAudio(null);
                    console.error('Error loading audio file for volume:', volume.id);
                  }}
                >
                  <source 
                    src={volume.audio_file ? 
                      (volume.audio_file.startsWith('http') ? volume.audio_file : `http://localhost:8000${volume.audio_file}`) :
                      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
                    }
                    type="audio/mpeg" 
                  />
                </audio>
              </motion.div>
              ))}
            </div>
            )
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedVolume && (
        <div className="volume-modal" onClick={() => setSelectedVolume(null)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{
            background: 'white',
            borderRadius: '16px',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button className="modal-close" onClick={() => setSelectedVolume(null)}>×</button>
            <h2>{selectedVolume.title}</h2>
            <div className="modal-poem">
              {selectedVolume.content ? 
                <div dangerouslySetInnerHTML={{ __html: selectedVolume.content }} /> :
                (selectedVolume.fullText || selectedVolume.full_text)
              }
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="volumes-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Complete SELAH Collection</h2>
            <p>Experience the full journey with professional recordings and beautiful illustrations.</p>
            <a href="/contact" className="btn-cta">Get Notified</a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Volumes;