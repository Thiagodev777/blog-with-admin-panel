const express = require('express');
const router = express.Router();
const User = require('../../Models/User/User');

router.get('/admin/users', (req, res) => {
    res.send('Listagem de usuarios')
})

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})


module.exports = router;