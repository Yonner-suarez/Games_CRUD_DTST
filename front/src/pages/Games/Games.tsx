import { useNavigate } from "react-router-dom";
import UpdateGame from "../../components/UpdateGame/UpdateGame";
import { useEffect, useState } from "react";
import { gameList } from "../../helpers/function";

const Games: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState({ display: "none" });

  useEffect(() => {
    const lisgames = async () => {      
      const gamelist_request = await gameList();
    };

    lisgames(); 

  }, []); 

  
  return (
    <>
       <Loader estilo={showLoading} />
      <h1>LISTA DE GAMES</h1>
      <button onClick={() => navigate("Games/update/5")}> Actualizar Juego</button>
      <button onClick={() => navigate("Games/update/5")}> Detalles Juego</button>
      <button onClick={() => {
        //se llama al ep que elimian juego 
      }}> Borrar Juego</button>
    </>
  );
};
export default Games;

