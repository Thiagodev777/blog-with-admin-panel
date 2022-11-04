const express = require('express');
const router = express.Router();
const User = require('../../Models/User/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {
    User.findAll({raw: true, order: [ ['id', 'DESC'] ]}).then((users) => {
        res.render('admin/users/index', {
            users, users
        })
    })
})

router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create')
})

router.post('/users/create', (req, res) => {
    let { email, password } = req.body;
    User.findOne({where: {email: email}}).then((user) => {
        if(user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/admin/users')
            }).catch((err) => {
                res.redirect('/')
            })
        } else {
            res.redirect('/admin/users/create')
        }
    })
})

module.exports = router;