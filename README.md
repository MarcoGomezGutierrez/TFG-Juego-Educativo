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

- Despliegue en AWS:

    - Amazon Lightsail(creación de una máquina virtual con Debian):

        Lo primero que hay que hacer es crear una máquina con Debian, y configurar una IP estatica para que cada vez que se reinicie el servidor no cambie la IP.

        Los pasos a seguir posteriormente es configurar la terminal del servidor:

        - Actualizar la lista de paquetes del Sistema Operativo:

        ```
        sudo apt-get update
        ```

        - Actualizar los paquetes:
        
        ```
        sudo apt-get upgrade
        ```

        - Instalar Node js en nuestra versión(v18.12.1):

        ```
        curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        ```

        - Despues te pedira instalar el gestor de paquetes npm:

        ```
        sudo apt-get install -y nodejs
        ```

        - Comprobar tanto si ha sido instalado node y npm:

        ```
        node --version
        ```

        ```
        npm --version
        ```

        ![version-node-npm](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/version-node-npm.PNG?raw=true)

        - Node.js en Ubuntu no podemos escuchar aplicaciones por debajo del puerto 1024. Y queremos dar permisos para que se escuche el puerto 80 que corresponde al puerto (http). Instalaremos una herramienta llamada (libcap2):

        ```
        sudo apt-get install libcap2-bin
        ```

        - Configurar Node.js para que pueda ejecutar puertos inferiores al 1024.

        ```
        sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
        ```
        - En la siguiente imagen se puede ver como libcap ya viene instalado en nuestro sistema operativo y que Node.js ya ha sido configurado correctamente para escuchar puertos por debajo del 1024.

        ![escuchar-puertos-inferiores-1024](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/escuchar-puertos.PNG?raw=true)

        - A continuación no ejecutaremos la aplicación normal como solemos hacer con node js "npm start", "node index.js", etc. Instalaremos un modulo de Node.js llamado pm2. Pm2 es un gestor de procesos para producción, nos permite ejecutar nuestra aplicación como si estuvieramos en local pero nos garantiza que si nuestro servidor se cae o se reinicia, o ocurra algún error que nos haga que nuestra aplicación se caiga, nos levante automaticamente nuestro servidor. Añadiremos -g al final para especificar que se instale de manera Global.

        ```
        sudo npm install pm2 -g
        ```

        Podemos poner el siguiente comando para ver los procesos que esten en ejecución. Por ahora no hay ningún proceso activo:

        ```
        pm2 ls
        ```

        ![pm2-ls](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/pm2-ls.PNG?raw=true)

        - Comando para que pm2 te de el comando que tienes que ejecutar para que se pm2 se ejute automáticamente en tu sistema.

        ```
        pm2 startup
        ```

        ![pm2-global](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/pm2-global.PNG?raw=true)

        Ejecutamos el comando que nos proporciona pm2:

        ```
        sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin
        ```

        Nos mostrara que pm2 ya ha sido configurado:

        ![pm2-configurado](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/pm2-configurado.PNG?raw=true)

        - Queda instalar git y clonar nuestro repositorio:

        ```
        sudo apt-get install git
        ```
        (Antes de clonar el repositorio instalar Base de Datos MySQL)
        ```
        git clone https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo.git
        ```

        - Instalar MySQL en Debian (https://computingforgeeks.com/how-to-install-mysql-on-debian-linux-system/):

        Instalar el paquete de instalación que soporta Debian 11 y Debian 10:

        ```
        wget https://dev.mysql.com/get/mysql-apt-config_0.8.18-1_all.deb
        ```

        Instalar el paquete del repositorio que te muestra la consola:
        
        ![instalar-paquete-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/instalar-mysql.PNG?raw=true)

        ```
        sudo dpkg -i mysql-apt-config_0.8.18-1_all.deb
        ```

        Cambiar la version de MySQL, por default aparecera la 8.0 y hay que cambiarlo a la 5.7 que es la que yo estoy usando en mi Base de Datos (Yo ya lo hice antes de hacer las capturas):

        ![configuracion-version-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/configurar-mysql-1.PNG?raw=true)

        ![configuracion-version-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/configurar-mysql-2.PNG?raw=true)
        
        ![configuracion-version-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/configurar-mysql-3.PNG?raw=true)

        Una vez instalado hay que actualizar los paquetes del sistema:

        ```
        sudo apt update
        ```
        Nos muestra un error de que la firma no se puede verificar:

        ![actualizar-paquetes-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/actualizar-paquetes-mysql.PNG?raw=true)

        Error que nos muestra (No copiar):

        ```
        The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 467B942D3A79BD29
        ```

        Importar GPG key(s) que falten donde (467B942D3A79BD29) es la KEY que debemos remplazar por la que nos muestre:

        ```
        sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
        ```

        ```
        sudo apt update
        ```

        Y ya estara configurado las claves:

        ![actualizar-paquetes-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/keys-actualizadas.PNG?raw=true)

        Instalar MySQL server y te pedira configurar usuario y contraseña de la Base de Datos:

        ```
        sudo apt install -y mysql-community-server
        ```
        Te pedira introducirla dos veces para que se verifique:

        ![password-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/root-password.PNG?raw=true)

        Cuando está instalado, el servicio MySQL no se inicia de forma predeterminada. Inícielo y también habilítelo para que se inicie automáticamente cada vez que se reinicie el servidor.

        ```
        sudo systemctl restart mysql
        ```

        ```
        sudo systemctl enable mysql
        ```

        ![start-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/start-mysql.PNG?raw=true)

        Hay que verificar si esta activo:

        ```
        systemctl status mysql
        ```

        ![verificar-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/verificar-mysql-activo.PNG?raw=true)

        Asegurar su instalación de base de datos MySQL. Como ya habíamos establecido la contraseña de root, se le pedirá que la ingrese para continuar y también se le preguntará si desea cambiarla.

        ```
        sudo mysql_secure_installation
        ```

        En mi caso he dicho que quiero una seguridad Fuerte (Strong), que elimine todos los usuarios y que solo se permita los usuarios root, también que resetee los privilegios de las tablas.

        ![configuracion-mysql](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/configuracion-mysql.PNG?raw=true)

        Ya puedes usar MySQL (siempre te pedira la contraseña):

        ```
        mysql -u root -p
        ```

        ```
        SHOW DATABASES;
        ```
        ![ver-mysql-db](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/mysql-databases.PNG?raw=true)

        Ver la version que se haya instalado correctamente:

        ![ver-mysql-version](https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image/ver-version.PNG?raw=true)

        Para habilitar que MySQL se pueda acceder remotamente:

        - open MySQL port 3306 on the firewall

        ```
        sudo ufw allow mysql
        ```

        - Permitir una dirección especifica para conectarte a MySQL, la IP tiene que ser local.

        ```
        sudo ufw allow from 172:26:2:23 to any port 3306
        ```

        - Clonar el repositorio:

        ```
        git clone https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo.git
        ```
https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/blob/main/readme-image\ver-version.PNG?raw=true
https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo/main/














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
    
    - Instalar crypto para utilizar sha256 para sacar el codigo hash de la contraseña:

        ```
        npm install crypto-js
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

    - Actualización del servidor sin reiniciar el servidor:

        ```
        npm install --save-dev nodemon
        ```
    
    - Generación del Token:

        ```
        npm install jsonwebtoken
        ```
    
    - Politica de cors para procesar json en una respuesta post:

        ```
        npm install cors
        ```
        
    - Texto json formato Pretty:

        ```
        npm install express-prettify
        ```
    
    - Instalación de modulo para gestionar variables de entorno:

        ```
        npm install dotenv -D
        ```
