import React, { useEffect, useState } from "react";
import Logo from "../../../assets/pepicons-pencil--hammer-claw-circle-filled.svg";
import ubicacion from "../../../assets/basil--map-location-outline.svg";
import account from "../../../assets/mdi--account.svg";
import shoppingBag from "../../../assets/ic--baseline-shopping-bag.svg";
import styles from "./NavBar.module.css";
import { obtenerNombreCiudad } from "../../helpers/function";
import Swal from "sweetalert2";
import IconCotizador from "../../../assets/pajamas--review-list_nabvar.svg";
import { Link } from "react-router-dom";
import { useBag } from "../../helpers/BagContext";

const Navbar: React.FC = () => {
  const profileImage = "";
  const [isLogged, setIsLogged] = useState(false);
  const [NameAccount, setNameAccount] = useState("Julieth");
  const [searchTerm, setSearchTerm] = useState("");
  const [coordenadas, setCoordenadas] = useState({});
  const [ciudad, setCiudad] = useState("");
  const [isPerfil, setIsPerfil] = useState("");

  const correoPrueba = "Julieth Fuentes";
  const obtenerIniciales = (correo: string): void => {
    if (correo === "") {
      setIsPerfil("");
    } else {
      const partes = correo.split(" ");
      if (partes.length > 0) {
        const iniciales = partes[0][0] + partes[1][0];
        setIsPerfil(iniciales);
      }
    }
  };

  const { bag } = useBag();

  const handleSearch = () => {
    // TODO: Implementar la búsqueda de productos
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const encontrarCoordenadas = () => {
    navigator.geolocation.getCurrentPosition(
      async (posicion) => {
        const { latitude, longitude } = posicion.coords;
        setCoordenadas({ latitude, longitude });
        let ciudad: string = await obtenerNombreCiudad(latitude, longitude);
        setCiudad(ciudad);
      },
      (error) =>
        Swal.fire({
          title: error.message,
          text: "",
          icon: "error",
        })
    );
  };

  useEffect(() => {
    encontrarCoordenadas();
    obtenerIniciales(correoPrueba);
  }, []);

  return (
    <nav className={styles.navbar}>
      <a className={styles.a_navbar_logo_style} href="/">
        <img
          src={Logo}
          alt="Logo"
          className="img-all-navbar-style"
          title="Logo"
        />
        <span className={styles.span_navbar_style}>
          Hardware Store <br />
          Nuts and Bolts
        </span>
      </a>

      <form className={styles.form_navbar_style} role="search">
        <input
          className={styles.input_search_navbar_style}
          type="search"
          placeholder="         ¿Qué deseas comprar?"
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSearch}
        />
      </form>
      <ul className={styles.navbar_ul_style}>
        <li className={styles.nav_item_style}>
          <div className={styles.div_li_ul_navbar_style}>
            <img
              src={ubicacion}
              alt="Ubicacion"
              title="Ubicación"
              className="img-all-navbar-style"
            />
            <div className={styles.div_li_ul_navbar_location_style}>
              <p className={styles.p_location_navbar_style}>
                Te encuentras en:
              </p>
              <span
                className={styles.span_navbar_style}
                onClick={() => {}}
                role="button"
              >
                {ciudad !== "" ? ciudad : "Ubicación"}
              </span>
            </div>
          </div>
        </li>
        <li className={styles.nav_item_style}>
          <Link to="/HardawareStore/cotizaciones/generar">
            <img
              src={IconCotizador}
              alt="Cotizador"
              className="img-all-navbar-style"
              title="Cotizador"
              style={{ width: "45px", cursor: "pointer" }}
            />
          </Link>
          <Link to="/HardwareStore/user/bag">
            <img
              src={shoppingBag}
              alt="Shopping Bag"
              title="Carrito de compras"
              className="img-all-navbar-style"
              onClick={() => {}}
            />
            <span
              style={{
                color: "white",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {bag?.length > 0 ? bag?.length : ""}
            </span>
          </Link>
        </li>
        <li className={styles.nav_item_style}>
          <div className={styles.div_li_ul_navbar_style}>
            {isPerfil ? (
              profileImage !== "" ? (
                <Link to="/HardwareStore/user/profile">
                  <img
                    src={profileImage}
                    alt="profile"
                    title="Mi cuenta"
                    className="img_nabvar_profile_style"
                  />
                </Link>
              ) : (
                <Link to="/HardwareStore/user/profile">
                  <span className={styles.span_nabvar_profile_style}>
                    {isPerfil}
                  </span>
                </Link>
              )
            ) : (
              <Link to="/HardwareStore/user/profile">
                <img
                  src={account}
                  alt="Account"
                  title="Mi cuenta"
                  className="img-all-navbar-style"
                />
              </Link>
            )}
            <Link to="/HardwareStore/user/profile">
              <span className={styles.span_navbar_style} title="Mi cuenta">
                {isLogged ? "Mi Cuenta" : "Hola " + NameAccount}
              </span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
