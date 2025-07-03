const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/experiences
router.post('/', (req, res) => {
  const { user_id, job_title, company, duration, description } = req.body;

  if (!user_id || !job_title || !company || !duration || !description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO experiences (user_id, job_title, company, duration, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, job_title, company, duration, description], (err, result) => {
    if (err) {
      console.error('Error inserting experience:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Experience added', experienceId: result.insertId });
  });
});

module.exports = router;
