export interface IHerramientasCotizadas {
  idHerramienta: number;
  cantidad: number;
  precio: number;
  defaultState: {
    value: number;
    label: string;
  };
}
export interface ICotizaciones {
  herramientas: IHerramientasCotizadas[];
  opcionesHerramientas: { value: number; label: string }[];
}
