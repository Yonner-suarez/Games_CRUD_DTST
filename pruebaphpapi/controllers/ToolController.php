<?php

require_once(__DIR__ . "/../models/Tools.php");

class ToolController
{
    public function Tools()
    {
      try {
        $method_request = $_SERVER['REQUEST_METHOD'];
        if($method_request == "GET")
        {
          $tools = [
          new Tools("Tool 1", "Description 1", 100, 10, "image1.jpg"),
          new Tools("Tool 2", "Description 2", 200, 20, "image2.jpg"),
          new Tools("Tool 3", "Description 3", 300, 30, "image3.jpg"),
          new Tools("Tool 4", "Description 4", 400, 40, "image4.jpg"),
          new Tools("Tool 5", "Description 5", 500, 50, "image5.jpg"),
          ];
          return $tools;
        }
        throw new BadRequestResponse("Metodo no permitido");
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function Tool()
    {
      try {
        $tools = [
         new Tools("Tool 1", "Description 1", 100, 10, "image1.jpg"),
         new Tools("Tool 2", "Description 2", 200, 20, "image2.jpg"),
         new Tools("Tool 3", "Description 3", 300, 30, "image3.jpg"),
         new Tools("Tool 4", "Description 4", 400, 40, "image4.jpg"),
         new Tools("Tool 5", "Description 5", 500, 50, "image5.jpg"),
         ];

         return $tools;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}
