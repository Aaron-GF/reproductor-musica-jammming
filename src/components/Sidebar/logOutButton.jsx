import React from 'react';
import styles from '@/components/sidebar/sidebarButton.module.css';
import { IconContext } from 'react-icons';

export default function LogOutButton(props) {
    function handleLogOut() {
        const confirmed = window.confirm("¿Seguro que quieres cerrar sesión?");
        if (confirmed) {
            localStorage.removeItem('access_token');
            window.location.reload();
        }
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
