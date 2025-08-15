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

// Submit prayer request (public)
router.post('/', [
  body('category').notEmpty().withMessage('Category is required'),
  body('request').isLength({ min: 10 }).withMessage('Prayer request must be at least 10 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required if provided')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      name, 
      email, 
      category, 
      request, 
      isAnonymous = false, 
      allowSharing = false 
    } = req.body;

    // Store in database
    const [result] = await db.execute(
      `INSERT INTO prayer_requests (name, email, category, request, is_anonymous, allow_sharing, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'new', NOW())`,
      [name || 'Anonymous', email, category, request, isAnonymous, allowSharing]
    );

    // Send notification email to prayer team
    if (process.env.SMTP_USER) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.PRAYER_TEAM_EMAIL || 'prayer@abbawhispers.com',
          subject: 'New Prayer Request Submitted',
          html: `
            <h2>New Prayer Request</h2>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Name:</strong> ${isAnonymous ? 'Anonymous' : (name || 'Not provided')}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Request:</strong></p>
            <p>${request}</p>
            <p><strong>Allow Sharing:</strong> ${allowSharing ? 'Yes' : 'No'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        });
      } catch (emailError) {
        console.error('Email notification error:', emailError);
      }
    }

    // Send confirmation email to requester if email provided
    if (email && process.env.SMTP_USER) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Prayer Request Received - Abba Whispers',
          html: `
            <h2>Your Prayer Request Has Been Received</h2>
            <p>Dear ${name || 'Friend'},</p>
            <p>Thank you for submitting your prayer request. Our prayer team has been notified and will begin praying for your needs immediately.</p>
            <p><strong>Your Request Category:</strong> ${category}</p>
            <p>We believe in the power of prayer and are honored to lift up your needs before God.</p>
            <blockquote style="font-style: italic; color: #666; border-left: 3px solid #D4AF37; padding-left: 15px;">
              "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours." - Mark 11:24
            </blockquote>
            <p>Blessings,<br>The Abba Whispers Prayer Team</p>
          `
        });
      } catch (emailError) {
        console.error('Confirmation email error:', emailError);
      }
    }

    res.status(201).json({
      id: result.insertId,
      message: 'Prayer request submitted successfully. Our prayer team will begin praying for you immediately.'
    });
  } catch (error) {
    console.error('Submit prayer request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all prayer requests (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    console.log('Getting prayer requests...');
    
    // Simple query first
    const [requests] = await db.execute('SELECT * FROM prayer_requests ORDER BY created_at DESC LIMIT 50');
    console.log('Found requests:', requests.length);
    
    // Get total count
    const [countResult] = await db.execute('SELECT COUNT(*) as total FROM prayer_requests');
    const total = countResult[0].total;
    console.log('Total requests:', total);

    res.json({
      requests,
      pagination: {
        page: 1,
        limit: 50,
        total,
        pages: Math.ceil(total / 50)
      }
    });
  } catch (error) {
    console.error('Get prayer requests error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single prayer request (admin only)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await db.execute(
      'SELECT * FROM prayer_requests WHERE id = ?',
      [id]
    );

    if (requests.length === 0) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json(requests[0]);
  } catch (error) {
    console.error('Get prayer request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update prayer request status (admin only)
router.put('/:id/status', verifyToken, [
  body('status').isIn(['new', 'praying', 'prayed', 'answered']).withMessage('Invalid status')
], async (req, res) => {
  try {
    console.log('Updating prayer status for ID:', req.params.id);
    console.log('New status:', req.body.status);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, notes = null } = req.body;

    console.log('Executing update query...');
    const [result] = await db.execute(
      'UPDATE prayer_requests SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?',
      [status, notes, parseInt(id)]
    );

    console.log('Update result:', result);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json({ message: 'Prayer request status updated successfully' });
  } catch (error) {
    console.error('Update prayer request status error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete prayer request (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM prayer_requests WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json({ message: 'Prayer request deleted successfully' });
  } catch (error) {
    console.error('Delete prayer request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get prayer request statistics (admin only)
router.get('/admin/stats', verifyToken, async (req, res) => {
  try {
    const [totalResult] = await db.execute('SELECT COUNT(*) as total FROM prayer_requests');
    const [newResult] = await db.execute('SELECT COUNT(*) as new FROM prayer_requests WHERE status = "new"');
    const [prayingResult] = await db.execute('SELECT COUNT(*) as praying FROM prayer_requests WHERE status = "praying"');
    const [prayedResult] = await db.execute('SELECT COUNT(*) as prayed FROM prayer_requests WHERE status = "prayed"');
    const [answeredResult] = await db.execute('SELECT COUNT(*) as answered FROM prayer_requests WHERE status = "answered"');

    const [categoryStats] = await db.execute(`
      SELECT category, COUNT(*) as count 
      FROM prayer_requests 
      GROUP BY category 
      ORDER BY count DESC
    `);

    res.json({
      total: totalResult[0].total,
      byStatus: {
        new: newResult[0].new,
        praying: prayingResult[0].praying,
        prayed: prayedResult[0].prayed,
        answered: answeredResult[0].answered
      },
      byCategory: categoryStats
    });
  } catch (error) {
    console.error('Get prayer stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;