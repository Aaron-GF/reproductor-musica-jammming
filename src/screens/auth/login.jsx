import React, { useState, useEffect } from 'react';
import styles from '@/screens/auth/login.module.css';
import { generateLoginUrl } from '@/spotify';

export default function Login() {
    const [loginUrl, setLoginUrl] = useState('');

    useEffect(() => {
        generateLoginUrl().then(url => setLoginUrl(url));
    }, []);

    if (!loginUrl) return <p>Cargando...</p>;

    return (
        <div className={styles.loginPage}>
            <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                alt="logo-spotify"
                className={styles.logo}
            />
            <a href={loginUrl}>
                <div className={styles.loginBtn}>Iniciar sesión</div>
            </a>
        </div>
    )
}
