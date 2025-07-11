import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/Player/player.module.css';
import SongCard from '@/components/songCard/songCard';
import Queue from '@/components/queue/queue';
import AudioPlayer from '@/components/audioPlayer/audioPlayer';

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
        console.log('Respuesta completa de la API de Spotify:', data);
        if (!data.items || data.items.length === 0) return;
        setTracks(data.items);
        setCurrentTrack(data.items[0]?.track);
      })
      .catch((err) => console.error("Error cargando tracks:", err));
  }, [id, token]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track)
  }, [currentIndex, tracks]);

  return (
    <div className={`${global.screenContainer} ${global.flex}`}>
      <div className={styles.leftBody}>
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <div className={styles.rightBody}>
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  )
}