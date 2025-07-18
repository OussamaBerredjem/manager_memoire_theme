// src/controllers/messageController.js
const Message = require('../models/Message');
const { Op } = require('sequelize');  // Import the Op operator from Sequelize


exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ expId: req.params.userId }, { destId: req.params.userId }],
      },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages : '+error });
  }
};
