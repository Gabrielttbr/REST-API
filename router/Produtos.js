const express = require("express");
const MysqlConection = require("../db").pool;
const Router = express.Router();
const login = require('../middleware/login')
const ProdutoControles = require('../controllers/produto-controles')


Router.get("/", ProdutoControles.getProdutos);
Router.post("/", login, ProdutoControles.postProdutos);
Router.patch("/", ProdutoControles.patchProdutos);
Router.delete("/",ProdutoControles.deleteProdutos);

module.exports = Router;