import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { delGames, gameList, handleError } from "../../helpers/function";
import Swal from "sweetalert2";
import papelera from "../../../assets/papelera.png";
 
const Games: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [gamesList, setGamesList] = useState<any[]>([])
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [cardHovered, setCardHovered] = useState<number | null>(null);
  const [cardPressed, setCardPressed] = useState<number | null>(null);
  const [papeleraHovered, setPapeleraHovered] = useState<number | null>(null);
  const [papeleraPressed, setPapeleraPressed] = useState<number | null>(null);
 
  const lisgames = async () => {
    setShowLoading({ display: "block" })
    const gamelist_request = await gameList();
    if (gamelist_request?.data?.data) {
      setGamesList(gamelist_request.data.data);
    } else {
      setGamesList([]);
    }
    setShowLoading({ display: "none" })
    setIsSearchResult(false);
  };
 
  useEffect(() => {
    const searchResults = location.state?.searchResults;
    const searchTerm = location.state?.searchTerm;
    
    if (searchResults && searchResults.length > 0) {
      setGamesList(searchResults);
      setIsSearchResult(true);
    } else {
      lisgames();
    }
  }, [location]);

  const delGame = async (code: any) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await delGames(code);
          setGamesList((prevGames) => prevGames.filter((game) => game.code !== code));
          Swal.fire("Eliminado", "El juego ha sido eliminado.", "success");
        } catch (error) {
          handleError(error);
        }
      }
    });
  };

  const clearSearch = () => {
    navigate("/", { state: {} });
    lisgames();
  };

  const handleCardClick = (game: any) => {
    navigate(`/Games/update/${game.code}`, { state: { game } });
  };

  return (
    <>
      <Loader estilo={showLoading} />
      {isSearchResult && (
        <button onClick={clearSearch} className="btn btn-secondary btn-sm ms-2">
          Ver todos los juegos
        </button>
      )}
      {gamesList.length === 0 && !isSearchResult && (
        <div className="text-center mt-4">
          <p className="text-muted">No hay juegos registrados.</p>
          <p className="text-primary">¡Presiona el botón "+" para agregar el primero!</p>
        </div>
      )}
      {gamesList.length === 0 && isSearchResult && (
        <div className="text-center mt-4">
          <p className="text-muted">No se encontraron juegos con ese término.</p>
        </div>
      )}
      {gamesList.map((game, index) => {
        const isCardHovered = cardHovered === index;
        const isCardPressed = cardPressed === index;
        const isPapeleraHovered = papeleraHovered === index;
        const isPapeleraPressed = papeleraPressed === index;
        
        return (
        <div key={index} className="container mt-2">
          <div 
            className="card shadow-sm" 
            style={{ 
              maxWidth: "500px", 
              margin: "auto", 
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              transform: isCardPressed ? "scale(0.98)" : isCardHovered ? "scale(1.02)" : "scale(1)",
              boxShadow: isCardHovered ? "0 0 10px #23282B" : "",
            }}
            onClick={() => handleCardClick(game)}
            onMouseEnter={() => setCardHovered(index)}
            onMouseDown={() => setCardPressed(index)}
            onMouseUp={() => setCardPressed(null)}
            onMouseLeave={() => { setCardHovered(null); setCardPressed(null); }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-2 d-flex align-items-center justify-content-center p-2">
                <img
                  src={`data:image/png;base64,${game?.image}`}
                  alt={game?.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "100px" }}
                />
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-info btn-sm text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/Games/details/${game?.code}`, { state: { game: game } });
                  }}
                >
                  Detalles
                </button>
              </div>
              <div className="col-7">
                <div className="card-body p-2">
                  <h6 className="card-title">{game?.name}</h6>
                  <p className="card-text mb-1"><strong>Código:</strong> {game?.code}</p>
                  <p className="card-text mb-1"><strong>Consola:</strong> {game?.console?.label}</p>
                </div>
              </div>
              <div className="col-1 d-flex align-items-center justify-content-center">
                <img
                  src={papelera}
                  alt="Eliminar"
                  onClick={(e) => {
                    e.stopPropagation();
                    delGame(game.code);
                  }}
                  onMouseEnter={() => setPapeleraHovered(index)}
                  onMouseLeave={() => setPapeleraHovered(null)}
                  onMouseDown={() => setPapeleraPressed(index)}
                  onMouseUp={() => setPapeleraPressed(null)}
                  style={{ 
                    width: "36px", 
                    height: "36px", 
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                    transform: isPapeleraPressed ? "scale(0.9)" : isPapeleraHovered ? "scale(1.15)" : "scale(1)",
                  }}
                  title="Eliminar"
                />
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </>
  );
};

export default Games;