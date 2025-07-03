const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // 🔁 change if your MySQL user is different
  password: 'Passw0rd',          // 🔁 add your MySQL password if set
  database: 'resume_builder'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
