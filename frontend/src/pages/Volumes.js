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
      <section style={{
        background: '#ffffff',
        padding: '120px 1rem 80px 1rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: '300',
              marginBottom: '2rem',
              color: '#333',
              lineHeight: '1.3',
              letterSpacing: '0.5px'
            }}>SELAH</h1>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: '300',
              marginBottom: '3rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 3rem',
              lineHeight: '1.8'
            }}>A collection of poetry born from the sacred pause between heartbreak and healing, where silence becomes song.</p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{
        background: '#f9f9f9',
        padding: '60px 1rem'
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '1.5rem',
              fontWeight: '300',
              marginBottom: '2rem',
              color: '#555'
            }}>Explore by Theme</h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  style={{
                    background: selectedCategory === category.value ? '#333' : 'transparent',
                    color: selectedCategory === category.value ? 'white' : '#666',
                    border: '1px solid #ddd',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '300',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Crimson Pro, serif'
                  }}
                >
                  {category.label} ({getCategoryCount(category.value)})
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {filteredVolumes.map((volume, index) => (
              <motion.div
                key={volume.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '0',
                  padding: '2rem',
                  border: 'none',
                  borderBottom: '1px solid #eee',
                  transition: 'all 0.3s ease'
                }}
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
                <div>
                  <h3 style={{
                    fontFamily: 'Crimson Pro, serif',
                    fontSize: '1.3rem',
                    fontWeight: '300',
                    marginBottom: '1rem',
                    color: '#333'
                  }}>{volume.title}</h3>
                  <div style={{
                    fontFamily: 'Crimson Pro, serif',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: '#666',
                    marginBottom: '1.5rem',
                    fontWeight: '300'
                  }}>
                    {volume.description}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button 
                      onClick={() => setSelectedVolume(volume)}
                      style={{
                        background: 'transparent',
                        color: '#333',
                        border: '1px solid #ddd',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '300',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontFamily: 'Crimson Pro, serif'
                      }}
                    >
                      Read Poem
                    </button>
                    <div className="audio-controls">
                      <button 
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
                        style={{
                          background: playingAudio === volume.id ? '#333' : 'transparent',
                          color: playingAudio === volume.id ? 'white' : '#666',
                          border: '1px solid #ddd',
                          padding: '0.6rem 1.5rem',
                          borderRadius: '25px',
                          fontSize: '0.9rem',
                          fontWeight: '300',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontFamily: 'Crimson Pro, serif'
                        }}
                      >
                        {playingAudio === volume.id ? 'Pause' : 'Listen'}
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
      <section style={{
        background: '#f9f9f9',
        padding: '80px 1rem',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '1.8rem',
              fontWeight: '300',
              marginBottom: '1.5rem',
              color: '#333'
            }}>The Complete Collection</h2>
            <p style={{
              fontFamily: 'Crimson Pro, serif',
              fontSize: '1.1rem',
              fontWeight: '300',
              marginBottom: '2rem',
              color: '#666',
              lineHeight: '1.7'
            }}>Be among the first to experience the full SELAH journey when it becomes available.</p>
            <a href="/contact" style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#333',
              border: '1px solid #ddd',
              padding: '0.8rem 2rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '300',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontFamily: 'Crimson Pro, serif'
            }}>Stay Connected</a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Volumes;