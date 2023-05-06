const express = require('express');
const router = express.Router();
const db  = require('../module/connection');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "my-token-password";
 
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    try {
        db.query(
            `SELECT * FROM users WHERE username = ? || email = ?;`, [username, email],
            (err, result) => {
                
                // Usuario no existe
                if (err) {
                    return res.status(400).send({
                        msg: err
                    });
                }
                if (!result.length) {
                    const token = jwt.sign({username},SECRET_KEY,{ expiresIn: '1h' });
                    db.query(
                        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, 
                        [username, email, password]
                    );
                    return res.status(200).send({
                        msg: 'Usuario añadido con éxito',
                        token,
                        user: result[0]
                    });
                } else {
                    return res.status(401).send({
                        msg: 'Usuario o correo existente'
                    })
                }
            }
        );
    } catch(err) {
        return res.status(404).send({
            msg: 'Error interno del servidor'
        })
    }
});
 
module.exports = router;