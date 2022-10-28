const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

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

module.exports = Category;