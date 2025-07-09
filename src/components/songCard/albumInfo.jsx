import React from 'react';
import styles from '@/components/songCard/albumInfo.module.css';

export default function AlbumInfo({ album }) {
  const artists = [];
  album?.artists?.forEach((e) => {
    artists.push(e.name);
  });

  return (
    <div className={styles.albumInfoCard}>
      <div className={styles.albumNameContainer}>
        <div className={styles.marquee}>
          <p>{album?.name + " - " + artists?.join(", ")}</p>
        </div>
      </div>
      <div className={styles.albumInfo}>
        <p>{`${album?.name} es un ${album?.album_type} de ${artists?.join(
          ", "
        )} con ${album?.total_tracks} canciones`}</p>
      </div>
      <div className={styles.albumRelease}>
        <p>{`Fecha de lanzamiento: ${album?.release_date
            ? new Date(album.release_date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            : 'Desconocida'
          }`}</p>
      </div>
    </div>
  );
}
