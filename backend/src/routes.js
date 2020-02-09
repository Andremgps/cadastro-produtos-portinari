const express = require('express');
const CategoriaController = require('./controllers/CategoriaController');

const routes = express.Router();

routes.post('/categoria', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.put('/categoria/:categoria', CategoriaController.update);

module.exports = routes;