import { useNavigate, useLocation } from "react-router-dom";
import UpdateGame from "../../components/UpdateGame/UpdateGame";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { gameList } from "../../helpers/function";

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const[gamesList, setGamesList] = useState([])

  useEffect(() => {
    const lisgames = async () => {     
      setShowLoading({ display: "block" })
      const gamelist_request = await gameList();

      setGamesList(gamelist_request.data);
      setShowLoading({display: "none"})
    };

    lisgames(); 

  }, []); 

  
  return (
  <>
    <Loader estilo={showLoading} />
      <h1>LISTA DE GAMES</h1>
      <button onClick={() => navigate("/Games/create")}> Crear Juego</button>   
    {gamesList.map((game, index) => (
  <div key={index} className="container mt-2">
    <div className="card shadow-sm" style={{ maxWidth: "500px", margin: "auto" }}>
      <div className="row g-0">
        {/* Imagen del juego */}
        <div className="col-md-3 d-flex align-items-center justify-content-center p-2">
          <img
            src={`data:image/png;base64,${game?.image}`}
            alt={game?.name}
            className="img-fluid rounded"
            style={{ maxHeight: "120px" }}
          />
        </div>

        {/* Información del juego */}
        <div className="col-md-9">
          <div className="card-body p-2">
            <h6 className="card-title">{game?.name}</h6>
            <p className="card-text mb-1"><strong>Código:</strong> {game?.code}</p>
            <p className="card-text mb-1"><strong>Consola:</strong> {game?.console?.label}</p>

            {/* Botones más pequeños */}
            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-primary btn-sm" onClick={() => navigate(`Games/update/${game?.code}`)}>
                Actualizar
              </button>
              <button
                className="btn btn-info btn-sm text-white"
                onClick={() => navigate(`/Games/details/${game?.code}`, { state: { game: game } })}
              >
                Detalles
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => {
                // Llamar a la API para eliminar el juego
              }}>
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
))}
  </>
);

};
export default Games;

