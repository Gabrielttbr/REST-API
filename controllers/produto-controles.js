const MysqlConection = require("../db").pool;

exports.getProdutos = (req, res, next) => {
    MysqlConection.getConnection((error, con) => {
      if (error) {
        return console.log(error);
      }
  
      con.query("SELECT * FROM produtos" , (error, resultado, field) => {
        con.release();
        if (error) {
          return res.status(500).send({
            erro: error,
            response: null,
          });
        }
        const response = {
          quantidade: resultado.length,
          menssage: "Mostrando todos os produtos",
          produtos: resultado.map((produ) => {
            return {
              id_produto: produ.id_produto,
              nome: produ.Nome,
              preco: produ.preco,
              request: {
                tipo: "GET",
                detalhes: "Detalhes de um produto",
                url: "http://localhost:3000/Produto/" + produ.id_produto,
              },
            };
          }),
        };
        res.status(200).send(response);
      });
    });
}
exports.postProdutos = (req, res, next) => {
    // Connection databases
    MysqlConection.getConnection((error, con) => {
      if (error) {
        return console.log(error);
      }
      // Query to database
      con.query(
        "INSERT INTO produtos (Nome, preco )values (?, ?)",
        // Request body
        [req.body.nome, req.body.preco],
        (error, resultado, field) => {
          con.release(); // Libera a coneção, porque se não ele vai travar, porque o poll possui um número limitado de coneção
          //Tratamento do erro
          if (error) {
            return res.status(500).send({ erro: error, response: null });
          }
          // Response apos a insert no database
          const response = {
            quantidade: resultado.length,
            message: "Criando um novo produto",
            CriadoProduto: {
              id_produto: resultado.insertId,
              requrest: {
                tipo: "GET",
                detalhes: "Mostra todos os produtos",
                url: "http://localhost:3000/Produto",
              },
            },
          };
           return res.status(201).send(response);
        }
      );
    });
  }

exports.patchProdutos =  (req, res, next) => {
    MysqlConection.getConnection((error, con) => {
      if (error) {
        return console.log(error);
      }
      con.query(
        "SELECT * FROM produtos WHERE id_produto = ?",
        [req.body.id_produto],
        (error, result) => {
          if (error) {
            return res.status(500).send({ Error: error });
          } else {
            if (result.length == 0) {
              return res.status(404).send({
                mss: "Não existe esse produto",
              });
            }
            con.query(
              "UPDATE produtos SET Nome = ? , preco = ? WHERE id_produto = ?",
              [req.body.nome, req.body.preco, req.body.id_produto],
              (error, resultado, field) => {
                con.release();
                //Tratamento do erro
                if (error) {
                  return res.status(500).send({ erro: error, response: null });
                }
  
                const response = {
                  quantidade: resultado.length,
                  message: "Produto atualizado com exceto",
                  ProdutoAtualizado: {
                    id_produto: req.body.id_produto,
                    request: {
                      tipo: "GET",
                      detalhes: "Produto alterado, detalhes",
                      url: "http://localhost/Produto/" + req.body.id_produto,
                    },
                  },
                };
                res.status(201).send(response);
              }
            );
          }
        }
      );
    });
  }
  exports.deleteProdutos =  (req, res, next) => {
    MysqlConection.getConnection((error, con) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      con.query(
        "SELECT * FROM produtos WHERE id_produto = ?",
        [req.body.id_produto],
        (erro, result) => {
          if (erro) {
            return res.status(404).send({ error: erro });
          }if( result.length == 0){
              return res.status(500).send({mss: "Não encontrado"})
          }
          con.query(
            "DELETE FROM produto WHERE id_produto = ?",
            [req.body.id_produto],
            (erro, resultado, field) => {
              if (erro) {
                return res.status(500).send({ erro: erro });
              }
             
  
              const response = {
                quantidade: resultado.length,
                message: "Produto delado com sucesso",
                produtoDeletado: {
                  id_produto: req.body.id_produto,
                  request: {
                    tipo: "GET",
                    detalhes: "Ver todos os produtos",
                    url: "http://localhost:3000/Produto",
                  },
                },
              };
              res.status(201).send(response);
            }
          );
        }
      );
    });
  }