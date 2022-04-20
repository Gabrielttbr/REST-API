const express = require('express');
const Router = express.Router();

// MOSTRANDO TODOS OS PRODUTOS
Router.get('/', (req, res, next) => {
    res.status(200).send(
        {
            mss: "GET PRODUTOS"
        }
    )
})

// ADICIONANDO TODOS OS PRODUTOS
Router.post('/', (req, res, next) => {
    //PEGANDO O OBJETO DO PRODUTOS
    const produto = {
        id: req.body.id_produtos,
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send(
        {
            msss: "POST PRODUTOS",
            produtoCriado: produto
        }
    )
})

// MODIFICA OS PRODUTOS
Router.patch('/', (req, res, next) => {
    res.status(201).send(
        {
            mss: "PATCH PRODUTOS"
        }
    )
})
// EXCLUI UM PRODUTO
Router.delete('/', (req, res, next) => {
    res.status(201).send(
        {
            mss: "DELETE PRODUTOS"
        }
    )
})

module.exports = Router;