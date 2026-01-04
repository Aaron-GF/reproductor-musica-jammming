import React from "react";
import styles from "@/screens/auth/login.module.css";
import spotifyService from "@/services/spotifyService";
import jammmingLogo from "@/assets/jammming.png";
import spotifyLogo from "@/assets/spotify-logo.png";

export default function Login() {
  const handleLogin = async () => {
    await spotifyService.login();
  };

  return (
    <div className={styles.loginPage}>
      <img src={jammmingLogo} alt="logo-jammming" className={styles.appLogo} />
      <div className={styles.login}>
        <button className={styles.loginBtn} onClick={handleLogin}>
          Iniciar sesión
        </button>
        <div className={styles.user}>
          <span>con tu cuenta de </span>
          <img src={spotifyLogo} alt="logo-spotify" className={styles.logo} />
        </div>
      </div>
    </div>
  );
}
