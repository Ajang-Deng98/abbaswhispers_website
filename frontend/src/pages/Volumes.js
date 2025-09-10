import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { volumeAPI } from '../utils/api';

const Volumes = () => {
  const [volumes, setVolumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);

  useEffect(() => {
    loadVolumes();
  }, [selectedCategory]);

  const loadVolumes = async () => {
    try {
      const params = selectedCategory === 'all' ? {} : { category: selectedCategory };
      const response = await volumeAPI.getAllVolumes(params);
      
      let volumesData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          volumesData = response.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          volumesData = response.data.results;
        }
      }
      
      console.log('API Response:', response.data);
      console.log('Loaded volumes:', volumesData);
      setVolumes(volumesData);
    } catch (error) {
      console.error('Error loading volumes:', error);
      setVolumes([]);
    }
  };

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
        padding: 'clamp(2rem, 5vw, 4rem) 1rem',
        textAlign: 'center',
        minHeight: '50vh',
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
            <div className="hero-badge" style={{ background: 'var(--primary-gold)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '25px', display: 'inline-block', marginBottom: '2rem' }}>
              Premium Poetry Collection
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              marginBottom: '1rem',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>SELAH - My Debut Poetry Series</h1>
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              marginBottom: '2rem',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: '1.6',
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
          {filteredVolumes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <h3 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>No Volumes Found</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                {selectedCategory === 'all' 
                  ? 'No volumes have been added yet. Check back soon!' 
                  : `No volumes found in the ${selectedCategory} category.`
                }
              </p>
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
                    {volume.audio_file && (
                      <button 
                        className="btn-secondary audio-btn"
                        onClick={(e) => {
                          const audio = document.getElementById(`audio-${volume.id}`);
                          const button = e.target;
                          
                          if (playingAudio && playingAudio !== volume.id) {
                            // Stop other playing audio
                            const otherAudio = document.getElementById(`audio-${playingAudio}`);
                            if (otherAudio) {
                              otherAudio.pause();
                              otherAudio.currentTime = 0;
                            }
                            // Reset other button text
                            const otherButton = document.querySelector(`[data-volume-id="${playingAudio}"]`);
                            if (otherButton) otherButton.textContent = 'Listen';
                          }
                          
                          if (audio) {
                            if (audio.paused) {
                              audio.play().then(() => {
                                button.textContent = 'Pause';
                                setPlayingAudio(volume.id);
                              }).catch((error) => {
                                console.error('Audio play error:', error);
                                alert('Unable to play audio file.');
                              });
                            } else {
                              audio.pause();
                              audio.currentTime = 0;
                              button.textContent = 'Listen';
                              setPlayingAudio(null);
                            }
                          }
                        }}
                        data-volume-id={volume.id}
                      >
                        {playingAudio === volume.id ? 'Pause' : 'Listen'}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Hidden Audio Element */}
                {volume.audio_file && (
                  <audio 
                    id={`audio-${volume.id}`}
                    preload="none"
                    onEnded={() => {
                      const button = document.querySelector(`[data-volume-id="${volume.id}"]`);
                      if (button) button.textContent = 'Listen';
                      setPlayingAudio(null);
                    }}
                    onError={() => {
                      const button = document.querySelector(`[data-volume-id="${volume.id}"]`);
                      if (button) button.textContent = 'Listen';
                      setPlayingAudio(null);
                      alert('Error loading audio file.');
                    }}
                  >
                    <source 
                      src={volume.audio_file.startsWith('http') ? volume.audio_file : `http://localhost:8000${volume.audio_file}`}
                      type="audio/mpeg" 
                    />
                  </audio>
                )}
              </motion.div>
              ))}
            </div>
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