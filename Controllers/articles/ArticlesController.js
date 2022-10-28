const express = require('express');
const router = express.Router();

router.get('/articles', (req, res)=>{
    res.statusCode = 200;
    res.send('Rota de Artigos')
});

router.get('/admin/articles/new', (req, res)=>{
    res.statusCode = 200;
    res.send('rota de criar artigos')
})

module.exports = router;