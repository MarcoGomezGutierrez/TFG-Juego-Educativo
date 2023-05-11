const express = require('express');
const router = express.Router();
const db  = require('../module/connection');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "my-token-password";

router.post('/loby', (req, res) => {
    const { token } = req.body;

    // Verificar la validez del token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // El token no es válido
            res.status(401).send({
                msg: "Token no válido, sesión expirada"
            });
        } else {
            // El token es válido
            console.log('Token válido');
            console.log(decoded); // Decodificar la información del token
            res.status(200).send({
                msg: "Token valido",
                token: token
            });
        }
    });
});

router.post('/edit', (req, res) => {
    const { token } = req.body;

    // Verificar la validez del token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // El token no es válido
            return res.status(401).send({
                msg: "Token no válido, sesión expirada"
            });
        } else if (decoded.username === "admin") {
            return res.status(200).send({
                msg: "Token autorizado para editar la base de datos",
                token: token
            });
        } else {
            return res.status(401).send({
                msg: "Sin autorización",
                token: token
            });
        }
            
    });
});

module.exports = router;