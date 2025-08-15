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

// Submit contact form
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Store in database
    const [result] = await db.execute(
      `INSERT INTO contact_messages (name, email, subject, message, status, created_at) 
       VALUES (?, ?, ?, ?, 'new', NOW())`,
      [name, email, subject, message]
    );

    // Send notification email
    if (process.env.SMTP_USER) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || 'info@abbawhispers.com',
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        });

        // Send confirmation email to sender
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Thank you for contacting Abba Whispers',
          html: `
            <h2>Thank You for Reaching Out</h2>
            <p>Dear ${name},</p>
            <p>Thank you for contacting Abba Whispers. We have received your message and will respond within 24-48 hours during business days.</p>
            <p><strong>Your Message:</strong></p>
            <p><em>${message.replace(/\n/g, '<br>')}</em></p>
            <p>We appreciate your interest in our ministry and look forward to connecting with you.</p>
            <p>Blessings,<br>The Abba Whispers Team</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    res.status(201).json({
      id: result.insertId,
      message: 'Thank you for your message! We\'ll get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contacts (admin only)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const [contacts] = await db.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM contact_messages WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;