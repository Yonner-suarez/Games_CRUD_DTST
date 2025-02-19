<?php
require_once(__DIR__ . "/../infraestructure/middleware.php");

class GameController{

  public function create()
  {
     $response = null;
    try {
      $method_request = $_SERVER['REQUEST_METHOD'];
      if($method_request == "POST")
      {
          $code = $_POST['code'] ?? '';
          $gameName = $_POST['name'] ?? '';
          $description = $_POST['description'] ?? '';
          $numberOfPlayers = $_POST['numerOfPlayers'] ?? 0;
          $console = $_POST['console'] ?? 0;
          $releaseYear = $_POST['releaseYear'] ?? 0;

          // Validar imagen
          if (!isset($_FILES['image']) || $_FILES['image']['error'] != 0) {
              throw new BadRequestResponse("Debe cargar una imagen");
          }

          // Obtener la imagen como binario
          $imageData = file_get_contents($_FILES['image']['tmp_name']);
          $imageSize = filesize($_FILES['image']['tmp_name']); // Obtener tamaño del archivo
          echo "Tamaño de imagen: $imageSize bytes <br>";

          // Conexión a la base de datos
          global $host, $dbUser, $dbPassword, $dbName, $dbPort;
          $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);

          if ($conn->connect_error) {
              Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error], 500);
          }

          // Preparar la consulta SQL para insertar
          $sql = "INSERT INTO crud_games (code, name, console_id, description, releaseYear, numberOfPlayers, image) 
                  VALUES (?, ?, ?, ?, ?, ?, ?)";

          $stmt = $conn->prepare($sql);
          if (!$stmt) {
              Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error], 500);
          }

          // Bind de parámetros
          $stmt->bind_param("ssissib", $code, $gameName, $console, $description, $releaseYear, $numberOfPlayers, $null);
          $stmt->send_long_data(6, $imageData);
          // Ejecutar la consulta
          if ($stmt->execute()) {
              $lastInsertId = $stmt->insert_id;
              $response = new GeneralResponse("La operación se realizo con exito", 200, $lastInsertId);
          }else {
              Middleware::jsonMiddleware(['error' => 'Error en la operación: ' . $conn->connect_error], 500);
          }

          $stmt->close();
          $conn->close();
          return $response;
        }
        throw new BadRequestResponse("Metodo no permitido");
        } catch (Exception $e) {
            throw $e;
        }
      }
      public function update()
      {
        $response = null;
        try {
          $method_request = $_SERVER['REQUEST_METHOD'];
          if($method_request == "PUT")
          {
              $code = $_POST['code'] ?? '';
              $gameName = $_POST['name'] ?? '';
              $description = $_POST['description'] ?? '';
              $numberOfPlayers = $_POST['numerOfPlayers'] ?? 0;
              $console = $_POST['console'] ?? 0;
              $releaseYear = $_POST['releaseYear'] ?? 0;

              // Validar imagen
              if (!isset($_FILES['image']) || $_FILES['image']['error'] != 0) {
                  throw new BadRequestResponse("Debe cargar una imagen");
              }

              // Obtener la imagen como binario
              $imageData = file_get_contents($_FILES['image']['tmp_name']);
              $imageSize = filesize($_FILES['image']['tmp_name']); 
              echo "Tamaño de imagen: $imageSize bytes <br>";

              // Conexión a la base de datos
              global $host, $dbUser, $dbPassword, $dbName, $dbPort;
              $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);

              if ($conn->connect_error) {
                  Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error], 500);
              }

              // Preparar la consulta SQL para insertar
              $sql = "INSERT INTO crud_games (code, name, console_id, description, releaseYear, numberOfPlayers, image) 
                      VALUES (?, ?, ?, ?, ?, ?, ?)";

              $stmt = $conn->prepare($sql);
              if (!$stmt) {
                  Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error], 500);
              }

              // Bind de parámetros
              $stmt->bind_param("ssissib", $code, $gameName, $console, $description, $releaseYear, $numberOfPlayers, $null);
              $stmt->send_long_data(6, $imageData);
              
              if ($stmt->execute()) {
                  $lastInsertId = $stmt->insert_id;
                  $response = new GeneralResponse("La operación se realizo con exito", 200, $lastInsertId);
              }else {
                  Middleware::jsonMiddleware(['error' => 'Error en la operación: ' . $conn->connect_error], 500);
              }

              $stmt->close();
              $conn->close();
              return $response;
            }
            throw new BadRequestResponse("Metodo no permitido");
            } catch (Exception $e) {
                throw $e;
            }
      }
  
      public function consoles() {
        try {
          $method_request = $_SERVER['REQUEST_METHOD'];
          if($method_request == "GET")
          {
            global $host, $dbUser, $dbPassword, $dbName, $dbPort;
            $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);

            if ($conn->connect_error) {
                Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error], 500);
                return;
            }

            $sql = "SELECT id, name FROM crud_consoles";
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                Middleware::jsonMiddleware(['error' => 'Error en la consulta: ' . $conn->error], 500);
                return;
            }

            if (!$stmt->execute()) {
                Middleware::jsonMiddleware(['error' => 'Error al ejecutar la consulta: ' . $stmt->error], 500);
                return;
            }

            $result = $stmt->get_result();
            $consoles = [];
            while ($row = $result->fetch_assoc()) {
                $consoles[] = $row;
            }

            $stmt->close();
            $conn->close();

            Middleware::jsonMiddleware(['message' => 'Consulta exitosa', 'data' => $consoles], 200);
          }

          throw new BadRequestResponse("Metodo no encontrado");

        } catch (Exception $e) {
            throw $e;
        }
    }

    }