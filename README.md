# TFG-Juego-Educativo

Proyecto desarrollado en el segundo semestre de cuarto año de Ingeniería Informática. Este proyecto será un videojuego educativo, desarrollado con React para todas las plataformas (móvil, tablet, ordenador)

## Estructura de carpetas del proyecto:

```
.
├── 📁 client
│   └── 📁 public
│       └── 🗎 index.html
|   └── 📁 src
|       └── 📁 components
|           ├── 🗎 Footer.js
|           ├── 🗎 Header.js
|           └── 🗎 Layout.js
|       └── 📁 image
|           ├── 🗎 04B_30__.TTF
|           ├── 🗎 background.jpg
|           ├── 🗎 gear.png
|           ├── 🗎 rainyhearts.ttf
|           └── 🗎 upheavtt.ttf
|       └── 📁 other
|           ├── 🗎 encrypt.js
|           └── 🗎 generateKey.js
|       └── 📁 pages
|           ├── 🗎 App.js
|           ├── 🗎 Edit.js
|           ├── 🗎 Game.js
|           ├── 🗎 Home.js
|           ├── 🗎 Loby.js
|           ├── 🗎 SignIn.js
|           └── 🗎 SignUp.js
|       └── 📁 styles
|           └── 📁 app
|               ├── 🗎 edit.css
|               ├── 🗎 game.css
|               └── 🗎 loby.css
|           └── 📁 layout
|               ├── 🗎 footer.css
|               ├── 🗎 header.css
|               └── 🗎 layout.css
|           ├── 🗎 index.css
|           └── 🗎 log.css
|       └── 🗎 index.js
│   ├── 🗎 Dockerfile
│   ├── 🗎 package-lock.json
|   └── 🗎 package.json
├── 📁 readme-image
|   ├── 🗎 images for README.md
|   └── 🗎 ...
├── 📁 server
|   └── 📁 src
|       └── 📁 db
|           └── 📁 export
|               └── 🗎 database.sql
|       └── 📁 module
|           ├── 🗎 connection.js
|           ├── 🗎 game.js
|           ├── 🗎 router.js
|           └── 🗎 verification.js
|       └── 🗎 index.js
│   ├── 🗎 .dockerignore
│   ├── 🗎 .env
│   ├── 🗎 Dockerfile
│   ├── 🗎 package-lock.json
|   └── 🗎 package.json
├── 🗎 .gitignore
├── 🗎 docker-compose.yml
└── 🗎 README.md
```

## Ejecutar Proyecto Localmente:

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

  - Creación del certificado:

    ```
    npm run certificate
    ```

  - Ejecutar el servidor

    ```
    npm start
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

## Creación del certificado

1. Generar una clave privada:

   ```
   openssl genpkey -algorithm RSA -out privatekey.pem
   ```

2. Generar una solicitud de firma de certificado (CSR):

   ```
   openssl req -new -key privatekey.pem -out csr.pem
   ```

   ```
   $ openssl req -new -key privatekey.pem -out csr.pem
   You are about to be asked to enter information that will be incorporated
   into your certificate request.
   What you are about to enter is what is called a Distinguished Name or a DN.
   There are quite a few fields but you can leave some blank
   For some fields there will be a default value,
   If you enter '.', the field will be left blank.

   ---

   Country Name (2 letter code) [AU]:ES
   State or Province Name (full name) [Some-State]:Cantabria
   Locality Name (eg, city) []:Santander
   Organization Name (eg, company) [Internet Widgits Pty Ltd]:UNEAT
   Organizational Unit Name (eg, section) []:TFG
   Common Name (e.g. server FQDN or YOUR name) []:localhost
   Email Address []:mifirmadigital

   Please enter the following 'extra' attributes
   to be sent with your certificate request
   A challenge password []:mifirmadigital
   An optional company name []:

   ```

3. Firmar el certificado con tu propia autoridad de certificación:

   ```
   openssl x509 -req -in csr.pem -signkey privatekey.pem -out certificate.pem
   ```

## Despliegue en AWS Lightsail: Servidor y DB

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

![version-node-npm](readme-image/version-node-npm.PNG)

Node.js en Debian no podemos escuchar aplicaciones por debajo del puerto 1024. Y queremos dar permisos para que se escuche el puerto 80 que corresponde al puerto (http). Instalaremos una herramienta llamada (libcap2):

```

