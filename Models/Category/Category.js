const Sequelize = require('sequelize');
const sequelize = require('../../config/database/conexao');

const Category = sequelize.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.sync({force: false});

module.exports = Category;