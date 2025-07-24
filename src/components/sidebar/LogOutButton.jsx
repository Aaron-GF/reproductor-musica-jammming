import React from 'react';
import styles from '@/components/sidebar/sidebarButton.module.css';
import { IconContext } from 'react-icons';
import Swal from 'sweetalert2';

export default function LogOutButton(props) {
    function handleLogOut() {
        Swal.fire({
            title: 'Cerrar sesión',
            text: 'Tu sesión se cerrará. ¿Deseas continuar?',
            icon: 'question',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('expires_at');
                    localStorage.removeItem('user_id');
                }
            })
    }

    return (
        <IconContext.Provider value={{ size: "24px", className: styles.icon }}>
            <div className={styles.btnBody} onClick={handleLogOut}>
                {props.icon}
                <p className={styles.btnTitle}>{props.title}</p>
            </div>
        </IconContext.Provider>
    )
}
