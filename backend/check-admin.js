const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function checkAndCreateAdmin() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'abba_whispers'
    });

    console.log('Connected to database');

    // Check if admin user exists
    const [users] = await connection.execute('SELECT * FROM users WHERE username = ?', ['admin']);
    
    if (users.length === 0) {
      console.log('Admin user not found. Creating...');
      
      // Create admin user
      const hashedPassword = await bcrypt.hash('password123', 10);
      await connection.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@abbawhispers.com', hashedPassword, 'admin']
      );
      
      console.log('✅ Admin user created successfully!');
      console.log('Username: admin');
      console.log('Password: password123');
    } else {
      console.log('✅ Admin user exists');
      console.log('Username: admin');
      console.log('Current password hash:', users[0].password);
      
      // Test if password123 works
      const isValid = await bcrypt.compare('password123', users[0].password);
      console.log('Password123 valid:', isValid);
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkAndCreateAdmin();