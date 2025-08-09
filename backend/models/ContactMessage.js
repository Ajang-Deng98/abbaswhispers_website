const db = require('../config/database');

class ContactMessage {
  static async create(messageData) {
    const { name, email, subject, message } = messageData;
    
    const [result] = await db.execute(
      `INSERT INTO contact_messages (name, email, subject, message, status, created_at) 
       VALUES (?, ?, ?, ?, 'new', NOW())`,
      [name, email, subject, message]
    );
    
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM contact_messages';
    let params = [];

    if (filters.status) {
      query += ' WHERE status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ? OFFSET ?';
      params.push(parseInt(filters.limit), parseInt(filters.offset) || 0);
    }

    const [messages] = await db.execute(query, params);
    return messages;
  }

  static async findById(id) {
    const [messages] = await db.execute(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );
    return messages[0];
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE contact_messages SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM contact_messages WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = ContactMessage;