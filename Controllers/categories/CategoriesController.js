const express = require('express');
const router = express.Router();

// Slugify
const slugify = require('slugify');
// Model
const Category = require('../../Models/Category/Category');
// Middlewares
const adminAuth = require('../../config/middlewares/adminAuth');


router.get('/admin/categories', adminAuth, (req, res)=>{
    res.statusCode = 200;
    Category.findAll({raw: true}).then((categories)=>{
        res.render('admin/categories/index', {
            categories: categories
        })
    })
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res)=>{
    res.statusCode = 200;
    let { id } = req.params
    if(isNaN(id)){
        res.redirect('/admin/categories')
    }
    Category.findByPk(id).then((category) => { 
        if(category != undefined){
            res.render('admin/categories/edit', {
                category: category
            })
        } else {
            res.redirect('/admin/categories');
        }
     }).catch((err) => {
        res.redirect('/admin/categories');
     })
})


router.get('/admin/categories/new', adminAuth, (req, res)=>{
    res.statusCode = 200;
    res.render('admin/categories/new')
})

router.post('/categories/save', (req, res)=>{
    let { title } = req.body;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.statusCode(308);
        res.redirect('/admin/categories/new')
    }
})

router.post('/categories/update', (req, res)=>{
    let { id, title } = req.body
    Category.update({title: title, slug: slugify(title)}, {
        where: { id: id }
    }).then(() => {
        res.redirect('/admin/categories');
    })
})

router.post('/categories/delete', (req, res) => {
    let { id } = req.body
    if(id !== undefined){
        if(!isNaN(id)){
            Category.destroy({ where: { id: id } }).then(()=>{
                res.redirect('/admin/categories')
            }).catch((err) => {
                console.log('Ocorreu um erro interno...');
            })
        }else {
            res.redirect('/admin/categories')
        }
    }
})

module.exports = router;