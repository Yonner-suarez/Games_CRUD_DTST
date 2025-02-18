import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // TODO: Implementar la búsqueda de GAMES por ID
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className={styles.navbar}>

      <form className={styles.form_navbar_style} role="search">
        <input
          className={styles.input_search_navbar_style}
          type="search"
          placeholder="Ingresa el ID del Juego"
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSearch}
        />
      </form>      
    </nav>
  );
};

export default Navbar;
