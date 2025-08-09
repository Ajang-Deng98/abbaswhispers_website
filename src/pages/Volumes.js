import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Volumes = () => {
  const [volumes, setVolumes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    setVolumes([
      {
        id: 1,
        title: "YOU ARE MY HIDING PLACE",
        description: "A powerful poem about finding refuge in God during troubled times.",
        category: "healing",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=center",
        excerpt: "When my heart is troubled, Heavy from the weight of my sins, I turn to You Lord God...",
        price: "Preview",
        downloadLink: "#",
        type: "poem",
        fullText: `When my heart is troubled 
Heavy from the weight of my sins
I turn to You Lord God
For Your unending peace of mind
(selah)
When I am troubled by the evils of the world 
From hurt and pain, deceit and betrayal
I turn to You O Lord
For You are my hiding place
My Deliverer, My Fortress I trust in You
(selah)
I will call upon You Abba and I know You will save me 
In the evening I explain my need to You
And in the morning I move my soul towards You
In my waking hour I worship You... 
You alone You are my hiding place, Yahweh, my place of refuge
I will trust in You completely and forever
Amen.`,
        audioUrl: "/audio/hiding-place.mp3"
      },
      {
        id: 2,
        title: "HIS UNFAILING LOVE",
        description: "A celebration of God's miraculous power and unfailing love.",
        category: "worship",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop&crop=center",
        excerpt: "You are the God of miracles, The God of my ancestors, The Lord God of power and might...",
        price: "Preview",
        downloadLink: "#",
        type: "poem",
        fullText: `You are the God of miracles 
The God of my ancestors 
The Lord God of power and might
The God of grace full of mercy
All nations bow to Your immense glory 
See the display of His radiant presence
Shining through
(selah)
You are my God, my King You are victorious
Your name is Awesome Your name is Glorious
All-Powerful and Majestic
I can boast that God is God Almighty!
(selah)
My path is clear and I stand upright in Your presence
I am claimed and held in Your embrace
I stand unashamed before my King 
Cleansed and forgiven of all my sins I am looked upon with a loving gaze
Oh!!!
See how He watches over me
My steps remain firmly rooted in His righteousness I am not alone
His unfailing love saves me. Amen.`,
        audioUrl: "/audio/unfailing-love.mp3"
      },
      {
        id: 3,
        title: "I AM NO LONGER AFRAID",
        description: "A declaration of fearlessness and abundance in God's love.",
        category: "empowerment",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=center",
        excerpt: "I am the Lord's Beloved, He is my Shepherd and I am His flock, I lack for nothing...",
        price: "Preview",
        downloadLink: "#",
        type: "poem",
        fullText: `I am the Lord's Beloved
He is my Shepherd and I am His flock
I lack for nothing
He takes care of all my needs
All of them? 
Yes, every last one
I am led to rest near quiet waters and I am at peace
I am revived and restored
My life is refreshed 
I am guided down the path of righteousness
My life is a living testimony to His honour 
I stand fearless, yes, fearless as I walk through valleys of fear
of anxiety
of phobias 
and of procrastination 
(selah)
I am a conqueror
I am an overcomer
I rest under the Lord's authority 
I have His strength and peace
I am comforted by Yahweh's love 
I am no longer afraid
I am abundance 
My soul is focused on the Lord
I am filled with good things
I lack for nothing
I am filled by the fragrance of the Holy Spirit
I am truly His anointed one
I live in the overflow of Yahweh's mercy
My soul is awash with joy and I dance in His presence
For I am unafraid 
I am in the presence of Yahweh's kindness and mercy to me for all of my days
I declare myself the Lord's own 
Forever and ever
Amen.`,
        audioUrl: "/audio/no-longer-afraid.mp3"
      },
      {
        id: 4,
        title: "THE THING ABOUT FAITH IS...",
        description: "A profound reflection on the nature of faith and choosing the unseen.",
        category: "faith",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=400&fit=crop&crop=center",
        excerpt: "Faith does not live in the House of Certainty, It dwells in the nooks and crannies of the unseen...",
        price: "Preview",
        downloadLink: "#",
        type: "poem",
        fullText: `Faith does not live in the House of Certainty
It dwells in the nooks and crannies of the unseen 
Things hoped for... 
(selah) 
When we choose faith we are saying
That we are okay to face whatever the outcome 
success or failure 
When we choose faith
we choose to log out of the pre-destined path of the Matrix 
To the road that leads to Abba, the perfect source
Choose faith and see your outcome unfold with lessons worth a lifetime. 
Amen.`,
        audioUrl: "/audio/faith.mp3"
      }
    ]);
  }, []);

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
                  {volume.fullText.split('\n').slice(0, 8).join('\n')}...
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
                    📖 Read Full Poem
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      const audio = document.getElementById(`audio-${volume.id}`);
                      const button = e.target;
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
                          
                          audio.play().then(() => {
                            button.textContent = '⏸️ Pause Audio';
                          }).catch(() => {
                            alert('Audio file not available yet');
                          });
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
                    🎵 Listen to Audio
                  </button>
                </div>

                <audio 
                  id={`audio-${volume.id}`}
                  preload="metadata"
                  style={{ display: 'none' }}
                  onEnded={() => {
                    const button = document.querySelector(`[onclick*="audio-${volume.id}"]`);
                    if (button) button.textContent = '🎵 Listen';
                  }}
                >
                  <source src={volume.audioUrl} type="audio/mpeg" />
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
                      {volume.fullText}
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