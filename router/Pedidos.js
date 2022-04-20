const express = require('express')
const Router = express.Router();

// RETORNA TODOS OS PEDIDOS
Router.get('/', (req,res,next) => {
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

// Atualizando 
Router.patch('/', (req,res,next) => {
    res.status(201).send({
        mss: "Editando um novo PEDIDO"
    })
})

Router.post('/', (req, res, next) =>{
    res.status(201).send({
        mss: "Adicionando pedidos"
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
