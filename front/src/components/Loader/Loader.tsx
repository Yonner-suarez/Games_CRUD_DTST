import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  show: boolean;
  estilo?: React.CSSProperties;
  mensaje?: string; // Nueva prop para el mensaje
}

const style = (show: boolean): React.CSSProperties => {
  return {
    display: show ? "flex" : "none", // Muestra u oculta el Loader
  };
};

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div
      className={styles.modalProgress}
      style={typeof props.show === "boolean" ? style(props.show) : props.estilo}
    >
      <div className={styles.loading}>
        <span className={styles.span_style_loader}>
          <span className={styles.loader}></span> {/* Asegúrate de que este estilo no esté duplicado */}
          {props.mensaje && <span className={styles.cargando}>{props.mensaje}</span>} {/* Mostrar mensaje solo si existe */}
        </span>
      </div>
    </div>
  );
};

export default Loader;