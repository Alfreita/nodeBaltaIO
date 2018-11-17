'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repository/product-repository');


exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'o titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'o titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'o titulo deve conter pelo menos 3 caracteres');

    //verifica se os dados passados pela requisição são validos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create(req.body)
    res.status(201).send({
    message: 'produto cadastrado com sucesso'
    });
    }catch(e){
        res.status(500).send({
            message:'Falha ao executar requisição'
        });
    }
    
       
};
exports.get =  async (req, res, next) => {
   try{
        var data = await repository.get();
        res.status(200).send(data);
   }catch (e){
        res.status(500).send({
            message:'Falha ao executar requisição'
        });
   }
};
exports.getBySlug = async (req, res, next) => {
    try{
         var data = await repository.getBySlug(req.params.slug)
         res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message:'Falha ao executar requisição'
        });
    }
    
};
exports.getByTag = async(req, res, next) => {

    try{
        var data = await repository.getByTag(req.params.tag)
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message:'Falha ao executar requisição'
        });
    }
    
};
exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id,req.body)
        res.status(200).send({
            message: 'produto a atualizado com sucesso!'
        });
    }catch(e){
        res.status(400).send({
            message: 'falha ao atualizar produto',
            data: e
        });
    }
         
};
exports.delete = async(req, res, next) => {
    try{
        await repository
        .delete
            res.status(200).send({
                message: 'produto removido com sucesso'
            });
    }catch(e){
        res.status(400).send({
            message: 'falha ao remover produto',
            data: e
        });
    }
};