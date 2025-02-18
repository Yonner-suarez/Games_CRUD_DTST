import { useEffect, useRef } from "react";
import ModalRegisterLogin from "../../components/ModalLogin/ModalLogin";
import { Modal } from "bootstrap";
import TipoProductos from "../../components/TiposProductos/TipoProductos";
import CarruselHomePage from "../../components/CarruselHomePage/CarruselHomePage";

const Home: React.FC = () => {
  const modalRef = useRef<Modal | null>(null);

  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");
    if (modalElement) {
      modalRef.current = new Modal(modalElement);
      modalRef.current.show();

      modalElement.addEventListener("hidden.bs.modal", () => {
        document.body.classList.remove("modal-open");
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove();
        }
      });
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.hide();
      }
      document.body.classList.remove("modal-open");

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }

      document.body.style.overflow = "";
    };
  }, []);
  return (
    <>
      <ModalRegisterLogin />
      <CarruselHomePage />
      <TipoProductos />
    </>
  );
};

export default Home;
