const db = require('../config/database');

class PrayerRequest {
  static async create(requestData) {
    const { name, email, category, request, isAnonymous, allowSharing } = requestData;
    
    const [result] = await db.execute(
      `INSERT INTO prayer_requests (name, email, category, request, is_anonymous, allow_sharing, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'new', NOW())`,
      [name || 'Anonymous', email, category, request, isAnonymous, allowSharing]
    );
    
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM prayer_requests';
    let params = [];
    let conditions = [];

    if (filters.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }

    if (filters.category) {
      conditions.push('category = ?');
      params.push(filters.category);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(filters.limit), parseInt(filters.offset) || 0);
    }

    const [requests] = await db.execute(query, params);
    return requests;
  }

  static async findById(id) {
    const [requests] = await db.execute(
      'SELECT * FROM prayer_requests WHERE id = ?',
      [id]
    );
    return requests[0];
  }

  static async updateStatus(id, status, notes = null) {
    const [result] = await db.execute(
      'UPDATE prayer_requests SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?',
      [status, notes, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM prayer_requests WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getStats() {
    const [totalResult] = await db.execute('SELECT COUNT(*) as total FROM prayer_requests');
    const [statusStats] = await db.execute(`
      SELECT status, COUNT(*) as count 
      FROM prayer_requests 
      GROUP BY status
    `);
    const [categoryStats] = await db.execute(`
      SELECT category, COUNT(*) as count 
      FROM prayer_requests 
      GROUP BY category 
      ORDER BY count DESC
    `);

    return {
      total: totalResult[0].total,
      byStatus: statusStats.reduce((acc, stat) => {
        acc[stat.status] = stat.count;
        return acc;
      }, {}),
      byCategory: categoryStats
    };
  }
}

module.exports = PrayerRequest;