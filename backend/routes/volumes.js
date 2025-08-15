const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { verifyToken } = require('./auth');
const upload = require('../middleware/upload');

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
router.post('/', verifyToken, async (req, res) => {
  try {

    const { 
      title, 
      description, 
      excerpt, 
      category, 
      price, 
      image, 
      downloadLink, 
      content,
      audioUrl,
      status = 'published' 
    } = req.body;

    console.log('Creating volume with data:', {
      title: encodeURIComponent(title || ''),
      category: encodeURIComponent(category || ''),
      status: encodeURIComponent(status || '')
    });

    const [result] = await db.execute(
      `INSERT INTO volumes (title, description, excerpt, category, price, image, download_link, content, audio_url, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, description, excerpt || '', category, price, image || '', downloadLink || '', content || '', audioUrl || '', status]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Volume created successfully'
    });
  } catch (error) {
    console.error('Create volume error:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('SQL State:', error.sqlState);
    console.error('Request body:', req.body);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      code: error.code
    });
  }
});

// Update volume (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {

    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Updating volume ID:', encodeURIComponent(id), 'with sanitized data');
    
    // Build dynamic update query
    const fields = [];
    const values = [];
    
    Object.keys(updateData).forEach(key => {
      if (key === 'downloadLink') {
        fields.push('download_link = ?');
        values.push(updateData[key]);
      } else if (key === 'audioUrl') {
        fields.push('audio_url = ?');
        values.push(updateData[key]);
      } else {
        fields.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });
    
    fields.push('updated_at = NOW()');
    values.push(id);
    
    const query = `UPDATE volumes SET ${fields.join(', ')} WHERE id = ?`;
    console.log('Update query:', query);
    console.log('Update values:', values);
    
    const [result] = await db.execute(query, values);

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

// Upload audio file
router.post('/upload-audio', verifyToken, upload.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    const audioUrl = `/uploads/${req.file.filename}`;
    res.json({ audioUrl, message: 'Audio uploaded successfully' });
  } catch (error) {
    console.error('Audio upload error:', error);
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