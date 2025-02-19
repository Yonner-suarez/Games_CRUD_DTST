//@ts-nocheck
import { Button } from "react-bootstrap";
import { ValidateFormFunc, createGame, disableButton, getConsoles, handleError } from "../../helpers/function";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "./CreateGame.module.css";
import Loader from "../Loader/Loader";
import Select, { Input } from "react-select";
import { useEffect } from "react";
import DropZone from "../DropZone/DropZone";
import { useNavigate } from "react-router-dom";

const CreateGame: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState({});
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [validated, setValidated] = useState(false);
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
  
   const fetchConsoles = async () => {
     try {
        setShowLoading({ display: "block" });
        const consoles = await getConsoles();
        setForm((prevForm) => ({
          ...prevForm,
          consoles: setOptionsSelect("defaultConsole", consoles.data),
        }));
       setShowLoading({ display: "none" });
      } catch (error) {
        console.error("Error al obtener consolas:", error);
      }
    };

  useEffect(() => {
      fetchConsoles();
  }, []);

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
    if (!isFileLoaded || !uploadedFile.Image || Object.keys(uploadedFile.Image).length === 0) {
        return errorImage();
      }

    form.Image = uploadedFile    

    const status = await createGame(form);

    if (status == 200) {
      setShowLoading({ display: "none" });
      Swal.fire("Registro exitoso", "Tu Juego ha sido creado", "success");    
      navigate("/")
    }
    else {
      setShowLoading({ display: "none" });
      handleError();
    }
  };

   const errorImage = (message: string) => {
    Swal.fire(
        "Debes cargar una imagen del juego",
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
          

          <span className={styles.sp_general_style}>
            {texto !== "" && validateForm[name] !== "" ? (
              <>
                {texto}                
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

  const removeFile = (key) => {
        setUploadedFile(prev => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
        setIsFileLoaded(false)
  };
  const onDrop = (acceptedFiles, label) => {
  const readFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onabort = () => reject("file reading was aborted");
      reader.onerror = () => reject("file reading has failed");

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsArrayBuffer(file);
    });
  };
  acceptedFiles.forEach((file) => {
    readFile(file)
      .then((fileContent) => {
        setUploadedFile((prevState) => ({ ...prevState, [label]: file }));
        setIsFileLoaded(true);
       
      })
      .catch((error) => {
       window.alert("Error al leer la imagen")
      });
  });
};


  return (
    <>
      <Loader estilo={showLoading} />
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

           <DropZone removeFile={() => { removeFile("Image") }} onFilesUpload={(acceptedFiles) => onDrop(acceptedFiles, 'Image')} required={true} label='Imagen del juego' uploadedFile={uploadedFile['Image']} />
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
            {disableButton(validateForm, isFileLoaded) ? "Registrando Juego..." : "Registra ahora"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGame;


