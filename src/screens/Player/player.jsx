import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/Player/player.module.css';
import SongCard from '@/components/songCard/songCard';
import Queue from '@/components/queue/queue';

export default function Player() {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!id || !token) return;

    fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.items || data.items.length === 0) return;
        setTracks(data.items);
        setCurrentTrack(data.items[0]?.track);
      })
      .catch((err) => console.error("Error cargando tracks:", err));
  }, [id, token])

  return (
    <div className={`${global.screenContainer} ${global.flex}`}>
      <div className={styles.leftBody}></div>
      <div className={styles.rightBody}></div>
      <SongCard album={currentTrack?.album} />
      <Queue />
    </div>
  )
}