sudo apt-get install libcap2-bin

```

Configurar Node.js para que pueda ejecutar puertos inferiores al 1024.

```

sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``

```

En la siguiente imagen se puede ver como libcap ya viene instalado en nuestro sistema operativo y que Node.js ya ha sido configurado correctamente para escuchar puertos por debajo del 1024.

![escuchar-puertos-inferiores-1024](readme-image/escuchar-puertos.PNG)

A continuación, no ejecutaremos la aplicación normal como solemos hacer con Node.js "npm start", "node index.js", etc. Instalaremos un módulo de Node.js llamado pm2. Pm2 es un gestor de procesos para producción, nos permite ejecutar nuestra aplicación como si estuvieramos en local pero nos garantiza que si nuestro servidor se cae o se reinicia, o ocurra algún error que nos haga que nuestra aplicación se caiga, nos levante automaticamente nuestro servidor. Añadiremos -g al final para especificar que se instale de manera Global.

```

sudo npm install pm2 -g

```

Podemos poner el siguiente comando para ver los procesos que esten en ejecución. Por ahora no hay ningún proceso activo:

```

pm2 ls

```

![pm2-ls](readme-image/pm2-ls.PNG)

- Comando para que pm2 te de el comando que tienes que ejecutar para que se pm2 se ejute automáticamente en tu sistema.

  ```
  pm2 startup
  ```

  ![pm2-global](readme-image/pm2-global.PNG)

  Ejecutamos el comando que nos proporciona pm2:

  ```
  sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u admin --hp /home/admin
  ```

  Nos mostrara que pm2 ya ha sido configurado:

  ![pm2-configurado](readme-image/pm2-configurado.PNG)

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

  ![instalar-paquete-mysql](readme-image/instalar-mysql.PNG)

  ```
  sudo dpkg -i mysql-apt-config_0.8.18-1_all.deb
  ```

  Cambiar la version de MySQL, por default aparecera la 8.0 y hay que cambiarlo a la 5.7 que es la que yo estoy usando en mi Base de Datos (Yo ya lo hice antes de hacer las capturas):

  ![configuracion-version-mysql](readme-image/configurar-mysql-1.PNG)

  ![configuracion-version-mysql](readme-image/configurar-mysql-2.PNG)

  ![configuracion-version-mysql](readme-image/configurar-mysql-3.PNG)

  Una vez instalado hay que actualizar los paquetes del sistema:

  ```
  sudo apt update
  ```

  Nos muestra un error de que la firma no se puede verificar:

  ![actualizar-paquetes-mysql](readme-image/actualizar-paquetes-mysql.PNG)

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

  ![actualizar-paquetes-mysql](readme-image/keys-actualizadas.PNG)

  Instalar MySQL server y te pedira configurar usuario y contraseña de la Base de Datos:

  ```
  sudo apt install -y mysql-community-server
  ```

  Te pedira introducirla dos veces para que se verifique:

  ![password-mysql](readme-image/root-password.PNG)

  Cuando está instalado, el servicio MySQL no se inicia de forma predeterminada. Inícielo y también habilítelo para que se inicie automáticamente cada vez que se reinicie el servidor.

  ```
  sudo systemctl restart mysql
  ```

  ```
  sudo systemctl enable mysql
  ```

  ![start-mysql](readme-image/start-mysql.PNG)

  Hay que verificar si esta activo:

  ```
  systemctl status mysql
  ```

  ![verificar-mysql](readme-image/verificar-mysql-activo.PNG)

  Asegurar su instalación de base de datos MySQL. Como ya habíamos establecido la contraseña de root, se le pedirá que la ingrese para continuar y también se le preguntará si desea cambiarla.

  ```
  sudo mysql_secure_installation
  ```

  En mi caso he dicho que quiero una seguridad Fuerte (Strong), que elimine todos los usuarios y que solo se permita los usuarios root, también que resetee los privilegios de las tablas.

  ![configuracion-mysql](readme-image/configuracion-mysql.PNG)

  Ya puedes usar MySQL (siempre te pedira la contraseña):

  ```
  mysql -u root -p
  ```

  ```
  SHOW DATABASES;
  ```

  ![ver-mysql-db](readme-image/mysql-databases.PNG)

  Ver la version que se haya instalado correctamente:

  ![ver-mysql-version](readme-image/ver-version.PNG)

  Para habilitar que MySQL se pueda acceder remotamente:

  - open MySQL port 3306 on the firewall

  ```
  sudo ufw allow mysql
  ```

  - Permitir una dirección especifica para conectarte a MySQL, la IP tiene que ser local.

  ```
  sudo ufw allow from 172.26.2.23 to any port 3306
  ```

- Crear Base de Datos:

  ```
  CREATE DATABASE tfg_database;
  ```

  ```
  SHOW DATABASES;
  ```

  ![crear-base-datos](readme-image/crear-base-de-datos.PNG)

  Exportar en MySQL Workbench un fichero unico para exportar la Base de Datos:

  Ubicado en Server, Data Export. Seleccionar (Export to Self-Contained File) clicar en el Checkbox que dice (Create Dump in Single Transaction) y exportar:

  ![exportar-base-datos](readme-image/exportar-base-datos.PNG)

  Ubicarte en la siguiente direccion (admin@ip-172-26-2-23:~/TFG-Juego-Educativo/server/src/db/export) e importar la base de datos con el siguiente comando:

  ```
  mysql -u root -p tfg_database < database.sql
  ```

  ![ver-mysql-version](readme-image/base-datos-exportada.PNG)

  Configuración de MySQL:

  ```
  sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
  ```

  Y cambiar por:

  ```
  bind-address = 127.0.0.1
  port = 3306
  ```

  Reiniciar y levantar MySQL de nuevo para que se apliquen los cambios:

  ```
  sudo systemctl restart mysql
  sudo netstat -tuln | grep mysql
  ```

- Clonar el repositorio:

  ```
  git clone https://github.com/MarcoGomezGutierrez/TFG-Juego-Educativo.git
  ```

  Clonamos y editamos el archivo .env(entramos a la ruta):

  Ver directorio:

  ```
  pwd
  ```

  Ver carpetas del directorio:

  ```
  ls
  ```

  Ver carpetas y archivos ocultos:

  ```
  ls -a
  ```

  Para ubicarnos en la carpeta(TFG-Juego-Educativo/server)

  ```
  cd nombre_carpeta
  ```

  Si no esta creado:

  ```
  touch .env
  ```

  Editar el archivo cambiando IPs, Puertos, Contraseñas, Usarios, etc.:

  **- Importante: El archivo .env no puede tener espacios entre "=", saltos de línea, ect. El formato del documento tiene que estar todo junto, sino dejara de funcionar y el servidor no encontrara el archivo .env**

  ```
  nano .env
  ```

  (ctrl+x, y, enter) para guardar y salir

  Dentro de la carpeta server instalamos los paquetes de Node.js:

  ```
  npm install
  ```

  Entramos en src y ejecutamos pm2 para correr nuestro proyecto:

  ```
  pm2 start index.js
  ```

  Ver nuestros procesos corriendo:

  ```
  pm2 ls
  ```

  ![pm2-ls](readme-image/pm2-connection.PNG)

## Contraseñas de aplicación (Gestión de correo electrónico)

- Página web para gestión de correos: [Nodemailer](https://nodemailer.com/about/)

- Para realizar esto hay que iniciar sesión en Google y activar la verificación en dos pasos.

- Una vez activada la verificación en dos pasos hay que crear una contraseña de aplición. Simplemente desde el panel de Gestionar tu cuenta de Google buscamos en la lupa:

  ```
  Contraseñas de aplicaciones
  ```

  ![gestion-contraseñas](readme-image/contrase%C3%B1as-aplicacion-google.PNG)

  - Seleccionar otro nombre:
    ![otro-nombre](readme-image/otro-nombre.PNG)
  - En mi caso puse adminAPI y le damos a Generar:
    ![nombre-api](readme-image/admin-API.PNG)
  - Y genera una contraseña que debemos guardar:
    ![contraseña-copiar](readme-image/copiar-contrase%C3%B1a.png)

## Configuración de DNS:

- Para configurar una DNS hay que ir a Lightsail, ir al apartado HOME y luego a Domains & DNS. Le damos a Create DNS zone. Ponemos el nombre del dominio que queremos tener:

![contraseña-copiar](readme-image/dns.png)

- Luego hay que clicar en el apartado que dice DNS records y agregar la IP de nuestro sitio:

![contraseña-copiar](readme-image/dns-registration.png)

En este caso hemos puesto que la ruta de trafico es A record que utiiza IPv4 para gestionar el trafico de rutas. Y subdominio debe ser www, por último la IP debe ser la de nuestro debian. Y le damos a guardar.

![contraseña-copiar](readme-image/dns-trafic.png)

- Permitir Bitnami para la creación de un certificado para poder utilizar https:

  ```
  sudo apt-get update
  sudo apt-get install gnome-core
  ```

1. Intalar nginx y ufw para configurar el puerto del firewall HTTPS (443). [Cómo instalar Nginx en Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/como-instalar-nginx-en-ubuntu-18-04-es) (Debian 10 en nuestro caso, pero es igual) [Debian 10](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-debian-10):

```
sudo apt update
```

```
sudo apt install nginx
```

![contraseña-copiar](readme-image/proxy1.png)

```
sudo apt install ufw
```

![contraseña-copiar](readme-image/proxy2.png)

Luego, puedes configurar las reglas de firewall según tus necesidades específicas. Por ejemplo, puedes permitir el tráfico para servicios como SSH, HTTP o HTTPS con los siguientes comandos:

```
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
```

![contraseña-copiar](readme-image/proxy3.png)

Ver la lista de aplicaciones disponibles que se puedan utilizar ufw y hay que ver las de nginx.

```
sudo ufw app list
```

![contraseña-copiar](readme-image/proxy4.png)

Verificar que Nginx esta conectado correctamente:

```
systemctl status nginx
```

![contraseña-copiar](readme-image/proxy5.png)

Puedes probar en el navegador poniendo tu IP pública si esta funcionando correctamente.

![contraseña-copiar](readme-image/proxy6.png)

```
sudo mkdir -p /var/www/tfgprimary.ddns.net/html
sudo chown -R $USER:$USER /var/www/tfgprimary.ddns.net/html
sudo chmod -R 755 /var/www/tfgprimary.ddns.net
nano /var/www/tfgprimary.ddns.net/html/index.html
```

Para que Nginx le proporcione servicios a este contenido, se debe crear un bloque del servidor usando las directivas correctas. En vez de modificar el archivo de configuración predeterminado directamente, vamos a hacer uno nuevo en /etc/nginx/sites-available/tfgprimary.ddns.net:

```
<html>
    <head>
        <title>Welcome to tfgprimary.ddns.net!</title>
    </head>
    <body>
        <h1>Success!  The tfgprimary.ddns.net server block is working!</h1>
    </body>
