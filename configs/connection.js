require('dotenv').config();
const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            'dialect': 'mysql',
            'host': 'localhost'
        })
    }

    getConnection(){
        return this.connection;
    }
}


module.exports = new Database()