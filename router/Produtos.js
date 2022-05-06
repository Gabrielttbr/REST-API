const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/:id_prdoduto', (req, res, next) => {
    mysql.getConnection((error, con) => {
        
        if (error) {
            return res.send({
                error: error
            })
        }
        con.query(
            'select * from produtos where id_produtos = ?;',
            [Number(req.params.id_prdoduto)],
            (error, result, field) => {
                con.release();
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                if (result.length == 0) {
                    return res.status(404).send(
                        {
                            mensagem: "Não foi encontrado produto com este ID"
                        }
                    )
                }
                const response = {
                    quantidade: result.length,
                    protudos: {
                        id_prdoduto: result[0].id_prdodutos,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        request: {
                            tipo: 'GET',
                            descricao: "Retorna todos os produtos",
                            url: "http://localhost:3000/produtos"
                        }
                    }
                }

                return res.status(200).send(response)
            }
        )
    })
})



// MOSTRANDO TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
    
        if (error) {
            return res.send({
                erro: error
            })
        }
        conn.query(
            'select * from produtos',
            (error, result, field) => {
                if (error) { return res.send({ error: error }) }
                conn.release()
                const response = {
                    quantidade: result.length,
                    protudos: result.map(produtos => {
                        return {
                            id_prdoduto: produtos.id_produtos,
                            nome: produtos.nome,
                            preco: produtos.preco,
                            reequest: {
                                tipo: 'GET',
                                descricao: 'Retornas os detalhes do produto',
                                url: "http://localhost:3000/produtos/" + produtos.id_produtos
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })

})

// ADICIONANDO TODOS OS PRODUTOS
router.post('/', (req, res, next) => {
    mysql.getConnection((error, con) => {
        con.release()
        if (error) {
            return res.status(500).send({
                error: err
            })
        }
        con.query(
            ' INSERT INTO produtos (nome, preco) values (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                con.release(); // MÉTODO MUITO IMPORTANTE, LIBERA A CONXEÇÃO COM BANCO DE DADOS SEM LIMITES, SEM ISSO SUA API PODE QUEBRAR
                if (error) {
                    return res.status(500).send({
                        erro: error
                    })
                }
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: resultado.id_produtos,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                        tipo: "GET",
                        descricao: "Retorna todos os produtos",
                        url: "http://localhost:3000/produtos"
                    }
                }

                res.status(200).send(response)
            }
        )
    })

})

// MODIFICA OS PRODUTOS
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, con) => {
      
        if (error) {
            return res.send({ error: error })
        }
        con.query(
            `update produtos 
            SET nome = "?",
            preco = ?
            where id_produtos = ?;`,
            [
                req.body.nome,
                req.body.preco,
                req.body.id_produtos
            ],
            (erro, resultado, field) => {
                con,release()
                if (error) {
                    return res.send(error)
                }
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: req.body.id_produtos,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                        tipo: "GET",
                        descricao: "Detalhues do produto",
                        url: "http://localhost:3000/produtos"+ req.body.id_prdodutos
                    }
                }

                return res.status(202).send(response)
             
            })
    })
})
// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, con) => {
        if (error) {
            return res.send({ Error: error })
        }
        con.query(`DELETE FROM produtos WHERE id_produtos = ?`,
            [req.body.id_produtos],
            (error, resultado, field) => {
                con,release();;
                if (error) {
                    return res.send({
                        Error: error
                    })
                }
                return res.status(200).send({
                    produto: "Deletado"
                })
            })
    })
})

module.exports = router;