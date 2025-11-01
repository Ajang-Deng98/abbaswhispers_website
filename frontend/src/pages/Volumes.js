import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { volumeAPI, subscriberAPI } from '../utils/api';
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
  const [signupForm, setSignupForm] = useState({ name: '', email: '', message: '' });
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');

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

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingSignup(true);
    setSignupMessage('');
    
    try {
      const response = await subscriberAPI.subscribe({
        email: signupForm.email,
        name: signupForm.name
      });
      if (response.data.message && response.data.message.includes('already subscribed')) {
        setSignupMessage('📬 You are already subscribed! Thank you for your continued support.');
      } else {
        setSignupMessage('🎉 Success! Thank you for signing up for volume updates. You\'ll be the first to know when the five new SELAH collections are released.');
      }
      setSignupForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Signup form submission error:', error);
      if (error.response?.data?.message?.includes('already subscribed')) {
        setSignupMessage('📬 You are already subscribed! Thank you for your continued support.');
        setSignupForm({ name: '', email: '', message: '' });
      } else {
        setSignupMessage('There was an error with your signup. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmittingSignup(false);
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
      <section style={{
        background: 'url("/heroimage-volumepage.JPG") center/cover no-repeat',
        padding: '180px 2rem 120px 2rem',
        textAlign: 'center',
        color: '#ffffff',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 'normal',
              marginBottom: '1.5rem',
              color: '#000000',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>SELAH</h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '0',
              color: '#000000',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>Poetry born from the sacred pause between heartbreak and healing, where silence becomes song.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '5rem 2rem'
      }}>
        
        {/* Introduction Section */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
            gap: '4rem',
            alignItems: 'start'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '1.2rem',
                lineHeight: '1.2'
              }}>The SELAH Collection</h2>
            </div>
            <div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                SELAH—a Hebrew word meaning "pause and reflect"—invites us into the sacred spaces between words, between breaths, between heartbreak and hope.
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '2rem',
                fontWeight: 'normal'
              }}>
                These collections emerged from a journey through profound loss, each poem a stepping stone across the river of grief toward the shores of grace.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          marginBottom: '5rem',
          border: '1px solid rgba(201, 169, 110, 0.2)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.8rem',
            fontWeight: 'normal',
            color: '#2c2c2c',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>Five New Volumes Coming Soon</h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#666666',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            We're preparing five new poetry collections that will take you deeper into the sacred pause of SELAH. Be the first to know when they're released.
          </p>
          <form onSubmit={handleSignupSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={handleSignupChange}
              placeholder="Your name"
              required
              style={{
                fontFamily: 'Georgia, serif',
                padding: '1rem 0',
                border: 'none',
                borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
                fontSize: '1rem',
                fontWeight: 'normal',
                width: '100%',
                outline: 'none',
                background: 'transparent'
              }}
            />
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              placeholder="Email address"
              required
              style={{
                fontFamily: 'Georgia, serif',
                padding: '1rem 0',
                border: 'none',
                borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
                fontSize: '1rem',
                fontWeight: 'normal',
                width: '100%',
                outline: 'none',
                background: 'transparent'
              }}
            />
            <textarea
              name="message"
              value={signupForm.message}
              onChange={handleSignupChange}
              placeholder="Tell us about your interest in the upcoming volumes..."
              rows="4"
              style={{
                fontFamily: 'Georgia, serif',
                padding: '1rem 0',
                border: 'none',
                borderBottom: '1px solid rgba(201, 169, 110, 0.3)',
                fontSize: '1rem',
                fontWeight: 'normal',
                width: '100%',
                outline: 'none',
                background: 'transparent',
                resize: 'vertical'
              }}
            />
            <button
              type="submit"
              disabled={isSubmittingSignup}
              style={{
                fontFamily: 'Georgia, serif',
                padding: '1rem 2rem',
                border: '1px solid #c9a96e',
                background: isSubmittingSignup ? '#c9a96e' : 'transparent',
                color: isSubmittingSignup ? 'white' : '#c9a96e',
                fontSize: '1rem',
                fontWeight: 'normal',
                cursor: isSubmittingSignup ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                alignSelf: 'center',
                opacity: isSubmittingSignup ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmittingSignup) {
                  e.target.style.background = '#c9a96e';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmittingSignup) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#c9a96e';
                }
              }}
            >
              {isSubmittingSignup ? 'Signing Up...' : 'Sign Up for Updates'}
            </button>
            
            {signupMessage && (
              <div style={{ 
                padding: '1rem',
                backgroundColor: signupMessage.includes('error') ? '#ffebee' : '#f0f8f0',
                color: signupMessage.includes('error') ? '#c62828' : '#2e7d32',
                fontSize: '0.9rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                {signupMessage}
              </div>
            )}
          </form>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.9rem',
            color: '#999999',
            marginTop: '1rem',
            fontStyle: 'italic'
          }}>Join our community of poetry lovers and spiritual seekers</p>
        </section>

        {/* Category Filter */}
        <section style={{
          borderTop: '1px solid #e8e8e8',
          paddingTop: '5rem',
          marginBottom: '5rem'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  style={{
                    fontFamily: 'Georgia, serif',
                    padding: '0',
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    border: 'none',
                    background: 'none',
                    color: selectedCategory === category.value ? '#2c2c2c' : '#999999',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    borderBottom: selectedCategory === category.value ? '1px solid #2c2c2c' : 'none'
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volumes List */}
          {loading ? (
            <LoadingSpinner message="Loading poetry collections..." />
          ) : (
            filteredVolumes.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 0',
                borderTop: '1px solid #f0f0f0'
              }}>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 'normal',
                  color: '#2c2c2c',
                  marginBottom: '1rem'
                }}>Coming Soon</h3>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.1rem',
                  color: '#666666',
                  lineHeight: '1.7',
                  maxWidth: '500px',
                  margin: '0 auto 2rem'
                }}>Our SELAH poetry collection is being prepared with care. Each poem is a sacred offering, and we want to ensure they reach you at the perfect moment.</p>
                <a href="/contact" style={{
                  fontFamily: 'Georgia, serif',
                  padding: '1rem 2rem',
                  border: '1px solid #8b7355',
                  background: 'transparent',
                  color: '#8b7355',
                  fontSize: '1rem',
                  fontWeight: 'normal',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>Stay Connected</a>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
              }}>
                {filteredVolumes.map((volume, index) => (
                  <motion.div
                    key={volume.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      borderBottom: '1px solid #f0f0f0',
                      padding: '4rem 0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: window.innerWidth > 768 ? '1fr 2fr' : '1fr',
                      gap: '3rem',
                      alignItems: 'start'
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '1.2rem',
                          fontWeight: 'normal',
                          marginBottom: '0.8rem',
                          lineHeight: '1.3',
                          color: '#2c2c2c'
                        }}>{volume.title}</h3>
                        
                        <div style={{
                          display: 'flex',
                          gap: '1rem',
                          marginTop: '2rem'
                        }}>
                          <button 
                            onClick={() => setSelectedVolume(volume)}
                            style={{
                              fontFamily: 'Georgia, serif',
                              padding: '0.5rem 1.5rem',
                              border: '1px solid #8b7355',
                              background: 'transparent',
                              color: '#8b7355',
                              fontSize: '0.9rem',
                              fontWeight: 'normal',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#8b7355';
                              e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.color = '#8b7355';
                            }}
                          >
                            Read
                          </button>
                          
                          {volume.audio_file && (
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
                                fontFamily: 'Georgia, serif',
                                padding: '0.5rem 1.5rem',
                                border: '1px solid #8b7355',
                                background: playingAudio === volume.id ? '#8b7355' : 'transparent',
                                color: playingAudio === volume.id ? 'white' : '#8b7355',
                                fontSize: '0.9rem',
                                fontWeight: 'normal',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              {playingAudio === volume.id ? 'Pause' : 'Listen'}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <p style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '0.9rem',
                          lineHeight: '1.7',
                          color: '#666666',
                          fontWeight: 'normal'
                        }}>
                          {volume.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Audio Element */}
                    {volume.audio_file && (
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
                          src={volume.audio_file.startsWith('http') ? volume.audio_file : `http://localhost:8000${volume.audio_file}`}
                          type="audio/mpeg" 
                        />
                      </audio>
                    )}
                  </motion.div>
                ))}
              </div>
            )
          )}
        </section>
      </div>

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


    </>
  );
};

export default Volumes;