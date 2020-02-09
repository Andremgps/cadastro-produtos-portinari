const Categoria = require('../models/Categoria');

module.exports = {
    async index(req, res){
        const categoriaName = req.query.categoria;
        const categoria = await Categoria.find(categoriaName ? { name: categoriaName } : {});
        return res.json(categoria);
    },

    async store(req, res) {
        const { name } = req.body;
        let categoria = await Categoria.findOne({ name });
        if(!categoria){
            categoria = await Categoria.create({ name });
        }        
        return res.json(categoria);
    },

    async update(req, res) {
        const categoriaName = req.params.categoria;
        const { produto } = req.body;
        let categoria = await Categoria.findOne({ name: categoriaName });
        if(!categoria){
            return res.status(400).json({ error: 'Categoria Não Encontrada!' });
        }
        let { produtos } = categoria;        
        produtos.push(produto);
        await Categoria.updateOne({ name: categoriaName }, {
            $set: {
                produtos
            }
        })

        categoria = await Categoria.findOne({ name: categoriaName });

        return res.json(categoria);
    }
};