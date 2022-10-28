const Sequelize = require('sequelize');
const sequelize = require('../../config/database/conexao');

const Category = require('../Category/Category');

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

Category.hasMany(Article) // 1 - n
Article.belongsTo(Category) // 1 - 1

Article.sync({force: false});

module.exports = Article;