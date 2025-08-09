const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM blog_posts WHERE status = "published"';
    let params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [posts] = await db.execute(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM blog_posts WHERE status = "published"';
    let countParams = [];

    if (category && category !== 'all') {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    if (search) {
      countQuery += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [posts] = await db.execute(
      'SELECT * FROM blog_posts WHERE id = ? AND status = "published"',
      [id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    await db.execute(
      'UPDATE blog_posts SET views = views + 1 WHERE id = ?',
      [id]
    );

    res.json(posts[0]);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post (admin only)
router.post('/', verifyToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, category, tags, image, status = 'draft' } = req.body;

    const [result] = await db.execute(
      `INSERT INTO blog_posts (title, content, excerpt, category, tags, image, status, author_id, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, content, excerpt, category, tags, image, status, req.user.userId]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Post created successfully'
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post (admin only)
router.put('/:id', verifyToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content, excerpt, category, tags, image, status } = req.body;

    const [result] = await db.execute(
      `UPDATE blog_posts 
       SET title = ?, content = ?, excerpt = ?, category = ?, tags = ?, image = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, content, excerpt, category, tags, image, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM blog_posts WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts for admin
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const [posts] = await db.execute(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );

    res.json(posts);
  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;