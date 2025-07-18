// src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes for notification-related actions
router.post('/', notificationController.createNotification); // POST /api/notifications
router.get('/:userId', notificationController.getNotificationsByUser); // GET /api/notifications/:userId
router.get('/', notificationController.getListNotifications); // GET /api/notifications/:userId

module.exports = router;
