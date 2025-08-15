const express = require('express');
const db = require('../config/database');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get comments for a post (public - only latest 3)
router.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const [comments] = await db.execute(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC LIMIT 3',
      [postId]
    );
    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment (public)
router.post('/', async (req, res) => {
  try {
    console.log('Received comment data:', req.body);
    const { post_id, author, content } = req.body;
    
    if (!post_id || !content) {
      return res.status(400).json({ message: 'Post ID and content are required' });
    }
    
    const [result] = await db.execute(
      'INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)',
      [post_id, author || 'Anonymous', content]
    );
    
    console.log('Comment inserted with ID:', result.insertId);
    res.status(201).json({ id: result.insertId, message: 'Comment added successfully' });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get all comments (admin only)
router.get('/admin/all', verifyToken, async (req, res) => {
  try {
    const [comments] = await db.execute(`
      SELECT c.*, bp.title as post_title 
      FROM comments c 
      JOIN blog_posts bp ON c.post_id = bp.id 
      ORDER BY c.created_at DESC
    `);
    res.json(comments);
  } catch (error) {
    console.error('Get admin comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM comments WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;