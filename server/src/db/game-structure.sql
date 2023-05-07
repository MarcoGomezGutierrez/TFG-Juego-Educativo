CREATE TABLE temarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO temarios (nombre)
VALUES ('Lengua');

CREATE TABLE niveles (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  id_temario INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_temario) REFERENCES temarios(id)
);

INSERT INTO niveles (nombre, id_temario)
VALUES ('Nivel 1', 1);

CREATE TABLE preguntas (
  id INT NOT NULL AUTO_INCREMENT,
  enunciado TEXT NOT NULL,
  id_nivel INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_nivel) REFERENCES niveles(id)
);

INSERT INTO preguntas (enunciado, id_nivel)
VALUES ('¿Cuál es la capital de España?', 1);

CREATE TABLE respuestas (
  id INT NOT NULL AUTO_INCREMENT,
  texto TEXT NOT NULL,
  correcta BOOLEAN NOT NULL DEFAULT false,
  id_pregunta INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_pregunta) REFERENCES preguntas(id)
);

INSERT INTO respuestas (texto, correcta, id_pregunta)
VALUES ('Madrid', true, 1),
       ('Barcelona', false, 1),
       ('Sevilla', false, 1),
       ('Valencia', false, 1);
