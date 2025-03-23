import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { listGames } from "../../helpers/function";

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [gamesList, setGamesList] = useState([])
  


  useEffect (() => {
    const GAMES = async () => {
      setShowLoading({display: "block"});
      let response = await listGames()
      setGamesList(response.data)
      setShowLoading({display:"none"});
    console.log(showLoading)}
    GAMES()
  },[])
  return (
  <>
    <Loader estilo={showLoading} />
      <h1>LISTA DE GAMES</h1>
      <button onClick={() => navigate("/Games/create")}> Crear Juego</button>
    {gamesList?.map((game, index) => (
      <><div className="d-flex gap-2 mt-2">
      <button className="btn btn-primary btn-sm" onClick={() => navigate(`Games/update/${game?.id}`)}>
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
    </div> </>

            
         
))}
  </>
);

};
export default Games;

