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
