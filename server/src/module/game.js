const express = require("express");
const router = express.Router();
const { verificationToken, getIdToken } = require("./verification");
const db = require("../module/connection");

router.get("/temarios", (req, res) => {
  try {
    db.query(
      `
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
        `,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            msg: "Error interno del servidor",
          });
        }
        console.log(results);
        return res.status(200).send({
          results,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

/**
 * Creación sección de repaso
 */
router.post("/incorrectas", (req, res) => {
  const { token, idPreguntasFalladas } = req.body;
  const id_user = getIdToken(token);
  try {
    let placeholders = idPreguntasFalladas.map(() => "(?, ?)").join(",");
    let values = [];
    idPreguntasFalladas.forEach((id_pregunta) => {
      values.push(id_user, id_pregunta);
    });

    // Insertar preguntas falladas para generar la sección de repaso
    db.query(
      `INSERT INTO preguntas_falladas (id_user, id_pregunta)
       VALUES ${placeholders}`,
      values
    );

    res.status(200).json({ success: "Datos insertados correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
});

/**
 * Eliminación de las preguntas de repaso que el usuario acierte
 */
router.delete("/preguntas-repaso", (req, res) => {
  const { token, idPreguntasAcertadas } = req.query;
  const id_user = getIdToken(token);
  try {
    const placeholders = idPreguntasAcertadas.map(() => "?").join(",");
    const values = [...idPreguntasAcertadas, id_user];

    db.query(
      `DELETE FROM preguntas_falladas
       WHERE id IN (${placeholders}) AND id_user = ?`,
      values,
      (err, result) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          res.status(500).json({ error: "Error" });
          return;
        }

        res.status(200).json({ success: "Registros eliminados correctamente" });
      }
    );
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    res.status(500).json({ error: "Error" });
  }
});

// Si el usuario esta registrado y hay un token valido devolvemos si tiene acceso para editar la base de datos y los datos de la base de datos
router.get("/temarios-agrupados", (req, res) => {
  const { token } = req.query;
  let verification = verificationToken(token);
  if (verification === null) {
    return res.status(401).send({
      msg: "Token no válido, sesión expirada",
    });
  }

  // Obtener la ID del usuario a partir del token
  const id_user = getIdToken(token);

  // Obtener las preguntas falladas del usuario
  getPreguntasFalladas(id_user, (preguntasFalladas) => {
    getTemariosAgrupados((data) => {
      const response = {
        msg: verification ? "Token autorizado" : "Token no autorizado",
        access: verification,
        token: token,
        data: data,
        repaso: preguntasFalladas,
      };

      return res.status(200).send(response);
    });
  });
});

router.get("/control", (req, res) => {
  const { token } = req.query;
  let verification = verificationToken(token);
  if (verification === null || verification === false) {
    return res.status(401).send({
      msg: "Token no válido, sesión expirada",
    });
  }
  // Obtener las preguntas falladas del usuario
  getTodosFallosUsuarios((data) => {
    const response = {
      access: verification,
      data: data,
    };

    return res.status(200).send(response);
  });
});

/* Respuesta para comprobar datos rápidamente */
if (process.env.NODE_ENV === "development") {
  // Solo en entorno de desarrollo, nunca en producción
  router.get("/test", (req, res) => {
    const id_user = 1;

    // Obtener las preguntas falladas del usuario
    getPreguntasFalladas(id_user, (preguntasFalladas) => {
      getTemariosAgrupados((data) => {
        const response = {
          data: data,
          repaso: preguntasFalladas,
        };

        return res.status(200).send(response);
      });
    });
  });
}

/**
 * Lo que hace la consulta SQL es traer todo el contenido de las tablas unidas en 1, y utilizo CAST(SUBSTRING)
 * para extraer el número que está al final del Tema, luego Tema tiene 4 caracteres + 1 que es el espacio + 1
 * que es donde empieza el número y consiguiendo Ordenar los Niveles correctamente. Porque lo que pasaría si
 * dejo puesto n.nombre directamente si tengo un Tema 11 me lo añadiría seguido del Tema 1.
 * @param {*} callback
 */
function getTemariosAgrupados(callback) {
  try {
    db.query(
      `
      SELECT t.nombre AS nombre_temario, n.nombre AS nivel, p.enunciado AS pregunta, p.url_imagen AS url_imagen, p.id AS id_pregunta, r.texto AS respuesta, r.correcta
      FROM temarios t
      INNER JOIN niveles n ON t.id = n.id_temario
      INNER JOIN preguntas p ON n.id = p.id_nivel
      INNER JOIN respuestas r ON p.id = r.id_pregunta
      ORDER BY t.nombre, CAST(SUBSTRING(n.nombre, 6) AS UNSIGNED), p.id, r.id;
      `,
      (err, results) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", error);
          callback(null);
        }
        const data = formatData(results);
        callback(data);
      }
    );
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    callback(null);
  }
}

// Traer una tabla con todos los fallos de los usuarios
function getTodosFallosUsuarios(callback) {
  try {
    db.query(
      `SELECT u.username AS username,
      p.enunciado AS pregunta,
      n.nombre AS nivel,
      t.nombre AS temario
      FROM preguntas_falladas pf
      INNER JOIN preguntas p ON pf.id_pregunta = p.id
      INNER JOIN users u ON pf.id_user = u.id
      INNER JOIN niveles n ON n.id = p.id_nivel
      INNER JOIN temarios t ON t.id = n.id_temario
      ORDER BY u.username;`,
      (err, results) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          callback([]);
          return;
        }

        // Procesar los resultados y generar el JSON
        const groupedData = {};
        results.forEach((row) => {
          const { username, pregunta, nivel, temario } = row;
          if (!groupedData[username]) {
            groupedData[username] = [];
          }
          groupedData[username].push({ pregunta, nivel, temario });
        });

        callback(groupedData);
      }
    );
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    callback([]);
  }
}

