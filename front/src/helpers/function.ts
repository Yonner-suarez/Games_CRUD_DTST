import Swal from "sweetalert2";
import { BASE_URL, admin } from "./api";
import axios from "axios";

export const getConsoles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${admin.CONSOLES}`);
    return response.data; 
  } catch (error) {
    handleError(error);
  }
};


export const createGame = async (body: any) => {
  try {
    const formData = new FormData();

    formData.append("code", body.code);
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("releaseYear", body.releaseYear);
    formData.append("numberOfPlayers", body.numberOfPlayers);
    if (body.defaultConsole && body.defaultConsole.value) {
      formData.append("console", body.defaultConsole.value);
    }
    if (body.Image?.Image) {
      formData.append("image", body.Image.Image);
    }

    const response = await axios.post(`${BASE_URL}${admin.CREATEGAME}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status;
  } catch (error) {
    handleError(error);
  }
};

export const updateGame = async (body: any, id: number) => {
  try {
     const formData = new FormData();

    formData.append("code", body.code);
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("releaseYear", body.releaseYear);
    formData.append("numberOfPlayers", body.numberOfPlayers);
    if (body.defaultConsole && body.defaultConsole.value) {
      formData.append("console", body.defaultConsole.value);
    }
    if (body.Image?.Image) {
      formData.append("image", body.Image.Image);
    }


    const response = await axios.put(`${BASE_URL}${admin.UPDATEGAME}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export async function getTokenFromLocalStorage(): Promise<string | null> {
  //localStorage.setItem("user", JSON.stringify({ token: "aqui el token" }));
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  const user = JSON.parse(userString);
  return user?.token || null;
}
export const ValidateFormFunc = (
  form: any,
  validateForms: any,
  setValidateForm: (value: object) => void
) => {
  const validateForm = { ...validateForms };

  //name
  if (!form.name) validateForm.name = "Debe ingresar el nombre del juego";
  else validateForm.name = "";

  //code of game
  if (!form.code) validateForm.apellido = "Debe ingresar el codigo del juego";
  else validateForm.code = "";

  //number of players
  if (!form.numberOfPlayers)
    validateForm.numberOfPlayers = "Debe ingresar el numero de jugadores";
  else validateForm.numberOfPlayers ="";

  //description
  if (!form.description)
    validateForm.description = "Debe ingresar la descripción del juego";
  else validateForm.description = "";

  //releaseYear
  if (!form.releaseYear)
    validateForm.releaseYear = "Debe ingresar el año en que salió el juego";
  else validateForm.releaseYear = "";

  //defaultConsole
  if (
    !form.defaultConsole ||
    form.defaultConsole?.value === -1 ||
    form.defaultConsole?.value === 0
  )
    validateForm.defaultConsole =
      "Debe ingresar la consola";
  else validateForm.defaultConsole = "";

  

  setValidateForm(validateForm);
};
export const disableButton = (form: any) => {
  return (
    form.name ||
    form.code ||
    form.defaultConsole?.value === -1 ||
    form.numberOfPlayers ||
    form.description ||
    form.releaseYear 
  );
};

export const handleError = (error: any = null) => {
  Swal.fire({
    icon: "error",
    title: "¡Error!",
    text: error?.error || "Ocurrió un error inesperado.",
    confirmButtonColor: "#d33",
    confirmButtonText: "Cerrar"
  });
}