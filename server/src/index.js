const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const router = require("./module/router");
const { verification } = require("./module/verification");
const game = require("./module/game");
const pretty = require("express-prettify");
require("dotenv").config();

const connection = require("./module/connection");

/* Lectura del certificado */
const privateKey = fs.readFileSync("./certificate/privatekey.pem", "utf8");
const certificate = fs.readFileSync("./certificate/certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();

//Permitir direcciones y dominios
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.0.11:3000",
  "http://172.20.48.1:3000",
];

const IP = process.env.SERVERIP || "192.168.0.11";
const puerto = process.env.PORT || 443;

app.use(express.json());

// Configura el middleware para procesar los datos de solicitud POST en formato JSON
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Ver formato json en response pretty
app.use(pretty({ query: "pretty" }));

// Configura una ruta para manejar la solicitud POST del cliente para registrar un nuevo usuario
app.use("/app", router);
app.use("/app", verification);

// Traer datos respectivos de todos los temas y cargar juego
app.use("/game", game);

app.get("/", (req, res) => {
  res.send(`get/`);
});

// Cerrar la conexión a la base de datos cuando el proceso se detenga
app.on("exit", () => {
  connection.end();
});

app.on("SIGINT", () => {
  console.info("Cerrando conexión con la base de datos");
  connection.end((err) => {
    if (err) {
      console.error(err);
      app.exit(1);
    }
    console.info("Conexión cerrada correctamente");
    app.exit(0);
  });
});

// 404
app.get("*", function (req, res) {
  res.status(404).send("Error 404 - Recurso no encontrado");
});

const httpsServer = https.createServer(credentials, app);

// Inicia el servidor en el puerto 8080
httpsServer.listen(puerto, IP, () => {
  console.log(`Servidor iniciado https://${IP}:${puerto}/`);
});
