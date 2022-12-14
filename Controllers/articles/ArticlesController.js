const express = require('express');
const router = express.Router();

// Models
const Article = require('../../Models/Article/Article');
const Category = require('../../Models/Category/Category');

// Slugify
const slugify = require('slugify');

// Middlewares
const adminAuth = require('../../config/middlewares/adminAuth');


router.get('/admin/articles', adminAuth, (req, res)=>{
    res.statusCode = 200;
    Article.findAll({
        include: [{model: Category}]
    }).then((articles)=>{
        res.render('admin/articles/index', {
            articles: articles
        })
    })
});

router.get('/admin/articles/new', adminAuth, (req, res)=>{
    res.statusCode = 200;
    Category.findAll().then((categories) => {
        res.render("admin/articles/new", {
            categories: categories
        })
    }).catch((err) => {
        console.log('Ocorreu um erro interno...');
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

router.get('/admin/articles/edit/:id', adminAuth, (req, res) => {
    let { id } = req.params
    if(!isNaN(id)){
        Article.findByPk(id).then((article) => {
            if(article !== undefined) {
                Category.findAll().then((categories) => {
                    res.render('admin/articles/edit', {
                        article: article,
                        categories: categories
                    })
                })
            } else {
                res.redirect('/')
            }
        }).catch((err) => {
            res.redirect('/')
        })
    } else {
        res.redirect('/admin/articles')
    }
})

router.post('/articles/update', (req, res) => {
    let { id, title, body, category } = req.body
    Article.update({title: title, slug: slugify(title), body: body, categoryId: category}, {
        where: { id: id }
    }).then(() => {
        res.redirect('/admin/articles');
    }).catch((err) => {
        res.redirect('/')
    })
})

router.get('/articles/page/:num', (req, res) => {
    res.statusCode = 200;
    let page = req.params.num
    let offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    } else {
        offset = (parseInt(page) - 1 ) * 4
    }
    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [ ['id', 'DESC'] ]
    }).then((articles) => {
        let next;
        if(offset + 4 >= articles.count) {
            next = false
        } else {
            next = true
        }
        let result = {
            page: parseInt(page), 
            next: next,
            articles: articles
        }
        Category.findAll().then((categories) => {
            res.render('admin/articles/page', {result: result, categories, categories})
        }).catch((err) => {
            res.redirect('/')
        })
    })
})

module.exports = router;