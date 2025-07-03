
// backend/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // your MySQL username
  password: 'Passw0rd',           // your MySQL password
  database: 'resume_builder'  // make sure this database exists
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;