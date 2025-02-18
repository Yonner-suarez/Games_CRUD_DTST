import React, { createContext, useContext, useState, useEffect } from "react";

// Crear un contexto
const BagContext = createContext({
  bag: [],
  setBag: (bag: any[]) => {},
});

// Hook para usar el contexto
export const useBag = () => {
  return useContext(BagContext);
};

// Proveedor del contexto
export const BagProvider = ({ children }: any) => {
  const [bag, setBag] = useState<any[]>(() => {
    // Inicializar el carrito desde Local Storage
    return JSON.parse(localStorage.getItem("bag") || "[]");
  });

  useEffect(() => {
    // Actualizar localStorage cuando cambie el carrito
    localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  return (
    <BagContext.Provider value={{ bag, setBag }}>
      {children}
    </BagContext.Provider>
  );
};
