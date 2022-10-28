const express = require('express');
const router = express.Router();
const slugify = require('slugify');

// model Category
const Category = require('../../Models/Category/Category');

router.get('/admin/categories', (req, res)=>{
    res.statusCode = 200;
    res.render('admin/categories/index')
});



router.get('/admin/categories/new', (req, res)=>{
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
            res.redirect('/categories')
        })
    } else {
        res.statusCode(308);
        res.redirect('/admin/categories/new')
    }
})

module.exports = router;