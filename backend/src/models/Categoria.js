const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    name: String,  
    descricao: String 
    //produtos: [String]
});

module.exports = mongoose.model('Categoria', CategoriaSchema);