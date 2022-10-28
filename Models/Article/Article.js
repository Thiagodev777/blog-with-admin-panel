const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Article = sequelize.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Article;