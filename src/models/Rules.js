const { application } = require('express');
const {sequelize} = require('../controllers/dbController');  // Ensure this points to the correct sequelize instance
const {DataTypes} = require('sequelize');

const Rules = sequelize.define('Rules', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    max_projects:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    max_groupe_size:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    max_candidateur_send:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    project_proposal_deadline:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    application_deadline:{
        type: DataTypes.DATE,
        allowNull: true,
    }
},
{
    timestamps: false,
    tableName: 'Rules'
});

module.exports = Rules;
