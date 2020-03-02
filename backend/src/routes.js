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
//Atualia Categoria
routes.put('/categoria/:id', CategoriaController.update);
//Deleta Categoria
routes.delete('/categoria/:id', CategoriaController.destroy);

//Cria Produtos
//routes.post('/categoria/:categoria/produto', ProdutoController.store);
routes.post("/produto", upload.single('imagem'), ProdutoController.store);
//Lista Produtos
routes.get('/produtos', ProdutoController.index);
//Lista produtos por categoria
routes.get('/produtos/:categoria', ProdutoController.show);
//Atualiza Produto
routes.put('/produto/:id', upload.single('imagem'), ProdutoController.update);
//Insere uma cateogira no produto
routes.put('/produto/:id/pushCategoria', ProdutoController.updateCategoriaInProduto);
//Deleta Produto
routes.delete('/produto/:id', ProdutoController.destroy);
//Deleta Categorias dos Produtos
routes.delete('/produtos/categoria/:categoria', ProdutoController.deleteCategorysFromProducts);

module.exports = routes;