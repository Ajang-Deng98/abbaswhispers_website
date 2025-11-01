import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  
  return (
    <>
      <Helmet>
        <title>About Uzo - Christian Poet & Founder of Abba's Whispers | SELAH Series Creator</title>
        <meta name="description" content="Meet Uzo, acclaimed Christian poet and founder of Abba's Whispers. Discover her transformative journey from devastating loss to spiritual healing through the SELAH poetry series." />
        <meta name="keywords" content="Uzo poet, Christian poet biography, SELAH series creator, spiritual healing journey, grief to grace, faith poetry" />
      </Helmet>

      <div style={{
        backgroundColor: '#faf9f7',
        minHeight: '100vh',
        fontFamily: 'Georgia, serif'
      }}>
        
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'url("/hero-image-aboutpage.JPG") center/cover no-repeat',
          backgroundAttachment: 'fixed'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '48px',
              fontWeight: 'normal',
              color: '#000000',
              marginBottom: '30px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>
              About Uzo
            </h1>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              color: '#000000',
              lineHeight: '1.6',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textShadow: '2px 2px 4px rgba(255,255,255,0.9)'
            }}>
              Founder of Abba's Whispers, poet, mother, and seeker of sacred conversations
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section style={{
          padding: '0 0 80px',
          background: '#ffffff'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 2rem' }}>
            
            {/* Opening with Side Image */}
            <div style={{ marginBottom: '60px', position: 'relative' }}>
              <img 
                src="/GCQ28999-Edit.jpg" 
                alt="Uzo in contemplation"
                style={{
                  float: 'right',
                  width: '300px',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  marginLeft: '40px',
                  marginBottom: '20px'
                }}
              />
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#2c2c2c',
                marginBottom: '30px',
                fontWeight: 'normal'
              }}>
                My name is Uzo and I am the founder of <em>Abba's Whispers</em>. I am also a mother, 
                a singer-songwriter, and an education leader.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#2c2c2c',
                marginBottom: '30px',
                fontWeight: 'normal'
              }}>
                This space was born from a journey through grief and grace, a testament to the 
                healing power of words and the sacred conversations that emerge when we dare 
                to speak our truth.
              </p>
            </div>

            {/* The SELAH Journey */}
            <div style={{ marginBottom: '60px', position: 'relative' }}>
              {/* Background image for this section */}
              {window.innerWidth > 768 && (
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-60px',
                  width: '200px',
                  height: '300px',
                  backgroundImage: 'url("/GCQ29003-Edit.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.1,
                  borderRadius: '8px',
                  zIndex: -1
                }} />
              )}
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '30px',
                lineHeight: '1.3'
              }}>
                The SELAH Journey
              </h2>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                My poetry series is called <em>SELAH</em>. This series played a pivotal role in 
                helping me grow from grief. I lost my beloved husband in 2015 from a devastating illness. 
                I was in shock for a very long time. I went into a space of denial and closed up my 
                feelings for everything.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                The only things that kept me going were looking after our children and speaking to God, 
                who I call 'Abba,' meaning Father. Though for a couple of years, I'm not sure I was 
                speaking — I raged and cried and shouted at Him for many years. He listened… He held me… 
                He shouted back occasionally… Most importantly… He let me be.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                In 2021, my Abba asked me to come out of the shadows… to begin once again to live a 
                life of purpose and destiny. I have wondered for a long time what this message meant to me. 
                I have always wrestled with my identity… Who am I? What am I? What am I called to do 
                in this world? What do I have to offer to my fellow human beings?
              </p>
            </div>

            {/* Image Gallery */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '60px'
            }}>
              <img 
                src="/GCQ29069-Edit.jpg" 
                alt="Contemplative moment"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: 0.8
                }}
              />
              <img 
                src="/GCQ29078-Edit.jpg" 
                alt="Peaceful reflection"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: 0.8
                }}
              />
              <img 
                src="/GCQ29088-Edit.jpg" 
                alt="Sacred space"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  opacity: 0.8
                }}
              />
            </div>

            {/* From Pain to Purpose */}
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '30px',
                lineHeight: '1.3'
              }}>
                From Pain to Purpose
              </h2>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                Through the darkness of loss, I discovered that poetry could be a bridge between 
                the seen and unseen, the spoken and unspoken. Each word became a step toward healing, 
                each verse a conversation with the divine.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                <em>Abba's Whispers</em> is more than a collection of poems—it is an invitation to join 
                a sacred conversation, to find your own voice in the silence, and to discover that 
                even in our deepest grief, we are never truly alone.
              </p>
            </div>

            {/* What SELAH Means */}
            <div style={{ 
              background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '8px',
              marginBottom: '60px'
            }}>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '22px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                What is SELAH?
              </h3>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#666666',
                textAlign: 'center',
                fontStyle: 'italic',
                margin: 0
              }}>
                SELAH is a Hebrew word found throughout the Psalms, meaning "pause and reflect." 
                It invites us to stop, breathe deeply, and allow the words to settle into our souls. 
                In our hurried world, SELAH reminds us that healing happens in the pauses, 
                in the sacred spaces between words.
              </p>
            </div>

            {/* The Heart Behind Our Words */}
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '30px',
                lineHeight: '1.3'
              }}>
                The Heart Behind Our Words
              </h2>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                Each reflection shared here emerges from the sacred intersection of scripture and lived experience. 
                These writings are born from quiet moments of prayer, seasons of questioning, and the gentle whispers 
                that come when we dare to listen with our whole hearts.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                We believe that in sharing our spiritual journey—the struggles alongside the victories—we create 
                space for others to find their own path to healing and hope.
              </p>
            </div>

            {/* Our Writing Process */}
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '30px',
                lineHeight: '1.3'
              }}>
                Our Writing Process
              </h2>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                Every piece begins in silence—in those sacred pauses where the soul speaks louder than words. 
                We write not from a place of having all the answers, but from the honest acknowledgment of our questions, 
                our longings, and our discoveries along the way.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                Drawing deeply from the Psalms—those ancient songs of lament and praise—we explore themes of 
                grief and gratitude, doubt and faith, isolation and communion. Each reflection is an invitation 
                to pause, to breathe, to remember that we are not alone in our spiritual journey.
              </p>
            </div>

            {/* Personal Touch */}
            <div>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                marginBottom: '25px',
                fontWeight: 'normal'
              }}>
                Today, I continue to write, to sing, to teach, and to mother. But most importantly, 
                I continue to listen for those whispers—those gentle nudges from Abba that remind me 
                I am loved, I am held, and I am never alone.
              </p>
              
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#666666',
                fontWeight: 'normal'
              }}>
                If you are walking through your own valley, if you are searching for words to express 
                the inexpressible, or if you simply long for a sacred conversation, I invite you to 
                pause here with me. Let us listen together for the whispers that heal.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section style={{
          background: 'linear-gradient(rgba(248, 249, 250, 0.95), rgba(248, 249, 250, 0.95)), url("/GCQ29179-Edit.jpg") center/cover no-repeat',
          padding: '80px 2rem',
          textAlign: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <blockquote style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#2c2c2c',
              lineHeight: '1.5',
              fontWeight: 'normal',
              marginBottom: '20px',
              margin: 0
            }}>
              "In the silence between words, we find the space where healing begins."
            </blockquote>
            <cite style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              color: '#8b7355',
              fontStyle: 'normal',
              display: 'block',
              marginTop: '20px'
            }}>
              — Uzo, Founder of Abba's Whispers
            </cite>
          </div>
        </section>

        {/* Connect Section */}
        <section style={{
          padding: '80px 2rem',
          background: 'linear-gradient(rgba(44, 44, 44, 0.9), rgba(44, 44, 44, 0.9)), url("/GCQ29192-Edit.jpg") center/cover no-repeat',
          color: '#ffffff',
          textAlign: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              fontWeight: 'normal',
              marginBottom: '20px'
            }}>
              Join the Conversation
            </h2>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '30px',
              opacity: 0.9
            }}>
              Whether you're seeking comfort, inspiration, or simply a place to pause and reflect, 
              you're welcome in this sacred space.
            </p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px', 
              flexWrap: 'wrap',
              flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
              alignItems: 'center'
            }}>
              <a href="/volumes" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid #ffffff',
                borderRadius: '4px',
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                Read Poetry
              </a>
              <a href="/contact" style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: '#8b7355',
                color: '#ffffff',
                border: '1px solid #8b7355',
                borderRadius: '4px',
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;