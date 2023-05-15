const mysql = require('mysql');

require('dotenv').config();

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = process.env.DB_PORT || "3306";
const DB_USER = process.env.DB_USER || "root"
const DB_PASSWORD = process.env.DB_PASSWORD || "password"
const DB_DATABASE = process.env.DB_DATABASE || "tfg_database"

const connection = mysql.createConnection({
  host: DB_HOST,
  por: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
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