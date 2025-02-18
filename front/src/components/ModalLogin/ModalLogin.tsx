import checkUser from "../../../assets/tabler--user-check.svg";
import check from "../../../assets/mdi--tag-check.svg";
import styles from "./ModalLogin.module.css";
import logo from "../../../assets/pepicons-pencil--hammer-claw-circle-filled.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const ModalLogin: React.FC = () => {
  const navigate = useNavigate();
  const FormRegister = () => {
    navigate("/HardwareStore/register/user");
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: "60vw", margin: "auto", marginTop: "60px" }}
        >
          <div
            className="modal-content"
            style={{
              height: "80vh",
              width: "100%",
              margin: "auto",
            }}
          >
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div className={styles.d_containes_beneficios}>
                <h6 className={styles.h6_beneficios}>
                  ¿Aún no tienes cuenta con nosotros? <br />
                  Conoce tus beneficios
                  {"       "}
                  <img
                    src={checkUser}
                    alt="checkUser"
                    style={{ width: "35px" }}
                  />
                </h6>

                <br />
                <br />
                <br />
                <div className={styles.d_containes_beneficios_check}>
                  <p className={styles.p_beneficios}>
                    <img src={check} alt="check" style={{ width: "25px" }} />
                    {"           "} Puedes guardar tus direcciones e información
                    de envío
                  </p>
                  <p className={styles.p_beneficios}>
                    <img src={check} alt="check" style={{ width: "25px" }} />
                    {"           "}
                    Puedes seguir tus envios en tiempo real
                  </p>
                  <p className={styles.p_beneficios}>
                    <img src={check} alt="check" style={{ width: "25px" }} />
                    {"           "}
                    Recibe notificaciones con descuentos exclusivos
                  </p>
                  <p className={styles.p_beneficios}>
                    <img src={check} alt="check" style={{ width: "25px" }} />
                    {"           "}
                    Gestiona tus pedidos
                  </p>
                  <p className={styles.p_beneficios}>
                    <img src={check} alt="check" style={{ width: "25px" }} />
                    {"           "}
                    Califica los productos
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "3px",
                  height: "100%",
                  backgroundColor: "#004876",
                  margin: "0 15px",
                }}
              ></div>
              <div className={styles.d_containes_login}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "50px", borderColor: "black" }}
                />
                <br />
                <h6 className={styles.h6_beneficios}>
                  Hola!! Inicia Sesión con tu cuenta...
                </h6>
                <div className={styles.d_containes_login_inputs}>
                  <div
                    className="input-group flex-nowrap"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "90%",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: "5%",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control custom-focus"
                      placeholder="Correo electrónico"
                      aria-label="Email"
                      aria-describedby="addon-wrapping"
                      style={{
                        width: "100%",
                        borderRadius: "6px",
                        fontFamily: "Istok Web",
                        fontSize: "15px",
                        backgroundColor: "rgba(0, 72, 118, 0.34)",
                      }}
                    />
                  </div>
                  <div
                    className="input-group flex-nowrap"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "90%",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: "5%",
                    }}
                  >
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      aria-label="Password"
                      aria-describedby="addon-wrapping"
                      style={{
                        width: "100%",
                        borderRadius: "6px",
                        fontFamily: "Istok Web",
                        fontSize: "15px",
                        backgroundColor: "rgba(0, 72, 118, 0.34)",
                      }}
                    />
                  </div>
                  <br />
                  <a href="/" style={{ fontSize: "12px" }}>
                    ¿Olvidaste tu contraseña?
                  </a>
                  <br />
                  <div className={styles.d_containes_login_inputs_buttons}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#004876",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      style={{ border: "1px solid #004876" }}
                      onClick={FormRegister}
                    >
                      Registrarse
                    </button>
                  </div>
                  {/* Google Login */}
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#004876", color: "#fff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLogin;
