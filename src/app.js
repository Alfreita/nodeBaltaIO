'use strict'
//parei na aula 29
//mLab banco de dados mongoDB online 

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')
const app = express();
const router = express.Router();
//não sei o que é mas sem ele da problema
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//carrega o banco
mongoose.connect(config.connectionString);
//carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');
//carrega as rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');


app.use('/',indexRoute);
app.use('/products',productsRoute);
app.use('/customers',customerRoute);
app.use('/orders',orderRoute);







module.exports = app;