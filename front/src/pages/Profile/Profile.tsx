import { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import account from "../../../assets/mdi--account.svg";
import editIcon from "../../../assets/typcn--edit.svg";
import Swal from "sweetalert2";
import ToolExample from "../../../assets/tools/Combo Taladro Percutor 12 pulg 550W + Pulidora 4-12 pulg 820W Black+Decker.svg";
import ChatIcon from "../../../assets/chat.svg";
import shoppingBagIcon from "../../../assets/Shopping bag.svg";
import IconCotizador from "../../../assets/pajamas--review-list.svg";

const Profile: React.FC = () => {
  const profileImage = "";
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
  const editProfile = () => {
    Swal.fire({
      title: "Editar perfil",
      text: "Aqui se editara el perfil",
      icon: "info",
    });
  };
  useEffect(() => {
    obtenerIniciales(correoPrueba);
  }, []);
  return (
    <div className={styles.profileContainer}>
      {/* Información personal */}
      <div className={styles.profileContainerInfo}>
        <div className={styles.personalInfo}>
          {isPerfil ? (
            profileImage !== "" ? (
              <img
                src={profileImage}
                alt="profile"
                title="Mi cuenta"
                className="img_nabvar_profile_style"
              />
            ) : (
              <span className={styles.span_nabvar_profile_style}>
                {isPerfil}
              </span>
            )
          ) : (
            <img
              src={account}
              alt="Account"
              title="Mi cuenta"
              className="img-all-navbar-style"
            />
          )}
          <div style={{ textAlign: "left" }}>
            <h2>Julieth</h2>
            <p>julieths@gmail.com</p>
          </div>
        </div>

        <div className={styles.personalDetails}>
          <img
            src={editIcon}
            alt="profile"
            style={{ width: "30px", cursor: "pointer", marginLeft: "80%" }}
            onClick={editProfile}
          />
          <p>
            <strong>Tipo de Doc:</strong> C.C.
          </p>
          <p>
            <strong>Número de Doc:</strong> 123456798
          </p>
          <p>
            <strong>Número de teléfono:</strong> 123456798
          </p>
          <p>
            <strong>Dirección de envío:</strong> Av Miraflores 66-15
          </p>
          <p>
            <strong>Correo:</strong> JuliethFuentes@gmail.com
          </p>
          <p>
            <strong>Departamento:</strong> Cundinamarca
          </p>
          <p>
            <strong>Ciudad:</strong> Bogotá
          </p>
          <p>
            <strong>Código Postal:</strong> 111321
          </p>
          <p>
            <strong>Tipo Contribuyente:</strong> No aplica
          </p>
          <p>
            <strong>Password:</strong> **********
          </p>
        </div>
      </div>
      {/* Secciones adicionales */}
      <div className={styles.sections}>
        <div className={styles.d_sub_sections}>
          <div className={styles.sectionOne}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={shoppingBagIcon}
                alt="shoppingBag"
                style={{ width: "40px" }}
              />
              <h3>Tus Compras</h3>
            </div>
            <div className={styles.purchaseItem}>
              <img src={ToolExample} alt="Taladro" style={{ width: "18%" }} />
              <p style={{ textAlign: "left" }}>
                Taladro eléctrico multifuncional marca Stanley con herramientas
              </p>
              <div>
                <span style={{ fontWeight: "bold" }}>$250.000</span>
                <p>21/06/2024</p>
              </div>
            </div>
          </div>

          <div className={styles.sectionOne}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={IconCotizador}
                alt="Cotizaciones"
                style={{ width: "38px" }}
              />
              <h3>Tus Cotizaciones</h3>
            </div>
            <div className={styles.favoriteItem}>
              <p style={{ textAlign: "left", width: "70%" }}>
                Cotización hecha en 21/06/2024
              </p>
              <div>
                <span style={{ fontWeight: "bold" }}>$550.000</span>
                <button
                  title="Generar cotización"
                  type="button"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#004876",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={ChatIcon} alt="Chat" style={{ width: "50px" }} />
          <h3>Tus opiniones</h3>
        </div>
        <div className={styles.sectionEspecial}>
          <div className={styles.opinion}>
            <div className={styles.personalInfoOpinion}>
              {isPerfil ? (
                profileImage !== "" ? (
                  <img
                    src={profileImage}
                    alt="profile"
                    title="Mi cuenta"
                    className="img_nabvar_profile_style"
                  />
                ) : (
                  <span
                    className={styles.span_nabvar_profile_style}
                    style={{ fontSize: "20px", width: "50px", height: "50px" }}
                  >
                    {isPerfil}
                  </span>
                )
              ) : (
                <img
                  src={account}
                  alt="Account"
                  title="Mi cuenta"
                  className="img-all-navbar-style"
                />
              )}
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "20px" }}>Julieth</h2>
                <p style={{ fontSize: "15px" }}>julieths@gmail.com</p>
              </div>
            </div>
            <div style={{ width: "60%", textAlign: "left" }}>
              <p>
                Estoy muy satisfecha con la compra de este taladro. Es potente,
                fácil de manejar y su diseño ergonómico permite trabajar durante
                largos periodos sin cansancio. ¡100% recomendado!
              </p>
              <div className={styles.stars}>
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            <img src={ToolExample} alt="Taladro" style={{ width: "10%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
