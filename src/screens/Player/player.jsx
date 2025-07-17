import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/Player/player.module.css';
import SongCard from '@/components/songCard/songCard';
import Queue from '@/components/queue/queue';
import AudioPlayer from '@/components/audioPlayer/audioPlayer';
import Widgets from '@/components/widgets/index';
import { checkTokenStatus } from '@/utils/checkTokenStatus';

export default function Player() {
  const { id } = useParams();
  const [libraryPlaylists, setLibraryPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem('access_token');

  // Obtener playlists de la biblioteca
  useEffect(() => {
    checkTokenStatus();
    if (!token) return;

    fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Error obteniendo playlists:', data.error);
          return;
        }
        setLibraryPlaylists(data.items || []);
      })
      .catch(err => console.error('Error fetching playlists:', err));
  }, [token]);

  // Decidir qué playlist cargar: id de URL o la primera de la biblioteca
  useEffect(() => {
    checkTokenStatus();
    if (id) {
      setPlaylistId(id);
    } else if (libraryPlaylists.length > 0) {
      const random = Math.floor(Math.random() * libraryPlaylists.length)
      setPlaylistId(libraryPlaylists[random].id);
    }
  }, [id, libraryPlaylists]);

  // Cargar tracks de la playlist seleccionada
  useEffect(() => {
    checkTokenStatus();
    if (!playlistId || !token) return;

    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Error cargando tracks:', data.error);
          return;
        }
        setTracks(data.items);
        setCurrentTrack(data.items[0]?.track);
        setCurrentIndex(0);
      })
      .catch(err => console.error('Error fetching tracks:', err));
  }, [playlistId, token]);

  useEffect(() => {
    checkTokenStatus();
    if (tracks.length > 0) {
      setCurrentTrack(tracks[currentIndex]?.track);
    }
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
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className={styles.rightBody}>
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
