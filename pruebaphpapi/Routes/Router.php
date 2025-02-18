<?php

require_once(__DIR__ . "/../utils/Variable.php");

class Router{

  private $router;
  private $method;
  private $idParam;

  public function matchRoute($uri)
  {
    try{
    if($uri == "/"){
      throw new BadRequestResponse("No se ha proporcionado ninguna ruta");
    }else{
      $routeParts = explode("/", $uri);
      $this->router = $routeParts[1];
      $this->method = $routeParts[2];
      $this->idParam = isset($routeParts[3]) && $routeParts[3] !== "" ? $routeParts[3] : null;
    }

    return $this->redirectRouter();
    }
    catch (InternalServerErrorResponse $e)
    { 
      throw $e;
    }
  }

   public function redirectRouter() 
   {
    try{
      require_once(__DIR__ . "/". ucfirst($this->router) . "Router.php");
      $routerClass = ucfirst($this->router) . "Router";
      $router = new $routerClass();

      return $router->action($this->method, ucfirst($this->router), $this->idParam);
    }
    catch (InternalServerErrorResponse $e)
    {  
      throw $e;
    }
   }


}
