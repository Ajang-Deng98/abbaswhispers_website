require('dotenv').config();
const mysql = require('mysql2/promise');

async function testDatabase() {
  console.log('🔍 Testing database connection...');
  console.log('📋 Configuration:');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   Database: ${process.env.DB_NAME}`);
  
  try {
    // Test basic connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    
    console.log('✅ MySQL connection successful');
    
    // Check if database exists
    const [databases] = await connection.execute('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === process.env.DB_NAME);
    
    if (dbExists) {
      console.log('✅ Database exists');
      
      // Connect to specific database
      await connection.execute(`USE ${process.env.DB_NAME}`);
      
      // Check tables
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`📊 Found ${tables.length} tables:`, tables.map(t => Object.values(t)[0]));
      
      // Check users table
      try {
        const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
        console.log(`👥 Users in database: ${users[0].count}`);
      } catch (err) {
        console.log('⚠️  Users table not found or empty');
      }
      
    } else {
      console.log('❌ Database does not exist');
      console.log('💡 Run the schema.sql file to create the database');
    }
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('🔐 Access denied - check username/password');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🔌 Connection refused - is MySQL running?');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('🗄️  Database does not exist - run schema.sql first');
    }
  }
}

testDatabase();