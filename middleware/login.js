const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try{
        // PEGA O TOKEN  DO USUÁRIO!
        const token = req.headers.authorization.split(' ')[1]  
        const decode = jwt.verify(token, process.env.JWT_KEY )
        req.usuario = decode
        next()
    } catch( erro) {
        return res.status(401).send({
            mensagem: "Falha na autentificação",
            error: erro
        })
    }
}