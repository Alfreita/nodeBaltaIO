'use strict'
//parei na aula 27
//mLab banco de dados mongoDB online 

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
//carrega o banco
mongoose.connect('mongodb://almeida:a1b2c3@ds151383.mlab.com:51383/balta2');
//carrega os models
const Product = require('./models/product');
const Customer = require(`./models/customer`);
//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/product-route');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.use('/',indexRoute);
app.use('/products',productsRoute);


module.exports = app;