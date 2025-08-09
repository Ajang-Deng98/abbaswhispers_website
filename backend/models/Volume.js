const db = require('../config/database');

class Volume {
  static async findAll(filters = {}) {
    let query = 'SELECT * FROM volumes WHERE status = "published"';
    let params = [];

    if (filters.category && filters.category !== 'all') {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    query += ' ORDER BY created_at DESC';

    const [volumes] = await db.execute(query, params);
    return volumes;
  }

  static async findById(id) {
    const [volumes] = await db.execute(
      'SELECT * FROM volumes WHERE id = ? AND status = "published"',
      [id]
    );
    return volumes[0];
  }

  static async create(volumeData) {
    const { title, description, excerpt, category, price, image, downloadLink, status } = volumeData;
    
    const [result] = await db.execute(
      `INSERT INTO volumes (title, description, excerpt, category, price, image, download_link, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, description, excerpt, category, price, image, downloadLink, status]
    );
    
    return result.insertId;
  }

  static async update(id, volumeData) {
    const { title, description, excerpt, category, price, image, downloadLink, status } = volumeData;
    
    const [result] = await db.execute(
      `UPDATE volumes 
       SET title = ?, description = ?, excerpt = ?, category = ?, price = ?, image = ?, download_link = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, description, excerpt, category, price, image, downloadLink, status, id]
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM volumes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async incrementDownloads(id) {
    await db.execute('UPDATE volumes SET downloads = downloads + 1 WHERE id = ?', [id]);
  }
}

module.exports = Volume;