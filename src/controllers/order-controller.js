'use strict'

const repository = require('../repository/order-repository');


exports.post = async(req, res, next) => {
    //verifica se os dados passados pela requisição são validos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body)
    res.status(201).send({
    message: 'Pedido cadastrado com sucesso'
    });
    }catch(e){
        res.status(500).send({
            message:'Falha ao executar requisição'
        });
    }
};
