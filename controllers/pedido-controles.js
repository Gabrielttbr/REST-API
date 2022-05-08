const MysqlConnection = require("../db").pool;

exports.getPedidos = (req, res, next) => {
  MysqlConnection.getConnection((error, con) => {
    if (error) {
      return console.log(error);
    }
    con.query("SELECT * FROM pedidos", (error, resultado, fixed) => {
      con.release();

      if (error) {
        res.status(500).send({ erro: error, response: null });
      }
      const response = {
        qunatidade: resultado.length,
        mss: "Todos os pedidos",
        Pedidos: resultado.map((ped) => {
          return {
            id_pedido: ped.id_pedido,
            quantidade: ped.Quantidade,
            id_produto: ped.id_produto,
          };
        }),
      };
      res.status(200).send(response);
    });
  });
};

exports.getPedidoEspesifico = (req, res, next) => {
  MysqlConnection.getConnection((error, con) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    con.query(
      "SELECT * FROM pedidos where id_pedido = ?",
      [req.body.id_pedido],
      (erro, result) => {
        con.release(); 
        if (erro) {
          return res.status(500).send({ erro: erro });
        }
        if (result.length == 0) {
          return res.status(404).send({ mss: "Não encontrado" });
        }
        const response = {
          qunatidade: result.length,
          pedido: {
            id_pedido: req.body.id_pedido,
            quantidade: result[0].quantidade,
            id_produto: result[0].id_produto,
            request: {
              tipo: "GET",
              detalhes: "Todos os pedidos",
              url: "http://localhost:3000/Pedidos",
            },
          },
        };
        res.status(201).send(response);
      }
    );
  });
}

exports.postPedidos = (req, res, next) => {
  MysqlConnection.getConnection((error, con) => {
    con.release(); 

    if (error) {
      return console.log(error);
    }
    con.query(
      "INSERT INTO pedidos (Quantidade, id_produto) VALUES (?, ?)",
      [req.body.quantidade, req.body.id_produto],
      (error, resultado, fixed) => {
        if (error) {
          res.status(500).send({ erro: error, response: null });
        }
        const response = {
          quantidade: resultado.length,
          menssage: "Pedido inserido com sucesso",
          PedidoCriado: {
            id_pedido: resultado.insertId,
            qunatidade: req.body.qunatidade,
            id_produto: req.body.id_produto,
            request: {
              tipo: "GET",
              detalhes: "Todos os pedidos",
              url: "http://localhost:3000/Pedido",
            },
          },
        };
        res.status(201).send(response);
      }
    );
  });
}

exports.patchPedidos = (req, res, next) => {
  MysqlConnection.getConnection((error, con) => {
    if(error){ return res.status(500).send({error: error})}
    con.query(
      
      'SELECT * FROM pedidos where id_pedido = ?',
      [req.body.id_pedido],
      (error, result) => {
        con.release(); 
        if(error){ return res.status(500).send({error: error})}
        if(result.length == 0){ return res.status(404).send({ msss: "Pedido não encontrado"})}
        con.query(
          'UPDATE pedidos SET id_produto = ?, Quantidade = ? WHERE id_pedido = ?',
          [req.body.id_produto, req.body.quantidade, req.body.id_pedido],
          (error, result) => {
            if(error){ return res.status(500).send({error: error})}
            const response = {
              qunatidade: result.length,
              message: "Atualiza um pedido",
              pedidoAtualizado: {
                id_pedido: req.body.id_pedido,
                id_produto: req.body.id_produto,
                quantidade: req.body.quantidade,
                request: {
                  tipo: "GET",
                  detalhes: "Todos os pedidos",
                  url: "http://localhost:3000/Pedido",
                },  
              }
            }
            res.status(201).send(response)
          }
        )
      } 
    )
  } )
}

exports.deletePedido = (req, res, next) => {
  MysqlConnection.getConnection((error, con) => {
    if(error){ return res.status(500).send({error: error})}
    con.query(
      'SELECT * FROM pedidos where id_pedido = ?',
      [req.body.id_pedido],
      (error, result) => {
        if(error){ return res.status(500).send({error: error})}
        if(result.length == 0){ return res.status(404).send({mss: "Não encontrado"})}
        con.query(
          'DELETE FROM pedidos WHERE id_pedido = ?',
          [req.body.id_pedido],
          (error, result) => {
            if(error){ return res.status(500).send({error: error})}
            const response = {
              qunatidade: result.length,
              message: "Pedido deletado com sucesso",
              pedidoDeletado: {
                id_pedido: req.body.id_pedido,
                request: {
                  tipo: "GET",
                  detalhes: "Todos os pedidos",
                  url: "http://localhost:3000/Pedido",
                },  
              }
            }
            res.status(201).send(response)
          }
        )
      }
    )
  })
}