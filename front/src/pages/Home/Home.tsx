
import { useLocation, useNavigate } from "react-router-dom";
import Games from "../Games/Games"; 
import { useEffect } from "react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate(0);
    }
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return (
    <>
      <Games/>
      <button onClick={() => navigate("/Games/create")}> Crear Juego</button>
    </>
  );
};

export default Home;
