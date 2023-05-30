# Dockerfile para el servidor

# Descargar la imagen especificando la versión de Node.js
FROM node:18

# Creación de la carpeta dentro del contenedor de Docker
RUN mkdir -p /server

# Ruta especifica donde vamos a estar trabajando en Docker
WORKDIR /server

# Copiar las dependencias para luego instalarlas
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Archivos de programa
COPY . .

# El puerto que se va a poder escuchar desde mi ordenador local
EXPOSE 8080

VOLUME [ "/server/node_modules" ]

# Comando que necesita saber Docker para levantar mi aplicación
CMD [ "npm", "run", "dev" ]
