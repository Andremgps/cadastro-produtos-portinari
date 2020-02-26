const Categoria = require('../models/Categoria');
const mongo = require('mongodb');

module.exports = {
    async index(req, res){
        const categoriaName = req.query.categoria;
        const categoria = await Categoria.find(categoriaName ? { name: categoriaName } : {});
        return res.json(categoria);
    },

    async store(req, res) {
        const { name, descricao } = req.body;
        let categoria = await Categoria.findOne({ name });
        if(!categoria){
            categoria = await Categoria.create({ name, descricao });
        }        
        return res.json(categoria);
    },

    async show(req, res){
        const { categoriaId } = req.query;        
        const categoria = await Categoria.findOne({ 
            _id: new mongo.ObjectID(categoriaId) 
        });
        return res.json(categoria);
    },

    async update(req, res) {
        const { id } = req.params;        
        const { name, descricao } = req.body;
        const _id = new mongo.ObjectID(id);
        let categoria = await Categoria.findOne({ 
            _id
        });
        if(!categoria){
            return res.status(400).json({ error: 'Categoria Não Encontrada!' });
        }        
        await Categoria.updateOne({ _id },
          {
            $set: {
              name,
              descricao
            }
          }
        );

        categoria = await Categoria.findOne({ _id });

        return res.json(categoria);
    },

    async destroy(req, res){
        const { id } = req.params;
        const _id = new mongo.ObjectID(id);
        let categoria = await Categoria.findOne({
            _id
        });
        if(!categoria){
            return res.status(400).json({ error: 'Categoria Não Encontrada'});
        }
        categoria = await Categoria.deleteOne({
            _id 
        });

        return res.json(categoria);
    }
};