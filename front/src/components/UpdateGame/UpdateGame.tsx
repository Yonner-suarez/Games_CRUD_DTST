//@ts-nocheck
import { Button } from "react-bootstrap";
import { ValidateFormFunc, disableButton } from "../../helpers/function";
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
    const consoles = await getConsoles()
    setForm({
      code: JuegoDummy.code || 0,
      name: JuegoDummy.name || "",
      defaultConsole: JuegoDummy.defaultConsole || { value: -1, label: "--Tipo de Consola--" },       
      description: JuegoDummy.description || "",
      releaseYear: JuegoDummy.yearRelease || 0,
      numberOfPlayers: JuegoDummy.numberOfPlayers || 0,
      Image: JuegoDummy.image || {},
      consoles: setOptionsSelect(
        "defaultConsole",
        consoles
      ),
    });
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowLoading({ display: "block" });
    e.preventDefault();

    form.Image = uploadedFile
    //Llama a la DB
    setTimeout(() => {
      Swal.fire("Actualización exitosa", "Tu Juego se ha actualizado", "success");
      setShowLoading({ display: "none" });
      navigate("/")
    }, 2000);

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
                placeholder={texto}
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
          {console.log(form)}
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

           <DropZone removeFile={() => { removeFile("Image") }} onFilesUpload={(acceptedFiles) => onDrop(acceptedFiles, 'Image')} required={true} label='Estatuto actualizado de la sociedad' uploadedFile={uploadedFile['Image']} />
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

export default UpdateGame;

const JuegoDummy = {
  code: 52373783275,
  description: "Call of Duty is a first-person shooter video game series developed by Infinity Ward and published by Activision.",
  image: "Buffer.from('aGVsbG8gd29ybGQ=', 'base64')",
  numberOfPlayers: 4,
  yearRelease: 2003,
  defaultConsole:{value:2, label: "PlayStation"},
  name: "Call of Duty"
};




