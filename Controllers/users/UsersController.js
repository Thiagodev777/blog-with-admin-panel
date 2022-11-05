const express = require('express');
const router = express.Router();

// Model
const User = require('../../Models/User/User');
// Hash password
const bcrypt = require('bcryptjs');
// Middlewares
const adminAuth = require('../../config/middlewares/adminAuth');


//  LISTAGEM DE USUARIOS + CRIAÇÃO DE USUARIOS
router.get('/admin/users', adminAuth, (req, res) => {
    res.statusCode = 200;
    User.findAll({raw: true, order: [ ['id', 'DESC'] ]}).then((users) => {
        res.render('admin/users/index', {
            users, users
        })
    }).catch((err) => {
        res.statusCode = 500;
        console.log('Ocorreu um erro interno...');
        res.redirect('/')
    })
})

router.get('/admin/users/create', (req, res) => {
    res.statusCode = 200;
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
                res.redirect('/login')
            }).catch((err) => {
                res.redirect('/')
            })
        } else {
            res.statusCode = 400;
            console.log('Este email ou senha ja esta sendo usada! Confira os dados e tente novamente!')
            res.redirect('/admin/users/create')
        }
    }).catch((err) => {
        res.statusCode = 500;
        console.log('Ocorreu um erro interno... Tente novamente mais tarde!')
        res.redirect('/admin/users/create')
    })
})


// AUTENTICAÇÃO E SEGURANÇA DE LOGIN
router.get('/login', (req, res) => {
    res.statusCode = 200;
    res.render('admin/users/login')
});

router.post('/authenticate', (req, res) => {
    let { email, password } = req.body
    User.findOne({where: {email: email}}).then((user) => {
        if(user !== undefined) {
            let correct = bcrypt.compareSync(password, user.password);
            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    }).catch((err) => {
        console.log('Ocorreu um erro interno...');
        res.redirect('/login')
    })
})

router.get('/logout', (req, res) => {
    res.statusCode = 200;
    req.session.user = undefined;
    res.redirect('/')
})

module.exports = router;