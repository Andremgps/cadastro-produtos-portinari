const Produto = require('../models/Produto');
const mongo = require('mongodb');

module.exports = {
    async index(req, res){        
        const { produtoId } = req.query;
        const produto = await Produto.find(produtoId ? { 
            _id: new mongo.ObjectID(produtoId) 
        } : {});
        return res.json(produto);
    },

    async store(req, res) {                    
        const { name, descricao, preco, categorias } = req.body;
        const filename = req.file ? req.file.filename : undefined;
        let produto = await Produto.findOne({ name });
        if(!produto){
            produto = await Produto.create({ 
                name, 
                descricao,
                preco, 
                imagem: filename,
                categorias: JSON.parse(categorias)
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

    async update(req, res) {
        const { id } = req.params;
        const _id = new mongo.ObjectID(id);
        const { name, descricao, preco, categorias } = req.body;
        const filename = req.file ? req.file.filename : undefined;
        let produto = await Produto.findOne({ _id });
        if (!produto) {
            return res.status(400).json({ error: 'Produto Não Encontrada!' });
        }        
        await Produto.updateOne({ _id }, {
            $set: {
                name: name || produto.name,
                descricao: descricao || produto.descricao,
                preco: preco || produto.preco,
                imagem: filename || produto.imagem,
                categorias: categorias ? JSON.parse(categorias) : produto.categorias
            }            
        });

        produto = await Produto.findOne({ _id });

        return res.json(produto);
    },

    async updateCategoriaInProduto(req, res){
        const { id } = req.params;
        const { categoria } = req.body; 
        console.log(req)
        const _id = new mongo.ObjectID(id);
        let produto = await Produto.findOne({ _id });
        if (!produto) {
            return res.status(400).json({ error: 'Produto Não Encontrada!' });
        }
        await Produto.updateOne({ _id }, {
            $push: {
                categorias: new mongo.ObjectID(categoria)
            }
        });
        produto = await Produto.findOne({ _id });
        return res.json(produto);
    },

    async destroy(req, res){
        const { id } = req.params;
        const _id = new mongo.ObjectID(id);
        let produto = await Produto.findOne({
            _id
        });
        if (!produto) {
            return res.status(400).json({ error: 'Produto Não Encontrada' });
        }
        produto = await Produto.deleteOne({
            _id
        });

        return res.json(produto);
    },

    async deleteCategorysFromProducts(req, res) {
        const { categoria } = req.params;
        await Produto.updateMany({}, {
            $pull: {
                categorias: new mongo.ObjectID(categoria)
            }
        }, {
            multi: true
        })
        return res.json({ message: 'succes' });
    },
};