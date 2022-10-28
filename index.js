const express = require('express');
const app = express();
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const connection = require('./config/database/conexao');
connection.authenticate().then(()=>{
    console.log('sucesso');
}).catch((err)=>{
    console.log(err);
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.statusCode = 200;
    res.render('index')
})

app.listen(8089);