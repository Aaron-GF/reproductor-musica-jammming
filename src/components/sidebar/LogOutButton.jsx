import React from "react";
import styles from "@/components/sidebar/sidebarButton.module.css";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function LogOutButton(props) {
  const { logout } = useAuth();

  function handleLogOut() {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará. ¿Deseas continuar?",
      icon: "question",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: "#e99d72",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  }

  return (
    <IconContext.Provider value={{ size: "24px", className: styles.icon }}>
      <div className={styles.btnBody} onClick={handleLogOut}>
        {props.icon}
        <p className={styles.btnTitle}>{props.title}</p>
      </div>
    </IconContext.Provider>
  );
}
