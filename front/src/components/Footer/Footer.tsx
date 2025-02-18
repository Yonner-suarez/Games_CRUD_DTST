import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={styles.kt_footer_kt_grid__item}>
      <div className={styles.kt_footer}>
        <div className={styles.kt_footer__wrapper}>
          <div className={styles.kt_footer__copyright}>
            2024&nbsp;©&nbsp;Hardware Store
          </div>
          <div className={styles.kt_footer__menu}>
            <span className={styles.kt_link}>Versión v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
