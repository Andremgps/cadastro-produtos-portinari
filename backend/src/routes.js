const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const CategoriaController = require('./controllers/CategoriaController');
const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Cria categoria
routes.post('/categoria', CategoriaController.store);
//Lista Categorias ou pega por nome da categoria
routes.get('/categorias', CategoriaController.index);
//Pega categoria por id
routes.get('/searchCategoria', CategoriaController.show);

//Cria Produtos
//routes.post('/categoria/:categoria/produto', ProdutoController.store);
routes.post("/categoria/:categoria/produto", upload.single('imagem'),ProdutoController.store);
//Lista Produtos
routes.get('/produtos', ProdutoController.index);
//Lista produtos por categoria
routes.get('/produtos/:categoria', ProdutoController.show);

module.exports = routes;