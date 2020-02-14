const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    name: String,
    descricao: String,
    preco: Number,
    categorias: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria'
        }
    ]
})

module.exports = mongoose.model('Produto', ProdutoSchema);