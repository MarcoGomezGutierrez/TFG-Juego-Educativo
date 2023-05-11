DELIMITER $$

CREATE PROCEDURE registrar_usuario(
    IN p_token VARCHAR(255),
    IN p_nombre_usuario VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    OUT p_resultado INT
)
BEGIN
    DECLARE contador INT;
    -- Contar si el Token esta repetido e insertarlo en la variable contador
    SELECT COUNT(*) INTO contador FROM usuarios WHERE token = p_token;

    IF contador > 0 THEN
        SET p_resultado = 0;
    ELSE
        SET p_resultado = 1;
        INSERT INTO usuarios (token, nombre, email, contraseña) 
        VALUES (p_token, p_nombre_usuario, p_email, p_password);
    END IF;
END$$

DELIMITER ;

-- CALL registrar_usuario(token, , @resultado);
-- SELECT @resultado;

/*

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

*/