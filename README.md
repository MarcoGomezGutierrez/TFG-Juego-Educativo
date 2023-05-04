# TFG-Juego-Educativo
Proyecto desarrollado en el segundo semestre de cuarto año de Ingeniería Informática. Este proyecto será un videojuego educativo, desarrollado con React para todas las plataformas (móvil, tablet, ordenador)

Correr Aplicación:

- Servidor:

```
cd server
```
```
npm i
```
```
node index.js
```

- Aplicación:

```
cd app
```
```
npm i
```
```
npm start
```

Estructura de carpetas del proyecto:

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

Librerias App:

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

Librerias Servidor:

- Express:

```
npm install express@4
```

- Sockets:

```
npm install socket.io
```

- JsonWebToken:

```
npm install jsonwebtoken
```

- Instalar permisos política de Cors:

```
npm install cors
```

- Manejo de Base de Datos:

```
npm install mssql
```
