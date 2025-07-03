const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ POST /api/hobbies
router.post('/', (req, res) => {
  const { user_id, hobbies } = req.body;

  if (!user_id || !Array.isArray(hobbies)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const values = hobbies.map(hobby => [user_id, hobby]);
  const sql = 'INSERT INTO hobbies (user_id, hobby) VALUES ?';

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error adding hobbies:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({ message: 'Hobbies added successfully' });
  });
});

// ✅ GET /api/hobbies/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT hobby FROM hobbies WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching hobbies:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    const hobbies = results.map(row => row.hobby);
    res.status(200).json({ userId, hobbies });
  });
});

module.exports = router;
