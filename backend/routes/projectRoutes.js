const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ POST /api/projects
router.post('/', (req, res) => {
  const { user_id, title, description } = req.body;

  if (!user_id || !title || !description) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const sql = 'INSERT INTO projects (user_id, title, description) VALUES (?, ?, ?)';
  db.query(sql, [user_id, title, description], (err, result) => {
    if (err) {
      console.error('Error inserting project:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Project added successfully', projectId: result.insertId });
  });
});

// ✅ GET /api/projects/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  const sql = 'SELECT id, title, description FROM projects WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json({ userId, projects: results });
  });
});

module.exports = router;
