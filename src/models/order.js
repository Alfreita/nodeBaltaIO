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
        required:true
    },
    items:[{
        quantity:{
            type:Number,
            require:true,
            default:1
        },
        price:{
            type:number,
            require:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        }

    }]
    
});
module.exports = mongoose.model('Customer',schema);