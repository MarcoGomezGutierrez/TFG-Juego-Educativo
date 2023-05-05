# TFG-Juego-Educativo
Proyecto desarrollado en el segundo semestre de cuarto año de Ingeniería Informática. Este proyecto será un videojuego educativo, desarrollado con React para todas las plataformas (móvil, tablet, ordenador)

Correr Aplicación:

- Docker:

    - Levantar docker:

        ```
        docker-compose up -d
        ```

    - Salir contenedor docker:

        ```
        docker-compose down
        ```

    - Eliminar contenedor docker:

        ```
        docker-compose down --rmi all
        ```

    - Ver contenedores docker:

        ```
        docker ps
        ```

    - Ejecutar contenedor docker en terminal integrada:

        ```
        docker exec -it <nombre-contenedor> bash
        ```

        ```
        docker exec -it tfg-juego-educativo-db-1 bash
        ```

- MySQL:

    - Comprobar:

        ```
        mysql -u <usuario-base-de-datos> -p <nombre-base-de-datos>
        ```

        ```
        mysql -u root -p tfg_database
        ```

        - Te pedira la contraseña para verificar tu identidaz

- Servidor:

    - Abrir la carpeta

        ```
        cd server
        ```

    - Instalar dependencias

        ```
        npm i
        ```

    - Ejecutar el servidor

        ```
        node src/index.js
        ```

- Aplicación:

    - Abrir la carpeta del proyecto

        ```
        cd client
        ```
    
    - Instalar dependencias

        ```
        npm i
        ```

    - Iniciar aplicación

        ```
        npm start
        ```

- Estructura de carpetas del proyecto:

```
.
├── 📁 .devcontainer
│   └── 🗎 devcontainer.json
├── 📁 app
│   └── 📁 public
│       └── 🗎 index.html
|   └── 📁 src
|       └── 📁 components
|           ├── 🗎 Footer.js
|           ├── 🗎 Header.js
|           └── 🗎 Layout.js
|       └── 📁 pages
|           ├── 🗎 App.js
|           ├── 🗎 Home.js
|           ├── 🗎 SignIn.js
|           └── 🗎 SignUp.js
|       └── 📁 styles
|           └── 📁 layout
|               ├── 🗎 footer.css
|               ├── 🗎 header.css
|               └── 🗎 layout.css
|           ├── 🗎 index.css
|           └── 🗎 log.css
|       └── 🗎 index.js
│   ├── 🗎 package-lock.json
|   └── 🗎 package.json
├── 📁 server
│   ├── 🗎 index.js
│   ├── 🗎 package-lock.json
|   └── 🗎 package.json
├── 🗎 .gitignore
└── 🗎 README.md
```

- Librerias Cliente:

    - Entrelazar diferentes páginas manteniendo los estados de los componentes:

        ```
        npm install react-router-dom
        ```

    - Leer variables de entorno:

        ```
        npm install dotenv
        ```

    - Instalar Sockets para React y conectarse al servidor:

        ```
        npm install socket.io-client
        npm install axios
        ```

- Librerias Servidor:

    - Express:

        ```
        npm install express@4
        ```

    - Sockets:

        ```
        npm install socket.io
        ```

    - Manejo de Base de Datos MySQL:

        ```
        npm install mysql
        ```
