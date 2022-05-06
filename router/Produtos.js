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
            [ Number(req.params.id_prdoduto)],
            (error, resultado, field) =>{
                if(error){
                    return res.send({
                        error: error
                    })
                }
                res.status(200).send({
                    produto: resultado
                })
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
            (error, resultado, field) => {
                if (error) {
                    return res.send(
                        { error: error }
                    )
                }
                return res.status(200).send({
                    produtos: resultado
                })
            }
        )
    })

})

// ADICIONANDO TODOS OS PRODUTOS
router.post('/', (req, res, next) => {
    mysql.getConnection((error, con) => {
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
                res.status(200).send({
                    mensagem: "Produto inserido com sucesso",
                    id_produto: resultado.insertId
                })
            }
        )
    })

})

// MODIFICA OS PRODUTOS
router.patch('/', (req, res, next) => {
   mysql.getConnection((error, con) => {
       if(error){
           return res.send({error: error})
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
        (erro, resultado, field) =>{
           if(error){
               return res.send(error)
           }
           res.status(200).send({
               produto: resultado
           })
       })
   })
})
// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, con) => {
        if(error){
            return res.send({Error: error})
        }
        con.query(`DELETE FROM produtos WHERE id_produtos = ?`,
        [req.body.id_produtos],
        (error, resultado, field) => {
            if(error){
                return res.send({
                    Error: error
                } )
            }
            return res.status(200).send({
                produto: "Deletado"
            })
        })
    })
})

module.exports = router;