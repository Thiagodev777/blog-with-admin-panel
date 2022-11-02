const express = require('express');
const router = express.Router();
const Category = require('../../Models/Category/Category')

const Article = require('../../Models/Article/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res)=>{
    res.statusCode = 200;
    Article.findAll({
        include: [{model: Category}]
    }).then((articles)=>{
        res.render('admin/articles/index', {
            articles: articles
        })
    })
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

router.post('/articles/delete', (req, res) => {
    let { id } = req.body
    if(id !== undefined){
        if(!isNaN(id)){
            Article.destroy({ where: { id: id } }).then(()=>{
                res.redirect('/admin/articles')
            })
        }else {
            res.redirect('/admin/articles')
        }
    }
})

module.exports = router;