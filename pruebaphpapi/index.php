<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once(__DIR__ . "/Routes/Router.php");
require_once(__DIR__ . "/config.php");
require_once(__DIR__ . "/infraestructure/middleware.php");

try{
  $router = new Router();
  $response = $router->matchRoute($uri);
  Middleware::jsonMiddleware($response);
}catch(Exception $e){
  Middleware::jsonMiddleware(["error" => $e->getMessage(), "code" => $e->getCode(), "dara" => null]);
}




//LoadModule rewrite_module modules/mod_rewrite.so
//Esto permite que el .htaccess funcione


//<Directory /ruta/a/tu/sitio/web>
//    AllowOverride All
//</Directory>

/*
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^ - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
</IfModule>
*/







