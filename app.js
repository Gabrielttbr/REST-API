const express = require('express');
const RouterProdutos = require('./router/Produtos');
const RouterPedidos = require('./router/Pedidos');
const app = express();

app.use('/produtos',  RouterProdutos);
app.use('/pedidos', RouterPedidos);

app.use('/', (req,res,next) =>{
    res.status(200).send({
        mss: "Heloo Word Linux"
    })
}); 

module.exports = app;