// Guardarme en una sección nueva del JSON la sección de repaso
function getPreguntasFalladas(id_user, callback) {
  try {
    db.query(
      `SELECT pf.id, p.enunciado AS pregunta, p.url_imagen, r.texto AS respuesta, r.correcta
       FROM preguntas_falladas pf
       INNER JOIN preguntas p ON pf.id_pregunta = p.id
       INNER JOIN respuestas r ON p.id = r.id_pregunta
       WHERE pf.id_user = ?`,
      [id_user],
      (err, results) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          callback([]);
          return;
        }

        const preguntasFalladas = [];
        const preguntasMap = new Map();

        for (const row of results) {
          const preguntaId = row.id;
          if (!preguntasMap.has(preguntaId)) {
            const pregunta = {
              id_pregunta: preguntaId,
              pregunta: row.pregunta,
              url_imagen: row.url_imagen,
              respuestas: [],
            };
            preguntasMap.set(preguntaId, pregunta);
            preguntasFalladas.push(pregunta);
          }

          const pregunta = preguntasMap.get(preguntaId);
          pregunta.respuestas.push({
            respuesta: row.respuesta,
            correcta: row.correcta === 1,
          });
        }

        callback(preguntasFalladas);
      }
    );
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    callback([]);
  }
}

// Función para formatear los datos obtenidos de la consulta
function formatData(results) {
  const data = [];
  let currentTemario = null;
  let currentNivel = null;
  let currentPregunta = null;

  for (const row of results) {
    if (row.nombre_temario !== currentTemario) {
      currentTemario = row.nombre_temario;
      data.push({
        nombre_temario: currentTemario,
        niveles: [],
      });
      currentNivel = null;
      currentPregunta = null;
    }

    const temario = data[data.length - 1];
    const niveles = temario.niveles;

    if (row.nivel !== currentNivel) {
      currentNivel = row.nivel;
      niveles.push({
        nivel: currentNivel,
        preguntas: [],
      });
      currentPregunta = null;
    }

    const nivel = niveles[niveles.length - 1];
    const preguntas = nivel.preguntas;
    if (row.pregunta !== currentPregunta) {
      currentPregunta = row.pregunta;
      preguntas.push({
        pregunta: currentPregunta,
        id_pregunta: row.id_pregunta,
        url_imagen: row.url_imagen, // Agregar la propiedad url_imagen en el objeto pregunta
        respuestas: [],
      });
    }

    const pregunta = preguntas[preguntas.length - 1];
    pregunta.respuestas.push({
      respuesta: row.respuesta,
      correcta: row.correcta === 1,
    });
  }

  return data;
}

/**
 * Método que inserta los datos de los Temarios, Niveles, Preguntas y Respuestas en la Base de Datos
 */
router.post("/insert", (req, res) => {
  const { temario, nivel, pregunta, respuesta, url_imagen } = req.body;

  try {
    let sql = `
            INSERT INTO temarios (nombre)
            SELECT ?
            WHERE NOT EXISTS (SELECT 1 FROM temarios WHERE nombre = ?);
            
            SELECT id INTO @id_temario FROM temarios WHERE nombre = ?;
            
            INSERT INTO niveles (nombre, id_temario)
            SELECT ?, @id_temario
            WHERE NOT EXISTS (SELECT 1 FROM niveles WHERE nombre = ? && id_temario = @id_temario);
            
            SELECT id INTO @id_nivel FROM niveles WHERE nombre = ? && id_temario = @id_temario;
            
            INSERT INTO preguntas (enunciado, id_nivel, url_imagen)
            VALUES (?, @id_nivel, ?);
            
            SELECT LAST_INSERT_ID() INTO @id_pregunta;
            
            INSERT INTO respuestas (texto, correcta, id_pregunta)
            VALUES (?, ?, @id_pregunta),
                   (?, ?, @id_pregunta),
                   (?, ?, @id_pregunta),
                   (?, ?, @id_pregunta);`;

    let values = [
      temario,
      temario,
      temario,
      nivel,
      nivel,
      nivel,
      pregunta,
      url_imagen,
      respuesta.res1.texto,
      respuesta.res1.correcta,
      respuesta.res2.texto,
      respuesta.res2.correcta,
      respuesta.res3.texto,
      respuesta.res3.correcta,
      respuesta.res4.texto,
      respuesta.res4.correcta,
    ];

    // Inserto los valores en la base de datos
    db.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          msg: "Error interno del servidor",
        });
      }
      return res.status(200).send({
        msg: "Insertado correctamente",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      msg: "Error interno del servidor",
      err: err,
    });
  }
});

module.exports = router;
