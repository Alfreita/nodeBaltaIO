'use strict'
//parei na aula 29
//mLab banco de dados mongoDB online 

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
//não sei o que é mas sem ele da problema
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//carrega o banco
mongoose.connect('mongodb://almeida:a1b2c3@ds151383.mlab.com:51383/balta2');
//carrega os models
const Product = require('./models/product');
const Customer = require(`./models/customer`);
//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');


app.use('/',indexRoute);
app.use('/products',productsRoute);
app.use('/customers',customerRoute);







module.exports = app;