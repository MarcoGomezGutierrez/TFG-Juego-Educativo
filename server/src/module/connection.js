const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  por: '3306',
  user: 'root',
  password: 'password',
  database: 'tfg_database',
  multipleStatements: true
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ' + error.stack);
    return;
  }
  console.log('Connected to database with ID ' + connection.threadId);
});

module.exports = connection;