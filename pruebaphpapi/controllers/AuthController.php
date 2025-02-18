<?php
require_once(__DIR__ . "/../infraestructure/middleware.php");

class AuthController{

  public function login($request)
  {
    if(!isset($request)) throw new BadRequestResponse("Debe ingresar las credenciales");
    switch($request){
      case "tipoPersona":
        if(isset($request['tipoPersona'])) throw new BadRequestResponse("El campo tipoPersona es requerido");
        break;
      case "correo":
        if(isset($request['correo'])) throw new BadRequestResponse("El campo correo es requerido");
        break;
      case "username":
        if(isset($request['username'])) throw new BadRequestResponse("El campo username es requerido");
        break;
      case "password":
        if(isset($request['password'])) throw new BadRequestResponse("El campo password es requerido");
        break;
      default:
        break;
    }

    $password = 'admin123';//! TODO viene de la base de datos    
    if(password_verify($password, $request['password'])) return Middleware::getToken($request['tipoPersona'], $request['correo'], $request['username']);
    else return "false";
  }
  
  
}