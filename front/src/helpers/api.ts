import { IAdminRoutes, IGEO } from "./interfaces";
export const BASE_URL = "http://localhost:3001";
export const GEO_URL = "https://nominatim.openstreetmap.org";

export const admin: IAdminRoutes = {
  INVENTARIO: "/inventario",
  USUARIOS: "/usuarios",
  PEDIDOS: "/pedidos",
  VENTAS: "/ventas",
};

export const geo: IGEO = {
  GEO_URL: "/reverse",
};
