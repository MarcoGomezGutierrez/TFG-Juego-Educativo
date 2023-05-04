const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const sql = require('mssql');

const SECRET_KEY = 'mysecretkey';

const config = {
  user: 'tfg',
  password: '8ccbeccd93047af8e7a73064aec345ab57d5a5443417f562f8a0c39fdc5a6136',
  server: 'DESKTOP-ADGVC7E\SQLEXPRESS',
  database: 'TFG',
}

sql.connect(config, err => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Configura el middleware para procesar los datos de solicitud POST en formato JSON
app.use(express.json(), cors());

app.get('/', (req, res) => {
    res.send(`get/`);
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

// Inicia el servidor en el puerto 3000
http.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});