const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../controllers/dbController');
const User = require('./User');  // Ensure correct import path
const Projet = require('./Projet');  // Ensure correct import path
const Candidature = sequelize.define('Candidature', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  statut: { type: DataTypes.ENUM('acceptee', 'rejetee', 'en attente'), defaultValue: 'en attente' },
 
  projetId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'Projet',  // Ensure this matches the correct table name for projects
      key: 'id'
    },
    allowNull: false
  },
  etudiantId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: "Candidature"
});

// Define associations after model definitions
Candidature.belongsTo(User, { foreignKey: 'etudiantId', as: 'Etudiant' });
Candidature.belongsTo(Projet, { as: 'Projet', foreignKey: 'projetId' });


module.exports = Candidature;
