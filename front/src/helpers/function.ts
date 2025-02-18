import { BASE_URL, GEO_URL, geo } from "./api";
import axios from "axios";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
export const obtenerNombreCiudad = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const url = `${GEO_URL}${geo.GEO_URL}?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
    const response = await axios.get(url);
    const data = response.data;
    if (data && data.address) {
      const ciudad =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Desconocida";
      return ciudad;
    }
    throw "Ciudad no encontrada";
  } catch (error) {
    throw "Algo salió mal";
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
