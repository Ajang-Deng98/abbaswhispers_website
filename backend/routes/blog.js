const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { verifyToken } = require('./auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    console.log('Blog GET request received');
    
    const [posts] = await db.execute(
      'SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC',
      ['published']
    );
    
    console.log('Found posts:', posts.length);
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [posts] = await db.execute(
      'SELECT * FROM blog_posts WHERE id = ? AND status = ?',
      [id, 'published']
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
router.post('/', verifyToken, async (req, res) => {
  try {

    const { title, content, excerpt, category, tags, image, author, status = 'draft' } = req.body;

    const [result] = await db.execute(
      `INSERT INTO blog_posts (title, content, excerpt, category, tags, image, author, status, author_id, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, content, excerpt, category, tags, image, author || 'Admin', status, req.user.userId]
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
router.put('/:id', verifyToken, async (req, res) => {
  try {

    const { id } = req.params;
    const { title, content, excerpt, category, tags, image, author, status } = req.body;

    const [result] = await db.execute(
      `UPDATE blog_posts 
       SET title = ?, content = ?, excerpt = ?, category = ?, tags = ?, image = ?, author = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, content, excerpt, category, tags, image, author || 'Admin', status, id]
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

// Upload image for blog post
router.post('/upload-image', verifyToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Image upload error:', error);
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