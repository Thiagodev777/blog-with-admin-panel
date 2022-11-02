const express = require('express');
const router = express.Router();
const Category = require('../../Models/Category/Category')

const Article = require('../../Models/Article/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res)=>{
    res.statusCode = 200;
    res.send('Rota de Artigos')
});

router.get('/admin/articles/new', (req, res)=>{
    res.statusCode = 200;
    Category.findAll().then((categories) => {
        res.render("admin/articles/new", {
            categories: categories
        })
    })
})

router.post('/articles/save', (req, res)=>{
    let { title, body, category } = req.body
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/articles')
    })
})

module.exports = router;