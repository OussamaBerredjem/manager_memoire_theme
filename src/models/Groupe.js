const { sequelize } = require('../controllers/dbController'); // Import sequelize instance
const { DataTypes } = require('sequelize'); // Import DataTypes
const Projet = require('./Projet'); // Import Projet model

const Groupe = sequelize.define('Groupe', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nom: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    type: { 
        type: DataTypes.ENUM('monome', 'binome', 'trinome'), 
        defaultValue: 'monome' 
    },
    projetId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Projet, // Reference the Projet model directly
            key: 'id'
        }
    }
}, {
    timestamps: false, // Disable timestamps
    tableName: 'Groupe' // Explicitly set the table name
});

// Define the association
Groupe.belongsTo(Projet, { foreignKey: 'projetId', as: 'Projet' });

module.exports = Groupe;