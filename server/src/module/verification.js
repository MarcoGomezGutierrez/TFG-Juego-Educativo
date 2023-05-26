const express = require("express");
const router = express.Router();
const db = require("../module/connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "c60b50511cd15feebbd52bb7f73bd45e17a99f9754be336551066c49033b1b43";

router.post("/verification", (req, res) => {
  const { token } = req.body;
  let verification = verificationToken(token); // Verificacion de sesion
  if (verification === null) {
    // Devuelve cuando el token ha expirado o no existe ningún token
    // El token no es válido
    return res.status(401).send({
      msg: "Token no válido, sesión expirada",
    });
  }
  return res.status(200).send({
    msg: "Token autorizado",
    access: verification, // Si el access es true significa que puede editar la DB
    token: token,
  });
});

/**
 * Verificación de que un token es válido y es el usario de administrador para que tenga acceso a editar la base de datos desde el cliente.
 */
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

/**
 * Verificación de una cuenta existente, si el usuario hace click desde el enlace verificaremos que el token que esta pasando es válido
 */
function verificacionCuenta(token) {
  var verificacion = null;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // El token no es válido
      verificacion = null;
    } else {
      verificacion = decoded;
    }
  });
  return verificacion;
}

/**
 * Traerse el id del token proporcionado
 */
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
  getIdToken: getIdToken,
  verificacionCuenta: verificacionCuenta,
};
