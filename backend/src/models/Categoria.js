const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    name: String,    
    produtos: [String]
});

module.exports = mongoose.model('Categoria', CategoriaSchema);