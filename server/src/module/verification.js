const express = require('express');
const router = express.Router();
const db  = require('../module/connection');
const jwt = require('jsonwebtoken');
//require('dotenv').config();

const SECRET_KEY = "my-token-password";

router.post('/verification', (req, res) => {
    const { token } = req.body;
    let verification = verificationToken(token);// Verificacion de sesion
    if (verification === null) { // Devuelve cuando el token ha expirado o no existe ningún token
        // El token no es válido
        return res.status(401).send({
            msg: "Token no válido, sesión expirada"
        });
    }
    return res.status(200).send({
        msg: "Token autorizado",
        access: verification,// Si el access es true significa que puede editar la DB
        token: token
    });
});

function verificationToken(token) {
    var access = false;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // El token no es válido
            access = null;
        } else if (decoded.username === "admin") {
            access = true;
        } else {
            access = false;
        }  
    });
    return access;
}

function getIdToken(token) {
    var id = null;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // El token no es válido
            id = null;
        } else {
            id = decoded.id;
        }  
    });
    return id;
}

module.exports = { 
    verification: router, 
    verificationToken: verificationToken,
    getIdToken: getIdToken
};