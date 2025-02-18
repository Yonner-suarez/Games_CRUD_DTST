import styles from "./Loader.module.css";
import LoaderProps from "./intarefaceLoader";

const style = (show: any) => ({ display: show ? "block" : "none" });

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div
      className={styles.modalProgress}
      style={typeof props.show === "boolean" ? style(props.show) : props.estilo}
    >
      <div className={styles.loading}>
        <span className={styles.span_style_loader}>
          <span className={styles.loader}></span>
          <span className={styles.cargando}>Cargando....</span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
