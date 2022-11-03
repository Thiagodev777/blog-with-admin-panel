const path = require('path');
const express = require('express');
const app = express();

// Environment variable settings
const dotenv = require('dotenv');
dotenv.config();

// Authentication in the database
const connection = require('./config/database/conexao');
connection.authenticate().then(()=>{
    console.log('The connection to the database was successful.');
}).catch((err)=>{
    console.log(`An error occurred while trying to connect to the database: ${err}`);
})

// Settings from template engine and static files
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Json data settings and POST methods
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Models
const Article = require('./Models/Article/Article');
const Category = require('./Models/Category/Category');

// Controllers
const categoriesController = require('./Controllers/categories/CategoriesController');
const articlesController = require('./Controllers/articles/ArticlesController');
app.use('/', categoriesController)
app.use('/', articlesController)


// Router home
app.get('/', (req, res)=>{
    res.statusCode = 200;
    Article.findAll({
        order: [ ['id', 'DESC'] ]
    }).then((articles)=>{

        Category.findAll().then((categories) => {
            res.render('index', {
                articles: articles,
                categories: categories
            })
        })

    })
})

app.get('/:slug', (req, res) => {
    let { slug } = req.params
    Article.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if(article !== undefined) {
            Category.findAll().then((categories) => {
                res.render('article', {
                    article: article,
                    categories: categories
                })
            })
        } else {
            res.redirect('/');
        }
    }).catch((err) => {
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    let { slug } = req.params
    Category.findOne({
        where: { slug: slug },
        include: [{model: Article}]
    }).then((category) => {
        if(category !== undefined) {
            Category.findAll().then((categories) => {
                res.render('index', {
                    articles: category.articles,
                    categories: categories
                })
            })
        } else {
            res.redirect('/')
        }
    }).catch ((err)=>{
        res.redirect('/')
    })
})

// 404
app.use((req, res)=>{
    res.sendStatus(404)
})

app.listen(process.env.PORT_SERVER);