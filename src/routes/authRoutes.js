// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for login (authenticate and get the user role)
router.post('/login', authController.login);

module.exports = router;
