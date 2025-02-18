//@ts-nocheck
import { Button } from "react-bootstrap";
import { ValidateFormFunc, disableButton } from "../../helpers/function";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./ModalRegister.module.css";
import eyeIcon from "../../../assets/fluent--eye-off-16-regular.svg";
import Loader from "../Loader/Loader";
import verifyIconError from "../../../assets/clarity--error-line.svg";
import Select, { Input } from "react-select";
import { useEffect } from "react";
import logo from "../../../assets/pepicons-pencil--hammer-claw-circle-filled.svg";

const ModalRegister: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    defaultTipoDocumento: { value: -1, label: "--Tipo de documento--" },
    opcionesTipoDocumento: [],
    numeroDocumento: "",
    numeroTelefono: "",
    defaultTipoContribuyente: { value: -1, label: "--Tipo de contribuyente--" },
    opcionesTipoContribuyente: [],
    correoElectronico: "",
    departamento: "",
    ciudad: "",
    codigoPostal: "",
    password: "",
    confirmPassword: "",
    checkedTerminosYCondiciones: false,
    checkedNotificaciones: false,
  });
  const [validateForm, setValidateForm] = useState({
    nombre: "",
    apellido: "",
    defaultTipoDocumento: { value: -1, label: "--Tipo de documento--" },
    opcionesTipoDocumento: [],
    numeroDocumento: "",
    numeroTelefono: "",
    defaultTipoContribuyente: { value: -1, label: "--Tipo de contribuyente--" },
    opcionesTipoContribuyente: [],
    correoElectronico: "",
    departamento: "",
    ciudad: "",
    codigoPostal: "",
    password: "",
    confirmPassword: "",
    checkedTerminosYCondiciones: "",
    checkedNotificaciones: false,
  });

  useEffect(() => {
    setForm({
      ...form,
      opcionesTipoDocumento: setOptionsSelect(
        "defaultTipoDocumento",
        TipoDocumento
      ),
      opcionesTipoContribuyente: setOptionsSelect(
        "defaultTipoContribuyente",
        TipoContribuyente
      ),
    });
  }, []);

  const handleShowPassword = (type: string) => {
    if (type === "password") setShowPassword(!showPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target === undefined) {
      const { name } = e;
      setForm({
        ...form,
        [name]: { value: e.value, label: e.label },
      });
      ValidateFormFunc(
        { ...form, [name]: { value: e.value, label: e.label } },
        validateForm,
        setValidateForm
      );
    } else if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: checked === true,
      }));
      ValidateFormFunc(
        { ...form, [name]: checked === true },
        validateForm,
        setValidateForm
      );
    } else {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
      ValidateFormFunc(
        { ...form, [name]: value },
        validateForm,
        setValidateForm
      );
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowLoading({ display: "block" });
    e.preventDefault();
    if (validateForm.checkedTerminosYCondiciones !== "") {
      console.log(validateForm.checkedTerminosYCondiciones);
      return errorTerminosYCondiciones(
        validateForm.checkedTerminosYCondiciones
      );
    }
    setTimeout(() => {
      Swal.fire("Registro exitoso", "Tu cuenta ha sido creada", "success");
      setShowLoading({ display: "none" });
    }, 2000);
  };

  const abrirTerminosYCondiciones = () => {
    Swal.fire("Acá abre el pdf de terminos y condiciones!", "", "info");
  };

  const errorTerminosYCondiciones = (message: string) => {
    Swal.fire(
      message || "Debe aceptar los terminos y condiciones",
      "",
      "error"
    );
    setShowLoading({ display: "none" });
  };

  const abrir_input_span_verificator = (
    Placeholder: string,
    propValidar: string,
    type: string,
    name: string,
    texto: string,
    select: boolean = false,
    optionsSelect: Array,
    defaultState: any,
    iconPass: boolean = false,
    typePass: string = "password"
  ) => {
    if (!select)
      return (
        <div className={styles.d_rows}>
          {!iconPass ? (
            <>
              <span style={{ color: "black", fontWeight: "bold" }}>{name}</span>
              <input
                className={styles.i_general_Style}
                type={type}
                name={name}
                value={propValidar}
                onChange={handleChange}
                placeholder={Placeholder}
              />
            </>
          ) : (
            <>
              <span style={{ color: "black", fontWeight: "bold" }}>{name}</span>
              <div className={styles.div_input_password_style}>
                <input
                  className={styles.i_general_Style}
                  type={type}
                  name={name}
                  value={propValidar}
                  onChange={handleChange}
                  placeholder={Placeholder}
                  style={{
                    width: "70%",
                  }}
                />
                <img
                  className={styles.i_eye_pass}
                  src={eyeIcon}
                  alt="eye"
                  onClick={() => handleShowPassword(typePass)}
                />
              </div>
            </>
          )}

          <span className={styles.sp_general_style}>
            {texto !== "" && validateForm[name] !== "" ? (
              <>
                {texto}
                <img
                  src={verifyIconError}
                  alt="verify_alert_error"
                  style={{ width: "20px" }}
                />
              </>
            ) : (
              ""
            )}
          </span>
        </div>
      );
    else
      return (
        <>
          <div className={styles.d_rows}>
            <label style={{ color: "black", fontWeight: "bold" }}>{name}</label>
            <Select
              id={name}
              name={name}
              value={defaultState}
              onChange={handleChange}
              options={optionsSelect}
              className={styles.select_general_style}
            />
          </div>
          <span className={styles.sp_general_style}>
            {texto !== undefined &&
            defaultState?.value !== -1 &&
            Placeholder ===
              name.toLocaleLowerCase().trim().replace(/\s+/g, "") ? (
              <>
                {texto}
                {texto !== "" ? (
                  <img
                    src={verifyIconError}
                    alt="verify_alert_error"
                    style={{ width: "20px" }}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </span>
        </>
      );
  };

  const setOptionsSelect = (name, obj) => {
    let defaultOption = [
      {
        value: 0,
        label: "---",
        name,
      },
    ];
    let estadoTmp = [
      ...defaultOption,
      ...obj.map((client) => ({
        name,
        value: client.id,
        label: client.name,
      })),
    ];
    return estadoTmp;
  };

  return (
    <>
      <Loader estilo={showLoading} />
      <div className={styles.div_completar_datos}>
        <form className={styles.f_general_style}>
          <h6 className={styles.h6_completar_datos}>
            Completa tus datos para registrarte en la plataforma
            <br />
            <br />
            <img
              src={logo}
              alt="logo"
              style={{
                width: "50px",
                backgroundColor: "#000000",
                borderRadius: "50%",
              }}
            />
          </h6>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. Juan",
              form.nombre,
              "text",
              "nombre",
              validateForm.nombre
            )}
            {abrir_input_span_verificator(
              "Ej. Perez",
              form.apellido,
              "text",
              "apellido",
              validateForm.apellido
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "tipodocumento",
              form.tipoDocumento,
              "text",
              "Tipo Documento",
              validateForm.defaultTipoDocumento,
              true,
              form.opcionesTipoDocumento,
              form.defaultTipoDocumento
            )}
            {abrir_input_span_verificator(
              "Ej. 1234567890",
              form.numeroDocumento,
              "number",
              "numeroDocumento",
              validateForm.numeroDocumento
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. 3121234567",
              form.numeroTelefono,
              "number",
              "numeroTelefono",
              validateForm.numeroTelefono
            )}
            {abrir_input_span_verificator(
              "tipocontribuyente",
              form.tipoContribuyente,
              "text",
              "Tipo Contribuyente",
              validateForm.defaultTipoContribuyente,
              true,
              form.opcionesTipoContribuyente,
              form.defaultTipoContribuyente
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. juanperez@gmail.com",
              form.correoElectronico,
              "text",
              "correoElectronico",
              validateForm.correoElectronico
            )}
            {abrir_input_span_verificator(
              "Ej. Cundinamarca",
              form.departamento,
              "text",
              "departamento",
              validateForm.departamento
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. Bogotá",
              form.ciudad,
              "text",
              "ciudad",
              validateForm.ciudad
            )}
            {abrir_input_span_verificator(
              "Ej. 11001",
              form.codigoPostal,
              "number",
              "codigoPostal",
              validateForm.codigoPostal
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "**********",
              form.password,
              showPassword ? "text" : "password",
              "password",
              validateForm.password,
              false,
              null,
              null,
              true
            )}
            {abrir_input_span_verificator(
              "**********",
              form.confirmPassword,
              showConfirmPassword ? "text" : "password",
              "confirmPassword",
              validateForm.confirmPassword,
              false,
              null,
              null,
              true,
              "confirmPassword"
            )}
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={form.checkedTerminosYCondiciones}
              id="flexCheckIndeterminate"
              name="checkedTerminosYCondiciones"
              onChange={handleChange}
            />
            <label className="form-check-label" for="flexCheckIndeterminate">
              <a
                onClick={abrirTerminosYCondiciones}
                href={abrirTerminosYCondiciones}
                className={styles.a_terminos_condiciones}
              >
                Terminos y condiciones
              </a>
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={form.checkedNotificaciones}
              id="flexCheckIndeterminate"
              name="checkedNotificaciones"
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              for="flexCheckIndeterminate"
              style={{ color: "#000" }}
            >
              Deseas recibir notificaciones <br />
              de nuevos productos y promociones
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: "#004876",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
            disabled={disableButton(validateForm)}
          >
            {disableButton(validateForm) ? "Registrandome..." : "Registrarme"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ModalRegister;

const TipoDocumento = [
  {
    id: 1,
    name: "Cédula de ciudadanía",
  },
  {
    id: 2,
    name: "Cédula de extranjería",
  },
  {
    id: 3,
    name: "Pasaporte",
  },
];

const TipoContribuyente = [
  {
    id: 1,
    name: "Régimen Común",
  },
  {
    id: 2,
    name: "Régimen Simplificado",
  },
];
