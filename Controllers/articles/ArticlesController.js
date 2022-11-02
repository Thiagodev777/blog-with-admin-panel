const express = require('express');
const router = express.Router();
const Category = require('../../Models/Category/Category')

router.get('/articles', (req, res)=>{
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

module.exports = router;