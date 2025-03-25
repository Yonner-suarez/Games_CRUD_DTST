import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { deleteGames, listGames } from "../../helpers/function";
import "./Gamestyles.css";

// Define el tipo para los juegos
interface Game {
  id: number;
  name: string;
  code: string;
  description: string;
  releaseYear: number;
  numberOfPlayers: number;
  image: string;
}

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [gamesList, setGamesList] = useState<Game[]>([]); // Usa el tipo explícito para el estado

  useEffect(() => {
    const GAMES = async () => {
      try {
        console.log("Mostrando Loader...");
        setShowLoading(true);
        let response = await listGames();
        console.log("Datos obtenidos de la API (gamesList):", response); // Log para depuración
        setGamesList(response.data); // Asegúrate de que los datos incluyan el campo "id"
      } catch (error) {
        console.error("Error al cargar los juegos", error);
      } finally {
        setShowLoading(false);
      }
    };
    GAMES();
  }, []);

  return (
    <>
      <Loader show={showLoading} estilo={{ display: "block" }} mensaje="Cargando..." /> {/* Solo una instancia del Loader */}
      <h1>LISTA DE GAMES</h1>
      <button onClick={() => navigate("/Games/create")}> Crear Juego</button>
      <div className="card-container">
        {gamesList?.map((game) => (
          <div key={game.id} className="card">
            <img
              src={game.image} // Usa una imagen por defecto si `image` está vacía
              alt={game.name}
              className="card-image"
            />
            <div className="card-content">
              <h3>{game.name}</h3>
              <p><strong>Código:</strong>{game.code}</p>
              <p>{game.description}</p>
              <p><strong>Año de lanzamiento:</strong> {game.releaseYear}</p>
              <p><strong>Jugadores:</strong> {game.numberOfPlayers}</p>
              <div className="card-buttons">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`Games/update/${game?.code}`)}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-info btn-sm text-white"
                  onClick={() =>
                    navigate(`/Games/details/${game?.code}`, { state: { game: game } })
                  }
                >
                  Detalles
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    if (!game.id) {
                      console.error("El ID del juego no está definido.");
                      alert("No se puede eliminar el juego porque el ID no está definido.");
                      return;
                    }
                    console.log("Intentando eliminar el juego con ID:", game.id); // Log para depuración
                    if (window.confirm("¿Estás seguro de que deseas borrar este juego?")) {
                      try {
                        const isDeleted = await deleteGames(game.id); // Llamar a la API para eliminar el juego
                        if (isDeleted) {
                          console.log("Actualizando lista de juegos después de eliminar el juego con ID:", game.id);
                          setGamesList((prevGames) => prevGames.filter((g) => g.id !== game.id)); // Actualizar el estado localmente
                          alert("Juego eliminado exitosamente.");
                        } else {
                          alert("No se pudo eliminar el juego. Inténtalo nuevamente.");
                        }
                      } catch (error) {
                        console.error("Error al eliminar el juego:", error);
                        alert("Hubo un error al intentar eliminar el juego.");
                      }
                    }
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Games;