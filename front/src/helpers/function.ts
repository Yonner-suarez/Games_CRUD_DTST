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

  //nombre
  if (!form.nombre) validateForm.nombre = "Debe ingresar su Nombre";
  else validateForm.nombre = "";

  //apellido
  if (!form.apellido) validateForm.apellido = "Debe ingresar su Apellido";
  else validateForm.apellido = "";

  //numeroDocumento
  if (!form.numeroDocumento)
    validateForm.numeroDocumento = "Debe ingresar su Numero de documento";
  else validateForm.numeroDocumento = "";

  //numeroTelefono
  if (!form.numeroTelefono)
    validateForm.numeroTelefono = "Debe ingresar su Numero de telefono";
  else validateForm.numeroTelefono = "";

  //tipodocumento
  if (
    !form.defaultTipoDocumento ||
    form.defaultTipoDocumento?.value === -1 ||
    form.defaultTipoDocumento?.value === 0
  )
    validateForm.defaultTipoDocumento =
      "Debe ingresar su Tipo de contribuyente";
  else validateForm.defaultTipoDocumento = "";

  //correoElectronico
  if (!form.correoElectronico || !emailRegex.test(form.correoElectronico)) {
    validateForm.correoElectronico =
      "Debe ingresar su correo electronico válido";
  } else {
    validateForm.correoElectronico = "";
  }
  //tipoContribuyente
  if (
    !form.defaultTipoContribuyente ||
    form.defaultTipoContribuyente?.value === -1 ||
    form.defaultTipoContribuyente?.value === 0
  )
    validateForm.defaultTipoContribuyente =
      "Debe ingresar su Tipo de documento";
  else validateForm.defaultTipoContribuyente = "";

  //numeroDocumento
  if (!form.numeroDocumento)
    validateForm.numeroDocumento = "Debe ingresar su Numero de documento";
  else validateForm.numeroDocumento = "";

  //numeroTelefono
  if (!form.numeroTelefono)
    validateForm.numeroTelefono = "Debe ingresar su Numero de telefono";
  else validateForm.numeroTelefono = "";

  //departamento
  if (!form.departamento)
    validateForm.departamento = "Debe ingresar un Departamento";
  else validateForm.departamento = "";

  //ciudad
  if (!form.ciudad) validateForm.ciudad = "Debe ingresar su Ciudad";
  else validateForm.ciudad = "";

  //codigoPostal
  if (!form.codigoPostal)
    validateForm.codigoPostal = "Debe ingresar su Codigo Postal";
  else validateForm.codigoPostal = "";

  //password
  if (!form.password || !passwordRegex.test(form.password))
    validateForm.password =
      "La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial";
  else validateForm.password = "";

  //confirmPassword
  if (form.password !== form.confirmPassword)
    validateForm.confirmPassword = "Las contraseñas no coinciden";
  else validateForm.confirmPassword = "";

  //terminos y condiciones
  if (!form.checkedTerminosYCondiciones)
    validateForm.checkedTerminosYCondiciones =
      "Debe aceptar los terminos y condiciones";
  else validateForm.checkedTerminosYCondiciones = "";

  setValidateForm(validateForm);
};
export const disableButton = (form: any) => {
  return (
    form.nombre ||
    form.apellido ||
    form.defaultTipoDocumento?.value === -1 ||
    form.numeroDocumento ||
    form.numeroTelefono ||
    form.defaultTipoContribuyente?.value === -1 ||
    form.correoElectronico ||
    form.departamento ||
    form.ciudad ||
    form.codigoPostal ||
    form.password ||
    form.confirmPassword
  );
};
