import Header from "../../components/Header/Header";
import numeral from "numeral";
import { useEffect, useState } from "react";
import StarIcon from "../../../assets/iconamoon--star.svg";
import StarIconHalf from "../../../assets/iconamoon--star-fill.svg";
import { useBag } from "../../helpers/BagContext";
import Swal from "sweetalert2";
const Tools: React.FC = ({ filtro }: { filtro: boolean }) => {
  const [tools, setTools] = useState([]);
  const { bag, setBag } = useBag();

  useEffect(() => {
    setTools(ToolsResponse.data);
  }, []);

  const showStars = (puntuacion: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < puntuacion) {
        // Estrella llena
        stars.push(<img src={StarIconHalf} alt="Full Star" />);
      } else {
        // Estrella vacía
        stars.push(<img src={StarIcon} alt="Empty Star" />);
      }
    }
    return stars;
  };

  const agregarAlCarrito = (tool: any) => {
    const findtool = bag.some((item: any) => item.id === tool.id);

    if (findtool) {
      return Swal.fire({
        title:
          "Este producto ya se encuentra en el carrito, ¿Quieres ir al carrito?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/HardwareStore/user/bag";
        }
      });
    }
    let toolaux = {
      ...tool,
      cantidad: 1,
    };
    setBag([...bag, toolaux]);
  };

  return (
    <>
      {filtro ? <Header /> : <div></div>}
      <div
        className="card"
        style={{
          width: "98%",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start", // Alinea las cards al inicio superior
          justifyContent: "space-between", // Distribuye el espacio de manera uniforme
          margin: "0 auto",
          border: "none",
          marginTop: "20px",
          flexWrap: "wrap", // Permite que las cards se envuelvan
          gap: "10px", // Espacio entre las tarjetas
        }}
      >
        {tools.map((tool: any) => (
          <div
            style={{
              width: "23%",
              backgroundColor: "#f4f4f4",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              height: "400px",
            }}
          >
            <img
              src={`../../../assets/tools/${tool.name}.svg`}
              className="card-img-top"
              alt="Cemento para construcción Argos Tipo HE de 42.5Kg"
              style={{ width: "40%", height: "40%" }}
            />
            <div
              className="card-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <h5 className="card-title" style={{}}>
                {tool.marca}
              </h5>
              <p className="card-text" style={{ textAlign: "start" }}>
                {tool.name}
                <br />$ {numeral(tool.price).format("0,0.00")} und
              </p>
              <div>
                {showStars(tool.puntuacion)}{" "}
                <label>({tool.puntuacion} / 5)</label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#004876",
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => {
                  agregarAlCarrito(tool);
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Tools;

const ToolsResponse: any = {
  status: 200,
  message: "success",
  data: [
    {
      id: 1,
      name: "Cemento para construcción Argos Tipo HE de 42.5Kg",
      price: 45000,
      marca: "Argos",
      puntuacion: 3,
      code: "1234567890",
    },
    {
      id: 2,
      name: "Cemento Multi-Propósito Yura de alta durabilidad 42.5Kg",
      price: 35000,
      marca: "Yura",
      puntuacion: 4,
      code: "54645646646554654",
    },
    {
      id: 3,
      name: "Cemento de uso general APU de 42.5Kg",
      price: 35000,
      marca: "Andino",
      puntuacion: 5,
      code: "54645646646554654",
    },
    {
      id: 4,
      name: "Cemento para construcción Holcim Tipo 1 de 50Kg",
      price: 35000,
      marca: "Holcim",
      puntuacion: 4,
      code: "54645646646554654",
    },
    {
      id: 5,
      name: "Pintura para Interior Lavable 2.5 Galones Blanco",
      price: 125000,
      marca: "Kolor",
      puntuacion: 4,
      code: "54645646646554654",
    },
    {
      id: 6,
      name: "Pintura para Interior Súper Lavable Max Blanco 2.5 Galones",
      price: 125000,
      marca: "Pintuco",
      puntuacion: 2,
      code: "54645646646554654",
    },
    {
      id: 7,
      name: "Combo Taladro Percutor 12 pulg 550W + Pulidora 4-12 pulg 820W Black+Decker",
      price: 125000,
      marca: "Black&Decker",
      puntuacion: 4,
      code: "54645646646554654",
    },
    {
      id: 8,
      name: "Taladro Percutor Atornillador Inalámbrico 12 Pulgada 18V Black And White",
      price: 150000,
      marca: "Black&Decker",
      puntuacion: 0,
      code: "54645646646554654",
    },
    {
      id: 9,
      name: "Taladro 12 Percutor 550W 2800 Rpm Vvr",
      price: 150000,
      marca: "Black&Decker",
      puntuacion: 4,
      code: "54645646646554654",
    },
  ],
};
