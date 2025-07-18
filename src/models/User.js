const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../controllers/dbController');  // Ensure this points to the correct sequelize instance

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING },
  prenom: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  motDePasse: { type: DataTypes.STRING },
  telephone: { type: DataTypes.STRING },
  domaine: { type: DataTypes.STRING },
  photo: { type: DataTypes.STRING },
  typeUtilisateur: { type: DataTypes.ENUM('Etudiant', 'Enseignant') }
}, {
  timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
  tableName: "Users"
});

module.exports = User;
