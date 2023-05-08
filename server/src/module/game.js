const express = require('express');
const router = express.Router();
const db  = require('../module/connection');

router.get('/temarios', (req, res) => {
    try {
        db.query(`
        SELECT temarios.nombre AS nombre_temario, niveles.nombre AS nombre_nivel, preguntas.enunciado AS enunciado_pregunta, 
        respuestas1.texto AS respuesta1_texto, respuestas1.correcta AS respuesta1_correcta, 
        respuestas2.texto AS respuesta2_texto, respuestas2.correcta AS respuesta2_correcta,
        respuestas3.texto AS respuesta3_texto, respuestas3.correcta AS respuesta3_correcta,
        respuestas4.texto AS respuesta4_texto, respuestas4.correcta AS respuesta4_correcta
        FROM temarios 
        INNER JOIN niveles ON temarios.id = niveles.id_temario 
        INNER JOIN preguntas ON niveles.id = preguntas.id_nivel 
        INNER JOIN respuestas AS respuestas1 ON preguntas.id = respuestas1.id_pregunta AND respuestas1.id = (4 * (preguntas.id - 1)) + 1
        INNER JOIN respuestas AS respuestas2 ON preguntas.id = respuestas2.id_pregunta AND respuestas2.id = (4 * (preguntas.id - 1)) + 2
        INNER JOIN respuestas AS respuestas3 ON preguntas.id = respuestas3.id_pregunta AND respuestas3.id = (4 * (preguntas.id - 1)) + 3
        INNER JOIN respuestas AS respuestas4 ON preguntas.id = respuestas4.id_pregunta AND respuestas4.id = (4 * (preguntas.id - 1)) + 4
        ORDER BY nombre_temario, nombre_nivel;
        `, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    msg: 'Error interno del servidor'
                });
            }
            console.log(results);
            return res.status(200).send({
                results
            });
        });
    } catch(err) {
        console.log(err);
    }
});

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
            
            SELECT id INTO @id_nivel FROM niveles WHERE nombre = ? && id_temario = @id_temario;
            
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