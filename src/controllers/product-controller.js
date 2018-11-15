'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository  = require('../repository/product-repository');


exports.post = (req, res, next) => {
    let contract  = new ValidationContract();
    contract.hasMinLen(req.body.title,3,'o titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug,3,'o titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description,3,'o titulo deve conter pelo menos 3 caracteres');

    //verifica se os dados passados pela requisição são validos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return; 
    }
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'produto cadastrado com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
};
exports.get = (req, res, next) => {

    Product
        .find({
            active: true
        }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};
exports.getBySlug = (req, res, next) => {

    Product
        .findOne({
            slug: req.params.slug,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};
exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                e
            });
        });
};
exports.put = (req, res, next) => {
    Product
       .findByIdAndUpdate(req.params.id, {
           $set: {
              title: req.body.title,
              description: req.body.description,
              price: req.body.price
          }
         }).then(x => {
        res.status(200).send({
            message: 'produto a atualizado com sucesso!'
        });
        }).catch(e => {
        res.status(400).send({
            message: 'falha ao atualizar produto',
            data: e
            });
        });
};
exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then(x=>{
            res.status(200).send({
                message:'produto removido com sucesso'
            });
        }).catch(e=>{
            res.status(400).send({
                message:'falha ao remover produto',
                data:e
            });
        });
};