import Carousel from "react-bootstrap/Carousel";
import b_y_d from "../../../assets/b&d.svg";
import bosh from "../../../assets/bosh.svg";
import makita from "../../../assets/makita-removebg-preview 1 (1).svg";
import dewalt from "../../../assets/dewalt.svg";
import styles from "./CarruselHomePage.module.css";
const CarruselHomePage: React.FC = () => {
  return (
    <Carousel data-bs-theme="dark" className={styles.d_container_carrusel}>
      <Carousel.Item className={styles.d_container_img_carrusel_item_b_d}>
        <Carousel.Caption className={styles.d_container_img_carrusel_caption}>
          <img
            className="style-img-all-carrusel"
            style={{ width: "50%", height: "auto" }}
            src={b_y_d}
            alt="Black&Decker"
          />
          <h5>Black & Decker</h5>
          <p>Black & Decker. Soluciones potentes.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={styles.d_container_img_carrusel_item_bosh}>
        <Carousel.Caption className={styles.d_container_img_carrusel_caption}>
          <img
            className="style-img-all-carrusel"
            style={{ width: "40%", height: "auto" }}
            src={bosh}
            alt="Bosh"
          />
          <h5>Bosh</h5>
          <p>Inventado para la vida</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={styles.d_container_img_carrusel_item_mikita}>
        <Carousel.Caption className={styles.d_container_img_carrusel_caption}>
          <img
            className="style-img-all-carrusel"
            style={{ width: "50%", height: "auto" }}
            src={makita}
            alt="Makita"
          />
          <h5>Makita</h5>
          <p>Herramientas eléctricas para el largo plazo</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.d_container_img_carrusel_item_dewalt}>
        <Carousel.Caption className={styles.d_container_img_carrusel_caption}>
          <img
            className="style-img-all-carrusel"
            style={{ width: "40%", height: "auto" }}
            src={dewalt}
            alt="DWalt"
          />
          <h5>DeWalt</h5>
          <p>Herramientas resistentes garantizadas.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarruselHomePage;
