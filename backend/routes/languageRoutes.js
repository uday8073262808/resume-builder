const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ POST /api/languages
router.post('/', (req, res) => {
  const { user_id, languages } = req.body;

  if (!user_id || !Array.isArray(languages)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const values = languages.map(lang => [user_id, lang]);
  const sql = 'INSERT INTO languages (user_id, language) VALUES ?';

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error adding languages:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Languages added successfully' });
  });
});

// ✅ GET /api/languages/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT language FROM languages WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching languages:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const languages = results.map(row => row.language);
    res.status(200).json({ userId, languages });
  });
});

module.exports = router;
