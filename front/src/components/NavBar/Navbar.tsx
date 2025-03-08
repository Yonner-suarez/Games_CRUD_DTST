import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const shouldShowSearch = !location.pathname.includes("/Games/update") && !location.pathname.includes("/Games/create");

  const handleSearch = () => {
    console.log("Buscando juego con ID:", searchTerm);
    // TODO: Implementar la lógica de búsqueda del juego por ID
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className={styles.navbar}>
      <form className={styles.form_navbar_style} role="search">
        {shouldShowSearch && (
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
        )}
      </form>
    </nav>
  );
};

export default Navbar;
