const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust path if necessary

// ✅ POST /api/certifications
router.post('/', (req, res) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ error: 'User ID and certification name are required.' });
  }

  const query = 'INSERT INTO certifications (user_id, name) VALUES (?, ?)';
  db.query(query, [user_id, name], (err, result) => {
    if (err) {
      console.error('Error adding certification:', err);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json({
      message: 'Certification added successfully',
      id: result.insertId
    });
  });
});

// ✅ GET /api/certifications/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT id, name FROM certifications WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching certifications:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({
      userId,
      certifications: results
    });
  });
});

module.exports = router;
