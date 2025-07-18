const { sequelize } = require('../controllers/dbController'); // Import sequelize instance
const { DataTypes } = require('sequelize'); // Import DataTypes
const Groupe = require('./Groupe'); // Import Groupe model
const User = require('./User'); // Import User model

const Member = sequelize.define('Member', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    groupeId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Groupe, // Reference the Groupe model directly
            key: 'id'
        }
    },
    etudiantId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: User, // Reference the User model directly
            key: 'id'
        }
    },
    statu: { 
        type: DataTypes.ENUM('attente', 'accepter'), 
        defaultValue: 'attente', 
        allowNull: false 
    }
}, {
    timestamps: false, // Disable timestamps
    tableName: 'Member' // Explicitly set the table name
});

// Define associations
Member.belongsTo(Groupe, { foreignKey: 'groupeId', as: 'Groupe' });
Member.belongsTo(User, { foreignKey: 'etudiantId', as: 'Etudiant' });

module.exports = Member;