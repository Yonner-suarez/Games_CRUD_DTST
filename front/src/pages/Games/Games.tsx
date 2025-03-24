import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { listGames } from "../../helpers/function";
import "./Gamestyles.css";

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [gamesList, setGamesList] = useState([])
  


  useEffect (() => {
    const GAMES = async () => {
      try {
        console.log("Mostrando Loader...")
        setShowLoading(true);
        let response = await listGames()
        console.log("Datos obtenidos de la API:", response.data);
        setGamesList(response.data)
      } catch (error) {
        console.error("Error al cargar los juegos", error);
      } finally {
        setShowLoading(false);
      }  
    };
    GAMES()
  },[])
  return (
  <>
    <Loader show={showLoading} estilo={{ display: "block" }} mensaje="Cargando..." /> {/* Solo una instancia del Loader */}
    <h1>LISTA DE GAMES</h1>
    <button onClick={() => navigate("/Games/create")}> Crear Juego</button>
    <div className="card-container">
      {gamesList?.map((game, index) => (
        <div key={index} className="card">
          <img
            src={game.image } // Usa una imagen por defecto si `image` está vacía
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
                Editar
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
                onClick={() => {
                  // Llamar a la API para eliminar el juego
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
}

export default Games;