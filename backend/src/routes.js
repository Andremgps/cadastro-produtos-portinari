const express = require('express');
const CategoriaController = require('./controllers/CategoriaController');
const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();

routes.post('/categoria', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
//routes.put('/categoria/:categoria', CategoriaController.update);

routes.post('/categoria/:categoria/produto', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);

module.exports = routes;