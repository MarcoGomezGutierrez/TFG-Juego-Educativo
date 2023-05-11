CREATE TABLE users (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(30) COLLATE utf8mb4_unicode_ci NOT NULL,
      email VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
      password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

DELETE FROM users WHERE id = 1;

/*
connection.query(`SHOW TABLES LIKE 'usuarios'`, (error, results, fields) => {
  if (error) throw error;
  
  if (results.length === 0) {
    // La tabla no existe, procedemos a crearla
    connection.query(`CREATE TABLE usuarios (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(30) NOT NULL,
      email VARCHAR(50),
      contraseña VARCHAR(64),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`, (error, results, fields) => {
      if (error) throw error;
      console.log('Tabla usuarios creada con éxito.');
    });
  }
});
*/