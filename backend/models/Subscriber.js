const db = require('../config/database');

class Subscriber {
  static async create(email, name = null) {
    const [result] = await db.execute(
      `INSERT INTO subscribers (email, name, status, subscribed_at) 
       VALUES (?, ?, 'active', NOW())`,
      [email, name]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [subscribers] = await db.execute(
      'SELECT * FROM subscribers WHERE email = ?',
      [email]
    );
    return subscribers[0];
  }

  static async updateStatus(email, status) {
    const [result] = await db.execute(
      'UPDATE subscribers SET status = ?, updated_at = NOW() WHERE email = ?',
      [status, email]
    );
    return result.affectedRows > 0;
  }

  static async reactivate(email) {
    const [result] = await db.execute(
      'UPDATE subscribers SET status = "active", updated_at = NOW() WHERE email = ?',
      [email]
    );
    return result.affectedRows > 0;
  }

  static async findAll(filters = {}) {
    const status = filters.status || 'active';
    const limit = parseInt(filters.limit) || 50;
    const offset = parseInt(filters.offset) || 0;

    const [subscribers] = await db.execute(
      'SELECT * FROM subscribers WHERE status = ? ORDER BY subscribed_at DESC LIMIT ? OFFSET ?',
      [status, limit, offset]
    );

    return subscribers;
  }

  static async getActiveEmails() {
    const [subscribers] = await db.execute(
      'SELECT email, name FROM subscribers WHERE status = "active"'
    );
    return subscribers;
  }

  static async getStats() {
    const [activeResult] = await db.execute('SELECT COUNT(*) as active FROM subscribers WHERE status = "active"');
    const [unsubscribedResult] = await db.execute('SELECT COUNT(*) as unsubscribed FROM subscribers WHERE status = "unsubscribed"');
    const [totalResult] = await db.execute('SELECT COUNT(*) as total FROM subscribers');
    const [recentResult] = await db.execute(`
      SELECT COUNT(*) as recent 
      FROM subscribers 
      WHERE status = "active" AND subscribed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);

    return {
      active: activeResult[0].active,
      unsubscribed: unsubscribedResult[0].unsubscribed,
      total: totalResult[0].total,
      recentSubscriptions: recentResult[0].recent
    };
  }

  static async getCount(status = 'active') {
    const [result] = await db.execute(
      'SELECT COUNT(*) as total FROM subscribers WHERE status = ?',
      [status]
    );
    return result[0].total;
  }
}

module.exports = Subscriber;