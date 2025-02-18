<?php
require_once(__DIR__ . "/../utils/Variable.php");

class AuthRouter
{
  public function action(string $method, string $controller, ?string $idParam = null)
  {
    try
    {      
      $method = strpos($method, "?") ? substr($method, 0, strpos($method, "?")) : $method;

      $request = json_decode(file_get_contents('php://input'), true);

      require_once(__DIR__ . "/../controllers/" . $controller . "Controller.php");
      $controller = new AuthController();
      return OKResponse::response_ok((new AuthController())->$method($request));
    }
    catch (InternalServerErrorResponse $e)
    {
      throw $e;
    }

  }
  
  
}