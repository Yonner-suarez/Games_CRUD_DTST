import { IAdminRoutes } from "./interfaces";
export const BASE_URL = "http://localhost";

export const admin: IAdminRoutes = {
  CREATEGAME: "/GAMES_CRUD_DTST/pruebaphpapi/game/create",
  UPDATEGAME: "/GAMES_CRUD_DTST/pruebaphpapi/game/update",
  CONSOLES: "/GAMES_CRUD_DTST/pruebaphpapi/game/consoles",
  GETGAMEBYID: "/GAMES_CRUD_DTST/pruebaphpapi/game/gamesById",
  DELETEGAMES: "/GAMES_CRUD_DTST/pruebaphpapi/game/brrGame",
  LISTGAMES: "/Games_CRUD_DTST/pruebaphpapi/game/listGames",
};
//hola mundo
//subir estos cambios a la rama search-gmames