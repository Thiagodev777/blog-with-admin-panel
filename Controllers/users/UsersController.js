const express = require('express');
const router = express.Router();
const User = require('../../Models/User/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {
    res.send('Listagem de usuarios')
})

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})

router.post('/users/create', (req, res) => {
    let { email, password } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.redirect('/')
    })

})


module.exports = router;