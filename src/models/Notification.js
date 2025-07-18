const { sequelize } = require('../controllers/dbController');
const { DataTypes } = require('sequelize');

const Notification = sequelize.define('Notification', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  etudiantId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
      model: 'Users', 
      key: 'id' 
    } 
  },
  message: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  date: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, {
  timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
  tableName: 'Notification'
});

module.exports = Notification;
