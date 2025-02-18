import ModalFiltros from "../ModalFiltros/ModalFiltros";
import b_y_d from "../../../assets/b&d.svg";
import bosh from "../../../assets/bosh.svg";
import makita from "../../../assets/makita-removebg-preview 1 (1).svg";
import dewalt from "../../../assets/dewalt.svg";
import Holcim from "../../../assets/logo_holcim-removebg-preview 1.svg";
import baucker from "../../../assets/bauker_logo-removebg-preview (1) 1.svg";
import argos from "../../../assets/logo argos 1.svg";

const Header = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#D9D9D9",
          width: "98%",
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <ModalFiltros />
        <div
          style={{
            width: "70%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <img src={b_y_d} alt="Black&Decker" style={{ width: "10%" }} />
          <img src={bosh} alt="Bosh" style={{ width: "8%" }} />
          <img src={makita} alt="Makita" style={{ width: "10%" }} />
          <img src={dewalt} alt="Dewalt" style={{ width: "8%" }} />
          <img src={baucker} alt="Baucker" style={{ width: "10%" }} />
          <img src={Holcim} alt="Holcim" style={{ width: "20%" }} />
          <img src={argos} alt="Argos" style={{ width: "5%" }} />
        </div>
      </div>
    </>
  );
};

export default Header;
