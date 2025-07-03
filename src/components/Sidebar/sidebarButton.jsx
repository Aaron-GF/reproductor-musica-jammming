import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import styles from '@/components/sidebar/sidebarButton.module.css';

export default function SidebarButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    const btnClass = isActive ? `${styles.btnBody} ${styles.active}` : styles.btnBody;

    return (
        <Link to={props.to}>
            <IconContext.Provider value={{ size: "24px", className: styles.icon }}>
                <div className={btnClass}>
                    {props.icon}
                    <p className={styles.btnTitle}>{props.title}</p>
                </div>
            </IconContext.Provider>
        </Link>
    )
}
