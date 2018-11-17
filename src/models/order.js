'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new  Schema({
    number:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    status:{
        type:String,
        required:true,
        enum:['created','done'],
        default:'created'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    items:[{
        quantity:{
            type:Number,
            require:true,
            default:1
        },
        price:{
            type:Number,
            require:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        }

    }]
    
});
module.exports = mongoose.model('Order',schema);