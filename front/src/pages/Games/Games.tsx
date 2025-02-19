import { useNavigate } from "react-router-dom";
import UpdateGame from "../../components/UpdateGame/UpdateGame";

const Games: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>LISTA DE GAMES</h1>
      <button onClick={()=>navigate("Games/update/5")}> Actualizar Juego</button>
    </>
  );
};
export default Games;

