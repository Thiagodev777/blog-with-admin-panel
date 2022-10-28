const express = require('express');
const router = express.Router();

router.get('/categories', (req, res)=>{
    res.statusCode = 200;
    res.send('Rota de categoria')
});

router.get('/admin/categories/new', (req, res)=>{
    res.statusCode = 200;
    res.render('admin/categories/new')
})

module.exports = router;