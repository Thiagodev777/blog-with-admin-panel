const express = require('express');
const app = express();
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const connection = require('./config/database/conexao');
connection.authenticate().then(()=>{
    console.log('sucesso');
}).catch((err)=>{
    console.log(err);
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const categoriesController = require('./Controllers/categories/CategoriesController');
const articlesController = require('./Controllers/articles/ArticlesController');

app.use('/', categoriesController)
app.use('/', articlesController)

app.get('/', (req, res)=>{
    res.statusCode = 200;
    res.render('index')
})

app.listen(8089);