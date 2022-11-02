const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.NAME_DATABASE, process.env.USERNAME_DATABASE, process.env.PASSWORD_DATABASE, {
    host: process.env.HOST_DATABASE,
    dialect: process.env.TYPE_DATABASE,
    timezone: "-03:00"
})
module.exports = sequelize;