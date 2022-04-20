const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const routerProdutos = require('./router/Produtos');
const routerPedidos = require('./router/Pedidos');
const app = express();


// LOG  DE TODAS AS REQUIÇÕES 
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false })) // ACEITA APENAS DADOS SIMPLES
app.use(bodyParser.json())// JSON DE ENTRADA BODY_PARSER




/* ================================================================================================*/
//                              PARTE DE SEGURANÇA DA API
/*=====================================================================================================*/
app.use((req, res, next) => {
    // ==================================================================================
    //                          CONFIGURAÇÕES DE CABEÇALHO
    //====================================================================================

    // ORIGEM, QUAL MÁQUINA TEM PERMIÇÃO DE ENTRAR NA API
    res.header('Access-Control-Allow-Drigin', '*') // * REPRESENTA TODAS
    // CABEÇALHO QUE ACEITAMOS
    res.header('Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-type, Accept, Authorization',
    )

    // MÉTODOS HTPP ACEITOS
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
        return res.status(200).send({})
    }
    next()
})
// =================================================================================================
//                                              ROTAS
// =================================================================================================


// ROTAS PRODUTOS
app.use('/produtos', routerProdutos);

// ROTA PEDIDO
app.use('/pedidos', routerPedidos);


// =================================================================================================
//                                    CASO NÃO EXISTIR ROTA
// =================================================================================================


// CASO NÃO ENCONTRE A ROTA VAI CAIR AQUI

app.use((req, res, next) => {
    //INSTâNCIA UM NOVO ERRO
    const erro = new Error('Não encontrado')
    // PASSA O STATUS DO ERRO COMO 404
    erro.status = 404;
    // PASSA O ERRO ADIANTE
    next(erro)
});

// RETORNANDO O ERRO PASSADO ADIANTE 

app.use((erro, req, res, next) => {
    //PEGANDO O STATUS DO ERRO, CASO NÃO ENCONTRE PASSA STATUS 500
    res.status(erro.status || 500).send
    return res.send({
        error: erro.message
    })
})
// =================================================================================================

module.exports = app;
