import React from 'react';
import styles from '@/components/songCard/songCard.module.css';
import AlbumInfo from '@/components/songCard/AlbumInfo';
import AlbumImage from '@/components/songCard/AlbumImage';

export default function SongCard({ album }) {
  return (
    <div className={styles.songCardBody}>
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  )
}
