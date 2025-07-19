import React, { useEffect, useState } from 'react';
import styles from '@/components/searchBar/songSearch.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import { checkTokenStatus } from '@/utils/checkTokenStatus';

export default function SongSearch({ onEmptySearch, onSearchActive }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        checkTokenStatus();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [search]);

    useEffect(() => {
        checkTokenStatus();
        if (!search.trim()) {
            setResults([]);
            onEmptySearch?.();
            return;
        }

        onSearchActive?.();

        const delay = setTimeout(() => {
            fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track&limit=5`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.error('Error buscando canciones:', data.error);
                        setResults([]);
                        return;
                    }
                    setResults(data.tracks?.items || []);
                })
                .catch(err => {
                    console.error('Error en la busqueda:', err);
                    setResults([]);
                });
        }, 400);
        return () => clearTimeout(delay);
    }, [search, token]);

    return (
    <div>
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
        {results.map(track => (
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
