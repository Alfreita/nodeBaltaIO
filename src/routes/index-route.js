'use strict'

const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).send({
        title:"Node api",
        version:"0.0.1"
    });
});

router.get('/index',(req,res,next)=>{
    res.render("index.ejs");
});


router.get('/produtos',(req,res,next)=>{
    res.render("form.ejs");
});
module.exports = router;