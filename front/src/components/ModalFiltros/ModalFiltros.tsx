/* eslint-disable jsx-a11y/label-has-associated-control */
import filterIcon from "../../../assets/mi--filter.svg";
import { useState, useEffect } from "react";
import Select from "react-select";
import "./ModalFiltros.css";

const style = (show: any) => ({
  display: show ? "block" : "none",
  right: 0,
  left: "auto",
});
const ModalFiltro = ({}) => {
  const [rangeValue, setRangeValue] = useState(200000);
  const [filtros, setFiltros] = useState({
    defaultOpcion: { value: -1, label: "---" },
    opcionesMarcas: { value: -1, label: "---" },
    defaultTipo: { value: -1, label: "---" },
    opcionesTipos: { value: -1, label: "---" },
    precio: 0,
    colorPintura: "",
    contenidoCemento: "",
    tipoCemento: "",
    tipoTaladro: "",
  });

  useEffect(() => {
    setFiltros({
      ...filtros,
      opcionesMarcas: setOptionsSelect("defaultOpcion", MarcasPinturas),
      opcionesTipos: setOptionsSelect("defaultTipo", Tipos),
    });
  }, []);
  const handleRangeChange = (e: any) => {
    setRangeValue(e.target.value);
  };
  const handleChange = (e: any) => {
    if (e.target === undefined)
      setFiltros({ ...filtros, [e.name]: { value: e.value, label: e.label } });
  };
  const setOptionsSelect = (name: string, obj: any) => {
    let defaultOption: any = [];
    let estadoTmp: any = [
      ...defaultOption,
      ...obj.map((client: any) => ({
        name,
        value: client.id,
        label: client.name,
      })),
    ];
    return estadoTmp;
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "10%",
          height: "auto",
        }}
      >
        <img
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          src={filterIcon}
          alt="filter"
          style={{
            width: "35px",
            border: "none",
          }}
        />
        <label
          htmlFor="filter"
          style={{
            fontSize: "1.5rem",
            fontFamily: "Istok Web",
            fontWeight: "bold",
          }}
        >
          Filtros
        </label>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ingresa tus filtros
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="customRange1" className="form-label">
                  Rango de precios
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <span>COP $200.000</span>
                  <input
                    type="range"
                    className="form-range custom-range"
                    id="customRange1"
                    min="200000"
                    max="2000000"
                    step="10000"
                    value={rangeValue}
                    onChange={handleRangeChange}
                  />
                  <span>COP $2.000.000</span>
                </div>
                <p>Precio seleccionado: COP ${rangeValue}</p>{" "}
              </div>

              {/*Opciones de marcas */}
              <div>
                <label htmlFor="opcionesMarcas" className="form-label">
                  Opciones de marcas
                </label>
                <Select
                  name="defaultOpcion"
                  value={filtros.defaultOpcion}
                  onChange={handleChange}
                  options={filtros.opcionesMarcas}
                />
                <label htmlFor="opcionesTipos" className="form-label">
                  Tipo
                </label>
                <Select
                  name="defaultTipo"
                  value={filtros.defaultTipo}
                  onChange={handleChange}
                  options={filtros.opcionesTipos}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#004876",
                  borderColor: "#004876",
                  color: "#fff",
                }}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFiltro;

const MarcasPinturas = [
  {
    id: 1,
    name: "Pintuco",
  },
  {
    id: 2,
    name: "Bler",
  },
  {
    id: 3,
    name: "Kolor",
  },
  {
    id: 4,
    name: "Corona",
  },
  {
    id: 5,
    name: "Dulux",
  },
  {
    id: 6,
    name: "Nippon",
  },
  {
    id: 7,
    name: "Sikkens",
  },
  {
    id: 8,
    name: "Bosh",
  },
  {
    id: 9,
    name: "Makita",
  },
  {
    id: 10,
    name: "DeWalt",
  },
  {
    id: 11,
    name: "Holcim",
  },
  {
    id: 12,
    name: "Argos",
  },
  {
    id: 13,
    name: "Black & Decker",
  },
  {
    id: 14,
    name: "Baucker",
  },
  {
    id: 15,
    name: "Total",
  },
  {
    id: 16,
    name: "Gavilan",
  },
  {
    id: 17,
    name: "Ranger",
  },
  {
    id: 18,
    name: "Bellota",
  },
  {
    id: 19,
    name: "Puma",
  },
  {
    id: 20,
    name: "Sika",
  },
];

const Tipos = [
  {
    id: 1,
    name: "Taladro Inalambrico",
  },
  {
    id: 2,
    name: "Taladro Electrico",
  },
  {
    id: 3,
    name: "Taladro Manual",
  },
  {
    id: 4,
    name: "Cemento Gris",
  },
  {
    id: 5,
    name: "Cemento Blanco",
  },
  {
    id: 6,
    name: "Pintura en Aerosol",
  },
  {
    id: 7,
    name: "Pintura para pared",
  },
  {
    id: 8,
    name: "Pintura para metal",
  },
  {
    id: 9,
    name: "Pintura para madera",
  },
  {
    id: 10,
    name: "Pintura para exteriores",
  },
  {
    id: 11,
    name: "Brochas",
  },
  {
    id: 12,
    name: "Rodillos",
  },
  {
    id: 13,
    name: "Lijas",
  },
];
