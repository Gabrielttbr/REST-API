const express = require("express");
const MysqlConection = require("../db").pool;
const bcrypt = require("bcrypt");
const Router = express.Router();


// CADASTRO DO USUÁRIO
Router.post("/Cadastro", (req, res, next) => {
  MysqlConection.getConnection((error, con) => {
    if (error) {
      return res.status(500).send({ erro: error });
    }
    con.query(
      "SELECT * FROM usuario WHERE email = ?",
      [req.body.email],
      (error, result) => {
        con.release();
        if (error) return res.status(500).send({ erro: error });
        if (result != 0) {
          return res.status(401).send({ mss: "Não autorizado" });
        }
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
          if (errBcrypt) return res.status(500).send({ erro: errBcrypt });
          con.query(
            "INSERT INTO usuario (email, senha) values (?, ?)",
            [req.body.email, hash],
            (error, result) => {
              con.release();
              if (error) return res.status(500).send({ erro: error });
              const response = {
                mensagem: "Usuário criado com sucesso",
                UsuarioCriado: {
                  id_usuario: result.insertId,
                  email: req.body.email,
                },
              };
              res.status(202).send(response);
            }
          );
        });
      }
    );
  });
});


// LOGIN DO USUÁRIO
Router.post("/Login", (req, res, next) => {
  MysqlConection.getConnection((error, con) => {
    if (error) return res.status(500).send({ error: error });
    con.query(
      "SELECT * FROM usuario WHERE email = ?",
      [req.body.email],
      (error, results, fields) => {
        con.release();
        if (error) return res.status(500).send({ erro: error})
        // VENDO SE O EMAIL FO ENCONTRADO NO BD
        if (results.length < 1) return res.status(401).send({mensagem: "Falha na autenticação"})
        // CHECANDO A SENHA DIGITA PELO USUÁRIO ESTA CORRETA
        bcrypt.compare(req.body.senha, results[0].senha, (erro, result ) => {
            // RETORNA ERRO
            if (erro) return res.status(401).send({mensagem: "Falha na autenticação"})
            // SE A SENNHA TIVER VÁLIDA
            if (result) return res.status(200).send({mensagem: "Autenticado com sucesso"})

            return res.status(401).send({mensagem: "Falha na autenticação"})
        })
      }
    );
  });
});

module.exports = Router;
