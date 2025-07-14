import React, { useEffect, useState } from 'react';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/Feed/feed.module.css';
import { AiOutlineSearch } from "react-icons/ai";

export default function Feed() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) return;

    async function fetchNewReleases() {
      setLoading(true);
      try {
        const res = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=10', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAlbums(data.albums?.items || []);
      } catch (err) {
        console.error('Error fetching new releases', err);
      }
      setLoading(false);
    }
    fetchNewReleases();
  }, [token]);

  // Filtrar albums según el texto buscado
  const filteredAlbums = albums.filter(album => album.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={global.screenContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="search"
          placeholder="Buscar canciones..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.searchIcon}>
          <AiOutlineSearch />
        </button>
      </div>
      <div className={styles.grid}>
        {filteredAlbums.map(album => (
          <div
            key={album.id}
            className={styles.card}
            onClick={() => window.open(album.external_urls.spotify, '_blank')}
          >
            <img
              src={album.images[0]?.url}
              alt={album.name}
              className={styles.albumImage}
            />
            <p className={styles.albumName}>{album.name}</p>
            <p className={styles.artists}>
              {album.artists.map(artist => artist.name).join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}