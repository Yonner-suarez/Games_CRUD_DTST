//@ts-nocheck
import { Button } from "react-bootstrap";
import { ValidateFormFunc, disableButton, getGamebyid, getConsoles, base64ToFile, updateGame, handleError } from "../../helpers/function";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./UpdateGame.module.css";
import Loader from "../Loader/Loader";
import Select, { Input } from "react-select";
import { useEffect } from "react";
import DropZone from "../DropZone/DropZone";
import { useNavigate, useParams } from "react-router-dom";

const UpdateGame: React.FC = () => {
  const {id: idGame} = useParams();
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState({});
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [validated, setValidated] = useState(false);
  const [previewURL , setPreviewURL] = useState("")
  const [showLoading, setShowLoading] = useState({ display: "none" });
  const [form, setForm] = useState({
    code: 0,
    name: "",
    defaultConsole: { value: -1, label: "--Tipo de Consola--" },
    consoles: [],
    description: "",
    releaseYear: 0,
    numberOfPlayers: 0,
    Image: {}
  });
  const [validateForm, setValidateForm] = useState({
    code: "",
    name: "",
    defaultConsole: { value: -1, label: "--Tipo de Consola--" },
    consoles: [],
    description: "",
    releaseYear: "",
    numberOfPlayers: "",
    Image: {}
  });

   
  const llamarAlGameID = async (id: int) => {
    try {
      const game = await getGamebyid(id); // Obtener los datos del juego
      const consoles = await getConsoles(); // Obtener las consolas

      console.log("Consolas obtenidas de la API:", consoles); // Depuración
  
      let base64String = game.image;
      if (!base64String.startsWith("data:image")) {
        base64String = `data:image/png;base64,${base64String}`;
      }
      const file = base64ToFile(base64String, "imagen.png");
      if (file) {
        setPreviewURL(URL.createObjectURL(file));
        setUploadedFile((prevState) => ({ ...prevState, Image: file }));
      }
  
      setForm({
        ...form,
        code: game.code || 0,
        name: game.name || "",
        defaultConsole: consoles.find((c) => c.id === game.consoleId) || { value: -1, label: "--Tipo de Consola--" },
        description: game.description || "",
        releaseYear: game.releaseYear || 0,
        numberOfPlayers: game.numberOfPlayers || 0,
        Image: game.image || {},
        consoles: consoles.map((console) => ({
          value: console.id,
          label: console.name,
        })), // Asignar las consolas al estado
      });
    } catch (error) {
      console.error("Error al cargar el juego o las consolas:", error);
    }
  }
  useEffect(() => {
    llamarAlGameID(idGame);    
  }, [idGame]);

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
    }  else {
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setShowLoading({ display: "block" });
    e.preventDefault();

    form.Image = uploadedFile 
   
    const response = await updateGame(form, form.code);

    setShowLoading({ display: "none" });
    if (response.status == 200) {
      Swal.fire("Registro exitoso", "Tu Juego ha sido actualizado", "success");   
      navigate("/")
    }
    else {
      handleError();
    }
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
        <>
          <div className={styles.d_rows}>
            <span style={{ color: "black", fontWeight: "bold" }}>{name}</span>
            <input
              className={styles.i_general_Style}
              type={type}
              name={name}
              value={propValidar}
              onChange={handleChange}
              placeholder={texto}
            />
            <span className={styles.sp_general_style}>
              {texto !== "" && validateForm[name] !== "" ? (
                <>{texto}</>
              ) : (
                ""
              )}
            </span>
          </div>
        </>
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
              </>
            ) : (
              ""
            )}
          </span>
        </>
      );
  };

  const setOptionsSelect = (name, obj) => {
    if (!obj || obj.length === 0) {
      console.error("No se encontraron consolas disponibles.");
      return [{ value: -1, label: "No hay opciones", name }];
    }
    return obj.map((item) => ({
      name,
      value: item.id,
      label: item.name,
    }));
  };

  const removeFile = (key) => {
        setUploadedFile(prev => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
        setIsFileLoaded(false)
  };
const onDrop = (acceptedFiles, label) => {
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onabort = () => reject("File reading was aborted");
      reader.onerror = () => reject("File reading has failed");

      reader.onload = () => resolve(reader.result);

      reader.readAsArrayBuffer(file);
    });
  };

  const processFile = (file) => {
    readFile(file)
      .then(() => {
        setUploadedFile((prevState) => ({ ...prevState, [label]: file }));
        setIsFileLoaded(true);
      })
      .catch(() => {
        window.alert("Error al leer la imagen");
      });
  };

  if (Array.isArray(acceptedFiles)) {
    // Caso normal: es un array de archivos
    acceptedFiles.forEach(processFile);
  } else if (typeof acceptedFiles === "string" && acceptedFiles.startsWith("data:image")) {
    // Caso especial: es un string en Base64
    const file = base64ToFile(acceptedFiles, "imagen.png");
    processFile(file);
  } else {
    console.error("Formato de archivo no válido en onDrop", acceptedFiles);
  }
  };

  return (
    <>
      <Loader show={showLoading.display === "block"} estilo={showLoading} /> {/* Ajustar visibilidad del Loader */}
      <div className={styles.div_completar_datos}>
        <form className={styles.f_general_style}>
          <h6 className={styles.h6_completar_datos}>
            Completa los datos para registrar el Juego
            <br />
            <br />            
          </h6>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. 23464897",
              form.code,
              "number",
              "code",
              validateForm.code
            )}
            {abrir_input_span_verificator(
              "Ej. Call Of Duty",
              form.name,
              "text",
              "name",
              validateForm.name
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "consoles",
              form.consoles,
              "text",
              "Consola",
              validateForm.defaultConsole,
              true,
              form.consoles,
              form.defaultConsole
            )}
            {abrir_input_span_verificator(
              "Ej. 0",
              form.numberOfPlayers,
              "number",
              "numberOfPlayers",
              validateForm.numberOfPlayers
            )}
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. 2015",
              form.releaseYear,
              "number",
              "releaseYear",
              validateForm.releaseYear
            )}
           
          </div>
          <div className={styles.d_row_function_general_style}>
            {abrir_input_span_verificator(
              "Ej. juego de matar",
              form.description,
              "text",
              "description",
              validateForm.description
            )}           
          </div>
            {previewURL && <><img src={previewURL} alt="Vista previa" /><button onClick={()=> {setPreviewURL("")}} type="button" class="btn btn-danger">Eliminar</button></>}

          {
            previewURL ?<></>:<DropZone removeFile={() => { removeFile("Image") }} onFilesUpload={(acceptedFiles) => onDrop(acceptedFiles, 'Image')} required={true} label='Imagen del juego' uploadedFile={uploadedFile['Image']} />
          } 
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
          >
            { "Registra ahora"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateGame;






