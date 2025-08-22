require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🚀 Setting up database...');
  
  try {
    // Connect to MySQL (without specific database)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    
    console.log('✅ Connected to MySQL');
    
    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`✅ Database '${process.env.DB_NAME}' created/verified`);
    
    // Use the database
    await connection.execute(`USE ${process.env.DB_NAME}`);
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Split by semicolon and execute each statement
      const statements = schema.split(';').filter(stmt => stmt.trim());
      
      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await connection.execute(statement);
          } catch (err) {
            // Ignore errors for CREATE DATABASE and USE statements
            if (!err.message.includes('database exists') && !err.message.includes('Unknown database')) {
              console.log('⚠️  Statement warning:', err.message);
            }
          }
        }
      }
      
      console.log('✅ Schema executed successfully');
    } else {
      console.log('❌ Schema file not found at:', schemaPath);
    }
    
    // Verify setup
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`📊 Created ${tables.length} tables`);
    
    // Check if admin user exists
    const [users] = await connection.execute('SELECT * FROM users WHERE username = "admin"');
    if (users.length > 0) {
      console.log('👤 Admin user exists');
    } else {
      console.log('⚠️  Admin user not found');
    }
    
    await connection.end();
    console.log('🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setupDatabase();