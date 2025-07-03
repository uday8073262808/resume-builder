const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Passw0rd', 
  database: 'resume_builder',
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log(`✅ Connected to MySQL as ID ${connection.threadId}`);
});

module.exports = connection;
