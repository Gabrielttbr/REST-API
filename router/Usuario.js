const express = require("express");

const usuarioControles = require('../controllers/usuario-controles')
const Router = express.Router();


Router.post("/Cadastro", usuarioControles.postCadastro );
Router.post("/Login", usuarioControles.postLogin);

module.exports = Router;