</html>
```

```
sudo nano /etc/nginx/sites-available/tfgprimary.ddns.net
```

Pegue el siguiente bloque de configuración, el cual se parece al predeterminado, pero que se ha actualizado para nuestro nuevo directorio y nombre de dominio:

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/tfgprimary.ddns.net/html;
        index index.html index.htm index.nginx-debian.html;

        server_name tfgprimary.ddns.net www.tfgprimary.ddns.net;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Después, vamos a habilitar el archivo creando un enlace desde el mismo al directorio sites-enabled (habilitado para sitios), el cual Nginx usa para leer durante el inicio:

```
sudo ln -s /etc/nginx/sites-available/tfgprimary.ddns.net /etc/nginx/sites-enabled/
```

Solamente debe ajustar un solo valor en el archivo /etc/nginx/nginx.conf para evitar un posible problema de memoria de hash bucket, el que puede surgir al agregar nombres de servidores adicionales. Abra el archivo:

```
sudo nano /etc/nginx/nginx.conf
```

Busque la directiva server_names_hash_bucket_size y quite el símbolo # para descomentar la línea:

```
http {
    ...
    server_names_hash_bucket_size 64;
    ...
}
```

![contraseña-copiar](readme-image/proxy7.png)

2. [Cómo configurar una aplicación de Node.js para producción en Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/como-configurar-una-aplicacion-de-node-js-para-produccion-en-ubuntu-18-04-es):

Instalar node y npm en su sistema. Si ha seguido los pasos anteriores no hace falta instalar node ni npm.

Para que algunos paquetes de npm funcionen (por ejemplo, aquellos para los cuales se seba compilar código de una fuente), deberá instalar el paquete build-essential:

```
sudo apt install build-essential
```

3. Instalar pm2 o si lo tienes instalado y configurado seguir estos pasos:

Cambiar el puerto

```
PUERTO: 3000
```

```
pm2 start index.js
```

```
sudo systemctl start pm2-admin
```

```
systemctl status pm2-admin
```

Comprobar conexión:

```
curl http://172.26.2.23:3000
```

4. Cnfigurar Nginx como servidor proxy inverso:

```
sudo nano /etc/nginx/sites-available/tfgprimary.ddns.net
```

Cambiar el contenido de location para que nginx sepa cual es nuestro servidor y levantarlo:

```
server {
...
    location / {
        proxy_pass http://172.26.2.3:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
...
}
```

Verificar el código para prevenir errores de sintaxis:

```
sudo nginx -t
```

Reiniciar nginx para que levante la nueva instancia:

```
sudo systemctl restart nginx
```

Ya podemos acceder a nuestra API con el nombre de nuestro dominio:

```
tfgprimary.ddns.net
```

![contraseña-copiar](readme-image/proxy8.png)

6. Configuración de Cerbot certificado gratis con Let's Encrypt

```
sudo apt update
sudo apt install certbot
sudo apt install python3-certbot-nginx
```

Crear el certificado firmado por Let's Encrypt verificando el dominio (te pedira que ingreses los datos necesarios para crear el certificado):

```
sudo certbot --nginx -d tfgprimary.ddns.net -d tfgprimary.ddns.net
```

```
admin@ip-172-26-2-23:~$ sudo certbot --nginx -d tfgprimary.ddns.net -d tfgprimary.ddns.net
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Obtaining a new certificate
Deploying Certificate to VirtualHost /etc/nginx/sites-enabled/tfgprimary.ddns.net

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
Redirecting all traffic on port 80 to ssl in /etc/nginx/sites-enabled/tfgprimary.ddns.net

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Congratulations! You have successfully enabled https://tfgprimary.ddns.net

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=tfgprimary.ddns.net
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/tfgprimary.ddns.net/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/tfgprimary.ddns.net/privkey.pem
   Your cert will expire on 2023-08-25. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

Cerbot ya se ancarga de realizar los cambios necesarios en nuestro servidor y redirige todo el tráfico a https.

![contraseña-copiar](readme-image/proxy11.png)

## Gestionar Paquetes de Instalación

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

- Instalar gestor para subir imagenes al servidor:

  ```
  npm install express-fileupload
  ```

- Creación de Certificado:

  ```
  npm install openssl
  ```

  ```
  npm install https
  ```

- Nodemailer para enviar correos electronicos:

  ```
  npm install nodemailer
  ```
