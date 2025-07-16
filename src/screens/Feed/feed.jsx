import React, { useEffect, useState } from 'react';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/Feed/feed.module.css';
import SongSearch from '@/screens/Feed/songSearch';

// Cargar las novedades (albums) al inicio
export default function Feed() {
  const [search, setSearch] = useState('');
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) return;
    if (search) return;

    fetch('https://api.spotify.com/v1/browse/new-releases?limit=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Error obteniendo canciones:', data.error)
          return;
        }
        setAlbums(data.albums?.items || []);
      })
      .catch(err => console.error('Error fetching new releases', err));
  }, [token, search]);

  useEffect(() => {
    if (!token) window.location.href = '/login';
    if (search.trim() === '') {
      setTracks([]);
      return;
    }

    const delay = setTimeout(() => {
      fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            console.error('Error buscando canciones:', data.error);
            return;
          }
          setTracks(data.tracks?.items || []);
        })
        .catch(err => console.error('Error searching tracks:', err));
    }, 400);

    return () => clearTimeout(delay);
  }, [search, token]);

  return (
    <div className={global.screenContainer}>
      <SongSearch search={search} setSearch={setSearch} />

      <div className={styles.grid}>
        {search === ''
          ? albums.map(album => (
            <div
              key={album.id}
              className={styles.card}
              onClick={() => window.open(album.external_urls.spotify, '_blank')}
            >
              <img src={album.images[0]?.url} alt={album.name} className={styles.albumImage} />
              <p className={styles.albumName}>{album.name}</p>
              <p className={styles.artists}>{album.artists.map(a => a.name).join(', ')}</p>
            </div>
          ))
          : tracks.map(track => (
            <div
              key={track.id}
              className={styles.card}
              onClick={() => window.open(track.external_urls.spotify, '_blank')}
            >
              <img src={track.album.images[0]?.url} alt={track.name} className={styles.albumImage} />
              <p className={styles.albumName}>{track.name}</p>
              <p className={styles.artists}>{track.artists.map(a => a.name).join(', ')}</p>
            </div>
          ))}
      </div>
    </div>
  );
}