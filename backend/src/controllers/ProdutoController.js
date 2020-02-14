const Produto = require('../models/Produto');

module.exports = {
    async index(req, res){        
        const produtoName = req.query.produto;
        const produto = await Produto.find(produtoName ? { name: produtoName } : {});
        return res.json(produto);
    },

    async store(req, res) {
        const { categoria } = req.params
        const { name, descricao, preco } = req.body;
        let produto = await Produto.findOne({ name });
        if(!produto){
            produto = await Produto.create({ 
                name, 
                descricao,
                preco, 
                categorias: [categoria]
            });
        }        
        return res.json(produto);
    },

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