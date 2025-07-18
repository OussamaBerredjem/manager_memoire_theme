// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Routes for message-related actions
router.post('/', messageController.sendMessage); // POST /api/messages
router.get('/:userId', messageController.getMessagesByUser); // GET /api/messages/:userId

module.exports = router;
