import { Link } from "react-router-dom";
import bagEmpty from "../../../assets/bagEmpty.svg";
const BagEmpty: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Link
        to="/HardwareStore/products"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <img src={bagEmpty} alt="Bag Empty" style={{ width: "30%" }} />
        <p>No hay productos en el carrito. Vamos a comprar!</p>
      </Link>
    </div>
  );
};

export default BagEmpty;
