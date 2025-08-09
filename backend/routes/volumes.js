const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get all volumes (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let query = 'SELECT * FROM volumes WHERE status = "published"';
    let params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    const [volumes] = await db.execute(query, params);

    res.json(volumes);
  } catch (error) {
    console.error('Get volumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single volume (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [volumes] = await db.execute(
      'SELECT * FROM volumes WHERE id = ? AND status = "published"',
      [id]
    );

    if (volumes.length === 0) {
      return res.status(404).json({ message: 'Volume not found' });
    }

    res.json(volumes[0]);
  } catch (error) {
    console.error('Get volume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create volume (admin only)
router.post('/', verifyToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').notEmpty().withMessage('Price is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      title, 
      description, 
      excerpt, 
      category, 
      price, 
      image, 
      downloadLink, 
      status = 'published' 
    } = req.body;

    const [result] = await db.execute(
      `INSERT INTO volumes (title, description, excerpt, category, price, image, download_link, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, description, excerpt, category, price, image, downloadLink, status]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Volume created successfully'
    });
  } catch (error) {
    console.error('Create volume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update volume (admin only)
router.put('/:id', verifyToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').notEmpty().withMessage('Price is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { 
      title, 
      description, 
      excerpt, 
      category, 
      price, 
      image, 
      downloadLink, 
      status 
    } = req.body;

    const [result] = await db.execute(
      `UPDATE volumes 
       SET title = ?, description = ?, excerpt = ?, category = ?, price = ?, image = ?, download_link = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, description, excerpt, category, price, image, downloadLink, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Volume not found' });
    }

    res.json({ message: 'Volume updated successfully' });
  } catch (error) {
    console.error('Update volume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete volume (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM volumes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Volume not found' });
    }

    res.json({ message: 'Volume deleted successfully' });
  } catch (error) {
    console.error('Delete volume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track download
router.post('/:id/download', async (req, res) => {
  try {
    const { id } = req.params;

    // Increment download count
    await db.execute(
      'UPDATE volumes SET downloads = downloads + 1 WHERE id = ?',
      [id]
    );

    res.json({ message: 'Download tracked successfully' });
  } catch (error) {
    console.error('Track download error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all volumes for admin
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const [volumes] = await db.execute(
      'SELECT * FROM volumes ORDER BY created_at DESC'
    );

    res.json(volumes);
  } catch (error) {
    console.error('Get admin volumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;