const express = require('express');
const router = express.Router();
const db  = require('../module/connection');
const jwt = require('jsonwebtoken');
//require('dotenv').config();

const SECRET_KEY = "my-token-password";

router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
});

// Usuario inicia sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    try {
        db.query(
            `SELECT * FROM users WHERE username = ?;`, [username],
            (err, result) => {
                
                // Usuario no existe
                if (err) {
                    return res.status(400).send({
                        msg: err
                    });
                }
                if (!result.length) /*El usuario no existe porque no se ha encontrado nada en la consulta sql*/ {
                    return res.status(401).send({
                        msg: '¡El usuario no existe!'
                    });
                } else if (password === result[0]['password']) /*Confirmar contraseña*/ {
                    const token = jwt.sign({username},SECRET_KEY,{ expiresIn: '5h' });
                    return res.status(200).send({
                        msg: '¡Has iniciado sesión correctamente!',
                        token,
                        username: result[0]['username'],
                        email: result[0]['email']
                    });
                } else /*Contraseña incorrecta*/ {
                    return res.status(401).send({
                        msg: '¡Contraseña incorrecta!'
                    });
                }
            }
        );
    } catch(err) {
        return res.status(404).send({
            msg: 'Error interno del servidor'
        })
    }
});

// Usuario se registra en la aplicación
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
                        username,
                        email,
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