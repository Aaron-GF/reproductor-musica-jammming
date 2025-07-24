import React from 'react';
import styles from '@/screens/createPlaylist/playlistTitleInput.module.css';

export default function PlaylistTitleInput({ title, onTitleChange }) {
    return (
        <div>
            <input
                type="text"
                placeholder='Título para la lista de reproducción'
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                className={styles.input}
            />
        </div>
    )
}
