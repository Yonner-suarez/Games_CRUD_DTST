import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { delGames, gameList, handleError } from "../../helpers/function";
import Swal from "sweetalert2";
 
const Games: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [gamesList, setGamesList] = useState<any[]>([])
  const [isSearchResult, setIsSearchResult] = useState(false);
 
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

  return (
    <>
      <Loader estilo={showLoading} />
      <h1>{isSearchResult ? "RESULTADOS DE BÚSQUEDA" : "LISTA DE JUEGOS"}</h1>
      <button onClick={() => navigate("/Games/create")}> Crear Juego</button>  
      {isSearchResult && (
        <button onClick={clearSearch} className="btn btn-secondary btn-sm ms-2">
          Ver todos los juegos
        </button>
      )}
      {gamesList.length === 0 && !isSearchResult && (
        <div className="text-center mt-4">
          <p className="text-muted">No hay juegos registrados.</p>
          <p className="text-primary">¡Presiona "Crear Juego" para agregar el primero!</p>
        </div>
      )}
      {gamesList.length === 0 && isSearchResult && (
        <div className="text-center mt-4">
          <p className="text-muted">No se encontraron juegos con ese término.</p>
        </div>
      )}
      {gamesList.map((game, index) => (
        <div key={index} className="container mt-2">
          <div className="card shadow-sm" style={{ maxWidth: "500px", margin: "auto" }}>
            <div className="row g-0">
              <div className="col-md-3 d-flex align-items-center justify-content-center p-2">
                <img
                  src={`data:image/png;base64,${game?.image}`}
                  alt={game?.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "120px" }}
                />
              </div>
              <div className="col-md-9">
                <div className="card-body p-2">
                  <h6 className="card-title">{game?.name}</h6>
                  <p className="card-text mb-1"><strong>Código:</strong> {game?.code}</p>
                  <p className="card-text mb-1"><strong>Consola:</strong> {game?.console?.label}</p>
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
                    <button className="btn btn-danger btn-sm" onClick={() => delGame(game.code)}>
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