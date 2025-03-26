import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { getGamebyid, handleError } from "../../helpers/function";
import logo from "../../../assets/logo.jpeg"
import Loader from "../Loader/Loader";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameFunded, setGameFunded] = useState({})
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowSearch = !location.pathname.includes("/Games/update") && !location.pathname.includes("/Games/create");

  const handleSearch = async () => {
    try {
      setShowLoading({display: "block"})
      const response = await getGamebyid(searchTerm);
      response?.data && setGameFunded(response?.data);
      setShowLoading({display: "none"})
      navigate(`/Games/details/${searchTerm}`, { state: { game: gameFunded } });
  
    } catch (error) { 
      handleError(error)
    }
      

  };

  const handleHome = () => {
    navigate(`/`);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className={styles.navbar}>
      <form className={styles.form_navbar_style} role="search">
        {shouldShowSearch && (
          <>
            <Loader show={showLoading.display === "block"} estilo={showLoading} /> {/* Ajustar visibilidad del Loader */}
            <input
            className={styles.input_search_navbar_style}
            type="search"
            placeholder="Ingresa el ID del Juego"
            aria-label="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSearch}
            />
            <img src={logo} onClick={()=> handleHome()} alt="logo" style={{width:"50px", height:"50px", marginLeft:"20px"}} />
          </>
          
        )}
      </form>
    </nav>
  );
};

export default Navbar;
