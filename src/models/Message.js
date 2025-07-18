const { sequelize } = require('../controllers/dbController');
const { DataTypes } = require('sequelize');

const Message = sequelize.define('Message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  contenu: { type: DataTypes.TEXT, allowNull: false },
  dateEnvoi: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  expId: { type: DataTypes.INTEGER, allowNull: false },
  destId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
  tableName: 'Message' // Specify the correct table name (singular)
});

module.exports = Message;
