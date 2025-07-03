const express = require('express');
const router = express.Router();
const { addUser, getUserById } = require('../controllers/userController');

// POST - Add a new user
router.post('/users', addUser);

// GET - Fetch user by ID
router.get('/users/:id', getUserById);

module.exports = router;
