import Select from "react-select";
import { useEffect, useState } from "react";
import { ICotizaciones, IHerramientasCotizadas } from "./interfaceCotizacion";
import styles from "./Cotizaciones.module.css";
import Swal from "sweetalert2";
import AddIcon from "../../../assets/ph--plus-fill.svg";
import RemoveIcon from "../../../assets/fluent--subtract-square-16-filled.svg";
import IconCotizador from "../../../assets/pajamas--review-list.svg";
import Loader from "../../components/Loader/Loader";
import IconTrash from "../../../assets/f7--trash-circle-fill.svg";
import numeral from "numeral";

const Cotizaciones: React.FC = () => {
  const [totalCotizacion, setTotalCotizacion] = useState(0);
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [cotizaciones, setCotizaciones] = useState<ICotizaciones>({
    herramientas: [],
    opcionesHerramientas: [{ value: -1, label: "Seleccione una opción" }],
  });
  const [cantidadProducto, setCantidadProducto] = useState(0);

  useEffect(() => {
    let herramienta = cotizaciones.herramientas.find((h) => {
      return h.defaultState.value !== -1;
    });
    if (herramienta) {
      setCotizaciones({
        ...cotizaciones,
        opcionesHerramientas: cotizaciones.opcionesHerramientas.filter(
          (h) => h.value !== herramienta.idHerramienta
        ),
      });
    } else {
      setCotizaciones({
        ...cotizaciones,
        opcionesHerramientas: setOptionsSelect("defaultState", herramientas),
      });
    }
  }, [cotizaciones.herramientas]);

  const handleChange = (e: any) => {
    if (e.target === undefined) {
      const herramientaParaAgregar: IHerramientasCotizadas = {
        cantidad: 1,
        precio: 0,
        idHerramienta: e.value,
        defaultState: { value: e.value, label: e.label },
      };
      setCotizaciones({
        ...cotizaciones,
        herramientas: [
          ...cotizaciones.herramientas,
          herramientaParaAgregar,
        ] as IHerramientasCotizadas[],
      });
    }
  };
  const setOptionsSelect = (name: string, obj: any) => {
    let defaultOption: any = [];
    let estadoTmp = [
      ...defaultOption,
      ...obj.map((client: any) => ({
        name,
        value: client.value,
        label: client.label,
      })),
    ];
    return estadoTmp;
  };
  const SetterCantidad = (idHerramienta: number, type: string) => {
    const herramientaEncontrada = cotizaciones.herramientas.find(
      (h) => h.idHerramienta === idHerramienta
    );
    if (type === "add") {
      if (herramientaEncontrada) {
        if (herramientaEncontrada && herramientaEncontrada.cantidad >= 15)
          return Swal.fire(
            "Alerta",
            "La cantidad no puede ser mayor a 15. Contactate con el administrador para comprar cantidades superiores",
            "warning"
          );

        herramientaEncontrada.cantidad += 1;
        setCotizaciones({
          ...cotizaciones,
          herramientas: cotizaciones.herramientas,
        });
      }
    } else {
      if (herramientaEncontrada && herramientaEncontrada.cantidad <= 0)
        return handleCantidadProducto("sub");

      if (herramientaEncontrada) {
        herramientaEncontrada.cantidad -= 1;
        setCotizaciones({
          ...cotizaciones,
          herramientas: cotizaciones.herramientas,
        });
      }
    }
  };
  const showCantidad = (idHerramienta: number) => {
    let herramienta = cotizaciones.herramientas.find((h) => {
      return h.defaultState.value === idHerramienta;
    });
    return herramienta?.cantidad;
  };

  const handleCantidadProducto = (type: string, idHerramienta: number = -1) => {
    if (type === "add") {
      if (cantidadProducto >= cotizaciones.opcionesHerramientas.length)
        return Swal.fire(
          "Alerta",
          "No se puede agregar más productos",
          "warning"
        );
      setCantidadProducto(cantidadProducto + 1);
    } else {
      if (idHerramienta !== -1) {
        const herramientaEncontrada = cotizaciones.herramientas.find(
          (h) => h.idHerramienta === idHerramienta
        );
        if (herramientaEncontrada) {
          setCantidadProducto(cantidadProducto - 1);
          setCotizaciones({
            ...cotizaciones,
            herramientas: cotizaciones.herramientas.filter(
              (h) => h.idHerramienta !== idHerramienta
            ),
          });
        }
      }
    }
  };

  const handleGenerateCotization = () => {
    if (cotizaciones.herramientas.length === 0)
      return Swal.fire(
        "Alerta",
        "Debes seleccionar al menos una herramienta",
        "warning"
      );

    setShowLoading({ display: "block" });
    setShowLoading({ display: "block" });

    setTimeout(() => {
      setCotizaciones((prevCotizaciones) => {
        const herramientasActualizadas = ResponseApi.data.map((h) => ({
          ...h,
          precio: h.precio,
        }));

        const total = herramientasActualizadas.reduce(
          (acc, curr) => acc + curr.precio * curr.cantidad,
          0
        );

        // Retorna el nuevo estado de cotizaciones
        return {
          ...prevCotizaciones,
          herramientas: herramientasActualizadas,
        };
      });

      const total = ResponseApi.data.reduce(
        (acc, curr) => acc + curr.precio * curr.cantidad,
        0
      );

      setTotalCotizacion(total);

      Swal.fire(
        "Exito",
        "La cotización se ha generado correctamente",
        "success"
      );
      setShowLoading({ display: "none" });
    }, 2000);
    //TODO: Generar la cotizacion en la api
  };

  return (
    <>
      <Loader estilo={showLoading} />
      <div className={styles.d_container_cotizacion}>
        <div>
          <h6
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
              marginBottom: "5%",
            }}
          >
            Aquí puedes generar tu cotización
            <br />
            totalmente gratis y facil{" "}
            <img
              src={IconCotizador}
              alt="iconoCotizador"
              style={{ width: "20px" }}
            />
          </h6>
          <div className={styles.d_container_nombre_cotizacion}>
            <input
              type="text"
              placeholder="Ingresa el nombre de tu empresa"
              className={styles.i_nombre_cotizacion}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "3px",
                width: "40%",
                justifyContent: "flex-end",
                justifyItems: "center",
                alignContent: "flex-end",
              }}
            >
              <img
                title="Agregar Producto"
                onClick={() => handleCantidadProducto("add")}
                src={AddIcon}
                style={{ width: "50px", cursor: "pointer" }}
              />

              <button
                title="Generar cotización"
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#004876",
                  color: "#fff",
                  border: "none",
                }}
                onClick={handleGenerateCotization}
              >
                Generar Cotizacion
              </button>
            </div>
          </div>

          {
            // Crear un array temporal con la longitud de cantidadProducto y mapearlo
            [...Array(cantidadProducto)].map((_, i) => (
              <div className={styles.d_container_herramienta}>
                <Select
                  id=""
                  name="defaultState"
                  placeholder="Seleccione una opción"
                  value={cotizaciones.herramientas[i]?.defaultState}
                  onChange={handleChange}
                  options={cotizaciones.opcionesHerramientas}
                  className={styles.select_herramienta}
                />
                <img
                  title="Aumentar unidades"
                  src={AddIcon}
                  style={{ width: "48px", cursor: "pointer" }}
                  alt="add"
                  onClick={() =>
                    SetterCantidad(
                      cotizaciones.herramientas[i]?.idHerramienta,
                      "add"
                    )
                  }
                />
                <img
                  title="Disminuir unidades"
                  src={RemoveIcon}
                  style={{ width: "48px", cursor: "pointer" }}
                  alt="sub"
                  onClick={() =>
                    SetterCantidad(
                      cotizaciones.herramientas[i]?.idHerramienta,
                      "sub"
                    )
                  }
                />
                <label className={styles.input_cantidad}>
                  Cantidad{" "}
                  {showCantidad(cotizaciones.herramientas[i]?.idHerramienta)}
                </label>
                <img
                  onClick={() =>
                    handleCantidadProducto(
                      "sub",
                      cotizaciones.herramientas[i]?.idHerramienta
                    )
                  }
                  src={IconTrash}
                  style={{ width: "48px", cursor: "pointer" }}
                  title="Eliminar Producto"
                  alt="trash"
                />
                <label>
                  {cotizaciones.herramientas[i]?.precio > 0
                    ? numeral(cotizaciones.herramientas[i]?.precio).format(
                        "0,0.00"
                      )
                    : ""}
                </label>
              </div>
            ))
          }
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {totalCotizacion > 0 ? (
            <>
              <h6
                style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}
              >
                Total de la cotización:
              </h6>
              <label
                style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}
              >
                COP {numeral(totalCotizacion).format("0,0.00")}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Cotizaciones;

const herramientas = [
  {
    value: 1,
    label: "Pintura pintuco blanca baril",
  },
  {
    value: 2,
    label: "Pintura pintuco blanca 3lt",
  },
  {
    value: 3,
    label: "Pintura pintuco blanca 5lt",
  },
  {
    value: 4,
    label: "Pintura pintuco blanca 10lt",
  },
  {
    value: 5,
    label: "Cemento gris 50kg",
  },
  {
    value: 6,
    label: "Cemento blanco Argos 50kg",
  },
  {
    value: 7,
    label: "Cemento blanco Holcim 50kg",
  },
];

const ResponseApi = {
  status: 200,
  message: "Cotización generada correctamente",
  data: herramientas.map((h) => {
    return {
      idHerramienta: h.value,
      cantidad: 1,
      defaultState: { value: h.value, label: h.label },
      precio: 25000,
    };
  }),
};
