import Swal from "sweetalert2";
import { BASE_URL, admin } from "./api";
import axios from "axios";


export const getGamebyid = async (idGame: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${admin.GETGAMEBYID}?id=${idGame}`);
    return response.data.data; 
  } catch (error) {
    handleError(error);
  }
};


export const getConsoles = async (): Promise<Console[]> => {
  try {
    const response = await axios.get(`${BASE_URL}${admin.CONSOLES}`);
    console.log("Respuesta de la API (consolas):", response.data); // Depuración
    if (!response.data || !Array.isArray(response.data.data)) {
      console.error("La API no devolvió un array de consolas válido.");
      return [];
    }
    return response.data.data.map((consoleItem: Console) => ({
      id: consoleItem.id, // Asegúrate de que las propiedades coincidan con las devueltas por la API
      name: consoleItem.name,
    }));
  } catch (error) {
    console.error("Error al obtener consolas:", error);
    handleError(error);
    return [];
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
    return null;
  }
};

export const updateGame = async (body: any, id: number) => {
  try {
     const formData = new FormData();

    formData.append("id", String(id));
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


    const response = await axios.post(`${BASE_URL}${admin.UPDATEGAME}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const listGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${admin.LISTGAMES}`);
    console.log("Datos devueltos por la API (listGames):", response.data); // Log para depuración
    const games = response.data.data; // Se espera que los datos incluyan el campo "id"
    return games;
  } catch (error) {
    handleError(error);
  }
};

export const deleteGames = async (id: number) => {
  try {
    // Validar que el ID del juego sea válido
    if (!id || typeof id !== "number") {
      console.error("El ID del juego no está definido o no es válido:", id); // Log para depuración
      return false;
    }

    // Realizar la solicitud DELETE directamente
    const response = await axios.delete(`${BASE_URL}${admin.DELETEGAMES}?id=${id}`, {
      headers: {
        "Content-Type": "application/json", // Asegúrate de incluir encabezados necesarios
      },
    });

    console.log("Respuesta de la API al eliminar el juego:", response); // Log para depuración

    // Verificar el estado de la respuesta
    if (response.status === 200) {
      console.log("Juego eliminado exitosamente:", response.data);
      return true; // Indicar éxito
    } else {
      console.error("Error al eliminar el juego. Respuesta de la API:", response.data);
      return false; // Indicar fallo
    }
  } catch (error) {
    // Manejar errores de la solicitud
    console.error("Error al eliminar el juego:", error); // Log para depuración
    if (error.response) {
      console.error("Detalles del error:", error.response.data); // Log de la respuesta del servidor
    }
    handleError(error); // Mostrar mensaje de error al usuario
    return false; // Indicar fallo
  }
};


export const ValidateFormFunc = (
  form: any,
  validateForms: any,
  setValidateForm: (value: object) => void
) => {
  const validateForm = { ...validateForms };

  // Validar código del juego
  if (!form.code) validateForm.code = "Debe ingresar el código del juego";
  else validateForm.code = "";

  //name
  if (!form.name) validateForm.name = "Debe ingresar el nombre del juego";
  else validateForm.name = "";

  //code of game
  if (!form.code) validateForm.code = "Debe ingresar el codigo del juego";
  else validateForm.code = "";

  //number of players
  if (!form.numberOfPlayers)
    validateForm.numberOfPlayers = "Debe ingresar el numero de jugadores";
  else if (form.numberOfPlayers <= 0 || form.numberOfPlayers >= 21)
    validateForm.numberOfPlayers = "Debe ingresar el numero de jugadores válido";
  else validateForm.numberOfPlayers ="";

  //description
  if (!form.description)
    validateForm.description = "Debe ingresar la descripción del juego";
  else validateForm.description = "";

  //releaseYear
  if (!form.releaseYear)
    validateForm.releaseYear = "Debe ingresar el año en que salió el juego";
  else if (form.releaseYear <= 1900 || form.releaseYear >= 2026)
     validateForm.releaseYear = "Debe ingresar un año válido";
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
    text: error?.response?.data?.error || "Ocurrió un error inesperado.",
    confirmButtonColor: "#d33",
    confirmButtonText: "Cerrar"
  });
}


 export const base64ToFile = (base64: string, filename:string) => {
      try {
        if (!base64 || typeof base64 !== "string") {
          throw new Error("La cadena base64 es inválida.");
        }

        const arr = base64.split(",");
        if (arr.length < 2) {
          throw new Error("El formato base64 no es válido.");
        }

        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) {
          throw new Error("No se pudo extraer el tipo MIME.");
        }

        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);

        for (let i = 0; i < bstr.length; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        return new File([u8arr], filename, { type: mime });
      } catch (error) {
        return null;
      }
    };
