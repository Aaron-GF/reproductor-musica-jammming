import React from 'react';
import styles from '@/screens/auth/login.module.css';
import { generateLoginUrl } from '@/spotify';

export default function Login() {
    const handleLogin = async () => {
        const url = await generateLoginUrl();
        window.location.href = url;
    };

    return (
        <div className={styles.loginPage}>
            <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                alt="logo-spotify"
                className={styles.logo}
            />
            <button className={styles.loginBtn} onClick={handleLogin}>Iniciar sesión</button>
        </div>
    )
}
