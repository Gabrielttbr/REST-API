const express = require('express')
const Router = express.Router();

// RETORNA TODOS OS PEDIDOS
Router.get('/', (req, res, next) => {
    res.status(200).send({
        mss: "Retorna todos os PEDIDOS"
    })
})

// RETORNA O DADOS ESPESIFICO DE PEDIDO
Router.get('/:id_produtos', (req, res, next) => {
    const id_pedido = req.params.id_produtos

    res.status(200).send(
        {
            mss: "O id pedidos " + id_pedido
        }
    )
})

// ATUALIZANDO OS PEDIDOS
Router.patch('/', (req, res, next) => {
    res.status(201).send({
        mss: "Editando um novo PEDIDO"
    })
})


// ADICIONANDO PEDIDO
Router.post('/', (req, res, next) => {
    const pedido = {
        id: req.body.id,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mss: "Adicionando pedidos",
        pedidoCriado: pedido
    })
})

// DELETANDO UM PEDIDO
Router.delete('/', (req, res, next) => {
    res.status(201).send(
        {
            mss: "Deletando um pedido"
        }
    )
})
module.exports = Router;
