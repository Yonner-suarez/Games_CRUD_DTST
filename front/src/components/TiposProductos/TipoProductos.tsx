import tipoProd_1 from "../../../assets/tipoprod_1.svg";
import latoneriaprod from "../../../assets/latoneriaprod.svg";
import ornamentacionprod from "../../../assets/ornamentacionprod.svg";
import { Link } from "react-router-dom";

const TipoProductos: React.FC = () => {
  return (
    <div
      className="card-group"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
        width: "100%",
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/HardwareStore/products"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <img
            src={tipoProd_1}
            className="card-img-top"
            alt="tipoProd_1"
            style={{ width: "90%", height: "auto", cursor: "pointer" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">Tenemos todo para construcción</h5>
        </div>
      </div>
      <div
        className="card"
        style={{
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link
          to="/HardwareStore/products"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <img
            src={latoneriaprod}
            className="card-img-top"
            alt="latoneriaprod"
            style={{ width: "71.5%", height: "auto", cursor: "pointer" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">Tenemos todo para latoneria y pintura</h5>
        </div>
      </div>
      <div
        className="card"
        style={{
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/HardwareStore/products"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <img
            src={ornamentacionprod}
            className="card-img-top"
            alt="ornamentacionprod"
            style={{ width: "91%", height: "auto", cursor: "pointer" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">Tenemos todo para ornamentación</h5>
        </div>
      </div>
    </div>
  );
};

export default TipoProductos;
