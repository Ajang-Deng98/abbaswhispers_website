import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { volumeAPI } from '../utils/api';

const Volumes = () => {
  const [volumes, setVolumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVolume, setSelectedVolume] = useState(null);

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
    { value: 'all', label: 'All Collections', icon: '📚' },
    { value: 'healing', label: 'Healing', icon: '🌿' },
    { value: 'empowerment', label: 'Empowerment', icon: '✨' },
    { value: 'worship', label: 'Worship', icon: '🙏' },
    { value: 'faith', label: 'Faith', icon: '💫' }
  ];

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
      <section className="volumes-hero">
        <div className="container">
          <motion.div
            className="volumes-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="volumes-hero-badge">Premium Poetry Collection</div>
            <h1>The SELAH Series</h1>
            <p>A curated collection of inspirational poetry born from a journey through grief into grace. Each piece includes professional audio narration by the author.</p>
            <div className="volumes-stats">
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
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`category-card ${selectedCategory === category.value ? 'active' : ''}`}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                  <span className="category-count">
                    {category.value === 'all' ? volumes.length : volumes.filter(v => v.category === category.value).length}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Volumes Grid */}
      <section className="volumes-content">
        <div className="container">
          <div className="volumes-grid">
            {filteredVolumes.map((volume, index) => (
              <motion.div
                key={volume.id}
                className="volume-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="volume-image">
                  {volume.image ? (
                    <img 
                      src={volume.image.startsWith('http') ? volume.image : `http://localhost:5003${volume.image}`} 
                      alt={volume.title}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  ) : (
                    <div className="volume-placeholder">
                      <span>📖</span>
                    </div>
                  )}
                  <div className="volume-overlay">
                    <button className="preview-btn" onClick={() => setSelectedVolume(volume)}>
                      Preview
                    </button>
                  </div>
                </div>

                <div className="volume-content">
                  <h3 className="volume-title">{volume.title}</h3>
                  <div className="volume-excerpt">
                    {volume.content ? 
                      volume.content.replace(/<[^>]*>/g, '').split('\n').slice(0, 4).join('\n') + '...' :
                      (volume.fullText || volume.description || 'A beautiful piece from the SELAH collection...').split('\n').slice(0, 4).join('\n') + '...'
                    }
                  </div>
                  <div className="volume-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => setSelectedVolume(volume)}
                    >
                      Read Full Poem
                    </button>
                    <button 
                      className="btn-secondary audio-btn"
                      onClick={(e) => {
                        // Audio functionality here
                      }}
                    >
                      🎵 Listen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedVolume && (
        <div className="volume-modal" onClick={() => setSelectedVolume(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedVolume(null)}>×</button>
            <h2>{selectedVolume.title}</h2>
            <div className="modal-poem">
              {selectedVolume.content ? 
                <div dangerouslySetInnerHTML={{ __html: selectedVolume.content }} /> :
                (selectedVolume.fullText || selectedVolume.description || 'Content not available')
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