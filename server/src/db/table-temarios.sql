CREATE TABLE temarios (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      nombre_temario VARCHAR(50) NOT NULL,
      numero_niveles INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

/*
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
*/