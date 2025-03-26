<?php
require_once(__DIR__ . "/../infraestructure/middleware.php");
require_once(__DIR__ . "/../models/GameModel.php");
 
class GameController{
 
  public function log()  {
       if($_SERVER["REQUEST_METHOD"] == "POST"){
        return new GeneralResponse("oka", 200, null);
       }
       else{
        throw new BadRequestResponse("Metodo n opermitido");
       }
    }
 
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
            if ($method_request != "POST") {
                throw new BadRequestResponse("Método no permitido");
            }
 
            $idGame = $_POST['code'] ?? 0;
            if ($idGame == 0) {
                throw new BadRequestResponse("Debe ingresar el código del juego");
            }
 
            $code = $_POST['code'] ?? '';
            $gameName = $_POST['name'] ?? '';
            $description = $_POST['description'] ?? '';
            $numberOfPlayers = $_POST['numberOfPlayers'] ?? 0;
            $console = $_POST['console'] ?? 0;
            $releaseYear = $_POST['releaseYear'] ?? 0;
 
            // Validar imagen (opcional)
            $imageData = null;
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $imageData = file_get_contents($_FILES['image']['tmp_name']);
            }
 
            // Conexión a la base de datos
            global $host, $dbUser, $dbPassword, $dbName, $dbPort;
            $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);
 
            if ($conn->connect_error) {
                Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error], 500);
            }
 
            // Crear la consulta SQL con placeholders
            $sql = "UPDATE crud_games
                    SET code = ?, name = ?, console_id = ?, description = ?, releaseYear = ?, numberOfPlayers = ?, image = ?
                    WHERE code = ?";
 
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->error], 500);
            }
 
            // Definir el tipo de datos para bind_param
            $types = "ssissibi"; // s = string, i = integer, b = blob
 
            // Enlazar parámetros
            $stmt->bind_param($types, $code, $gameName, $console, $description, $releaseYear, $numberOfPlayers, $null, $code);
 
            // Si hay imagen, enviar los datos binarios
            if ($imageData) {
                $stmt->send_long_data(6, $imageData); // La imagen está en la posición 6
            }
 
            // Ejecutar la consulta
            if ($stmt->execute()) {
                $response = new GeneralResponse("La operación se realizó con éxito", 200, $idGame);
            } else {
                Middleware::jsonMiddleware(['error' => 'Error en la operación: ' . $stmt->error], 500);
            }
 
            // Cerrar conexiones
            $stmt->close();
            $conn->close();
 
            return $response;
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
 
 public function gamesById() {
    try {
        // Obtener el método de la solicitud
        $method_request = $_SERVER['REQUEST_METHOD'];
 
        if ($method_request === "GET") {
            // Obtener el ID del juego desde los parámetros de la URL
            if (!isset($_GET['id']) || empty($_GET['id'])) {
                Middleware::jsonMiddleware(['error' => 'ID es requerido'], 400);
                return;
            }
 
            $id =  $_GET['id']; // Asegurar que sea un número entero
 
 
            // Conexión a la base de datos
            global $host, $dbUser, $dbPassword, $dbName, $dbPort;
            $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);
 
            if ($conn->connect_error) {
                Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error]);
                return;
            }
 
            // Consulta para obtener el juego junto con la consola
            $sql = "SELECT g.id, g.name, g.description, g.code, g.numberOfPlayers,
                           g.releaseYear, g.image, c.id as console_id, c.name as console_name
                    FROM crud_games g
                    INNER JOIN crud_consoles c ON g.console_id = c.id
                    WHERE g.code LIKE ? AND g.activo = 1";
           
            $stmt = $conn->prepare($sql);
 
            if (!$stmt) {
                Middleware::jsonMiddleware(['error' => 'Error en la consulta: ' . $conn->error], 500);
                return;
            }
 
            // Pasar el ID como parámetro a la consulta
            $stmt->bind_param("i", $id);
 
            if (!$stmt->execute()) {
                Middleware::jsonMiddleware(['error' => 'Error al ejecutar la consulta: ' . $stmt->error], 500);
                return;
            }
 
            $result = $stmt->get_result();
            $gameData = $result->fetch_assoc();
 
            $stmt->close();
            $conn->close();
 
            if ($gameData) {
                $console = new Console($gameData['console_id'], $gameData['console_name']);
                $game = new Game(
                    $gameData['name'],
                    $gameData['description'],
                    $gameData['code'],
                    $gameData['numberOfPlayers'],
                    $gameData['releaseYear'],
                    $gameData['image'],
                    $console
                );
 
                $game->image = base64_encode($game->image);
                return new GeneralResponse("Proceso exitoso", 200, $game);
            } else {
                throw new BadRequestResponse("Juego no encotrado");
            }
        } else {
            throw new BadRequestResponse("Método no permitido");
        }
    } catch (Exception $e) {
        throw $e;
    }
}
 
 
 public function listGames() {
        $method_request = $_SERVER['REQUEST_METHOD'];
        if ($method_request == "GET"){
            global $host, $dbUser, $dbPassword, $dbName, $dbPort;
            $conn = new mysqli ($host, $dbUser, $dbPassword, $dbName, $dbPort);
           
            if ($conn->connect_error){
                Middleware::jsonMiddleware(['error'=>'Error en la base de datos' . $conn->connect_error], 500);
                return;
            }
            $sql = "SELECT g.id, g.name, g.description, g.code, g.numberOfPlayers,
                           g.releaseYear, g.image, c.id as console_id, c.name as console_name FROM crud_games as g INNER JOIN crud_consoles AS c ON c.id = g.console_id WHERE g.activo = 1";
            $stmt = $conn->prepare($sql);
            if (!$stmt){
                Middleware::jsonMiddleware(['error'=>'Error en la consulta' . $conn->error], 500);
                return;
            }
            $stmt->execute();
            $result = $stmt->get_result();
            $games = [];
            while ($gameData = $result->fetch_assoc()){
                $console = new Console($gameData['console_id'], $gameData['console_name']);
                $game = new Game(
                    $gameData['name'],
                    $gameData['description'],
                    $gameData['code'],
                    $gameData['numberOfPlayers'],
                    $gameData['releaseYear'],
                    $gameData['image'],
                    $console
                );
                $game->image = trim(base64_encode($game->image));
 
                array_push($games, $game);
            }
            if (count($games) > 0){
                return new GeneralResponse("Proceso exitoso", 200, $games);
            } else {
                throw new BadRequestResponse("No hay juegos guardados");
            }
            $stmt->close();
            $conn->close();
        } else {
            Middleware :: jsonMiddleware(['error'=>'Método no permitido'], 405);
            return;
        }
    }
