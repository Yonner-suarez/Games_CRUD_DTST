import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  texto: string;
  onClick?: () => void;
  tipo?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ texto, onClick, tipo = "button" }) => {
  return (
    <button className={styles.button_atomo_style} onClick={onClick} type={tipo}>
      {texto}
    </button>
  );
};

export default Button;
