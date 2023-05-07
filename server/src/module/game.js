const express = require('express');
const router = express.Router();
const db  = require('../module/connection');

router.post('/insert', (req, res) => {
    const { temario, nivel, pregunta, respuesta } = req.body;
    console.log(respuesta);
    try {
        db.query(
            `INSERT INTO temarios (nombre)
            SELECT ?
            WHERE NOT EXISTS (SELECT 1 FROM temarios WHERE nombre = ?);
            
            SELECT id INTO @id_temario FROM temarios WHERE nombre = ?;
            
            INSERT INTO niveles (nombre, id_temario)
            SELECT ?, @id_temario
            WHERE NOT EXISTS (SELECT 1 FROM niveles WHERE nombre = ? && id_temario = @id_temario);
            
            SELECT id INTO @id_nivel FROM niveles WHERE nombre = ?;
            
            INSERT INTO preguntas (enunciado, id_nivel) VALUES(?, @id_nivel);
            
            SELECT LAST_INSERT_ID() INTO @id_pregunta;
            
            INSERT INTO respuestas (texto, correcta, id_pregunta)
            VALUES (?, ?, @id_pregunta),
                   (?, ?, @id_pregunta),
                   (?, ?, @id_pregunta),
                   (?, ?, @id_pregunta);`, 
            [temario, temario, temario, 
            nivel, nivel ,nivel, 
            pregunta, 
            respuesta.res1.texto, respuesta.res1.correcta,
            respuesta.res2.texto, respuesta.res2.correcta,
            respuesta.res3.texto, respuesta.res3.correcta,
            respuesta.res4.texto, respuesta.res4.correcta
        ],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    msg: 'Error interno del servidor'
                });
            }
            return res.status(200).send({
                msg: 'Insertado correctamente'
            });
        });
    } catch(err) {
        console.log(err);
        return res.status(404).send({
            msg: 'Error interno del servidor',
            err: err
        })
    }
});

module.exports = router;