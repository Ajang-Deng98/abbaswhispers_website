const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const db = require('../config/database');
const { verifyToken } = require('./auth');

const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Subscribe to newsletter
router.post('/subscribe', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name } = req.body;

    // Check if email already exists
    const [existing] = await db.execute(
      'SELECT * FROM subscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      if (existing[0].status === 'active') {
        return res.status(400).json({ message: 'Email is already subscribed' });
      } else {
        // Reactivate subscription
        await db.execute(
          'UPDATE subscribers SET status = "active", updated_at = NOW() WHERE email = ?',
          [email]
        );
      }
    } else {
      // Add new subscriber
      await db.execute(
        `INSERT INTO subscribers (email, name, status, subscribed_at) 
         VALUES (?, ?, 'active', NOW())`,
        [email, name || null]
      );
    }

    // Send welcome email
    if (process.env.SMTP_USER) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Welcome to Abba Whispers Newsletter',
          html: `
            <h2>Welcome to Abba Whispers!</h2>
            <p>Dear ${name || 'Friend'},</p>
            <p>Thank you for subscribing to our newsletter. You'll now receive weekly inspirations and updates about our latest writings and volumes.</p>
            <p>We're excited to have you as part of our community of faith!</p>
            <blockquote style="font-style: italic; color: #666; border-left: 3px solid #D4AF37; padding-left: 15px;">
              "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing." - Zephaniah 3:17
            </blockquote>
            <p>Blessings,<br>The Abba Whispers Team</p>
            <hr>
            <p style="font-size: 0.8em; color: #999;">
              If you no longer wish to receive these emails, you can 
              <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}">unsubscribe here</a>.
            </p>
          `
        });
      } catch (emailError) {
        console.error('Welcome email error:', emailError);
      }
    }

    res.status(201).json({
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const [result] = await db.execute(
      'UPDATE subscribers SET status = "unsubscribed", updated_at = NOW() WHERE email = ?',
      [email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Email not found in our subscriber list' });
    }

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all subscribers (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const [subscribers] = await db.execute(
      'SELECT * FROM subscribers WHERE status = ? ORDER BY subscribed_at DESC LIMIT ? OFFSET ?',
      [status, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const [countResult] = await db.execute(
      'SELECT COUNT(*) as total FROM subscribers WHERE status = ?',
      [status]
    );

    res.json({
      subscribers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get subscriber statistics (admin only)
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const [activeResult] = await db.execute('SELECT COUNT(*) as active FROM subscribers WHERE status = "active"');
    const [unsubscribedResult] = await db.execute('SELECT COUNT(*) as unsubscribed FROM subscribers WHERE status = "unsubscribed"');
    const [totalResult] = await db.execute('SELECT COUNT(*) as total FROM subscribers');

    // Get recent subscriptions (last 30 days)
    const [recentResult] = await db.execute(`
      SELECT COUNT(*) as recent 
      FROM subscribers 
      WHERE status = "active" AND subscribed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);

    res.json({
      active: activeResult[0].active,
      unsubscribed: unsubscribedResult[0].unsubscribed,
      total: totalResult[0].total,
      recentSubscriptions: recentResult[0].recent
    });
  } catch (error) {
    console.error('Get subscriber stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send newsletter (admin only)
router.post('/send-newsletter', verifyToken, [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { subject, content } = req.body;

    // Get all active subscribers
    const [subscribers] = await db.execute(
      'SELECT email, name FROM subscribers WHERE status = "active"'
    );

    if (subscribers.length === 0) {
      return res.status(400).json({ message: 'No active subscribers found' });
    }

    // Send emails (in production, use a queue system for better performance)
    let successCount = 0;
    let failureCount = 0;

    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: subscriber.email,
          subject: subject,
          html: `
            ${content}
            <hr>
            <p style="font-size: 0.8em; color: #999;">
              If you no longer wish to receive these emails, you can 
              <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}">unsubscribe here</a>.
            </p>
          `
        });
        successCount++;
      } catch (emailError) {
        console.error(`Failed to send to ${subscriber.email}:`, emailError);
        failureCount++;
      }
    }

    res.json({
      message: `Newsletter sent successfully to ${successCount} subscribers`,
      stats: {
        total: subscribers.length,
        success: successCount,
        failures: failureCount
      }
    });
  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;