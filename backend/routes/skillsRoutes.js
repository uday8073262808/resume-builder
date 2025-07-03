// backend/routes/skillsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

// ✅ GET /api/skills/:userId — fetch all skills for a user
router.get('/:userId', authenticateToken, (req, res) => {
  const { userId } = req.params;

  if (parseInt(userId) !== req.user.userId) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  const query = 'SELECT skill_name FROM skills WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching skills:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const skills = results.map(row => row.skill_name);
    res.status(200).json({ userId, skills });
  });
});

// ✅ POST /api/skills — add a skill for a user
router.post('/', authenticateToken, (req, res) => {
  const { user_id, skill_name } = req.body;

  if (!user_id || !skill_name) {
    return res.status(400).json({ error: 'User ID and skill name are required.' });
  }

  const query = 'INSERT INTO skills (user_id, skill_name) VALUES (?, ?)';
  db.query(query, [user_id, skill_name], (err, result) => {
    if (err) {
      console.error('Error adding skill:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Skill added', skillId: result.insertId });
  });
});

module.exports = router;