public function brrGame() {
    try {
        // Obtener el método de la solicitud
        $method_request = $_SERVER['REQUEST_METHOD'];
 
        //Muy mala practica en metdo Http protocolo pero no deja con Delete
        if ($method_request === "GET") {
           
 
            $id =  $_GET['id'];
 
 
            // Conexión a la base de datos
            global $host, $dbUser, $dbPassword, $dbName, $dbPort;
            $conn = new mysqli($host, $dbUser, $dbPassword, $dbName, $dbPort);
 
            if ($conn->connect_error) {
                Middleware::jsonMiddleware(['error' => 'Error en la base de datos: ' . $conn->connect_error]);
                return;
            }
 
            // Consulta para obtener el juego junto con la consola
            $sql = "UPDATE crud_games SET activo = 0 WHERE code = ?";
           
            $stmt = $conn->prepare($sql);
 
            if (!$stmt) {
                Middleware::jsonMiddleware(['error' => 'Error en la consulta: ' . $conn->error], 500);
                return;
            }
 
            // Pasar el ID como parámetro a la consulta
            $stmt->bind_param("i", $id);
 
            if (!$stmt->execute()) {
                Middleware::jsonMiddleware(['error' => 'Error al ejecutar la consulta: ' . $stmt->error], 500);
                return;
            }
 
            $result = $stmt->get_result();
           
            return new GeneralResponse("oka", 200, $id);
        } else {
            throw new BadRequestResponse("Método no permitido");
        }
    } catch (Exception $e) {
        throw $e;
    }
}
 
}