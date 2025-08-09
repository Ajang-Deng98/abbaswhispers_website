const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async findByUsername(username) {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return users[0];
  }

  static async findById(id) {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return users[0];
  }

  static async create(userData) {
    const { username, email, password, role = 'admin' } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    
    return result.insertId;
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [result] = await db.execute(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
      [hashedPassword, id]
    );
    
    return result.affectedRows > 0;
  }
}

module.exports = User;