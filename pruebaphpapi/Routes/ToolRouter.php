<?php

require_once(__DIR__ . "/Router.php");
require_once(__DIR__ . "/../utils/Variable.php");
require_once(__DIR__ . "/../infraestructure/middleware.php");
require_once(__DIR__ . "/../utils/Services/Token.php");

class ToolRouter
{

  public function action(string $method, string $controller, ?string $idParam = null)
  {
    try
    {  
      //$token = Token::getToken();
      //Middleware::validateToken($token);

      $method = strpos($method, "?") ? substr($method, 0, strpos($method, "?")) : $method;

      require_once(__DIR__ . "/../controllers/" . $controller . "Controller.php");
      $controller = new ToolController();
      return OKResponse::response_ok((new ToolController())->$method());
    }
    catch (InternalServerErrorResponse $e)
    {        
      throw $e;
    }

  }
}

//$this->requestBody = json_decode(file_get_contents('php://input'), true);
//$this->queryParams = $_GET;