# Games CRUD App - Frontend

Este proyecto es la parte del frontend de la aplicación **Games CRUD App**, desarrollada con **React y TypeScript**.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (versión recomendada: LTS)
- **npm** (incluido con Node.js)
- **Base de datos** configurada correctamente
- **AppServ** instalado y configurado

## Instalación y ejecución

Sigue estos pasos para ejecutar el frontend:

1. **Acceder al directorio del frontend**
   ```sh
   cd front
   ```
2. **Instalar dependencias**
   ```sh
   npm install
   
   npm run dev
   ```
  
3. **Ejecutar el archivo de base de datos**
   Importa y ejecuta el archivo `.sql` en tu sistema de base de datos para configurar las tablas necesarias.

4. **Configurar AppServ**
   Edita el archivo `.http.conf` y asegúrate de habilitar el módulo de reescritura para permitir que `.htaccess` funcione correctamente:
   ```
   LoadModule rewrite_module modules/mod_rewrite.so
   ```
   Luego, agrega la siguiente configuración en el archivo:
   ```
   <Directory /ruta/a/tu/sitio/web>
       AllowOverride All
       Require all granted
   </Directory>
   ```
   También, asegúrate de incluir lo siguiente en el archivo de configuración si es necesario:
   ```
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteRule ^ - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
   </IfModule>
   ```

5. **Configurar el archivo `.env`**
   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:
   ```sh
   HOST=
   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   DB_PORT=
   ```
   Existe un archivo `.env.example` que puedes utilizar como referencia.

El proyecto se ejecutará en un servidor local. Abre tu navegador y accede a la URL que aparece en la terminal.

---
