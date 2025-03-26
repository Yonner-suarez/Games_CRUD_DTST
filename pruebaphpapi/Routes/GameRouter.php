<?php
require_once(__DIR__ . "/../utils/Variable.php");

class GameRouter
{
  public function action(string $method, string $controller)
  {
    try
    { 
      $method = strpos($method, "?") ? substr($method, 0, strpos($method, "?")) : $method;

      require_once(__DIR__ . "/../controllers/" . $controller . "Controller.php");
      $controller = new GameController();
      return OKResponse::response_ok((new GameController())->$method());
    }
    catch (Exception $e)
    {
      throw $e;
    }

  } 
}