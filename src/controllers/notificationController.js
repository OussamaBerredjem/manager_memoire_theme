// src/controllers/notificationController.js
const Notification = require('../models/Notification');


exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification'+error });
  }
};

exports.getNotificationsByUser = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { etudiantId: req.params.userId } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications'+error });
  }
};

exports.getListNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications'+error });
  }
}
