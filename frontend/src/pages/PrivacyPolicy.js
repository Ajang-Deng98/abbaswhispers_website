import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Abbaswhispers</title>
        <meta name="description" content="Privacy Policy for Abbaswhispers - How we collect, use, and protect your personal information." />
      </Helmet>

      <section className="legal-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Privacy Policy</h1>
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
              <h2>Information We Collect</h2>
              <p>As a Christian ministry, we collect only what's necessary to serve you better:</p>
              <ul>
                <li>Newsletter subscriptions for spiritual encouragement</li>
                <li>Prayer requests to lift you up in prayer</li>
                <li>Contact information to respond with God's love</li>
                <li>Website interactions to improve your experience</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>How We Use Your Information</h2>
              <p>We steward your information with Christian integrity to:</p>
              <ul>
                <li>Share weekly inspirations and SELAH poetry</li>
                <li>Pray for your specific needs and requests</li>
                <li>Connect you with our faith community</li>
                <li>Provide spiritual resources and support</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:</p>
              <ul>
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Prayer team members for prayer requests (anonymized when requested)</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>

            <div className="legal-section">
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Unsubscribe from communications</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p><strong>Email:</strong> privacy@abbawhispers.com</p>
              <p><strong>Address:</strong> Abbaswhispers Ministry</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;