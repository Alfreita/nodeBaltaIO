'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repository/customer-repository');
const md5 = require('md5'); 

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'o nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'o email é invalido');
    contract.hasMinLen(req.body.password, 3, 'o password deve conter pelo menos 3 caracteres');

    //verifica se os dados passados pela requisição são validos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create({
            name: req.body.name,
            email:req.body.email,
            password:md5(req.body.password + global.SAL_KEY)
        })
    res.status(201).send({
    message: 'Cliente cadastrado com sucesso'
    });
    }catch(e){
        res.status(500).send({
            message:'Falha ao executar requisição'
        });
    }
};
