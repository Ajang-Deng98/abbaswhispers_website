const db = require('../config/database');

class BlogPost {
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM blog_posts WHERE status = "published"';
    let params = [];

    if (filters.category && filters.category !== 'all') {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.search) {
      query += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(filters.limit), parseInt(filters.offset) || 0);
    }

    const [posts] = await db.execute(query, params);
    return posts;
  }

  static async findById(id) {
    const [posts] = await db.execute(
      'SELECT * FROM blog_posts WHERE id = ? AND status = "published"',
      [id]
    );
    return posts[0];
  }

  static async create(postData) {
    const { title, content, excerpt, category, tags, image, status, authorId } = postData;
    
    const [result] = await db.execute(
      `INSERT INTO blog_posts (title, content, excerpt, category, tags, image, status, author_id, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, content, excerpt, category, tags, image, status, authorId]
    );
    
    return result.insertId;
  }

  static async update(id, postData) {
    const { title, content, excerpt, category, tags, image, status } = postData;
    
    const [result] = await db.execute(
      `UPDATE blog_posts 
       SET title = ?, content = ?, excerpt = ?, category = ?, tags = ?, image = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, content, excerpt, category, tags, image, status, id]
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM blog_posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async incrementViews(id) {
    await db.execute('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [id]);
  }
}

module.exports = BlogPost;