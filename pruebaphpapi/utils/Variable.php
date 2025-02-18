<?php

require_once(__DIR__ . "/GeneralResponse.php");

class OKResponse
{
   public static function response_ok($data)
    {
       return (new GeneralResponse("Success", 200, $data))->jsonSerialize();
    }
}
class BadRequestResponse extends Exception 
{
    public function __construct($message)
    {
        parent::__construct($message, 400);
        header("HTTP/1.1 400 Bad Request");
        header("Content-Type: application/json");
    }
}
class InternalServerErrorResponse extends Exception
{
     public function __construct($message)
      {
          parent::__construct($message, 500);
          header("HTTP/1.1 500 Internal Server Error");
          header("Content-Type: application/json");
      }
}
class UnauthorizedResponse extends Exception
{
    public  function __construct($message)
    {
      parent::__construct($message, 401);
      header("HTTP/1.1 401 Unauthorized");
      header("Content-Type: application/json");
    }
}