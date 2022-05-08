const express = require('express')
const MysqlConnection = require("../db").pool;
const Router = express.Router();
const PedidoControllers = require('../controllers/pedido-controles');

// Routes to api 

Router.get("/:id_pedido", PedidoControllers.getPedidoEspesifico);
Router.get("/", PedidoControllers.getPedidos);
Router.post("/", PedidoControllers.postPedidos);
Router.patch("/", PedidoControllers.patchPedidos );
Router.delete("/", PedidoControllers.deletePedido);


module.exports = Router;
