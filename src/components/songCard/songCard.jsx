import React from 'react';
import styles from '@/components/songCard/songCard.module.css';
import AlbumInfo from '@/components/songCard/albumInfo';
import AlbumImage from '@/components/songCard/albumImage';

export default function SongCard({ album }) {
  return (
    <div className={styles.songCardBody}>
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  )
}
