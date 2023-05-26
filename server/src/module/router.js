const express = require("express");
const router = express.Router();
const db = require("../module/connection");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer.js");
const { verificacionCuenta } = require("./verification");
require("dotenv").config();

const VERIFICACION =
  process.env.VERIFICACION || "https://192.168.0.11:443/app/verificacion";
const SECRET_KEY =
  process.env.SECRET_KEY ||
  "c60b50511cd15feebbd52bb7f73bd45e17a99f9754be336551066c49033b1b43";

router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Usuario inicia sesión
router.get("/login", (req, res) => {
  const { username, password } = req.query;
  try {
    db.query(
      `SELECT * FROM users WHERE username = ?;`,
      [username],
      (err, result) => {
        // Usuario no existe
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          //El usuario no existe porque no se ha encontrado nada en la consulta sql
          return res.status(401).send({
            msg: "¡El usuario no existe!",
          });
        } else if (password === result[0]["password"]) {
          //Confirmar contraseña
          const token = jwt.sign(
            { username, id: result[0]["id"] },
            SECRET_KEY,
            { expiresIn: "5h" }
          );
          return res.status(200).send({
            msg: "¡Has iniciado sesión correctamente!",
            token,
            username: result[0]["username"],
            email: result[0]["email"],
            id: result[0]["id"],
          });
        } //Contraseña incorrecta
        else {
          return res.status(401).send({
            msg: "¡Contraseña incorrecta!",
          });
        }
      }
    );
  } catch (err) {
    return res.status(404).send({
      msg: "Error interno del servidor",
    });
  }
});

// Usuario se registra en la aplicación
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    db.query(
      `SELECT * FROM users WHERE username = ? || email = ?;`,
      [username, email],
      async (err, result) => {
        // Usuario no existe
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        if (!result.length) {
          const token = jwt.sign({ username, email, password }, SECRET_KEY, {
            expiresIn: "1h",
          });
          // send mail with defined transport object
          await transporter.sendMail({
            from: '"Verifiación del Email 👻" <marco.gomez@alumnos.uneatlantico.es>', // sender address
            to: email, // list of receivers
            subject: "Verificación del Email ✔", // Subject line
            html: `
              <h1 style="color: #333; font-family: Arial;">Primary Verificación ✔</h1>
              <p style="font-size: 16px; line-height: 1.5;">Por favor, si has sido tu quien has registrado este correo en Primary haga click en: Verificar mi cuenta</p>
              <div style="background-color: #f2f2f2; padding: 10px;">
                <a href="${VERIFICACION}?token=${token}" style="font-style: italic;">Verificar mi cuenta</a>
              </div>
              `,
          });
          return res.status(200).send({
            msg: "Email valido",
            email: true,
          });
        } else {
          return res.status(401).send({
            msg: "Email no valido",
            email: false,
          });
        }
      }
    );
  } catch (err) {
    return res.status(401).send({
      msg: "Email no valido",
      email: false,
    });
  }
});

router.get("/verificacion", (req, res) => {
  const token = req.query.token;

  // Verificar la validez del token y realizar la inserción en la base de datos si es válido
  const decoded = verificacionCuenta(token);
  if (decoded !== null) {
    const username = decoded.username;
    const email = decoded.email;
    const password = decoded.password;
    try {
      db.query(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password]
      );
      res.redirect("http://localhost:3000/sign-in");
    } catch (err) {
      res.send("Error de verificación");
    }
  } else {
    // Mostrar un mensaje de error si el token no es válido
    res.send("Error de verificación");
  }
});

// Ruta para la página de éxito de verificación
/*router.get("/verificacion-exitosa", (req, res) => {
  res.send("¡Verificación exitosa! Tus datos han sido registrados.");
});*/

module.exports = router;
