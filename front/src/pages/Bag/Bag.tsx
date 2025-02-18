import { useContext } from "react";
import { useBag } from "../../helpers/BagContext";
import styles from "./Bag.module.css";
import numeral from "numeral";
import AddIcon from "../../../assets/ph--plus-fill.svg";
import RemoveIcon from "../../../assets/fluent--subtract-square-16-filled.svg";
import BagEmpty from "../../components/BagEmpty/BagEmpty";
import seguridad from "../../../assets/mingcute--user-security-fill.svg";
import satisfaccion from "../../../assets/vaadin--medal.svg";
import ayuda from "../../../assets/icon-park-solid--phone-two.svg";
import pseIcon from "../../../assets/pse-icon.png";
import Tool from "../Tools/Tools";

const Bag: React.FC = () => {
  const { bag, setBag } = useBag();

  const SetterCantidad = (id: number, accion: string) => {
    const newBag = bag.map((t: any) => {
      if (t.id === id) {
        return {
          ...t,
          cantidad:
            accion === "add" ? t.cantidad + 1 : Math.max(t.cantidad - 1, 0),
        };
      }
      return t;
    });
    setBag(newBag);
  };
  const calcularTotalSub = () => {
    const total = bag.reduce(
      (acc: any, item: any) => acc + item.price * item.cantidad,
      0
    );
    return numeral(total).format("0,0.00");
  };
  return (
    <div className={styles.container}>
      <div className={styles.bagContent}>
        <div className={styles.bagItems}>
          {bag.length <= 0 ? (
            <BagEmpty />
          ) : (
            bag.map((item: any) => (
              <div key={item.id} className={styles.bagItem}>
                <img
                  src={`../../../assets/tools/${item.name}.svg`}
                  alt={item.name}
                  style={{ width: "10%" }}
                />
                <div className={styles.itemInfo}>
                  <h4>{item.marca}</h4>
                  <h6 className={styles.itemName}>{item.name}</h6>
                  <p>Código:{item.code}</p>
                </div>
                <div>
                  <p className={styles.itemPrice}>
                    $ {numeral(item.price).format("0,0.00")}
                  </p>{" "}
                  <img
                    title="Aumentar unidades"
                    src={AddIcon}
                    style={{ width: "48px", cursor: "pointer" }}
                    alt="add"
                    onClick={() => SetterCantidad(item.id, "add")}
                  />
                  <span>{item.cantidad > 0 ? item.cantidad : 0}</span>
                  <img
                    title="Disminuir unidades"
                    src={RemoveIcon}
                    style={{ width: "48px", cursor: "pointer" }}
                    alt="sub"
                    onClick={() => SetterCantidad(item.id, "sub")}
                  />
                </div>
              </div>
            ))
          )}
          <hr style={{ border: "2px solid black" }} />
          <h5>Productos similares</h5>
          <Tool filtro={false} />
        </div>

        <div className={styles.summary}>
          <h6 className={styles.summaryTitle} style={{ textAlign: "center" }}>
            Resumen de compra
          </h6>
          <div>
            <div className={styles.summaryItem}>
              <h6 className={styles.summaryTitle}>Subtotal</h6>
              <p className={styles.summaryItemPrice}>$ {calcularTotalSub()}</p>
            </div>

            <hr style={{ border: "2px solid black" }} />
            <div className={styles.summaryItem}>
              <h6 className={styles.summaryTitle}>Total</h6>
              <p className={styles.summaryItemPrice}>$ {calcularTotalSub()}</p>
            </div>
            <p style={{ color: "black", fontFamily: "normal" }}>
              El coste de envío no está incluido en el total
            </p>

            <hr style={{ border: "2px solid black" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <p className={styles.summaryTitle}>Pagar con PSE</p>
              <img
                src={pseIcon}
                alt="pse icon"
                style={{
                  width: "15%",
                  marginBottom: "2%",
                  cursor: "pointer",
                  title: "Pagar con PSE",
                }}
              />
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoItem}>
                <img
                  src={seguridad}
                  alt="icono seguridad"
                  className={styles.infoIcon}
                />
                <div className={styles.infoContent}>
                  <h4>Compra segura</h4>
                  <p>
                    Tus datos personales se mantienen bajo estricta
                    confidencialidad y están protegidos.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <img
                  src={satisfaccion}
                  alt="icono satisfacción"
                  className={styles.infoIcon}
                />
                <div className={styles.infoContent}>
                  <h4>Satisfacción Garantizada</h4>
                  <p>
                    Puedes devolver tu compra en un plazo máximo de 30 días, el
                    producto debe estar en perfecto estado: sin uso, tener todos
                    sus accesorios, manuales y embalaje original. Si tienes
                    dudas, comunícate a nuestra línea de atención al cliente
                    desde Bogotá 3077115 o a la línea nacional 320 889 9933.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <img
                  src={ayuda}
                  alt="icono ayuda"
                  className={styles.infoIcon}
                />
                <div className={styles.infoContent}>
                  <h4>¿Necesitas ayuda?</h4>
                  <p>
                    Si necesitas ayuda para completar tu compra llámanos al 320
                    889 9933
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
