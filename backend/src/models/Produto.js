const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    name: String,
    descricao: String,
    preco: Number,
    imagem: String,
    categorias: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria'
        }
    ]
}, {
    toJSON: {
        virtuals: true
    }
});

ProdutoSchema.virtual('imagem_url').get(function(){
    return `http://localhost:3333/files/${this.imagem}`;
});

module.exports = mongoose.model('Produto', ProdutoSchema);