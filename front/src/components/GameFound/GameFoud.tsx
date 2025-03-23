import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

interface GameProps {
  dataGameFound: {
    code: string;
    name: string;
    console: { value: number; label: string };
    description: string;
    image: string;
    numberOfPlayers: number;
    releaseYear: number;
  };
}

const GameFound: React.FC<GameProps> = ({ dataGameFound }) => {
  const location = useLocation();
  let { game } = location.state;
  

  if (!game) {
    return <p className="text-center text-muted">No se encontró el juego.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="row g-0">
          {/* Imagen del juego */}
          <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
            <img
              src={`data:image/png;base64,${game.image}`}
              alt={game.name}
              className="img-fluid rounded"
              style={{ maxHeight: "200px" }}
            />
          </div>

          {/* Información del juego */}
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{game.name}</h5>
              <p className="card-text"><strong>Código:</strong> {game.code}</p>
              <p className="card-text"><strong>Consola:</strong> {game.console?.label}</p>
              <p className="card-text"><strong>Descripción:</strong> {game.description || "No disponible"}</p>
              <p className="card-text"><strong>Jugadores:</strong> {game.numberOfPlayers}</p>
              <p className="card-text"><strong>Año de lanzamiento:</strong> {game.releaseYear}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameFound;
