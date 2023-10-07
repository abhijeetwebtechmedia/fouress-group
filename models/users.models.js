const { DataTypes, Model } = require("sequelize");
const connection = require("../configs/connection");

class User_Model extends Model { }


User_Model.init({
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: connection.getConnection(),
    modelName: 'User_Model',
    tableName: 'users'
})


module.exports = User_Model;