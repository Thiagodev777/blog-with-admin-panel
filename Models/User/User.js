const Sequelize = require('sequelize');
const sequelize = require('../../config/database/conexao');

const User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: false});

module.exports = User;