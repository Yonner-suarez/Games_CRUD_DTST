<?php
require_once(__DIR__ . "/../infraestructure/middleware.php");

class GameController{

  public function create()
  {
    try {
      $method_request = $_SERVER['REQUEST_METHOD'];
      if($method_request == "POST")
      {
        
        $code = $_POST['code'] ?? 0;
        $gameName = $_POST['name'] ?? '';
        $description = $_POST['description'] ?? '';
        $numerOfPlayers = $_POST['numerOfPlayers'] ?? 0;
        $console = $_POST['console'] ?? 0;
        $relaseYear = $_POST['relaseYear'] ?? 0;
        
        if (!isset($_FILES['image']) || $_FILES['image']['error'] != 0) {
            throw new BadRequestResponse("Debe cargar una imagen");
          }

          // global $host, $dbUser, $dbPassword, $dbName, $dbPort;
          // $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);

          // if ($conn->connect_error) {
          //   Middleware::jsonMiddleware(['error' => 'Error de conexión a la base de datos: ' . $conn->connect_error], 500);
          // }

          // // Consulta para obtener los productos
          // $stmt = $conn->prepare("SELECT id, name, price, marca, puntuacion, code FROM products");
          // $stmt->execute();
          // $stmt->bind_result($id, $name, $price, $marca, $puntuacion, $code);

          // $ToolsResponse = [];

          // while ($stmt->fetch()) {
          // // Agregar cada producto al array
          // $ToolsResponse[] = [
          //           "id" => $id,
          //           "name" => $name,
          //           "price" => $price,
          //           "marca" => $marca,
          //           "puntuacion" => $puntuacion,
          //           "code" => $code,
          //       ];
          //   }

          // // Cerrar el statement
          // $stmt->close();

          // // Cerrar la conexión
          // $conn->close();

          // Devolver el arreglo con los datos
          return "";
        }
        throw new BadRequestResponse("Metodo no permitido");
        } catch (Exception $e) {
            throw $e;
        }
      }
  
}