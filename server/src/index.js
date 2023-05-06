const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const jwt = require('jsonwebtoken');
const io = require('socket.io')(http);
const encrypt = require('./other/encrypt');
const router = require('./module/router');
const pretty = require('express-prettify');

const connection = require('./module/connection')

const SECRET_KEY = '2ae1e4c9d2f529906e37094f9ef0318a205a5339d790eff35bf9e536dd594317';

const puerto = 8080;

app.use(express.json());

// Configura el middleware para procesar los datos de solicitud POST en formato JSON
app.use(cors());

// Ver formato json en response pretty
app.use(pretty({ query: 'pretty' }));

// Configura una ruta para manejar la solicitud POST del cliente para registrar un nuevo usuario
app.use('/app', router);

app.get('/', (req, res) => {
    res.send(`get/`);
});

app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, apellido, email, fecha_nacimiento } = req.body; // Obtener los campos del cuerpo de la solicitud
    await connection.query('INSERT INTO usuarios (nombre, apellido, email, fecha_nacimiento) VALUES (?, ?, ?, ?)', [nombre, apellido, email, fecha_nacimiento]); // Insertar el registro en la tabla
    res.status(201).send('Registro agregado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/temarios', (req, res) => {
  connection.query('SELECT * FROM temarios', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/temarios', async (req, res) => {
  try {
    const { nombre_temario, numero_niveles } = req.body; // Obtener los campos del cuerpo de la solicitud
    await connection.query('INSERT INTO temarios (nombre_temario, numero_niveles) VALUES (?, ?)', [nombre_temario, numero_niveles]); // Insertar el registro en la tabla
    res.status(201).send('Registro agregado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/temarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre_temario, numero_niveles } = req.body;
    await connection.query('UPDATE temarios SET nombre_temario = ?, numero_niveles = ? WHERE id = ?', [nombre_temario, numero_niveles, id]);
    res.status(200).send('Registro actualizado con éxito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


// Cerrar la conexión a la base de datos cuando el proceso se detenga
app.on('exit', () => {
  connection.end();
});

app.on('SIGINT', () => {
  console.info('Cerrando conexión con la base de datos');
  connection.end((err) => {
    if (err) {
      console.error(err);
      app.exit(1);
    }
    console.info('Conexión cerrada correctamente');
    app.exit(0);
  });
});

// Inicia el servidor en el puerto 8080
http.listen(puerto, () => {
    console.log(`Servidor iniciado http://localhost:${puerto}/`);
});