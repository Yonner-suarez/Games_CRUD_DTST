import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { handleError, searchGames } from "../../helpers/function";
import logo from "../../../assets/logo.JPG"
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLogoPressed, setIsLogoPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setShowLoading({ display: "block" });

      const response = await searchGames(searchTerm);
      setShowLoading({ display: "none" });

      if (response?.data && response.data.length > 0) {
        if (response.data.length === 1) {
          navigate(`/Games/details/${response.data[0].code}`, { state: { game: response.data[0]} });
        } else {
          navigate(`/Games`, { state: { searchResults: response.data, searchTerm } });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Sin resultados",
          text: `No se encontró ningún juego relacionado con "${searchTerm}".`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Entendido"
        });
        setSearchTerm("");
      }
    } catch (err) {
      setShowLoading({ display: "none" });
      handleError(err);
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

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const getLogoTransform = () => {
    if (isLogoPressed) return "scale(0.90)";
    if (isLogoHovered) return "scale(1.15)";
    return "scale(1)";
  };

  const logoStyle: React.CSSProperties = {
    width: "50px",
    height: "50px",
    marginLeft: "10px",
    marginTop: "-5px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    transform: getLogoTransform(),
    userSelect: "none",
  };

  return (
    <nav className={styles.navbar}>
      <form className={styles.form_navbar_style} role="search">
        <Loader show={showLoading.display === "block"} estilo={showLoading} />
        <input
          ref={inputRef}
          className={styles.input_search_navbar_style}
          type="search"
          maxLength={50}
          placeholder={isInputFocused ? "" : "Buscar juego..."}
          aria-label="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{ marginRight: "20px" }}
        />
        {searchTerm.length > 0 && (
          <span style={{ 
            fontSize: "12px", 
            color: "#666", 
            whiteSpace: "nowrap",
            fontStyle: isInputFocused ? "italic" : "normal",
          }}>
            
          </span>
        )}
        <img 
          src={logo} 
          onClick={handleHome}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onMouseDown={() => setIsLogoPressed(true)}
          onMouseUp={() => setIsLogoPressed(false)}
          onMouseLeaveCapture={() => setIsLogoPressed(false)}
          alt="Logotipo" 
          style={logoStyle}
        />
      </form>
    </nav>
  );
};

export default Navbar;