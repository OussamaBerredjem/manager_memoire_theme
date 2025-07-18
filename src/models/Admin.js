const {sequelize} = require('../controllers/dbController')
const {DataTypes} = require("sequelize")
const User = require('./User')

const Admin = sequelize.define('Admin',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id'
        }
    },
},{
    tableName:'Administrateur',
    timestamps:false
})

Admin.belongsTo(User, { as: 'User', foreignKey: 'userId' });

module.exports = Admin;