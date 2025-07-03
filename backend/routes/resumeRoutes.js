const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

// POST /api/resumes — Save a resume (authenticated)
router.post('/', authenticateToken, (req, res) => {
  const { userId } = req.user;
  const { title, data } = req.body; // 'data' holds the JSON resume content

  if (!title || !data) {
    return res.status(400).json({ message: 'Title and data required' });
  }

  const query = 'INSERT INTO resumes (user_id, title, data) VALUES (?, ?, ?)';
  db.query(query, [userId, title, JSON.stringify(data)], (err, result) => {
    if (err) {
      console.error('Error saving resume:', err);
      return res.status(500).json({ message: 'DB error' });
    }
    res.status(201).json({ message: 'Resume saved', resumeId: result.insertId });
  });
});

// GET /api/resumes — Fetch all resumes for logged-in user
router.get('/', authenticateToken, (req, res) => {
  const { userId } = req.user;
  const query = 'SELECT id, title, data FROM resumes WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching resumes:', err);
      return res.status(500).json({ message: 'DB error' });
    }

   const formatted = results.map(row => ({
  id: row.id,
  title: row.title,
  data: typeof row.data === 'string' ? JSON.parse(row.data) : row.data,
}));

    res.status(200).json({ resumes: formatted });
  });
});

module.exports = router;
