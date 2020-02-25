const Produto = require('../models/Produto');
const mongo = require('mongodb');

module.exports = {
    async index(req, res){        
        const produtoName = req.query.produto;
        const produto = await Produto.find(produtoName ? { name: produtoName } : {});
        return res.json(produto);
    },

    async store(req, res) {  
        //Solução paliativa para o upload file do portinari          
        const { name, descricao, preco, categorias } = JSON.parse(req.body.data);
        const filename = req.file ? req.file.filename : '';
        let produto = await Produto.findOne({ name });
        if(!produto){
            produto = await Produto.create({ 
                name, 
                descricao,
                preco, 
                imagem: filename,
                categorias: categorias
            });
        }        
        return res.json(produto);
    },

    //mostra produtos de acordo com a categoria
    async show(req, res){
        const { categoria } = req.params;
        const produtos = await Produto.find({ categorias: categoria });
        return res.json(produtos);
    },

    async deleteCategorysFromProducts(req, res){
        const { categoria } = req.params;        
        await Produto.updateMany({ }, {
            $pull: {
                categorias: new mongo.ObjectID(categoria)
            }
        }, {
            multi: true
        })
        return res.json({message: 'succes'});
    }

    // async update(req, res) {
    //     const categoriaName = req.params.categoria;
    //     const { produto } = req.body;
    //     let categoria = await Categoria.findOne({ name: categoriaName });
    //     if(!categoria){
    //         return res.status(400).json({ error: 'Categoria Não Encontrada!' });
    //     }
    //     let { produtos } = categoria;        
    //     produtos.push(produto);
    //     await Categoria.updateOne({ name: categoriaName }, {
    //         $set: {
    //             produtos
    //         }
    //     })

    //     categoria = await Categoria.findOne({ name: categoriaName });

    //     return res.json(categoria);
    // }
};