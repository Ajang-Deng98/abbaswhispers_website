import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Uzo - Abba Whispers | From Grief to Grace Through Poetry</title>
        <meta name="description" content="Meet Uzo, founder of Abba Whispers and creator of the SELAH poetry series. A journey from devastating loss to finding purpose through faith and reflective writing." />
      </Helmet>

      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About Abba Whispers</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
              An online space for poetry and reflective conversations, born from a journey 
              through grief into grace.
            </p>
          </motion.div>

          <div className="grid grid-2" style={{ marginTop: '4rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="/aboutimage.jpg" 
                alt="Uzo - Founder of Abba Whispers"
                style={{ width: '100%', borderRadius: '10px', boxShadow: '0 8px 25px var(--shadow)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Meet Uzo</h2>
              <p>
                My name is Uzo and I am the founder of Abba's Whispers: an online space for 
                poetry and reflective conversations. I am also a mum, a singer-songwriter and 
                Dean of a school in South Africa called the African Leadership Academy.
              </p>
              <p>
                Over 30 years of work experience, I have helped people harness the power of 
                their personal experiences to solve problems as a community organiser, 
                international consultant, coach, and school leader.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>The SELAH Journey</h2>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
              <p>
                My poetry series is called <strong>SELAH</strong>. This series played a pivotal role in 
                helping me grow from grief. I lost my beloved husband in 2015 from a devastating illness. 
                I was in shock for a very long time. I went into a space of denial and closed up my 
                feelings for everything.
              </p>
              <p>
                The only things that kept me going were looking after our children and speaking to God, 
                who I call 'Abba,' meaning Father. Though for a couple of years, I'm not sure I was 
                speaking — I raged and cried and shouted at Him for many years. He listened…He held me…
                He shouted back occasionally…Most importantly…He let me be.
              </p>
              <p>
                In 2021, my Abba asked me to come out of the shadows.. to begin once again to live a 
                life of purpose and destiny. I have wondered for a long time what this message meant to me. 
                I have always wrestled with my identity.. Who am I? What am I? What am I called to do 
                in this world? What do I have to offer to my fellow human beings?
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>From Pain to Purpose</h2>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
              <p>
                These writings come from time with myself and Abba. I realized that whenever I 
                stepped into moments of despair, anguish and pain... I would fall into writing to 
                express my heart. The early writings were influenced by reading the Psalms of the 
                Bible and then very soon, I found my own voice of expression.
              </p>
              <p>
                You will find the word <strong>"selah"</strong> sprinkled throughout these poems…
                Use those moments to pause and reflect on your feelings.
              </p>
              <p>
                Today, I am deeply grateful for these words of truth in my life. My wish for 
                anyone who reads them is that it brings you to a grace-filled encounter with God. 
                A moment to experience His presence in your life everyday.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-3" style={{ marginTop: '4rem' }}>
            {[
              {
                title: "Poetry & Reflection",
                description: "SELAH series - writings born from moments of despair transformed into expressions of hope.",
                icon: "✍️"
              },
              {
                title: "Authentic Journey",
                description: "Real experiences of grief, healing, and finding purpose through relationship with Abba.",
                icon: "💝"
              },
              {
                title: "Grace-Filled Encounters",
                description: "Creating moments for readers to experience God's presence in their everyday lives.",
                icon: "🕊️"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--light-olive)', color: 'white' }}>
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>A Grace-Filled Encounter Awaits</h2>
            <blockquote style={{ 
              fontSize: '1.2rem', 
              fontStyle: 'italic', 
              maxWidth: '700px', 
              margin: '2rem auto',
              borderLeft: '4px solid white',
              paddingLeft: '2rem',
              textAlign: 'left'
            }}>
              "My wish for anyone who reads these words is that it brings you to a 
              grace-filled encounter with God. A moment to experience His presence 
              in your life everyday."
              <br /><br />
              <strong>- Uzo, Founder</strong>
            </blockquote>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
              <a href="/volumes" className="btn">Explore SELAH Series</a>
              <a href="/prayer-request" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                Share Your Heart
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;