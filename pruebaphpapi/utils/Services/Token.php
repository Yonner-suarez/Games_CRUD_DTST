<?php
require_once(__DIR__ . "/../Variable.php");

class Token
{

  public static function getToken()
  {
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) 
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];

        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $bearerToken = $matches[1];
            return $bearerToken;
        } else {
            throw new UnauthorizedResponse("Debe proporcionar un token Bearer válido.");
        }
    } 
    else
    {
       throw new UnauthorizedResponse("Debe proporcionar un token Bearer válido.");
    }

  }
}