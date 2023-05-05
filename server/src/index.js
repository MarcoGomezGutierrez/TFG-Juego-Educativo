const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const connection = require('./connection')

const SECRET_KEY = 'mysecretkey';

const puerto = 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`get/`);
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/users', async (req, res) => {
  try {
    const { nombre, apellido, email, fecha_nacimiento } = req.body; // Obtener los campos del cuerpo de la solicitud
    await connection.query('INSERT INTO users (nombre, apellido, email, fecha_nacimiento) VALUES (?, ?, ?, ?)', [nombre, apellido, email, fecha_nacimiento]); // Insertar el registro en la tabla
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

// Configura una ruta para manejar la solicitud POST del cliente para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Verifica las credenciales del usuario
    if (username === 'asd' && password === '123') {
      // Genera un token único utilizando la biblioteca JWT
      const token = jwt.sign({ username }, SECRET_KEY);
  
      // Envía el token al cliente
      res.json({ token });
    } else {
      // Devuelve un error al cliente si las credenciales son inválidas
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

// Inicia el servidor en el puerto 8080
http.listen(puerto, () => {
    console.log('Servidor iniciado en el puerto ', puerto);
});