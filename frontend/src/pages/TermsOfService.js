import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Abbaswhispers</title>
        <meta name="description" content="Terms of Service for Abbaswhispers - Rules and guidelines for using our website and services." />
      </Helmet>

      <section className="legal-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Terms of Service</h1>
            <p>Last updated: August 2025</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            className="legal-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="legal-section">
              <h2>Welcome to Our Ministry</h2>
              <p>By joining the Abbaswhispers community, you're entering a sacred space of faith, healing, and spiritual growth. These terms guide our fellowship together.</p>
            </div>

            <div className="legal-section">
              <h2>Using Our Content</h2>
              <p>Our SELAH poetry and spiritual writings are gifts meant for personal encouragement. You may:</p>
              <ul>
                <li>Read and enjoy for personal spiritual growth</li>
                <li>Share quotes with proper attribution</li>
                <li>Use in personal devotions and prayer</li>
              </ul>
              <p>Please respect our ministry by not using content commercially without permission.</p>
            </div>

            <div className="legal-section">
              <h2>Content Guidelines</h2>
              <p>When submitting content (comments, prayer requests, etc.), you agree to:</p>
              <ul>
                <li>Provide accurate and truthful information</li>
                <li>Respect others and maintain appropriate language</li>
                <li>Not submit harmful, offensive, or inappropriate content</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Privacy and Data</h2>
              <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.</p>
            </div>

            <div className="legal-section">
              <h2>Disclaimer</h2>
              <p>The materials on Abbaswhispers website are provided on an 'as is' basis. Abbaswhispers makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>
            </div>

            <div className="legal-section">
              <h2>Limitations</h2>
              <p>In no event shall Abbaswhispers or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Abbaswhispers website.</p>
            </div>

            <div className="legal-section">
              <h2>Modifications</h2>
              <p>Abbaswhispers may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
            </div>

            <div className="legal-section">
              <h2>Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p><strong>Email:</strong> legal@abbawhispers.com</p>
              <p><strong>Address:</strong> Abbaswhispers Ministry</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TermsOfService;