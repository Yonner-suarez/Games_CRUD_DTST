<?php

require_once(__DIR__ . '/../config.php');
require_once(__DIR__ . '/../vendor/autoload.php');
require_once(__DIR__ . "/../utils/Variable.php");
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class Middleware {

  // Middleware para devolver JSON
  public static function jsonMiddleware($response) {
      header('Content-Type: application/json');
      echo json_encode($response);
      exit();
  }

  public static function authMiddleware($data)
  {
    return (new GeneralResponse("Success", 200, $data))->jsonSerialize();
  }

   public static function getToken(int $tipoPersona, string $correo, string $username)
  {
    global $jwtKey;
    global $jwtExp;
    $payload = [
        'iss' => $correo,
        'aud' => $username,
        'iat' => time(), 
        'nbf' => time(), 
        'exp' => time() + $jwtExp,
        'role' => ($tipoPersona == 1 ? "Admin" : "User")
    ];
    $token = JWT::encode($payload, $jwtKey, 'HS256');
    return $token;

  }

  public static function validateToken($token)
  {
    global $jwtKey;
    try 
    {
      $decoded = JWT::decode($token, new Key($jwtKey, 'HS256'));
      return $decoded;
      print_r($decoded);
      if (isset($decoded->exp) && $decoded->exp < time()) return true;
      throw new UnauthorizedResponse("El token ha expirado");
    } 
    catch (UnauthorizedResponse $e) 
    {
        throw $e;
    } 
    catch (ExpiredException $e) 
    {
      throw new UnauthorizedResponse("El token ha expirado");
    }
  }
}

