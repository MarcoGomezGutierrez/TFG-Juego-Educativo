const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  por: '3306',
  user: 'root',
  password: 'password',
  database: 'tfg_database'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ' + error.stack);
    return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});


connection.query(`SHOW TABLES LIKE 'users'`, (error, results, fields) => {
  if (error) throw error;
  
  if (results.length === 0) {
    // La tabla no existe, procedemos a crearla
    connection.query(`CREATE TABLE users (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(30) NOT NULL,
      apellido VARCHAR(30) NOT NULL,
      email VARCHAR(50),
      fecha_nacimiento DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (error, results, fields) => {
      if (error) throw error;
      console.log('Tabla users creada con éxito.');
    });
  }
});

connection.query(`SHOW TABLES LIKE 'temarios'`, (error, results, fields) => {
  if (error) throw error;
  
  if (results.length === 0) {
    // La tabla no existe, procedemos a crearla
    connection.query(`CREATE TABLE temarios (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      nombre_temario VARCHAR(50) NOT NULL,
      numero_niveles INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`, (error, results, fields) => {
      if (error) throw error;
      console.log('Tabla temarios creada con éxito.');
    });
  }
});

module.exports = connection;