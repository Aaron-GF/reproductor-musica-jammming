import React from 'react';
import styles from '@/components/songCard/albumImage.module.css';

export default function AlbumImage({ url }) {
    return (
        <div className={styles.albumImage}>
            <img src={url} alt="Carátula album" className={styles.albumImageArt} />
            <div className={styles.albumImageShadow}>
                <img src={url} alt="sombra" className={styles.albumImageShadow} />
            </div>
        </div>
    )
}
