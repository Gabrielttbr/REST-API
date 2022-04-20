const express = require('express');
const Router = express.Router();

//Mostrando os produtos
Router.get('/', (req, res, next) => {
    res.status(200).send(
        {
            mss: "GET PRODUTOS"
        }
    )
})

//Adicionando um produtos
Router.post('/', (req, res, next) => {
    res.status(201).send(
        {
            msss: "POST PRODUTOS"
        }
    )
})
Router.patch('/', (req, res,next) => {
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