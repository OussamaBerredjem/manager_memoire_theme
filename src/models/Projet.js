// src/models/Projet.js
const { sequelize } = require('../controllers/dbController');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Projet = sequelize.define('Projet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titre: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  domaine: { type: DataTypes.STRING, allowNull: false },
  enseignantId: { type: DataTypes.INTEGER, allowNull: false },
  motsCles: { type: DataTypes.TEXT },
  dateLimit: { type: DataTypes.DATE,allowNull:true },
  statut: { type: DataTypes.ENUM('disponible', 'en cours', 'termine'), defaultValue: 'disponible' },
},{
  timestamps: false ,// Disable automatic timestamps (createdAt, updatedAt)
  tableName:"Projet"  
});


Projet.belongsTo(User, {foreignKey: 'enseignantId', as: 'Enseignant' });


module.exports = Projet;
